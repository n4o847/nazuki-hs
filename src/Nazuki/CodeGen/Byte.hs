{-# LANGUAGE BlockArguments #-}

module Nazuki.CodeGen.Byte
  ( doConst,
    doDup,
    doDrop,
    doSwap,
    doNot,
    doAdd,
    doSub,
    doScan,
    doPutsIfElse,
    doPutsCase,
  )
where

import Control.Monad
import qualified Data.Text as T
import Nazuki.CodeGen.Core
import Nazuki.CodeGen.Util

consume :: Int -> Oper
consume a =
  backward (2 * a)

produce :: Int -> Oper
produce a =
  forward (2 * a)

doConst :: Int -> Oper
doConst a = do
  let head = mem 0
  let body = mem 1
  consume 0
  add head 1
  add body (a `mod` 256)
  produce 1

doDup :: Oper
doDup = do
  let aHead = mem 0
  let aBody = mem 1
  let bHead = mem 2
  let bBody = mem 3
  consume 1
  while aBody do
    sub aBody 1
    add bHead 1
    add bBody 1
  while bHead do
    sub bHead 1
    add aBody 1
  add bHead 1
  produce 2

doDrop :: Oper
doDrop = do
  let head = mem 0
  let body = mem 1
  consume 1
  set body 0
  sub head 1
  produce 0

doSwap :: Oper
doSwap = do
  let aHead = mem 0
  let aBody = mem 1
  let bHead = mem 2
  let bBody = mem 3
  consume 2
  sub bHead 1
  while aBody do
    sub aBody 1
    add bHead 1
  while bBody do
    sub bBody 1
    add aBody 1
  while bHead do
    sub bHead 1
    add bBody 1
  add bHead 1
  produce 2

doNot :: Oper
doNot = do
  let head = mem 0
  let body = mem 1
  consume 1
  while body do
    set body 0
    sub head 1
  while head do
    sub head 1
    add body 1
  add head 1
  produce 1

doAdd :: Oper
doAdd = do
  let aHead = mem 0
  let aBody = mem 1
  let bHead = mem 2
  let bBody = mem 3
  consume 2
  while bBody do
    sub bBody 1
    add aBody 1
  sub bHead 1
  produce 1

doSub :: Oper
doSub = do
  let aHead = mem 0
  let aBody = mem 1
  let bHead = mem 2
  let bBody = mem 3
  consume 2
  while bBody do
    sub bBody 1
    sub aBody 1
  sub bHead 1
  produce 1

doScan :: Oper
doScan = do
  let head = mem 0
  let body = mem 1
  let input = mem 2
  let continue = mem 3
  consume 0
  add continue 1
  while continue do
    sub continue 1
    getc input
    sub input 10
    while input do
      add input 10
      sub input 32
      while input do
        add input 32
        sub input 48
        add continue 1
        while body do
          sub body 1
          add head 1
        while head do
          sub head 1
          add body 10
        while input do
          sub input 1
          add body 1
  add head 1
  produce 1

doPutsIfElse :: T.Text -> T.Text -> Oper
doPutsIfElse st sf = do
  let head = mem 0
  let body = mem 1
  consume 1
  while body do
    set body 0
    sub head 1
    puts body st
  while head do
    sub head 1
    puts head sf
  produce 0

doPutsCase :: [(Int, T.Text)] -> Oper
doPutsCase cases = do
  let m0 = mem 0
  let m1 = mem 1
  let m2 = mem 2
  let m3 = mem 3
  consume 1
  forM_ cases \(n, s) -> do
    while m1 do
      sub m1 1
      add m2 1
      add m3 1
    while m3 do
      sub m3 1
      add m1 1
    sub m2 n
    add m3 1
    while m2 do
      set m2 0
      sub m3 1
    while m3 do
      sub m3 1
      puts m3 s
  set m1 0
  sub m0 1
  produce 0
