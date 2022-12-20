{-# LANGUAGE OverloadedStrings #-}

module Nazuki.Assembly.ParserSpec (spec) where

import qualified Nazuki.Assembly.Instruction as I
import Nazuki.Assembly.Label (resolveLabels)
import Nazuki.Assembly.Parser (parse)
import Test.Hspec

spec :: Spec
spec = do
  describe "parse" $
    it "const 1" $
      let result = parse "const 1" >>= resolveLabels
          expected = Right [I.Const 1]
       in result `shouldBe` expected
