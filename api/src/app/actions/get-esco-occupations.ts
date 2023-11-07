import { array } from "valibot";
import { EscoOccupationSchema } from "../models/schemas/EscoOccupationSchema";
import { readResource } from "../services/resource-service";
import { getAllRequestInputParams } from "../utilities/request-input";
import { createGoodResponse } from "../utilities/responses";
import { transformEscoOccupations } from "../utilities/transformers";

export default async function (request: Request): Promise<Response> {
  const resource = await readResource("occupations.json");
  const params = await getAllRequestInputParams(request);
  const responseData = transformEscoOccupations(resource, params);
  return createGoodResponse(responseData, array(EscoOccupationSchema));
}
