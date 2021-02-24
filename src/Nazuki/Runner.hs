{-# LANGUAGE BlockArguments #-}
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
import Data.Text (Text)
import qualified Data.Text as T
import qualified Data.Text.Encoding as TE
import qualified Data.Text.Lazy as TL
import qualified Data.Text.Lazy.Builder as TLB
import Data.Text.Lazy.Builder.Int (decimal)
import Data.Word (Word8)
import Nazuki.Runtime.Parser
import Text.Printf

data Tape a = Tape [a] a [a]

data RunnerState = RunnerState
  { mem :: Tape Word8,
    ptr :: Int,
    cnt :: Int,
    input :: [Word8],
    output :: [Word8]
  }

type Runner = StateT RunnerState (Either Text)

emptyRunnerState :: RunnerState
emptyRunnerState =
  RunnerState
    { mem = Tape [] 0 [],
      ptr = 0,
      cnt = 0,
      input = [],
      output = []
    }

exec :: [Cmd] -> [Word8] -> Either Text RunnerState
exec cmds inputData =
  execStateT (exec' cmds) emptyRunnerState {input = inputData}

exec' :: [Cmd] -> Runner ()
exec' cmds =
  case cmds of
    [] -> return ()
    Plus x : cs -> do
      incCnt
      updateMem (plus x)
      exec' cs
    Step x : cs -> do
      incCnt
      updateMem (step x)
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

updateMem :: (Tape Word8 -> Tape Word8) -> Runner ()
updateMem f =
  modify $ \state -> state {mem = f $ mem state}

plus :: Word8 -> Tape Word8 -> Tape Word8
plus x (Tape ls a rs) = Tape ls (a + x) rs

step :: Int -> Tape Word8 -> Tape Word8
step x tape
  | x == 0 = tape
  | x > 0 = step (x - 1) case tape of
    Tape ls a [] -> Tape (a : ls) 0 []
    Tape ls a (r : rs) -> Tape (a : ls) r rs
  | x < 0 = step (x + 1) case tape of
    Tape [] a rs -> Tape [] 0 (a : rs)
    Tape (l : ls) a rs -> Tape ls l (a : rs)

incCnt :: Runner ()
incCnt = do
  state <- get
  let newCnt = cnt state + 1
  when (newCnt > 10000000) do
    throwError "operation limit exceeded"
  put state {cnt = newCnt}

updatePtr :: (Int -> Int) -> Runner ()
updatePtr f = do
  state <- get
  let newPtr = f $ ptr state
  when (newPtr > 10000) do
    throwError "memory access error (> 10000)"
  when (newPtr < 0) do
    throwError "memory access error (< 0)"
  put state {ptr = newPtr}

hex :: Word8 -> Text
hex = T.pack . printf "%02X"

inspect :: RunnerState -> Either Text Text
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

debug :: Text -> Text -> Either Text Text
debug program input = parse program >>= flip exec (encode input) >>= inspect

run :: Text -> Text -> Either Text Text
run program input = parse program >>= flip exec (encode input) <&> decode . reverse . output

encode :: Text -> [Word8]
encode =
  BS.unpack . TE.encodeUtf8

decode :: [Word8] -> Text
decode =
  TE.decodeUtf8 . BS.pack
