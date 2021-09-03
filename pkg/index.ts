// @ts-ignore
import { newAsteriusInstance } from '../out/rts.mjs';
// @ts-ignore
import wasmURL from '../out/nazuki.wasm';
// @ts-ignore
import req from '../out/nazuki.req.mjs';
import { Nazuki } from './types';

export async function loadNazuki(): Promise<Nazuki> {
  const res = await fetch(wasmURL);
  const bytes = await res.arrayBuffer();
  const module = await WebAssembly.compile(bytes);
  Object.assign(req, { module });
  return {
    async compile(source: string): Promise<string> {
      const instance = await newAsteriusInstance(req);
      return instance.exports.compile(source);
    },
    async assemble(source: string): Promise<string> {
      const instance = await newAsteriusInstance(req);
      return instance.exports.assemble(source);
    },
    async run(program: string, input: string): Promise<string> {
      const instance = await newAsteriusInstance(req);
      return instance.exports.run(program, input);
    },
    async createBanner(source: string): Promise<string> {
      const instance = await newAsteriusInstance(req);
      return instance.exports.createBanner(source);
    },
  };
}
