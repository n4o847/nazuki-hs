#!/bin/bash

wasm32-wasi-cabal build nazuki-wasm

mkdir -p out-ghc-wasm

cp $(wasm32-wasi-cabal list-bin nazuki-wasm) out-ghc-wasm/nazuki.wasm
