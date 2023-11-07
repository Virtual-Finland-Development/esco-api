/**
 * Retrieves and merges request query- and body params
 *
 * @param request
 * @returns
 */
export async function getAllRequestInputParamsAsObject(request: Request): Promise<Record<string, string>> {
  const searchParams = new URL(request.url).searchParams;
  const params = Object.fromEntries(searchParams);
  if (request.method === "POST") {
    try {
      const body = await request.json();
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
