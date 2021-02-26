{-# LANGUAGE OverloadedStrings #-}

module Nazuki.Compiler.ParserSpec (spec) where

import qualified Nazuki.Compiler.AST as AST
import Nazuki.Compiler.Parser (parse)
import Test.Hspec

spec :: Spec
spec = do
  describe "parse" $
    it "a + 1" $
      let result =
            parse
              "\
              \a + 1\n\
              \"
          expected =
            Right
              ( AST.Program
                  [ AST.Expr
                      ( AST.BinOp
                          AST.Add
                          (AST.Var (AST.Ident "a"))
                          (AST.Int 1)
                      )
                  ]
              )
       in result `shouldBe` expected
