import { ImageImp } from "./ImageImp";
import { Matrix } from "./Matrix";

export class MacImp implements ImageImp {
  doPaint(m: Matrix): void {
    console.log("在Mac操作系统中显示图像：");
  }
}
