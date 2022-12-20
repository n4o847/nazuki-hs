{-# LANGUAGE BlockArguments #-}
{-# LANGUAGE OverloadedStrings #-}

module Nazuki.Script.CodeGenSpec (spec) where

import Control.Monad
import qualified Nazuki.Assembler.Instruction as I
import qualified Nazuki.Assembler.Label as L
import Nazuki.Script.CodeGen (generate)
import Nazuki.Script.Parser (parse)
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
              I.Add,
              I.Drop
            ]
        ),
        ( "\
          \while 1:\n\
          \  1\n\
          \",
          Right
            [ I.Const 1,
              I.Jz 3,
              I.Const 1,
              I.Drop,
              I.Jump (-5)
            ]
        ),
        ( "\
          \if 1:\n\
          \  1\n\
          \",
          Right
            [ I.Const 1,
              I.Jz 2,
              I.Const 1,
              I.Drop
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
              I.Jz 3,
              I.Const 1,
              I.Drop,
              I.Jump 2,
              I.Const 2,
              I.Drop
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
              I.Jz 3,
              I.Const 1,
              I.Drop,
              I.Jump 9,
              I.Const 2,
              I.Jz 3,
              I.Const 2,
              I.Drop,
              I.Jump 4,
              I.Const 3,
              I.Jz 2,
              I.Const 3,
              I.Drop
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
              I.Jz 3,
              I.Const 1,
              I.Drop,
              I.Jump 12,
              I.Const 2,
              I.Jz 3,
              I.Const 2,
              I.Drop,
              I.Jump 7,
              I.Const 3,
              I.Jz 3,
              I.Const 3,
              I.Drop,
              I.Jump 2,
              I.Const 4,
              I.Drop
            ]
        )
      ]
      \(source, expected) ->
        it (show source) $
          let result = L.resolveLabels =<< generate =<< parse source
           in result `shouldBe` expected
