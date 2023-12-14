import { TextField } from "./TextField.interface";

export class SpringTextField implements TextField {
  display(): void {
    console.log("春季风格输入框！");
  }
}
