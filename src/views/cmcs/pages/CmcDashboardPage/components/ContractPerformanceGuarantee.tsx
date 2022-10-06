import { FC, useMemo } from "react";
import ChartDoughnutSmall from "./SupportDoughnutChart";
import { useContractCustom } from 'services/hooks/cmcs/useContract';

export const ContractPerformanceGuarantee: FC = () => {
    const { listGuarantee } = useContractCustom({
        params: {
            guaranteeType: 2,
            outin: 1,
            option: 1
        },
        isFetchListGuarantee: true
    })

    const amountMoreThan7Days = useMemo(() => {
        if(!listGuarantee) return 0;

        const { listAmountMoreThan7Days } = listGuarantee?.data;
        const amountMoreThan7Days = listAmountMoreThan7Days.reduce((total: number, item: any) => {
            return total += item.count
        }, 0)
        return amountMoreThan7Days;
    }, [listGuarantee])

    const amountMoreThan30Days = useMemo(() => {
        if(!listGuarantee) return 0;

        const { listAmountMoreThan30Days } = listGuarantee?.data;
        const amountMoreThan30Days = listAmountMoreThan30Days.reduce((total: number, item: any) => {
            return total += item.count
        }, 0)
        return amountMoreThan30Days;
    }, [listGuarantee])

    const amountNextWeek = useMemo(() => {
        if(!listGuarantee) return 0;

        const { listAmountNextWeek } = listGuarantee?.data;
        const amountNextWeek = listAmountNextWeek.reduce((total: number, item: any) => {
            return total += item.count
        }, 0)
        return amountNextWeek;
    }, [listGuarantee])

    const amountOverdue = useMemo(() => {
        if(!listGuarantee) return 0;

        const { listAmountOverdue } = listGuarantee?.data;
        const amountOverdue = listAmountOverdue.reduce((total: number, item: any) => {
            return total += item.count
        }, 0)
        return amountOverdue;
    }, [listGuarantee])

    const totalCount = useMemo(() => {
        return amountMoreThan7Days + amountMoreThan30Days + amountNextWeek + amountOverdue;
    }, [amountMoreThan7Days, amountMoreThan30Days, amountNextWeek, amountOverdue])

    const data = useMemo(() => {
        if(!listGuarantee) {
            return {
                labels: [],
                datasets: [
                    {
                        data: [0, 0, 0, 0],
                        backgroundColor: ["#F55F5F", "#00C614", "#1A97F5", "#206EC3"],
                        borderWidth: 0,
                    },
                ],
            }
        }

        return {
            labels: [],
            datasets: [
                {
                    data: [
                        amountMoreThan7Days,
                        amountMoreThan30Days,
                        amountNextWeek,
                        amountOverdue,
                    ],
                    backgroundColor: ["#F55F5F", "#00C614", "#1A97F5", "#206EC3"],
                    borderWidth: 0,
                },
            ],
        };
    }, [listGuarantee, amountMoreThan7Days, amountMoreThan30Days, amountNextWeek, amountOverdue])

    return (
        <div className="bg-primary-light flex h-full mt-4">

            <div className="flex flex-col gap-1">
                <div className="flex py-1 items-center justify-between">
                    <div className="flex items-center justify-between">
                        <div className="bg-cbs-schedule-expired w-2 h-2 rounded-full mr-3" />
                        <span>Quá hạn: <span>{amountOverdue}</span></span>
                    </div>
                </div>

                <div className="flex py-1 items-center justify-between">
                    <div className="flex items-center justify-between">
                        <div className="bg-cbs-green w-2 h-2 rounded-full mr-3" />
                        <span>Tuần tới: <span>{amountNextWeek}</span></span>
                    </div>
                </div>

                <div className="flex py-1 items-center justify-between">
                    <div className="flex items-center justify-between">
                        <div className="bg-cbs-blue w-2 h-2 rounded-full mr-3" />
                        <span>{">"}7 ngày kế tiếp: <span>{amountMoreThan7Days}</span></span>
                    </div>
                </div>

                <div className="flex py-1 items-center justify-between">
                    <div className="flex items-center justify-between">
                        <div className="bg-cbs-bold-blue w-2 h-2 rounded-full mr-3" />
                        <span>{">"}30 ngày kế tiếp: <span>{amountMoreThan30Days}</span></span>
                    </div>
                </div>
            </div>
            <div className="mx-auto w-[110px]">
                <ChartDoughnutSmall _data={data} rotation={-30} title={`${totalCount}`} />
            </div>
        </div>
    );
};
