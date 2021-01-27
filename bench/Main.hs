module Main where

import Criterion.Main
import qualified Nazuki.Intermediate.InstructionSet as I

main :: IO ()
main =
  defaultMain
    [ bgroup
        "generate"
        [ bench "whnf" $
            whnf
              I.generate
              [ I.Scan,
                I.Scan,
                I.Add,
                I.Print
              ],
          bench "nf" $
            nf
              I.generate
              [ I.Scan,
                I.Scan,
                I.Add,
                I.Print
              ]
        ]
    ]
