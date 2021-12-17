import { FC } from "react";

const CashFlowManagementReport: FC = () => {
  return (
    <>
      <p className="font-bold text-primary-gray text-lg">
        Quản lý dòng tiền (tỷ VND)
      </p>
      <div className="mt-4">
        <div className="flex items-center justify-between mb-4">
          <span className="w-32">Kế hoạch tiền về</span>
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
          <span>1000</span>
        </div>

        <div className="flex items-center justify-between mb-4">
          <span className="w-32">Ký hợp đồng</span>
          <div className="relative w-80 border h-2">
            <div
              className="bg-accent"
              style={{ width: "70%", marginTop: -0.75, height: 7 }}
            />
            <span className="absolute -top-5" style={{ left: "70%" }}>
              70%
            </span>
          </div>
          <span>700</span>
        </div>

        <div className="flex items-center justify-between mb-4">
          <span className="w-32">Sản lượng</span>
          <div className="relative w-80 border h-2">
            <div
              className="bg-primary"
              style={{ width: "35%", marginTop: -0.75, height: 7 }}
            />
            <span className="absolute -top-5" style={{ left: "35%" }}>
              35%
            </span>
          </div>
          <span>350</span>
        </div>

        <div className="flex items-center justify-between mb-4">
          <span className="w-32">Nghiệm thu</span>
          <div className="relative w-80 border h-2">
            <div
              className="bg-positive"
              style={{ width: "30%", marginTop: -0.75, height: 7 }}
            />
            <span className="absolute -top-5" style={{ left: "30%" }}>
              30%
            </span>
          </div>
          <span>300</span>
        </div>

        <div className="flex items-center justify-between mb-4">
          <span className="w-32">Nghiệm thu</span>
          <div className="relative w-80 border h-2">
            <div
              className="bg-warning"
              style={{ width: "15%", marginTop: -0.25, height: 7 }}
            />
            <span className="absolute -top-5" style={{ left: "15%" }}>
              15%
            </span>
          </div>
          <span>150</span>
        </div>
      </div>
    </>
  );
};

export default CashFlowManagementReport;
