module Nazuki.Compiler.AST
  ( Program (..),
    Stmt (..),
    Expr (..),
    Ident (..),
    Op (..),
  )
where

import Data.Text (Text)

newtype Program
  = Program [Stmt]
  deriving (Eq, Show)

newtype Stmt
  = Expr Expr
  deriving (Eq, Show)

data Expr
  = Var Ident
  | Int Int
  | Char Char
  | String Text
  | BinOp Op Expr Expr
  | Assign Ident Expr
  deriving (Eq, Show)

newtype Ident = Ident Text
  deriving (Eq, Show)

data Op
  = Add
  | Sub
  deriving (Eq, Show)
