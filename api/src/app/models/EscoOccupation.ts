import { BaseSchema, Output, array, length, merge, object, optional, record, recursive, string } from "valibot";

// Build a recursive object type with children of self-likes
// @see: https://github.com/fabian-hiller/valibot/issues/72
export const BaseEscoOccupationSchema = object({
  uri: string(),
  prefLabel: record(string([length(2)]), string()),
  notation: optional(string()),
  broader: optional(array(string())), // Disabled by the "tree" formats parameter
});

export type EscoOccupation = Output<typeof BaseEscoOccupationSchema> & {
  narrower?: EscoOccupation[];
};

export const EscoOccupationSchema: BaseSchema<EscoOccupation> = merge([
  BaseEscoOccupationSchema,
  object({
    narrower: optional(recursive(() => array(EscoOccupationSchema))), // Enabled by the "tree" formats parameter
  }),
]);
