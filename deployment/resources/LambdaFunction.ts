import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";
import { getResourceName, getTags } from "../setup";

export function createEscoApiLambdaFunction(bunLayer: aws.lambda.LayerVersion) {
  const escoApiLambdaFunctionExecRoleRole = new aws.iam.Role(getResourceName("LambdaFunctionExecRole"), {
    assumeRolePolicy: JSON.stringify({
      Version: "2012-10-17",
      Statement: [
        {
          Action: "sts:AssumeRole",
          Principal: {
            Service: ["lambda.amazonaws.com"],
          },
          Effect: "Allow",
        },
      ],
    }),
    tags: getTags(),
  });

  new aws.iam.RolePolicy(getResourceName("LambdaFunctionExecRolePolicy"), {
    role: escoApiLambdaFunctionExecRoleRole.id,
    policy: JSON.stringify({
      Version: "2012-10-17",
      Statement: [
        {
          Action: ["logs:CreateLogGroup", "logs:CreateLogStream", "logs:PutLogEvents"],
          Resource: "arn:aws:logs:*:*:*",
          Effect: "Allow",
        },
      ],
    }),
  });

  const escoApiLambdaFunction = new aws.lambda.Function(getResourceName("LambdaFunction"), {
    role: escoApiLambdaFunctionExecRoleRole.arn,
    runtime: "provided.al2",
    handler: "index.handler",
    timeout: 30,
    memorySize: 1024,
    code: new pulumi.asset.FileArchive("./dist"),
    tags: getTags(),
    environment: {
      variables: {},
    },
    layers: [bunLayer.arn],
  });

  return {
    role: escoApiLambdaFunctionExecRoleRole,
    lambdaFunction: escoApiLambdaFunction,
  };
}

export function createBunRuntimeLayer() {
  const bunRuntimeLayer = new aws.lambda.LayerVersion(getResourceName("BunRuntimeLayer"), {
    layerName: getResourceName("BunRuntimeLayer"),
    description: "Bun is an incredibly fast JavaScript runtime, bundler, transpiler, and package manager.",
    licenseInfo: "MIT",
    compatibleRuntimes: ["provided.al2", "provided"],
    code: new pulumi.asset.FileArchive("./bun-lambda/dist/bun-lambda-layer.zip"),
  });

  return bunRuntimeLayer;
}
