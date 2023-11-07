import { BaseSchema, parse } from "valibot";

export function createGoodResponse(data: object | string, schema?: BaseSchema<any, any>): Response {
  if (schema) {
    parse(schema, data); // throws if invalid
  }

  const responseData = typeof data === "string" ? data : JSON.stringify(data);

  return new Response(responseData, {
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
}

export function createBadResponse(message: string, status = 400): Response {
  return new Response(
    JSON.stringify({
      message,
      type: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/" + status,
    }),
    {
      status,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    }
  );
}
