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
  entry: [
    "./artreart/static_src/index.js",
    "./home/static_src/index.js",
    "./events/static_src/index.js",
    "./artists/static_src/index.js",
    "./about/static_src/index.js"
  ],
  output: {
    path: path.resolve(__dirname, "artreart/static"),
    filename: "bundle.js"
  },
  resolve: {
    alias: {
      "~": path.resolve(__dirname)
    }
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
              outputPath: "images"
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
              outputPath: "fonts"
            }
          }
        ]
      }
    ]
  }
};
