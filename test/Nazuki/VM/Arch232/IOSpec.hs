{-# LANGUAGE BlockArguments #-}
{-# LANGUAGE OverloadedStrings #-}

module Nazuki.VM.Arch232.IOSpec (spec) where

import Control.Monad
import qualified Data.Text as Text
import Nazuki.Runtime.Runner (run)
import qualified Nazuki.VM.Arch232.IO as IO
import qualified Nazuki.VM.Arch232.Int32 as Int32
import Nazuki.VM.Core (generate)
import Test.Hspec

spec :: Spec
spec = do
  describe "doGetc" do
    forM_ ['A', 'a'] \a -> do
      it (show a) $
        let program = generate do
              IO.doGetc
              Int32.doPrint
            input = Text.singleton a
            output = run program input
            expected = Right $ Text.pack (show (fromEnum a))
         in output `shouldBe` expected
  describe "doPutc" do
    forM_ ['A', 'a'] \a -> do
      it (show a) $
        let program = generate do
              Int32.doConst (fromIntegral (fromEnum a))
              IO.doPutc
            input = ""
            output = run program input
            expected = Right $ Text.singleton a
         in output `shouldBe` expected
