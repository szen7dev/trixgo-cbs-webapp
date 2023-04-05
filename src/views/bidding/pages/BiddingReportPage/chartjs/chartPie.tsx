import React from 'react';
import { FC } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Context } from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: '# of Votes',
      data: [25, 10, 10, 10, 25, 20],
      backgroundColor: [
        '#2C86ED',
        '#00CA99',
        '#9B59B6',
        '#00AFEF',
        '#E03B56',
        '#B2EAFE',
      ],
      borderColor: [
        '#2C86ED',
        '#00CA99',
        '#9B59B6',
        '#00AFEF',
        '#E03B56',
        '#B2EAFE',
      ],
      borderWidth: 1,
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
      color: "#666666",
      formatter: (val: string) => {
        return val + ' %';
      },
      anchor: "center" as const,
    },
  },
};

const ChartPie: FC = () => {
  return (
    <section className="w-full px-6 py-4 flex flex-col justify-between bg-primary-light">
      <div className="flex items-center justify-between ">
        <p className="font-bold text-primary-gray text-lg">
          Thị phần
        </p>
      </div>
      <div className='flex gap-9 h-full'>
        <div className='h-[200px] width-200'>
          <Pie options={options} data={data} />
        </div>
        <div className="w-full h-full flex flex-col gap-1 mt-2 text-primary-gray">
          <div className="flex justify-between">
            <div className="flex items-center">
              <div className="h-3 w-3 mr-2" style={{ background: "#2C86ED" }} />
              <p>DFF.Công ty Cổ phần Tập đoàn Đua Fat</p>
            </div>
            <p>25%</p>
          </div>

          <div className="flex justify-between">
            <div className="flex items-center">
              <div className="h-3 w-3 mr-2" style={{ background: "#B2EAFE" }} />
              <p>LIC13.Công ty Cổ phần LICOGI 13</p>
            </div>
            <p>20%</p>
          </div>

          <div className="flex justify-between">
            <div className="flex items-center">
              <div className="h-3 w-3 mr-2" style={{ background: "#E03B56" }} />
              <p>VMC.Công ty Cổ phần VIMECO</p>
            </div>
            <p>25%</p>
          </div>

          <div className="flex justify-between">
            <div className="flex items-center">
              <div className="h-3 w-3 mr-2" style={{ background: "#00AFEF" }} />
              <p>TMC.Công ty TNHH xddd và thương mại Thái Minh</p>
            </div>
            <p>10%</p>
          </div>

          <div className="flex justify-between">
            <div className="flex items-center">
              <div className="h-3 w-3 mr-2" style={{ background: "#9B59B6" }} />
              <p>FEC.Công ty Cổ phần FECON</p>
            </div>
            <p>10%</p>
          </div>

          <div className="flex justify-between">
            <div className="flex items-center">
              <div className="h-3 w-3 mr-2" style={{ background: "#00CA99" }} />
              <p>MDC.Công ty TNHH Bê tông và Xây dựng Minh Đức</p>
            </div>
            <p>10%</p>
          </div>

          <div className="flex justify-between">
            <div className="flex items-center">
              <div className="h-3 w-3 mr-2" style={{ background: "#2C86ED" }} />
              <p>UDIC.Tổng Công ty Đầu tư Phát triển Hạ tầng Đô thị UDIC</p>
            </div>
            <p>-</p>
          </div>

          <div className="flex justify-between">
            <div className="flex items-center">
              <div className="h-3 w-3 mr-2" style={{ background: "#2C86ED" }} />
              <p>TNC.Công ty TNHH Tùng Nguyên</p>
            </div>
            <p>-</p>
          </div>
        </div>
      </div>
    </section>
  );
}
export default ChartPie;