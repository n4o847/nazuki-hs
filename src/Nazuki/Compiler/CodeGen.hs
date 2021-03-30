{-# LANGUAGE BlockArguments #-}
{-# LANGUAGE LambdaCase #-}
{-# LANGUAGE OverloadedStrings #-}

module Nazuki.Compiler.CodeGen
  ( generate,
  )
where

import Control.Monad.Except
import Control.Monad.State.Strict
import Data.Map (Map)
import qualified Data.Map as Map
import Data.Text (Text)
import qualified Data.Text as Text
import Nazuki.Assembler.Instruction (Instruction)
import qualified Nazuki.Assembler.Instruction as I
import Nazuki.Assembler.Label (Labeled (..))
import qualified Nazuki.Compiler.AST as AST

data Type
  = TyUnit
  | TyInt
  deriving (Eq)

data GeneratorState = GeneratorState
  { instructions :: [Labeled Instruction],
    environment :: Map AST.Ident (Type, Int),
    nextLabel :: Int
  }

type Generator = StateT GeneratorState (Either Text)

emptyGeneratorState :: GeneratorState
emptyGeneratorState =
  GeneratorState
    { instructions = [],
      environment = Map.empty,
      nextLabel = 0
    }

push :: Labeled Instruction -> Generator ()
push i =
  modify' \s -> s {instructions = i : instructions s}

append :: [Labeled Instruction] -> Generator ()
append is =
  modify' \s -> s {instructions = reverse is ++ instructions s}

createLabel :: Text -> Generator Text
createLabel prefix = do
  state <- get
  let label = nextLabel state
  put state {nextLabel = label + 1}
  return (prefix <> Text.pack (show label))

generate :: AST.Program -> Either Text [Labeled Instruction]
generate program =
  reverse . instructions <$> execStateT (fromProgram program) emptyGeneratorState

fromProgram :: AST.Program -> Generator ()
fromProgram (AST.Program statements) =
  mapM_ fromStmt statements

fromStmt :: AST.Stmt -> Generator ()
fromStmt = \case
  AST.Expr expr -> do
    t0 <- fromExpr expr
    case t0 of
      TyUnit -> return ()
      TyInt -> push (L0 I.Drop)
  AST.Assign ident expr ->
    fromAssign ident expr
  AST.AugAssign ident op expr ->
    fromAugAssign ident op expr
  AST.If a b c ->
    fromIf a b c
  AST.While cond body ->
    fromWhile cond body

fromExpr :: AST.Expr -> Generator Type
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
  AST.Call callee arguments ->
    fromCall callee arguments

fromVar :: AST.Ident -> Generator Type
fromVar ident = do
  env <- gets environment
  (t0, index) <- case Map.lookup ident env of
    Just item -> do
      return item
    Nothing -> do
      let AST.Ident name = ident
      throwError ("\"" <> name <> "\" is not defined")
  push (L0 (I.Get index))
  return t0

fromInt :: Int -> Generator Type
fromInt int = do
  push (L0 (I.Const (fromIntegral int)))
  return TyInt

fromChar :: Char -> Generator Type
fromChar char = do
  push (L0 (I.Const (fromIntegral (fromEnum char))))
  return TyInt

fromBinOp :: AST.BinOp -> AST.Expr -> AST.Expr -> Generator Type
fromBinOp op left right = do
  t0 <- fromExpr left
  t1 <- fromExpr right
  when ((t0, t1) /= (TyInt, TyInt)) do
    throwError "invalid types"
  case op of
    AST.Shl -> push (L0 I.Shl)
    AST.Shr -> push (L0 I.ShrS)
    AST.BitAnd -> push (L0 I.And)
    AST.BitOr -> push (L0 I.Or)
    AST.BitXor -> push (L0 I.Xor)
    AST.Add -> push (L0 I.Add)
    AST.Sub -> push (L0 I.Sub)
    AST.Mul -> push (L0 I.Mul)
    AST.Lt -> push (L0 I.LtS)
    AST.Le -> push (L0 I.LeS)
    AST.Gt -> push (L0 I.GtS)
    AST.Ge -> push (L0 I.GeS)
    AST.Eq -> push (L0 I.Eq)
    AST.Ne -> append [L0 I.Eq, L0 (I.Const 1), L0 I.Xor]
    AST.And -> push (L0 I.And)
    AST.Or -> push (L0 I.Or)
  return TyInt

fromCall :: AST.Expr -> [AST.Expr] -> Generator Type
fromCall callee arguments =
  case callee of
    AST.Var (AST.Ident "min") ->
      case arguments of
        [a, b] -> do
          t0 <- fromExpr a
          t1 <- fromExpr b
          when ((t0, t1) /= (TyInt, TyInt)) do
            throwError "invalid types"
          append
            [ L0 (I.Get (-2)),
              L0 (I.Get (-2)),
              L0 I.LeS,
              L0 (I.Jez 2),
              L0 I.Drop,
              L0 (I.Jump 1),
              L0 (I.Set (-1))
            ]
          return TyInt
        _ ->
          throwError "invalid arguments"
    AST.Var (AST.Ident "max") ->
      case arguments of
        [a, b] -> do
          t0 <- fromExpr a
          t1 <- fromExpr b
          when ((t0, t1) /= (TyInt, TyInt)) do
            throwError "invalid types"
          append
            [ L0 (I.Get (-2)),
              L0 (I.Get (-2)),
              L0 I.GeS,
              L0 (I.Jez 2),
              L0 I.Drop,
              L0 (I.Jump 1),
              L0 (I.Set (-1))
            ]
          return TyInt
        _ ->
          throwError "invalid arguments"
    AST.Var (AST.Ident "abs") ->
      case arguments of
        [a] -> do
          t0 <- fromExpr a
          when (t0 /= TyInt) do
            throwError "invalid types"
          append
            [ L0 (I.Get (-1)),
              L0 (I.Const 0),
              L0 I.LtS,
              L0 (I.Jez 2),
              L0 I.Not,
              L0 I.Inc
            ]
          return TyInt
        _ ->
          throwError "invalid arguments"
    AST.Var (AST.Ident "scan") ->
      case arguments of
        [] -> do
          push (L0 I.Scan)
          return TyInt
        _ ->
          throwError "invalid arguments"
    AST.Var (AST.Ident "getc") ->
      case arguments of
        [] -> do
          push (L0 I.Getc)
          return TyInt
        _ ->
          throwError "invalid arguments"
    AST.Var (AST.Ident "print") -> do
      forM_ arguments \case
        AST.Int int -> do
          _ <- fromInt int
          push (L0 I.Print)
        AST.Char char -> do
          _ <- fromChar char
          push (L0 I.Putc)
        AST.String string -> do
          push (L0 (I.Write string))
        expr -> do
          t0 <- fromExpr expr
          when (t0 /= TyInt) do
            throwError "invalid types"
          push (L0 I.Print)
      return TyUnit
    AST.Var (AST.Ident "putc") ->
      case arguments of
        [a] -> do
          t0 <- fromExpr a
          when (t0 /= TyInt) do
            throwError "invalid types"
          push (L0 I.Putc)
          return TyUnit
        _ ->
          throwError "invalid arguments"
    _ ->
      throwError "function call is not implemented"

fromAssign :: AST.Ident -> AST.Expr -> Generator ()
fromAssign ident expr = do
  t0 <- fromExpr expr
  env <- gets environment
  case Map.lookup ident env of
    Just (t1, index) -> do
      when (t0 /= t1) do
        throwError "mismatched types"
      push (L0 (I.Set index))
    Nothing -> do
      let index = Map.size env
      modify' \s -> s {environment = Map.insert ident (t0, index) env}

fromAugAssign :: AST.Ident -> AST.BinOp -> AST.Expr -> Generator ()
fromAugAssign ident op expr = do
  fromAssign ident (AST.BinOp op (AST.Var ident) expr)

fromIf :: (AST.Expr, [AST.Stmt]) -> [(AST.Expr, [AST.Stmt])] -> Maybe [AST.Stmt] -> Generator ()
fromIf a b c = do
  lEnd <- createLabel "L"
  forM_ (init (a : b)) \(cond, body) -> do
    lNext <- createLabel "L"
    fromExpr cond
    push (L1 I.Jez lNext)
    mapM_ fromStmt body
    push (L1 I.Jump lEnd)
    push (Label lNext)
  let (cond, body) = last (a : b)
  case c of
    Just d -> do
      lNext <- createLabel "L"
      fromExpr cond
      push (L1 I.Jez lNext)
      mapM_ fromStmt body
      push (L1 I.Jump lEnd)
      push (Label lNext)
      mapM_ fromStmt d
      push (Label lEnd)
    Nothing -> do
      fromExpr cond
      push (L1 I.Jez lEnd)
      mapM_ fromStmt body
      push (Label lEnd)

fromWhile :: AST.Expr -> [AST.Stmt] -> Generator ()
fromWhile cond body = do
  lStart <- createLabel "L"
  lEnd <- createLabel "L"
  push (Label lStart)
  fromExpr cond
  push (L1 I.Jez lEnd)
  mapM_ fromStmt body
  push (L1 I.Jump lStart)
  push (Label lEnd)
