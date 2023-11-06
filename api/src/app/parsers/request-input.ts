/**
 * Retrieves and merges request query- and body params
 *
 * @param request
 * @returns
 */
export function getAllRequestInputParams(request: Request): Record<string, string> {
  const searchParams = new URL(request.url).searchParams;
  const params = Object.fromEntries(searchParams);
  if (request.method === "POST" && typeof request.body === "string") {
    try {
      const body = JSON.parse(request.body);
      if (typeof body === "object") {
        Object.assign(params, parseRequestInputParams(body));
      }
    } catch (error) {
      // Pass
    }
  }

  return params;
}

/**
 *
 * @param body
 * @returns
 */
export function parseRequestInputParams(bodyData: any): Record<string, string> {
  return Object.entries(bodyData).reduce((acc, [key, value]) => ({ ...acc, [key]: String(value) }), {});
}
