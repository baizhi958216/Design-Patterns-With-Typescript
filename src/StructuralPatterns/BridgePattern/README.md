# Bridge Pattern

The Bridge Pattern decouples the abstraction and its implementation, allowing both to evolve independently.

The Bridge Pattern is an object structural pattern, also known as the `Handle/Body` pattern or `Interface` pattern. It replaces traditional multiple inheritance with abstract association, transforming static inheritance relationships between classes into dynamic object composition.

Therefore, the Bridge Pattern involves four roles: `Abstraction`, `Refined Abstraction`, `Implementor Interface`, and `Concrete Implementor`.

Suppose we are developing a cross-platform image preview software that should display BMP, JPG, GIF, PNG, etc., images on Windows, Linux, and Mac. The software first parses the files into pixel matrices and then displays them using the system's drawing functions. It should have good extensibility to support new file formats and systems in the future.

1. Create a new pixel matrix class:

```typescript
export class Matrix {}
```

2. Create an operating system implementation class, serving as the implementor interface:

```typescript
import { Matrix } from "./Matrix";

export interface ImageImp {
  doPaint(m: Matrix): void;
}
```

3.1. Create a Windows operating system implementation class, acting as a concrete implementor:

```typescript
import { ImageImp } from "./ImageImp";
import { Matrix } from "./Matrix";

export class WindowsImp implements ImageImp {
  doPaint(m: Matrix): void {
    console.log("Displaying image on Windows operating system:");
  }
}
```

3.2. Create a Linux operating system implementation class, acting as a concrete implementor:

```typescript
import { ImageImp } from "./ImageImp";
import { Matrix } from "./Matrix";

export class LinuxImp implements ImageImp {
  doPaint(m: Matrix): void {
    console.log("Displaying image on Linux operating system:");
  }
}
```

3.3. Create a Mac operating system implementation class, acting as a concrete implementor:

```typescript
import { ImageImp } from "./ImageImp";
import { Matrix } from "./Matrix";

export class MacImp implements ImageImp {
  doPaint(m: Matrix): void {
    console.log("Displaying image on Mac operating system:");
  }
}
```

4. Create an abstract image class, serving as the abstraction:

```typescript
import { ImageImp } from "./ImageImp";

export abstract class Image {
  protected imp: ImageImp | undefined;
  setImageImp(imp: ImageImp) {
    this.imp = imp;
  }
  abstract parseFile(fileName: string): void;
}
```

5.1. Create a JPG format image class, serving as the refined abstraction:

```typescript
import { Matrix } from "./Matrix";
import { Image } from "./Image";

export class JPGImage extends Image {
  parseFile(fileName: string): void {
    const m = new Matrix();
    this.imp.doPaint(m);
    console.log(`${fileName}, format: JPG`);
  }
}
```

5.2. Create a PNG format image class, serving as the refined abstraction:

```typescript
import { Matrix } from "./Matrix";
import { Image } from "./Image";

export class PNGImage extends Image {
  parseFile(fileName: string): void {
    const m = new Matrix();
    this.imp.doPaint(m);
    console.log(`${fileName}, format: PNG`);
  }
}
```

5.3. Create a BMP format image class, serving as the refined abstraction:

```typescript
import { Matrix } from "./Matrix";
import { Image } from "./Image";

export class BMPImage extends Image {
  parseFile(fileName: string): void {
    const m = new Matrix();
    this.imp.doPaint(m);
    console.log(`${fileName}, format: BMP`);
  }
}
```

5.4. Create a GIF format image class, serving as the refined abstraction:

```typescript
import { Matrix } from "./Matrix";
import { Image } from "./Image";

export class GIFImage extends Image {
  parseFile(fileName: string): void {
    const m = new Matrix();
    this.imp.doPaint(m);
    console.log(`${fileName}, format: GIF`);
  }
}
```

6. Create a configuration file:

```json
{
  "RefinedAbstraction": "JPGImage",
  "ConcreteImplementor": "WindowsImp"
}
```

7. Write a test function:

```typescript
import { Image } from "./Image";
import { ImageImp } from "./ImageImp";
import config from "./config.json";

export const BridgePatternClient = async () => {
  const { RefinedAbstraction, ConcreteImplementor } = config;

  const RefinedAbstractionModule = await import(`./${RefinedAbstraction}`);
  const ConcreteImplementorModule = await import(`./${ConcreteImplementor}`);

  const RefinedAbstractionClass = RefinedAbstractionModule[RefinedAbstraction];
  const ConcreteImplementorClass =
    ConcreteImplementorModule[ConcreteImplementor];

  const image: Image = new RefinedAbstractionClass();
  const imp: ImageImp = new ConcreteImplementorClass();
  image.setImageImp(imp);
  image.parseFile("XiaoLongNu");
};
```
