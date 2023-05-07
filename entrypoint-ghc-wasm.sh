#!/bin/bash

wasm32-wasi-cabal build

mkdir -p out-ghc-wasm

cp $(wasm32-wasi-cabal list-bin nazuki) out-ghc-wasm/nazuki.wasm
