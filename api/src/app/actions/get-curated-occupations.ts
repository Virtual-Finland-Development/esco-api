import OccupationsResponseSchema from "../models/schemas/OccupationsResponseSchema";
import { readResource } from "../services/resource-service";
import { getAllRequestInputParams } from "../utilities/request-input";
import { createGoodResponse } from "../utilities/responses";
import { transformOccupations } from "../utilities/transformers";

export default async function (request: Request): Promise<Response> {
  const resource = await readResource("business-finland-esco-v1_1_1-occupations.json");
  const inputParams = getAllRequestInputParams(request);
  const responseData = transformOccupations(resource, inputParams);
  return createGoodResponse(responseData, OccupationsResponseSchema);
}
