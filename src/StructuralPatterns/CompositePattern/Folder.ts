import { AbstractFile } from "./AbstractFile";

export class Folder extends AbstractFile {
  #name: string;
  #fileList: AbstractFile[] = [];
  constructor(name: string) {
    super();
    this.#name = name;
  }
  add(file: AbstractFile): void {
    this.#fileList.push(file);
  }
  remove(file: AbstractFile): void {
    const index = this.#fileList.indexOf(file);
    if (index > -1) {
      this.#fileList.splice(index, 1);
    }
  }
  getChild(i: number): AbstractFile {
    return this.#fileList[i];
  }
  killVirus(): void {
    console.log(`\n***对文件夹${this.#name}进行杀毒***`);

    // 递归调用成员构件的killVirus方法
    for (const file of this.#fileList) {
      file.killVirus();
    }
  }
}
