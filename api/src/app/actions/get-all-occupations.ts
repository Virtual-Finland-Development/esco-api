import { readRawResource } from "../resources";

export default async function (_: Request): Promise<Response> {
  const resource = await readRawResource("occupations.json");

  return new Response(resource, {
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
}
