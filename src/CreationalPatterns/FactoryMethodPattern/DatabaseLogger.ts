import { Logger } from "./Logger.interface";

export class DatabaseLogger implements Logger {
  writeLog(): void {
    console.log("数据库日志记录器。");
  }
}
