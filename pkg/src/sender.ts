export class Sender {
  constructor(
    private readonly memory: WebAssembly.Memory,
    private readonly malloc: (size: number) => number
  ) {}

  sendString(string: string): [ptr: number, len: number] {
    const encoder = new TextEncoder();
    const bytes = encoder.encode(string);
    const len = bytes.byteLength;
    const ptr = this.malloc(len);
    encoder.encodeInto(string, new Uint8Array(this.memory.buffer, ptr, len));
    return [ptr, len];
  }
}
