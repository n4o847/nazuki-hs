{-# LANGUAGE BlockArguments #-}
{-# LANGUAGE OverloadedStrings #-}

module Nazuki.VM.Word1.ByteSpec (spec) where

import Data.Text qualified as T
import Nazuki.Runtime.Runner (run)
import Nazuki.VM.Core (generate)
import Nazuki.VM.Word1.Byte
import Test.Hspec

spec :: Spec
spec = do
  describe "doPutsCase" $
    it "doPutsCase" $
      let program = generate do
            doScan
            doPutsCase [(n, if even n then "0.5" else T.pack (show (realToFrac ((n + 1) `div` 2) / realToFrac n))) | n <- [1 .. 100]]
          input = "13\n"
          output = run program input
          expected = Right "0.5384615384615384"
       in output `shouldBe` expected
