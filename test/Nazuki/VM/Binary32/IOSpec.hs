{-# LANGUAGE BlockArguments #-}
{-# LANGUAGE OverloadedStrings #-}

module Nazuki.VM.Binary32.IOSpec (spec) where

import Control.Monad
import Data.Text qualified as Text
import Nazuki.Runtime.Runner (run)
import Nazuki.VM.Binary32.IO qualified as IO
import Nazuki.VM.Binary32.Int32 qualified as Int32
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
