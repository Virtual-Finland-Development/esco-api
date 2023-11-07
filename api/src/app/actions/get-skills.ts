import { array, parse } from "valibot";
import CommonEscoFilterInputSchema from "../models/schemas/CommonEscoFilterInputSchema";
import SkillSchema from "../models/schemas/SkillSchema";
import { readResource } from "../services/resource-service";
import { filterCommonEscoDataSet } from "../utilities/esco-formatters";
import { getAllRequestInputParamsAsObject } from "../utilities/request-input";
import { createGoodResponse } from "../utilities/responses";

export default async function (request: Request): Promise<Response> {
  const resource = await readResource("skills.json");
  const params = await getAllRequestInputParamsAsObject(request);
  parse(CommonEscoFilterInputSchema, params); // Validate params
  const responseData = filterCommonEscoDataSet(resource, params);
  return createGoodResponse(responseData, array(SkillSchema));
}
