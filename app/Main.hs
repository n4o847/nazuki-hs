{-# LANGUAGE BlockArguments #-}
{-# LANGUAGE OverloadedStrings #-}

module Main where

import Data.Text as T
import Data.Text.IO as TIO
import qualified Nazuki.Assembler.Instruction as I
import qualified Nazuki.Assembler.Label as L
import qualified Nazuki.Assembler.Parser as P
import Nazuki.Runner
import System.Environment (getArgs)
import System.IO (stderr)

main :: IO ()
main = do
  args <- getArgs
  case args of
    ["gen"] ->
      TIO.putStrLn program
    ["len"] ->
      print (T.length program)
    ["asm", inFile, outFile] -> do
      program <- TIO.readFile inFile
      let result = I.generate <$> (L.resolveLabels =<< P.parse program)
      either (TIO.hPutStrLn stderr) (TIO.writeFile outFile) result
    ["run"] -> do
      input <- TIO.getContents
      either (TIO.hPutStrLn stderr) TIO.putStrLn $ run program input
    ["run", inFile] -> do
      program <- TIO.readFile inFile
      input <- TIO.getContents
      either (TIO.hPutStrLn stderr) TIO.putStrLn $ run program input
    ["debug"] -> do
      input <- TIO.getContents
      either (TIO.hPutStrLn stderr) TIO.putStrLn $ debug program input
    _ ->
      TIO.hPutStrLn stderr "Wrong arguments"
  where
    program =
      I.generate
        [ I.Scan,
          I.Scan,
          I.Add,
          I.Print
        ]
