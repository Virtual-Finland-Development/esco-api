import { readResource } from "../resources";

export default async function (_: Request): Promise<Response> {
  const resource = await readResource("business-finland-esco-v1_1_1-occupations.json");

  return new Response(JSON.stringify(resource), {
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
}
