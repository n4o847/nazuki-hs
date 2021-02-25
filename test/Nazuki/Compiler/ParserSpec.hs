{-# LANGUAGE OverloadedStrings #-}

module Nazuki.Compiler.ParserSpec (spec) where

import qualified Nazuki.Compiler.AST as AST
import Nazuki.Compiler.Parser (parse)
import Test.Hspec

spec :: Spec
spec = do
  describe "parse" $
    it "const 1" $
      let result =
            parse
              "\
              \a\n\
              \"
          expected =
            Right
              ( AST.Program
                  [ AST.Expr (AST.Get (AST.Ident "a"))
                  ]
              )
       in result `shouldBe` expected
