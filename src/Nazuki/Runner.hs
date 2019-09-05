module Nazuki.Runner (parse) where

import           Control.Arrow
import           Control.Monad.State
import           Data.Word                      ( Word8 )
import           Data.Maybe

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
    (cmds, rest) <- parse' code
    if isNothing rest then
        Right cmds
    else
        Left "unmatched ]"
    where
        parse' code =
            case code of
                ""     -> Right ([], Nothing)
                '+':xs -> cont Inc xs
                '-':xs -> cont Dec xs
                '>':xs -> cont Fwd xs
                '<':xs -> cont Bwd xs
                ',':xs -> cont Get xs
                '.':xs -> cont Put xs
                '[':xs -> do
                    (block, rest) <- parse' xs
                    case rest of
                        Nothing -> Left "unmatched ["
                        Just xs -> cont (While block) xs
                ']':xs -> Right ([], Just xs)
                _:xs   -> parse' xs
        cont cmd xs = first (cmd:) <$> parse' xs
