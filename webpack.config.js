const path = require("path");
const ProvidePlugin = require("webpack").ProvidePlugin;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");

module.exports = {
  mode: "development",
  devtool: "source-map",
  stats: {
    entrypoints: false
  },
  performance: {
    hints: false
  },
  entry: ["./client/static_src/index.js"],
  output: {
    path: path.resolve(__dirname, "client/static"),
    filename: "bundle.js"
  },
  resolve: {
    alias: {
      "~": path.resolve(__dirname)
    },
    extensions: ["*", ".js", ".jsx"]
  },
  plugins: [
    new ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    }),
    new MiniCssExtractPlugin({
      filename: "bundle.css"
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: { presets: ["@babel/env", "@babel/preset-react"] }
      },
      {
        test: /\.(sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              plugins: [autoprefixer, cssnano]
            }
          },
          "sass-loader"
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "images",
              publicPath: "/static/images/"
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "fonts",
              publicPath: "/static/fonts/"
            }
          }
        ]
      }
    ]
  }
};
