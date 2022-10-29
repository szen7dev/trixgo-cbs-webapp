import { FC, useMemo } from "react";

// import cn from "classnames";
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

// import ListIcon from "assets/images/icon-bulleted-list.svg";
// import PolygonIcon from "assets/images/icon-polygon.svg";
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

const options = {
  responsive: true,
  maintainAspectRatio: false,
  layout: {
    padding: {
      top: 30,
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
        max: 5,
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
            case 400:
              return "400";
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

const arrMonths = Array.from({ length: 12 }, () => 0);

const Chartkpis: FC<any> = ({ data }) => {
  const dataContract = useMemo(() => {
    if (!data?.contractAmountByMonth) {
      return {
        data: arrMonths,
        totalAmount: 0
      }
    }

    const dataAmountContract = arrMonths.map((_, index) => {
      const haveMoney = data.contractAmountByMonth?.find((item: any) => item._id?.month === (index + 1));
      return haveMoney ? haveMoney.amount : 0;
    })

    const totalAmount = data.contractAmountByMonth?.reduce((total: number, item: any) =>
      total += item.amount
      , 0)

    return {
      data: dataAmountContract,
      totalAmount: (totalAmount / 1_000_000_000).toFixed(1)
    };
  }, [data?.contractAmountByMonth])

  const dataContractIPC = useMemo(() => {
    if (!data?.cmcsContractIPCAmountByMonth) {
      return {
        data: arrMonths,
        totalAmount: 0
      }
    }

    const dataAmountContract = arrMonths.map((_, index) => {
      const haveMoney = data.cmcsContractIPCAmountByMonth?.find((item: any) => item._id?.month === (index + 1));
      return haveMoney ? haveMoney.amount : 0;
    })

    const totalAmount = data.cmcsContractIPCAmountByMonth?.reduce((total: number, item: any) =>
      total += item.amount
      , 0)

    return {
      data: dataAmountContract,
      totalAmount: (totalAmount / 1_000_000_000).toFixed(1)
    };
  }, [data?.cmcsContractIPCAmountByMonth])

  const dataContractPayment = useMemo(() => {
    if (!data?.cmcsContractPaymentAmountByMonth) {
      return {
        data: arrMonths,
        totalAmount: 0
      }
    }

    const dataAmountContract = arrMonths.map((_, index) => {
      const haveMoney = data.cmcsContractPaymentAmountByMonth?.find((item: any) => item._id?.month === (index + 1));
      return haveMoney ? haveMoney.amount : 0;
    })

    const totalAmount = data.cmcsContractPaymentAmountByMonth?.reduce((total: number, item: any) =>
      total += item.amount
      , 0)

    return {
      data: dataAmountContract,
      totalAmount: (totalAmount / 1_000_000_000).toFixed(1)
    };
  }, [data?.cmcsContractPaymentAmountByMonth])

  const dataChart = {
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
        data: [120, 100, 150, 250, 320, 160, 120, 100, 150, 250, 290, 160],
        backgroundColor: "#FF9900",
        barThickness: 8,
      },
    ],
  };

  return (
    <div className="bg-primary-light px-4 py-4 h-[120px]">
      <div className="bg-primary-light">

        <div className={styles.barChart}>
          <Bar options={options} data={dataChart} />
        </div>
      </div>
    </div>
  );
};

export default Chartkpis;
