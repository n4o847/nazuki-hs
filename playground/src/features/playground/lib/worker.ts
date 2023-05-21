import { WASI, init } from "@wasmer/wasi";
import { CompileRequest, CompileResponse, NazukiRequest } from "./types";

const WASM_URL = new URL(
  "../../../../../out-ghc-wasm/nazuki.wasm",
  import.meta.url
);

const modulePromise = WebAssembly.compileStreaming(fetch(WASM_URL));

/**
 * https://github.com/wasmerio/wasmer-js/issues/305
 */
Object.defineProperty(self, "Buffer", {
  value: {
    from(data: string, _encoding: string): Uint8Array {
      const binaryString = atob(data);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      return bytes;
    },
  },
});

self.addEventListener("message", async (event: MessageEvent<NazukiRequest>) => {
  if (event.data.method === "compile") {
    const result = await compile(event.data.params);
    self.postMessage({ result, id: event.data.id });
  }
});

const compile = async ({
  source,
}: CompileRequest["params"]): Promise<CompileResponse["result"]> => {
  await init();
  const wasi = new WASI({
    args: ["nio", "c", "/a.nazuki", "/a.bf"],
  });
  wasi.fs.open("/a.nazuki", { write: true, create: true }).writeString(source);
  const instance = wasi.instantiate(await modulePromise);
  wasi.start(instance);
  return {
    output: wasi.fs.open("/a.bf", {}).readString(),
  };
};
