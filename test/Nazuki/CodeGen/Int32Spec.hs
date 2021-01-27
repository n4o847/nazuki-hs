{-# LANGUAGE BlockArguments #-}
{-# LANGUAGE LambdaCase #-}
{-# LANGUAGE OverloadedStrings #-}

module Nazuki.CodeGen.Int32Spec (spec) where

import Nazuki.CodeGen.Core (generate)
import qualified Nazuki.CodeGen.Int32 as I32
import Nazuki.Runner
import Test.Hspec

spec :: Spec
spec = do
  describe "doScan" $
    it "Scan, Mul10, Print" $
      let program = generate do
            I32.doScan
            I32.doMul10
            I32.doPrint
          input = "13\n"
          output = run program input
          expected = Right "130"
       in output `shouldBe` expected
