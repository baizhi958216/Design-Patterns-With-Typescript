import { TextField } from "./TextField.interface";

export class SummerTextField implements TextField {
  display(): void {
    console.log("夏季风格输入框！");
  }
}
