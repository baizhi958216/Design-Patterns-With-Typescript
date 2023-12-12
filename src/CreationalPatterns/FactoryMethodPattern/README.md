# Factory Method Pattern

The Factory Method Pattern defines an interface for creating objects but lets subclasses alter the type of objects that will be created. The Factory Method Pattern allows a class to delegate the instantiation to its subclasses, delaying the instantiation of a class to its subclasses.

It is an extension of the Simple Factory Pattern, inheriting its advantages while addressing its shortcomings (avoiding the need to modify the existing system when adding new concrete products, thus adhering more closely to the Open-Closed Principle).

In the Factory Method Pattern, instead of a centralized factory class responsible for creating all products, the creation of concrete products is delegated to specialized factory subclasses.

The process involves defining an abstract factory class first, followed by the definition of concrete factory classes. These concrete factory classes implement the methods declared in the abstract factory class. The result of this abstraction is that when a new product is introduced, only a new concrete factory class needs to be defined to create that product. This improved design is known as the Factory Method Pattern.

Therefore, the Factory Method Pattern involves four roles: `Abstract Product`, `Concrete Product`, `Abstract Factory`, and `Concrete Factory`.

Suppose we need to develop a logging system that supports database logging and file logging. We can use the Factory Method Pattern for the design.

1. Define the Logger interface, acting as the Abstract Product:

```ts
export interface Logger {
  log(message: string): void;
}
```

2. Create DatabaseLogger and FileLogger, serving as Concrete Products:

```ts
import { Logger } from "./Logger.interface";

export class DatabaseLogger implements Logger {
  log(message: string): void {
    console.log("Database Logger: " + message);
  }
}
```

```ts
import { Logger } from "./Logger.interface";

export class FileLogger implements Logger {
  log(message: string): void {
    console.log("File Logger: " + message);
  }
}
```

3. Establish the LoggerFactory interface, acting as the Abstract Factory:

```ts
import { Logger } from "./Logger.interface";

export interface LoggerFactory {
  createLogger(): Logger;
}
```

4. Develop DatabaseLoggerFactory and FileLoggerFactory, serving as Concrete Factories:

```ts
import { DatabaseLogger } from "./DatabaseLogger";
import { Logger } from "./Logger.interface";
import { LoggerFactory } from "./LoggerFactory";

export class DatabaseLoggerFactory implements LoggerFactory {
  createLogger(): Logger {
    return new DatabaseLogger();
  }
}
```

```ts
import { FileLogger } from "./FileLogger";
import { Logger } from "./Logger.interface";
import { LoggerFactory } from "./LoggerFactory";

export class FileLoggerFactory implements LoggerFactory {
  createLogger(): Logger {
    return new FileLogger();
  }
}
```

5. Write a client testing method:

```ts
import { DatabaseLoggerFactory } from "./DatabaseLoggerFactory";
import { Logger } from "./Logger.interface";
import { LoggerFactory } from "./LoggerFactory";

export const FactoryMethodPatternClient = () => {
  let factory: LoggerFactory;
  let logger: Logger;
  factory = new DatabaseLoggerFactory();
  logger = factory.createLogger();
  logger.log("Message to log");
};
```
