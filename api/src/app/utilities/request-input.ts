import { parse } from "valibot";
import { CommonEscoFilterInputSchema } from "../models/CommonEscoFilterInput";
import { readResource } from "../services/resource-service";

/**
 * Retrieves esco resource and merges and validates request query- and body params
 *
 * @param request
 * @param resourceFilename
 * @returns
 */
export async function parseEscoResourceRequest(request: Request, resourceFilename: string) {
  const resource = await readResource(resourceFilename);
  const params = await getAllRequestInputParamsAsObject(request);
  parse(CommonEscoFilterInputSchema, params); // Validate params
  return { resource, params };
}

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
