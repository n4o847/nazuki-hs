FROM ubuntu:22.04

RUN apt-get update && apt-get install -y build-essential curl git jq unzip zstd

RUN git clone https://gitlab.haskell.org/ghc/ghc-wasm-meta.git

WORKDIR /ghc-wasm-meta

RUN FLAVOUR=9.8 ./setup.sh

WORKDIR /

COPY entrypoint.sh /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]

CMD ["/bin/bash"]
