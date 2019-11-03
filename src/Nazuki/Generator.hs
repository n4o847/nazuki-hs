{-# LANGUAGE BlockArguments #-}
{-# LANGUAGE LambdaCase #-}
{-# LANGUAGE OverloadedStrings #-}

module Nazuki.Generator
    ( generate'
    )
where

import           Control.Monad
import           Data.Bits
import           Data.Int
import           Data.Word
import qualified Data.Text as T
import           Nazuki.Generator.Core
import           Nazuki.Generator.Util
import           Nazuki.Generator.IntOf2To32

main :: Oper
main = do
    i32Const 1
    i32Const 31
    i32Shl
    i32Not
    i32Print

generate' :: () -> String
generate' _ =
    generate main

i32Const :: Int32 -> Oper
i32Const = intOf2To32Const

i32Not :: Oper
i32Not = intOf2To32Not

i32And :: Oper
i32And = do
    let aBody = (1 +)  -- [1 .. 32]
    let bHead = 33
    let bBody = (34 +)  -- [34 .. 65]
    exit 66
    forM_ [31, 30 .. 0] \i -> do
        sub (bBody i) 1
        while (bBody i) do
            add (bBody i) 1
            set (aBody i) 0
    sub bHead 1
    enter 33

i32Or :: Oper
i32Or = do
    let aBody = (1 +)  -- [1 .. 32]
    let bHead = 33
    let bBody = (34 +)  -- [34 .. 65]
    exit 66
    forM_ [31, 30 .. 0] \i ->
        while (bBody i) do
            sub (bBody i) 1
            set (aBody i) 1
    sub bHead 1
    enter 33

i32Xor :: Oper
i32Xor = do
    let aHead = 0
    let aBody = (1 +)  -- [1 .. 32]
    let bHead = 33
    let bBody = (34 +)  -- [34 .. 65]
    exit 66
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
                add (bBody i) 1
            add temp 1
    sub bHead 1
    enter 33

i32Shl :: Oper
i32Shl = do
    let aBody = (1 +)
    let bHead = 33
    let bBody = (34 +)
    exit 66
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
    enter 33

i32Inc :: Oper
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

i32Print :: Oper
i32Print = do
    let head = 0
    let body = (1 +)
    let temp = 33
    let temp0 = 34
    exit 33
    -- 負数用の処理 ここから
    while (body 31) do
        add temp 45
        putc temp
        set temp 0
        enter 33
        i32Not
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
    enter 0
    where
        toDigits 0 = []
        toDigits n = let (q, r) = n `quotRem` 10 in r:toDigits q
