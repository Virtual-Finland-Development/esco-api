export function isEnabledFilter(params: Record<string, string> | undefined, filterName: string): boolean {
    if (typeof params === "object" && params !== null && typeof params.filters === 'string') {
        const filters = params.filters.split(',');
        return filters.includes(filterName);
    }
    return false;
}

export function isEnabledFormat(params: Record<string, string> | undefined, formatName: string): boolean {
    if (typeof params === "object" && params !== null && typeof params.formats === 'string') {
        const formats = params.formats.split(',');
        return formats.includes(formatName);
    }
    return false;
}

export function getSearchPhrases(params: Record<string, string> | undefined): Array<string> {
    if (typeof params === "object" && params !== null && typeof params.query === 'string') {
        return params.query.toLocaleLowerCase().split(',');
    }
    return [];
}

export function getLocalesFilter(params: Record<string, string> | undefined): Array<string> {
    if (typeof params === "object" && params !== null && typeof params.locales === 'string') {
        return params.locales.toLocaleLowerCase().split(',');
    }
    return [];
}

export function getPaginationParams(params: Record<string, string> | undefined): {
    isPaginated: boolean;
    offset: number;
    limit: number;
} {
    let offset = -1;
    let limit = -1;

    if (typeof params === "object" && params !== null && typeof params.offset !== 'undefined' && typeof params.limit !== 'undefined') {
        const parsedOffset = parseInt(params.offset);
        const parsedLimit = parseInt(params.limit);
        if (Number.isInteger(parsedOffset) && Number.isInteger(parsedLimit)) {
            offset = parsedOffset;
            limit = parsedLimit;
        }
    }

    return {
        isPaginated: offset >= 0 && limit > 0,
        offset,
        limit,
    };
}
