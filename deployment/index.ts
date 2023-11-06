import * as pulumi from "@pulumi/pulumi";

import { getSetup } from "../../utils/Setup";
import { createCloudWatchLogSubFilter } from "./resources/CloudWatch";
import { createEscoApiLambdaFunctionUrl } from "./resources/LambdaFunctionUrl";
const setup = getSetup();

const codesetsStackReference = new pulumi.StackReference(`${setup.organizationName}/codesets/${setup.stage}`);
const url = codesetsStackReference.getOutput("url");

// Esco API
const escoApi = createEscoApiLambdaFunctionUrl(setup, pulumi.interpolate`${url}`);
// Create CloudWatch log subscription filter for errorSubLambdaFunction
createCloudWatchLogSubFilter(setup, escoApi.lambdaFunction);

export const escoApiUrl = escoApi.lambdaFunctionUrl.functionUrl;
export const escoApiLambdaId = escoApi.lambdaFunction.id;
