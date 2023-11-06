import getAllOccupations from "./actions/get-all-occupations";
import getCuratedOccupations from "./actions/get-curated-occupations";
import getSkills from "./actions/get-skills";
import healthCheck from "./actions/health-check";

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
      return getAllOccupations;
    case "POST /Employment/EscoOccupations_v1.0":
    case "POST /Employment/EscoOccupations_v0.1":
      return getCuratedOccupations;
    default:
      throw new Error("Not found"); // @TODO
  }
}
