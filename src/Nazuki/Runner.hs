{-# LANGUAGE OverloadedStrings #-}

module Nazuki.Runner
  ( debug,
    run,
  )
where

import Control.Monad.Except
import Control.Monad.State
import qualified Data.ByteString as BS
import Data.Functor ((<&>))
import qualified Data.Text as T
import qualified Data.Text.Encoding as TE
import qualified Data.Text.Lazy as TL
import qualified Data.Text.Lazy.Builder as TLB
import Data.Text.Lazy.Builder.Int (decimal)
import Data.Word (Word8)
import Text.Printf

data Cmd
  = Inc
  | Dec
  | Fwd
  | Bwd
  | Get
  | Put
  | While [Cmd]
  deriving (Show)

parse :: T.Text -> Either T.Text [Cmd]
parse code = do
  (rest, cmds) <- parse' code
  case rest of
    Nothing -> Right cmds
    _ -> Left "unmatched ]"
  where
    parse' code =
      case T.uncons code of
        Nothing -> Right (Nothing, [])
        Just ('+', xs) -> Inc <:> parse' xs
        Just ('-', xs) -> Dec <:> parse' xs
        Just ('>', xs) -> Fwd <:> parse' xs
        Just ('<', xs) -> Bwd <:> parse' xs
        Just (',', xs) -> Get <:> parse' xs
        Just ('.', xs) -> Put <:> parse' xs
        Just ('[', xs) -> do
          (rest, block) <- parse' xs
          case rest of
            Just xs -> While block <:> parse' xs
            Nothing -> Left "unmatched ["
        Just (']', xs) -> Right (Just xs, [])
        Just (_, xs) -> parse' xs
    (<:>) = fmap . fmap . (:)

data Tape a = Tape [a] a [a] deriving (Show)

data BFState = BFState
  { mem :: Tape Word8,
    ptr :: Int,
    cnt :: Int,
    input :: [Word8],
    output :: [Word8]
  }
  deriving (Show)

emptyBFState :: BFState
emptyBFState =
  BFState
    { mem = Tape [] 0 [],
      ptr = 0,
      cnt = 0,
      input = [],
      output = []
    }

exec :: [Cmd] -> [Word8] -> Either T.Text BFState
exec cmds inputData =
  execStateT (exec' cmds) emptyBFState {input = inputData}
  where
    exec' :: [Cmd] -> StateT BFState (Either T.Text) ()
    exec' cmds =
      case cmds of
        [] -> return ()
        Inc : cs -> do
          incCnt
          updateMem increment
          exec' cs
        Dec : cs -> do
          incCnt
          updateMem decrement
          exec' cs
        Fwd : cs -> do
          incCnt
          updatePtr succ
          updateMem forward
          exec' cs
        Bwd : cs -> do
          incCnt
          updatePtr pred
          updateMem backward
          exec' cs
        Get : cs -> do
          incCnt
          state <- get
          case input state of
            x : xs -> do
              put state {input = xs}
              updateMem (\(Tape ls _ rs) -> Tape ls x rs)
            [] ->
              updateMem (\(Tape ls _ rs) -> Tape ls 255 rs)
          exec' cs
        Put : cs -> do
          incCnt
          state <- get
          let Tape _ x _ = mem state
          put state {output = x : output state}
          exec' cs
        While a : cs -> do
          incCnt
          state <- get
          let Tape _ x _ = mem state
          if x == 0
            then exec' cs
            else do
              exec' a
              exec' cmds
    updateMem :: (Tape Word8 -> Tape Word8) -> StateT BFState (Either T.Text) ()
    updateMem f = modify $ \state -> state {mem = f $ mem state}
    increment (Tape ls x rs) = Tape ls (x + 1) rs
    decrement (Tape ls x rs) = Tape ls (x - 1) rs
    forward (Tape ls x []) = Tape (x : ls) 0 []
    forward (Tape ls x (r : rs)) = Tape (x : ls) r rs
    backward (Tape [] x rs) = Tape [] 0 (x : rs)
    backward (Tape (l : ls) x rs) = Tape ls l (x : rs)
    incCnt :: StateT BFState (Either T.Text) ()
    incCnt = do
      state <- get
      let newCnt = cnt state + 1
      if newCnt > 10000000
        then throwError "operation limit exceeded"
        else put state {cnt = newCnt}
    updatePtr :: (Int -> Int) -> StateT BFState (Either T.Text) ()
    updatePtr f = do
      state <- get
      let newPtr = f $ ptr state
      if newPtr > 10000
        then throwError "memory access error (> 10000)"
        else
          if newPtr < 0
            then throwError "memory access error (< 0)"
            else put state {ptr = newPtr}

hex :: Word8 -> T.Text
hex = T.pack . printf "%02X"

inspect :: BFState -> Either T.Text T.Text
inspect state =
  let Tape ls x rs = mem state
      out = reverse $ output state
   in return $
        TL.toStrict $
          TLB.toLazyText
            ( "mem: "
                <> TLB.fromLazyText (TL.unwords $ TL.fromStrict . hex <$> reverse ls)
                <> "["
                <> TLB.fromText (hex x)
                <> "]"
                <> TLB.fromLazyText (TL.unwords $ TL.fromStrict . hex <$> rs)
                <> "\n"
                <> "ptr: "
                <> decimal (ptr state)
                <> "\n"
                <> "cnt: "
                <> decimal (cnt state)
                <> "\n"
                <> "out: "
                <> TLB.fromLazyText (TL.fromChunks (map hex out))
                <> "\n"
                <> "out: "
                <> TLB.fromText (decode out)
                <> "\n"
            )

debug :: T.Text -> T.Text -> Either T.Text T.Text
debug program input = parse program >>= flip exec (encode input) >>= inspect

run :: T.Text -> T.Text -> Either T.Text T.Text
run program input = parse program >>= flip exec (encode input) <&> decode . reverse . output

encode :: T.Text -> [Word8]
encode =
  BS.unpack . TE.encodeUtf8

decode :: [Word8] -> T.Text
decode =
  TE.decodeUtf8 . BS.pack
