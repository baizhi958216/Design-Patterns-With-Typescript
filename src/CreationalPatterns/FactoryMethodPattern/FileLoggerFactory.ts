import { FileLogger } from "./FileLogger";
import { Logger } from "./Logger.interface";
import { LoggerFactory } from "./LoggerFactory";

export class FileLoggerFactory implements LoggerFactory {
  createLogger(): Logger {
    const fileLogger = new FileLogger();
    return fileLogger;
  }
}
