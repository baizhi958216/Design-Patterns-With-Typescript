import { Matrix } from "./Matrix";
import { Image } from "./Image";

export class BMPImage extends Image {
  parseFile(fileName: string): void {
    const m = new Matrix();
    this.imp.doPaint(m);
    console.log(`${fileName}, 格式为BMP`);
  }
}
