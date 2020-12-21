{-# LANGUAGE BlockArguments #-}
{-# LANGUAGE LambdaCase #-}
{-# LANGUAGE OverloadedStrings #-}

module Nazuki.Intermediate.Parser
  ( parse,
  )
where

import Control.Monad.Except
import Control.Monad.State
import Data.Char (isAsciiLower, isAsciiUpper, isDigit, isSpace)
import Data.Int (Int32)
import qualified Data.Text as T
import qualified Data.Text.Read as TR
import qualified Nazuki.Intermediate.InstructionSet as I
import qualified Nazuki.Intermediate.Label as L

type Parser a = StateT T.Text (Either T.Text) a

parse :: T.Text -> Either T.Text [L.LabeledInstruction]
parse =
  evalStateT parse'

parse' :: Parser [L.LabeledInstruction]
parse' =
  readToken >>= \case
    Id id -> do
      ins <- case id of
        "const" -> L.Holder0 <$> I.Const <$> readIntLit
        "dup" -> return $ L.Holder0 I.Dup
        "add" -> return $ L.Holder0 I.Add
        "eq" -> return $ L.Holder0 I.Eq
        "scan" -> return $ L.Holder0 I.Scan
        "print" -> return $ L.Holder0 I.Print
        "jez" -> L.Holder1 I.Jez <$> readLabelWithoutColon
        "jnz" -> L.Holder1 I.Jnz <$> readLabelWithoutColon
        _ -> throwError $ "undefined operation " <> id
      (ins :) <$> parse'
    IntLit x ->
      throwError $ "unexpected number " <> T.pack (show x)
    Label label ->
      (L.Label label :) <$> parse'
    EOS ->
      return []

data Token
  = Id T.Text
  | IntLit Int32
  | Label T.Text
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
            return $ Label (T.cons x xs)
          _ ->
            return $ Id (T.cons x xs)
      | isDigit x || x == '-' -> do
        xs <- takeWhileM isDigit
        case TR.signed TR.decimal (T.cons x xs) of
          Right (x', "") ->
            return $ IntLit x'
          _ ->
            throwError $ "invalid number " <> T.cons x xs
      | isSpace x ->
        readToken
      | otherwise ->
        throwError $ "unexpected char " <> T.singleton x
    Nothing ->
      return EOS

readChar :: Parser (Maybe Char)
readChar =
  gets T.uncons >>= \case
    Just (x, xs) -> do
      put xs
      return $ Just x
    Nothing ->
      return Nothing

peekChar :: Parser (Maybe Char)
peekChar =
  gets T.uncons >>= \case
    Just (x, _) ->
      return $ Just x
    Nothing ->
      return Nothing

takeWhileM :: (Char -> Bool) -> Parser T.Text
takeWhileM pred = do
  s <- get
  let (x, xs) = T.span pred s
  put xs
  return x

readIntLit :: Parser Int32
readIntLit =
  readToken >>= \case
    IntLit x -> return x
    Id x -> throwError $ "number expected but found operation " <> x
    Label x -> throwError $ "number expected but found label " <> x
    EOS -> throwError $ "number expected but found end of input"

readLabelWithoutColon :: Parser T.Text
readLabelWithoutColon =
  readToken >>= \case
    Id x -> return x
    IntLit x -> throwError $ "label expected but found number " <> T.pack (show x)
    Label _ -> throwError $ "no colon needed"
    EOS -> throwError $ "label expected but found end of input"
