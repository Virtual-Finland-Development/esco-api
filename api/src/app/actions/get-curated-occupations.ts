import { getAllRequestInputParams } from "../parsers/request-input";
import { transformOccupations } from "../parsers/transformers";
import { readResource } from "../services/resource-service";

export default async function (request: Request): Promise<Response> {
  const resource = await readResource("business-finland-esco-v1_1_1-occupations.json");
  const inputParams = getAllRequestInputParams(request);
  const responseData = transformOccupations(resource, inputParams);

  return new Response(JSON.stringify(responseData), {
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
}
