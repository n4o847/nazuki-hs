#!/bin/bash

mkdir -p out

docker run -i --rm -v $(pwd):/workspace -w /workspace terrorjack/asterius << EOS
  echo building...
  ahc-link \
    --input-hs wasm/Lib.hs \
    --output-directory out \
    --output-prefix nazuki \
    --no-main \
    --browser \
    --ghc-option "-isrc" \
    --export-function=generate
  echo done
EOS
