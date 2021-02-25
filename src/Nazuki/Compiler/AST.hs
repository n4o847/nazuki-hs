module Nazuki.Compiler.AST
  ( Program (..),
    Stmt (..),
    Expr (..),
    Ident (..),
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
  = Get Ident
  | Assign Ident Expr
  deriving (Eq, Show)

newtype Ident = Ident Text
  deriving (Eq, Show)
