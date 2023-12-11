import { Chart } from "./Chart.interface";
import { ChartFactory } from "./ChartFactory";

export const SimpleFactoryPatternClient = () => {
  const chart: Chart | null = ChartFactory.createChart();
  if (chart) {
    chart.display();
  }
};
