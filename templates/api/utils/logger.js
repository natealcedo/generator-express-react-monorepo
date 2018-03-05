import winston from "winston";

const logger = winston;

logger.stream = {
  write: message => logger.info(message),
};

export default logger;
