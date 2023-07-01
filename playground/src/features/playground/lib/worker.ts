import { WASI, init } from "@wasmer/wasi";
import {
  AssembleParams,
  AssembleResult,
  CompileParams,
  CompileResult,
  NazukiInstance,
  NazukiRequest,
} from "./types";
import { Sender } from "./sender";
import { Receiver } from "./receiver";

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
  const sender = new Sender(instance.exports.memory, instance.exports.malloc);
  const receiver = new Receiver(instance.exports.memory, instance.exports.free);
  const [sourcePtr, sourceLen] = sender.sendString(source);
  const resultPtr = instance.exports.compile(sourcePtr, sourceLen);
  const result = receiver.receiveCompileResult(resultPtr);
  return result;
};

const assemble = async ({
  source,
}: AssembleParams): Promise<AssembleResult> => {
  await init();
  const wasi = new WASI({});
  const instance = wasi.instantiate(await modulePromise) as NazukiInstance;
  instance.exports._initialize();
  instance.exports.hs_init(0, 0);
  const sender = new Sender(instance.exports.memory, instance.exports.malloc);
  const receiver = new Receiver(instance.exports.memory, instance.exports.free);
  const [sourcePtr, sourceLen] = sender.sendString(source);
  const resultPtr = instance.exports.assemble(sourcePtr, sourceLen);
  const result = receiver.receiveCompileResult(resultPtr);
  return result;
};
