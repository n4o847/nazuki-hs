{-# LANGUAGE BlockArguments #-}
{-# LANGUAGE LambdaCase #-}

module Nazuki.Generator.UintOf256To1Spec (spec) where

import Nazuki.Generator
import Nazuki.Runner
import Test.Hspec

spec :: Spec
spec = do
  describe "uintOf256To1PutsCase" $
    it "uintOf256To1PutsCase" $
      let program = generate do
            uintOf256To1Scan
            uintOf256To1PutsCase [(n, if n `mod` 2 == 0 then "0.5" else show (realToFrac ((n + 1) `div` 2) / realToFrac n)) | n <- [1 .. 100]]
          input = "13\n"
          output = run program input
          expected = Right "0.5384615384615384"
       in output `shouldBe` expected
