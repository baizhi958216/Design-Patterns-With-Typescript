import { ImageImp } from "./ImageImp";

export abstract class Image {
  protected imp!: ImageImp;
  setImageImp(imp: ImageImp) {
    this.imp = imp;
  }
  abstract parseFile(fileName: string): void;
}
