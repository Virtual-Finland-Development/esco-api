import { createCloudWatchLogsErrorAlerterSubscription } from "./resources/CloudWatch";
import { createEscoApiLambdaFunction } from "./resources/LambdaFunction";
import { createEscoApiLambdaFunctionUrl } from "./resources/LambdaFunctionUrl";
import { pulumiConfig } from "./setup";

// Esco API
const escoApi = createEscoApiLambdaFunction();
const escoApiFunctionUrl = createEscoApiLambdaFunctionUrl(escoApi.lambdaFunction);

// CloudWatch log subscription filter for errorSubLambdaFunction
if (pulumiConfig.requireBoolean("createCloudWatchLogAlert")) {
  createCloudWatchLogsErrorAlerterSubscription(escoApi.lambdaFunction);
}

export const escoApiUrl = escoApiFunctionUrl.functionUrl;
export const escoApiLambdaId = escoApi.lambdaFunction.id;
