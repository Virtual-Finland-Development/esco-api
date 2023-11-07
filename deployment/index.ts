import { createCloudWatchLogSubFilter } from "./resources/CloudWatch";
import { createBunRuntimeLayer, createEscoApiLambdaFunction } from "./resources/LambdaFunction";
import { createEscoApiLambdaFunctionUrl } from "./resources/LambdaFunctionUrl";

// Bun runtime layer
const bunLayer = createBunRuntimeLayer();

// Esco API
const escoApi = createEscoApiLambdaFunction(bunLayer);
const escoApiFunctionUrl = createEscoApiLambdaFunctionUrl(escoApi.lambdaFunction);

// CloudWatch log subscription filter for errorSubLambdaFunction
createCloudWatchLogSubFilter(escoApi.lambdaFunction);

export const escoApiUrl = escoApiFunctionUrl.functionUrl;
export const escoApiLambdaId = escoApi.lambdaFunction.id;
