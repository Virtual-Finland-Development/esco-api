import { array, object, string } from "valibot";

const OccupationSchema = object({
  escoCode: string(),
  escoJobTitle: string(),
  alternativeTitles: array(string()),
  escoDescription: string(),
  escoIdentifier: string(),
});

export default OccupationSchema;
