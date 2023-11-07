import { array } from "valibot";
import { EscoOccupationSchema } from "../models/EscoOccupation";
import { parseEscoResourceRequest } from "../utilities/request-input";
import { createGoodResponse } from "../utilities/responses";
import { transformEscoOccupations } from "../utilities/transformers";

export default async function (request: Request): Promise<Response> {
  const { resource, params } = await parseEscoResourceRequest(request, "occupations.json");
  const responseData = transformEscoOccupations(resource, params);
  return createGoodResponse(responseData, array(EscoOccupationSchema));
}
