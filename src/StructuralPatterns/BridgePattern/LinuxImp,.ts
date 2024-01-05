import { ImageImp } from "./ImageImp";
import { Matrix } from "./Matrix";

export class LinuxImp implements ImageImp {
  doPaint(m: Matrix): void {
    console.log("在Linux操作系统中显示图像：");
  }
}
