{-# LANGUAGE BlockArguments #-}
{-# LANGUAGE LambdaCase #-}
{-# LANGUAGE OverloadedStrings #-}

module Nazuki.Compiler.CodeGen
  ( generate,
  )
where

import Control.Monad.Except
import Control.Monad.State.Strict
import Data.Text (Text)
import qualified Data.Text as Text
import Nazuki.Assembler.Instruction (Instruction)
import qualified Nazuki.Assembler.Instruction as I
import Nazuki.Assembler.Label (Labeled)
import qualified Nazuki.Compiler.AST as AST

newtype GeneratorState = GeneratorState
  { instructions :: [Instruction]
  }

type Generator = StateT GeneratorState (Either Text) ()

emptyGeneratorState :: GeneratorState
emptyGeneratorState =
  GeneratorState
    { instructions = []
    }

push :: Instruction -> Generator
push i =
  modify' \s -> s {instructions = i : instructions s}

append :: [Instruction] -> Generator
append is =
  modify' \s -> s {instructions = is ++ instructions s}

generate :: AST.Program -> Either Text [Instruction]
generate program =
  reverse . instructions <$> execStateT (fromProgram program) emptyGeneratorState

fromProgram :: AST.Program -> Generator
fromProgram (AST.Program statements) =
  mapM_ fromStmt statements

fromStmt :: AST.Stmt -> Generator
fromStmt = \case
  AST.Expr expr ->
    fromExpr expr
  AST.While cond body ->
    fromWhile cond body

fromExpr :: AST.Expr -> Generator
fromExpr = \case
  AST.Var ident ->
    fromVar ident
  AST.Int int ->
    fromInt int
  AST.Char char ->
    fromChar char
  AST.String string ->
    throwError "cannot use a string as a value"
  AST.BinOp op left right ->
    fromBinOp op left right
  AST.Assign ident expr ->
    fromAssign ident expr

fromVar :: AST.Ident -> Generator
fromVar =
  undefined

fromInt :: Int -> Generator
fromInt int =
  push (I.Const (fromIntegral int))

fromChar :: Char -> Generator
fromChar char =
  push (I.Const (fromIntegral (fromEnum char)))

fromBinOp :: AST.BinOp -> AST.Expr -> AST.Expr -> Generator
fromBinOp op left right = do
  fromExpr left
  fromExpr right
  push case op of
    AST.Add -> I.Add
    AST.Sub -> I.Sub

fromAssign :: AST.Ident -> AST.Expr -> Generator
fromAssign ident expr = do
  fromExpr expr
  undefined

fromWhile :: AST.Expr -> [AST.Stmt] -> Generator
fromWhile cond body =
  undefined
