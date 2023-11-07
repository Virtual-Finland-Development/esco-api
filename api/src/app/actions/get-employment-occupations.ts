import { EmploymentOccupationsResponseSchema } from "../models/EmploymentOccupation";
import { parseEscoResourceRequest } from "../utilities/request-input";
import { createGoodResponse } from "../utilities/responses";
import { transformEmploymentOccupations } from "../utilities/transformers";

export default async function (request: Request): Promise<Response> {
  const { resource, params } = await parseEscoResourceRequest(request, "business-finland-esco-v1_1_1-occupations.json");
  const responseData = transformEmploymentOccupations(resource, params);
  return createGoodResponse(responseData, EmploymentOccupationsResponseSchema);
}
