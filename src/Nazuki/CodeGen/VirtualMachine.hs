{-# LANGUAGE BlockArguments #-}
{-# LANGUAGE StrictData #-}

module Nazuki.CodeGen.VirtualMachine
  ( assemble,
    register,
    immediate,
    jump,
  )
where

import Control.Monad
import Control.Monad.State.Strict
import qualified Data.Bits as Bits
import Data.Map (Map)
import qualified Data.Map as Map
import Nazuki.CodeGen.Core
import Nazuki.CodeGen.Util

type Isa = Map Int Oper

data Asm = Asm
  { isa :: Isa,
    opcodes :: [Int]
  }

getIsa :: State Asm (Map Int Oper)
getIsa = gets isa

putIsa :: Isa -> State Asm ()
putIsa isa = modify' \asm -> asm {isa = isa}

consOpcode :: Int -> State Asm ()
consOpcode opcode = modify' \asm -> asm {opcodes = opcode : opcodes asm}

empty :: Asm
empty =
  Asm
    { isa = Map.empty,
      opcodes = []
    }

logBase2 :: Bits.FiniteBits b => b -> Int
logBase2 x = Bits.finiteBitSize x - 1 - Bits.countLeadingZeros x

register :: Oper -> State Asm (State Asm ())
register op = do
  isa <- getIsa
  let opcode = Map.size isa
  putIsa $ Map.insert opcode op isa
  pure $ consOpcode opcode

immediate :: Oper -> State Asm (State Asm ())
immediate op = do
  consOp <- register op
  consOp
  pure consOp

assemble :: Int -> State Asm () -> Oper
assemble ssize asmState = do
  let Asm isa opcodes = execState asmState empty
  let csize = logBase2 (Map.size isa - 1) + 2
  putCodeEntrySize csize
  putStackEntrySize ssize
  let tmp = mem 0
  let cmd = mems [1 ..]
  bfDec
  forward csize
  forM_ opcodes \bits -> do
    forM_ [0 .. csize - 2] \i -> do
      when (Bits.testBit bits i) do
        add (cmd i) 1
    forward csize
  backward csize
  bfInc
  while tmp do
    sub tmp 1
    let seeBit i bits = do
          if i >= 0
            then
              ifElseMut
                (cmd i)
                tmp
                ( seeBit (i - 1) (Bits.setBit bits i)
                )
                ( seeBit (i - 1) bits
                )
            else do
              forM_ (Map.lookup bits isa) \op -> do
                codeToStack
                op
                stackToCode
    seeBit (csize - 2) 0
    add tmp 1
    backward csize
    add tmp 1

stackToCode :: Oper
stackToCode = do
  csize <- getCodeEntrySize
  ssize <- getStackEntrySize
  backward ssize
  bfOpn
  backward ssize
  bfCls
  backward csize
  bfOpn
  backward csize
  bfCls

codeToStack :: Oper
codeToStack = do
  csize <- getCodeEntrySize
  ssize <- getStackEntrySize
  forward csize
  bfOpn
  forward csize
  bfCls
  forward ssize
  bfOpn
  forward ssize
  bfCls

jump :: Int -> Oper
jump rel = do
  csize <- getCodeEntrySize
  ssize <- getStackEntrySize
  stackToCode
  if rel >= 0
    then do
      replicateM_ rel do
        bfInc
        backward csize
    else do
      replicateM_ (negate rel) do
        forward csize
        bfDec
  codeToStack
