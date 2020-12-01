{-# LANGUAGE BlockArguments #-}
{-# LANGUAGE LambdaCase #-}

module Nazuki.Intermediate.Parser where

import Text.Read ( readMaybe )
import qualified Nazuki.Intermediate.InstructionSet as I
import qualified Nazuki.Intermediate.Label as L

parse :: String -> Either String [L.LabeledInstruction]
parse input =
    parseTokens (words input)

parseTokens :: [String] -> Either String [L.LabeledInstruction]
parseTokens tokens =
    case tokens of
        "const" : rest ->
            case rest of
                x : rest' ->
                    case readMaybe x of
                        Just x' -> (L.Holder0 (I.Const x') :) <$> parseTokens rest'
                        Nothing -> Left "invalid number"
                [] ->
                    Left "expected number"
        "dup" : rest ->
            (L.Holder0 I.Dup :) <$> parseTokens rest
        "add" : rest ->
            (L.Holder0 I.Add :) <$> parseTokens rest
        "eq" : rest ->
            (L.Holder0 I.Eq :) <$> parseTokens rest
        "scan" : rest ->
            (L.Holder0 I.Scan :) <$> parseTokens rest
        "print" : rest ->
            (L.Holder0 I.Print :) <$> parseTokens rest
        "jez" : rest ->
            case rest of
                label : rest' ->
                    (L.Holder1 I.Jez label :) <$> parseTokens rest'
                [] ->
                    Left "expected label"
        "jnz" : rest ->
            case rest of
                label : rest' ->
                    (L.Holder1 I.Jnz label :) <$> parseTokens rest'
                [] ->
                    Left "expected label"
        other : rest ->
            case unsnoc other of
                Just (label, ':') ->
                    (L.Label label :) <$> parseTokens rest
                Nothing ->
                    Left ("unexpected instruction " <> other)
        [] ->
            Right []

unsnoc :: String -> Maybe (String, Char)
unsnoc s =
    case reverse s of
        x : xs ->
            Just (reverse xs, x)
        [] ->
            Nothing
