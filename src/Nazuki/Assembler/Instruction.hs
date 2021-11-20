{-# LANGUAGE BlockArguments #-}
{-# LANGUAGE LambdaCase #-}

module Nazuki.Assembler.Instruction where

import Control.Monad
import Data.Int (Int32)
import qualified Data.Map as Map
import qualified Data.Maybe as Maybe
import Data.Text (Text)
import qualified Nazuki.CodeGen.Arch232.IO as IO
import qualified Nazuki.CodeGen.Arch232.Int32 as I32
import qualified Nazuki.CodeGen.Arch232.Memory as I
import qualified Nazuki.CodeGen.Core as G
import qualified Nazuki.CodeGen.Util as G
import qualified Nazuki.CodeGen.VirtualMachine as G

data Instruction
  = Const Int32
  | Dup
  | Get Int
  | Set Int
  | Drop
  | Not
  | And
  | Or
  | Xor
  | Shl
  | ShrU
  | ShrS
  | Inc
  | Add
  | Sub
  | Mul10
  | Mul
  | Eqz
  | Nez
  | Eq
  | LtS
  | LeS
  | LtU
  | LeU
  | GtS
  | GeS
  | GtU
  | GeU
  | Scan
  | Print
  | Getc
  | Putc
  | Write Text
  | Load
  | Store
  | Jump Int
  | Jz Int
  | Jnz Int
  | Jeq Int
  deriving (Eq, Ord, Show)

generate :: [Instruction] -> Text
generate list = G.generate do
  G.assemble 33 do
    set <-
      foldM
        ( \set ins -> do
            if Map.member ins set
              then pure set
              else do
                opcode <- G.register $ insToOper ins
                pure $ Map.insert ins opcode set
        )
        Map.empty
        list
    forM_ list \ins -> do
      Maybe.fromJust $ Map.lookup ins set

insToOper :: Instruction -> G.Oper
insToOper = \case
  Const x -> I32.doConst x
  Dup -> I32.doDup
  Get x -> I32.doGet x
  Set x -> I32.doSet x
  Drop -> I32.doDrop
  Not -> I32.doNot
  And -> I32.doAnd
  Or -> I32.doOr
  Xor -> I32.doXor
  Shl -> I32.doShl
  ShrU -> I32.doShrU
  ShrS -> I32.doShrS
  Inc -> I32.doInc
  Add -> I32.doAdd
  Sub -> I32.doSub
  Mul10 -> I32.doMul10
  Mul -> I32.doMul
  Eqz -> I32.doEqz
  Nez -> I32.doNez
  Eq -> I32.doEq
  LtS -> I32.doLtS
  LeS -> I32.doLeS
  LtU -> I32.doLtU
  LeU -> I32.doLeU
  GtS -> I32.doGtS
  GeS -> I32.doGeS
  GtU -> I32.doGtU
  GeU -> I32.doGeU
  Scan -> I32.doScan
  Print -> I32.doPrint
  Getc -> IO.doGetc
  Putc -> IO.doPutc
  Write s -> G.puts (G.mem 0) s
  Load -> I.doLoad
  Store -> I.doStore
  Jump r -> I32.doJump r
  Jz r -> I32.doJz r
  Jnz r -> I32.doJnz r
  Jeq r -> I32.doJeq r
