#!/bin/bash

case $1 in
  --docker)
    docker run --rm -v $(pwd):/workspace -w /workspace --entrypoint ./entrypoint.sh terrorjack/asterius
    ;;
  --local)
    WASI_SDK_PATH=/opt/wasi-sdk ./entrypoint.sh
    ;;
esac
