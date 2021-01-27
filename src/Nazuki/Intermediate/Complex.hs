{-# LANGUAGE BlockArguments #-}

module Nazuki.Intermediate.Complex where

import qualified Nazuki.Intermediate.InstructionSet as I

ifThen :: [I.Instruction] -> [I.Instruction] -> [I.Instruction]
ifThen cond cons =
  cond ++ I.Jez (length cons) : cons

ifThenElse :: [I.Instruction] -> [I.Instruction] -> [I.Instruction] -> [I.Instruction]
ifThenElse cond cons alt =
  cond ++ I.Jez (length cons + 1) : cons ++ I.Jump (length alt) : alt

whileDo :: [I.Instruction] -> [I.Instruction] -> [I.Instruction]
whileDo cond cons =
  cond ++ I.Jez (length cons + 1) : cons ++ [I.Jump (negate (length cond + 1 + length cons + 1))]
