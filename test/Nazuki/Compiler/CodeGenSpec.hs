{-# LANGUAGE BlockArguments #-}
{-# LANGUAGE OverloadedStrings #-}

module Nazuki.Compiler.CodeGenSpec (spec) where

import Control.Monad
import qualified Nazuki.Assembler.Instruction as I
import qualified Nazuki.Assembler.Label as L
import Nazuki.Compiler.CodeGen (generate)
import Nazuki.Compiler.Parser (parse)
import Test.Hspec

spec :: Spec
spec = do
  describe "generate" $
    forM_
      [ ( "\
          \1 + 1\n\
          \",
          Right
            [ I.Const 1,
              I.Const 1,
              I.Add
            ]
        ),
        ( "\
          \while 1:\n\
          \  1\n\
          \",
          Right
            [ I.Const 1,
              I.Jez 2,
              I.Const 1,
              I.Jump (-4)
            ]
        ),
        ( "\
          \if 1:\n\
          \  1\n\
          \",
          Right
            [ I.Const 1,
              I.Jez 1,
              I.Const 1
            ]
        ),
        ( "\
          \if 1:\n\
          \  1\n\
          \else:\n\
          \  2\n\
          \",
          Right
            [ I.Const 1,
              I.Jez 2,
              I.Const 1,
              I.Jump 1,
              I.Const 2
            ]
        ),
        ( "\
          \if 1:\n\
          \  1\n\
          \elif 2:\n\
          \  2\n\
          \elif 3:\n\
          \  3\n\
          \",
          Right
            [ I.Const 1,
              I.Jez 2,
              I.Const 1,
              I.Jump 7,
              I.Const 2,
              I.Jez 2,
              I.Const 2,
              I.Jump 3,
              I.Const 3,
              I.Jez 1,
              I.Const 3
            ]
        ),
        ( "\
          \if 1:\n\
          \  1\n\
          \elif 2:\n\
          \  2\n\
          \elif 3:\n\
          \  3\n\
          \else:\n\
          \  4\n\
          \",
          Right
            [ I.Const 1,
              I.Jez 2,
              I.Const 1,
              I.Jump 9,
              I.Const 2,
              I.Jez 2,
              I.Const 2,
              I.Jump 5,
              I.Const 3,
              I.Jez 2,
              I.Const 3,
              I.Jump 1,
              I.Const 4
            ]
        )
      ]
      \(source, expected) ->
        it (show source) $
          let result = L.resolveLabels =<< generate =<< parse source
           in result `shouldBe` expected
