import { Input } from "valibot";
import EmploymentOccupationSchema from "../schemas/EmploymentOccupationSchema";

type EmploymentOccupation = Input<typeof EmploymentOccupationSchema>;

export default EmploymentOccupation;
