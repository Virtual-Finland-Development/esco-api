# esco-api application

Provider API for the ESCO datasets.

## Requirements

- Bun: https://bun.sh/docs/installation

## Installation

To install dependencies:

```bash
bun install
```

## Development

To run development server:

```bash
bun run dev
```

## Deployment

Publishing the API to the live environments is done by the CI/CD pipeline Github Actions. The pipeline uses pulumi to deploy the API to AWS. The API is a lambda function published as a function URL and it is run using a custom runtime and a lambda layer created by the [bun-lambda](https://github.com/oven-sh/bun/tree/main/packages/bun-lambda) helper.

The steps to deploy the API are:

- build the lambda function using the bun-bundler
- build the bun-lambda layer for the custom runtime
- using pulumi, deploy the bun-lambda layer
- using pulumi, deploy the lambda function

