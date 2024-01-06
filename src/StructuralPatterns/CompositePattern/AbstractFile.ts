export abstract class AbstractFile {
  abstract add(file: AbstractFile): void;
  abstract remove(file: AbstractFile): void;
  abstract getChild(i: number): AbstractFile | null;
  abstract killVirus(): void;
}
