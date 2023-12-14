import { Button } from "./Button.interface";

export class SummerButton implements Button {
  display(): void {
    console.log("夏季风格按钮！");
  }
}
