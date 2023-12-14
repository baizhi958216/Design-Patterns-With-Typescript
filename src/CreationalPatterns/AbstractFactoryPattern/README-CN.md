# 抽象工厂模式

提供一个创建一系列相关或相互依赖对象的接口，而无需指定他们具体的类。

产品等级结构：即产品的继承结构，例如一个抽象类是电视机，它的子类有创维电视机、小米电视机等，则抽象电视机与具体品牌的电视机之间构成了一个产品等级结构，抽象电视机是父类，而具体品牌的电视机是子类。

产品族：产品族是在抽象工厂模式中同一个工厂生产的位于不同产品等级结构中的一组产品，例如小米工厂生产的小米电视、小米手机、小米电脑，小米电视位于电视机产品等级结构中，小米手机位于手机产品等级结构中，小米电视和小米手机构成一个产品族。

工厂方法模式针对一个产品等级结构，而抽象工厂模式面对的是多个产品等级结构。在抽象工厂模式中，每一个具体工厂都提供了多个工厂方法用于产生多种不同类型的产品，这些产品构成一个产品族。

因此，抽象工厂模式有 4 个角色：`抽象工厂`，`具体工厂`，`抽象产品`，`具体产品`。

假设某软件公司要开发一套界面皮肤库，可以对 UI 进行美化。用户在使用时可以通过菜单来选择皮肤，不同的皮肤将提供视觉效果不同的按钮、文本框、组合框等界面元素，例如春天(Spring)风格的皮肤将提供浅绿色的按钮、绿色边框的文本框和绿色边框的组合框，而夏天(Summer)风格的皮肤则提供浅蓝色的按钮、蓝色边框的文本框和蓝色边框的组合框。

1. 定义按钮、文本框、组合框接口，充当抽象产品：

```ts
// 按钮接口
export interface Button {
  display(): void;
}

// 文本框接口
export interface TextField {
  display(): void;
}

// 组合框接口
export interface ComboBox {
  display(): void;
}
```

2. 定义春季和夏季风格的按钮、文本框、组合框类，充当具体产品：

```ts
import { Button } from "./Button.interface";
import { ComboBox } from "./ComboBox.interface";
import { TextField } from "./TextField.interface";

// 春季风格按钮
export class SpringButton implements Button {
  display(): void {
    console.log("春季风格按钮！");
  }
}

// 夏季风格按钮
export class SummerButton implements Button {
  display(): void {
    console.log("夏季风格按钮！");
  }
}

// 春季风格文本框
export class SpringTextBox implements TextBox {
  display(): void {
    console.log("春季风格文本框！");
  }
}

// 夏季风格文本框
export class SummerTextField implements TextBox {
  display(): void {
    console.log("夏季风格文本框！");
  }
}

// 春季风格组合框
export class SpringComboField implements ComboBox {
  display(): void {
    console.log("春季风格组合框！");
  }
}

// 夏季风格组合框
export class SummerComboBox implements ComboBox {
  display(): void {
    console.log("夏季风格组合框！");
  }
}
```

3. 构建界面皮肤工厂接口，充当抽象工厂：

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

4. 构建春季皮肤工厂接口，充当具体工厂：

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

5. 构建夏季皮肤工厂接口，充当具体工厂：

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

6. 编写客户端测试方法：

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
