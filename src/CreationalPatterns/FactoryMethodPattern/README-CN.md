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

## 开闭原则

客户端在使用工厂方法时需要实例化具体的工厂类，这样的修改对客户端而言可以被认为是违反开闭原则的。

在《Java 设计模式》书中提到了反射机制与配置文件，但是 TypeScript 是一门结构化的静态类型语言，在 TypeScript 中，类型信息通常在编译时就已经确定，而不是在运行时动态获取，不包含类似 Java 的运行时反射机制。

我们可以使用动态导入的方法实现通过配置文件获取并且实例化具体工厂类：

config.json:

```json
{
  "className": "FileLoggerFactory"
}
```

修改后的客户端测试方法：

```ts
import config from "./config.json";
import { Logger } from "./Logger.interface";
import { LoggerFactory } from "./LoggerFactory";

export const FactoryMethodPatternClient = async () => {
  try {
    // 获取配置中的工厂类名
    const factoryClassName: string = config.className;
    // 动态导入工厂类的模块
    const module = await import(`./${factoryClassName}`);
    // 获取具体工厂类
    const factoryClass = module[factoryClassName];
    const factory: LoggerFactory = new factoryClass();
    const logger: Logger = factory.createLogger();
    logger.writeLog();
  } catch (error) {
    console.error(`${config.className}模块不存在`);
  }
};
```
