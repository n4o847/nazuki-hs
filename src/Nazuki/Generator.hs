{-# LANGUAGE OverloadedStrings #-}

module Nazuki.Generator (generate) where

import           Control.Monad.State
import qualified Data.Text as T

data BfCmd
    = Inc
    | Dec
    | Fwd
    | Bwd
    | Opn
    | Cls
    | Get
    | Put
    deriving Show

type Operation = State [BfCmd] ()

nop :: Operation
nop = return ()

raw :: String -> Operation
raw =
    foldM_
    (\_ c ->
        case c of
            '+' -> bfInc
            '-' -> bfDec
            '>' -> bfFwd
            '<' -> bfBwd
            '[' -> bfOpn
            ']' -> bfCls
            ',' -> bfGet
            '.' -> bfPut
            _ -> nop)
    ()

bfInc :: Operation
bfInc =
    modify $ \cmds ->
        case cmds of
            Dec:xs -> xs
            _      -> Inc:cmds

bfDec :: Operation
bfDec =
    modify $ \cmds ->
        case cmds of
            Inc:xs -> xs
            _      -> Dec:cmds

bfFwd :: Operation
bfFwd =
    modify $ \cmds ->
        case cmds of
            Bwd:xs -> xs
            _      -> Fwd:cmds

bfBwd :: Operation
bfBwd =
    modify $ \cmds ->
        case cmds of
            Fwd:xs -> xs
            _      -> Bwd:cmds

bfOpn :: Operation
bfOpn = modify (Opn:)

bfCls :: Operation
bfCls = modify (Cls:)

bfGet :: Operation
bfGet = modify (Get:)

bfPut :: Operation
bfPut = modify (Put:)

enter :: Int -> Operation
enter p =
    if p >= 0
    then replicateM_ p bfFwd
    else replicateM_ (negate p) bfBwd

exit :: Int -> Operation
exit p = enter $ negate p

at :: Int -> Operation -> Operation
at p oper = do
    enter p
    oper
    exit p

add :: Int -> Int -> Operation
add p x =
    at p $
        if x >= 0
        then replicateM_ x bfInc
        else replicateM_ (negate x) bfDec

sub :: Int -> Int -> Operation
sub p x = add p $ negate x

getc :: Int -> Operation
getc p = at p bfGet

while :: Int -> Operation -> Operation
while p block = do
    at p bfOpn
    block
    at p bfCls

set :: Int -> Int -> Operation
set p x = do
    while p $ sub p 1
    add p x

ifElse :: Int -> Int -> Operation -> Operation -> Operation
ifElse flg tmp cons alt = do
    while flg $ do
        cons
        sub tmp 1
        sub flg 1
    add flg 1
    add tmp 1
    while tmp $ do
        sub tmp 1
        sub flg 1
        alt

incs :: Int -> Operation
incs p = at p $ raw "[>]+<[-<]>"

decs :: Int -> Operation
decs p = at p $ raw "-[++>-]<[<]>"

generate :: () -> [BfCmd]
generate _ =
    execState i32Not []

i32Not :: Operation
i32Not = do
    let body = (1 +)  -- [1 .. 32]
    let helper = (2 +)  -- [2 .. 33]
    enter 33
    forM_ [31, 30 .. 0] $ \i -> do
        add (helper i) 1
        while (body i) $ do
            sub (body i) 1
            sub (body i) 1
    forM_ [0 .. 31] $ \i ->
        while (body i) $ do
            sub (helper i) 1
            add (body i) 1
    exit 33
