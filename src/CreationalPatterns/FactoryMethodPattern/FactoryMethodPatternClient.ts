import { DatabaseLoggerFactory } from "./DatabaseLoggerFactory";
import { Logger } from "./Logger.interface";
import { LoggerFactory } from "./LoggerFactory";

export const FactoryMethodPatternClient = () => {
  let factory: LoggerFactory;
  let logger: Logger;
  factory = new DatabaseLoggerFactory();
  logger = factory.createLogger();
  logger.writeLog();
};
