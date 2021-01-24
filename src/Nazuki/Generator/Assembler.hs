{-# LANGUAGE BlockArguments #-}
{-# LANGUAGE LambdaCase #-}

module Nazuki.Generator.Assembler
  ( assemble,
    register,
    immediate,
    jump,
  )
where

import Control.Monad
import Control.Monad.State
import qualified Data.Bits as Bits
import qualified Data.Map as Map
import Nazuki.CodeGen.Core
import Nazuki.CodeGen.Util

type Isa = Map.Map Int Oper

data Asm = Asm
  { isa :: Isa,
    opcodes :: [Int]
  }

getIsa :: State Asm (Map.Map Int Oper)
getIsa = gets isa

putIsa :: Isa -> State Asm ()
putIsa isa = modify \asm -> asm {isa = isa}

consOpcode :: Int -> State Asm ()
consOpcode opcode = modify \asm -> asm {opcodes = opcode : opcodes asm}

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
  pure $ consOp

assemble :: Int -> (State Asm ()) -> Oper
assemble ssize asmState = do
  let Asm isa opcodes = execState asmState empty
  let isize = logBase2 (Map.size isa - 1) + 2
  putIsize isize
  let tmp = mem 0
  let cmd = mems [1 ..]
  bfDec
  forward isize
  forM_ opcodes \bits -> do
    forM_ [0 .. isize - 2] \i -> do
      when (Bits.testBit bits i) do
        add (cmd i) 1
    forward isize
  backward isize
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
                ipToSp ssize
                op
                spToIp ssize
    seeBit (isize - 2) 0
    add tmp 1
    backward isize
    add tmp 1

spToIp :: Int -> Oper
spToIp ssize = do
  isize <- getIsize
  backward ssize
  bfOpn
  backward ssize
  bfCls
  backward isize
  bfOpn
  backward isize
  bfCls

ipToSp :: Int -> Oper
ipToSp ssize = do
  isize <- getIsize
  forward isize
  bfOpn
  forward isize
  bfCls
  forward ssize
  bfOpn
  forward ssize
  bfCls

jump :: Int -> Int -> Oper
jump ssize rel = do
  isize <- getIsize
  spToIp ssize
  if rel >= 0
    then do
      replicateM_ rel do
        bfInc
        backward isize
    else do
      replicateM_ (negate rel) do
        forward isize
        bfDec
  ipToSp ssize
