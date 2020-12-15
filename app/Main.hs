{-# LANGUAGE BlockArguments #-}
{-# LANGUAGE LambdaCase #-}

module Main where

import qualified Nazuki.Intermediate.InstructionSet as I
import Nazuki.Runner
import System.Environment (getArgs)
import System.IO (hPutStrLn, stderr)

main :: IO ()
main = do
  args <- getArgs
  case args of
    ["gen"] ->
      putStrLn program
    ["len"] ->
      print (length program)
    ["run"] -> do
      input <- getContents
      either (hPutStrLn stderr) putStrLn $ run program input
    ["debug"] -> do
      input <- getContents
      either (hPutStrLn stderr) putStrLn $ debug program input
    _ ->
      hPutStrLn stderr "Wrong arguments"
  where
    program =
      I.generate
        [ I.Scan,
          I.Scan,
          I.Add,
          I.Print
        ]
