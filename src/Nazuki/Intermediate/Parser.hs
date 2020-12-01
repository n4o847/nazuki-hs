{-# LANGUAGE BlockArguments #-}
{-# LANGUAGE LambdaCase #-}

module Nazuki.Intermediate.Parser where

import Text.Read ( readMaybe )
import qualified Nazuki.Intermediate.InstructionSet as I

parse :: String -> Either String [I.Instruction]
parse input =
    parseTokens (words input)

parseTokens :: [String] -> Either String [I.Instruction]
parseTokens tokens =
    case tokens of
        "const" : rest ->
            case rest of
                x : rest' ->
                    case readMaybe x of
                        Just x' -> (I.Const x' :) <$> parseTokens rest'
                        Nothing -> Left "invalid number"
                [] ->
                    Left "expected number"
        "add" : rest ->
            (I.Add :) <$> parseTokens rest
        "scan" : rest ->
            (I.Scan :) <$> parseTokens rest
        "print" : rest ->
            (I.Print :) <$> parseTokens rest
        other : _rest ->
            Left ("unexpected instruction " <> other)
        [] ->
            Right []
