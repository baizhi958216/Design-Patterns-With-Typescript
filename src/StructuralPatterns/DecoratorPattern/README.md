# Decorator Pattern

The decorator pattern involves placing an object into a special wrapping class that contains a certain behavior, thereby adding new behavior to the original object without modifying the code of the original class.

It dynamically adds some extra responsibilities to an object. In terms of extending functionality, the decorator pattern provides a more flexible alternative to using subclasses.

Therefore, the decorator pattern consists of four roles: `Abstract Component`, `Concrete Component`, `Abstract Decorator`, and `Concrete Decorator`.

Now, let's develop a UI component library that includes some basic components (such as windows, text boxes, list boxes, etc.), allowing users to customize the style of components when using them.

1. Create an abstract interface component class, acting as the Abstract Component:

```typescript
export abstract class Component {
  abstract display(): void;
}
```

2.1. Create a window class, acting as the Concrete Component:

```typescript
import { Component } from "./Component";

export class Window extends Component {
  display(): void {
    console.log("Displaying window!");
  }
}
```

2.2. Create a text box class, acting as the Concrete Component:

```typescript
import { Component } from "./Component";

export class TextBox extends Component {
  display(): void {
    console.log("Displaying text box!");
  }
}
```

2.3. Create a list box class, acting as the Concrete Component:

```typescript
import { Component } from "./Component";

export class ListBox extends Component {
  display(): void {
    console.log("Displaying list box!");
  }
}
```

3. Create a component decorator class, acting as the Abstract Decorator:

```typescript
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

4.1. Create a scroll bar decorator class, acting as the Concrete Decorator:

```typescript
import { Component } from "./Component";
import { ComponentDecorator } from "./ComponentDecorator";

export class ScrollBarDecorator extends ComponentDecorator {
  constructor(component: Component) {
    super(component);
  }

  setScrollBar(): void {
    console.log("Adding scroll bar to the component!");
  }

  display(): void {
    this.setScrollBar();
    super.display();
  }
}
```

4.2. Create a black border decorator class, acting as the Concrete Decorator:

```typescript
import { Component } from "./Component";
import { ComponentDecorator } from "./ComponentDecorator";

export class BlackBorderDecorator extends ComponentDecorator {
  constructor(component: Component) {
    super(component);
  }

  setBlackBorder(): void {
    console.log("Adding black border to the component!");
  }

  display(): void {
    this.setBlackBorder();
    super.display();
  }
}
```

5. Write a client test method:

```typescript
import { BlackBorderDecorator } from "./BlackBorderDecorator";
import { Component } from "./Component";
import { ScrollBarDecorator } from "./ScrollBarDecorator";
import { Window } from "./Window";

export const DecoratorPatternClient = () => {
  const component: Component = new Window();
  const componentSB: Component = new ScrollBarDecorator(component);

  componentSB.display();

  console.log("\n");

  // Create a window with both black border and scroll bar
  const componentBB: Component = new BlackBorderDecorator(componentSB);
  componentBB.display();
};
```
