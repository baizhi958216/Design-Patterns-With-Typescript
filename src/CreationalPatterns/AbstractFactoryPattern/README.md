# Abstract Factory Pattern

The abstract factory pattern provides an interface for creating a series of related or dependent objects without specifying their concrete classes.

Product hierarchy: This refers to the inheritance structure of products. For example, if an abstract class is a television, and its subclasses are Skyworth TV, Xiaomi TV, etc., then the abstract television and specific brand TVs form a product hierarchy. The abstract television is the parent class, while specific brand TVs are the subclasses.

Product family: A product family is a group of products produced by the same factory in the abstract factory pattern, located in different product hierarchies. For example, a Xiaomi factory produces Xiaomi TVs, Xiaomi phones, and Xiaomi computers. Xiaomi TV belongs to the television product hierarchy, Xiaomi phone belongs to the phone product hierarchy, and Xiaomi TV and Xiaomi phone together form a product family.

The factory method pattern is applicable to a single product hierarchy, while the abstract factory pattern deals with multiple product hierarchies. In the abstract factory pattern, each concrete factory provides multiple factory methods to generate various types of products, and these products together constitute a product family.

Therefore, the abstract factory pattern involves four roles: `Abstract Factory`, `Concrete Factory`, `Abstract Product`, and `Concrete Product`.

Assuming a software company is developing a set of interface skin libraries for enhancing the UI. Users can choose skins through a menu, and each skin will offer different visual effects for buttons, text boxes, combo boxes, and other interface elements. For instance, a "Spring" style skin might provide light green buttons, text boxes with green borders, and combo boxes with green borders. On the other hand, a "Summer" style skin could offer light blue buttons, text boxes with blue borders, and combo boxes with blue borders.

1. Define button, text field, and combo box interfaces as abstract products:

```ts
// Button interface
export interface Button {
  display(): void;
}

// Text field interface
export interface TextField {
  display(): void;
}

// Combo box interface
export interface ComboBox {
  display(): void;
}
```

2. Define classes for spring and summer styles of buttons, text fields, and combo boxes as concrete products:

```ts
import { Button } from "./Button.interface";
import { ComboBox } from "./ComboBox.interface";
import { TextField } from "./TextField.interface";

// Spring style button
export class SpringButton implements Button {
  display(): void {
    console.log("Spring style button!");
  }
}

// Summer style button
export class SummerButton implements Button {
  display(): void {
    console.log("Summer style button!");
  }
}

// Spring style text field
export class SpringTextField implements TextField {
  display(): void {
    console.log("Spring style text field!");
  }
}

// Summer style text field
export class SummerTextField implements TextField {
  display(): void {
    console.log("Summer style text field!");
  }
}

// Spring style combo box
export class SpringComboBox implements ComboBox {
  display(): void {
    console.log("Spring style combo box!");
  }
}

// Summer style combo box
export class SummerComboBox implements ComboBox {
  display(): void {
    console.log("Summer style combo box!");
  }
}
```

3. Build an interface for the skin factory to act as an abstract factory:

```ts
import { Button } from "./Button.interface";
import { ComboBox } from "./ComboBox.interface";
import { TextField } from "./TextField.interface";

export interface SkinFactory {
  createButton(): Button;
  createTextField(): TextField;
  createComboBox(): ComboBox;
}
```

4. Build an interface for the spring skin factory to act as a concrete factory:

```ts
import { Button } from "./Button.interface";
import { ComboBox } from "./ComboBox.interface";
import { SkinFactory } from "./SkinFactory.interface";
import { SpringButton } from "./SpringButton";
import { SpringComboBox } from "./SpringComboBox";
import { SpringTextField } from "./SpringTextField";
import { TextField } from "./TextField.interface";

export class SpringSkinFactory implements SkinFactory {
  createButton(): Button {
    return new SpringButton();
  }

  createTextField(): TextField {
    return new SpringTextField();
  }

  createComboBox(): ComboBox {
    return new SpringComboBox();
  }
}
```

5. Build an interface for the summer skin factory to act as a concrete factory:

```ts
import { Button } from "./Button.interface";
import { ComboBox } from "./ComboBox.interface";
import { SkinFactory } from "./SkinFactory.interface";
import { SummerButton } from "./SummerButton";
import { SummerComboBox } from "./SummerComboBox";
import { SummerTextField } from "./SummerTextField";
import { TextField } from "./TextField.interface";

export class SummerSkinFactory implements SkinFactory {
  createButton(): Button {
    return new SummerButton();
  }

  createTextField(): TextField {
    return new SummerTextField();
  }

  createComboBox(): ComboBox {
    return new SummerComboBox();
  }
}
```

6. Write a client test method:

```ts
import { Button } from "./Button.interface";
import { ComboBox } from "./ComboBox.interface";
import { SkinFactory } from "./SkinFactory.interface";
import { SpringSkinFactory } from "./SpringSkinFactory";
import { TextField } from "./TextField.interface";

export const AbstractFactoryPatternClient = () => {
  const skinFactory: SkinFactory = new SpringSkinFactory();
  const button: Button = skinFactory.createButton();
  const fieldBox: TextField = skinFactory.createTextField();
  const comboBox: ComboBox = skinFactory.createComboBox();
  button.display();
  fieldBox.display();
  comboBox.display();
};
```
