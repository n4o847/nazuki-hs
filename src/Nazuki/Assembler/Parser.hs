{-# LANGUAGE BlockArguments #-}
{-# LANGUAGE OverloadedStrings #-}

module Nazuki.Assembler.Parser
  ( parse,
  )
where

import Control.Arrow (left)
import Data.Int (Int32)
import Data.Text (Text)
import qualified Data.Text as Text
import Data.Void (Void)
import Nazuki.Assembler.Instruction as I
import Nazuki.Assembler.Label (Labeled (..))
import Text.Megaparsec hiding (Label, parse)
import Text.Megaparsec.Char
import qualified Text.Megaparsec.Char.Lexer as L

type Parser = Parsec Void Text

sc :: Parser ()
sc =
  L.space
    space1
    (L.skipLineComment ";")
    empty

lexeme :: Parser a -> Parser a
lexeme = L.lexeme sc

symbol :: Text -> Parser Text
symbol = L.symbol sc

pString :: Parser Text
pString =
  lexeme (char '"' >> Text.pack <$> manyTill L.charLiteral (char '"'))
    <?> "string"

pInt :: Num a => Parser a
pInt = lexeme (L.signed sc L.decimal) <?> "integer"

pKeyword :: Text -> Parser Text
pKeyword keyword = lexeme (string keyword <* notFollowedBy (alphaNumChar <|> char '_'))

pLabelWithoutColon :: Parser Text
pLabelWithoutColon = lexeme (Text.pack <$> ((:) <$> (letterChar <|> char '_') <*> many (alphaNumChar <|> char '_')))

pLabel :: Parser (Labeled Instruction)
pLabel = Label <$> pLabelWithoutColon <* symbol ":" <?> "label"

pOperator :: Parser (Labeled Instruction)
pOperator =
  choice
    [ L0 . I.Const <$ pKeyword "const" <*> pInt,
      L0 I.Dup <$ pKeyword "dup",
      L0 I.Getc <$ pKeyword "getc",
      L0 . I.Get <$ pKeyword "get" <*> pInt,
      L0 . I.Set <$ pKeyword "set" <*> pInt,
      L0 I.Drop <$ pKeyword "drop",
      L0 I.Not <$ pKeyword "not",
      L0 I.And <$ pKeyword "and",
      L0 I.Or <$ pKeyword "or",
      L0 I.Xor <$ pKeyword "xor",
      L0 I.Shl <$ pKeyword "shl",
      L0 I.ShrU <$ pKeyword "shr_u",
      L0 I.ShrS <$ pKeyword "shr_s",
      L0 I.Inc <$ pKeyword "inc",
      L0 I.Add <$ pKeyword "add",
      L0 I.Sub <$ pKeyword "sub",
      L0 I.Mul10 <$ pKeyword "mul10",
      L0 I.Mul <$ pKeyword "mul",
      L0 I.Eqz <$ pKeyword "eqz",
      L0 I.Nez <$ pKeyword "nez",
      L0 I.Eq <$ pKeyword "eq",
      L0 I.LtS <$ pKeyword "lt_s",
      L0 I.LeS <$ pKeyword "le_s",
      L0 I.LtU <$ pKeyword "lt_u",
      L0 I.LeU <$ pKeyword "le_u",
      L0 I.GtS <$ pKeyword "gt_s",
      L0 I.GeS <$ pKeyword "ge_s",
      L0 I.GtU <$ pKeyword "gt_u",
      L0 I.GeU <$ pKeyword "ge_u",
      L0 I.Scan <$ pKeyword "scan",
      L0 I.Print <$ pKeyword "print",
      L0 I.Putc <$ pKeyword "putc",
      L0 . I.Write <$ pKeyword "write" <*> pString,
      L0 I.Load <$ pKeyword "load",
      L0 I.Store <$ pKeyword "store",
      L1 I.Jump <$ pKeyword "jump" <*> pLabelWithoutColon,
      L1 I.Jz <$ pKeyword "jz" <*> pLabelWithoutColon,
      L1 I.Jnz <$ pKeyword "jnz" <*> pLabelWithoutColon,
      L1 I.Jeq <$ pKeyword "jeq" <*> pLabelWithoutColon
    ]
    <?> "valid operator"

program :: Parser [Labeled Instruction]
program = many (try pLabel <|> pOperator)

parse :: Text -> Either Text [Labeled Instruction]
parse =
  left (Text.pack . errorBundlePretty) . runParser (sc *> program <* eof) ""
