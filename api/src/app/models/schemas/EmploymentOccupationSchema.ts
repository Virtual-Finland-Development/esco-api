import { array, object, string } from "valibot";

const EmploymentOccupationSchema = object({
  escoCode: string(),
  escoJobTitle: string(),
  alternativeTitles: array(string()),
  escoDescription: string(),
  escoIdentifier: string(),
});

export default EmploymentOccupationSchema;
