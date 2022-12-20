module Nazuki.Main
  ( compile,
    assemble,
    run,
    debug,
    createBanner,
  )
where

import Data.Text (Text)
import qualified Nazuki.Assembly.Instruction as I
import qualified Nazuki.Assembly.Label as L
import qualified Nazuki.Assembly.Parser as P
import qualified Nazuki.Runtime.Runner as R
import qualified Nazuki.Script.CodeGen as Script
import qualified Nazuki.Script.Parser as Script
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
