import { ValiError } from "valibot";
import { LogPackage } from "../models/LogPackage";
import { cutTooLongString } from "./transformers";

class RequestLogger {
  private readonly request: Request;
  private readonly errors: any[] = [];

  constructor(request: Request) {
    this.request = request;
  }

  public log(response: Response): void {
    const log = this.parseLogPackage(this.request, response);

    // Flag the log as an error if the status code is not 200 or 404
    if (typeof log.response.statusCode !== "number" || (log.response.statusCode !== 200 && log.response.statusCode != 404)) {
      console.error(JSON.stringify(log, null, 4));
    } else {
      console.log(JSON.stringify(log));
    }
  }

  public catchError(error: Error | ValiError | any) {
    this.errors.push(this.formatError(error));
  }

  private formatError(error: Error | ValiError | any): any {
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

export default RequestLogger;
