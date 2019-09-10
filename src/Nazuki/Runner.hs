module Nazuki.Runner (parse) where

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
