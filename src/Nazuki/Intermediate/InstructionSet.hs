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
    | Write String
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
    Dup -> G.intOf2To32Dup
    Get x -> G.intOf2To32Get x
    Set x -> G.intOf2To32Set x
    Not -> G.intOf2To32Not
    And -> G.intOf2To32And
    Or -> G.intOf2To32Or
    Xor -> G.intOf2To32Xor
    Shl -> G.intOf2To32Shl
    ShrU -> G.intOf2To32ShrU
    ShrS -> G.intOf2To32ShrS
    Inc -> G.intOf2To32Inc
    Add -> G.intOf2To32Add
    Sub -> G.intOf2To32Sub
    Mul10 -> G.intOf2To32Mul10
    Mul -> G.intOf2To32Mul
    Eqz -> G.intOf2To32Eqz
    Nez -> G.intOf2To32Nez
    Eq -> G.intOf2To32Eq
    LtS -> G.intOf2To32LtS
    LeS -> G.intOf2To32LeS
    LtU -> G.intOf2To32LtU
    LeU -> G.intOf2To32LeU
    GtS -> G.intOf2To32GtS
    GeS -> G.intOf2To32GeS
    GtU -> G.intOf2To32GtU
    GeU -> G.intOf2To32GeU
    Scan -> G.intOf2To32Scan
    Print -> G.intOf2To32Print
    Write s -> G.puts 0 s
    Jump r -> G.intOf2To32Jump r
    Jez r -> G.intOf2To32Jez r
    Jnz r -> G.intOf2To32Jnz r
    Jeq r -> G.intOf2To32Jeq r
    _ -> G.bfNop
