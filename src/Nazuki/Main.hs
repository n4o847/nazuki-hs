module Nazuki.Main
  ( compile,
    assemble,
    run,
    debug,
  )
where

import Data.Text (Text)
import qualified Nazuki.Assembler.Instruction as I
import qualified Nazuki.Assembler.Label as L
import qualified Nazuki.Assembler.Parser as P
import qualified Nazuki.Compiler.CodeGen as Compiler
import qualified Nazuki.Compiler.Parser as Compiler
import qualified Nazuki.Runtime.Runner as R

compile :: Text -> Either Text Text
compile source =
  I.generate <$> (L.resolveLabels =<< Compiler.generate =<< Compiler.parse source)

assemble :: Text -> Either Text Text
assemble source =
  I.generate <$> (L.resolveLabels =<< P.parse source)

run :: Text -> Text -> Either Text Text
run = R.run

debug :: Text -> Text -> Either Text Text
debug = R.debug
