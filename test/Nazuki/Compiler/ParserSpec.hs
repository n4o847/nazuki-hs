{-# LANGUAGE BlockArguments #-}
{-# LANGUAGE OverloadedStrings #-}

module Nazuki.Compiler.ParserSpec (spec) where

import Control.Monad
import qualified Nazuki.Compiler.AST as AST
import Nazuki.Compiler.Parser (parse)
import Test.Hspec

spec :: Spec
spec = do
  describe "parse" $
    forM_
      [ ( "\
          \a + (b - 1)\n\
          \",
          Right
            ( AST.Program
                [ AST.Expr
                    ( AST.BinOp
                        AST.Add
                        (AST.Var (AST.Ident "a"))
                        ( AST.BinOp
                            AST.Sub
                            (AST.Var (AST.Ident "b"))
                            (AST.Int 1)
                        )
                    )
                ]
            )
        ),
        ( "\
          \while a:\n\
          \  a\n\
          \",
          Right
            ( AST.Program
                [ AST.While
                    (AST.Var (AST.Ident "a"))
                    [ AST.Expr (AST.Var (AST.Ident "a"))
                    ]
                ]
            )
        )
      ]
      \(source, expected) ->
        it (show source) $
          let result = parse source
           in result `shouldBe` expected
