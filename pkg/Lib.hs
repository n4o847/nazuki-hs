module Lib where

import Asterius.Text
import Asterius.Types
import qualified Data.Text as T
import qualified Nazuki.Assembler.Instruction as I
import qualified Nazuki.Assembler.Label as L
import qualified Nazuki.Assembler.Parser as P
import qualified Nazuki.Runner as R

foreign export javascript assemble :: JSString -> JSString

foreign export javascript generate :: Int -> JSString

foreign export javascript run :: JSString -> JSString -> JSString

assemble :: JSString -> JSString
assemble source =
  either (error . T.unpack) textToJSString $
    I.generate <$> (L.resolveLabels =<< P.parse (textFromJSString source))

generate :: Int -> JSString
generate x =
  textToJSString $
    I.generate
      [ I.Scan,
        I.Scan,
        I.Add,
        I.Print
      ]

run :: JSString -> JSString -> JSString
run program input =
  either (error . T.unpack) textToJSString $
    R.run (textFromJSString program) (textFromJSString input)
