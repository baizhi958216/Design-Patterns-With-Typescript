# 桥接模式

将抽象部分与它的实现部分解耦，使得两者都能够独立变化。

桥接模式是一种对象结构型模式，又被称为`柄体模式`或`接口模式`。桥接模式用抽象关联取代传统的多层继承，将类之间的静态继承转换为动态的对象组合关系。

因此，桥接模式有 4 个角色：`抽象类`,`扩充抽象类`,`实现类接口`,`具体实现类`。

现在要开发一个跨平台图像预览软件，要求能够在 Windows、Linux、Mac 展示 BMP、JPG、GIF、PNG 等图片。软件首先将文件解析为像素矩阵(Matrix)，然后通过系统的绘制函数进行显示，要有较好的扩展性，以便未来支持新的文件格式和系统。

1. 新建像素矩阵类：

```ts
export class Matrix {}
```

2. 新建操作系统实现类，充当实现类接口：

```ts
import { Matrix } from "./Matrix";

export interface ImageImp {
  doPaint(m: Matrix): void;
}
```

3.1. 新建 Windows 操作系统实现类，充当具体实现类：

```ts
import { ImageImp } from "./ImageImp";
import { Matrix } from "./Matrix";

export class WindowsImp implements ImageImp {
  doPaint(m: Matrix): void {
    console.log("在Windows操作系统中显示图像：");
  }
}
```

3.2. 新建 Linux 操作系统实现类，充当具体实现类：

```ts
import { ImageImp } from "./ImageImp";
import { Matrix } from "./Matrix";

export class LinuxImp implements ImageImp {
  doPaint(m: Matrix): void {
    console.log("在Linux操作系统中显示图像：");
  }
}
```

3.3. 新建 Mac 操作系统实现类，充当具体实现类：

```ts
import { ImageImp } from "./ImageImp";
import { Matrix } from "./Matrix";

export class MacImp implements ImageImp {
  doPaint(m: Matrix): void {
    console.log("在Mac操作系统中显示图像：");
  }
}
```

4. 新建抽象图像类，充当抽象类：

```ts
import { ImageImp } from "./ImageImp";

export abstract class Image {
  protected imp: ImageImp | undefined;
  setImageImp(imp: ImageImp) {
    this.imp = imp;
  }
  abstract parseFile(fileName: string): void;
}
```

5.1. 新建 JPG 格式图像类，充当扩充抽象类：

```ts
import { Matrix } from "./Matrix";
import { Image } from "./Image";

export class JPGImage extends Image {
  parseFile(fileName: string): void {
    const m = new Matrix();
    this.imp.doPaint(m);
    console.log(`${fileName}, 格式为JPG`);
  }
}
```

5.2. 新建 PNG 格式图像类，充当扩充抽象类：

```ts
import { Matrix } from "./Matrix";
import { Image } from "./Image";

export class PNGImage extends Image {
  parseFile(fileName: string): void {
    const m = new Matrix();
    this.imp.doPaint(m);
    console.log(`${fileName}, 格式为PNG`);
  }
}
```

5.3. 新建 BMP 格式图像类，充当扩充抽象类：

```ts
import { Matrix } from "./Matrix";
import { Image } from "./Image";

export class BMPImage extends Image {
  parseFile(fileName: string): void {
    const m = new Matrix();
    this.imp.doPaint(m);
    console.log(`${fileName}, 格式为BMP`);
  }
}
```

5.4. 新建 GIF 格式图像类，充当扩充抽象类：

```ts
import { Matrix } from "./Matrix";
import { Image } from "./Image";

export class GIFImage extends Image {
  parseFile(fileName: string): void {
    const m = new Matrix();
    this.imp.doPaint(m);
    console.log(`${fileName}, 格式为GIF`);
  }
}
```

6. 新建配置文件：

```json
{
  "RefinedAbstraction": "JPGImage",
  "ConcreteImplementor": "WindowsImp"
}
```

7. 编写测试函数：

```ts
import { Image } from "./Image";
import { ImageImp } from "./ImageImp";
import config from "./config.json";

export const BridgePatternClient = async () => {
  const RefinedAbstraction: string = config.RefinedAbstraction;
  const ConcreteImplementor: string = config.ConcreteImplementor;

  const RefinedAbstractionModule = await import(`./${RefinedAbstraction}`);
  const ConcreteImplementorModule = await import(`./${ConcreteImplementor}`);

  const RefinedAbstractionClass = RefinedAbstractionModule[RefinedAbstraction];
  const ConcreteImplementorClass =
    ConcreteImplementorModule[ConcreteImplementor];

  const image: Image = new RefinedAbstractionClass();
  const imp: ImageImp = new ConcreteImplementorClass();
  image.setImageImp(imp);
  image.parseFile("小龙女");
};
```
