module Nazuki.Runner
    ( debug
    , run
    )
where

import           Control.Monad.State
import           Control.Monad.Except
import           Data.Functor                   ( (<&>) )
import           Data.Word                      ( Word8 )
import           Text.Printf
import           Codec.Binary.UTF8.String       ( encode
                                                , decode
                                                )

data Cmd
    = Inc
    | Dec
    | Fwd
    | Bwd
    | Get
    | Put
    | While [Cmd]
    deriving Show

parse :: String -> Either String [Cmd]
parse code = do
    (rest, cmds) <- parse' code
    case rest of
        Nothing -> Right cmds
        _       -> Left "unmatched ]"
    where
        parse' code =
            case code of
                ""     -> Right (Nothing, [])
                '+':xs -> Inc <:> parse' xs
                '-':xs -> Dec <:> parse' xs
                '>':xs -> Fwd <:> parse' xs
                '<':xs -> Bwd <:> parse' xs
                ',':xs -> Get <:> parse' xs
                '.':xs -> Put <:> parse' xs
                '[':xs -> do
                    (rest, block) <- parse' xs
                    case rest of
                        Just xs -> While block <:> parse' xs
                        Nothing -> Left "unmatched ["
                ']':xs -> Right (Just xs, [])
                _:xs   -> parse' xs
        (<:>) = fmap . fmap . (:)

data Tape a = Tape [a] a [a] deriving Show

data BFState = BFState
    { mem :: Tape Word8
    , ptr :: Int
    , cnt :: Int
    , input :: [Word8]
    , output :: [Word8]
    }
    deriving Show

emptyBFState :: BFState
emptyBFState = BFState
    { mem = Tape [] 0 []
    , ptr = 0
    , cnt = 0
    , input = []
    , output = []
    }

exec :: [Cmd] -> [Word8] -> Either String BFState
exec cmds inputData =
    execStateT (exec' cmds) emptyBFState { input = inputData }
    where
        exec' :: [Cmd] -> StateT BFState (Either String) ()
        exec' cmds =
            case cmds of
                [] -> return ()
                Inc:cs -> do
                    incCnt
                    updateMem increment
                    exec' cs
                Dec:cs -> do
                    incCnt
                    updateMem decrement
                    exec' cs
                Fwd:cs -> do
                    incCnt
                    updatePtr succ
                    updateMem forward
                    exec' cs
                Bwd:cs -> do
                    incCnt
                    updatePtr pred
                    updateMem backward
                    exec' cs
                Get:cs -> do
                    incCnt
                    state <- get
                    case input state of
                        x:xs -> do
                            put state { input = xs }
                            updateMem (\(Tape ls _ rs) -> Tape ls x rs)
                        [] ->
                            updateMem (\(Tape ls _ rs) -> Tape ls 255 rs)
                    exec' cs
                Put:cs -> do
                    incCnt
                    state <- get
                    let Tape _ x _ = mem state
                    put state { output = x:output state }
                    exec' cs
                While a:cs -> do
                    incCnt
                    state <- get
                    let Tape _ x _ = mem state
                    if x == 0 then
                        exec' cs
                    else do
                        exec' a
                        exec' cmds
        updateMem :: (Tape Word8 -> Tape Word8) -> StateT BFState (Either String) ()
        updateMem f = modify $ \state -> state { mem = f $ mem state }
        increment (Tape ls x rs)     = Tape ls (x + 1) rs
        decrement (Tape ls x rs)     = Tape ls (x - 1) rs
        forward   (Tape ls x []    ) = Tape (x:ls) 0 []
        forward   (Tape ls x (r:rs)) = Tape (x:ls) r rs
        backward  (Tape []     x rs) = Tape [] 0 (x:rs)
        backward  (Tape (l:ls) x rs) = Tape ls l (x:rs)
        incCnt :: StateT BFState (Either String) ()
        incCnt = do
            state <- get
            let newCnt = cnt state + 1
            if newCnt > 1000000 then
                throwError "operation limit exceeded"
            else
                put state { cnt = newCnt }
        updatePtr :: (Int -> Int) -> StateT BFState (Either String) ()
        updatePtr f = do
            state <- get
            let newPtr = f $ ptr state
            if newPtr > 10000 then
                throwError "memory access error (> 10000)"
            else if newPtr < 0 then
                throwError "memory access error (< 0)"
            else
                put state { ptr = newPtr }

hex :: Word8 -> String
hex = printf "%02X"

inspect :: BFState -> Either String String
inspect state =
    let Tape ls x rs = mem state
        out = reverse $ output state in
    return $ "mem: " ++ unwords (map hex $ reverse ls)
                     ++ "[" ++ hex x ++ "]"
                     ++ unwords (map hex rs) ++ "\n"
          ++ "ptr: " ++ show (ptr state) ++ "\n"
          ++ "cnt: " ++ show (cnt state) ++ "\n"
          ++ "out: " ++ unwords (map hex out) ++ "\n"
          ++ "out: " ++ decode out ++ "\n"

debug :: String -> String -> Either String String
debug program input = parse program >>= flip exec (encode input) >>= inspect

run :: String -> String -> Either String String
run program input = parse program >>= flip exec (encode input) <&> decode . output
