# 简单工厂模式

简单工厂模式并不属于 GoF 的 23 种设计模式，但通常将它作为学习其它工厂模式的基础。

首先要有一些产品类，将公共代码进行抽象和提取封装到一个**抽象产品类**，然后每一个具体的产品类都是这个**抽象产品类**的子类，再定义一个工厂类，该类负责根据客户端的请求创建不同类型的产品。客户端可以通过直接调用工厂类的方法，传入不同的参数来获取所需的产品。

因此，简单工厂模式有 3 个角色: `工厂角色`、`抽象产品角色`、`具体产品角色`。

假设我们需要对开发一套图表库，需要提供柱状图、饼状图、折线图等，使用简单工厂模式进行设计。

1. 建立抽象图表接口，充当**抽象产品类**：

```ts
export interface Chart {
  display(): void;
}
```

2. 创建**具体产品类**：

柱状图：

```ts
import { Chart } from "./Chart.interface";

export class HistogramChart implements Chart {
  display(): void {
    console.log("显示柱状图！");
  }
}
```

饼状图：

```ts
import { Chart } from "./Chart.interface";

export class PieChart implements Chart {
  display(): void {
    console.log("显示饼状图！");
  }
}
```

折线图：

```ts
import { Chart } from "./Chart.interface";

export class LineChart implements Chart {
  display(): void {
    console.log("显示折线图！");
  }
}
```

3. 创建**图表工厂类**：

```ts
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
```

4. 客户端测试方法：

```ts
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
```

## 开闭原则

像这样创建具体 Chart 对象时，必须通过**修改客户端代码**中的静态工厂方法的参数来更换具体产品对象，对客户端来说是违反了开闭原则的。

在 Java 中，使用 XML 格式的配置文件来存储参数，然后，编写 XML 解析工具类来读取配置文件，并根据读取到的参数来创建具体产品对象。

对于 TypeScript，我们可以新建一个 config.json，然后在`tsconfig.json`开启`resolveJsonModule`，就可以直接将 json 文件直接读成对象作为配置，可谓是遥遥领先(bushi)。

配置`config.json`：

```json
{
  "chartType": "HistogramChart"
}
```

修改后的**图表工厂类**：

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
        console.log("初始化设置柱状图！");
        return new HistogramChart();
      case "PieChart":
        console.log("初始化设置饼状图！");
        return new PieChart();
      case "LineChart":
        console.log("初始化设置折线图！");
        return new LineChart();
      default:
        console.log("无效的图表类型");
        return null;
    }
  }
}
```

修改后的客户端测试方法：

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
