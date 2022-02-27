import { FC } from "react";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDoughnutSmall from "./charts/CmcChartDoughnutSmall";

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: [],
  datasets: [
    {
      data: [40, 38, 15, 12, 5],
      backgroundColor: ["#2C86ED", "#00CA99", "#9B59B6", "#E03B56", "#DBE7F2"],
      borderWidth: 0,
    },
  ],
};

const RevenueBySectorReport: FC = () => {
  return (
    <div className="bg-primary-light py-4 px-6 h-full">
      <p className="font-bold text-primary-gray text-lg">
        Doanh thu theo lĩnh vực
      </p>
      <div className="flex gap-9 h-full">
        <div className="w-[110px]">
          <ChartDoughnutSmall
            _data={data}
            rotation={-50}
            title="100"
            subtitle="TỶ"
          />
        </div>

        <div className="w-full h-full flex flex-col gap-1 mt-2 text-primary-gray">
          <div className="flex justify-between">
            <div className="flex items-center">
              <div className="h-3 w-3 mr-2" style={{ background: "#2C86ED" }} />
              <p>Quản lý dự án (40%)</p>
            </div>
            <p>40</p>
          </div>

          <div className="flex justify-between">
            <div className="flex items-center">
              <div className="h-3 w-3 mr-2" style={{ background: "#00CA99" }} />
              <p>Tư vấn giá (38%)</p>
            </div>
            <p>38</p>
          </div>

          <div className="flex justify-between">
            <div className="flex items-center">
              <div className="h-3 w-3 mr-2" style={{ background: "#9B59B6" }} />
              <p>Tư vấn QS (15%)</p>
            </div>
            <p>15</p>
          </div>

          <div className="flex justify-between">
            <div className="flex items-center">
              <div className="h-3 w-3 mr-2" style={{ background: "#E03B56" }} />
              <p>Đầu tư (12%)</p>
            </div>
            <p>12</p>
          </div>

          <div className="flex justify-between">
            <div className="flex items-center">
              <div className="h-3 w-3 mr-2" style={{ background: "#DBE7F2" }} />
              <p>Khác 1 (5%)</p>
            </div>
            <p>5</p>
          </div>
          <p className="text-primary mt-2">Xem tất cả</p>
        </div>
      </div>
    </div>
  );
};

export default RevenueBySectorReport;
