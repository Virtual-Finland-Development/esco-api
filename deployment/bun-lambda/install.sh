#!/usr/bin/env bash
# @see: https://github.com/oven-sh/bun/tree/main/packages/bun-lambda
set -e
git clone git@github.com:oven-sh/bun.git
cd bun/packages/bun-lambda
bun install
bun run build-layer
cd ../../..
mv bun/packages/bun-lambda/bun-lambda-layer.zip dist/
rm -rf bun