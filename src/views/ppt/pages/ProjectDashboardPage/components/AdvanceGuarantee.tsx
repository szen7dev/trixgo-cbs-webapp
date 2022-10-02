import { FC } from "react";
import ChartDoughnutSmall from "views/cmcs/pages/CmcDashboardPage/components/charts/CmcChartDoughnutSmall";

const data = {
    labels: [],
    datasets: [
        {
            data: [12, 15, 11, 22],
            backgroundColor: ["#F55F5F", "#00C614", "#1A97F5", "#206EC3"],
            borderWidth: 0,
        },
    ],
};

export const AdvanceGuarantee: FC = () => {
    return (
        <div className="bg-primary-light flex h-full mt-4">

            <div className="flex flex-col gap-1">
                <div className="flex py-1 items-center justify-between">
                    <div className="flex items-center justify-between">
                        <div className="bg-cbs-schedule-expired w-2 h-2 rounded-full mr-3" />
                        <span>Quá hạn: <span>12</span></span>
                    </div>
                </div>

                <div className="flex py-1 items-center justify-between">
                    <div className="flex items-center justify-between">
                        <div className="bg-cbs-green w-2 h-2 rounded-full mr-3" />
                        <span>Tuần tới <span>15</span></span>
                    </div>
                </div>

                <div className="flex py-1 items-center justify-between">
                    <div className="flex items-center justify-between">
                        <div className="bg-cbs-blue w-2 h-2 rounded-full mr-3" />
                        <span>{">"}7 ngày kế tiếp: <span>11</span></span>
                    </div>
                </div>

                <div className="flex py-1 items-center justify-between">
                    <div className="flex items-center justify-between">
                        <div className="bg-cbs-bold-blue w-2 h-2 rounded-full mr-3" />
                        <span>{">"}30 ngày kế tiếp: <span>22</span></span>
                    </div>
                </div>
            </div>
            <div className="mx-auto w-[110px]">
                <ChartDoughnutSmall _data={data} rotation={-30} title="205" />
            </div>
        </div>
    );
};
