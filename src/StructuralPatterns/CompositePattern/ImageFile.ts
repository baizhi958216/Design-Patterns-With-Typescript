import { AbstractFile } from "./AbstractFile";

export class ImageFile extends AbstractFile {
  #name: string;
  constructor(name: string) {
    super();
    this.#name = name;
  }
  add(file: AbstractFile): void {
    console.log("对不起，不支持该方法！");
  }
  remove(file: AbstractFile): void {
    console.log("对不起，不支持该方法!");
  }
  getChild(i: number): null {
    console.log("对不起，不支持该方法!");
    return null;
  }
  killVirus(): void {
    console.log(`对图像文件：${this.#name} 杀毒成功`);
  }
}
