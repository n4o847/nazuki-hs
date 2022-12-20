{-# LANGUAGE BlockArguments #-}
{-# LANGUAGE OverloadedStrings #-}

module Nazuki.VM.Binary32.Int32Spec (spec) where

import Control.Monad
import qualified Data.Text as Text
import Nazuki.Runtime.Runner (run)
import qualified Nazuki.VM.Binary32.Int32 as Int32
import Nazuki.VM.Core (generate)
import Test.Hspec

spec :: Spec
spec = do
  describe "doMul" do
    forM_ [(2, 5), (100, 100)] \(a, b) -> do
      it (show a <> " * " <> show b) $
        let program = generate do
              Int32.doConst a
              Int32.doConst b
              Int32.doMul
              Int32.doPrint
            input = ""
            output = run program input
            expected = Right (Text.pack $ show (a * b))
         in output `shouldBe` expected
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
