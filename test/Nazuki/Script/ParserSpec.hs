{-# LANGUAGE BlockArguments #-}
{-# LANGUAGE OverloadedStrings #-}

module Nazuki.Script.ParserSpec (spec) where

import Control.Monad
import Nazuki.Script.AST qualified as AST
import Nazuki.Script.Parser (parse)
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
        ),
        ( "\
          \if a:\n\
          \  a\n\
          \",
          Right
            ( AST.Program
                [ AST.If
                    (AST.Var (AST.Ident "a"), [AST.Expr (AST.Var (AST.Ident "a"))])
                    []
                    Nothing
                ]
            )
        ),
        ( "\
          \if a:\n\
          \  a\n\
          \else:\n\
          \  b\n\
          \",
          Right
            ( AST.Program
                [ AST.If
                    (AST.Var (AST.Ident "a"), [AST.Expr (AST.Var (AST.Ident "a"))])
                    []
                    (Just [AST.Expr (AST.Var (AST.Ident "b"))])
                ]
            )
        ),
        ( "\
          \if a:\n\
          \  a\n\
          \elif b:\n\
          \  b\n\
          \elif c:\n\
          \  c\n\
          \",
          Right
            ( AST.Program
                [ AST.If
                    (AST.Var (AST.Ident "a"), [AST.Expr (AST.Var (AST.Ident "a"))])
                    [ (AST.Var (AST.Ident "b"), [AST.Expr (AST.Var (AST.Ident "b"))]),
                      (AST.Var (AST.Ident "c"), [AST.Expr (AST.Var (AST.Ident "c"))])
                    ]
                    Nothing
                ]
            )
        ),
        ( "\
          \if a:\n\
          \  a\n\
          \elif b:\n\
          \  b\n\
          \elif c:\n\
          \  c\n\
          \else:\n\
          \  d\n\
          \",
          Right
            ( AST.Program
                [ AST.If
                    (AST.Var (AST.Ident "a"), [AST.Expr (AST.Var (AST.Ident "a"))])
                    [ (AST.Var (AST.Ident "b"), [AST.Expr (AST.Var (AST.Ident "b"))]),
                      (AST.Var (AST.Ident "c"), [AST.Expr (AST.Var (AST.Ident "c"))])
                    ]
                    (Just [AST.Expr (AST.Var (AST.Ident "d"))])
                ]
            )
        ),
        ( "\
          \a(b + c)\n\
          \a + b(c + d)\n\
          \(a + b)(c + d)\n\
          \a(b + c)(d + e)\n\
          \",
          Right
            ( AST.Program
                [ AST.Expr
                    ( AST.Call
                        (AST.Var (AST.Ident "a"))
                        [ AST.BinOp AST.Add (AST.Var (AST.Ident "b")) (AST.Var (AST.Ident "c"))
                        ]
                    ),
                  AST.Expr
                    ( AST.BinOp
                        AST.Add
                        (AST.Var (AST.Ident "a"))
                        ( AST.Call
                            (AST.Var (AST.Ident "b"))
                            [ AST.BinOp AST.Add (AST.Var (AST.Ident "c")) (AST.Var (AST.Ident "d"))
                            ]
                        )
                    ),
                  AST.Expr
                    ( AST.Call
                        (AST.BinOp AST.Add (AST.Var (AST.Ident "a")) (AST.Var (AST.Ident "b")))
                        [ AST.BinOp AST.Add (AST.Var (AST.Ident "c")) (AST.Var (AST.Ident "d"))
                        ]
                    ),
                  AST.Expr
                    ( AST.Call
                        ( AST.Call
                            (AST.Var (AST.Ident "a"))
                            [ AST.BinOp AST.Add (AST.Var (AST.Ident "b")) (AST.Var (AST.Ident "c"))
                            ]
                        )
                        [ AST.BinOp AST.Add (AST.Var (AST.Ident "d")) (AST.Var (AST.Ident "e"))
                        ]
                    )
                ]
            )
        )
      ]
      \(source, expected) ->
        it (show source) $
          let result = parse source
           in result `shouldBe` expected
