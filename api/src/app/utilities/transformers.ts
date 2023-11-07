import { EscoOccupation } from "../models/EscoOccupation";
import EmploymentOccupation from "../models/types/EmploymentOccupation";
import { getPaginationParams, isEnabledFilter, isEnabledFormat } from "./api-filter-params";
import { filterCommonEscoDataSet } from "./esco-formatters";

/**
 * @param occupations
 * @param params
 * @returns
 */
export function transformEmploymentOccupations(occupations: EmploymentOccupation[], params?: Record<string, string>) {
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

export function transformEscoOccupations(occupations: EscoOccupation[], params?: Record<string, string>) {
  if (isEnabledFilter(params, "isco") && !isEnabledFilter(params, "esco")) {
    occupations = occupations.filter((occupation: EscoOccupation) => {
      return !occupation.uri.startsWith("http://data.europa.eu/esco/occupation/");
    });
  } else if (isEnabledFilter(params, "esco")) {
    occupations = occupations.filter((occupation: EscoOccupation) => {
      return occupation.uri.startsWith("http://data.europa.eu/esco/occupation/");
    });
  }

  occupations = filterCommonEscoDataSet<EscoOccupation>(occupations, params);

  if (!isEnabledFormat(params, "broader") && !isEnabledFormat(params, "tree")) {
    occupations = occupations.map((occupation: EscoOccupation) => {
      return {
        ...occupation,
        broader: undefined,
      };
    });
  }

  return occupations;
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
