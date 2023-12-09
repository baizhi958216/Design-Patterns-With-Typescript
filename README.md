# Design Patterns With Typescript

[中文版](./README-CN.md)

Referencing "Java Design Patterns" by Tsinghua University Press,

The 23 design patterns were systematically summarized and published by the Gang of Four (GoF): Erich Gamma, Richard Helm, Ralph Johnson, and John Vlissides, during the 1994 PLoP.

Design patterns are descriptions of communitcating objects and classes that are customized to solve a general design problem in a particular context.

## There are generally two classification methods for design patterns:

Classified by **Purpose**:

1. Creational Patterns (Factory Method, Abstract Factory, Builder, Prototype, Singleton)

2. Structural Patterns (Adapter, Bridge, Composite, Decorator, Facade, Flyweight, Proxy)

3. Behavioral Patterns (Chain of Responsibility, Command, Interpreter, Iterator, Mediator, Memento, Observer, State, Strategy, Template Method, Visitor)

Classified by **Scope**:

1. Class Patterns (Handle class and subclass relationships, established through inheritance at compile time, static relationships)

2. Object Patterns (Handle object relationships, dynamic relationships at runtime)

| Scope/Purpose | Creational Patterns | Structural Patterns | Behavioral Patterns     |
| ------------- | ------------------- | ------------------- | ----------------------- |
| Class         | Factory Method      | (Class) Adapter     | Template Method         |
|               |                     |                     | Interpreter             |
| Object        | Abstract Factory    | (Object) Adapter    | Chain of Responsibility |
|               | Builder             | Bridge              | Command                 |
|               | Prototype           | Composite           | Iterator                |
|               | Singleton           | Decorator           | Mediator                |
|               |                     | Facade              | Memento                 |
|               |                     | Flyweight           | State                   |
|               |                     | Proxy               | Strategy                |
|               |                     |                     | Visitor                 |

## Object-Oriented Design Principles

Object-oriented design principles are important criteria for evaluating the effectiveness of a design pattern. Each design pattern aligns with one or more object-oriented design principles.

1. Single Responsibility Principle

The Single Responsibility Principle states that a class should have only one reason to change. In other words, a class should have only one responsibility. This helps improve code maintainability and understandability, as each class focuses on a specific functionality.

```ts
class FileManager {
  writeToFile(data: string) {}
}

class Logger {
  logMessage(message: string) {}
}
```

2. **Open/Closed Principle**

The Open/Closed Principle dictates that software entities (classes, modules, functions, etc.) should be open for extension but closed for modification. This means that the system can be extended with new features without modifying existing code. Following this principle reduces code coupling and enhances system stability and maintainability.

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

3. **Liskov Substitution Principle**

The Liskov Substitution Principle requires that a subtype must be substitutable for its base type without affecting the correctness of the program. In other words, if a class is a subtype of an abstract class, it should be able to replace the abstract class anywhere without causing errors.

```ts
class Bird {
  fly() {
    console.log("Take flight");
  }
}

class Penguin extends Bird {
  fly() {
    console.log("Penguins cannot fly");
  }
}
```

4. **Dependency Inversion Principle**

The Dependency Inversion Principle emphasizes that high-level modules should not depend on low-level modules; both should depend on abstractions. Abstractions should not depend on details; details should depend on abstractions. This reduces direct coupling between modules, enhancing system flexibility and maintainability.

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
    this.logger.log("App start");
  }
}
```

5. Interface Segregation Principle

The Interface Segregation Principle states that a class should not be forced to implement interfaces it does not use. In other words, a class should provide only the methods that are needed by its clients, avoiding the implementation of unnecessary methods. This helps prevent bulky interfaces and improves code maintainability.

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

6. Composition Over Inheritance Principle

The Composition Over Inheritance Principle emphasizes achieving code reuse through composition and aggregation rather than through inheritance. This approach helps avoid the coupling issues associated with inheritance, providing greater system flexibility.

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

7. Law of Demeter

The Law of Demeter states that **an object** should have the least possible knowledge of other objects, meaning an object should not directly interact with too many other objects. This helps reduce dependencies between modules, improving module independence. Loose coupling between classes is achieved by introducing interfaces or abstract classes.

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
