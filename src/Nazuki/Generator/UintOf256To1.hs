{-# LANGUAGE BlockArguments #-}
{-# LANGUAGE LambdaCase #-}

module Nazuki.Generator.UintOf256To1
    ( uintOf256To1Const
    , uintOf256To1Scan
    )
where

import           Control.Monad
import           Nazuki.Generator.Core
import           Nazuki.Generator.Util


consume :: Oper
consume =
    exit 2

produce :: Oper
produce =
    enter 2

uintOf256To1Const :: Int -> Oper
uintOf256To1Const a = do
    let head = 0
    let body = 1
    add head 1
    add body (a `mod` 256)
    produce

uintOf256To1Scan :: Oper
uintOf256To1Scan = do
    let head = 0
    let body = 1
    let input = 2
    let continue = 3

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
    produce
