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
  subtitle: string,
  options?: { titleSize?: number; subtitleSize?: number; bold?: boolean }
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

        ctx.fillStyle = "black";
        ctx.fillText(title, width / 2, height / 2);

        const theCenterText = subtitle;
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.font = (options?.subtitleSize || 15) + "px Arial";
        ctx.fillStyle = "rgba(121, 130, 149, 1)";

        ctx.fillText(theCenterText, width / 2, height / 2 + 20);
        ctx.save();
      },
    },
    // {
    //   id: "beforeDraw",
    //   afterDraw: (chart: IChart) => {
    //     const ctx = chart.ctx;
    //   }
    // }
  ];
};

export default getPlugins;
