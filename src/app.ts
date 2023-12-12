import { SimpleFactoryPatternClient } from "./CreationalPatterns/SimpleFactoryPattern/SimpleFactoryPatternClient";
import { FactoryMethodPatternClient } from "./CreationalPatterns/FactoryMethodPattern/FactoryMethodPatternClient";

const DesignPatterns = {
  // 简单工厂模式
  SimpleFactoryPattern: SimpleFactoryPatternClient,
  FactoryMethodPattern: FactoryMethodPatternClient,
};

// DesignPatterns["SimpleFactoryPattern"]();
DesignPatterns["FactoryMethodPattern"]();
