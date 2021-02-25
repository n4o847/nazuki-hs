{-# LANGUAGE BlockArguments #-}
{-# LANGUAGE LambdaCase #-}
{-# LANGUAGE NamedFieldPuns #-}
{-# LANGUAGE OverloadedStrings #-}

module Nazuki.Runtime.Parser
  ( Cmd (..),
    parse,
  )
where

import Control.Monad.Except
import Control.Monad.State.Strict
import Data.Functor ((<&>))
import Data.Text (Text)
import qualified Data.Text as Text
import Data.Word (Word8)

data Cmd
  = Inc
  | Dec
  | Fwd
  | Bwd
  | Plus Word8
  | Step Int
  | Get
  | Put
  | While [Cmd]

data ParserState = ParserState {rest :: Text, depth :: Int}

type Parser = StateT ParserState (Either Text)

emptyParserState :: ParserState
emptyParserState =
  ParserState {rest = "", depth = 0}

getDepth :: Parser Int
getDepth =
  gets (\ParserState {depth} -> depth)

setDepth :: Int -> Parser ()
setDepth depth =
  modify' (\s -> s {depth})

readChar :: Parser (Maybe Char)
readChar = do
  ParserState {rest} <- get
  case Text.uncons rest of
    Just (x, xs) -> do
      modify' (\s -> s {rest = xs})
      return $ Just x
    Nothing ->
      return Nothing

readCmds :: Parser [Cmd]
readCmds = do
  readChar >>= \case
    Nothing -> do
      depth <- getDepth
      when (depth /= 0) do
        throwError "unmatched ["
      return []
    Just '+' ->
      readCmds <&> \case
        Plus 255 : xs -> xs
        Plus x : xs -> Plus (x + 1) : xs
        xs -> Plus 1 : xs
    Just '-' ->
      readCmds <&> \case
        Plus 1 : xs -> xs
        Plus y : xs -> Plus (y - 1) : xs
        xs -> Plus 255 : xs
    Just '>' ->
      readCmds <&> \case
        Step (-1) : xs -> xs
        Step x : xs -> Step (x + 1) : xs
        xs -> Step 1 : xs
    Just '<' ->
      readCmds <&> \case
        Step 1 : xs -> xs
        Step x : xs -> Step (x - 1) : xs
        xs -> Step (-1) : xs
    Just ',' ->
      (Get :) <$> readCmds
    Just '.' -> do
      (Put :) <$> readCmds
    Just '[' -> do
      depth <- getDepth
      setDepth (depth + 1)
      block <- readCmds
      (While block :) <$> readCmds
    Just ']' -> do
      depth <- getDepth
      when (depth == 0) do
        throwError "unmatched ]"
      setDepth (depth - 1)
      return []
    Just _ ->
      readCmds

parse :: Text -> Either Text [Cmd]
parse code =
  evalStateT readCmds emptyParserState {rest = code}
