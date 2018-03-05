const chalk = require("chalk");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const path = require("path");
const { appAliases, appPaths, publicPath } = require("./utils");

// Force production environment here
process.env.NODE_ENV = "production";
const extractSass = new ExtractTextPlugin({
  filename: "[name].[contenthash].css",
  disable: process.env.NODE_ENV === "development",
});

console.log(
  chalk.green(
    `\nBuilding production bundle. Environment: ${process.env.NODE_ENV}\n`,
  ),
);

module.exports = {
  devtool: "source-map",
  entry: ["babel-polyfill", path.resolve(__dirname, "../client/index.js")],
  output: {
    publicPath,
    path: path.resolve(__dirname, "../dist/assets"),
    filename: "bundle.[hash].js",
  },
  plugins: [
    extractSass,
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new HtmlWebpackPlugin({
      title: "AXA Pay",
      template: path.resolve(__dirname, "../config/index.template.html"),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyURLs: true,
      },
    }),
  ],
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: "babel-loader",
            options: {
              presets: ["env", "react"],
              plugins: [
                "transform-class-properties",
                "transform-object-rest-spread",
              ],
            },
          },
          {
            test: /\.(scss|css)$/,
            use: extractSass.extract({
              use: [
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
              fallback: "style-loader",
            }),
          },
          {
            test: /\.(png|jpg|svg)$/,
            loader: "url-loader",
            options: {
              limit: 10000,
            },
          },
          {
            loader: "file-loader",
            exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/, /\.(scss|css)$/],
            options: {
              name: "[name].[hash:8].[ext]",
              publicPath,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    alias: appAliases,
    extensions: [".js", ".jsx", ".scss", ".png"],
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
