{-# LANGUAGE BlockArguments #-}
{-# LANGUAGE OverloadedStrings #-}

module Nazuki.Compiler.Parser
  ( parse,
  )
where

import Control.Arrow (left)
import Control.Monad (void)
import Data.Text (Text)
import qualified Data.Text as Text
import Data.Void (Void)
import qualified Nazuki.Compiler.AST as AST
import Text.Megaparsec hiding (parse)
import Text.Megaparsec.Char
import qualified Text.Megaparsec.Char.Lexer as L

type Parser = Parsec Void Text

lineComment :: Parser ()
lineComment = L.skipLineComment "#"

scn :: Parser ()
scn = L.space space1 lineComment empty

sc :: Parser ()
sc = L.space (void $ some (char ' ' <|> char '\t')) lineComment empty

lexeme :: Parser a -> Parser a
lexeme = L.lexeme sc

pKeyword :: Text -> Parser Text
pKeyword keyword =
  lexeme (string keyword <* notFollowedBy (alphaNumChar <|> char '_'))

pIdent :: Parser AST.Ident
pIdent =
  lexeme do
    x <- letterChar <|> char '_'
    xs <- many (alphaNumChar <|> char '_')
    return (AST.Ident (Text.pack (x : xs)))
    <?> "identifier"

pExpr :: Parser AST.Expr
pExpr =
  AST.Get <$> pIdent

pStmt :: Parser AST.Stmt
pStmt =
  AST.Expr <$> pExpr <* scn

pProgram :: Parser AST.Program
pProgram =
  AST.Program <$> many pStmt

parse :: Text -> Either Text AST.Program
parse =
  left (Text.pack . errorBundlePretty)
    . runParser (pProgram <* eof) ""
