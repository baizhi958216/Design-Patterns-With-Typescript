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
