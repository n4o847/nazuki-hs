const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './www/main.js',
  module: {
    rules: [
      {
        test: /\.wasm$/,
        use: 'file-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './www/index.html'),
    }),
  ],
};
