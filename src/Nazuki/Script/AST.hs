module Nazuki.Script.AST
  ( Program (..),
    Stmt (..),
    Expr (..),
    Ident (..),
    BoolOp (..),
    BinOp (..),
  )
where

import Data.Text (Text)

newtype Program
  = Program [Stmt]
  deriving (Eq, Show)

data Stmt
  = Expr Expr
  | Assign [Ident] Expr
  | AugAssign Ident BinOp Expr
  | If (Expr, [Stmt]) [(Expr, [Stmt])] (Maybe [Stmt])
  | While Expr [Stmt]
  deriving (Eq, Show)

data Expr
  = Var Ident
  | Int Int
  | Char Char
  | String Text
  | BoolOp BoolOp Expr Expr
  | BinOp BinOp Expr Expr
  | Call Expr [Expr]
  | Tuple [Expr]
  deriving (Eq, Show)

newtype Ident
  = Ident Text
  deriving (Eq, Ord, Show)

data BoolOp
  = And
  | Or
  deriving (Eq, Show)

data BinOp
  = Shl
  | Shr
  | BitAnd
  | BitOr
  | BitXor
  | Add
  | Sub
  | Mul
  | Lt
  | Le
  | Gt
  | Ge
  | Eq
  | Ne
  deriving (Eq, Show)
