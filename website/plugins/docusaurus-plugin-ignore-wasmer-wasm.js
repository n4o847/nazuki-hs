// @ts-check

const webpack = require("webpack");

/** @type {import('@docusaurus/types').PluginModule} */
module.exports = function (_context, _options) {
  return {
    name: "docusaurus-plugin-ignore-wasmer-wasm",
    configureWebpack(_config, _isServer, _utils, _content) {
      return {
        plugins: [
          new webpack.IgnorePlugin({
            contextRegExp: /\/node_modules\/@wasmer\/wasi\/dist$/,
            resourceRegExp: /^wasmer_wasi_js_bg\.wasm$/,
          }),
        ],
      };
    },
  };
};
