import getAction from "./app/router";
import RequestLogger from "./app/utilities/RequestLogger";
import { createBadResponse } from "./app/utilities/responses";

async function handleRequest(request: Request, logger: RequestLogger): Promise<Response> {
  try {
    const action = getAction(request);
    return await action(request);
  } catch (error: any) {
    logger.catchError(error);
    return createBadResponse(error.message, error.status);
  }
}

export default {
  async fetch(request: Request): Promise<Response> {
    const logger = new RequestLogger(request);
    const response = await handleRequest(request, logger);
    logger.log(response);
    return response;
  },
};
