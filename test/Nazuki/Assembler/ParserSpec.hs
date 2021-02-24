{-# LANGUAGE OverloadedStrings #-}

module Nazuki.Assembler.ParserSpec (spec) where

import Nazuki.Assembler.Label (resolveLabels)
import Nazuki.Assembler.Parser (parse)
import qualified Nazuki.Intermediate.InstructionSet as I
import Test.Hspec

spec :: Spec
spec = do
  describe "parse" $
    it "const 1" $
      let result = parse "const 1" >>= resolveLabels
          expected = Right [I.Const 1]
       in result `shouldBe` expected
