{-# LANGUAGE BlockArguments #-}
{-# LANGUAGE LambdaCase #-}

module Nazuki.Intermediate.Label
  ( LabeledInstruction (..),
    resolveLabels,
  )
where

import Control.Monad
import qualified Data.Map as Map
import qualified Nazuki.Intermediate.InstructionSet as I

data LabeledInstruction
  = Holder0 I.Instruction
  | Holder1 (Int -> I.Instruction) String
  | Label String

resolveLabels :: [LabeledInstruction] -> Either String [I.Instruction]
resolveLabels list = do
  (positions, _, removed') <-
    foldM
      ( \(positions, pos, list) li ->
          case li of
            Label name -> do
              let insertLookup = Map.insertLookupWithKey (\_ a _ -> a)
              let (oldPos, newPositions) = insertLookup name pos positions
              case oldPos of
                Just _ -> Left $ "duplicated label " <> name
                Nothing -> Right (newPositions, pos, list)
            _ ->
              Right (positions, pos + 1, (li, pos) : list)
      )
      (Map.empty, 0, [])
      list
  let removed = reverse removed'
      getPosition name =
        case Map.lookup name positions of
          Just pos -> Right pos
          Nothing -> Left $ "undefined label " <> name
  forM removed \(labeled, pos) ->
    case labeled of
      Holder0 ins -> return ins
      Holder1 ins l0 -> do
        p0 <- getPosition l0
        return $ ins (p0 - pos - 1)
