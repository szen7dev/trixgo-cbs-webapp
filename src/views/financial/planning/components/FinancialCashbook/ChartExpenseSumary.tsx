import React, { FC } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  BarController,
  Legend,
  ChartData,
  TimeScale,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import "chartjs-adapter-moment";

ChartJS.register(
  TimeScale,
  // CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  BarController,
  Legend
);

export const options = {};

const labels = Array.from({ length: 12 }).map((_, i) => "MAR.HAR");
const datasets = (v: number) =>
  Array.from({ length: 12 }).map((_, i) => ({
    x: new Date().setMonth(i + 1),
    // x: `2021-${Math.ceil(i / 30)}-${i % 30}`,
    // x: (new Date()).setMonth(i),
    y: Math.round(Math.random() * v),
  }));

export const data: ChartData<"bar", { x: number; y: number }[], string> = {
  // labels,
  datasets: [
    {
      label: "Dataset 1",
      data: datasets(1000),
      // data: labels.map(() => Math.round(Math.random() * 1000)),
      backgroundColor: "#1A97F5",
      barThickness: 12,
      maxBarThickness: 12,
    },
    {
      label: "Dataset 2",
      data: datasets(1000),
      // data: labels.map(() => Math.round(Math.random() * 1000)),
      backgroundColor: "#1E4DB7",
      barThickness: 12,
      maxBarThickness: 12,
    },
  ],
};

const ChartExpenseSumary: FC<React.HTMLAttributes<HTMLElement>> = ({ ...props }) => {
  return (
    <Bar
      data={{
        datasets: [
          {
            label: "Dataset 1",
            data: datasets(1000),
            // data: labels.map(() => Math.round(Math.random() * 1000)),
            backgroundColor: "#1A97F5",
            barThickness: 8,
            maxBarThickness: 8,
          },
          {
            label: "Dataset 2",
            data: datasets(2000),
            // data: labels.map(() => Math.round(Math.random() * 1000)),
            backgroundColor: "#1E4DB7",
            barThickness: 8,
            maxBarThickness: 8,
          },
        ],
      }}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        locale: "en-US",
        plugins: {
          tooltip: {
            enabled: true,
          },
          legend: {
            // position: 'top' as const,
            display: false,
          },
          title: {
            display: false,
            // text: 'Chart.js Bar Chart',
          },
          datalabels: {
            align: "top",
            anchor: "end",
            clamp: true,
            display: false,
          },
        },
        layout: {
          padding: {
            top: 24,
            right: 10,
          },
        },
        scales: {
          x: {
            grid: { display: false },
            type: "time",

            time: {
              unit: "month",
              minUnit: "month",
              round: "month",
              displayFormats: {
                month: "MM",
              },
            },
          },
          y: {
            grid: { display: false },
            axis: "y",
            ticks: {
              stepSize: 500,
            },
          },
        },
      }}
      {...props}
    />
  );
};

export default ChartExpenseSumary;
