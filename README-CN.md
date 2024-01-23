# Design Patterns With Typescript

参考了 清华大学出版社《Java 设计模式》

23 种设计模式由四人组(Gang of Four/Gof: Erich Gamma、Richard Helm、Ralph Johnson、John Vlissides)在 1994 年 PLoP 归纳发表。

设计模式是在特定环境下为解决某一通用软件设计问题提供的一套定制的解决方案，该方案描述了对象和类之间的相互作用。

## 设计模式一般有两种分类方式:

根据**目的**分类：

1. 创建型（工厂方法模式、抽象工厂模式、建造者模式、原型模式、单例模式）

2. 结构型（适配器模式、桥接模式、组合模式、装饰模式、外观模式、享元模式、代理模式）

3. 行为型（责任链模式、命令模式、解释器模式、迭代器模式、中介者模式、备忘录模式、观察者模式、状态模式、策略模式、模板方法模式、访问者模式）

根据**范围**分类：

1. 类模式（处理类和子类之间的关系，这些关系通过继承建立，在编译时就被确定下来，是一种静态关系）

2. 对象模式（处理对象之间的关系，这些关系在运行时变化，具有动态性）

| 范围/目的 | 创建型模式                                                                   | 结构型模式                                                                 | 行为型模式                                                                       |
| --------- | ---------------------------------------------------------------------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| 类模式    | [工厂方法模式](./src/CreationalPatterns/FactoryMethodPattern/README-CN.md)   | （类）适配器模式                                                           | [解释器模式](./src/BehavioralPatterns/InterpreterPattern/README-CN.md)           |
|           |                                                                              |                                                                            | [模板方法模式](./src/BehavioralPatterns/TemplateMethodPattern/README-CN.md)      |
| 对象模式  | [抽象工厂模式](./src/CreationalPatterns/AbstractFactoryPattern/README-CN.md) | [（对象）适配器模式](./src/StructuralPatterns/AdapterPattern/README-CN.md) | [职责链模式](./src/BehavioralPatterns/ChainofResponsibilityPattern/README-CN.md) |
|           | [建造者模式](./src/CreationalPatterns/BuilderPattern/README-CN.md)           | [桥接模式](./src/StructuralPatterns/BridgePattern/README-CN.md)            | [命令模式](./src/BehavioralPatterns/CommandPattern/README-CN.md)                 |
|           | [原型模式](./src/CreationalPatterns/PrototypePattern/README-CN.md)           | [组合模式](./src/StructuralPatterns/CompositePattern/README-CN.md)         | [迭代器模式](./src/BehavioralPatterns/IteratorPattern/README-CN.md)              |
|           | [单例模式](./src/CreationalPatterns/SingletonPattern/README-CN.md)           | [装饰模式](./src/StructuralPatterns/DecoratorPattern/README-CN.md)         | [中介者模式](./src/BehavioralPatterns/MediatorPattern/README-CN.md)              |
|           |                                                                              | [外观模式](./src/StructuralPatterns/FacadePattern/README-CN.md)            | [备忘录模式](./src/BehavioralPatterns/MementoPattern/README-CN.md)               |
|           |                                                                              | [享元模式](./src/StructuralPatterns/FlyweightPattern/README-CN.md)         | [观察者模式](./src/BehavioralPatterns/ObserverPattern/README-CN.md)              |
|           |                                                                              | [代理模式](./src/StructuralPatterns/ProxyPattern/README-CN.md)             | [状态模式](./src/BehavioralPatterns/StatePattern/README-CN.md)                   |
|           |                                                                              |                                                                            | [策略模式](./src/BehavioralPatterns/StrategyPattern/README-CN.md)                |
|           |                                                                              |                                                                            | [访问者模式](./src/BehavioralPatterns/VisitorPattern/README-CN.md)               |

## 面向对象设计原则

面向对象设计原则是用于评价一个设计模式的使用效果的重要指标之一，每一个设计模式都符合一个或多个面向对象设计原则。

1. 单一责任原则

单一责任原则指的是一个类应该只有一个引起变化的原因。换句话说，一个类应该只负责一种类型的任务，即一个类应该只有一个职责。这有助于提高代码的可维护性和可理解性，因为每个类都专注于特定的功能。

```ts
class FileManager {
  writeToFile(data: string) {}
}

class Logger {
  logMessage(message: string) {}
}
```

2. **开闭原则**

开闭原则规定软件实体（类、模块、函数等）应该对扩展开放，对修改关闭。这意味着在不修改现有代码的情况下，可以通过添加新功能来扩展系统。通过遵循开闭原则，可以降低代码的耦合性，提高系统的稳定性和可维护性。

```ts
abstract class Shape {
  abstract calculateArea(): number;
}

class Circle extends Shape {
  radius: number;

  constructor(radius: number) {
    super();
    this.radius = radius;
  }

  calculateArea(): number {
    return Math.PI * this.radius * this.radius;
  }
}

class Rectangle extends Shape {
  width: number;
  height: number;

  constructor(width: number, height: number) {
    super();
    this.width = width;
    this.height = height;
  }

  calculateArea(): number {
    return this.width * this.height;
  }
}
```

3. **里氏代换原则**

里氏代换原则要求子类型必须能够替换其基类型，而不影响程序的正确性。简而言之，如果一个类是某个抽象类的子类，那么它应该能够替代该抽象类的任何地方，而不引起错误。

```ts
class Bird {
  fly() {
    console.log("起飞");
  }
}

class Penguin extends Bird {
  fly() {
    console.log("企鹅是不能飞的");
  }
}
```

4. **依赖倒转原则**

依赖倒转原则强调高层模块不应该依赖于低层模块，两者都应该依赖于抽象。抽象不应该依赖于细节，细节应该依赖于抽象。这有助于减少模块之间的直接耦合，提高系统的灵活性和可维护性。

```ts
interface ILogger {
  log(message: string): void;
}

class ConsoleLogger implements ILogger {
  log(message: string): void {
    console.log(message);
  }
}

class App {
  private logger: ILogger;

  constructor(logger: ILogger) {
    this.logger = logger;
  }

  start() {
    this.logger.log("应用已启动");
  }
}
```

5. 接口隔离原则

接口隔离原则要求一个类不应该强迫它的客户端使用它们不需要的方法。换句话说，一个类应该只提供客户端需要的方法，而不强迫客户端实现不需要的方法。这有助于避免臃肿的接口，提高代码的可维护性。

```ts
interface Readable {
  read(): void;
}

interface Writable {
  write(data: string): void;
}

class FileReader implements Readable {
  read(): void {}
}

class DataWriter implements Writable {
  write(data: string): void {}
}
```

6. 合成复用原则

合成复用原则强调通过组合（合成）和聚合（聚合）来实现代码的复用，而不是通过继承。这样可以避免继承带来的耦合问题，同时提高系统的灵活性。

```ts
class Engine {
  start() {}
}

class Car {
  private engine: Engine;

  constructor(engine: Engine) {
    this.engine = engine;
  }

  startCar() {
    this.engine.start();
  }
}
```

7. 迪米特法则

迪米特法则要求**一个对象**应该对其他对象有最少的了解，即一个对象不应该直接与太多其他对象发生相互作用。这有助于减少系统中各个模块之间的依赖关系，提高模块的独立性，通过引入接口或抽象类来实现类之间的松耦合。

```ts
interface Notifier {
  notify(): void;
}

class Team {
  members: Notifier[] = [];

  addPlayer(player: Notifier) {
    this.members.push(player);
  }

  notifyPlayers() {
    for (const player of this.members) {
      player.notify();
    }
  }
}

class Player implements Notifier {
  notify() {}
}
```
