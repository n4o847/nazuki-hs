module Main where

import           Nazuki.Generator
import           Nazuki.Runner

main :: IO ()
main = either putStrLn putStrLn $ debug (generate' ()) []
