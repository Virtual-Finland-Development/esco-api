# esco-api

API for the ESCO datasets.

## Description

The primary function of this API application is to provide a simple interface to the ESCO datasets. The API is intented to be deployd as an AWS lambda function and to be accessed through Virtual Finland Dataspace. The datasets are generated using the [ESCO data generation scripts](./data-generation) from the ESCO local server that can be downloaded from https://esco.ec.europa.eu/en/use-esco/download.


Example query though the dataspace:

```
curl -X 'POST' \
  'https://gateway.datafinland.com/Employment/EscoOccupations_v1.0?source=virtualfinland' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "limit": 1000,
  "offset": 0
}' 
```

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

Publishing the API to the live environments is done by the CI/CD pipeline Github Actions defined [here](./.github/workflows/deployment.yml). The pipeline uses pulumi to deploy the API to AWS. The API is a lambda function published as a function URL and it is ran using a custom runtime and a lambda layer created by the [bun-lambda](https://github.com/oven-sh/bun/tree/main/packages/bun-lambda) helper.

The steps to deploy the API are:

- build the lambda function using the bun-bundler
- build the bun-lambda layer for the custom runtime
- using pulumi, deploy the bun-lambda layer and the lambda function

To simplify the process, use the deployment make-script:

```bash
make deploy
```

Requirements for the above command are:
- [GNU make](https://www.gnu.org/software/make/) installed
- [Pulumi](https://www.pulumi.com/) installed
- [Node.js](https://nodejs.org/en) installed
- [Bun.sh](https://bun.sh/) bundler installed
- AWS credentials configured
