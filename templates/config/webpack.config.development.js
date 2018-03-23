const webpack = require("webpack");
const path = require("path");
const { appAliases, appPaths, publicPath } = require("./utils");

module.exports = {
  devtool: "inline-source-map",
  mode: "development",
  entry: [
    "babel-polyfill",
    "webpack-hot-middleware/client",
    path.resolve(__dirname, "../client"),
  ],
  output: {
    publicPath,
    filename: "bundle.js",
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: [
              {
                loader: "babel-loader",
                options: {
                  presets: ["env", "react", "react-hmre"],
                  plugins: [
                    "rewire",
                    "transform-class-properties",
                    "transform-object-rest-spread",
                  ],
                },
              },
              {
                loader: "eslint-loader",
              },
            ],
          },
          {
            test: /\.(css|scss)$/,
            use: [
              {
                loader: "style-loader",
              },
              {
                loader: "css-loader",
              },
              {
                loader: "postcss-loader",
                options: {
                  config: {
                    path: path.resolve(__dirname, "../config/postcss.config"),
                  },
                },
              },
              {
                loader: "sass-loader",
              },
            ],
          },
          {
            loader: "file-loader",
            exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/, /\.(scss|css)$/],
          },
        ],
      },
    ],
  },
  resolve: {
    alias: appAliases,
    extensions: [".js", ".jsx", ".scss", ".json"],
    modules: [
      /*
       * Note:
       * The following is to be able to do relative imports from directories
       * within the client folder. Using glob here to list the directory names
       * and filter out javascript files and html files
       */
      "node_modules",
      ...appPaths,
    ],
  },
};
