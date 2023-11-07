import { createCloudWatchLogSubFilter } from "./resources/CloudWatch";
import { createEscoApiLambdaFunction } from "./resources/LambdaFunction";
import { createEscoApiLambdaFunctionUrl } from "./resources/LambdaFunctionUrl";

// Esco API
const escoApi = createEscoApiLambdaFunction();
const escoApiFunctionUrl = createEscoApiLambdaFunctionUrl(escoApi.lambdaFunction);

// CloudWatch log subscription filter for errorSubLambdaFunction
createCloudWatchLogSubFilter(escoApi.lambdaFunction);

export const escoApiUrl = escoApiFunctionUrl.functionUrl;
export const escoApiLambdaId = escoApi.lambdaFunction.id;
