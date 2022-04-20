import React, { FC, useEffect } from "react";
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
import { useCashBookCustom } from "services/hooks/financial/useCashBook";
import moment from "moment";

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

type Props = {
  year: string;
  parentID: string
} & React.HTMLAttributes<HTMLElement>

const ChartExpenseSumary: FC<Props> = ({ parentID, year, ...props }) => {
  const { amountByProperty, isLoadingAmountByProperty, refetchAmountByProperty } = useCashBookCustom({
		paramsAmountByProperty: {
			option: "3",
			parentID,
			year,
		},
		isFetchAmountByProperty: true
	})

  useEffect(() => {
    refetchAmountByProperty();
  }, [year])

  const labels = Array.from({ length: 12 }).map((_, i) => new Date().setMonth(i));
  const dataSetsIncome: { x: number, y: number }[] = [];
  const dataSetsExpense: { x: number, y: number }[] = [];

  labels.map(label => {
    let totalIncome = 0;
    let totalExpense = 0;

    amountByProperty.map(item => {
      const monthOfDate = moment(item.date).get('month');
      const month = moment(label).get('month');

      if(monthOfDate === month) {
        totalIncome += item.income;
        totalExpense += item.expense;
      }
    });

    dataSetsIncome[dataSetsIncome.length] = {
      x: label,
      y: totalIncome
    }

    dataSetsExpense[dataSetsExpense.length] = {
      x: label,
      y: totalExpense
    }
  })

  if(isLoadingAmountByProperty) return <></>

  return (
    <Bar
      data={{
        labels,
        datasets: [
          {
            label: "Thu",
            data: dataSetsIncome,
            // data: labels.map(() => Math.round(Math.random() * 1000)),
            backgroundColor: "#1A97F5",
            barThickness: 8,
            maxBarThickness: 8,
          },
          {
            label: "Chi",
            data: dataSetsExpense,
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
