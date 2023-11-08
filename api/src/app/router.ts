import getEmploymentOccupations from "./actions/get-employment-occupations";
import getEscoOccupations from "./actions/get-esco-occupations";
import getSkills from "./actions/get-skills";
import healthCheck from "./actions/health-check";
import { NotFoundException } from "./utilities/exceptions";

export default function getAction(request: Request): (request: Request) => Promise<Response> {
  const method = request.method;
  const path = new URL(request.url).pathname;

  switch (`${method} ${path}`) {
    case "GET /":
    case "GET /health-check":
      return healthCheck;
    case "GET /skills":
      return getSkills;
    case "GET /occupations":
      return getEscoOccupations;
    case "POST /Employment/EscoOccupations_v1.0":
    case "POST /Employment/EscoOccupations_v0.1":
      return getEmploymentOccupations;
    default:
      throw new NotFoundException();
  }
}
