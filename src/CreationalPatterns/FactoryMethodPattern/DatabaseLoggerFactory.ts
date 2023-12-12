import { DatabaseLogger } from "./DatabaseLogger";
import { Logger } from "./Logger.interface";
import { LoggerFactory } from "./LoggerFactory";

export class DatabaseLoggerFactory implements LoggerFactory {
  createLogger(): Logger {
    const databaseLogger = new DatabaseLogger();
    return databaseLogger;
  }
}
