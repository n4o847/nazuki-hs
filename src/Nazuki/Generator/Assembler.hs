{-# LANGUAGE BlockArguments #-}
{-# LANGUAGE LambdaCase #-}

module Nazuki.Generator.Assembler
    ( assemble
    , jump
    )
where

import           Control.Monad
import qualified Data.Bits as Bits
import qualified Data.Map as Map
import           Nazuki.Generator.Core
import           Nazuki.Generator.Util

assemble :: Int -> Int -> [(Int, Oper)] -> [Int] -> Oper
assemble isize ssize isa_ opcodes = do
    let isa = Map.fromList isa_
    let tmp = 0
    let cmd = (1 +)
    bfDec
    forward isize
    forM_ (reverse opcodes) \bits -> do
        forM_ [0 .. isize - 2] \i -> do
            when (Bits.testBit bits i) do
                add (cmd i) 1
        forward isize
    backward isize
    bfInc
    while tmp do
        sub tmp 1
        let seeBit i bits = do
                if i >= 0 then
                    ifElse (cmd i) tmp (
                        seeBit (i - 1) (Bits.setBit bits i)
                    ) (
                        seeBit (i - 1) bits
                    )
                else do
                    forM_ (Map.lookup bits isa) \op -> do
                        ipToSp isize ssize
                        op
                        spToIp isize ssize
        seeBit (isize - 2) 0
        add tmp 1
        backward isize
        add tmp 1

spToIp :: Int -> Int -> Oper
spToIp isize ssize = do
    backward ssize
    bfOpn
    backward ssize
    bfCls
    backward isize
    bfOpn
    backward isize
    bfCls

ipToSp :: Int -> Int -> Oper
ipToSp isize ssize = do
    forward isize
    bfOpn
    forward isize
    bfCls
    forward ssize
    bfOpn
    forward ssize
    bfCls

jump :: Int -> Int -> Int -> Oper
jump isize ssize rel = do
    spToIp isize ssize
    if rel >= 0 then
        replicateM_ rel do
            bfInc
            backward isize
    else
        replicateM_ (negate rel) do
            forward isize
            bfDec
    ipToSp isize ssize
