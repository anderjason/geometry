const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    main: "./examples/src/index.ts",
  },
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "[name]-bundle.js",
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      { test: /\.ts$/, loader: "ts-loader" },
      {
        test: /\.(png|jpg|svg|woff|woff2|mp3)/,
        type: "asset/resource",
      },
      {
        resourceQuery: /raw/,
        type: 'asset/source',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "examples/webpack/index.html",
    }),
  ],
};
