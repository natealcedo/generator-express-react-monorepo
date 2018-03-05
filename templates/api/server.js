import cookieParser from "cookie-parser";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackDevelopmentConfig from "../config/webpack.config.development";
import webpackHotMiddleware from "webpack-hot-middleware";
import { api } from "./routers";
import { logger } from "./utils";

const compiler = webpack(webpackDevelopmentConfig);

const app = express();

app.use(helmet());
app.use(morgan("tiny", { stream: logger.stream }));
app.use(cookieParser());
app.use(express.json());

app.use("/api", api);

// Declaring this last so that any other routes are used by react router
if (process.env.NODE_ENV !== "production") {
  logger.info("Payment Application running in development");
  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: webpackDevelopmentConfig.output.publicPath,
      stats: "minimal",
    }),
  );
  app.use(webpackHotMiddleware(compiler));
  app.use("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/index.html"));
  });
} else {
  app.use("/assets", express.static(path.resolve(__dirname, "./assets")));
  app.use("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./assets/index.html"));
  });
}

export default app;
