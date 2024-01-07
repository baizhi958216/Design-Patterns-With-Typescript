import { Component } from "./Component";
import { ComponentDecorator } from "./ComponentDecorator";

export class BlackBorderDecorator extends ComponentDecorator {
  constructor(component: Component) {
    super(component);
  }

  setBlackBorder(): void {
    console.log("为构件增加黑色边框！");
  }

  display(): void {
    this.setBlackBorder();
    super.display();
  }
}
