import { array, number, object } from "valibot";

import OccupationSchema from "./OccupationSchema";

const OccupationsResponseSchema = object({
  totalCount: number(),
  occupations: array(OccupationSchema),
});

export default OccupationsResponseSchema;
