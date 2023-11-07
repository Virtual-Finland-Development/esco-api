import { array, parse } from "valibot";
import CommonEscoFilterInputSchema from "../models/schemas/CommonEscoFilterInputSchema";
import { EscoOccupationSchema } from "../models/schemas/EscoOccupationSchema";
import { readResource } from "../services/resource-service";
import { getAllRequestInputParamsAsObject } from "../utilities/request-input";
import { createGoodResponse } from "../utilities/responses";
import { transformEscoOccupations } from "../utilities/transformers";

export default async function (request: Request): Promise<Response> {
  const resource = await readResource("occupations.json");
  const params = await getAllRequestInputParamsAsObject(request);
  parse(CommonEscoFilterInputSchema, params); // Validate params
  const responseData = transformEscoOccupations(resource, params);
  return createGoodResponse(responseData, array(EscoOccupationSchema));
}
