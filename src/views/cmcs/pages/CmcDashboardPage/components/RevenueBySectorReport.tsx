import { FC, useMemo } from "react";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDoughnutSmall from "./charts/CmcChartDoughnutSmall";

import { useContractIpcCustom } from 'services/hooks/cmcs/useContractIPC';

ChartJS.register(ArcElement, Tooltip, Legend);

const colors = ["#2C86ED", "#00CA99", "#9B59B6", "#E03B56", "#DBE7F2"]

type Props = {
  companyID?: string;
  year: number;
  outin: number;
}

const RevenueBySectorReport: FC<Props> = ({ companyID, outin, year = 2022 }) => {
  const { contractIPCAmountByProperty, isLoadingAmountByProperty } = useContractIpcCustom({
    params: {
      outin,
      option: 1,
      optionTime: 1,
      year,
      companyID,
    },
    isFetchAmountByProperty: true
  });

  const totalAmount = useMemo(() => {
    if(!contractIPCAmountByProperty || isLoadingAmountByProperty) {
      return {
        totalOrigin: 0,
        totalFixed: 0
      }
    }

    const total = contractIPCAmountByProperty.data?.reduce((init: number, item: any) => {
      return init += item.amount
    }, 0);

    return {
      totalOrigin: total,
      totalFixed: (total / 1_000_000_000).toFixed(1)
    };
  }, [contractIPCAmountByProperty])

  const data = useMemo(() => {
    if(!contractIPCAmountByProperty || isLoadingAmountByProperty) {
      return {
        labels: [],
        datasets: []
      }
    }

    const dataAmount = contractIPCAmountByProperty.data?.map((item: any) => item.amount);

    return {
      labels: [],
      datasets: [
        {
          data: dataAmount,
          backgroundColor: colors,
          borderWidth: 0,
        },
      ],
    }
  }, [contractIPCAmountByProperty, isLoadingAmountByProperty])

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
            title={`${totalAmount.totalFixed}`}
            subtitle="TỶ"
          />
        </div>

        <div className="w-full h-full flex flex-col gap-1 mt-2 text-primary-gray">
          {contractIPCAmountByProperty?.data?.map((item: any, index: number) => (
            <div className="flex justify-between" key={item._id}>
              <div className="flex items-center">
                <div className="h-3 w-3 mr-2" style={{ background: colors[index] }} />
                <p>
                  {item._id?.field?.name} {` `}
                  ({Math.ceil(+((item.amount / totalAmount.totalOrigin) * 100).toPrecision(2))}%)
                </p>
              </div>
              <p>{(item.amount / 1_000_000_000).toFixed(2)}</p>
            </div>
          ))}

          {/* <div className="flex justify-between">
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
          </div> */}
          {/* <p className="text-primary mt-2">Xem tất cả</p> */}
        </div>
      </div>
    </div>
  );
};

export default RevenueBySectorReport;
