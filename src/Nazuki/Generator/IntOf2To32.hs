{-# LANGUAGE BlockArguments #-}
{-# LANGUAGE LambdaCase #-}

module Nazuki.Generator.IntOf2To32 where

import           Control.Monad
import           Data.Bits                      ( testBit )
import           Data.Int                       ( Int32 )
import           Nazuki.Generator.Core
import           Nazuki.Generator.Util

intOf2To32Const :: Int32 -> Oper
intOf2To32Const a = do
    let head = 0
    let body = (1 +)
    exit 0
    add head 1
    forM_ [0 .. 31] \i ->
        if testBit a i then
            add (body i) 1
        else
            bfNop
    enter 33

intOf2To32Not :: Oper
intOf2To32Not = do
    let body = (1 +)  -- [1 .. 32]
    let helper = (2 +)  -- [2 .. 33]
    exit 33
    forM_ [31, 30 .. 0] \i -> do
        add (helper i) 1
        while (body i) do
            sub (body i) 1
            sub (helper i) 1
    forM_ [0 .. 31] \i ->
        while (helper i) do
            sub (helper i) 1
            add (body i) 1
    enter 33
