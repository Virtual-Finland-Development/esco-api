import { BaseSchema, parse } from "valibot";

export function createGoodResponse(data: object | string, schema?: BaseSchema<any, any>): Response {
  if (schema) {
    parse(schema, data);
  }

  const responseData = typeof data === "string" ? data : JSON.stringify(data);

  return new Response(responseData, {
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
}
