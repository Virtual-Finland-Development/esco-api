import { length, object, record, string } from "valibot";
const SkillSchema = object({
  uri: string(),
  prefLabel: record(string([length(2)]), string()),
});

export default SkillSchema;
