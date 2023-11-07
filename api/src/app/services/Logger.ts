import { ValiError } from "valibot";
import LogPackage from "../models/types/LogPackage";
import { cutTooLongString } from "../utilities/transformers";

class Logger {
  private readonly request: Request;
  private readonly errors: any[] = [];

  constructor(request: Request) {
    this.request = request;
  }

  public log(response: Response): void {
    const log = this.parseLogPackage(this.request, response);

    if (typeof log.response.statusCode !== "number" || log.response.statusCode >= 404) {
      console.error(JSON.stringify(log, null, 4));
    } else {
      console.log(JSON.stringify(log));
    }
  }

  public catchError(error: Error | ValiError | any) {
    this.errors.push(Logger.formatError(error));
  }

  static formatError(error: Error | ValiError | any): any {
    if (error instanceof ValiError) {
      // Cleanup the vali error to make it more accessible: only show the first issue and remove the input
      return error.issues.slice(0, 1).map((i) => {
        return {
          ...i,
          input: cutTooLongString(JSON.stringify(i.input), 500),
          path: i.path?.map((p) => {
            return {
              ...p,
              input: cutTooLongString(JSON.stringify(p.input), 500),
            };
          }),
        };
      });
    } else if (error instanceof Error) {
      return {
        message: error.message,
        stack: error.stack,
      };
    } else {
      try {
        return JSON.stringify(error);
      } catch (e) {
        return error;
      }
    }
  }

  private parseLogPackage(request: Request, response: Response): LogPackage {
    const headers = Object.fromEntries(request.headers);
    const requestUrl = new URL(request.url);

    return {
      trace: {
        id: headers["x-request-trace-id"] || headers["x-amzn-trace-id"],
        amazonTraceId: headers["x-amzn-trace-id"],
        userAgent: headers["user-agent"],
      },
      request: {
        method: request.method,
        path: requestUrl.pathname,
        query: requestUrl.search,
      },
      response: {
        statusCode: response.status || 500,
      },
      errors: this.errors.length > 0 ? this.errors : undefined,
    };
  }
}

export default Logger;
