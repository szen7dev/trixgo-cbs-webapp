import { FC } from "react";

const DebtChart: FC = () => {
    return (
        <div className="bg-primary-light h-full">
            <div className="mt-4">
                <div className="mb-3">
                    <div className="text-black">
                        <span className="w-32 text-primary-gray">Tổng:
                            <span className="text-base"> 100</span>
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
                            <span className="text-base"> 65</span>
                        </span>
                    </div>
                    <div className="relative w-full  h-2">
                        <div
                            className="bg-[#00CA99] h-[7px] w-[65%] mt-[-0.75]"
                            style={{
                                width: "65%",
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
                            <span className="text-base"> 35</span>
                        </span>
                    </div>
                    <div className="relative w-full  h-2">
                        <div
                            className=""
                            style={{
                                width: "35%",
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
