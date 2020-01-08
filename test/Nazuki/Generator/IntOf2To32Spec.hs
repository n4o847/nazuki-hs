{-# LANGUAGE BlockArguments #-}
{-# LANGUAGE LambdaCase #-}

module Nazuki.Generator.IntOf2To32Spec (spec) where

import Test.Hspec
import Nazuki.Runner
import Nazuki.Generator

spec :: Spec
spec = do
    describe "intOf2To32Scan" $
        it "intOf2To32Scan" $
            let
                program = generate do
                    intOf2To32Scan
                    intOf2To32Mul10
                    intOf2To32Print
                input = "13\n"
                output = run program input
                expected = Right "130"
            in
                output `shouldBe` expected
