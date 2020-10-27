import * as rts from '../out/rts.mjs';
import wasmURL from '../out/nazuki.wasm';
import req from '../out/nazuki.req.mjs';

(async () => {
  const res = await fetch(wasmURL);
  const bytes = await res.arrayBuffer();
  const module = await WebAssembly.compile(bytes);
  const instance = await rts.newAsteriusInstance(Object.assign(req, { module }));
  document.getElementById('target').value = await instance.exports.generate(10);
})();
