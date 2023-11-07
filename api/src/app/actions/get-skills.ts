import { array } from "valibot";
import { SkillSchema } from "../models/Skill";
import { filterCommonEscoDataSet } from "../utilities/esco-formatters";
import { parseEscoResourceRequest } from "../utilities/request-input";
import { createGoodResponse } from "../utilities/responses";

export default async function (request: Request): Promise<Response> {
  const { resource, params } = await parseEscoResourceRequest(request, "skills.json");
  const responseData = filterCommonEscoDataSet(resource, params);
  return createGoodResponse(responseData, array(SkillSchema));
}
