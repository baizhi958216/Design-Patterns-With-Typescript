# 外观模式

引入一个外观角色来简化客户端与子系统之间的交互，为复杂的子系统调用提供一个统一的入口。

外观模式是迪米特法则的一种实现，通过引入一个新的外观角色降低原有系统复杂度，同时降低客户类与子类系统的耦合度。

为子系统中的一组接口提供一个统一的入口。外观模式定义了一个高层接口，这个接口使得这一子系统更加容易使用。

因此，外观模式有 2 个角色：`外观角色`，`子系统角色`。

现在要开发一个文件加密模块，先读取源文件，然后加密，最后保存加密后的文件。

1.1. 新建文件读取类，充当子系统类：

```ts
import { readFileSync } from "fs";

export class FileReader {
  readFile(fileNameSrc: string): string {
    try {
      const content = readFileSync(fileNameSrc, "utf-8");
      return content;
    } catch (error) {
      console.log("文件操作错误！");
      return "文件操作错误！";
    }
  }
}
```

1.2. 新建数据加密类，充当子系统类：

```ts
export class CipherMachine {
  encrypt(plainText: string): string {
    console.log("数据加密，将铭文转换为密文：");
    let es = "";
    for (let i = 0; i < plainText.length; i++) {
      es += String.fromCharCode(plainText.charCodeAt(i) % 7);
    }
    console.log(es);
    return es;
  }
}
```

1.3. 新建文件保存类，充当子系统类：

```ts
import { writeFileSync } from "fs";

export class FileWriter {
  write(encryptStr: string, fileNameDes: string): void {
    console.log("保存密文，写入文件：");
    try {
      writeFileSync(fileNameDes, encryptStr);
    } catch (error) {
      console.log("文件操作错误！");
    }
  }
}
```

2. 新建加密外观类，充当外观类：

```ts
import { CipherMachine } from "./CipherMachine";
import { FileReader } from "./FileReader";
import { FileWriter } from "./FileWriter";

export class EncryptFacade {
  #reader: FileReader;
  #cipher: CipherMachine;
  #writer: FileWriter;
  constructor() {
    this.#reader = new FileReader();
    this.#cipher = new CipherMachine();
    this.#writer = new FileWriter();
  }

  fileEncrypt(fileNameSrc: string, fileNameDes: string) {
    const plainStr: string = this.#reader.readFile(fileNameSrc);
    const encryptStr: string = this.#cipher.encrypt(plainStr);
    this.#writer.write(encryptStr, fileNameDes);
  }
}
```

3. 编写客户端测试方法：

```ts
import { EncryptFacade } from "./EncryptFacade";

export const FacadePatternClient = () => {
  const ef: EncryptFacade = new EncryptFacade();
  ef.fileEncrypt(
    "./src/StructuralPatterns/FacadePattern/test.txt",
    "./src/StructuralPatterns/FacadePattern/encrypt.txt"
  );
};
```
