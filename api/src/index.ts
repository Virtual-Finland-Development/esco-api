import execute from "./app/router";

export default {
  async fetch(request: Request): Promise<Response> {
    try {
      return await execute(request);
    } catch (error: any) {
      // @TODO: logging, metrics, etc.
      return new Response(error.message, { status: 500 });
    }
  },
};
