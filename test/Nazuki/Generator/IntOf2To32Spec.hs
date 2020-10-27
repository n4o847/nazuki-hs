{-# LANGUAGE BlockArguments #-}
{-# LANGUAGE LambdaCase #-}

module Nazuki.Generator.IntOf2To32Spec (spec) where

import Test.Hspec
import Nazuki.Runner
import Nazuki.Generator
import qualified Nazuki.Generator.IntOf2To32 as I32

spec :: Spec
spec = do
    describe "doScan" $
        it "Scan, Mul10, Print" $
            let
                program = generate do
                    I32.doScan
                    I32.doMul10
                    I32.doPrint
                input = "13\n"
                output = run program input
                expected = Right "130"
            in
                output `shouldBe` expected
