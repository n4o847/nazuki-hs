{-# LANGUAGE OverloadedStrings #-}

module Nazuki.Generator (generate) where

import           Control.Monad.State
import           Data.Bits
import           Data.Int
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

main :: Operation
main = i32Not

generate :: () -> String
generate _ =
    let cmds = execState main [] in
        foldl (\code cmd -> toChar cmd:code) "" cmds
    where
        toChar Inc = '+'
        toChar Dec = '-'
        toChar Fwd = '>'
        toChar Bwd = '<'
        toChar Opn = '['
        toChar Cls = ']'
        toChar Get = ','
        toChar Put = '.'

i32Const :: Int32 -> Operation
i32Const a = do
    let head = 0
    let body = (1 +)
    exit 0
    add head 1
    forM_ [0 .. 31] $ \i ->
        if testBit a i
        then add (body i) 1
        else nop
    enter 33

i32Not :: Operation
i32Not = do
    let body = (1 +)  -- [1 .. 32]
    let helper = (2 +)  -- [2 .. 33]
    exit 33
    forM_ [31, 30 .. 0] $ \i -> do
        add (helper i) 1
        while (body i) $ do
            sub (body i) 1
            sub (helper i) 1
    forM_ [0 .. 31] $ \i ->
        while (helper i) $ do
            sub (helper i) 1
            add (body i) 1
    enter 33

i32And :: Operation
i32And = do
    let aBody = (1 +)  -- [1 .. 32]
    let bHead = 33
    let bBody = (34 +)  -- [34 .. 65]
    exit 66
    forM_ [31, 30 .. 0] $ \i -> do
        sub (bBody i) 1
        while (bBody i) $ do
            add (bBody i) 1
            set (aBody i) 0
    sub bHead 1
    enter 33

i32Or :: Operation
i32Or = do
    let aBody = (1 +)  -- [1 .. 32]
    let bHead = 33
    let bBody = (34 +)  -- [34 .. 65]
    exit 66
    forM_ [31, 30 .. 0] $ \i ->
        while (bBody i) $ do
            sub (bBody i) 1
            set (aBody i) 1
    sub bHead 1
    enter 33

i32Xor :: Operation
i32Xor = do
    let aHead = 0
    let aBody = (1 +)  -- [1 .. 32]
    let bHead = 33
    let bBody = (34 +)  -- [34 .. 65]
    exit 66
    -- 降順の方が若干短い。
    forM_ [31, 30 .. 0] $ \i ->
        while (bBody i) $ do
            sub (bBody i) 1
            -- i < 13 で分けると生成コードが一番短くなる。
            let temp = if i < 13 then aHead else bHead
            while (aBody i) $ do
                sub (aBody i) 1
                sub temp 1
            while temp $ do
                sub temp 1
                add (bBody i) 1
            add temp 1
    sub bHead 1
    enter 33

i32Shl :: Operation
i32Shl = do
    let aBody = (1 +)
    let bHead = 33
    let bBody = (34 +)
    exit 66
    forM_ [31, 30 .. 5] $ \i ->
        set (bBody i) 0
    forM_ [4, 3 .. 1] $ \i ->
        while (bBody i) $ do
            sub (bBody i) 1
            add (bBody 0) (bit i)
    while (bBody 0) $ do
        sub (bBody 0) 1
        set (bBody 31) 0
        forM_ [31, 30 .. 0] $ \i ->
            while (aBody i) $ do
                sub (aBody i) 1
                add (aBody $ i + 1) 1
    sub bHead 1
    enter 33

i32Inc :: Operation
i32Inc = do
    let head = 0
    let body = (1 +)
    let carry = 33
    exit 33
    sub head 1
    incs $ body 0
    add head 1
    set carry 0
    enter 33
