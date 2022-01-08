import {FC, useState, useEffect, useCallback} from "react";

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

import { useFetchSupport } from 'services/hooks/useSupport';
import { number } from "yup";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const options = {
  responsive: true,
  maintainAspectRatio: false,
  layout: {
    padding: {
      top: 20,
      right: 20,
      bottom: 20,
    },
    height: 200,
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      grid: {
        display: false,
        drawBorder: false,
      },
      ticks: {
        color: "#798295",
        callback: function (value: number | string) {
          switch (value) {
            case 1000:
              return "1k";
            case 2000:
              return "2k";
            case 3000:
              return "3k";
            case 4000:
              return "4k";
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
    },
  },
};
const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",],
  datasets: [
    {
      data: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 18,
      ],
      backgroundColor: "#2a90fb",
      barThickness: 8,
    },
    {
      data: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
      ],
      backgroundColor: "#0060E1",
      barThickness: 8,
    },
    {
      data: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100,
      ],
      backgroundColor: "#10b981",
      barThickness: 8,
    },
  ],
};
const StatisticsByDeviceSupport: FC = () => {
const { listDevice } = useFetchSupport();
console.log('listDevice',listDevice)
const arMonth : number[] = [];
for (const element of listDevice) {
    arMonth.push(element._id.month);

  const groupBy = <T, K extends keyof any>(list: T[], getKey: (item: T) => K) =>
      list.reduce((previous, currentItem) => {
        const group = getKey(currentItem);
        if (!previous[group]) previous[group] = [];
        previous[group].push(currentItem);
        return previous;
      }, {} as Record<K, T[]>);
  type ListTypeDevice = {
    type: number;
    amountAccesses: number;
  };

  const people: ListTypeDevice[] = element.data
  const results = groupBy(people, i => i.type);
  console.log('results',results)

}
const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",],
    datasets: listDevice.map((item, index)=>{
      return {
            data: arMonth,
            backgroundColor: "#2a90fb",
            barThickness: 8,
          }
    })
}
console.log('arMonth',arMonth)
  return (
    <section className="w-full h-[358px] py-4 px-6 bg-primary-light">
      <p className="text-primary-gray font-bold text-lg">
        Thống kê theo thiết bị
      </p>

      <div className="flex items-center relative">
        <div className="w-11/12 h-[320px]">
          <Bar options={options} data={chartData} />
        </div>
        <div className="w-1/12 absolute flex justify-center right-0 bottom-5">
          <div className="flex flex-col gap-1">
            <div className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-secondary mr-1" />
              <span className="text-sm text-secondary">Mobile</span>
            </div>

            <div className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-primary mr-1" />
              <span className="text-sm text-primary">Web</span>
            </div>

            <div className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-positive mr-1" />
              <span className="text-sm text-positive">Tablet</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatisticsByDeviceSupport;
