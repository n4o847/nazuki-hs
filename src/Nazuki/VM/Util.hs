{-# LANGUAGE BlockArguments #-}
{-# LANGUAGE LambdaCase #-}
{-# LANGUAGE OverloadedStrings #-}

module Nazuki.VM.Util
  ( mem,
    mems,
    raw,
    forward,
    enter,
    backward,
    exit,
    at,
    inc,
    dec,
    add,
    sub,
    getc,
    putc,
    while,
    set,
    branch,
    branchMut,
    branchOnce,
    incs,
    decs,
    puts,
  )
where

import Control.Monad
import Data.Char (ord)
import Data.Text (Text)
import Data.Text qualified as Text
import Nazuki.Util
import Nazuki.VM.Core

newtype Ptr = Ptr Int

mem :: Int -> Ptr
mem = Ptr

mems :: [Int] -> Int -> Ptr
mems s i = Ptr (head s + i)

fromChar :: Char -> Oper
fromChar = \case
  '+' -> bfInc
  '-' -> bfDec
  '>' -> bfFwd
  '<' -> bfBwd
  '[' -> bfOpn
  ']' -> bfCls
  ',' -> bfGet
  '.' -> bfPut
  _ -> bfNop

raw :: Text -> Oper
raw =
  mapM_ fromChar . Text.unpack

forward :: Int -> Oper
forward =
  bfStep

enter :: Ptr -> Oper
enter (Ptr a) =
  forward a

backward :: Int -> Oper
backward =
  bfStep . negate

exit :: Ptr -> Oper
exit (Ptr a) =
  backward a

at :: Ptr -> Oper -> Oper
at p oper = do
  enter p
  oper
  exit p

inc :: Ptr -> Oper
inc p =
  at p bfInc

dec :: Ptr -> Oper
dec p =
  at p bfDec

add :: Ptr -> Int -> Oper
add p x =
  at p do
    if x >= 0
      then replicateM_ x bfInc
      else replicateM_ (negate x) bfDec

sub :: Ptr -> Int -> Oper
sub p x =
  add p (negate x)

getc :: Ptr -> Oper
getc p =
  at p bfGet

putc :: Ptr -> Oper
putc p =
  at p bfPut

while :: Ptr -> Oper -> Oper
while p block = do
  at p bfOpn
  block
  at p bfCls

set :: Ptr -> Int -> Oper
set p x = do
  while p $
    sub p 1
  add p x

-- | The version of the branch that does not change the position and does not consume the conditional value.
--
--   * Before executing `branch`, the value of `cond` MUST be either 0 or 1.
--   * Before executing `branch`, the value of `temp` MUST be 0.
--
--   * If the value of `cond` is 1, then:
--
--       * Execute `doCons`.
--       * After executing `doCons`, the value of `cond` MUST NOT change from before.
--         The value is preserved after executing `branchMut`.
--       * After executing `doCons`, the value of `temp` MUST be 0.
--
--   * If the value of `cond` is 0, then:
--
--       * Execute `doAlt`.
--       * After executing `doAlt`, the value of `cond` MUST NOT change from before.
--         The value is preserved after executing `branchMut`.
--       * After executing `doAlt`, the value of `temp` MUST be 0.
branch :: Ptr -> Ptr -> Oper -> Oper -> Oper
branch cond temp doCons doAlt = do
  while cond do
    doCons
    sub temp 1
    sub cond 1
  add cond 1
  add temp 1
  while temp do
    sub temp 1
    sub cond 1
    doAlt

-- | The version of the branch that may change the position and does not consume the conditional value.
--
--   * Before executing `branchMut`, the value of `cond` MUST be either 0 or 1.
--   * Before executing `branchMut`, the value of `temp` MUST be 0.
--
--   * If the value of `cond` is 1, then:
--
--       * Execute `doCons`.
--       * After executing `doCons`, the value of `cond` MAY change from before.
--         Whether the value changes or not, the value is preserved after executing `branchMut` and `doAlt` is not executed.
--       * After executing `doCons`, the value of `temp` MUST be 0.
--
--   * If the value of `cond` is 0, then:
--
--       * Execute `doAlt`.
--       * After executing `doAlt`, the value of `cond` MAY change from before.
--         Whether the value changes or not, the value is preserved after executing `branchMut` and `doCons` is not executed.
--       * After executing `doAlt`, the value of `temp` MUST be 0.
branchMut :: Ptr -> Ptr -> Oper -> Oper -> Oper
branchMut cond temp doCons doAlt = do
  while cond do
    doCons
    sub temp 1
    while cond do
      sub cond 1
      sub temp 1
  add cond 1
  add temp 2
  while temp do
    sub temp 1
    sub cond 1
    while temp do
      sub temp 1
      doAlt

-- | The version of the branch that may change the position and consumes the conditional value.
--
--   * Before executing `branchOnce`, the value of `cond` MUST be either 0 or 1.
--   * Before executing `branchOnce`, the value of `temp` MUST be 0.
--
--   * If the value of `cond` is 1, then:
--
--       * Set the value of `cond` to 0.
--       * Execute `doCons`.
--       * After executing `doCons`, the value of `cond` MAY change from before.
--         Whether the value changes or not, the value is preserved after executing `branchOnce` and `doAlt` is not executed.
--       * After executing `doCons`, the value of `temp` MUST be 0.
--
--   * If the value of `cond` is 0, then:
--
--       * Execute `doAlt`.
--       * After executing `doAlt`, the value of `cond` MAY change from before.
--         Whether the value changes or not, the value is preserved after executing `branchOnce` and `doCons` is not executed.
--       * After executing `doAlt`, the value of `temp` MUST be 0.
branchOnce :: Ptr -> Ptr -> Oper -> Oper -> Oper
branchOnce cond temp doCons doAlt = do
  while cond do
    sub cond 1
    doCons
    sub temp 1
  add temp 1
  while temp do
    sub temp 1
    doAlt

-- The value of `p - 1` must be 0.
-- Consider the sequence of the values from `p` to the right as a binary number
-- with `p` as the LSB and increment the value by 1.
incs :: Ptr -> Oper
incs p =
  at p $
    raw "[>]+<[-<]>"

-- The value of `p - 1` must be 0.
-- Consider the sequence of the values from `p` to the right as a binary number
-- with `p` as the LSB and decrement the value by 1.
decs :: Ptr -> Oper
decs p =
  at p $
    raw "-[++>-]<[<]>"

puts :: Ptr -> Text -> Oper
puts p s =
  forM_ (encode s) \c -> do
    add p (fromIntegral c)
    putc p
    sub p (fromIntegral c)
