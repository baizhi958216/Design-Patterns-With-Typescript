export abstract class CarController {
  move(): void {
    console.log("玩具汽车移动！");
  }

  abstract phonate(): void; // 发出声音
  abstract twinkle(): void; // 灯光闪烁
}
