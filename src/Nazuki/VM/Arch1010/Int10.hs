{-# LANGUAGE BlockArguments #-}
{-# LANGUAGE OverloadedStrings #-}

-- Int10 has:
--   - 10 decimal digits
--
-- Layout:
--    0                 9
--   [ | | | | | | | | | ]
--
-- Sign:
--   - A negative number is represented by the ten's complement
--     of the absolute value.

module Nazuki.VM.Arch1010.Int10
  ( doConst,
    doInc,
    doNeg,
    doPrint,
  )
where

import Control.Monad
import Data.Int (Int32)
import qualified Data.Text as Text
import Nazuki.VM.Core
import Nazuki.VM.Util

consume :: Int -> Oper
consume a =
  backward (11 * a)

produce :: Int -> Oper
produce a =
  forward (11 * a)

doConst :: Int32 -> Oper
doConst x = do
  consume 0
  let a = mem 0
  let a_ = mems [1 .. 10]
  add a 1
  let ds = toDigits x
  forM_ (zip [0 .. 9] ds) \(i, d) -> do
    add (a_ i) (fromIntegral d)
  produce 1
  where
    toDigits 0 = []
    toDigits n = let (d, m) = n `divMod` 10 in m : toDigits d

--   |x|---------a---------|-|-|-|
--   |_[d|d|d|d|d|d|d|d|d|d]0|0|0|
doInc :: Oper
doInc = do
  raw ">>-<<"
  raw ">++++++++++<"
  raw "<<<<<<<<<<"
  raw "+[----------[++++++++++>----------]>+]"
  raw "<<[-]"

doNeg :: Oper
doNeg = do
  consume 1
  let a = mem 0
  let a_ = mems [1 .. 10]
  let b = mem 11
  forM_ [9, 8 .. 0] \i -> do
    at (a_ i) do
      raw ">+++++++++<"
      raw "[->-<]"
  forM_ [0 .. 9] \i -> do
    at (a_ i) do
      raw ">[-<+>]<"
  at b do
    doInc
  produce 1

doPrint :: Oper
doPrint = do
  consume 1
  let a = mem 0
  let a_ = mems [1 .. 10]
  -- Process negative numbers
  do
    let t0 = mem 11
    let t1 = mem 12
    at (a_ 9) do
      raw "[->+<" -- if a[9] >= 1 then t0 += 1
      raw "[->+<" -- if a[9] >= 2 then t0 += 1
      raw "[->+<" -- if a[9] >= 3 then t0 += 1
      raw "[->+<" -- if a[9] >= 4 then t0 += 1
      raw "[[->+<]" -- if a[9] >= 5 then t0 = a[9]
      add (mem 0) 45
      putc (mem 0)
      set (mem 0) 0
      raw ">>+<<" -- t1 = 1
      raw "]"
      raw "]"
      raw "]"
      raw "]"
      raw "]"
    while t0 do
      sub t0 1
      add (a_ 9) 1
    while t1 do
      sub t1 1
      at t0 do
        doNeg
  -- Process digits
  forM_ [9, 8 .. 1] \i -> do
    at (a_ i) do
      raw "[->+>+<<]"
      raw ">[<+>[-]>"
      raw $ Text.replicate 48 "+"
      raw ".[-]<]<"
  do
    at (a_ 0) do
      raw ">[-]<"
      raw $ Text.replicate 48 "+"
      raw ".[-]"
  sub a 1
  produce 0
