{-# LANGUAGE BlockArguments #-}
{-# LANGUAGE LambdaCase #-}

module Nazuki.Generator.Core
    ( BfCmd(..)
    , Oper
    , nop
    , bfInc
    , bfDec
    , bfFwd
    , bfBwd
    , bfOpn
    , bfCls
    , bfGet
    , bfPut
    )
where

import           Control.Monad.State

data BfCmd
    = Inc
    | Dec
    | Fwd
    | Bwd
    | Opn
    | Cls
    | Get
    | Put
    deriving Show

type Oper = State [BfCmd] ()

nop :: Oper
nop = pure ()

bfInc :: Oper
bfInc =
    modify \case
        Dec:xs -> xs
        xs     -> Inc:xs

bfDec :: Oper
bfDec =
    modify \case
        Inc:xs -> xs
        xs     -> Dec:xs

bfFwd :: Oper
bfFwd =
    modify \case
        Bwd:xs -> xs
        xs     -> Fwd:xs

bfBwd :: Oper
bfBwd =
    modify \case
        Fwd:xs -> xs
        xs     -> Bwd:xs

bfOpn :: Oper
bfOpn = modify (Opn:)

bfCls :: Oper
bfCls = modify (Cls:)

bfGet :: Oper
bfGet = modify (Get:)

bfPut :: Oper
bfPut = modify (Put:)
