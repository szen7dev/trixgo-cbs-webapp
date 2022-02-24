/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ChartData,
  CoreChartOptions,
  DatasetChartOptions,
  DoughnutControllerChartOptions,
  ElementChartOptions,
  Plugin,
  PluginChartOptions,
  ScaleChartOptions,
} from "chart.js";
import { AnyObject } from "chart.js/types/basic";
import { _DeepPartialObject } from "chart.js/types/utils";

export const optionsOne: _DeepPartialObject<
  CoreChartOptions<"doughnut"> &
    ElementChartOptions<"doughnut"> &
    PluginChartOptions<"doughnut"> &
    DatasetChartOptions<"doughnut"> &
    ScaleChartOptions<"doughnut"> &
    DoughnutControllerChartOptions
> = {
  // elements: {
  //   arc: {},
  // },
  // maintainAspectRatio: false,
  cutout: 60,
  rotation: 90,
  plugins: {
    datalabels: {
      display: false,
    },
    tooltip: {
      enabled: false,
    },
    legend: {
      display: false,
      position: "right",
      align: "center",

      labels: {
        usePointStyle: true,
        boxHeight: 8,
        boxWidth: 8,
        padding: 11,
        // boxPadding: 30,
      },
    },
  },
};

function getPlugins(
  title: string,
  subtitle: string,
  options?: { titleSize?: number; subtitleSize?: number; bold?: boolean }
): Plugin<"doughnut", AnyObject>[] {
  return [
    {
      id: "beforeDraw",
      afterDraw(chart) {
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
        ctx.fillText(
          (chart as any)._metasets.reduce(
            (pre: number, next: any) => pre + next.total,
            0
          ),
          width / 2,
          height / 2 - 10
        );

        const theCenterText = subtitle;
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.font = (options?.subtitleSize || 15) + "px Arial";
        ctx.fillStyle = "rgba(121, 130, 149, 1)";

        ctx.fillText(theCenterText, width / 2, height / 2 + 10);
        ctx.save();
      },
    },
  ];
}

export const _data: ChartData<"doughnut", number[], unknown> = {
  labels: [
    "Chưa bắt đầu",
    "Lập kế hoạch",
    "Thiết kế",
    "Đấu thầu",
    "Xây dựng",
    "Khác",
  ],
  datasets: [
    {
      data: [0, 0, 0, 0, 0, 0],
      backgroundColor: [
        "rgba(44, 134, 237, 1)",
        "rgba(255, 165, 0, 1)",
        "rgba(155, 89, 182, 1)",
        "rgba(224, 59, 86, 1)",
        "rgba(0, 202, 153, 1)",
        "rgba(219, 231, 242, 1)",
      ],
      borderWidth: 0,
    },
  ],
};

export const _dataTwo = {
  datasets: [
    {
      label: "# of Votes",
      data: [60, 180, 120],
      backgroundColor: ["#00CA99", "#FF9900", "#F55F5F"],
      borderWidth: 0,
    },
  ],
};

export default getPlugins;
