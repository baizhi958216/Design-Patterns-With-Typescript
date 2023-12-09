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
