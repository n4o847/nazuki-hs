import { CompileResult } from "./types";

export class Receiver {
  constructor(
    private readonly memory: WebAssembly.Memory,
    private readonly free: (ptr: number) => void
  ) {}

  receiveString(ptr: number, len: number): string {
    const decoder = new TextDecoder();
    const view = new DataView(this.memory.buffer, ptr, len);
    const string = decoder.decode(view);
    this.free(ptr);
    return string;
  }

  receiveCompileResult(ptr: number): CompileResult {
    const resultView = new DataView(this.memory.buffer, ptr, 12);
    const status = resultView.getUint32(0, true);
    if (status === 0) {
      const messagePtr = resultView.getUint32(4, true);
      const messageLen = resultView.getUint32(8, true);
      const message = this.receiveString(messagePtr, messageLen);
      this.free(ptr);
      return { status: "error", message };
    } else if (status === 1) {
      const outputPtr = resultView.getUint32(4, true);
      const outputLen = resultView.getUint32(8, true);
      const output = this.receiveString(outputPtr, outputLen);
      this.free(ptr);
      return { status: "success", output };
    } else {
      throw new Error(`invalid status ${status}`);
    }
  }
}
