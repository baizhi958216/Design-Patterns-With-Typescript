# Adapter Pattern

The Adapter Pattern converts the interface of a class into another interface that a client expects, allowing incompatible classes to work together.

This involves introducing a role called an `adapter` to coordinate existing structures that are incompatible. This design solution is known as the Adapter Pattern.

There are two variations of the Adapter Pattern: the `Object Adapter Pattern` and the `Class Adapter Pattern`. In the Object Adapter Pattern, the adapter and the adaptee have an association, while the Class Adapter Pattern involves inheritance.

Therefore, the Adapter Pattern consists of three roles: the `Target Abstract Class`, the `Adapter Class`, and the `Adaptee Class`.

Suppose a program has been developed in the past to control the flashing lights and sound alerts of a product. Now, there is a need to develop a toy car that can have flashing lights and sound alerts while in motion. The goal is to reuse the existing code and enhance the flexibility and extensibility of the car control software.

1. Create an abstract class for the car, serving as the Target Abstract Class:

```ts
export abstract class CarController {
  move(): void {
    console.log("Toy car is moving!");
  }

  abstract phonate(): void; // Make a sound
  abstract twinkle(): void; // Flash lights
}
```

2.1. Create a siren class, serving as the Adaptee Class:

```ts
export class PoliceSound {
  alarmSound(): void {
    console.log("Siren sound is activated!");
  }
}
```

2.2. Create a police light class, also serving as the Adaptee:

```ts
export class PoliceLamp {
  alarmLamp(): void {
    console.log("Police lights are flashing!");
  }
}
```

3. Create a police car adapter, serving as the Adapter:

```ts
import { CarController } from "./CarController";
import { PoliceLamp } from "./PoliceLamp";
import { PoliceSound } from "./PoliceSound";

export class PoliceCarAdapter extends CarController {
  #sound: PoliceSound;
  #lamp: PoliceLamp;

  constructor() {
    super();
    this.#sound = new PoliceSound();
    this.#lamp = new PoliceLamp();
  }

  phonate(): void {
    this.#sound.alarmSound();
  }
  twinkle(): void {
    this.#lamp.alarmLamp();
  }
}
```

4. Write a test method:

```ts
import { CarController } from "./CarController";
import { PoliceCarAdapter } from "./PoliceCarAdapter";

export const AdapterPatternClient = () => {
  const car: CarController = new PoliceCarAdapter();
  car.move();
  car.phonate();
  car.twinkle();
};
```

Since TypeScript does not support multiple inheritance, only the Object Adapter can be used in this example, and not the Class Adapter.

In addition to the Adapter Pattern, there are variations such as the `Default Adapter Pattern` and the `Two-Way Adapter` for the Object Adapter.
