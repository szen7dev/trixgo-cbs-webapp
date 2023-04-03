import { FC } from "react";

import cn from "classnames";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

import styles from "views/support/styles/support.module.css";

import ListIcon from "assets/images/icon-bulleted-list.svg";
import PolygonIcon from "assets/images/icon-polygon.svg";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

const data = {
  labels: [
    ["DFF.Công ty Cổ phần"," Tập đoàn Đua Fat"],
    ["DFF.Công ty Cổ phần"," Tập đoàn Đua Fat"],
    ["DFF.Công ty Cổ phần"," Tập đoàn Đua Fat"],
    ["DFF.Công ty Cổ phần"," Tập đoàn Đua Fat"],
    ["DFF.Công ty Cổ phần"," Tập đoàn Đua Fat"],
    ["DFF.Công ty Cổ phần"," Tập đoàn Đua Fat"],
    ["DFF.Công ty Cổ phần"," Tập đoàn Đua Fat"],
    ["DFF.Công ty Cổ phần"," Tập đoàn Đua Fat"],
  ],
  datasets: [
    {
      data: [300, 150, 202, 188, 228, 205, 233, 228],
      backgroundColor: "#39CAAC",
      barThickness: 30,
      barPercentage: 0.5,
      categoryPercentage: 5,
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,

  scales: {
    x: {
      grid: {
        display: false,
        align: "end" as const,
        anchor: "start" as const,
      },
      ticks: {
        color: "#798295",
        rotation: "-45",
        font: {
            size: 12,
        },
      },
    },
    y: {
      min: 100,
      max: 350,
      grid: {
        display: false,
        drawBorder: false,
      },
      ticks: {
        stepSize: 1,
        color: "#798295",
        callback: function (arr: number | string) {
          switch (arr) {
            case 0:
              return "0";
            case 100:
              return "100";
            case 200:
              return "200";
            case 300:
              return "300";
          }
        },
      },
    },
  },

  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
    tooltip: {
      enabled: false,
    },
    datalabels: {
      display: true,
      color: "#798295",
      align: "top" as const,
      anchor: "end" as const,
    },
  },
};

const BiddingReportChart: FC = () => {
  return (
    <section className="w-full h-[300px] px-6 py-4 flex flex-col justify-between bg-primary-light">
      <div className="flex items-center justify-between mb-1.5">
        <p className="font-bold text-primary-gray text-lg">
          Doanh thu theo thời gian
        </p>

        <div className="flex items-center">
            Đơn vị tính: tỷ đồng
        </div>
      </div>

      <div>
        <Bar className="height-250" options={options} data={data} />
      </div>
    </section>
  );
};

export default BiddingReportChart;
