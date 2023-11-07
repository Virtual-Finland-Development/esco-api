import EmploymentOccupationsResponseSchema from "../models/schemas/EmploymentOccupationsResponseSchema";
import { readResource } from "../services/resource-service";
import { getAllRequestInputParams } from "../utilities/request-input";
import { createGoodResponse } from "../utilities/responses";
import { transformEmploymentOccupations } from "../utilities/transformers";

export default async function (request: Request): Promise<Response> {
  const resource = await readResource("business-finland-esco-v1_1_1-occupations.json");
  const params = getAllRequestInputParams(request);
  const responseData = transformEmploymentOccupations(resource, params);
  return createGoodResponse(responseData, EmploymentOccupationsResponseSchema);
}
