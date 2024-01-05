import { ImageImp } from "./ImageImp";
import { Matrix } from "./Matrix";

export class WindowsImp implements ImageImp {
  doPaint(m: Matrix): void {
    console.log("在Windows操作系统中显示图像：");
  }
}
