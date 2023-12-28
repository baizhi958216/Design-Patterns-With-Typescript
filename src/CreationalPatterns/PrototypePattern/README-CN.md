# 原型模式

使用原型实例指定待创建对象的类型，并且通过复制这个原型来创建新的对象。

使用原型模式可以不通过构造函数来创建新对象，这种模式在需要创建多个相似对象的情况下可以提高性能并减少代码重复。

首先创建一个原型对象，然后通过复制这个原型对象来创建新的对象。通过克隆原型对象来获取一个初始状态相同的新对象,这个原型对象包含了需要复制的属性和方法。

因此，原型模式有 3 个角色：`抽象原型类`，`具体原型类`，`客户类 `

假设为提高工作周报的创建效率，开发一个机制可以快速创建相同或相似的周报，包括创建周报的附件。

1. 建立附件类，充当成员类：

```ts
export class Attachment {
  name: string | undefined;

  setName(name: string) {
    this.name = name;
  }

  getName() {
    return this.name;
  }

  download() {
    console.log("下载附件，文件名为" + this.name);
  }
}
```

2.1. 创建抽象 Cloneable 接口：

```ts
export interface Cloneable {
  clone(): Cloneable | null;
}
```

2.2. 建立周报类，充当具体原型类：

```ts
import { Attachment } from "./Attachment";
import { Cloneable } from "./Cloneable";

export class WeeklyLog implements Cloneable {
  attachment: Attachment | undefined;
  name: String | undefined;
  date: String | undefined;
  content: String | undefined;

  setAttachment(attachment: Attachment) {
    this.attachment = attachment;
  }

  getAttachment() {
    return this.attachment;
  }

  setName(name: String) {
    this.name = name;
  }

  getName() {
    return this.name;
  }

  setDate(date: String) {
    this.date = date;
  }

  getDate() {
    return this.date;
  }

  setContent(content: String) {
    this.content = content;
  }

  getContent() {
    return this.content;
  }

  clone(): WeeklyLog | null {
    try {
      return Object.assign(Object.create(this), this);
    } catch (e) {
      console.log("不支持复制！！");
      return null;
    }
  }
}
```

3. 编写客户端测试方法：

```ts
import { Attachment } from "./Attachment";
import { WeeklyLog } from "./WeeklyLog";

export const PrototypePatternClient = () => {
  let log_previous: WeeklyLog,
    log_new1: WeeklyLog,
    log_new2: WeeklyLog,
    log_new3: WeeklyLog,
    log_new4: WeeklyLog;

  const attachment: Attachment = new Attachment(); //创建附件对象

  log_previous = new WeeklyLog(); //创建原型对象
  log_previous.setAttachment(attachment); //添加附件到周报中

  log_new1 = log_previous.clone()!; //调用克隆方法创建克隆对象
  log_new2 = log_previous.clone()!; //调用克隆方法创建克隆对象
  log_new3 = log_previous.clone()!; //调用克隆方法创建克隆对象
  log_new4 = log_previous.clone()!; //调用克隆方法创建克隆对象

  console.log(`周报1是否相同？：${log_previous === log_new1}`);
  console.log(`周报2是否相同？：${log_previous === log_new2}`);
  console.log(`周报3是否相同？：${log_previous === log_new3}`);
  console.log(`周报4是否相同？：${log_previous === log_new4}`);
  console.log(
    `附件1是否相同：${
      log_previous.getAttachment() === log_new1.getAttachment()
    }`
  );
  console.log(
    `附件2是否相同：${
      log_previous.getAttachment() === log_new2.getAttachment()
    }`
  );
  console.log(
    `附件3是否相同：${
      log_previous.getAttachment() === log_new3.getAttachment()
    }`
  );
  console.log(
    `附件4是否相同：${
      log_previous.getAttachment() === log_new4.getAttachment()
    }`
  );
};
```

## 深拷贝

以上成功复制了周报对象，并且是四份不同的周报。但是附件对象并没有被复制，实现了浅克隆。

要把附件对象也一并克隆，实现深拷贝：

修改的周报类：

```ts
// ...
export class WeeklyLog implements Cloneable {
  // ...
  [key: string]: any;

  // ...
  cloneDeep(
    obj: WeeklyLog | null,
    clonedObjects = new WeakMap()
  ): WeeklyLog | null {
    // 如果是基本数据类型或者 null，则直接返回
    if (obj === null || typeof obj !== "object") {
      return obj;
    }

    // 如果已经克隆过该对象，则直接返回克隆的对象，防止循环引用
    if (clonedObjects.has(obj)) {
      return clonedObjects.get(obj);
    }

    // 根据原对象的类型创建新的对象
    const clone = Object.create(Object.getPrototypeOf(obj));
    // 克隆对象的属性，包括函数
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        clone[key] = this.cloneDeep(obj[key], clonedObjects);
      }
    }

    return clone;
  }
}
```

修改的客户端测试方法：

```ts
//...
export const PrototypePatternClient = () => {
  // ...
  const log_new5 = log_previous.cloneDeep(log_previous)!; //深克隆
  console.log(`周报5是否相同：${log_previous === log_new5}`);
  console.log(
    `附件5是否相同：${
      log_previous.getAttachment() === log_new5.getAttachment()
    }`
  );
};
```
