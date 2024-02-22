import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";
import { getResourceName, getTags, organizationName, stage } from "../setup";

export async function createCloudWatchLogsErrorAlerterSubscription(escoApiLambda: aws.lambda.Function) {
  const errorSubLambdaArn = new pulumi.StackReference(`${organizationName}/cloudwatch-logs-alerts/${stage}`).getOutput("errorSubLambdaFunctionArn");

  const escoApiLogGroupName = pulumi.interpolate`/aws/lambda/${escoApiLambda.name}`;
  escoApiLogGroupName.apply(async (logGroupName) => {
    const logGroup = new aws.cloudwatch.LogGroup(getResourceName("LogGroup"), {
      name: logGroupName,
      retentionInDays: 30,
      tags: getTags(),
    });
    const lambdaPermission = new aws.lambda.Permission(getResourceName("ErrorSubLambdaFunctionPermission"), {
      action: "lambda:InvokeFunction",
      function: errorSubLambdaArn,
      principal: "logs.amazonaws.com",
      sourceArn: pulumi.interpolate`${logGroup.arn}:*`,
    });
    new aws.cloudwatch.LogSubscriptionFilter(
      getResourceName("CloudWatchLogSubFilter"),
      {
        logGroup: escoApiLogGroupName,
        filterPattern: '?"ERROR" ?"Error"',
        destinationArn: errorSubLambdaArn,
      },
      {
        dependsOn: [logGroup, lambdaPermission],
      }
    );
  });
}
