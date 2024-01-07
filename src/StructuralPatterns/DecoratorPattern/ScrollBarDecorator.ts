import { Component } from "./Component";
import { ComponentDecorator } from "./ComponentDecorator";

export class ScrollBarDecorator extends ComponentDecorator {
  constructor(component: Component) {
    super(component);
  }

  setScrollBar(): void {
    console.log("为构件增加滚动条！");
  }

  display(): void {
    this.setScrollBar();
    super.display();
  }
}
