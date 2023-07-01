export interface NazukiInstance extends WebAssembly.Instance {
  readonly exports: NazukiExports;
}

export interface NazukiExports extends WebAssembly.Exports {
  readonly _initialize: () => void;
  readonly compile: (inputPtr: number, inputLen: number) => number;
  readonly assemble: (inputPtr: number, inputLen: number) => number;
  readonly malloc: (size: number) => number;
  readonly free: (ptr: number) => void;
  readonly hs_init: (argc: number, argv: number) => void;
  readonly memory: WebAssembly.Memory;
}

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

export type CompileParams = { source: string };

export type CompileRequest = Request<"compile", CompileParams>;

export type CompileResult =
  | { status: "success"; output: string }
  | { status: "error"; message: string };

export type CompileResponse = Response<CompileResult>;

export type AssembleParams = { source: string };

export type AssembleRequest = Request<"assemble", AssembleParams>;

export type AssembleResult =
  | { status: "success"; output: string }
  | { status: "error"; message: string };

export type AssembleResponse = Response<AssembleResult>;
