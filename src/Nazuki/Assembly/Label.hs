{-# LANGUAGE BlockArguments #-}
{-# LANGUAGE OverloadedStrings #-}

module Nazuki.Assembly.Label
  ( Labeled (..),
    resolveLabels,
  )
where

import Control.Monad
import Data.Map (Map)
import qualified Data.Map as Map
import Data.Text (Text)

data Labeled a
  = L0 a
  | L1 (Int -> a) Text
  | Label Text

insertLookup :: Ord k => k -> a -> Map k a -> (Maybe a, Map k a)
insertLookup = Map.insertLookupWithKey (\_ a _ -> a)

resolveLabels :: [Labeled a] -> Either Text [a]
resolveLabels list = do
  (positions, _, removed') <-
    foldM
      ( \(positions, pos, list) li ->
          case li of
            Label name -> do
              let (oldPos, newPositions) = insertLookup name pos positions
              case oldPos of
                Just _ -> Left $ "duplicated label \"" <> name <> "\""
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
          Nothing -> Left $ "undefined label \"" <> name <> "\""
  forM removed \(labeled, pos) ->
    case labeled of
      L0 ins -> return ins
      L1 ins l0 -> do
        p0 <- getPosition l0
        return $ ins (p0 - pos - 1)
