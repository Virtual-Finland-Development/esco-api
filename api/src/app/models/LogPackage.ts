export type LogPackage = {
  trace: {
    id: string;
    userAgent: string;
    sourceIp?: string;
  };
  request: {
    method: string;
    path: string;
    query: string;
  };
  response: {
    statusCode: number;
  };
  errors?: any[];
};
