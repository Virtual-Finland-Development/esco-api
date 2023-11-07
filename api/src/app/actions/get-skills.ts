import { array } from "valibot";
import SkillSchema from "../models/schemas/SkillSchema";
import { readResource } from "../services/resource-service";
import { filterCommonEscoDataSet } from "../utilities/esco-formatters";
import { getAllRequestInputParams } from "../utilities/request-input";
import { createGoodResponse } from "../utilities/responses";

export default async function (request: Request): Promise<Response> {
  const resource = await readResource("skills.json");
  const params = await getAllRequestInputParams(request);
  const responseData = filterCommonEscoDataSet(resource, params);
  return createGoodResponse(responseData, array(SkillSchema));
}
