{-# LANGUAGE BlockArguments #-}
{-# LANGUAGE LambdaCase #-}

module Nazuki.Generator.Util
  ( mem,
    mems,
    raw,
    forward,
    enter,
    backward,
    exit,
    at,
    add,
    sub,
    getc,
    putc,
    while,
    set,
    ifElse,
    ifElseMut,
    incs,
    decs,
    puts,
  )
where

import Control.Monad
import Data.Char (ord)
import Nazuki.Generator.Core

newtype Ptr = Ptr Int

mem :: Int -> Ptr
mem = Ptr

mems :: [Int] -> Int -> Ptr
mems s i = Ptr (s !! i)

raw :: String -> Oper
raw =
  mapM_ \case
    '+' -> bfInc
    '-' -> bfDec
    '>' -> bfFwd
    '<' -> bfBwd
    '[' -> bfOpn
    ']' -> bfCls
    ',' -> bfGet
    '.' -> bfPut
    _ -> bfNop

forward :: Int -> Oper
forward a =
  if a >= 0
    then replicateM_ a bfFwd
    else replicateM_ (negate a) bfBwd

enter :: Ptr -> Oper
enter (Ptr a) =
  forward a

backward :: Int -> Oper
backward a =
  forward (negate a)

exit :: Ptr -> Oper
exit (Ptr a) =
  backward a

at :: Ptr -> Oper -> Oper
at p oper = do
  enter p
  oper
  exit p

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

ifElse :: Ptr -> Ptr -> Oper -> Oper -> Oper
ifElse flg tmp cons alt = do
  while flg do
    cons
    sub tmp 1
    sub flg 1
  add flg 1
  add tmp 1
  while tmp do
    sub tmp 1
    sub flg 1
    alt

-- in case flg is changed after cons
ifElseMut :: Ptr -> Ptr -> Oper -> Oper -> Oper
ifElseMut flg tmp cons alt = do
  while flg do
    cons
    sub tmp 1
    while flg do
      sub flg 1
      sub tmp 1
  add flg 1
  add tmp 2
  while tmp do
    sub tmp 1
    sub flg 1
    while tmp do
      sub tmp 1
      alt

incs :: Ptr -> Oper
incs p =
  at p $
    raw "[>]+<[-<]>"

decs :: Ptr -> Oper
decs p =
  at p $
    raw "-[++>-]<[<]>"

puts :: Ptr -> String -> Oper
puts p s =
  forM_ s \c -> do
    add p (ord c)
    putc p
    sub p (ord c)
