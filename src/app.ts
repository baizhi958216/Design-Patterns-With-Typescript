import { SimpleFactoryPatternClient } from "./CreationalPatterns/SimpleFactoryPattern/SimpleFactoryPatternClient";
import { FactoryMethodPatternClient } from "./CreationalPatterns/FactoryMethodPattern/FactoryMethodPatternClient";
import { AbstractFactoryPatternClient } from "./CreationalPatterns/AbstractFactoryPattern/AbstractFactoryPatternClient";
import { BuilderPatternClient } from "./CreationalPatterns/BuilderPattern/BuilderPatternClient";

const DesignPatterns = {
  // 简单工厂模式
  SimpleFactoryPattern: SimpleFactoryPatternClient,
  FactoryMethodPattern: FactoryMethodPatternClient,
  AbstractFactoryPattern: AbstractFactoryPatternClient,
  BuilderPattern: BuilderPatternClient,
};

// DesignPatterns["SimpleFactoryPattern"]();
// DesignPatterns["FactoryMethodPattern"]();
// DesignPatterns["AbstractFactoryPattern"]();
DesignPatterns["BuilderPattern"]();
