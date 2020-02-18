{-# LANGUAGE BlockArguments #-}
{-# LANGUAGE LambdaCase #-}

module Nazuki.Generator.Assembler
  ( assemble
  )
where

import           Control.Monad
import qualified Data.Bits as Bits
import qualified Data.Map as Map
import           Nazuki.Generator.Core
import           Nazuki.Generator.Util

assemble :: [(Int, Oper)] -> [Int] -> Oper
assemble isa_ opcodes = do
  let isa = Map.fromList isa_
  let isize = Bits.finiteBitSize (Map.size isa - 1) - Bits.countLeadingZeros (Map.size isa - 1)
  let tmp = 0
  let cmd = (1 +)
  bfDec
  forward (isize + 1)
  forM_ (reverse opcodes) \bits -> do
    forM_ [0 .. isize - 1] \i -> do
      when (Bits.testBit bits i) do
        add (cmd i) 1
    forward (isize + 1)
  backward (isize + 1)
  bfInc
  while tmp do
    sub tmp 1
    let seeBit i bits = do
          if i >= 0 then
            ifElse (cmd i) tmp (
              seeBit (i - 1) (Bits.setBit bits i)
            ) (
              seeBit (i - 1) bits
            )
          else do
            forM_ (Map.lookup bits isa) \op -> do
              ipToSp (isize + 1) 33
              op
              spToIp 33 (isize + 1)
    seeBit (isize - 1) 0
    add tmp 1
    backward (isize + 1)
    add tmp 1

spToIp :: Int -> Int -> Oper
spToIp ssize isize = do
  backward ssize
  bfOpn
  backward ssize
  bfCls
  backward isize
  bfOpn
  backward isize
  bfCls

ipToSp :: Int -> Int -> Oper
ipToSp isize ssize = do
  forward isize
  bfOpn
  forward isize
  bfCls
  forward ssize
  bfOpn
  forward ssize
  bfCls
