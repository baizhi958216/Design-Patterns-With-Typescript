# Composite Pattern

The Composite Pattern is like a container object, where the container can also have components, forming a recursive tree structure. Clients can handle it uniformly without distinguishing between components and containers.

It combines multiple objects to represent a hierarchical structure with a part-whole relationship. The Composite Pattern allows clients to treat individual objects and composite objects uniformly.

Therefore, the Composite Pattern consists of three roles: `Abstract Component`, `Leaf Component`, and `Composite Component`.

Now, let's develop antivirus software that scans folders and files, using different virus scanning methods for different file types.

1. Create an abstract file class, acting as an abstract component:

```typescript
export abstract class AbstractFile {
  abstract add(file: AbstractFile): void;
  abstract remove(file: AbstractFile): void;
  abstract getChild(i: number): AbstractFile;
  abstract killVirus(): void;
}
```

2.1. Create an image file class, acting as a leaf component:

```typescript
import { AbstractFile } from "./AbstractFile";

export class ImageFile extends AbstractFile {
  #name: string;
  constructor(name: string) {
    super();
    this.#name = name;
  }
  add(file: AbstractFile): void {
    console.log("Sorry, this method is not supported!");
  }
  remove(file: AbstractFile): void {
    console.log("Sorry, this method is not supported!");
  }
  getChild(i: number): null {
    console.log("Sorry, this method is not supported!");
    return null;
  }
  killVirus(): void {
    console.log(`Virus scan successful for image file: ${this.#name}`);
  }
}
```

2.2. Create a text file class, acting as a leaf component:

```typescript
import { AbstractFile } from "./AbstractFile";

export class TextFile extends AbstractFile {
  #name: string;
  constructor(name: string) {
    super();
    this.#name = name;
  }
  add(file: AbstractFile): void {
    console.log("Sorry, this method is not supported!");
  }
  remove(file: AbstractFile): void {
    console.log("Sorry, this method is not supported!");
  }
  getChild(i: number): null {
    console.log("Sorry, this method is not supported!");
    return null;
  }
  killVirus(): void {
    console.log(`Virus scan successful for text file: ${this.#name}`);
  }
}
```

2.3. Create a video file class, acting as a leaf component:

```typescript
import { AbstractFile } from "./AbstractFile";

export class VideoFile extends AbstractFile {
  #name: string;
  constructor(name: string) {
    super();
    this.#name = name;
  }
  add(file: AbstractFile): void {
    console.log("Sorry, this method is not supported!");
  }
  remove(file: AbstractFile): void {
    console.log("Sorry, this method is not supported!");
  }
  getChild(i: number): null {
    console.log("Sorry, this method is not supported!");
    return null;
  }
  killVirus(): void {
    console.log(`Virus scan successful for video file: ${this.#name}`);
  }
}
```

3. Create a folder class, acting as a composite component:

```typescript
import { AbstractFile } from "./AbstractFile";

export class Folder extends AbstractFile {
  #name: string;
  #fileList: AbstractFile[] = [];
  constructor(name: string) {
    super();
    this.#name = name;
  }
  add(file: AbstractFile): void {
    this.#fileList.push(file);
  }
  remove(file: AbstractFile): void {
    const index = this.#fileList.indexOf(file);
    if (index > -1) {
      this.#fileList.splice(index, 1);
    }
  }
  getChild(i: number): AbstractFile {
    return this.#fileList[i];
  }
  killVirus(): void {
    console.log(`\nScanning folder ${this.#name} for viruses`);

    // Recursive call to the killVirus method of member components
    for (const file of this.#fileList) {
      file.killVirus();
    }
  }
}
```

4. Write a client test method:

```typescript
import { Folder } from "./Folder";
import { ImageFile } from "./ImageFile";
import { TextFile } from "./TextFile";
import { VideoFile } from "./VideoFile";

export const CompositePatternClient = () => {
  const file1 = new ImageFile("DragonGirl.jpg"),
    file2 = new ImageFile("ZhangWuji.jpg"),
    file3 = new TextFile("NineYinManual.txt"),
    file4 = new TextFile("KuifuaTreasure.txt"),
    file5 = new VideoFile("SmilingProudly.rmvb");

  const folder1 = new Folder("Sunny'sFiles"),
    folder2 = new Folder("ImageFiles"),
    folder3 = new Folder("TextFiles"),
    folder4 = new Folder("VideoFiles");

  folder1.add(file1);
  folder2.add(file2);
  folder3.add(file3);
  folder3.add(file4);
  folder4.add(file5);
  folder1.add(folder2);
  folder1.add(folder3);
  folder1.add(folder4);

  // Start virus scan from the "Sunny'sFiles" node
  folder1.killVirus();

  // Start virus scan from the "VideoFiles" node
  folder4.killVirus();
};
```
