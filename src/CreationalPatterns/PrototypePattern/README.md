# Prototype Pattern

The Prototype Pattern involves specifying the type of object to create by using a prototype instance and creating new objects by copying this prototype.

Instead of creating objects using a constructor, this pattern improves performance and reduces code duplication in situations where multiple similar objects need to be created.

The process begins with the creation of a prototype object, and new objects are then created by copying this prototype. The initial state of the new object is obtained by cloning the prototype object, which contains the properties and methods to be copied.

Therefore, the Prototype Pattern consists of three roles: `Abstract Prototype Class`, `Concrete Prototype Class`, and `Client Class`.

To illustrate the pattern, let's assume the goal is to improve the efficiency of creating weekly reports by developing a mechanism that can quickly create identical or similar reports, including attachments.

1. Establish the Attachment class, acting as a member class:

```typescript
export class Attachment {
  name: string | undefined;

  setName(name: string) {
    this.name = name;
  }

  getName() {
    return this.name;
  }

  download() {
    console.log("Downloading attachment, filename: " + this.name);
  }
}
```

2.1. Create the abstract `Cloneable` interface:

```typescript
export interface Cloneable {
  clone(): Cloneable | null;
}
```

2.2. Build the WeeklyLog class, acting as the concrete prototype class:

```typescript
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
      console.log("Cloning not supported!!");
      return null;
    }
  }
}
```

3. Write a client test method:

```typescript
import { Attachment } from "./Attachment";
import { WeeklyLog } from "./WeeklyLog";

export const PrototypePatternClient = () => {
  let log_previous: WeeklyLog,
    log_new1: WeeklyLog,
    log_new2: WeeklyLog,
    log_new3: WeeklyLog,
    log_new4: WeeklyLog;

  const attachment: Attachment = new Attachment();

  log_previous = new WeeklyLog();
  log_previous.setAttachment(attachment);

  log_new1 = log_previous.clone()!;
  log_new2 = log_previous.clone()!;
  log_new3 = log_previous.clone()!;
  log_new4 = log_previous.clone()!;

  console.log(`Report 1 is the same？：${log_previous === log_new1}`);
  console.log(`Report 2 is the same？：${log_previous === log_new2}`);
  console.log(`Report 3 is the same？：${log_previous === log_new3}`);
  console.log(`Report 4 is the same？：${log_previous === log_new4}`);
  console.log(
    `Annex is the same？：${
      log_previous.getAttachment() === log_new1.getAttachment()
    }`
  );
  console.log(
    `Annex is the same？：${
      log_previous.getAttachment() === log_new2.getAttachment()
    }`
  );
  console.log(
    `Annex is the same？：${
      log_previous.getAttachment() === log_new3.getAttachment()
    }`
  );
  console.log(
    `Annex is the same？：${
      log_previous.getAttachment() === log_new4.getAttachment()
    }`
  );
};
```

## Deep Copy

The above successfully copied the WeeklyLog objects, creating four distinct reports. However, the Attachment objects were not copied, resulting in a shallow clone.

To achieve a deep copy, including the Attachment objects:

Modify the WeeklyLog class:

```typescript
// ...
export class WeeklyLog implements Cloneable {
  // ...
  [key: string]: any;

  // ...
  cloneDeep(
    obj: WeeklyLog | null,
    clonedObjects = new WeakMap()
  ): WeeklyLog | null {
    // If it is a primitive data type or null, return it directly
    if (obj === null || typeof obj !== "object") {
      return obj;
    }

    // If the object has already been cloned, return the cloned object to prevent circular references
    if (clonedObjects.has(obj)) {
      return clonedObjects.get(obj);
    }

    // Create a new object based on the type of the original object
    const clone = Object.create(Object.getPrototypeOf(obj));
    // Clone the properties of the object, including functions
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        clone[key] = this.cloneDeep(obj[key], clonedObjects);
      }
    }

    return clone;
  }
}
```

Modify the client test method:

```typescript
//...
export const PrototypePatternClient = () => {
  // ...
  const log_new5 = log_previous.cloneDeep(log_previous)!; //深克隆
  console.log(`Report 5 is the same?：${log_previous === log_new5}`);
  console.log(
    `Annex is the same?：${
      log_previous.getAttachment() === log_new5.getAttachment()
    }`
  );
};
```
