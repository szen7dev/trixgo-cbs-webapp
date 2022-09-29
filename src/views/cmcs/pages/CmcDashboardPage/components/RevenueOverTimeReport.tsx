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

import styles from 'views/cmcs/styles/styles.module.css';

import ListIcon from "assets/images/icon-bulleted-list.svg";
import PolygonIcon from "assets/images/icon-polygon.svg";
import CircleIcon from "assets/images/icon-circle.svg";

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
      data: [300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300],
      backgroundColor: "#206EC3",
      barThickness: 12,
    },
    {
      data: [250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250],
      backgroundColor: "#4A9CDE",
      barThickness: 12,
    },
    {
      data: [200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200],
      backgroundColor: "#5DB908",
      barThickness: 12,
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  layout: {
    padding: {
      top: 30,
      right: 100,
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
      display: false,
      color: "#798295",
      align: "top" as const,
      anchor: "end" as const,
    },
  },
};

const RevenueOverTimeReport: FC = () => {
  return (
    <div className="bg-primary-light px-6 py-4">
      <div className="bg-primary-light h-[240px]">
        <div className="">
          <p className="font-bold text-primary-gray text-lg">
            Tổng thể
          </p>
        </div>

        <div className={styles.barChart}>
          <Bar options={options} data={data} />
        </div>
      </div>
      <div className="flex mt-3">
        <div className="flex gap-3 flex-1 justify-center">
          <div className="flex items-center	"><img className="pr-1" src={CircleIcon} alt="icon" /> Ký: 100</div>
          <div className="flex items-center	"><img className="pr-1" src={CircleIcon} alt="icon" /> Nghiệm thu: 80</div>
          <div className="flex items-center	"><img className="pr-1" src={CircleIcon} alt="icon" /> Tiền về: 60</div>
        </div>
        <div><span className="text-gray-500	">Đơn vị tính: Tỷ đồng</span></div>
      </div>
    </div>
  );
};

export default RevenueOverTimeReport;
