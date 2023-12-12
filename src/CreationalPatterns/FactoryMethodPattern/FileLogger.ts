import { Logger } from "./Logger.interface";

export class FileLogger implements Logger {
  writeLog(): void {
    console.log("文件日志记录器。");
  }
}
