import { SimpleFactoryPatternClient } from "./CreationalPatterns/SimpleFactoryPattern/SimpleFactoryPatternClient";
import { FactoryMethodPatternClient } from "./CreationalPatterns/FactoryMethodPattern/FactoryMethodPatternClient";
import { AbstractFactoryPatternClient } from "./CreationalPatterns/AbstractFactoryPattern/AbstractFactoryPatternClient";
import { BuilderPatternClient } from "./CreationalPatterns/BuilderPattern/BuilderPatternClient";
import { PrototypePatternClient } from "./CreationalPatterns/PrototypePattern/PrototypePatternClient";
import { SingletonPatternClient } from "./CreationalPatterns/SingletonPattern/SingletonPatternClient";
import { AdapterPatternClient } from "./StructuralPatterns/AdapterPattern/AdapterPatternClient";
import { BridgePatternClient } from "./StructuralPatterns/BridgePattern/BridgePatternClient";
import { CompositePatternClient } from "./StructuralPatterns/CompositePattern/CompositePatternClient";
import { DecoratorPatternClient } from "./StructuralPatterns/DecoratorPattern/DecoratorPatternClient";
import { FacadePatternClient } from "./StructuralPatterns/FacadePattern/FacadePatternClient";
import { FlyweightPatternClient } from "./StructuralPatterns/FlyweightPattern/FlyweightPatternClient";

const DesignPatterns = {
  // 简单工厂模式
  SimpleFactoryPattern: SimpleFactoryPatternClient,
  FactoryMethodPattern: FactoryMethodPatternClient,
  AbstractFactoryPattern: AbstractFactoryPatternClient,
  BuilderPattern: BuilderPatternClient,
  PrototypePattern: PrototypePatternClient,
  SignletonPattern: SingletonPatternClient,
  AdapterPattern: AdapterPatternClient,
  BridgePattern: BridgePatternClient,
  CompositePattern: CompositePatternClient,
  DecoratorPattern: DecoratorPatternClient,
  FacadePattern: FacadePatternClient,
  FlyweightPattern: FlyweightPatternClient,
};

// DesignPatterns["SimpleFactoryPattern"]();
// DesignPatterns["FactoryMethodPattern"]();
// DesignPatterns["AbstractFactoryPattern"]();
// DesignPatterns["BuilderPattern"]();
// DesignPatterns["PrototypePattern"]();
// DesignPatterns["SignletonPattern"]();
// DesignPatterns["AdapterPattern"]();
// DesignPatterns["BridgePattern"]();
// DesignPatterns["CompositePattern"]();
// DesignPatterns["DecoratorPattern"]();
// DesignPatterns["FacadePattern"]();
DesignPatterns["FlyweightPattern"]();
