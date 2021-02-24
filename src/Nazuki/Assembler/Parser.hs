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
import Nazuki.Assembler.Label
import Nazuki.Intermediate.InstructionSet as I
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
  char '"' >> Text.pack <$> manyTill L.charLiteral (char '"')
    <?> "string"

pInt :: Parser Int32
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
      Holder0 I.Add <$ pKeyword "add",
      Holder0 I.Eq <$ pKeyword "eq",
      Holder0 I.Scan <$ pKeyword "scan",
      Holder0 I.Print <$ pKeyword "print",
      Holder1 I.Jez <$ pKeyword "jez" <*> pLabelWithoutColon,
      Holder1 I.Jnz <$ pKeyword "jnz" <*> pLabelWithoutColon
    ]
    <?> "valid operator"

program :: Parser [Labeled Instruction]
program = many (try pLabel <|> pOperator)

parse :: Text -> Either Text [Labeled Instruction]
parse =
  left (Text.pack . errorBundlePretty) . runParser (sc *> program <* eof) ""
