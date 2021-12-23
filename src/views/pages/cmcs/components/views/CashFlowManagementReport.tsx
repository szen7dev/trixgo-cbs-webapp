import { FC } from "react";

const CashFlowManagementReport: FC = () => {
  return (
    <div className="bg-primary-light px-6 py-4 h-full">
      <p className="font-bold text-primary-gray text-lg">
        Quản lý dòng tiền (tỷ VND)
      </p>
      <div className="mt-4">
        <div className="flex items-center justify-between mb-3">
          <span className="w-32 text-primary-gray">Kế hoạch tiền về</span>
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
          <span className="text-base">1000</span>
        </div>

        <div className="flex items-center justify-between mb-3">
          <span className="w-32 text-primary-gray">Ký hợp đồng</span>
          <div className="relative w-80 border h-2">
            <div
              className="bg-accent"
              style={{ width: "70%", marginTop: -0.75, height: 7 }}
            />
            <span className="absolute -top-5" style={{ left: "70%" }}>
              70%
            </span>
          </div>
          <span className="text-base">700</span>
        </div>

        <div className="flex items-center justify-between mb-3">
          <span className="w-32 text-primary-gray">Sản lượng</span>
          <div className="relative w-80 border h-2">
            <div
              className="bg-primary"
              style={{ width: "35%", marginTop: -0.75, height: 7 }}
            />
            <span className="absolute -top-5" style={{ left: "35%" }}>
              35%
            </span>
          </div>
          <span className="text-base">350</span>
        </div>

        <div className="flex items-center justify-between mb-3">
          <span className="w-32 text-primary-gray">Nghiệm thu</span>
          <div className="relative w-80 border h-2">
            <div
              className="bg-positive"
              style={{ width: "30%", marginTop: -0.75, height: 7 }}
            />
            <span className="absolute -top-5" style={{ left: "30%" }}>
              30%
            </span>
          </div>
          <span className="text-base">300</span>
        </div>

        <div className="flex items-center justify-between mb-3">
          <span className="w-32 text-primary-gray">Tiền về</span>
          <div className="relative w-80 border h-2">
            <div
              className="bg-warning"
              style={{ width: "15%", marginTop: -0.25, height: 7 }}
            />
            <span className="absolute -top-5" style={{ left: "15%" }}>
              15%
            </span>
          </div>
          <span className="text-base">150</span>
        </div>
      </div>
    </div>
  );
};

export default CashFlowManagementReport;
