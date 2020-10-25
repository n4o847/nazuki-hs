module Lib where

import Asterius.Types
import qualified Nazuki.Intermediate.InstructionSet as I

foreign export javascript "generate" generate :: Int -> Int

generate :: Int -> Int
generate x = length $ I.generate
    [ I.Scan
    , I.Scan
    , I.Add
    , I.Print
    ]
