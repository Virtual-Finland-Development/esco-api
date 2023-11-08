#!/usr/bin/env bash
# @see: https://github.com/oven-sh/bun/tree/main/packages/bun-lambda
cd "${0%/*}"
if [ ! -f ./build-runtime.sh ]; then 
    echo "Please run this script from the deployment/bun-lambda directory"
    exit 1
fi

set -e
git clone https://github.com/oven-sh/bun.git
cd bun/packages/bun-lambda
bun install
bun run build-layer
cd ../../..
mv bun/packages/bun-lambda/bun-lambda-layer.zip dist/
rm -rf bun