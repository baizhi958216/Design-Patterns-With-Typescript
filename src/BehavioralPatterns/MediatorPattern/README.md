# Mediator Pattern

The Mediator Pattern defines an object to encapsulate a series of object interactions. It allows objects to interact without needing to explicitly reference each other, thus making their coupling loose, and users can independently change their interactions.

The Mediator Pattern introduces a mediator class to handle all communication between different classes.

Therefore, the Mediator Pattern consists of four roles: `Abstract Mediator`, `Concrete Mediator`, `Abstract Colleague`, and `Concrete Colleague`.

Now, there is a need to add functionality for adding/deleting customers to the customer information management window. The addition and deletion of customers will simultaneously affect both the dropdown menu and the selection combo box.

1. Create an abstract mediator class:

```ts
import { Component } from "./Component";

export abstract class Mediator {
  abstract componentChanged(component: Component): void;
}
```

2. Create an abstract component class, acting as the abstract colleague:

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

3.1 Create a button class, acting as a concrete colleague:

```ts
import { Component } from "./Component";

export class Button extends Component {
  update(): void {}
}
```

3.2 Create a list box class, acting as a concrete colleague:

```ts
import { Component } from "./Component";

export class List extends Component {
  update(): void {
    console.log("List box added an item: Zhang Wuji");
  }

  select(): void {
    console.log("List box selected item: Xiao Longnv");
  }
}
```

3.3 Create a combo box class, acting as a concrete colleague:

```ts
import { Component } from "./Component";

export class ComboBox extends Component {
  update(): void {
    console.log("Combo box added an item: Zhang Wuji");
  }

  select(): void {
    console.log("Combo box selected item: Xiao Longnv");
  }
}
```

3.4 Create a text box class, acting as a concrete colleague:

```ts
import { Component } from "./Component";

export class TextBox extends Component {
  update(): void {
    console.log("After customer information added, text box cleared");
  }

  setText(): void {
    console.log("Text box displays: Xiao Longnv");
  }
}
```

4. Create a concrete mediator class:

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

  // Encapsulate interactions between colleague objects
  componentChanged(c: Component): void {
    // Click on the add button
    if (c == this.addButton) {
      console.log("--Click on the add button--");
      this.list.update();
      this.cb.update();
      this.userNameTextBox.update();
    }
    // Select a customer from the list box
    else if (c == this.list) {
      console.log("--Select a customer from the list box--");
      this.cb.select();
      this.userNameTextBox.setText();
    }
    // Select a customer from the combo box
    else if (c == this.cb) {
      console.log("--Select a customer from the combo box--");
      this.list.select();
      this.userNameTextBox.setText();
    }
  }
}
```

5. Create a test function:

```ts
import { Button } from "./Button";
import { ComboBox } from "./ComboBox";
import { ConcreteMediator } from "./ConcreteMediator";
import { List } from "./List";
import { TextBox } from "./TextBox";

export const MediatorPattern = () => {
  // Define the mediator object
  const mediator: ConcreteMediator = new ConcreteMediator();

  // Define colleague objects
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
