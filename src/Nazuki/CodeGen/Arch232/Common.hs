module Nazuki.CodeGen.Arch232.Common
  ( consume,
    produce,
  )
where

import Nazuki.CodeGen.Core
import Nazuki.CodeGen.Util

consume :: Int -> Oper
consume a =
  backward (33 * a)

produce :: Int -> Oper
produce a =
  forward (33 * a)
