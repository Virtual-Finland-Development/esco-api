import { Input } from "valibot";
import OccupationSchema from "../schemas/OccupationSchema";

type Occupation = Input<typeof OccupationSchema>;

export default Occupation;
