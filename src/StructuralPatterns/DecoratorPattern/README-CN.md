# 装饰模式

将对象放入包含某种行为的特殊封装类中，为原始对象添加新的行为，而无需修改原始类的代码。

动态地给一个对象增加一些额外的职责。就扩展功能而言，装饰模式提供了一种比使用子类更加灵活的替代方案。

因此，装饰模式有 4 个角色：`抽象构件`，`具体构件`，`抽象装饰类`，`具体装饰类`。

现在要开发一套 UI 组件库，内置一些基本的组件(窗体、文本框、列表框等)，用户在使用的时候可以对组件的样式等进行定制。

1. 新建抽象界面构件类，充当抽象构件类：

```ts
export abstract class Component {
  abstract display(): void;
}
```

2.1. 新建窗体类，充当具体构件类：

```ts
import { Component } from "./Component";

export class Window extends Component {
  display(): void {
    console.log("显示窗体！");
  }
}
```

2.2. 新建文本框类，充当具体构件类：

```ts
import { Component } from "./Component";

export class TextBox extends Component {
  display(): void {
    console.log("显示文本框！");
  }
}
```

2.3. 新建列表框类，充当具体构件类：

```ts
import { Component } from "./Component";

export class ListBox extends Component {
  display(): void {
    console.log("显示列表框！");
  }
}
```

3. 新建构件装饰类，充当抽象装饰类：

```ts
import { Component } from "./Component";

export class ComponentDecorator extends Component {
  #component: Component;

  constructor(component: Component) {
    super();
    this.#component = component;
  }

  display(): void {
    this.#component.display();
  }
}
```

4.1. 新建滚动条装饰类，充当具体装饰类：

```ts
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
```

4.2. 新建黑色边框装饰类，充当具体装饰类：

```ts
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
```

5. 编写客户端测试方法：

```ts
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
```
