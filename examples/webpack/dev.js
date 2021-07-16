const base = require("./base");
const path = require("path");

module.exports = {
  ...base,
  mode: 'development',
  devtool: "inline-source-map",
  devServer: {
    contentBase: path.join(__dirname, "./dist"),
    compress: true,
    host: "0.0.0.0",
    port: 8080,
  },
};
