# esco-api

Provider API for the ESCO datasets.

## Project setup

Project is structured in folders:

- [./api](./api): the API-application
- [./data-generation](./data-generation): ESCO data generation scripts
- [./deployment](./deployment): deployment scripts

## Usage

Run the application with docker compose or natively with bun.

### With docker compose

With docker compose, the following network must be created: `vfd-network`.

Create the network with command:

```
docker network create vfd-network
```

Then start up the service with docker compose:

```
docker compose up
```

The ESCO API should be available at [http://localhost:3560](http://localhost:3560)

### With bun

See the [./api/README.md](./api/README.md) for instructions on how to run the API application with bun.

## Deployment

Publishing the API to the live environments is done by the CI/CD pipeline Github Actions. The pipeline uses pulumi to deploy the API to AWS. The API is a lambda function published as a function URL and it is run using a custom runtime and a lambda layer created by the [bun-lambda](https://github.com/oven-sh/bun/tree/main/packages/bun-lambda) helper.

The steps to deploy the API are:

- build the lambda function using the bun-bundler
- build the bun-lambda layer for the custom runtime
- using pulumi, deploy the bun-lambda layer and the lambda function

To simplify the process, use the deployment make-script:

> pre-requisites:
> - pulumi installed
> - AWS credentials configured
> - nodejs installed
> - bun-bundler installed

```bash
make deploy
```
