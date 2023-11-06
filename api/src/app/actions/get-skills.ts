import { array, length, object, parse, record, string } from "valibot";
import { readRawResource } from "../services/resource-service";

const SkillSchema = object({
  uri: string(),
  prefLabel: record(string([length(2)]), string()),
});

export default async function (_: Request): Promise<Response> {
  const resourceData = await readRawResource("skills.json");
  const resource = parse(array(SkillSchema), resourceData);

  return new Response(JSON.stringify(resource), {
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
}
