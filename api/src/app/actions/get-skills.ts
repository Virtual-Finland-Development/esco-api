import { readRawResource } from "../services/resource-service";

export default async function (_: Request): Promise<Response> {
  const resource = await readRawResource("skills.json");

  return new Response(resource, {
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
}
