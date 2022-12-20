{-# LANGUAGE BlockArguments #-}

module Nazuki.VM.Arch232.Memory
  ( doLoad,
    doStore,
  )
where

import Control.Monad
import qualified Data.Bits as Bits
import Nazuki.VM.Arch232.Common
import Nazuki.VM.Core
import Nazuki.VM.Util
import Nazuki.VM.VirtualMachine

incHeapPointer :: Oper
incHeapPointer = do
  hsize <- getHeapEntrySize
  bfInc
  forward hsize

clearHeapPointer :: Oper
clearHeapPointer = do
  hsize <- getHeapEntrySize
  backward hsize
  bfOpn
  bfDec
  backward hsize
  bfCls
  forward hsize

-- `load(i)` takes O(i^2) time.
doLoad :: Oper
doLoad = do
  consume 1
  let a = mem 0
  let a_ = mems [1 .. 32]
  dec a
  -- Ignore all but the lower 8 bits of the index.
  forM_ [31, 30 .. 8] \i -> do
    set (a_ i) 0
  forM_ [7, 6 .. 1] \i -> do
    while (a_ i) do
      dec (a_ i)
      add (a_ 0) (Bits.bit i)
  while (a_ 0) do
    dec (a_ 0)
    stackToHeap
    incHeapPointer
    heapToStack
  stackToHeap
  let ha = mem 0
  let ha_ = mems [1 .. 32]
  let hb = mem 33
  forM_ [0 .. 31] \i -> do
    while (ha_ i) do
      dec (ha_ i)
      inc hb
      heapToStack
      inc (a_ i)
      stackToHeap
    while hb do
      dec hb
      inc (ha_ i)
  clearHeapPointer
  heapToStack
  inc a
  produce 1

-- `store(i, x)` takes O(i^2) time.
doStore :: Oper
doStore = do
  consume 2
  let a = mem 0
  let a_ = mems [1 .. 32]
  let b = mem 33
  let b_ = mems [34 .. 65]
  dec b
  dec a
  -- Ignore all but the lower 8 bits of the index.
  forM_ [31, 30 .. 8] \i -> do
    set (a_ i) 0
  forM_ [7, 6 .. 1] \i -> do
    while (a_ i) do
      dec (a_ i)
      add (a_ 0) (Bits.bit i)
  while (a_ 0) do
    dec (a_ 0)
    stackToHeap
    incHeapPointer
    heapToStack
  let ha = mem 0
  let ha_ = mems [1 .. 32]
  forM_ [31, 30 .. 0] \i -> do
    inc b
    while (b_ i) do
      dec (b_ i)
      dec b
      stackToHeap
      set (ha_ i) 1
      heapToStack
    while b do
      dec b
      stackToHeap
      set (ha_ i) 0
      heapToStack
  stackToHeap
  clearHeapPointer
  heapToStack
  produce 0
