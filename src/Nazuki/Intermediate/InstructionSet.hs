{-# LANGUAGE BlockArguments #-}
{-# LANGUAGE LambdaCase #-}

module Nazuki.Intermediate.InstructionSet where

import           Control.Monad
import           Data.Int                       ( Int32 )
import qualified Data.Maybe                    as Maybe
import qualified Data.Map                      as Map
import qualified Nazuki.Generator              as G

data Instruction
    = Const Int32
    | Dup
    | Get Int
    | Set Int
    | Not
    | And
    | Or
    | Xor
    | Shl
    | ShrU
    | ShrS
    | Inc
    | Add
    | Sub
    | Mul10
    | Mul
    | Eqz
    | Nez
    | Eq
    | LtS
    | LeS
    | LtU
    | LeU
    | GtS
    | GeS
    | GtU
    | GeU
    | Scan
    | Print
    | Jump Int
    | Jez Int
    | Jnz Int
    | Jeq Int
    deriving (Eq, Ord)

generate :: [Instruction] -> String
generate list = G.generate do
    G.assemble 33 do
        set <- foldM
            (\set ins -> do
                if Map.member ins set then
                    pure set
                else do
                    opcode <- G.register $ insToOper ins
                    pure $ Map.insert ins opcode set
            )
            Map.empty
            list
        forM_ list \ins -> do
            Maybe.fromJust $ Map.lookup ins set

insToOper :: Instruction -> G.Oper
insToOper = \case
    Const x -> G.intOf2To32Const x
    _ -> G.bfNop
