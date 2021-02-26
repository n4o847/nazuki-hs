{-# LANGUAGE BlockArguments #-}
{-# LANGUAGE OverloadedStrings #-}

module Nazuki.Compiler.Parser
  ( parse,
  )
where

import Control.Arrow (left)
import Control.Monad (void)
import Control.Monad.Combinators.Expr (Operator (..), makeExprParser)
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

symbol :: Text -> Parser Text
symbol = L.symbol sc

charLiteral :: Parser Char
charLiteral =
  lexeme (between (char '\'') (char '\'') L.charLiteral)
    <?> "char"

stringLiteral :: Parser Text
stringLiteral =
  lexeme (char '\"' >> Text.pack <$> manyTill L.charLiteral (char '\"'))
    <?> "string"

intLiteral :: Num a => Parser a
intLiteral =
  lexeme (L.signed sc L.decimal)
    <?> "integer"

parens :: Parser a -> Parser a
parens = between (symbol "(") (symbol ")")

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

pTerm :: Parser AST.Expr
pTerm =
  choice
    [ parens pExpr,
      AST.Var <$> pIdent,
      AST.Int <$> intLiteral
    ]

pExpr :: Parser AST.Expr
pExpr =
  makeExprParser pTerm operatorTable
    <?> "expression"

operatorTable :: [[Operator Parser AST.Expr]]
operatorTable =
  [ [ InfixL (AST.BinOp AST.Add <$ symbol "+"),
      InfixL (AST.BinOp AST.Sub <$ symbol "-")
    ]
  ]

pWhile :: Parser AST.Stmt
pWhile =
  L.nonIndented scn $ L.indentBlock scn do
    pKeyword "while"
    cond <- pExpr
    symbol ":"
    return (L.IndentSome Nothing (return . AST.While cond) pStmt)

pStmt :: Parser AST.Stmt
pStmt =
  choice
    [ pWhile,
      AST.Expr <$> pExpr <* scn
    ]
    <?> "statement"

pProgram :: Parser AST.Program
pProgram =
  AST.Program <$> many pStmt
    <?> "program"

parse :: Text -> Either Text AST.Program
parse =
  left (Text.pack . errorBundlePretty)
    . runParser (pProgram <* eof) ""
