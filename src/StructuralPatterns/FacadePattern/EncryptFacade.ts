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
