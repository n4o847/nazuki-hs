export interface Request<Method extends string, Params> {
  method: Method;
  params: Params;
  id: number;
}

export interface Response<Result> {
  result: Result;
  id: number;
}

export type NazukiRequest = CompileRequest | AssembleRequest;

export type NazukiResponse = CompileResponse | AssembleResponse;

export type CompileRequest = Request<"compile", { source: string }>;

export type CompileResponse = Response<{ output: string }>;

export type AssembleRequest = Request<"assemble", { source: string }>;

export type AssembleResponse = Response<{ output: string }>;
