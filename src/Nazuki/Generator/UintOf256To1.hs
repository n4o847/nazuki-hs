{-# LANGUAGE BlockArguments #-}
{-# LANGUAGE LambdaCase #-}

module Nazuki.Generator.UintOf256To1
    ( uintOf256To1Const
    , uintOf256To1Dup
    , uintOf256To1Not
    , uintOf256To1Add
    , uintOf256To1Sub
    , uintOf256To1Scan
    )
where

import           Control.Monad
import           Nazuki.Generator.Core
import           Nazuki.Generator.Util


consume :: Int -> Oper
consume a =
    exit (2 * a)

produce :: Int -> Oper
produce a =
    enter (2 * a)

uintOf256To1Const :: Int -> Oper
uintOf256To1Const a = do
    let head = 0
    let body = 1
    consume 0
    add head 1
    add body (a `mod` 256)
    produce 1

uintOf256To1Dup :: Oper
uintOf256To1Dup = do
    let aHead = 0
    let aBody = 1
    let bHead = 2
    let bBody = 3
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

uintOf256To1Not :: Oper
uintOf256To1Not = do
    let head = 0
    let body = 1
    consume 1
    while body do
        set body 0
        sub head 1
    while head do
        sub head 1
        add body 1
    add head 1
    produce 1

uintOf256To1Add :: Oper
uintOf256To1Add = do
    let aHead = 0
    let aBody = 1
    let bHead = 2
    let bBody = 3
    consume 2
    while bBody do
        sub bBody 1
        add aBody 1
    sub bHead 1
    produce 1

uintOf256To1Sub :: Oper
uintOf256To1Sub = do
    let aHead = 0
    let aBody = 1
    let bHead = 2
    let bBody = 3
    consume 2
    while bBody do
        sub bBody 1
        sub aBody 1
    sub bHead 1
    produce 1

uintOf256To1Scan :: Oper
uintOf256To1Scan = do
    let head = 0
    let body = 1
    let input = 2
    let continue = 3
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
