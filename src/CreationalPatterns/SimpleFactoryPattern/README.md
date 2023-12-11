# Simple Factory Pattern

The simple factory pattern is not among the 23 design patterns identified by the Gang of Four (GoF), but it is often considered as a foundation for learning other factory patterns.

To begin, there are several product classes, and common code is abstracted and encapsulated into an **abstract product class**. Each specific product class is then a subclass of this **abstract product class**. Next, a factory class is defined, responsible for creating different types of products based on the client's requests. The client can obtain the desired product by directly calling the methods of the factory class and providing different parameters.

Therefore, the simple factory pattern has three roles: `Factory Role`, `Abstract Product Role`, and `Concrete Product Role`.

Suppose we need to develop a chart library that provides bar charts, pie charts, line charts, etc., and we want to use the simple factory pattern for design.

1. Establish an abstract chart interface, serving as the **abstract product class**:

```ts
interface Chart {
  display(): void;
}
```

2. Create **concrete product classes**:

Bar chart:

```ts
import { Chart } from "./chart";

export class HistogramChart implements Chart {
  display(): void {
    console.log("Displaying Histogram Chart!");
  }
}
```

Pie chart:

```ts
import { Chart } from "./chart";

export class PieChart implements Chart {
  display(): void {
    console.log("Displaying Pie Chart!");
  }
}
```

Line chart:

```ts
import { Chart } from "./chart";

export class LineChart implements Chart {
  display(): void {
    console.log("Displaying Line Chart!");
  }
}
```

3. Create a **chart factory class**:

```ts
import { Chart } from "./chart";
import { HistogramChart } from "./histogramChart";
import { PieChart } from "./pieChart";
import { LineChart } from "./lineChart";

export class ChartFactory {
  createChart(type: string): Chart {
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
import { ChartFactory } from "./chartFactory";

// Create a histogram chart and display
const histogramChart = ChartFactory.createChart("HistogramChart");
histogramChart.display();

// Create a pie chart and display
const pieChart = ChartFactory.createChart("PieChart");
pieChart.display();

// Create a line chart and display
const lineChart = ChartFactory.createChart("LineChart");
lineChart.display();
```
