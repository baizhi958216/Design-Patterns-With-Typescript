# Simple Factory Pattern

The simple factory pattern is not among the 23 design patterns identified by the Gang of Four (GoF), but it is often considered as a foundation for learning other factory patterns.

To begin, there are several product classes, and common code is abstracted and encapsulated into an **abstract product class**. Each specific product class is then a subclass of this **abstract product class**. Next, a factory class is defined, responsible for creating different types of products based on the client's requests. The client can obtain the desired product by directly calling the methods of the factory class and providing different parameters.

Therefore, the simple factory pattern has three roles: `Factory Role`, `Abstract Product Role`, and `Concrete Product Role`.

Suppose we need to develop a chart library that provides bar charts, pie charts, line charts, etc., and we want to use the simple factory pattern for design.

1. Establish an abstract chart interface, serving as the **abstract product class**:

```ts
export interface Chart {
  display(): void;
}
```

2. Create **concrete product classes**:

Bar chart:

```ts
import { Chart } from "./Chart.interface";

export class HistogramChart implements Chart {
  display(): void {
    console.log("Displaying Histogram Chart!");
  }
}
```

Pie chart:

```ts
import { Chart } from "./Chart.interface";

export class PieChart implements Chart {
  display(): void {
    console.log("Displaying Pie Chart!");
  }
}
```

Line chart:

```ts
import { Chart } from "./Chart.interface";

export class LineChart implements Chart {
  display(): void {
    console.log("Displaying Line Chart!");
  }
}
```

3. Create a **chart factory class**:

```ts
import { Chart } from "./Chart.interface";
import { HistogramChart } from "./HistogramChart";
import { LineChart } from "./LineChart";
import { PieChart } from "./PieChart";

export class ChartFactory {
  static createChart(type: string): Chart {
    switch (type) {
      case "HistogramChart":
        console.log("Initializing settings for Histogram Chart!");
        return new HistogramChart();
      case "PieChart":
        console.log("Initializing settings for Pie Chart!");
        return new PieChart();
      case "LineChart":
        console.log("Initializing settings for Line Chart!");
        return new LineChart();
      default:
        throw new Error("Invalid chart type");
    }
  }
}
```

4. Client testing class:

```ts
import { ChartFactory } from "./ChartFactory";
export const SimpleFactoryPatternClient = () => {
  // Create a histogram chart and display
  const HistogramChart = ChartFactory.createChart("HistogramChart");
  HistogramChart.display();

  // Create a pie chart and display
  const PieChart = ChartFactory.createChart("PieChart");
  PieChart.display();

  // Create a line chart and display
  const LineChart = ChartFactory.createChart("LineChart");
  LineChart.display();
};
```

## Open-Closed Principle

When creating concrete `Chart` objects like this, changing the specific product object requires modifying the parameters of the static factory method in the client code, which violates the open-closed principle.

In Java, one approach is to use an XML-formatted configuration file to store parameters. Then, you can write an XML parsing utility class to read the configuration file and create specific product objects based on the parameters.

For TypeScript, you can create a `config.json` file and enable the `resolveJsonModule` option in `tsconfig.json`. This allows you to directly read the JSON file as an object for configuration.

Configuration in `config.json`:

```json
{
  "chartType": "HistogramChart"
}
```

Modified **ChartFactory class**:

```ts
import { Chart } from "./Chart.interface";
import { HistogramChart } from "./HistogramChart";
import { LineChart } from "./LineChart";
import { PieChart } from "./PieChart";
import config from "./config.json";

export class ChartFactory {
  static createChart(): Chart | null {
    const chartType = config.chartType;
    switch (chartType) {
      case "HistogramChart":
        console.log("Initializing settings for Histogram Chart!");
        return new HistogramChart();
      case "PieChart":
        console.log("Initializing settings for Pie Chart!");
        return new PieChart();
      case "LineChart":
        console.log("Initializing settings for Line Chart!");
        return new LineChart();
      default:
        console.log("Invalid chart type");
        return null;
    }
  }
}
```

Modified client testing class:

```ts
import { Chart } from "./Chart.interface";
import { ChartFactory } from "./ChartFactory";

export const SimpleFactoryPatternClient = () => {
  const chart: Chart | null = ChartFactory.createChart();
  if (chart) {
    chart.display();
  }
};
```
