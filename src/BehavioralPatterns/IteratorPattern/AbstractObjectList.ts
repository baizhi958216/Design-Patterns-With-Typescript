import { AbstractIterator } from "./AbstractIterator";

export abstract class AbstractObjectList {
  protected objects: Array<Object> = new Array<Object>();

  constructor(objects: Object[]) {
    this.objects = objects;
  }

  addObject(obj: Object): void {
    this.objects.push(obj);
  }

  removeObject(obj: Object): void {
    this.objects.splice(this.objects.indexOf(obj), 1);
  }

  getObjects(): Object[] {
    return this.objects;
  }

  // 声明创建迭代器对象的抽象工厂方法
  abstract createIterator(): AbstractIterator;
}
