#!/usr/bin/env node

const Spinner = require("cli-spinner").Spinner;
const chalk = require("chalk");
const childProcess = require("child_process");
const path = require("path");
const webpackConfig = require("../config/webpack.config.production");
const { promisify } = require("util");

const webpack = promisify(require("webpack"));

const exec = promisify(childProcess.exec);
const { execSync } = childProcess;

// Force production build here
process.env.NODE_ENV = "production";
const spinner = new Spinner(chalk.green("Processing ..."));

console.log(chalk.cyan("Build process is starting.\n"));
spinner.start();

// Removing dist folder
execSync("rm -rf dist");

// Note:
// Using childProcess.exec here due to babel not having a nice node api to work
// with
exec(
  `${path.resolve(
    __dirname,
    "../node_modules/babel-cli/bin/babel.js",
  )} ${path.resolve(__dirname, "../api")} --out-dir ${path.resolve(
    __dirname,
    "../dist",
  )}
  `,
)
  .then(() => {
    spinner.stop();
    spinner.start();
    return webpack(webpackConfig);
  })
  .then(stats => {
    const newStats = stats.toJson({
      stats: false,
      hash: true,
    });
    const assets = newStats.assets.map(asset => asset.name);
    spinner.stop();

    console.log();
    assets.forEach(name => console.log(chalk.blue(name)));
    console.log(
      chalk.green(`\nBuild Successful. Time taken: ${newStats.time}ms \n`),
    );
  });

process.on("uncaughtException", err => {
  console.log(chalk.red("The build step faced an error. Check the logs!"));
  console.error(chalk.red(err));
  process.exit(1);
});

process.on("unhandledRejection", err => {
  console.log(chalk.red("The build step faced an error. Check the logs!"));
  console.error(chalk.red(err));
  process.exit(1);
});
