import { Attachment } from "./Attachment";
import { Cloneable } from "./Cloneable";

export class WeeklyLog implements Cloneable {
  attachment: Attachment | undefined;
  name: String | undefined;
  date: String | undefined;
  content: String | undefined;
  [key: string]: any;

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
