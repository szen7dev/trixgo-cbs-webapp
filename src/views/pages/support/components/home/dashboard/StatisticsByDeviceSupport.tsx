import {FC, useState, useEffect, useCallback} from "react";
// const _ = require("lodash");
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
// const arMonth : number[] = [];
// const arTypeDevice = [];
// const arAccesses : number[] = [];
// const dataDevice = [];
// for (const element of listDevice) {
//     arMonth.push(element._id.month);
//     for(const item of element.data){
//       arTypeDevice.push(item.type);
//       arAccesses.push(item.amountAccesses);
//       dataDevice.push(element.data);
//     }
// }
  // const groupBy = function(xs : any, key :any) {
  //   return xs.reduce(function(rv : any, x :any) {
  //     (rv[x[key]] = rv[x[key]] || []).push(x);
  //     return rv;
  //   }, {});
  // };

  // console.log(groupBy(dataDevice, 'length'));
// const chartData = {
//     labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",],
//     datasets: listDevice.map((item, index)=>{
//       console.log('item',item)
//       return {
//             data: arAccesses,
//             backgroundColor: "#2a90fb",
//             barThickness: 8,
//           }
//     })
// }

  // const raw = [
  //       { statusId: 0, firstName: "Joe", status: "appealed", count: 1 },
  //         { statusId: 0, firstName: "Jane", status: "approved", count: 100 },
  //         { statusId: 0, firstName: "Smith", status: "approved", count: 63 },
  //         { statusId: 0, firstName: "Mike", status: "approved", count: 63 },
  //         { statusId: 0, firstName: "Ken", status: "approved", count: 35 },
  //         { statusId: 0, firstName: "Kim", status: "approved", count: 193 },
  //         { statusId: 0, firstName: "JoeJoe", status: "approved", count: 1 },
  //         { statusId: 0, firstName: "Jane", status: "closed", count: 1 },
  //         { statusId: 0, firstName: "Joe", status: "concluded", count: 1 },
  //         { statusId: 0, firstName: "Jane", status: "denied", count: 6 },
  //         { statusId: 0, firstName: "Smith", status: "denied", count: 9 },
  //         { statusId: 0, firstName: "Mike", status: "denied", count: 1 },
  //         { statusId: 0, firstName: "Mark", status: "denied", count: 8 },
  //         { statusId: 0, firstName: "Ken", status: "denied", count: 2 },
  //         { statusId: 0, firstName: "Kim", status: "denied", count: 20 },
  //         { statusId: 0, firstName: "Joe", status: "denied", count: 2 },
  //         { statusId: 0, firstName: "Joe", status: "transferred", count: 1 }
  // ];
  const nameIndices = Object.create(null);
  const statusHash = Object.create(null);
  const data = {
    labels: [],
    datasets: []
  };
  const arAccesses : number[] = [];
  listDevice.forEach(function (item1) {
    for(const item of item1.data){
      arAccesses.push(item.amountAccesses);
      if (!(item.type in nameIndices)) {
        nameIndices[item.type] = data.labels.push(item.firstName) - 1;
        data.datasets.forEach(function (a) {
          a.data.push(0);
        });
      }
      if (!statusHash[item._id.month]) {
        statusHash[item._id.month] = {
          label: item._id.month,
          fillcolor: 'f00',
          data: data.labels.map(function () {
            return 0;
          })
        };
        data.datasets.push(statusHash[item._id.month]);
      }
      statusHash[item._id.month].data[nameIndices[item.firstName]] = item.count;
    }
  });

  console.log(data);

  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",],
    datasets: [
      {
        data: arAccesses,
        backgroundColor: "#2a90fb",
        barThickness: 8,
      },
      {
        data: arAccesses,
        backgroundColor: "#0060E1",
        barThickness: 8,
      },
      {
        data: arAccesses,
        backgroundColor: "#10b981",
        barThickness: 8,
      },
    ],
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
