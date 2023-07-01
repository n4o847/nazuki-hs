import {
  AssembleRequest,
  AssembleResponse,
  CompileRequest,
  CompileResponse,
  CreateBannerRequest,
  CreateBannerResponse,
  NazukiRequest,
  NazukiResponse,
  RunRequest,
  RunResponse,
} from "./types";

const worker = new Worker(new URL("./worker.ts", import.meta.url), {
  type: "module",
});

let globalId = 0;

const resolvers = new Map<
  number,
  { resolve: (value: NazukiResponse["result"]) => void }
>();

const createMethod =
  <Request extends NazukiRequest, Response extends NazukiResponse>(
    method: Request["method"]
  ) =>
  (params: Request["params"]) =>
    new Promise<Response["result"]>((resolve) => {
      const id = globalId++;
      resolvers.set(id, { resolve });
      worker.postMessage({ method, params, id });
    });

worker.addEventListener("message", (event: MessageEvent<NazukiResponse>) => {
  const { resolve } = resolvers.get(event.data.id)!;
  resolvers.delete(event.data.id);
  resolve(event.data.result);
});

export const compile = createMethod<CompileRequest, CompileResponse>("compile");

export const assemble = createMethod<AssembleRequest, AssembleResponse>(
  "assemble"
);

export const run = createMethod<RunRequest, RunResponse>("run");

export const createBanner = createMethod<
  CreateBannerRequest,
  CreateBannerResponse
>("createBanner");
