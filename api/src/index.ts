import getAction from "./app/router";
import Logger from "./app/services/Logger";

async function handleRequest(request: Request, logger: Logger): Promise<Response> {
  try {
    const action = getAction(request);
    return await action(request);
  } catch (error: any) {
    logger.catchError(error);
    return new Response(error.message, { status: 500 });
  }
}

export default {
  async fetch(request: Request): Promise<Response> {
    const logger = new Logger(request);
    const response = await handleRequest(request, logger);
    logger.log(response);
    return response;
  },
};
