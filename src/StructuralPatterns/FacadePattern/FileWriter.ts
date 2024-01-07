import { writeFileSync } from "fs";

export class FileWriter {
  write(encryptStr: string, fileNameDes: string): void {
    console.log("保存密文，写入文件。");
    try {
      writeFileSync(fileNameDes, encryptStr);
    } catch (error) {
      console.log("文件操作错误！");
    }
  }
}
