import { FC } from "react";

const PriceApprovalInfo: FC = () => {
  return (
    <>
      <p className="text-x-large my-5">Giá trị đệ trình/phê duyệt</p>
      <div className="flex items-center rounded p-5 bg-green-100 border-2 border-green-300">
        <div className="w-3/4">
          <div>
            <span className="text-[13px] text-primary-gray">
              Giá trị đệ trình:
            </span>
            <span className="text-[13px] ml-2">125.000.000</span>
          </div>
          <div>
            <span className="text-primary-gray">Giá trị phê duyệt:</span>
            <span className="ml-2 text-[13px] text-green-600">125.000.000</span>
          </div>
          <div>
            <span className="text-[13px] text-primary-gray">
              Thời gian phê duyệt:
            </span>
            <span className="ml-2 text[13px]">15:30 21/12/21</span>
          </div>
          <div>
            <span className="text-[13px] text-primary-gray">
              Người phê duyệt:
            </span>
            <span className="ml-2 text[13px]">Nguyễn Trung Kiên-PGI</span>
          </div>
        </div>
        <div className="w-1/4 flex justify-end">
          <button className="text-white rounded bg-green-600 px-3 py-2">Đồng ý</button>
        </div>
      </div>
    </>
  );
};

export default PriceApprovalInfo;
