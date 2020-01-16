{-# LANGUAGE BlockArguments #-}
{-# LANGUAGE LambdaCase #-}

module Main where

import           Nazuki.Generator
import           Nazuki.Runner

main :: IO ()
main = do
    let program = generate do
            --
            intOf2To32Mul
        --     intOf2To32Scan
        --     intOf2To32Scan
        --     intOf2To32Shl
        --     intOf2To32Print
        --     uintOf256To1Scan
        --     uintOf256To1PutsCase [(n, if n `mod` 2 == 0 then "0.5" else show (realToFrac ((n + 1) `div` 2) / realToFrac n)) | n <- [1..100]]
    let input =
            "1 31\n"
    -- either putStrLn putStrLn $ debug program input
    putStrLn program
