module Lib where

import Asterius.Text
import Asterius.Types
import qualified Data.Text as T
import qualified Nazuki.Main as Nazuki

foreign export javascript assemble :: JSString -> JSString

foreign export javascript run :: JSString -> JSString -> JSString

assemble :: JSString -> JSString
assemble source =
  either (error . T.unpack) textToJSString $
    Nazuki.assemble (textFromJSString source)

run :: JSString -> JSString -> JSString
run program input =
  either (error . T.unpack) textToJSString $
    Nazuki.run (textFromJSString program) (textFromJSString input)
