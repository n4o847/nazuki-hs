{-# LANGUAGE BlockArguments #-}
{-# LANGUAGE LambdaCase #-}
{-# LANGUAGE NamedFieldPuns #-}
{-# LANGUAGE OverloadedStrings #-}
{-# LANGUAGE StrictData #-}

module Nazuki.VM.Core
  ( Oper,
    getUseHeap,
    putUseHeap,
    getCodeEntrySize,
    putCodeEntrySize,
    getStackEntrySize,
    putStackEntrySize,
    getHeapEntrySize,
    putHeapEntrySize,
    putScale,
    bfNop,
    bfInc,
    bfDec,
    bfFwd,
    bfBwd,
    bfStep,
    bfOpn,
    bfCls,
    bfGet,
    bfPut,
    generate,
  )
where

import Control.Monad.State.Strict
import Data.Text (Text)
import Data.Text qualified as Text
import Data.Text.Lazy qualified as Text.Lazy
import Data.Text.Lazy.Builder (Builder)
import Data.Text.Lazy.Builder qualified as Text.Lazy.Builder

data BfCmd
  = Inc
  | Dec
  | Step Int
  | Opn
  | Cls
  | Get
  | Put
  deriving (Show)

data Gen = Gen
  { cmds :: [BfCmd],
    options :: GenOptions,
    scale :: Int
  }

data GenOptions = GenOptions
  { useHeap :: Bool,
    codeEntrySize :: Int,
    stackEntrySize :: Int,
    heapEntrySize :: Int
  }

type Oper = State Gen ()

modifyCmds :: ([BfCmd] -> [BfCmd]) -> State Gen ()
modifyCmds f = modify' \gen -> gen {cmds = f $ cmds gen}

getUseHeap :: State Gen Bool
getUseHeap = gets (useHeap . options)

putUseHeap :: Bool -> State Gen ()
putUseHeap useHeap = modify' \gen -> gen {options = (options gen) {useHeap = useHeap}}

getCodeEntrySize :: State Gen Int
getCodeEntrySize = gets (codeEntrySize . options)

putCodeEntrySize :: Int -> State Gen ()
putCodeEntrySize codeEntrySize = modify' \gen -> gen {options = (options gen) {codeEntrySize = codeEntrySize}}

getStackEntrySize :: State Gen Int
getStackEntrySize = gets (stackEntrySize . options)

putStackEntrySize :: Int -> State Gen ()
putStackEntrySize stackEntrySize = modify' \gen -> gen {options = (options gen) {stackEntrySize = stackEntrySize}}

getHeapEntrySize :: State Gen Int
getHeapEntrySize = gets (heapEntrySize . options)

putHeapEntrySize :: Int -> State Gen ()
putHeapEntrySize heapEntrySize = modify' \gen -> gen {options = (options gen) {heapEntrySize = heapEntrySize}}

getScale :: State Gen Int
getScale = gets scale

putScale :: Int -> State Gen ()
putScale scale = modify' \gen -> gen {scale = scale}

empty :: Gen
empty =
  Gen
    { cmds = [],
      options =
        GenOptions
          { useHeap = False,
            codeEntrySize = 1,
            stackEntrySize = 1,
            heapEntrySize = 1
          },
      scale = 1
    }

bfNop :: Oper
bfNop =
  pure ()

bfInc :: Oper
bfInc =
  modifyCmds \case
    Dec : xs -> xs
    xs -> Inc : xs

bfDec :: Oper
bfDec =
  modifyCmds \case
    Inc : xs -> xs
    xs -> Dec : xs

bfFwd :: Oper
bfFwd =
  bfStep 1

bfBwd :: Oper
bfBwd =
  bfStep (-1)

bfStep :: Int -> Oper
bfStep dx = do
  scale <- getScale
  modifyCmds
    ( \cmds ->
        let (x, rest) = case cmds of
              Step x : rest -> (x, rest)
              rest -> (0, rest)
            x' = x + dx * scale
         in if x' == 0
              then rest
              else Step x' : rest
    )

bfOpn :: Oper
bfOpn =
  modifyCmds (Opn :)

bfCls :: Oper
bfCls =
  modifyCmds (Cls :)

bfGet :: Oper
bfGet =
  modifyCmds (Get :)

bfPut :: Oper
bfPut =
  modifyCmds (Put :)

toBuilder :: BfCmd -> Builder
toBuilder = \case
  Inc -> Text.Lazy.Builder.singleton '+'
  Dec -> Text.Lazy.Builder.singleton '-'
  Step x -> Text.Lazy.Builder.fromText (if x >= 0 then Text.replicate x ">" else Text.replicate (negate x) "<")
  Opn -> Text.Lazy.Builder.singleton '['
  Cls -> Text.Lazy.Builder.singleton ']'
  Get -> Text.Lazy.Builder.singleton ','
  Put -> Text.Lazy.Builder.singleton '.'

generate :: Oper -> Text
generate oper =
  let Gen {cmds} = execState oper empty
      builder = foldr (\c b -> b <> toBuilder c) mempty cmds
   in Text.Lazy.toStrict $ Text.Lazy.Builder.toLazyText builder
