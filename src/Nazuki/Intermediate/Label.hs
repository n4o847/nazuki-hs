{-# LANGUAGE BlockArguments #-}
{-# LANGUAGE LambdaCase #-}

module Nazuki.Intermediate.Label where

import qualified Data.Maybe as Maybe
import qualified Data.Map as Map
import qualified Nazuki.Intermediate.InstructionSet as I

data LabeledInstruction
    = Holder0 I.Instruction
    | Holder1 (Int -> I.Instruction) String
    | Label String

resolveLabels :: [LabeledInstruction] -> [I.Instruction]
resolveLabels list =
    let
        (positions, _, removed') = foldl
            (\(positions, pos, list) li ->
                case li of
                    Label name ->
                        (
                            Map.insert name pos positions,
                            pos,
                            list
                        )
                    _ ->
                        (positions, pos + 1, (li, pos) : list)
            )
            (Map.empty, 0, [])
            list
        removed = reverse removed'
        getPosition label = Maybe.fromJust (Map.lookup label positions)
    in
        map
            (\(labeled, pos) ->
                case labeled of
                    Holder0 ins -> ins
                    Holder1 ins l0 ->
                        case ins 0 of
                            I.Jump _ ->
                                I.Jump (getPosition l0 - pos - 1)
                            I.Jez _ ->
                                I.Jez (getPosition l0 - pos - 1)
                            I.Jnz _ ->
                                I.Jnz (getPosition l0 - pos - 1)
                            I.Jeq _ ->
                                I.Jeq (getPosition l0 - pos - 1)
            )
            removed
