import { FC } from "react";

import HumanInfoHeader from "../layouts/HumanInfoHeader";

import ThreeDotIcon from "assets/images/icon-3dots.png";
import PDFIcon from "assets/images/icons8-pdf.svg";

const Education: FC = () => {
  return (
    <div className="border-b-8 border-accent-light px-4 py-6">
      <HumanInfoHeader title="5-TRÌNH ĐỘ/HỌC VẤN" />
      <div className="text-[13px]">
        <div className="flex justify-between mt-4 text-primary-gray">
          <p className="w-1/5">Trình độ</p>
          <p className="w-1/5">Chuyên ngành đào tạo</p>
          <p className="w-1/5">Năm tốt nghiệp</p>
          <p className="w-1/5">Nơi đào tạo</p>
          <p className="w-1/5">Tệp đính kèm</p>
        </div>

        <div className="flex justify-between mt-4">
          <p className="w-1/5">Đại học</p>
          <p className="w-1/5">Kỹ sư xây dựng</p>
          <p className="w-1/5">2008</p>
          <p className="w-1/5">Đại học Bách Khoa Hà Nội</p>
          <div className="flex justify-between items-center w-1/5">
            <div className="flex">
              <div>
                <img src={PDFIcon} alt="PDF" />
              </div>
              <div className="ml-2">
                <p>ChiTietChaoGia..CHG.pdf</p>
                <p
                  className="text-primary-gray"
                  style={{ fontSize: 10, maxWidth: "80%" }}
                >
                  268KB | Trần Thị Ngân-CPMI | 07/12/2021 15:38
                </p>
              </div>
            </div>
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

export default Education;
