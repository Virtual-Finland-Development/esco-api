type LogPackage = {
  trace: {
    id: string;
    amazonTraceId?: string;
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

export default LogPackage;
