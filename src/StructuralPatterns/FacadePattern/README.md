# Facade Pattern

Introduce a facade role to simplify the interaction between the client and subsystems, providing a unified entry point for complex subsystem calls.

The facade pattern is an implementation of the Law of Demeter, reducing the complexity of the existing system by introducing a new facade role while simultaneously reducing the coupling between client classes and subsystems.

It provides a unified entry point for a set of interfaces in the subsystem. The facade pattern defines a high-level interface, making the subsystem easier to use.

Therefore, the facade pattern has two roles: `Facade Role` and `Subsystem Role`.

Now, let's develop a file encryption module that reads the source file, encrypts it, and finally saves the encrypted file.

1.1. Create a file reading class, acting as a subsystem class:

```ts
import { readFileSync } from "fs";

export class FileReader {
  readFile(fileNameSrc: string): string {
    try {
      const content = readFileSync(fileNameSrc, "utf-8");
      return content;
    } catch (error) {
      console.log("File operation error!");
      return "File operation error!";
    }
  }
}
```

1.2. Create a data encryption class, acting as a subsystem class:

```ts
export class CipherMachine {
  encrypt(plainText: string): string {
    console.log("Data encryption, converting plaintext to ciphertext:");
    let es = "";
    for (let i = 0; i < plainText.length; i++) {
      es += String.fromCharCode(plainText.charCodeAt(i) % 7);
    }
    console.log(es);
    return es;
  }
}
```

1.3. Create a file saving class, acting as a subsystem class:

```ts
import { writeFileSync } from "fs";

export class FileWriter {
  write(encryptStr: string, fileNameDes: string): void {
    console.log("Save ciphertext, writing to file:");
    try {
      writeFileSync(fileNameDes, encryptStr);
    } catch (error) {
      console.log("File operation error!");
    }
  }
}
```

2. Create an encryption facade class, acting as a facade class:

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

3. Write a client test method:

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
