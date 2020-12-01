module Lib where

import Asterius.Types
import qualified Nazuki.Intermediate.InstructionSet as I
import qualified Nazuki.Runner as R

foreign export javascript generate :: Int -> JSString
foreign export javascript run :: JSString -> JSString -> JSString

generate :: Int -> JSString
generate x = toJSString $ I.generate
    [ I.Scan
    , I.Scan
    , I.Add
    , I.Print
    ]

run :: JSString -> JSString -> JSString
run program input =
    either error toJSString $ R.run (fromJSString program) (fromJSString input)
