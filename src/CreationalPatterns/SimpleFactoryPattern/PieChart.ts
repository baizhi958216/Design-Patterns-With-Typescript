import { Chart } from "./Chart.interface";

export class PieChart implements Chart {
  display(): void {
    console.log("显示饼状图！");
  }
}
