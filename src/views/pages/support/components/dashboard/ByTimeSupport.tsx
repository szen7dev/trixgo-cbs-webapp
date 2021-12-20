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

import styles from "../../styles.module.css";

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
    "T1",
    "T2",
    "T3",
    "T4",
    "T5",
    "T6",
    "T7",
    "T8",
    "T9",
    "T10",
    "T11",
    "T12",
  ],
  datasets: [
    {
      data: [300, 150, 202, 188, 228, 205, 233, 174, 206, 222, 245, 268],
      backgroundColor: "#1A97F5",
      barThickness: 12,
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  layout: {
    padding: {
      top: 21,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
        align: "end" as const,
        anchor: "start" as const,
      },
    },
    y: {
      grid: {
        display: false,
        drawBorder: false,
      },
      ticks: {
        min: 0,
        max: 3,
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

const ByTimeSupport: FC = () => {
  return (
    <section
      className={cn(
        "w-3/5 h-60 px-6 py-4 flex flex-col justify-between",
        styles.borderTop,
        styles.borderBottom,
        styles.borderLeft
      )}
    >
      <div className="flex items-center justify-between">
        <p className="font-bold text-primary-gray text-lg">
          Doanh thu theo thời gian
        </p>

        <div className="flex items-center">
          <div className="flex items-center">
            <div
              className={cn(
                "flex items-center justify-around h-8 w-20 rounded-l cursor-pointer",
                styles.bgMonth
              )}
            >
              <img src={ListIcon} alt="List" />
              <span className="text-sm text-primary">Tháng</span>
            </div>

            <div
              className={cn(
                "flex items-center justify-around h-8 w-20 rounded-r cursor-pointer",
                styles.bgQuarter
              )}
            >
              <img src={ListIcon} alt="List" />
              <span className="text-sm text-secondary-gray">Quý</span>
            </div>
          </div>
          <button className="flex items-center justify-around w-28 h-8 border border-secondary-gray ml-3 rounded">
            <img src={PolygonIcon} alt="Polygon" />
            <span className="text-sm text-secondary-gray">Năm 2022</span>
          </button>
        </div>
      </div>

      <div>
        <Bar options={options} data={data} />
      </div>
    </section>
  );
};

export default ByTimeSupport;
