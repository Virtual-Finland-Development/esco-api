import * as aws from "@pulumi/aws";
import { getResourceName } from "../setup";

export function createEscoApiLambdaFunctionUrl(escoApiLambdaFunction: aws.lambda.Function) {
  return new aws.lambda.FunctionUrl(getResourceName("LambdaFunctionUrl"), {
    functionName: escoApiLambdaFunction.name,
    authorizationType: "NONE",
    cors: {
      allowCredentials: false,
      allowOrigins: ["*"],
      allowMethods: ["POST"],
    },
  });
}
