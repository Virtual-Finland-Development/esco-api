import { Input, array, number, object, string } from "valibot";

export const EmploymentOccupationSchema = object({
  escoCode: string(),
  escoJobTitle: string(),
  alternativeTitles: array(string()),
  escoDescription: string(),
  escoIdentifier: string(),
});

export type EmploymentOccupation = Input<typeof EmploymentOccupationSchema>;

export const EmploymentOccupationsResponseSchema = object({
  totalCount: number(),
  occupations: array(EmploymentOccupationSchema),
});
