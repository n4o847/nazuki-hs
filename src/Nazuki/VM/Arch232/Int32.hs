{-# LANGUAGE BlockArguments #-}
{-# LANGUAGE OverloadedStrings #-}

module Nazuki.VM.Arch232.Int32
  ( doConst,
    doDup,
    doGet,
    doSet,
    doDrop,
    doNot,
    doAnd,
    doOr,
    doXor,
    doShl,
    doShrU,
    doShrS,
    doInc,
    doAdd,
    doSub,
    doMul10,
    doMul,
    doEqz,
    doNez,
    doEq,
    doLtS,
    doLeS,
    doLtU,
    doLeU,
    doGtS,
    doGeS,
    doGtU,
    doGeU,
    doScan,
    doPrint,
    doJump,
    doJz,
    doJnz,
    doJeq,
  )
where

import Control.Monad
import qualified Data.Bits as Bits
import Data.Int (Int32)
import Data.Word (Word32)
import Nazuki.VM.Arch232.Common
import Nazuki.VM.Core
import Nazuki.VM.Util
import Nazuki.VM.VirtualMachine

doConst :: Int32 -> Oper
doConst x = do
  let a = mem 0
  let a_ = mems [1 .. 32]
  consume 0
  add a 1
  forM_ [0 .. 31] \i ->
    if Bits.testBit x i
      then add (a_ i) 1
      else bfNop
  produce 1

-- 4546 bytes
doDup :: Oper
doDup = do
  doGet (-1)

doGet :: Int -> Oper
doGet x
  -- non-negative indices count from the front of the stack
  | x >= 0 = do
      let a = mem 0
      let a_ = mems [1 .. 32]
      let b = mem 0
      let b_ = mems [1 .. 32]
      let toFront = backward 33 >> bfOpn >> backward 33 >> bfCls
      let toBack = forward 33 >> bfOpn >> forward 33 >> bfCls
      consume 0
      toFront
      forward 33
      replicateM_ x do
        bfDec
        forward 33
      bfDec
      forM_ [0 .. 31] \i -> do
        while (a_ i) do
          sub (a_ i) 1
          toBack
          add (b_ i) 1
          toFront
          add a 1
        while a do
          sub a 1
          add (a_ i) 1
      bfInc
      replicateM_ x do
        backward 33
        bfInc
      backward 33
      toBack
      add b 1
      produce 1
  -- negative indices count from the back of the stack
  | x < 0 = do
      let a = mem (33 * x)
      let a_ = mems [33 * x + 1 .. 33 * x + 32]
      let b = mem 0
      let b_ = mems [1 .. 32]
      consume 0
      forM_ [0 .. 31] \i -> do
        while (a_ i) do
          sub (a_ i) 1
          add b 1
          add (b_ i) 1
        while b do
          sub b 1
          add (a_ i) 1
      add b 1
      produce 1

doSet :: Int -> Oper
doSet x
  -- non-negative indices count from the front of the stack
  | x >= 0 = do
      let a = mem 0
      let a_ = mems [1 .. 32]
      let b = mem 0
      let b_ = mems [1 .. 32]
      let toFront = backward 33 >> bfOpn >> backward 33 >> bfCls
      let toBack = forward 33 >> bfOpn >> forward 33 >> bfCls
      consume 1
      sub b 1
      toFront
      forward 33
      replicateM_ x do
        bfDec
        forward 33
      bfDec
      forM_ [0 .. 31] \i -> do
        while (a_ i) do
          sub (a_ i) 1
      toBack
      forM_ [0 .. 31] \i -> do
        while (b_ i) do
          sub (b_ i) 1
          toFront
          add (a_ i) 1
          toBack
      toFront
      bfInc
      replicateM_ x do
        backward 33
        bfInc
      backward 33
      toBack
      produce 0
  -- negative indices count from the back of the stack
  | x < 0 = do
      let a = mem (33 * x)
      let a_ = mems [33 * x + 1 .. 33 * x + 32]
      let b = mem 0
      let b_ = mems [1 .. 32]
      consume 1
      sub b 1
      forM_ [0 .. 31] \i -> do
        while (a_ i) do
          sub (a_ i) 1
        while (b_ i) do
          sub (b_ i) 1
          add (a_ i) 1
      produce 0

doDrop :: Oper
doDrop = do
  let a = mem 0
  let a_ = mems [1 .. 32]
  consume 1
  forM_ [31, 30 .. 0] \i ->
    set (a_ i) 0
  sub a 1
  produce 0

-- 480 bytes
doNot :: Oper
doNot = do
  let a_ = mems [1 .. 32]
  let helper = mems [2 .. 33]
  consume 1
  forM_ [31, 30 .. 0] \i -> do
    add (helper i) 1
    while (a_ i) do
      sub (a_ i) 1
      sub (helper i) 1
  forM_ [0 .. 31] \i ->
    while (helper i) do
      sub (helper i) 1
      add (a_ i) 1
  produce 1

-- 2370 bytes
doAnd :: Oper
doAnd = do
  let a_ = mems [1 .. 32]
  let b = mem 33
  let b_ = mems [34 .. 65]
  consume 2
  forM_ [31, 30 .. 0] \i -> do
    sub (b_ i) 1
    while (b_ i) do
      add (b_ i) 1
      set (a_ i) 0
  sub b 1
  produce 1

-- 2370 bytes
doOr :: Oper
doOr = do
  let a_ = mems [1 .. 32]
  let b = mem 33
  let b_ = mems [34 .. 65]
  consume 2
  forM_ [31, 30 .. 0] \i ->
    while (b_ i) do
      sub (b_ i) 1
      set (a_ i) 1
  sub b 1
  produce 1

-- 3836 bytes
doXor :: Oper
doXor = do
  let a = mem 0
  let a_ = mems [1 .. 32]
  let b = mem 33
  let b_ = mems [34 .. 65]
  consume 2
  -- 降順の方が若干短い。
  forM_ [31, 30 .. 0] \i ->
    while (b_ i) do
      sub (b_ i) 1
      -- i < 13 で分けると生成コードが一番短くなる。
      let temp = if i < 13 then a else b
      while (a_ i) do
        sub (a_ i) 1
        sub temp 1
      while temp do
        sub temp 1
        add (a_ i) 1
      add temp 1
  sub b 1
  produce 1

data ShlOrShrUOrShrS = Shl | ShrU | ShrS

_doShlOrShrUOrShrS :: ShlOrShrUOrShrS -> Oper
_doShlOrShrUOrShrS t = do
  let a_ = mems [1 .. 32]
  let b = mem 33
  let b_ = mems [34 .. 65]
  consume 2
  forM_ [31, 30 .. 5] \i ->
    set (b_ i) 0
  forM_ [4, 3 .. 1] \i ->
    while (b_ i) do
      sub (b_ i) 1
      add (b_ 0) (Bits.bit i)
  case t of
    Shl -> do
      while (b_ 0) do
        sub (b_ 0) 1
        set (a_ 31) 0
        forM_ [30, 29 .. 0] \i ->
          while (a_ i) do
            sub (a_ i) 1
            add (a_ $ i + 1) 1
      sub b 1
    ShrU -> do
      while (b_ 0) do
        sub (b_ 0) 1
        set (a_ 0) 0
        forM_ [1 .. 31] \i ->
          while (a_ i) do
            sub (a_ i) 1
            add (a_ $ i - 1) 1
      sub b 1
    ShrS -> do
      sub b 1
      while (b_ 0) do
        sub (b_ 0) 1
        set (a_ 0) 0
        forM_ [1 .. 30] \i ->
          while (a_ i) do
            sub (a_ i) 1
            add (a_ $ i - 1) 1
        while (a_ 31) do
          sub (a_ 31) 1
          add b 1
        while b do
          sub b 1
          add (a_ 31) 1
          add (a_ 30) 1
  produce 1

-- 435 bytes
doShl :: Oper
doShl = _doShlOrShrUOrShrS Shl

-- 435 bytes
doShrU :: Oper
doShrU = _doShlOrShrUOrShrS ShrU

-- 446 bytes
doShrS :: Oper
doShrS = _doShlOrShrUOrShrS ShrS

-- 81 bytes
doInc :: Oper
doInc = do
  let a = mem 0
  let a_ = mems [1 .. 32]
  let carry = mem 33
  consume 1
  sub a 1
  incs $ a_ 0
  add a 1
  set carry 0
  produce 1

-- 6855 bytes
doAdd :: Oper
doAdd = do
  let a = mem 0
  let a_ = mems [1 .. 32]
  let b = mem 33
  let b_ = mems [34 .. 65]
  let carry = mem 66
  consume 2
  sub b 1
  forM_ [0 .. 31] \i -> do
    while (a_ i) do
      sub (a_ i) 1
      incs (b_ i)
    while (b_ i) do
      sub (b_ i) 1
      add (a_ i) 1
  set carry 0
  produce 1

-- 7416 bytes
doSub :: Oper
doSub = do
  doNot
  doInc
  doAdd

-- 952 bytes
doMul10 :: Oper
doMul10 = do
  let a = mem 0
  let a_ = mems [1 .. 33]
  consume 1
  set (a_ 31) 0
  while (a_ 30) do
    sub (a_ 30) 1
    add (a_ 31) 1
  while (a_ 29) do
    sub (a_ 29) 1
    add (a_ 30) 1
  forM_ [28, 27 .. 0] \i ->
    while (a_ i) do
      sub (a_ i) 1
      while (a_ $ i + 2) do
        sub (a_ $ i + 2) 1
        add (a_ $ i + 1) 1
      incs (a_ $ i + 3)
      while (a_ $ i + 1) do
        sub (a_ $ i + 1) 1
        add (a_ $ i + 2) 1
      add (a_ $ i + 1) 1
  set (a_ 32) 0
  produce 1

-- 77400 bytes
doMul :: Oper
doMul = do
  let a = mem 0
  let a_ = mems [1 .. 32]
  let b = mem 33
  let b_ = mems [34 .. 65]
  consume 2
  sub b 1
  sub a 1
  forM_ [0 .. 31] \i -> do
    while (a_ i) do
      sub (a_ i) 1
      add (a_ $ i - 1) 1
  forM_ [31, 30 .. 0] \i -> do
    while (a_ $ i - 1) do
      sub (a_ $ i - 1) 1
      forM_ [0 .. 31 - i] \j -> do
        while (b_ j) do
          sub (b_ j) 1
          incs (a_ $ i + j)
          set b 0
          unless (i == 0) do
            add b 1
        unless (i == 0) do
          while b do
            sub b 1
            add (b_ j) 1
        unless (j == 31 - i) do
          while (a_ $ i + j) do
            sub (a_ $ i + j) 1
            add (a_ $ i + j - 1) 1
      forM_ [31 - i, 30 - i .. 0] \j -> do
        unless (j == 31 - i) do
          while (a_ $ i + j - 1) do
            sub (a_ $ i + j - 1) 1
            add (a_ $ i + j) 1
  forM_ [31, 30 .. 0] \j -> do
    set (b_ j) 0
  add a 1
  produce 1

doFlipLsb :: Oper
doFlipLsb = do
  let a = mem 0
  let a_ = mems [1 .. 32]
  consume 1
  while (a_ 0) do
    sub (a_ 0) 1
    sub a 1
  while a do
    sub a 1
    add (a_ 0) 1
  add a 1
  produce 1

doFlipMsb :: Oper
doFlipMsb = do
  let a_ = mems [1 .. 32]
  let t = mem 33
  consume 1
  add t 1
  while (a_ 31) do
    sub (a_ 31) 1
    sub t 1
  while t do
    sub t 1
    add (a_ 31) 1
  produce 1

doFlipMsb2 :: Oper
doFlipMsb2 = do
  doFlipMsb
  let a = mem 0
  consume 1
  sub a 1
  doFlipMsb
  add a 1
  produce 1

-- 358 bytes
doEqz :: Oper
doEqz = do
  doNez
  doFlipLsb

-- 341 bytes
doNez :: Oper
doNez = do
  let a = mem 0
  let a_ = mems [1 .. 32]
  consume 1
  forM_ [31, 30 .. 1] \i ->
    while (a_ i) do
      sub (a_ i) 1
      set (a_ $ i - 1) 1
  produce 1

-- 4194 bytes
doEq :: Oper
doEq = do
  doXor
  doEqz

data LtUOrGeU = LtU | GeU

_doLtUOrGeU :: LtUOrGeU -> Oper
_doLtUOrGeU t = do
  let a = mem 0
  let a_ = mems [1 .. 32]
  let b = mem 33
  let b_ = mems [34 .. 65]
  consume 2
  sub a 1
  forM_ [0 .. 31] \i -> do
    while (b_ i) do
      sub (b_ i) 1
      decs (a_ i)
    set (a_ i) 0
  add a 1
  case t of
    LtU -> do
      add (a_ 0) 1
      while b do
        sub b 1
        sub (a_ 0) 1
    GeU -> do
      while b do
        sub b 1
        add (a_ 0) 1
  produce 1

data GtUOrLeU = GtU | LeU

_doGtUOrLeU :: GtUOrLeU -> Oper
_doGtUOrLeU t = do
  let a = mem 0
  let a_ = mems [1 .. 32]
  let b = mem 33
  let b_ = mems [34 .. 65]
  let c = mem 66
  consume 2
  add c 1
  sub b 1
  forM_ [0 .. 31] \i -> do
    while (a_ i) do
      sub (a_ i) 1
      decs (b_ i)
    set (b_ i) 0
  case t of
    GtU -> do
      add (a_ 0) 1
      while c do
        sub c 1
        sub (a_ 0) 1
    LeU -> do
      while c do
        sub c 1
        add (a_ 0) 1
  produce 1

-- 5064 bytes
doLtS :: Oper
doLtS = doFlipMsb2 >> doLtU

-- 5003 bytes
doLeS :: Oper
doLeS = doFlipMsb2 >> doLeU

-- 5034 bytes
doLtU :: Oper
doLtU = _doLtUOrGeU LtU

-- 4907 bytes
doLeU :: Oper
doLeU = _doGtUOrLeU LeU

-- 5132 bytes
doGtS :: Oper
doGtS = doFlipMsb2 >> doGtU

-- 5063 bytes
doGeS :: Oper
doGeS = doFlipMsb2 >> doGeU

-- 5036 bytes
doGtU :: Oper
doGtU = _doGtUOrLeU GtU

-- 5033 bytes
doGeU :: Oper
doGeU = _doLtUOrGeU GeU

-- 2073 bytes
doScan :: Oper
doScan = do
  let a = mem 0
  let a_ = mems [1 .. 32]
  let temp = mem 33
  let digitValue = mem (33 + 1)
  let flagLoop = mem (33 + 2)
  let flagNeg = mem (33 + 3)
  let evalDigit = do
        sub temp 48
        while temp do
          replicateM_ 9 do
            sub temp 1
            add digitValue 1
            at temp do
              raw "["
          set temp 0
          set digitValue 0
          sub flagLoop 1
          replicateM_ 9 do
            at temp do
              raw "]"
  let addDigit =
        while digitValue do
          sub digitValue 1
          incs $ a_ 0
          set temp 0
  consume 0
  -- Check if starting with '-'
  add flagNeg 1
  getc temp
  sub temp 45
  while temp do
    sub flagNeg 1
    add temp 45
    evalDigit
    addDigit
  -- Main
  add flagLoop 1
  while flagLoop do
    getc temp
    evalDigit
    while flagLoop do
      sub flagLoop 1
      at (mem 33) do
        doMul10
      add temp 1
    while temp do
      sub temp 1
      add flagLoop 1
    addDigit
  add a 1
  -- Negate
  while flagNeg do
    sub flagNeg 1
    at (mem 33) do
      doNot
      doInc
  produce 1

-- 4682 bytes
doPrint :: Oper
doPrint = do
  let a = mem 0
  let a_ = mems [1 .. 32]
  let temp = 33
  consume 1
  -- 負数用の処理 ここから
  do
    let t0 = mem temp
    let t1 = mem (temp + 1)
    while (a_ 31) do
      add t0 45
      putc t0
      set t0 0
      enter (mem 33)
      doNot
      exit (mem 33)
      sub a 1
      incs (a_ 0)
      add a 1
      while (a_ 31) do
        sub (a_ 31) 1
        add t1 1
    while t1 do
      sub t1 1
      add (a_ 31) 1
  -- 負数用の処理 ここまで
  -- 2 ** 31 に注意
  forM_ [0 .. 31] \i -> do
    let digits = toDigits (Bits.bit i :: Word32)
    while (a_ i) do
      sub (a_ i) 1
      foldM_
        ( \j d -> do
            let t = mem (temp + 3 * j)
            add t (fromIntegral d)
            return $ j + 1
        )
        0
        digits
  forM_ [0 .. 8] \j -> do
    let dividend = mem (temp + 3 * j)
    let divisor = mem (temp + 3 * j + 1)
    let remainder = mem (temp + 3 * j + 2)
    let quotient = mem (temp + 3 * j + 3)
    add divisor 10
    at dividend $
      -- https://esolangs.org/wiki/Brainfuck_algorithms#Divmod_algorithm
      -- >n d
      raw "[->-[>+>>]>[+[-<+>]>+>>]<<<<<]"
    -- >0 d-n%d n%d n/d
    set divisor 0
    while remainder do
      sub remainder 1
      add dividend 1
  forM_ [9, 8 .. 1] \j -> do
    let s1 = mem (temp + 3 * j - 2)
    let t0 = mem (temp + 3 * j)
    let t1 = mem (temp + 3 * j + 1)
    let t2 = mem (temp + 3 * j + 2)
    while t0 do
      sub t0 1
      add t1 1
      add t2 1
    while t1 do
      while t1 do
        set t1 0
        add s1 1
      add t2 48
      putc t2
      set t2 0
  do
    let t0 = mem temp
    let t1 = mem (temp + 1)
    set t1 0
    add t0 48
    putc t0
    set t0 0
  sub a 1
  produce 0
  where
    toDigits 0 = []
    toDigits n = let (q, r) = n `quotRem` 10 in r : toDigits q

doJump :: Int -> Oper
doJump rel = do
  jump rel

_doJumpOnLsb :: Int -> Oper
_doJumpOnLsb rel = do
  let a = mem 0
  let a0 = mem 1
  consume 1
  sub a 1
  while a0 do
    sub a0 1
    doJump rel
  produce 0

doJz :: Int -> Oper
doJz rel = do
  doEqz
  _doJumpOnLsb rel

doJnz :: Int -> Oper
doJnz rel = do
  doNez
  _doJumpOnLsb rel

doJeq :: Int -> Oper
doJeq rel = do
  doEq
  _doJumpOnLsb rel
