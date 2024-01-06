# 组合模式

组合模式像是一个容器对象，容器对象里面部件也可以有容器，递归结合形成一个树形结构。客户端对其进行统一处理，不需要考虑是部件还是容器。

组合多个对象形成树形结构以表示具有部分-整体关系的层次结构。组合模式让客户端可以统一对待单个对象和组合对象。

因此，组合模式有 3 个角色：`抽象构件`，`叶子构件`，`容器构件`。

现在要开发一款杀毒软件，对文件夹和文件进行扫描，针对不同的文件类型使用不同的杀毒方式。

1. 新建抽象文件类，充当抽象构建类：

```ts
export abstract class AbstractFile {
  abstract add(file: AbstractFile): void;
  abstract remove(file: AbstractFile): void;
  abstract getChild(i: number): AbstractFile;
  abstract killVirus(): void;
}
```

2.1. 新建图像文件类，充当叶子构件类：

```ts
import { AbstractFile } from "./AbstractFile";

export class ImageFile extends AbstractFile {
  #name: string;
  constructor(name: string) {
    super();
    this.#name = name;
  }
  add(file: AbstractFile): void {
    console.log("对不起，不支持该方法！");
  }
  remove(file: AbstractFile): void {
    console.log("对不起，不支持该方法!");
  }
  getChild(i: number): null {
    console.log("对不起，不支持该方法!");
    return null;
  }
  killVirus(): void {
    console.log(`对图像文件：${this.#name} 杀毒成功`);
  }
}
```

2.2. 新建文本文件类，充当叶子构件类：

```ts
import { AbstractFile } from "./AbstractFile";

export class TextFile extends AbstractFile {
  #name: string;
  constructor(name: string) {
    super();
    this.#name = name;
  }
  add(file: AbstractFile): void {
    console.log("对不起，不支持该方法！");
  }
  remove(file: AbstractFile): void {
    console.log("对不起，不支持该方法!");
  }
  getChild(i: number): null {
    console.log("对不起，不支持该方法!");
    return null;
  }
  killVirus(): void {
    console.log(`对文本文件：${this.#name} 杀毒成功`);
  }
}
```

2.3. 新建视频文件类，充当叶子构件类：

```ts
import { AbstractFile } from "./AbstractFile";

export class VideoFile extends AbstractFile {
  #name: string;
  constructor(name: string) {
    super();
    this.#name = name;
  }
  add(file: AbstractFile): void {
    console.log("对不起，不支持该方法！");
  }
  remove(file: AbstractFile): void {
    console.log("对不起，不支持该方法!");
  }
  getChild(i: number): null {
    console.log("对不起，不支持该方法!");
    return null;
  }
  killVirus(): void {
    console.log(`对视频文件：${this.#name} 杀毒成功`);
  }
}
```

3. 新建文件夹类，充当容器构件类：

```ts
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
    console.log(`\n对文件夹${this.#name}进行杀毒`);

    // 递归调用成员构件的killVirus方法
    for (const file of this.#fileList) {
      file.killVirus();
    }
  }
}
```

4. 编写客户端测试方法：

```ts
import { Folder } from "./Folder";
import { ImageFile } from "./ImageFile";
import { TextFile } from "./TextFile";
import { VideoFile } from "./VideoFile";

export const CompositePatternClient = () => {
  const file1 = new ImageFile("小龙女.jpg"),
    file2 = new ImageFile("张无忌.jpg"),
    file3 = new TextFile("九阴真经.txt"),
    file4 = new TextFile("葵花宝典.txt"),
    file5 = new VideoFile("笑傲江湖.rmvb");

  const folder1 = new Folder("Sunny 的资料"),
    folder2 = new Folder("图像文件"),
    folder3 = new Folder("文本文件"),
    folder4 = new Folder("视频文件");

  folder1.add(file1);
  folder2.add(file2);
  folder3.add(file3);
  folder3.add(file4);
  folder4.add(file5);
  folder1.add(folder2);
  folder1.add(folder3);
  folder1.add(folder4);

  //   从"Sunny 的资料"结点开始杀毒
  folder1.killVirus();

  //   从"视频文件"结点开始杀毒
  folder4.killVirus();
};
```
