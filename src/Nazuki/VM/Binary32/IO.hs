{-# LANGUAGE BlockArguments #-}
{-# LANGUAGE OverloadedStrings #-}

module Nazuki.VM.Binary32.IO
  ( doGetc,
    doPutc,
  )
where

import Control.Monad
import Data.Bits qualified as Bits
import Nazuki.VM.Binary32.Common
import Nazuki.VM.Core
import Nazuki.VM.Util

doGetc :: Oper
doGetc = do
  consume 0
  let a = mem 0
  let a_ = mems [1 .. 32]
  at (a_ 8) do
    bfGet
  while (a_ 8) do
    sub (a_ 8) 1
    incs (a_ 0)
  add a 1
  produce 1

doPutc :: Oper
doPutc = do
  consume 1
  let a = mem 0
  let a_ = mems [1 .. 32]
  forM_ [31, 30 .. 8] \i ->
    set (a_ i) 0
  forM_ [7, 6 .. 1] \i ->
    while (a_ i) do
      sub (a_ i) 1
      add (a_ 0) (Bits.bit i)
  at (a_ 0) do
    bfPut
  set (a_ 0) 0
  sub a 1
  produce 0
