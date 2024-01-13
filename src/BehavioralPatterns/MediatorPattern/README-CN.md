# 中介者模式

定义一个对象来封装一系列对象的交互。中介者模式使各对象之间不需要显式地相互引用，从而使其耦合松散，而且用户可以独立地改变它们之间的交互。

中介者模式引入一个中介者类处理不同类之间的所有通信。

因此，中介者模式有 4 个角色：`抽象中介者`，`具体中介者`，`抽象同事类`，`具体同事类`

现需要对客户信息管理窗口新增客户新增/删除功能，客户的增加和删除会同时对下拉菜单和选择组合框造成影响。

1. 新建抽象中介者类：

```ts
import { Component } from "./Component";

export abstract class Mediator {
  abstract componentChanged(component: Component): void;
}
```

2. 新建抽象组件类，充当抽象同事类：

```ts
import { Mediator } from "./Mediator";

export abstract class Component {
  protected mediator: Mediator | undefined;

  setMediator(mediator: Mediator) {
    this.mediator = mediator;
  }

  changed(): void {
    if (this.mediator) {
      this.mediator.componentChanged(this);
    }
  }

  abstract update(): void;
}
```

3.1 新建按钮类，充当具体同事类：

```ts
import { Component } from "./Component";

export class Button extends Component {
  update(): void {}
}
```

3.2 列表框类，充当具体同事类：

```ts
import { Component } from "./Component";

export class List extends Component {
  update(): void {
    console.log("列表框增加一项：张无忌");
  }

  select(): void {
    console.log("列表框选中项：小龙女");
  }
}
```

3.3 新建组合框类。充当具体同事类：

```ts
import { Component } from "./Component";

export class ComboBox extends Component {
  update(): void {
    console.log("组合框增加一项：张无忌");
  }

  select(): void {
    console.log("组合框选中项：小龙女");
  }
}
```

3.4 新建文本框类，充当具体同事类：

```ts
import { Component } from "./Component";

export class TextBox extends Component {
  update(): void {
    console.log("客户信息增加成功后文本框清空");
  }

  setText(): void {
    console.log("文本框显示：小龙女");
  }
}
```

4. 新建具体中介者类：

```ts
import { Button } from "./Button";
import { ComboBox } from "./ComboBox";
import { Component } from "./Component";
import { List } from "./List";
import { Mediator } from "./Mediator";
import { TextBox } from "./TextBox";

export class ConcreteMediator extends Mediator {
  addButton: Button;
  list: List;
  userNameTextBox: TextBox;
  cb: ComboBox;

  constructor() {
    super();
    this.addButton = new Button();
    this.list = new List();
    this.userNameTextBox = new TextBox();
    this.cb = new ComboBox();
  }

  // 封装同事对象之间的交互
  componentChanged(c: Component): void {
    // 单击按钮
    if (c == this.addButton) {
      console.log("--单机增加按钮--");
      this.list.update();
      this.cb.update();
      this.userNameTextBox.update();
    }
    // 从列表框选择客户
    else if (c == this.list) {
      console.log("--从列表框选择客户--");
      this.cb.select();
      this.userNameTextBox.setText();
    }
    // 从组合框选择客户
    else if (c == this.cb) {
      console.log("--从组合框选择客户--");
      this.list.select();
      this.userNameTextBox.setText();
    }
  }
}
```

5. 新建测试函数：

```ts
import { Button } from "./Button";
import { ComboBox } from "./ComboBox";
import { ConcreteMediator } from "./ConcreteMediator";
import { List } from "./List";
import { TextBox } from "./TextBox";

export const MediatorPattern = () => {
  // 定义中介者对象
  const mediator: ConcreteMediator = new ConcreteMediator();

  // 定义同事对象
  const addBT: Button = new Button();
  const list: List = new List();
  const cb: ComboBox = new ComboBox();
  const userNameTB: TextBox = new TextBox();

  addBT.setMediator(mediator);
  list.setMediator(mediator);
  cb.setMediator(mediator);
  userNameTB.setMediator(mediator);

  mediator.addButton = addBT;
  mediator.list = list;
  mediator.cb = cb;
  mediator.userNameTextBox = userNameTB;

  addBT.changed();
  console.log("--------------------------------");
  list.changed();
};
```
