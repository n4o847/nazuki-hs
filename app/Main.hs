{-# LANGUAGE BlockArguments #-}
{-# LANGUAGE LambdaCase #-}

module Main where

import           Nazuki.Generator
import           Nazuki.Runner

main :: IO ()
main = either putStrLn putStrLn $ debug (generate do
    intOf2To32Const 1
    intOf2To32Const 31
    intOf2To32Shl
    intOf2To32Not
    intOf2To32Print
    ) []
