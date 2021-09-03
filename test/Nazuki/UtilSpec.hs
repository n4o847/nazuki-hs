{-# LANGUAGE BlockArguments #-}
{-# LANGUAGE OverloadedStrings #-}

module Nazuki.UtilSpec (spec) where

import Control.Monad
import qualified Data.Text as Text
import Nazuki.Util
import Test.Hspec

spec :: Spec
spec = do
  describe "quoteSingleLine" do
    forM_
      [ ("a", "[ a ]"),
        ("[]", "[ [] ]"),
        ("[", "[ [ ]]"),
        ("][]]", "[[[ ][]] ]")
      ]
      \(text, expected) -> do
        it (Text.unpack text) $
          let result = quoteSingleLine text
           in result `shouldBe` expected
  describe "quoteMultipleLines" do
    forM_
      [ ("a", "[[[\na\n]]]"),
        ("[]", "[[[\n[]\n]]]"),
        ("[", "[[[\n[\n]]]]"),
        ("][]]", "[[[[[\n][]]\n]]]")
      ]
      \(text, expected) -> do
        it (Text.unpack text) $
          let result = quoteMultipleLines text
           in result `shouldBe` expected
