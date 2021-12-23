import { FC } from "react";

import SupportDoughnutChart from "../../../chart/SupportDoughnutChart";

const data = {
  labels: [],
  datasets: [
    {
      data: [2500, 3500, 2200],
      backgroundColor: ["#2a90fb", "#0060E1", "#10b981"],
      borderWidth: 0,
    },
  ],
};

const SortByDeviceSupport: FC = () => {
  return (
    <section className="bg-primary-light px-6 py-4 h-[200px]">
      <p className="text-primary-gray font-bold text-lg">
        Phân loại theo thiết bị
      </p>

      <div className="flex items-center gap-20">
        <div className="ml-8 my-3">
          <div className="w-28">
            <SupportDoughnutChart _data={data} title="205k" cutout={38} />
          </div>
        </div>

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
    </section>
  );
};

export default SortByDeviceSupport;
