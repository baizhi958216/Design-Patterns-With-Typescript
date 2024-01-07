import { BlackBorderDecorator } from "./BlackBorderDecorator";
import { Component } from "./Component";
import { ScrollBarDecorator } from "./ScrollBarDecorator";
import { Window } from "./Window";

export const DecoratorPatternClient = () => {
  const component: Component = new Window();
  const componentSB: Component = new ScrollBarDecorator(component);

  componentSB.display();

  console.log("\n");

  //  构件一个有黑色边框又有滚动条的窗口
  const componentBB: Component = new BlackBorderDecorator(componentSB);
  componentBB.display();
};
