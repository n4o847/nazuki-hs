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
import Nazuki.Assembler.Label
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
    [ Holder0 . I.Const <$ pKeyword "const" <*> pInt,
      Holder0 I.Dup <$ pKeyword "dup",
      Holder0 . I.Get <$ pKeyword "get" <*> pInt,
      Holder0 . I.Set <$ pKeyword "set" <*> pInt,
      Holder0 I.Drop <$ pKeyword "drop",
      Holder0 I.Not <$ pKeyword "not",
      Holder0 I.And <$ pKeyword "and",
      Holder0 I.Or <$ pKeyword "or",
      Holder0 I.Xor <$ pKeyword "xor",
      Holder0 I.Shl <$ pKeyword "shl",
      Holder0 I.ShrU <$ pKeyword "shr_u",
      Holder0 I.ShrS <$ pKeyword "shr_s",
      Holder0 I.Inc <$ pKeyword "inc",
      Holder0 I.Add <$ pKeyword "add",
      Holder0 I.Sub <$ pKeyword "sub",
      Holder0 I.Mul10 <$ pKeyword "mul10",
      Holder0 I.Mul <$ pKeyword "mul",
      Holder0 I.Eqz <$ pKeyword "eqz",
      Holder0 I.Nez <$ pKeyword "nez",
      Holder0 I.Eq <$ pKeyword "eq",
      Holder0 I.LtS <$ pKeyword "lt_s",
      Holder0 I.LeS <$ pKeyword "le_s",
      Holder0 I.LtU <$ pKeyword "lt_u",
      Holder0 I.LeU <$ pKeyword "le_u",
      Holder0 I.GtS <$ pKeyword "gt_s",
      Holder0 I.GeS <$ pKeyword "ge_s",
      Holder0 I.GtU <$ pKeyword "gt_u",
      Holder0 I.GeU <$ pKeyword "ge_u",
      Holder0 I.Scan <$ pKeyword "scan",
      Holder0 I.Print <$ pKeyword "print",
      Holder0 I.Getc <$ pKeyword "getc",
      Holder0 I.Putc <$ pKeyword "putc",
      Holder0 . I.Write <$ pKeyword "write" <*> pString,
      Holder1 I.Jump <$ pKeyword "jump" <*> pLabelWithoutColon,
      Holder1 I.Jez <$ pKeyword "jez" <*> pLabelWithoutColon,
      Holder1 I.Jnz <$ pKeyword "jnz" <*> pLabelWithoutColon,
      Holder1 I.Jeq <$ pKeyword "jeq" <*> pLabelWithoutColon
    ]
    <?> "valid operator"

program :: Parser [Labeled Instruction]
program = many (try pLabel <|> pOperator)

parse :: Text -> Either Text [Labeled Instruction]
parse =
  left (Text.pack . errorBundlePretty) . runParser (sc *> program <* eof) ""
