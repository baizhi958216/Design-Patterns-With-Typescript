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
