import { FC } from "react";
import cloneDeep from 'lodash/cloneDeep';
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
import _ from "lodash";
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
      enabled: true,
    },
    datalabels: {
      display: false,
    },
  },
};
const dataNew = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",],
  datasets: [
    {
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
      backgroundColor: "#2a90fb",
      barThickness: 8,
    },
    {
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
      backgroundColor: "#0060E1",
      barThickness: 8,
    },
    {
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
      backgroundColor: "#10b981",
      barThickness: 8,
    },
  ],
}
type Props = {
  typeYear: string
};
const StatisticsByDeviceSupport: FC<Props> = (props) => {
  const { typeYear } = props;
  console.log('typeYear',typeYear)
const { listDevice } = useFetchSupport();
console.log('listDevice',listDevice)
for (const element of listDevice) {
  if(Number(element._id.month) === 1) {
    dataNew.datasets[0].data[0] = element.data[0] ? Number(element.data[0].amountAccesses) : Number(0);
    dataNew.datasets[1].data[0] = element.data[1] ? Number(element.data[1].amountAccesses) : Number(0);
    dataNew.datasets[2].data[0] = element.data[2] ? Number(element.data[2].amountAccesses) : Number(0);
  }
  if(Number(element._id.month) === 2) {
    dataNew.datasets[0].data[1] = element.data[0] ? Number(element.data[0].amountAccesses) : Number(0);
    dataNew.datasets[1].data[1] = element.data[1] ? Number(element.data[1].amountAccesses) : Number(0);
    dataNew.datasets[2].data[1] = element.data[2] ? Number(element.data[2].amountAccesses) : Number(0);
  }
  if(Number(element._id.month) === 3) {
    dataNew.datasets[0].data[2] = element.data[0] ? Number(element.data[0].amountAccesses) : Number(0);
    dataNew.datasets[1].data[2] = element.data[1] ? Number(element.data[1].amountAccesses) : Number(0);
    dataNew.datasets[2].data[2] = element.data[2] ? Number(element.data[2].amountAccesses) : Number(0);
  }
  if(Number(element._id.month) === 4) {
    dataNew.datasets[0].data[3] = element.data[0] ? Number(element.data[0].amountAccesses) : Number(0);
    dataNew.datasets[1].data[3] = element.data[1] ? Number(element.data[1].amountAccesses) : Number(0);
    dataNew.datasets[2].data[3] = element.data[2] ? Number(element.data[2].amountAccesses) : Number(0);
  }
  if(Number(element._id.month) === 5) {
    dataNew.datasets[0].data[4] = element.data[0] ? Number(element.data[0].amountAccesses) : Number(0);
    dataNew.datasets[1].data[4] = element.data[1] ? Number(element.data[1].amountAccesses) : Number(0);
    dataNew.datasets[2].data[4] = element.data[2] ? Number(element.data[2].amountAccesses) : Number(0);
  }
  if(Number(element._id.month) === 6) {
    dataNew.datasets[0].data[5] = element.data[0] ? Number(element.data[0].amountAccesses) : Number(0);
    dataNew.datasets[1].data[5] = element.data[1] ? Number(element.data[1].amountAccesses) : Number(0);
    dataNew.datasets[2].data[5] = element.data[2] ? Number(element.data[2].amountAccesses) : Number(0);
  }
  if(Number(element._id.month) === 7) {
    dataNew.datasets[0].data[6] = element.data[0] ? Number(element.data[0].amountAccesses) : Number(0);
    dataNew.datasets[1].data[6] = element.data[1] ? Number(element.data[1].amountAccesses) : Number(0);
    dataNew.datasets[2].data[6] = element.data[2] ? Number(element.data[2].amountAccesses) : Number(0);
  }
  if(Number(element._id.month) === 8) {
    dataNew.datasets[0].data[7] = element.data[0] ? Number(element.data[0].amountAccesses) : Number(0);
    dataNew.datasets[1].data[7] = element.data[1] ? Number(element.data[1].amountAccesses) : Number(0);
    dataNew.datasets[2].data[7] = element.data[2] ? Number(element.data[2].amountAccesses) : Number(0);
  }
  if(Number(element._id.month) === 9) {
    dataNew.datasets[0].data[8] = element.data[0] ? Number(element.data[0].amountAccesses) : Number(0);
    dataNew.datasets[1].data[8] = element.data[1] ? Number(element.data[1].amountAccesses) : Number(0);
    dataNew.datasets[2].data[8] = element.data[2] ? Number(element.data[2].amountAccesses) : Number(0);
  }
  if(Number(element._id.month) === 10) {
    dataNew.datasets[0].data[9] = element.data[0] ? Number(element.data[0].amountAccesses) : Number(0);
    dataNew.datasets[1].data[9] = element.data[1] ? Number(element.data[1].amountAccesses) : Number(0);
    dataNew.datasets[2].data[9] = element.data[2] ? Number(element.data[2].amountAccesses) : Number(0);
  }
  if(Number(element._id.month) === 11) {
    dataNew.datasets[0].data[10] = element.data[0] ? Number(element.data[0].amountAccesses) : Number(0);
    dataNew.datasets[1].data[10] = element.data[1] ? Number(element.data[1].amountAccesses) : Number(0);
    dataNew.datasets[2].data[10] = element.data[2] ? Number(element.data[2].amountAccesses) : Number(0);
  }
  if(Number(element._id.month) === 12) {
    dataNew.datasets[0].data[11] = element.data[0] ? Number(element.data[0].amountAccesses) : Number(0);
    dataNew.datasets[1].data[11] = element.data[1] ? Number(element.data[1].amountAccesses) : Number(0);
    dataNew.datasets[2].data[11] = element.data[2] ? Number(element.data[2].amountAccesses) : Number(0);
  }
}
  const dataNewList = _.cloneDeep(dataNew);
  return (
    <section className="w-full h-[358px] py-4 px-6 bg-primary-light">
      <p className="text-primary-gray font-bold text-lg">
        Thống kê theo thiết bị
      </p>

      <div className="flex items-center relative">
        <div className="w-11/12 h-[320px]">
          <Bar options={options} data={dataNewList} />
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
