/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Chart,
  Plugin,
} from "chart.js";
import { AnyObject } from "chart.js/types/basic";

export const optionsOne = {
  cutout: 55,
  rotation: 90,
  plugins: { datalabels: { display: false } },
};

function getPlugins(
  title: string,
  subtitle: string,
  options?: { titleSize?: number; subtitleSize?: number; bold?: boolean }
): Plugin<"doughnut", AnyObject>[] {
  return [
    {
      id: "beforeDraw",
      // beforeDraw(chart): void {
      //   const width = chart.width,
      //     height = chart.height,
      //     ctx = chart.ctx;

      //   ctx.restore();
      //   ctx.font =
      //     (options?.bold ? "bold " : "") +
      //     (options?.titleSize || 30) +
      //     "px Arial";

      //   ctx.textBaseline = "middle";

      //   ctx.fillStyle = "black";
      //   ctx.fillText(title, width / 2, height / 2);

      //   const theCenterText = subtitle;
      //   ctx.textBaseline = "middle";
      //   ctx.textAlign = "center";
      //   ctx.font = (options?.subtitleSize || 15) + "px Arial";
      //   ctx.fillStyle = "rgba(121, 130, 149, 1)";

      //   ctx.fillText(theCenterText, width / 2, height / 2 + 20);
      //   ctx.save();
      // }
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
          height / 2
        );

        const theCenterText = subtitle;
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.font = (options?.subtitleSize || 15) + "px Arial";
        ctx.fillStyle = "rgba(121, 130, 149, 1)";

        ctx.fillText(theCenterText, width / 2, height / 2 + 20);
        ctx.save();
      },
    },
  ];
}

export const _data = {
  datasets: [
    {
      label: "# of Votes",
      data: [],
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
