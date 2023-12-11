import { Chart } from "./Chart.interface";
import { HistogramChart } from "./HistogramChart";
import { LineChart } from "./LineChart";
import { PieChart } from "./PieChart";

export class ChartFactory {
  static createChart(type: string): Chart {
    switch (type) {
      case "HistogramChart":
        console.log("初始化设置柱状图！");
        return new HistogramChart();
      case "PieChart":
        console.log("初始化设置饼状图！");
        return new PieChart();
      case "LineChart":
        console.log("初始化设置折线图！");
        return new LineChart();
      default:
        throw new Error("无效的图表类型");
    }
  }
}
