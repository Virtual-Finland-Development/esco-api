import Occupation from "../models/types/Occupation";
import { getPaginationParams } from "./api-filter-params";

/**
 * @param occupations
 * @param params
 * @returns
 */
export function transformOccupations(occupations: Occupation[], params?: Record<string, string>) {
  const totalCount = occupations.length;
  const pagination = getPaginationParams(params);
  if (pagination.isPaginated) {
    occupations = occupations.slice(pagination.offset, pagination.offset + pagination.limit);
  }

  return {
    totalCount: totalCount,
    occupations: occupations,
  };
}

/**
 *
 * @param str
 * @param maxLength
 * @returns
 */
export function cutTooLongString(str: string | undefined, maxLength: number): string {
  if (typeof str !== "string") {
    return "";
  }

  if (str.length > maxLength) {
    return str.slice(0, maxLength) + "...";
  }
  return str;
}
