import { SimpleFactoryPatternClient } from "./CreationalPatterns/SimpleFactoryPattern/SimpleFactoryPatternClient";
import { FactoryMethodPatternClient } from "./CreationalPatterns/FactoryMethodPattern/FactoryMethodPatternClient";
import { AbstractFactoryPatternClient } from "./CreationalPatterns/AbstractFactoryPattern/AbstractFactoryPatternClient";
import { BuilderPatternClient } from "./CreationalPatterns/BuilderPattern/BuilderPatternClient";
import { PrototypePatternClient } from "./CreationalPatterns/PrototypePattern/PrototypePatternClient";
import { SingletonPatternClient } from "./CreationalPatterns/SingletonPattern/SingletonPatternClient";
import { AdapterPatternClient } from "./StructuralPatterns/AdapterPattern/AdapterPatternClient";

const DesignPatterns = {
  // 简单工厂模式
  SimpleFactoryPattern: SimpleFactoryPatternClient,
  FactoryMethodPattern: FactoryMethodPatternClient,
  AbstractFactoryPattern: AbstractFactoryPatternClient,
  BuilderPattern: BuilderPatternClient,
  PrototypePattern: PrototypePatternClient,
  SignletonPattern: SingletonPatternClient,
  AdapterPattern: AdapterPatternClient,
};

// DesignPatterns["SimpleFactoryPattern"]();
// DesignPatterns["FactoryMethodPattern"]();
// DesignPatterns["AbstractFactoryPattern"]();
// DesignPatterns["BuilderPattern"]();
// DesignPatterns["PrototypePattern"]();
// DesignPatterns["SignletonPattern"]();
DesignPatterns["AdapterPattern"]();
