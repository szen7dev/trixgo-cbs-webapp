import { FC, useMemo } from "react";
import { useContractIpcCustom } from 'services/hooks/cmcs/useContractIPC';
import { convertCurrency } from 'utils/converter';

type Props = {
    companyID?: string;
}

const DebtChart: FC<Props> = ({ companyID = "" }) => {
    const { contractIPCAmountByProperty: contractIPCAmountByPropertyDebt1 } = useContractIpcCustom({
        params: {
            outin: 1,
            option: 2,
            debt: 1,
            companyID
        },
        isFetchAmountByProperty: true
    });

    const { contractIPCAmountByProperty: contractIPCAmountByPropertyDebt2 } = useContractIpcCustom({
        params: {
            outin: 1,
            option: 2,
            debt: 2,
            companyID
        },
        isFetchAmountByProperty: true
    });

    const total = useMemo(() => {
        if(!contractIPCAmountByPropertyDebt1) return 0;

        const totalSum = contractIPCAmountByPropertyDebt1.data?.reduce((init: number, item: any) => {
            return init += item.amount
          }, 0);

          return totalSum;
    }, [contractIPCAmountByPropertyDebt1])

    const totalOutDate = useMemo(() => {
        if(!contractIPCAmountByPropertyDebt2) return 0;

        const totalSum = contractIPCAmountByPropertyDebt2.data?.reduce((init: number, item: any) => {
            return init += item.amount
        }, 0);

        return totalSum;
    }, [contractIPCAmountByPropertyDebt2])

    return (
        <div className="bg-primary-light h-full">
            <div className="mt-4">
                <div className="mb-3">
                    <div className="text-black">
                        <span className="w-32 text-primary-gray">Tổng:
                            <span className="text-base">{` `}
                                {(total / 1_000_000_000).toFixed(3)}
                            </span>
                        </span>
                    </div>
                    <div className="w-full  h-2">
                        <div
                            style={{
                                width: "100%",
                                marginTop: -0.5,
                                height: 7,
                                background: "#206EC3",
                            }}
                        />
                    </div>
                </div>

                <div className="w-full mb-3">
                    <div className="text-black">
                        <span className="w-32 text-primary-gray">Trong kỳ:
                            <span className="text-base">{` `}
                                {(total - totalOutDate) && ((total - totalOutDate) / 1_000_000_000).toFixed(3)}
                            </span>
                        </span>
                    </div>
                    <div className="relative w-full  h-2">
                        <div
                            className="bg-[#00CA99] h-[7px] w-[65%] mt-[-0.75]"
                            style={{
                                width: `${(total - totalOutDate) && (total / (total - totalOutDate)) * 100}%`,
                                marginTop: -0.75,
                                height: 7,
                                background: "#00CA99",
                            }}
                        />
                        {/* <span className="absolute -top-5" style={{ left: "70%" }}>
                            70%
                        </span> */}
                    </div>
                </div>

                <div className="mb-3">
                    <div className="text-black">
                        <span className="w-32 text-primary-gray">Quá hạn:
                            <span className="text-base">{` `}
                                {(totalOutDate / 1_000_000_000).toFixed(3)}
                            </span>
                        </span>
                    </div>
                    <div className="relative w-full  h-2">
                        <div
                            style={{
                                width: `${(total / totalOutDate) * 100}%`,
                                marginTop: -0.75,
                                height: 7,
                                background: "#F55F5F",
                            }}
                        />
                        {/* <span className="absolute -top-5" style={{ left: "35%" }}>
                            35%
                        </span> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DebtChart;
