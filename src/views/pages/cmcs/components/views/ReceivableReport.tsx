import { FC } from "react";

import cn from "classnames";

import styles from "../../styles.module.css";

import ChartDoughnutSmall from "../../charts/CmcChartDoughnutSmall";
import { _dataTwo } from "views/pages/ppt/chart/ProjectDoughnutChart";

const ReceivableReport: FC = () => {
  return (
    <>
      <p className="text-center font-bold text-lg text-primary-gray">
        Công nợ phải thu
      </p>

      <div className={cn("mx-auto", styles.chart)}>
        <ChartDoughnutSmall _data={_dataTwo} title="518" subtitle="" />
      </div>

      <div className="mt-4 flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-between">
            <div className="bg-negative w-2 h-2 rounded-full mr-3" />
            <p>Quá hạn</p>
          </div>
          <p>118</p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center justify-between">
            <div className="bg-warning w-2 h-2 rounded-full mr-3" />
            <p>Tuần tới</p>
          </div>
          <p>305</p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center justify-between">
            <div className="bg-positive w-2 h-2 rounded-full mr-3" />
            <p>{"> 7 ngày kế tiếp"}</p>
          </div>
          <p>95</p>
        </div>
      </div>
    </>
  );
};

export default ReceivableReport;
