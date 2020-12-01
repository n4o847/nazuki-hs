// @ts-ignore
import * as rts from '../out/rts.mjs';
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
    async generate(x: number) {
      const instance = await rts.newAsteriusInstance(req);
      return instance.exports.generate(x);
    },
    async run(program: string, input: string) {
      const instance = await rts.newAsteriusInstance(req);
      return instance.exports.run(program, input);
    },
  };
}
