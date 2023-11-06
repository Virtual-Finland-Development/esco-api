import { array } from "valibot";
import SkillSchema from "../models/schemas/SkillSchema";
import { readRawResource } from "../services/resource-service";
import { createGoodResponse } from "../utilities/responses";

export default async function (_: Request): Promise<Response> {
  const responseData = await readRawResource("skills.json");
  return createGoodResponse(responseData, array(SkillSchema));
}
