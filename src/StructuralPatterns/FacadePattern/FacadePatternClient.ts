import { EncryptFacade } from "./EncryptFacade";

export const FacadePatternClient = () => {
  const ef: EncryptFacade = new EncryptFacade();
  ef.fileEncrypt(
    "./src/StructuralPatterns/FacadePattern/test.txt",
    "./src/StructuralPatterns/FacadePattern/encrypt.txt"
  );
};
