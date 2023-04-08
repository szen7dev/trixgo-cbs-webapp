import { FC } from "react";
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
import { useListAppAccess } from 'services/hooks/useSupport';
import _ from "lodash";
import { checkTimeType } from "utils/app";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// const data = {
//   labels: [
//     "Quản lý công việc",
//     "Quản lý hồ sơ văn bản",
//     "Quản lý hợp đồng",
//     "Quản lý nhân sự",
//     "Quản lý ...",
//     "Quản lý ...",
//     "Quản lý ...",
//     "Quản lý ...",
//     "Quản lý ...",
//     "Quản lý ...",
//     "Quản lý ...",
//     "Quản lý ...",
//   ],
//   datasets: [
//     {
//       data: [
//         2780, 3780, 2780, 2780, 2780, 2780, 2780, 2780, 2780, 2780, 2780, 2780,
//       ],
//       backgroundColor: "#f59f0b",
//       barThickness: 12,
//     },
//   ],
// };

const dataNew = {
  labels: [
    "Quản lý công việc",
    "Quản lý hồ sơ văn bản",
    "Quản lý hợp đồng",
    "Quản lý nhân sự",
    "Quản lý ...",
    "Quản lý ...",
    "Quản lý ...",
    "Quản lý ...",
    "Quản lý ...",
    "Quản lý ...",
    "Quản lý ...",
    "Quản lý ...",
  ],
  datasets: [
    {
      data: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      ],
      backgroundColor: "#f59f0b",
      barThickness: 12,
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  layout: {
    padding: {
      top: 20,
      right: 20,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        autoSkip: false,
        maxRotation: 50,
        minRotation: 50,
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
      display: true,
      color: "#798295",
      align: "top" as const,
      anchor: "end" as const,
    },
  },
};

type Props = {
  timeType: string;
};

const StatisticsByApp: FC<Props> = (props) => {
  const { timeType } = props;
  const listParam = checkTimeType(timeType);
  const { listAppAccess } = useListAppAccess(listParam);
  const arrApp = [];
  const arrAmountAccesses = [];

  for (const element of listAppAccess) {
    arrApp.push(element._id.app.name);
    arrAmountAccesses.push(element.amountAccesses);
    dataNew.datasets[0].data = arrAmountAccesses
  }

  dataNew.labels = arrApp;
  const dataNewApp = _.cloneDeep(dataNew);

  return (
    <section className="w-full h-[462px] py-4 px-6 mt-3 bg-primary-light">
      <p className="text-primary-gray font-bold text-lg">
        Thống kê theo ứng dụng
      </p>
      <div className="h-96">
        <Bar options={options} data={dataNewApp} />
      </div>
    </section>
  );
};

export default StatisticsByApp;
