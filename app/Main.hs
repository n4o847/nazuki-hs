{-# LANGUAGE BlockArguments #-}
{-# LANGUAGE OverloadedStrings #-}

module Main where

import Data.Text as T
import Data.Text.IO as TIO
import Nazuki.Main qualified as Nazuki
import System.Environment (getArgs)
import System.IO (stderr)

main :: IO ()
main = do
  args <- getArgs
  case args of
    ["c", inFile, outFile] -> do
      program <- TIO.readFile inFile
      let result = Nazuki.compile program
      either (TIO.hPutStrLn stderr) (TIO.writeFile outFile) result
    ["asm", inFile, outFile] -> do
      program <- TIO.readFile inFile
      let result = Nazuki.assemble program
      either (TIO.hPutStrLn stderr) (TIO.writeFile outFile) result
    ["run", inFile] -> do
      program <- TIO.readFile inFile
      input <- TIO.getContents
      let result = Nazuki.run program input
      either (TIO.hPutStrLn stderr) TIO.putStrLn result
    ["debug", inFile] -> do
      program <- TIO.readFile inFile
      input <- TIO.getContents
      let result = Nazuki.debug program input
      either (TIO.hPutStrLn stderr) TIO.putStrLn result
    _ ->
      TIO.hPutStrLn stderr "Wrong arguments"
