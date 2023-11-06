import OccupationsResponseSchema from "../models/schemas/OccupationsResponseSchema";
import { readRawResource } from "../services/resource-service";
import { createGoodResponse } from "../utilities/responses";

export default async function (_: Request): Promise<Response> {
  const responseData = await readRawResource("occupations.json");
  return createGoodResponse(responseData, OccupationsResponseSchema);
}
