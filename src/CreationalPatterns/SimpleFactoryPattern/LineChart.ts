import { Chart } from "./Chart.interface";

export class LineChart implements Chart {
  display(): void {
    console.log("显示折线图！");
  }
}
