{-# LANGUAGE BlockArguments #-}
{-# LANGUAGE LambdaCase #-}

module Nazuki.Generator.IntOf2To32
    ( intOf2To32Const
    , intOf2To32Dup
    , intOf2To32Get
    , intOf2To32Not
    , intOf2To32And
    , intOf2To32Or
    , intOf2To32Xor
    , intOf2To32Shl
    , intOf2To32Inc
    , intOf2To32Add
    , intOf2To32Sub
    , intOf2To32Mul10
    , intOf2To32Mul
    , intOf2To32Eqz
    , intOf2To32Nez
    , intOf2To32Eq
    , intOf2To32LtU
    , intOf2To32LeU
    , intOf2To32GtU
    , intOf2To32GeU
    , intOf2To32Scan
    , intOf2To32Print
    , intOf2To32Jump
    , intOf2To32Jez
    , intOf2To32Jnz
    , intOf2To32Jeq
    )
where

import           Control.Monad
import qualified Data.Bits                     as Bits
import           Data.Int                       ( Int32 )
import           Data.Word                      ( Word32 )
import           Nazuki.Generator.Core
import           Nazuki.Generator.Util
import           Nazuki.Generator.Assembler

consume :: Int -> Oper
consume a =
    exit (33 * a)

produce :: Int -> Oper
produce a =
    enter (33 * a)

intOf2To32Const :: Int32 -> Oper
intOf2To32Const x = do
    let a = 0
    let a_ = (1 +)
    consume 0
    add a 1
    forM_ [0 .. 31] \i ->
        if Bits.testBit x i then
            add (a_ i) 1
        else
            bfNop
    produce 1

-- 4546 bytes
intOf2To32Dup :: Oper
intOf2To32Dup = do
    intOf2To32Get (-1)

intOf2To32Get :: Int -> Oper
intOf2To32Get x
-- non-negative indices count from the front of the stack
    | x >= 0 = do
        let a = 0
        let a_ = (1 +)
        let b = 0
        let b_ = (1 +)
        let t = 33
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
                add t 1
                add (b_ i) 1
                toFront
            toBack
            while t do
                sub t 1
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
        add b 1
        produce 1
-- negative indices count from the back of the stack
    | x < 0 = do
        let a = 33 * x
        let a_ = (a + 1 +)
        let b = 0
        let b_ = (1 +)
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

-- 480 bytes
intOf2To32Not :: Oper
intOf2To32Not = do
    let a_ = (1 +)  -- [1 .. 32]
    let helper = (2 +)  -- [2 .. 33]
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
intOf2To32And :: Oper
intOf2To32And = do
    let a_ = (1 +)  -- [1 .. 32]
    let b = 33
    let b_ = (34 +)  -- [34 .. 65]
    consume 2
    forM_ [31, 30 .. 0] \i -> do
        sub (b_ i) 1
        while (b_ i) do
            add (b_ i) 1
            set (a_ i) 0
    sub b 1
    produce 1

-- 2370 bytes
intOf2To32Or :: Oper
intOf2To32Or = do
    let a_ = (1 +)  -- [1 .. 32]
    let b = 33
    let b_ = (34 +)  -- [34 .. 65]
    consume 2
    forM_ [31, 30 .. 0] \i ->
        while (b_ i) do
            sub (b_ i) 1
            set (a_ i) 1
    sub b 1
    produce 1

-- 3836 bytes
intOf2To32Xor :: Oper
intOf2To32Xor = do
    let a = 0
    let a_ = (1 +)  -- [1 .. 32]
    let b = 33
    let b_ = (34 +)  -- [34 .. 65]
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

-- 503 bytes
intOf2To32Shl :: Oper
intOf2To32Shl = do
    let a_ = (1 +)
    let b = 33
    let b_ = (34 +)
    consume 2
    forM_ [31, 30 .. 5] \i ->
        set (b_ i) 0
    forM_ [4, 3 .. 1] \i ->
        while (b_ i) do
            sub (b_ i) 1
            add (b_ 0) (Bits.bit i)
    while (b_ 0) do
        sub (b_ 0) 1
        set (b_ 31) 0
        forM_ [31, 30 .. 0] \i ->
            while (a_ i) do
                sub (a_ i) 1
                add (a_ $ i + 1) 1
    sub b 1
    produce 1

-- 81 bytes
intOf2To32Inc :: Oper
intOf2To32Inc = do
    let a = 0
    let a_ = (1 +)
    let carry = 33
    consume 1
    sub a 1
    incs $ a_ 0
    add a 1
    set carry 0
    produce 1

-- 6855 bytes
intOf2To32Add :: Oper
intOf2To32Add = do
    let a = 0
    let a_ = (1 +)
    let b = 33
    let b_ = (34 +)
    let carry = 66
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
intOf2To32Sub :: Oper
intOf2To32Sub = do
    intOf2To32Not
    intOf2To32Inc
    intOf2To32Add

-- 952 bytes
intOf2To32Mul10 :: Oper
intOf2To32Mul10 = do
    let a = 0
    let a_ = (1 +)
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
intOf2To32Mul :: Oper
intOf2To32Mul = do
    let a = 0
    let a_ = (1 +)
    let b = 33
    let b_ = (34 +)
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

intOf2To32FlipLsb :: Oper
intOf2To32FlipLsb = do
    let a = 0
    let a_ = (1 +)
    consume 1
    while (a_ 0) do
        sub (a_ 0) 1
        sub a 1
    while a do
        sub a 1
        add (a_ 0) 1
    add a 1
    produce 1

-- 358 bytes
intOf2To32Eqz :: Oper
intOf2To32Eqz = do
    intOf2To32Nez
    intOf2To32FlipLsb

-- 341 bytes
intOf2To32Nez :: Oper
intOf2To32Nez = do
    let a = 0
    let a_ = (1 +)
    consume 1
    forM_ [31, 30 .. 1] \i ->
        while (a_ i) do
            sub (a_ i) 1
            set (a_ $ i - 1) 1
    produce 1

-- 4194 bytes
intOf2To32Eq :: Oper
intOf2To32Eq = do
    intOf2To32Xor
    intOf2To32Eqz

data LtUOrGeU = LtU | GeU
_intOf2To32LtUOrGeU :: LtUOrGeU -> Oper
_intOf2To32LtUOrGeU t = do
    let a = 0
    let a_ = (a + 1 +)
    let b = 33
    let b_ = (b + 1 +)
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
_intOf2To32GtUOrLeU :: GtUOrLeU -> Oper
_intOf2To32GtUOrLeU t = do
    let a = 0
    let a_ = (a + 1 +)
    let b = 33
    let b_ = (b + 1 +)
    let c = 66
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

-- 5034 bytes
intOf2To32LtU :: Oper
intOf2To32LtU = _intOf2To32LtUOrGeU LtU

-- 4907 bytes
intOf2To32LeU :: Oper
intOf2To32LeU = _intOf2To32GtUOrLeU LeU

-- 5036 bytes
intOf2To32GtU :: Oper
intOf2To32GtU = _intOf2To32GtUOrLeU GtU

-- 5033 bytes
intOf2To32GeU :: Oper
intOf2To32GeU = _intOf2To32LtUOrGeU GeU

-- 2073 bytes
intOf2To32Scan :: Oper
intOf2To32Scan = do
    let a = 0
    let a_ = (1 +)
    let temp = 33
    let digitValue = 33 + 1
    let flagLoop = 33 + 2
    let flagNeg = 33 + 3
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
            at 33 do
                intOf2To32Mul10
            add temp 1
        while temp do
            sub temp 1
            add flagLoop 1
        addDigit
    add a 1
    -- Negate
    while flagNeg do
        sub flagNeg 1
        at 33 do
            intOf2To32Not
            intOf2To32Inc
    produce 1

-- 4682 bytes
intOf2To32Print :: Oper
intOf2To32Print = do
    let a = 0
    let a_ = (1 +)
    let temp = 33
    let temp0 = 34
    consume 1
    -- 負数用の処理 ここから
    while (a_ 31) do
        add temp 45
        putc temp
        set temp 0
        enter 33
        intOf2To32Not
        exit 33
        sub a 1
        incs (a_ 0)
        add a 1
        while (a_ 31) do
            sub (a_ 31) 1
            add temp0 1
    while temp0 do
        sub temp0 1
        add (a_ 31) 1
    -- 負数用の処理 ここまで
    -- 2 ** 31 に注意
    forM_ [0 .. 31] \i -> do
        let digits = toDigits (Bits.bit i :: Word32)
        while (a_ i) do
            sub (a_ i) 1
            foldM_ (\j d -> do
                add (temp + 3 * j) (fromIntegral d)
                return $ j + 1
                ) 0 digits
    forM_ [0 .. 8] \j -> do
        let dividend  = temp + 3 * j
        let divisor   = temp + 3 * j + 1
        let remainder = temp + 3 * j + 2
        let quotient  = temp + 3 * j + 3
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
        let s1 = temp + 3 * j - 2
        let t0 = temp + 3 * j
        let t1 = temp + 3 * j + 1
        let t2 = temp + 3 * j + 2
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
        let t0 = temp
        let t1 = temp + 1
        set t1 0
        add t0 48
        putc t0
        set t0 0
    sub a 1
    produce 0
    where
        toDigits 0 = []
        toDigits n = let (q, r) = n `quotRem` 10 in r:toDigits q

intOf2To32Jump :: Int -> Oper
intOf2To32Jump rel = do
    jump 33 rel

_intOf2To32JumpOnLsb :: Int -> Oper
_intOf2To32JumpOnLsb rel = do
    let a = 0
    let a0 = 1
    consume 1
    sub a 1
    while a0 do
        sub a0 1
        intOf2To32Jump rel
    produce 0

intOf2To32Jez :: Int -> Oper
intOf2To32Jez rel = do
    intOf2To32Eqz
    _intOf2To32JumpOnLsb rel

intOf2To32Jnz :: Int -> Oper
intOf2To32Jnz rel = do
    intOf2To32Nez
    _intOf2To32JumpOnLsb rel

intOf2To32Jeq :: Int -> Oper
intOf2To32Jeq rel = do
    intOf2To32Eq
    _intOf2To32JumpOnLsb rel
