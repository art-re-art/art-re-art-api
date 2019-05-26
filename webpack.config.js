const path = require("path");

module.exports = {
  watch: true,
  mode: "development",
  entry: ["./artreart/static_src/index.js", "./home/static_src/index.js"],
  output: {
    path: path.resolve(__dirname, "artreart/static"),
    filename: "bundle.js"
  },
  resolve: {
    alias: {
      "~": path.resolve(__dirname)
    }
  },
  devtool: "source-map"
};
