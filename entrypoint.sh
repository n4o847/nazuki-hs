#!/bin/bash

mkdir -p out

ahc-link \
  --input-hs pkg/Lib.hs \
  --output-directory out \
  --output-prefix nazuki \
  --no-main \
  --browser \
  --ghc-option "-isrc" \
  --export-function=assemble \
  --export-function=run
