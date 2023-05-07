#!/bin/bash

case $1 in
  --docker)
    docker build -t ghc-wasm-meta:9.6 --network host ghc-wasm-meta
    docker run --rm -v $(pwd):/workspace -w /workspace --net host ghc-wasm-meta:9.6 ./entrypoint-ghc-wasm.sh
    ;;
  --local)
    source ~/.ghc-wasm/env
    exec ./entrypoint-ghc-wasm.sh
    ;;
esac
