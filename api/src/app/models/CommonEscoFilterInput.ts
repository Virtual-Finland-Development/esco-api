import { object, optional, string } from "valibot";

export const CommonEscoFilterInputSchema = optional(
  object({
    source: optional(string()),
    locales: optional(string()),
    query: optional(string()),
    formats: optional(string()),
    limit: optional(string()), // Supports url query param input where all values are strings, must be parsed to number when used
    offset: optional(string()), // Supports url query param input where all values are strings, must be parsed to number when used
  })
);
