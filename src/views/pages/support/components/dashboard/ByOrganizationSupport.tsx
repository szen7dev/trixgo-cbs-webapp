import { FC } from "react";

import cn from "classnames";

import styles from "../../styles.module.css";

import SupportDoughnutChart from "../../chart/SupportDoughnutChart";

import PolygonIcon from "assets/images/icon-polygon.svg";

const data = {
  labels: [],
  datasets: [
    {
      data: [40, 38, 15, 12],
      backgroundColor: ["#2C86ED", "#00CA99", "#9B59B6", "#E03B56"],
      borderWidth: 0,
    },
  ],
};

const ByOrganizationSupport: FC = () => {
  return (
    <section
      className={cn(
        "w-2/5 h-60 px-6 py-4",
        styles.borderTop,
        styles.borderBottom,
        styles.borderLeft
      )}
    >
      <div className="flex justify-between">
        <p className="text-primary-gray text-lg font-bold">Theo tổ chức</p>

        <button className="flex items-center justify-around rounded border border-gray-300 text-secondary-gray text-xs w-24 h-8">
          <img src={PolygonIcon} alt="Polygon" />
          <span>Năm 2022</span>
        </button>
      </div>

      <div className="flex justify-around mt-3">
        <div className="w-28">
          <SupportDoughnutChart _data={data} title="9.272" />
        </div>

        <div className=" flex flex-col justify-around text-primary-gray">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-primary rounded-full mr-4" />
            <span>Doanh nghiệp (1000)</span>
          </div>

          <div className="flex items-center">
            <div className="w-3 h-3 bg-negative rounded-full mr-4" />
            <span>Sinh viên (800)</span>
          </div>

          <div className="flex items-center">
            <div className="w-3 h-3 bg-positive rounded-full mr-4" />
            <span>Hành chính công (300)</span>
          </div>

          <div className="flex items-center">
            <div className="w-3 h-3 bg-warning rounded-full mr-4" />
            <span>Khác (5)</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ByOrganizationSupport;
