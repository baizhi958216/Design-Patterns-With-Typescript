# 工厂方法模式

定义一个用于创建对象的接口，但是让子类决定将哪一个类实例化。工厂方法模式让一个类的实例化延迟到其子类。

工厂方法模式是简单工厂方法的延伸，继承了简单工厂模式的优点，同时弥补了简单工厂模式的缺陷(增加新的具体产品时不需要修改原有的系统，更符合开闭原则的要求)。

工厂方法模式不再提供工厂类来统一负责所有产品的创建，具体产品的创建交给专门的工厂子类去完成。

首先，定义一个抽象的工厂类，再定义具体的工厂类，具体的工厂类实现了在抽象工厂类中声明的方法。这种抽象化的结果就是当出现新的产品时，只需要为这个产品定义一个新的具体工厂类就可以创建该产品，这种改进的设计方案即工厂方法模式。

因此，工厂方法模式有 4 个角色：`抽象产品`，`具体产品`，`抽象工厂`，`具体工厂`。

假设我们需要开发一套日志记录器，需要提供数据库日志记录、文件日志记录等，使用工厂方法模式进行设计。

1. 建立日志记录器接口，充当抽象产品角色：

```ts
export interface Logger {
  log(message: string): void;
}
```

2. 建立数据库日志记录器、文件日志记录器，充当具体产品角色：

```ts
import { Logger } from "./Logger.interface";

export class DatabaseLogger implements Logger {
  writeLog(): void {
    console.log("数据库日志记录器。");
  }
}
```

```ts
import { Logger } from "./Logger.interface";

export class FileLogger implements Logger {
  writeLog(): void {
    console.log("文件日志记录器。");
  }
}
```

3. 建立日志记录器工厂接口，充当抽象工厂角色：

```ts
import { Logger } from "./Logger.interface";

export interface LoggerFactory {
  createLogger(): Logger;
}
```

4. 建立数据库日志记录器、文件日志记录器工厂类，充当具体工厂角色：

```ts
import { DatabaseLogger } from "./DatabaseLogger";
import { Logger } from "./Logger.interface";
import { LoggerFactory } from "./LoggerFactory";

export class DatabaseLoggerFactory implements LoggerFactory {
  createLogger(): Logger {
    const databaseLogger = new DatabaseLogger();
    return databaseLogger;
  }
}
```

```ts
import { FileLogger } from "./FileLogger";
import { Logger } from "./Logger.interface";
import { LoggerFactory } from "./LoggerFactory";

export class FileLoggerFactory implements LoggerFactory {
  createLogger(): Logger {
    const fileLogger = new FileLogger();
    return fileLogger;
  }
}
```

5. 编写客户端测试方法：

```ts
import { DatabaseLoggerFactory } from "./DatabaseLoggerFactory";
import { Logger } from "./Logger.interface";
import { LoggerFactory } from "./LoggerFactory";

export const FactoryMethodPatternClient = () => {
  let factory: LoggerFactory;
  let logger: Logger;
  factory = new DatabaseLoggerFactory();
  logger = factory.createLogger();
  logger.writeLog();
};
```
