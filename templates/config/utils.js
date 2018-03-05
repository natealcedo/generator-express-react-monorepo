const glob = require("glob");
const path = require("path");

/**
 * Note to developer: This appPaths retrieves the first layer of directories and
 * files in the client folder. Its purpose is for relative module resolution in
 * The following example will work from any files in the client directory and
 * webpack will be able to do the path resolution
 *
 * @sample
 * [
 *  '/Users/nate/payment-application/client/actions',
 *  '/Users/nate/payment-application/client/components',
 *  '/Users/nate/payment-application/client/containers',
 *  '/Users/nate/payment-application/client/higherOrderComponents',
 *  '/Users/nate/payment-application/client/media',
 *  '/Users/nate/payment-application/client/reducers'
 * ]
 *
 * Doing a filter to filter out files and only return directories
 *
 */
const appPaths = glob
  .sync(`${path.resolve(__dirname, "../client")}/*`)
  .filter(name => !name.includes(".js") && !name.includes(".html"));

/**
 * Aliases for easier module resolution in the front end
 *
 * @sample
 *
 * import scssFile from "../../../client/media/scss/scssFile" becomes
 * import scssFile from "scss/scssFile"
 */
const appAliases = {
  fonts: path.resolve(__dirname, "../client/media/fonts"),
  images: path.resolve(__dirname, "../client/media/images"),
  scss: path.resolve(__dirname, "../client/media/scss"),
};

/**
 * This is for use in modules resolution in .eslintrc.js
 *
 * This is being used to resolve the media folder. The reason for this is
 * so that when files are being imported in the client side, they will be
 * resolved correctly and they won't throw an eslint error
 * "Unable to resolve path to module (import/no-resolved)"
 *
 */
const mediaPath = path.resolve(__dirname, "../client/media");

/**
 * Used by webpack to to place the produced files in the correct location which
 * is in this case the assets folder
 */
const publicPath = "/assets/";

module.exports = {
  appAliases,
  appPaths,
  mediaPath,
  publicPath,
};
