{-# LANGUAGE BlockArguments #-}
{-# LANGUAGE LambdaCase #-}

module Nazuki.Intermediate.Parser
  ( parse,
  )
where

import Control.Monad.Except
import Control.Monad.State
import Data.Char (isAsciiLower, isAsciiUpper, isDigit, isSpace)
import Data.Int (Int32)
import qualified Nazuki.Intermediate.InstructionSet as I
import qualified Nazuki.Intermediate.Label as L
import Text.Read (readMaybe)

type Parser a = StateT String (Either String) a

parse :: String -> Either String [L.LabeledInstruction]
parse =
  evalStateT parse'

parse' :: Parser [L.LabeledInstruction]
parse' = do
  readToken >>= \case
    Id "const" -> do
      x <- readToken >>= assertIntLit
      (L.Holder0 (I.Const x) :) <$> parse'
    Id "dup" ->
      (L.Holder0 I.Dup :) <$> parse'
    Id "add" ->
      (L.Holder0 I.Add :) <$> parse'
    Id "eq" ->
      (L.Holder0 I.Eq :) <$> parse'
    Id "scan" ->
      (L.Holder0 I.Scan :) <$> parse'
    Id "print" ->
      (L.Holder0 I.Print :) <$> parse'
    Id "jez" -> do
      x <- readToken >>= assertLabelWithoutColon
      (L.Holder1 I.Jez x :) <$> parse'
    Id "jnz" -> do
      x <- readToken >>= assertLabelWithoutColon
      (L.Holder1 I.Jnz x :) <$> parse'
    Id op ->
      throwError $ "undefined operation " <> op
    IntLit x ->
      throwError $ "unexpected number " <> show x
    Label label ->
      (L.Label label :) <$> parse'
    EOS ->
      return []

data Token
  = Id String
  | IntLit Int32
  | Label String
  | EOS

readToken :: Parser Token
readToken =
  readChar >>= \case
    Just x
      | isAsciiUpper x || isAsciiLower x -> do
        xs <- takeWhileM (\x -> isAsciiUpper x || isAsciiLower x || isDigit x)
        peekChar >>= \case
          Just ':' -> do
            readChar
            return $ Label (x : xs)
          _ ->
            return $ Id (x : xs)
      | isDigit x || x == '-' -> do
        xs <- takeWhileM isDigit
        case readMaybe (x : xs) of
          Just x' ->
            return $ IntLit x'
          Nothing ->
            throwError $ "invalid number " <> (x : xs)
      | isSpace x ->
        readToken
      | otherwise ->
        throwError $ "unexpected char " <> [x]
    Nothing ->
      return EOS

readChar :: Parser (Maybe Char)
readChar =
  get >>= \case
    x : xs -> do
      put xs
      return $ Just x
    "" ->
      return Nothing

peekChar :: Parser (Maybe Char)
peekChar =
  get >>= \case
    x : _ ->
      return $ Just x
    "" ->
      return Nothing

takeWhileM :: (Char -> Bool) -> Parser String
takeWhileM pred = do
  s <- get
  let (x, xs) = span pred s
  put xs
  return x

assertIntLit :: Token -> Parser Int32
assertIntLit = \case
  IntLit x -> return x
  Id x -> throwError $ "number expected but found operation " <> x
  Label x -> throwError $ "number expected but found label " <> x
  EOS -> throwError $ "number expected but found end of input"

assertLabelWithoutColon :: Token -> Parser String
assertLabelWithoutColon = \case
  Id x -> return x
  IntLit x -> throwError $ "label expected but found number " <> show x
  Label _ -> throwError $ "no colon needed"
  EOS -> throwError $ "label expected but found end of input"
