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
