import { array, number, object } from "valibot";

import EmploymentOccupationSchema from "./EmploymentOccupationSchema";

const EmploymentOccupationsResponseSchema = object({
  totalCount: number(),
  occupations: array(EmploymentOccupationSchema),
});

export default EmploymentOccupationsResponseSchema;
