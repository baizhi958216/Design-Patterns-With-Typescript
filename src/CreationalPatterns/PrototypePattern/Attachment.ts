export class Attachment {
  name: string | undefined;

  setName(name: string) {
    this.name = name;
  }

  getName() {
    return this.name;
  }

  download() {
    console.log("下载附件，文件名为" + this.name);
  }
}
