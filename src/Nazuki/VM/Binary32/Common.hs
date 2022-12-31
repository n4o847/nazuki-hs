module Nazuki.VM.Binary32.Common
  ( consume,
    produce,
  )
where

import Nazuki.VM.Core
import Nazuki.VM.Util

consume :: Int -> Oper
consume a =
  backward (33 * a)

produce :: Int -> Oper
produce a =
  forward (33 * a)
