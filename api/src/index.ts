import getAction from "./app/router";

export default {
  async fetch(request: Request): Promise<Response> {
    try {
      const action = getAction(request);
      return await action(request);
    } catch (error: any) {
      // @TODO: logging, metrics, etc.
      return new Response(error.message, { status: 500 });
    }
  },
};
