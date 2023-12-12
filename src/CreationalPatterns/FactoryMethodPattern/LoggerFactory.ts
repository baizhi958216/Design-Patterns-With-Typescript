import { Logger } from "./Logger.interface";

export interface LoggerFactory {
  createLogger(): Logger;
}
