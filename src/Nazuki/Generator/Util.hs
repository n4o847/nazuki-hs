{-# LANGUAGE BlockArguments #-}
{-# LANGUAGE LambdaCase #-}

module Nazuki.Generator.Util
    ( raw
    , enter
    , exit
    , at
    , add
    , sub
    , getc
    , putc
    , while
    , set
    , ifElse
    , incs
    , decs
    )
where

import           Control.Monad
import           Nazuki.Generator.Core

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
        _   -> bfNop

enter :: Int -> Oper
enter p =
    if p >= 0 then
        replicateM_ p bfFwd
    else
        replicateM_ (negate p) bfBwd

exit :: Int -> Oper
exit p =
    enter (negate p)

at :: Int -> Oper -> Oper
at p oper = do
    enter p
    oper
    exit p

add :: Int -> Int -> Oper
add p x =
    at p
        if x >= 0 then
            replicateM_ x bfInc
        else
            replicateM_ (negate x) bfDec

sub :: Int -> Int -> Oper
sub p x =
    add p (negate x)

getc :: Int -> Oper
getc p =
    at p bfGet

putc :: Int -> Oper
putc p =
    at p bfPut

while :: Int -> Oper -> Oper
while p block = do
    at p bfOpn
    block
    at p bfCls

set :: Int -> Int -> Oper
set p x = do
    while p $
        sub p 1
    add p x

ifElse :: Int -> Int -> Oper -> Oper -> Oper
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

incs :: Int -> Oper
incs p =
    at p $
        raw "[>]+<[-<]>"

decs :: Int -> Oper
decs p =
    at p $
        raw "-[++>-]<[<]>"
