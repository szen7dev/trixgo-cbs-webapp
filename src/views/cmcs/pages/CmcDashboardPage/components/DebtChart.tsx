import { FC } from "react";

const DebtChart: FC = () => {
    return (
        <div className="bg-primary-light px-6 py-4 h-full">
            <p className="font-bold text-primary-gray text-lg">
                Quản lý dòng tiền (tỷ VND)
            </p>
            <div className="mt-4">
                <div className="mb-3">
                    <div><span className="w-32 text-primary-gray">Tổng:<span className="text-base"> 100</span></span></div>
                    <div className="w-80 border h-2">
                        <div
                            style={{
                                width: "100%",
                                marginTop: -0.5,
                                height: 7,
                                background: "#06A302",
                            }}
                        />
                    </div>
                </div>

                <div className="mb-3">
                    <div><span className="w-32 text-primary-gray">Trong kỳ:<span className="text-base"> 65</span></span></div>
                    <div className="relative w-80 border h-2">
                        <div
                            className="bg-accent"
                            style={{ width: "70%", marginTop: -0.75, height: 7 }}
                        />
                        {/* <span className="absolute -top-5" style={{ left: "70%" }}>
                            70%
                        </span> */}
                    </div>
                </div>

                <div className="mb-3">
                    <div><span className="w-32 text-primary-gray">Quá hạn:<span className="text-base"> 35</span></span></div>
                    <div className="relative w-80 border h-2">
                        <div
                            className="bg-primary"
                            style={{ width: "35%", marginTop: -0.75, height: 7 }}
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
