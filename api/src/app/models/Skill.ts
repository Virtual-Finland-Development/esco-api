import { length, object, record, string } from "valibot";

export const SkillSchema = object({
  uri: string(),
  prefLabel: record(string([length(2)]), string()),
});
