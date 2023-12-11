import { ChartFactory } from "./ChartFactory";
export const SimpleFactoryPatternClient = () => {
  // 创建一个柱状图并绘制
  const HistogramChart = ChartFactory.createChart("HistogramChart");
  HistogramChart.display();

  // 创建一个饼状图并绘制
  const PieChart = ChartFactory.createChart("PieChart");
  PieChart.display();

  // 创建一个折线图并绘制
  const LineChart = ChartFactory.createChart("LineChart");
  LineChart.display();
};
