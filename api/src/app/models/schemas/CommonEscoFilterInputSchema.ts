import { object, optional, string } from "valibot";

const CommonEscoFilterInputSchema = optional(
  object({
    source: optional(string()),
    locales: optional(string()),
    query: optional(string()),
    formats: optional(string()),
    limit: optional(string()), // Supports url query param input where all values are strings
    offset: optional(string()), // Supports url query param input where all values are strings
  })
);

export default CommonEscoFilterInputSchema;
