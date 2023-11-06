import EscoDataUnit from "../models/types/EscoDataUnit";
import { getLocalesFilter, getPaginationParams, getSearchPhrases, isEnabledFormat } from "./api-filter-params";

/**
 * Common ESCo data unit interface
 */
export function filterCommonEscoDataSet<T extends EscoDataUnit>(items: T[], params?: Record<string, string>) {
  const localesFilter = getLocalesFilter(params);
  if (localesFilter.length > 0) {
    items = items.map((item: T) => {
      const filteredPrefLabel = Object.entries(item.prefLabel).reduce((acc, [key, value]) => {
        if (localesFilter.includes(key)) {
          acc[key] = value;
        }
        return acc;
      }, {} as any);
      return {
        ...item,
        prefLabel: filteredPrefLabel,
      };
    });
  }

  const searchPhrases = getSearchPhrases(params);
  if (searchPhrases.length > 0) {
    return items.filter((item: T) => {
      const descriptions = Object.values(item.prefLabel).map((text) => {
        return text.toLocaleLowerCase();
      });
      return searchPhrases.some((phrase: string) => {
        return descriptions.some((description: string) => {
          return description.includes(phrase);
        });
      });
    });
  }

  const pagination = getPaginationParams(params);
  if (pagination.isPaginated) {
    items = items.slice(pagination.offset, pagination.offset + pagination.limit);
  } else {
    // Pagination and tree-format is not compatible
    if (isEnabledFormat(params, "tree")) {
      items = formatToEscoTree<T>(items, params);
    }
  }

  return items;
}

/**
 * Generate tree structure from flat array of ESCo data units
 *
 * @param items
 * @returns
 */
export function formatToEscoTree<T extends EscoDataUnit>(items: T[], params: Record<string, string> | undefined): T[] {
  const tree: T[] = [];
  const map = new Map<string, T>();
  items.forEach((item) => {
    map.set(item.uri, item);
  });
  items.forEach((item) => {
    const parentUri = item.broader?.[0];
    if (typeof parentUri === "string") {
      const parent = map.get(parentUri);
      if (parent) {
        if (!parent.narrower) {
          parent.narrower = [];
        }
        parent.narrower.push(item);
      } else {
        tree.push(item);
      }
    } else {
      tree.push(item);
    }
  });

  if (!isEnabledFormat(params, "broader")) {
    // Cleanup the broader references
    items.forEach((item) => {
      delete item.broader;
    });
  }

  return tree;
}
