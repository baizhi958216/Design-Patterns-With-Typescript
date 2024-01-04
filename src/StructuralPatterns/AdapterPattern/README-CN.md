# 适配器模式

将一个类的接口转换成客户希望的另一个接口，适配器模式让那些接口不兼容的类可以一起工作。

意思是引入一个称为`适配器`的角色来协调存在不兼容的结构，这种设计方案即为适配器模式。

适配器模式有`对象适配器模式`和`类适配器模式`，对象适配器模式中，适配器与适配者之间是关联关系，类适配器模式则是继承。

因此，适配器模式有 3 个角色：`目标抽象类`，`适配器类`，`适配者类`。

假设以往的产品已经开发过控制灯光闪烁和声音提示的程序，现在要开发一款玩具汽车，玩具汽车在移动过程中可以有灯光闪烁和声音提示，重用先前的代码并且使汽车控制软件具有更好的灵活性和 扩展性。

1. 新建汽车抽象类，充当目标抽象类：

```ts
export abstract class CarController {
  move(): void {
    console.log("玩具汽车移动！");
  }

  abstract phonate(): void; // 发出声音
  abstract twinkle(): void; // 灯光闪烁
}
```

2.1. 新建警笛类，充当适配者类：

```ts
export class PoliceSound {
  alarmSound(): void {
    console.log("发出警笛声音！");
  }
}
```

2.2. 新建警灯类，充当适配者：

```ts
export class PoliceLamp {
  alarmLamp(): void {
    console.log("呈现警灯闪烁！");
  }
}
```

3. 新建警车适配器，充当适配器：

```ts
import { CarController } from "./CarController";
import { PoliceLamp } from "./PoliceLamp";
import { PoliceSound } from "./PoliceSound";

export class PoliceCarAdapter extends CarController {
  #sound: PoliceSound;
  #lamp: PoliceLamp;

  constructor() {
    super();
    this.#sound = new PoliceSound();
    this.#lamp = new PoliceLamp();
  }

  phonate(): void {
    this.#sound.alarmSound();
  }
  twinkle(): void {
    this.#lamp.alarmLamp();
  }
}
```

4. 编写测试方法：

```ts
import { CarController } from "./CarController";
import { PoliceCarAdapter } from "./PoliceCarAdapter";

export const AdapterPatternClient = () => {
  const car: CarController = new PoliceCarAdapter();
  car.move();
  car.phonate();
  car.twinkle();
};
```

因为 TypeScript 语言本身不支持多重继承，因此只能通过对象适配器来实现本例，而不能使用类适配器。

除适配器模式之外，还有它的变体`缺省适配器模式`和对象适配器的`双向适配器`。
