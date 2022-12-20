{-# LANGUAGE BlockArguments #-}
{-# LANGUAGE OverloadedStrings #-}

module Nazuki.VM.Arch1010.Int10Spec (spec) where

import Control.Monad
import qualified Data.Text as Text
import Nazuki.Runtime.Runner (run)
import qualified Nazuki.VM.Arch1010.Int10 as Int10
import Nazuki.VM.Core (generate)
import Test.Hspec

spec :: Spec
spec = do
  describe "doPrint" do
    forM_ [0, 1, -1, 9999999, -9999999] \n -> do
      it ("print " <> show n) $
        let program = generate do
              Int10.doConst n
              Int10.doPrint
            input = ""
            output = run program input
            expected = Right (Text.pack $ show n)
         in output `shouldBe` expected
  describe "doInc" do
    forM_ [0, 1, -1, 9999999, -9999999] \n -> do
      it (show n <> " + 1") $
        let program = generate do
              Int10.doConst n
              Int10.doInc
              Int10.doPrint
            input = ""
            output = run program input
            expected = Right (Text.pack $ show (n + 1))
         in output `shouldBe` expected
