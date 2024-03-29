{-# LANGUAGE BlockArguments #-}
{-# LANGUAGE OverloadedStrings #-}
{-# LANGUAGE TupleSections #-}

module Nazuki.Script.Parser
  ( parse,
  )
where

import Control.Arrow (left)
import Control.Monad (void)
import Control.Monad.Combinators.Expr (Operator (..), makeExprParser)
import Data.Text (Text)
import Data.Text qualified as Text
import Data.Void (Void)
import Nazuki.Script.AST qualified as AST
import Text.Megaparsec hiding (parse)
import Text.Megaparsec.Char
import Text.Megaparsec.Char.Lexer qualified as L

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

intLiteral :: (Num a) => Parser a
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
      AST.Int <$> intLiteral,
      AST.Char <$> charLiteral,
      AST.String <$> stringLiteral
    ]

pExpr :: Parser AST.Expr
pExpr =
  makeExprParser pTerm operatorTable
    <?> "expression"

operatorTable :: [[Operator Parser AST.Expr]]
operatorTable =
  [ [ somePostfix (flip AST.Call <$> parens (pExpr `sepBy` symbol ","))
    ],
    [ InfixL (AST.BinOp AST.Mul <$ symbol "*")
    ],
    [ InfixL (AST.BinOp AST.Add <$ symbol "+"),
      InfixL (AST.BinOp AST.Sub <$ symbol "-")
    ],
    [ InfixL (AST.BinOp AST.Shl <$ symbol "<<"),
      InfixL (AST.BinOp AST.Shr <$ symbol ">>")
    ],
    [ InfixL (AST.BinOp AST.BitAnd <$ symbol "&")
    ],
    [ InfixL (AST.BinOp AST.BitXor <$ symbol "^")
    ],
    [ InfixL (AST.BinOp AST.BitOr <$ symbol "|")
    ],
    [ InfixN (AST.BinOp AST.Le <$ symbol "<="),
      InfixN (AST.BinOp AST.Lt <$ symbol "<"),
      InfixN (AST.BinOp AST.Ge <$ symbol ">="),
      InfixN (AST.BinOp AST.Gt <$ symbol ">"),
      InfixN (AST.BinOp AST.Eq <$ symbol "=="),
      InfixN (AST.BinOp AST.Ne <$ symbol "!=")
    ],
    [ InfixL (AST.BoolOp AST.And <$ pKeyword "and")
    ],
    [ InfixL (AST.BoolOp AST.Or <$ pKeyword "or")
    ]
  ]
  where
    somePostfix op = Postfix $ foldr1 (flip (.)) <$> some op

pAssign :: Parser AST.Stmt
pAssign =
  AST.Assign <$> (pIdent `sepBy1` symbol ",") <* symbol "=" <*> pExpr

pAugAssign :: Parser AST.Stmt
pAugAssign =
  AST.AugAssign
    <$> pIdent
    <*> choice
      [ AST.Mul <$ symbol "*=",
        AST.Add <$ symbol "+=",
        AST.Sub <$ symbol "-=",
        AST.Shl <$ symbol "<<=",
        AST.Shr <$ symbol ">>=",
        AST.BitAnd <$ symbol "&=",
        AST.BitXor <$ symbol "^=",
        AST.BitOr <$ symbol "|="
      ]
    <*> pExpr

pIf :: Parser (AST.Expr, [AST.Stmt])
pIf =
  L.indentBlock scn do
    pKeyword "if"
    cond <- pExpr
    symbol ":"
    return (L.IndentSome Nothing (return . (cond,)) pStmt)

pElif :: Pos -> Parser (AST.Expr, [AST.Stmt])
pElif pos = do
  L.indentBlock scn do
    L.indentGuard scn EQ pos
    pKeyword "elif"
    cond <- pExpr
    symbol ":"
    return (L.IndentSome Nothing (return . (cond,)) pStmt)

pElse :: Pos -> Parser [AST.Stmt]
pElse pos = do
  L.indentBlock scn do
    L.indentGuard scn EQ pos
    pKeyword "else"
    symbol ":"
    return (L.IndentSome Nothing return pStmt)

pIfElifElse :: Parser AST.Stmt
pIfElifElse = do
  pos <- L.indentLevel
  AST.If <$> pIf <*> many (pElif pos) <*> optional (pElse pos)

pWhile :: Parser AST.Stmt
pWhile =
  L.indentBlock scn do
    pKeyword "while"
    cond <- pExpr
    symbol ":"
    return (L.IndentSome Nothing (return . AST.While cond) pStmt)

pStmt :: Parser AST.Stmt
pStmt =
  choice
    [ pIfElifElse,
      pWhile,
      try pAssign,
      try pAugAssign,
      AST.Expr <$> pExpr
    ]
    <?> "statement"

pProgram :: Parser AST.Program
pProgram =
  AST.Program <$> many (L.nonIndented scn pStmt <* scn)
    <?> "program"

parse :: Text -> Either Text AST.Program
parse =
  left (Text.pack . errorBundlePretty)
    . runParser (pProgram <* eof) ""
