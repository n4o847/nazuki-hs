module Lib where

import Asterius.Types
import qualified Nazuki.Intermediate.InstructionSet as I
import qualified Nazuki.Intermediate.Label as L
import qualified Nazuki.Intermediate.Parser as P
import qualified Nazuki.Runner as R

foreign export javascript assemble :: JSString -> JSString
foreign export javascript generate :: Int -> JSString
foreign export javascript run :: JSString -> JSString -> JSString

assemble :: JSString -> JSString
assemble source =
    either error toJSString $
        I.generate <$> L.resolveLabels <$> P.parse (fromJSString source)

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
