module Lib where

import Asterius.Types
import qualified Nazuki.Intermediate.InstructionSet as I

foreign export javascript "generate" generate :: Int -> JSString

generate :: Int -> JSString
generate x = toJSString $ I.generate
    [ I.Scan
    , I.Scan
    , I.Add
    , I.Print
    ]
