{-# LANGUAGE BlockArguments #-}
{-# LANGUAGE LambdaCase #-}

module Nazuki.Generator.Core
    ( Oper
    , getIsize
    , putIsize
    , bfNop
    , bfInc
    , bfDec
    , bfFwd
    , bfBwd
    , bfOpn
    , bfCls
    , bfGet
    , bfPut
    , generate
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

data Gen = Gen
    { cmds :: [BfCmd]
    , isize :: Int
    }

type Oper = State Gen ()

modifyCmds :: ([BfCmd] -> [BfCmd]) -> State Gen ()
modifyCmds f = modify \gen -> gen { cmds = f $ cmds gen }

getIsize :: State Gen Int
getIsize = gets isize

putIsize :: Int -> State Gen ()
putIsize isize = modify \gen -> gen { isize = isize }

empty = Gen
    { cmds = []
    , isize = 1
    }

bfNop :: Oper
bfNop =
    pure ()

bfInc :: Oper
bfInc =
    modifyCmds \case
        Dec:xs -> xs
        xs     -> Inc:xs

bfDec :: Oper
bfDec =
    modifyCmds \case
        Inc:xs -> xs
        xs     -> Dec:xs

bfFwd :: Oper
bfFwd =
    modifyCmds \case
        Bwd:xs -> xs
        xs     -> Fwd:xs

bfBwd :: Oper
bfBwd =
    modifyCmds \case
        Fwd:xs -> xs
        xs     -> Bwd:xs

bfOpn :: Oper
bfOpn =
    modifyCmds (Opn:)

bfCls :: Oper
bfCls =
    modifyCmds (Cls:)

bfGet :: Oper
bfGet =
    modifyCmds (Get:)

bfPut :: Oper
bfPut =
    modifyCmds (Put:)

toChar :: BfCmd -> Char
toChar = \case
    Inc -> '+'
    Dec -> '-'
    Fwd -> '>'
    Bwd -> '<'
    Opn -> '['
    Cls -> ']'
    Get -> ','
    Put -> '.'

generate :: Oper -> String
generate oper =
    map toChar $ reverse $ cmds $ execState oper empty
