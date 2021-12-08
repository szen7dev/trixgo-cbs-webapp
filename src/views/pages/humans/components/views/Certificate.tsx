import { FC } from "react";

import HumanInfoHeader from "../layouts/HumanInfoHeader";

import ThreeDotIcon from "assets/images/icon-3dots.png";

const Certificate: FC = () => {
  return (
    <div className="border-b-4 border-accent-light px-4 py-6">
      <HumanInfoHeader title="6-CHỨNG CHỈ/HỒ SƠ KHÁC" />
      <div>
        <div className="flex justify-between mt-4">
          <p className="text-[13px] text-primary-gray" style={{ width: "15%" }}>
            Nội dung/Nơi cấp
          </p>
          <p className="text-[13px] text-primary-gray" style={{ width: "10%" }}>
            Số hiệu/Ngày tháng
          </p>
          <p className="text-[13px] text-primary-gray" style={{ width: "10%" }}>
            Ngày hết hạn
          </p>
          <p className="text-[13px] text-primary-gray" style={{ width: "13%" }}>
            Loại/Lĩnh vực/Hạng
          </p>
          <p className="text-[13px] text-primary-gray" style={{ width: "7%" }}>
            Số lượng
          </p>
          <p className="text-[13px] text-primary-gray" style={{ width: "15%" }}>
            Vị trí lưu trữ
          </p>
          <p className="text-[13px] text-primary-gray" style={{ width: "10%" }}>
            Ghi chú
          </p>
          <p className="w-1/5 text-[13px] text-primary-gray">Tệp đính kèm</p>
        </div>

        <div className="flex justify-between mt-4">
          <div className="text-[13px]" style={{ width: "15%" }}>
            <p style={{ maxWidth: "90%" }}>
              Chứng chỉ TVGS Cục giám định thuộc sở xây dựng
            </p>
          </div>
          <p className="text-[13px]" style={{ width: "10%" }}>
            00223A | 25/1/2018
          </p>
          <p className="text-[13px]" style={{ width: "10%" }}>
            15/2/2023
          </p>
          <div className="text-[13px]" style={{ width: "13%" }}>
            <p style={{ maxWidth: "90%" }}>
              {" "}
              Chứng chỉ giám sát | Dân dụng | Hạng 1
            </p>
          </div>
          <p className="text-[13px]" style={{ width: "7%" }}>
            12
          </p>
          <div className="text-[13px]" style={{ width: "15%" }}>
            <p style={{ maxWidth: "90%" }}>
              Cặp F3, Tầng 4, Giá A1, Kho công ty
            </p>
          </div>
          <p className="text-[13px]" style={{ width: "10%" }}>
            Đang lưu gốc
          </p>
          <div className="flex justify-between items-center w-1/5">
            <p className="text-[13px]">File</p>
            <div className="relative">
              <img
                className="cursor-pointer"
                src={ThreeDotIcon}
                alt="Three Dot"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certificate;
