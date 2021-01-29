{-# LANGUAGE BlockArguments #-}
{-# LANGUAGE OverloadedStrings #-}

module Nazuki.CodeGen.Arch232.Int32Spec (spec) where

import qualified Nazuki.CodeGen.Arch232.Int32 as Int32
import Nazuki.CodeGen.Core (generate)
import Nazuki.Runner
import Test.Hspec

spec :: Spec
spec = do
  describe "doScan" $
    it "Scan, Mul10, Print" $
      let program = generate do
            Int32.doScan
            Int32.doMul10
            Int32.doPrint
          input = "13\n"
          output = run program input
          expected = Right "130"
       in output `shouldBe` expected
