# Esco server quick start guide

## Prerequisites

-   nodejs
-   java runtime

## Install

-   run `npm install`
-   Download the esco v1.1.1 server from https://esco.ec.europa.eu/en/use-esco/download
-   Unzip the downloaded file to `./server` folder

## Usage

-   start server with `npm run serve` (~30s boot time)
-   in a separate terminal: run data building scripts with `npm run build:<feat>` eg. `npm run build:skills`
    -   or all the known building scripts: `npm run build`
- install the built resources to the [API-project](../api) data folder: `npm run install-built-resources`


## Documentation

Navigate to http://localhost:8080/doc/esco_api_doc.html
