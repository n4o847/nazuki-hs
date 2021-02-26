{-# LANGUAGE BlockArguments #-}
{-# LANGUAGE OverloadedStrings #-}

module Nazuki.Compiler.CodeGenSpec (spec) where

import Control.Monad
import qualified Nazuki.Assembler.Instruction as I
import qualified Nazuki.Assembler.Label as L
import Nazuki.Compiler.CodeGen (generate)
import Nazuki.Compiler.Parser (parse)
import Test.Hspec

spec :: Spec
spec = do
  describe "generate" $
    forM_
      [ ( "\
          \1 + 1\n\
          \",
          Right
            [ I.Const 1,
              I.Const 1,
              I.Add
            ]
        ),
        ( "\
          \while 1:\n\
          \  1\n\
          \",
          Right
            [ I.Const 1,
              I.Jez 2,
              I.Const 1,
              I.Jump (-4)
            ]
        )
      ]
      \(source, expected) ->
        it (show source) $
          let result = L.resolveLabels =<< generate =<< parse source
           in result `shouldBe` expected
