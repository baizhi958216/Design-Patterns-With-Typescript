import { Chart } from "./Chart.interface";

export class HistogramChart implements Chart {
  display(): void {
    console.log("显示柱状图！");
  }
}
