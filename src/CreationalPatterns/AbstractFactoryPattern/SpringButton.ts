import { Button } from "./Button.interface";

export class SpringButton implements Button {
  display(): void {
    console.log("春季风格按钮！");
  }
}
