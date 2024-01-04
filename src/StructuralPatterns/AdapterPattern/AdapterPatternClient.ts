import { CarController } from "./CarController";
import { PoliceCarAdapter } from "./PoliceCarAdapter";

export const AdapterPatternClient = () => {
  const car: CarController = new PoliceCarAdapter();
  car.move();
  car.phonate();
  car.twinkle();
};
