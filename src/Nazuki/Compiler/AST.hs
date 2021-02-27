module Nazuki.Compiler.AST
  ( Program (..),
    Stmt (..),
    Expr (..),
    Ident (..),
    BinOp (..),
  )
where

import Data.Text (Text)

newtype Program
  = Program [Stmt]
  deriving (Eq, Show)

data Stmt
  = Expr Expr
  | If (Expr, [Stmt]) [(Expr, [Stmt])] (Maybe [Stmt])
  | While Expr [Stmt]
  deriving (Eq, Show)

data Expr
  = Var Ident
  | Int Int
  | Char Char
  | String Text
  | BinOp BinOp Expr Expr
  | Assign Ident Expr
  deriving (Eq, Show)

newtype Ident
  = Ident Text
  deriving (Eq, Ord, Show)

data BinOp
  = Add
  | Sub
  deriving (Eq, Show)
