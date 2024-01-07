import { readFileSync } from "fs";

export class FileReader {
  readFile(fileNameSrc: string): string {
    console.log("读取文件，获取明文：");
    try {
      const content = readFileSync(fileNameSrc, "utf-8");
      console.log(content);
      return content;
    } catch (error) {
      console.log("文件操作错误！");
      return "文件操作错误！";
    }
  }
}
