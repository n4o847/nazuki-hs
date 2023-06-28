import { WASI, init } from "@wasmer/wasi";
import {
  AssembleRequest,
  AssembleResponse,
  CompileParams,
  CompileResult,
  NazukiInstance,
  NazukiRequest,
} from "./types";

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
  } else if (event.data.method === "assemble") {
    const result = await assemble(event.data.params);
    self.postMessage({ result, id: event.data.id });
  }
});

const compile = async ({ source }: CompileParams): Promise<CompileResult> => {
  await init();
  const wasi = new WASI({});
  const instance = wasi.instantiate(await modulePromise) as NazukiInstance;
  instance.exports._initialize();
  instance.exports.hs_init(0, 0);
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  const sourceBytes = encoder.encode(source);
  const sourceLen = sourceBytes.byteLength;
  const sourcePtr = instance.exports.malloc(sourceLen);
  encoder.encodeInto(
    source,
    new Uint8Array(instance.exports.memory.buffer, sourcePtr, sourceLen)
  );
  const resultPtr = instance.exports.compile(sourcePtr, sourceLen);
  const resultView = new DataView(
    instance.exports.memory.buffer,
    resultPtr,
    12
  );
  const status = resultView.getUint32(0, true);
  if (status === 0) {
    const outputPtr = resultView.getUint32(4, true);
    const outputLen = resultView.getUint32(8, true);
    const outputView = new DataView(
      instance.exports.memory.buffer,
      outputPtr,
      outputLen
    );
    const output = decoder.decode(outputView);
    instance.exports.free(outputPtr);
    instance.exports.free(resultPtr);
    return { status: "success", output };
  } else {
    const messagePtr = resultView.getUint32(4, true);
    const messageLen = resultView.getUint32(8, true);
    const messageView = new DataView(
      instance.exports.memory.buffer,
      messagePtr,
      messageLen
    );
    const message = decoder.decode(messageView);
    instance.exports.free(messagePtr);
    instance.exports.free(resultPtr);
    return { status: "error", message };
  }
};

const assemble = async ({
  source,
}: AssembleRequest["params"]): Promise<AssembleResponse["result"]> => {
  await init();
  const wasi = new WASI({
    args: ["nio", "asm", "/a.nasm", "/a.bf"],
  });
  wasi.fs.open("/a.nasm", { write: true, create: true }).writeString(source);
  const instance = wasi.instantiate(await modulePromise);
  wasi.start(instance);
  return {
    output: wasi.fs.open("/a.bf", {}).readString(),
  };
};
