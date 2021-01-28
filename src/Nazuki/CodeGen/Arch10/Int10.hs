{-# LANGUAGE BlockArguments #-}

-- Int10 has:
--   - 10 decimal digits
--
-- The layoyt is:
--    0                 9
--   [ | | | | | | | | | ]
--
-- Sign:
--   - A negative number is represented by the ten's complement
--     of the absolute value.

module Nazuki.CodeGen.Arch10.Int10
  ( doConst,
  )
where

import Control.Monad
import Data.Int (Int32)
import Nazuki.CodeGen.Core
import Nazuki.CodeGen.Util

consume :: Int -> Oper
consume a =
  backward (10 * a)

produce :: Int -> Oper
produce a =
  forward (10 * a)

doConst :: Int32 -> Oper
doConst x = do
  let a = mem 0
  let a_ = mems [1 .. 10]
  consume 0
  add a 1
  let ds = toDigits $ abs x
  forM_ (zip [0 .. 9] ds) \(i, d) -> do
    add (a_ i) (fromIntegral d)
  when (x < 0) do
    add (a_ 9) 5
  produce 1
  where
    toDigits 0 = []
    toDigits n = let (q, r) = n `quotRem` 10 in r : toDigits q
