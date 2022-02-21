/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Chart as ChartJS,
  BubbleDataPoint,
  ChartTypeRegistry,
  ScatterDataPoint,
} from "chart.js";

type IChart = ChartJS<
  keyof ChartTypeRegistry,
  (number | ScatterDataPoint | BubbleDataPoint | null)[],
  unknown
>;

const getPlugins = (
  title: string,
  options?: { titleSize?: number; bold?: boolean }
): any[] => {
  return [
    {
      id: "beforeDraw",
      beforeDraw(chart: IChart): void {
        const width = chart.width,
          height = chart.height,
          ctx = chart.ctx;

        ctx.restore();
        ctx.font =
          (options?.bold ? "bold " : "") +
          (options?.titleSize || 30) +
          "px Arial";

        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.fillStyle = "black";
        ctx.fillText(title, width / 2, height / 2 + 8);
        ctx.save();
      },
    },
  ];
};

export default getPlugins;
