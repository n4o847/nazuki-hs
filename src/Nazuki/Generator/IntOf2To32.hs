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
    , intOf2To32Eq
    , intOf2To32Scan
    , intOf2To32Print
    )
where

import           Control.Monad
import           Data.Bits                      ( bit
                                                , testBit
                                                )
import           Data.Int                       ( Int32 )
import           Data.Word                      ( Word32 )
import           Nazuki.Generator.Core
import           Nazuki.Generator.Util

consume :: Int -> Oper
consume a =
    exit (33 * a)

produce :: Int -> Oper
produce a =
    enter (33 * a)

intOf2To32Const :: Int32 -> Oper
intOf2To32Const a = do
    let head = 0
    let body = (1 +)
    consume 0
    add head 1
    forM_ [0 .. 31] \i ->
        if testBit a i then
            add (body i) 1
        else
            bfNop
    produce 1

-- 4546 bytes
intOf2To32Dup :: Oper
intOf2To32Dup = do
    intOf2To32Get 1

intOf2To32Get :: Int -> Oper
intOf2To32Get x = do
    let a = -33 * x
    let a' = (a + 1 +)
    let b = 0
    let b' = (1 +)
    consume 0
    forM_ [0 .. 31] \i -> do
        while (a' i) do
            sub (a' i) 1
            add b 1
            add (b' i) 1
        while b do
            sub b 1
            add (a' i) 1
    add b 1
    produce 1

-- 480 bytes
intOf2To32Not :: Oper
intOf2To32Not = do
    let body = (1 +)  -- [1 .. 32]
    let helper = (2 +)  -- [2 .. 33]
    consume 1
    forM_ [31, 30 .. 0] \i -> do
        add (helper i) 1
        while (body i) do
            sub (body i) 1
            sub (helper i) 1
    forM_ [0 .. 31] \i ->
        while (helper i) do
            sub (helper i) 1
            add (body i) 1
    produce 1

-- 2370 bytes
intOf2To32And :: Oper
intOf2To32And = do
    let aBody = (1 +)  -- [1 .. 32]
    let bHead = 33
    let bBody = (34 +)  -- [34 .. 65]
    consume 2
    forM_ [31, 30 .. 0] \i -> do
        sub (bBody i) 1
        while (bBody i) do
            add (bBody i) 1
            set (aBody i) 0
    sub bHead 1
    produce 1

-- 2370 bytes
intOf2To32Or :: Oper
intOf2To32Or = do
    let aBody = (1 +)  -- [1 .. 32]
    let bHead = 33
    let bBody = (34 +)  -- [34 .. 65]
    consume 2
    forM_ [31, 30 .. 0] \i ->
        while (bBody i) do
            sub (bBody i) 1
            set (aBody i) 1
    sub bHead 1
    produce 1

-- 5190 bytes
intOf2To32Xor :: Oper
intOf2To32Xor = do
    let aHead = 0
    let aBody = (1 +)  -- [1 .. 32]
    let bHead = 33
    let bBody = (34 +)  -- [34 .. 65]
    consume 2
    -- 降順の方が若干短い。
    forM_ [31, 30 .. 0] \i ->
        while (bBody i) do
            sub (bBody i) 1
            -- i < 13 で分けると生成コードが一番短くなる。
            let temp = if i < 13 then aHead else bHead
            while (aBody i) do
                sub (aBody i) 1
                sub temp 1
            while temp do
                sub temp 1
                add (aBody i) 1
            add temp 1
    sub bHead 1
    produce 1

-- 503 bytes
intOf2To32Shl :: Oper
intOf2To32Shl = do
    let aBody = (1 +)
    let bHead = 33
    let bBody = (34 +)
    consume 2
    forM_ [31, 30 .. 5] \i ->
        set (bBody i) 0
    forM_ [4, 3 .. 1] \i ->
        while (bBody i) do
            sub (bBody i) 1
            add (bBody 0) (bit i)
    while (bBody 0) do
        sub (bBody 0) 1
        set (bBody 31) 0
        forM_ [31, 30 .. 0] \i ->
            while (aBody i) do
                sub (aBody i) 1
                add (aBody $ i + 1) 1
    sub bHead 1
    produce 1

-- 81 bytes
intOf2To32Inc :: Oper
intOf2To32Inc = do
    let head = 0
    let body = (1 +)
    let carry = 33
    consume 1
    sub head 1
    incs $ body 0
    add head 1
    set carry 0
    produce 1

-- 6855 bytes
intOf2To32Add :: Oper
intOf2To32Add = do
    let a = 0
    let a' = (1 +)
    let b = 33
    let b' = (34 +)
    let carry = 66
    consume 2
    sub b 1
    forM_ [0 .. 31] \i -> do
        while (a' i) do
            sub (a' i) 1
            incs (b' i)
        while (b' i) do
            sub (b' i) 1
            add (a' i) 1
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
    let head = 0
    let body = (1 +)
    consume 1
    set (body 31) 0
    while (body 30) do
        sub (body 30) 1
        add (body 31) 1
    while (body 29) do
        sub (body 29) 1
        add (body 30) 1
    forM_ [28, 27 .. 0] \i ->
        while (body i) do
            sub (body i) 1
            while (body $ i + 2) do
                sub (body $ i + 2) 1
                add (body $ i + 1) 1
            incs (body $ i + 3)
            while (body $ i + 1) do
                sub (body $ i + 1) 1
                add (body $ i + 2) 1
            add (body $ i + 1) 1
    set (body 32) 0
    produce 1

-- 77400 bytes
intOf2To32Mul :: Oper
intOf2To32Mul = do
    let aHead = 0
    let aBody = (1 +)
    let bHead = 33
    let bBody = (34 +)
    consume 2
    sub bHead 1
    sub aHead 1
    forM_ [0 .. 31] \i -> do
        while (aBody i) do
            sub (aBody i) 1
            add (aBody $ i - 1) 1
    forM_ [31, 30 .. 0] \i -> do
        while (aBody $ i - 1) do
            sub (aBody $ i - 1) 1
            forM_ [0 .. 31 - i] \j -> do
                while (bBody j) do
                    sub (bBody j) 1
                    incs (aBody $ i + j)
                    set bHead 0
                    unless (i == 0) do
                        add bHead 1
                unless (i == 0) do
                    while bHead do
                        sub bHead 1
                        add (bBody j) 1
                unless (j == 31 - i) do
                    while (aBody $ i + j) do
                        sub (aBody $ i + j) 1
                        add (aBody $ i + j - 1) 1
            forM_ [31 - i, 30 - i .. 0] \j -> do
                unless (j == 31 - i) do
                    while (aBody $ i + j - 1) do
                        sub (aBody $ i + j - 1) 1
                        add (aBody $ i + j) 1
    forM_ [31, 30 .. 0] \j -> do
        set (bBody j) 0
    add aHead 1
    produce 1

-- 6513 bytes
intOf2To32Eq :: Oper
intOf2To32Eq = do
    intOf2To32Xor
    let a = 0
    let a' = (1 +)
    consume 1
    sub a 1
    forM_ [31, 30 .. 0] \i ->
        while (a' i) do
            sub (a' i) 1
            add a 1
    add (a' 0) 1
    while a do
        set a 0
        sub (a' 0) 1
    add a 1
    produce 1

-- 2073 bytes
intOf2To32Scan :: Oper
intOf2To32Scan = do
    let head = 0
    let body = (1 +)
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
                incs $ body 0
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
    add head 1
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
    let head = 0
    let body = (1 +)
    let temp = 33
    let temp0 = 34
    consume 1
    -- 負数用の処理 ここから
    while (body 31) do
        add temp 45
        putc temp
        set temp 0
        enter 33
        intOf2To32Not
        exit 33
        sub head 1
        incs (body 0)
        add head 1
        while (body 31) do
            sub (body 31) 1
            add temp0 1
    while temp0 do
        sub temp0 1
        add (body 31) 1
    -- 負数用の処理 ここまで
    -- 2 ** 31 に注意
    forM_ [0 .. 31] \i -> do
        let digits = toDigits (bit i :: Word32)
        while (body i) do
            sub (body i) 1
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
    sub head 1
    produce 0
    where
        toDigits 0 = []
        toDigits n = let (q, r) = n `quotRem` 10 in r:toDigits q
