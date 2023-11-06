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
