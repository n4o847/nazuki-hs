module Nazuki.Main
  ( compile,
    assemble,
    run,
    debug,
    createBanner,
  )
where

import Data.Text (Text)
import Nazuki.Assembly.Instruction qualified as I
import Nazuki.Assembly.Label qualified as L
import Nazuki.Assembly.Parser qualified as P
import Nazuki.Runtime.Runner qualified as R
import Nazuki.Script.CodeGen qualified as Script
import Nazuki.Script.Parser qualified as Script
import Nazuki.Util (createBanner)

compile :: Text -> Either Text Text
compile source =
  I.generate <$> (L.resolveLabels =<< Script.generate =<< Script.parse source)

assemble :: Text -> Either Text Text
assemble source =
  I.generate <$> (L.resolveLabels =<< P.parse source)

run :: Text -> Text -> Either Text Text
run = R.run

debug :: Text -> Text -> Either Text Text
debug = R.debug
