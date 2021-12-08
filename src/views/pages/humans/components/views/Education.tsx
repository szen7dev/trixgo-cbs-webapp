import { FC } from "react";

import HumanInfoHeader from "../layouts/HumanInfoHeader";

import ThreeDotIcon from "assets/images/icon-3dots.png";

const Education: FC = () => {
  return (
    <div className="border-b-4 border-accent-light px-4 py-6">
      <HumanInfoHeader title="5-TRÌNH ĐỘ/HỌC VẤN" />
      <div>
        <div className="flex justify-between mt-4">
          <p className="w-1/5 text-[13px] text-primary-gray">Trình độ</p>
          <p className="w-1/5 text-[13px] text-primary-gray">
            Chuyên ngành đào tạo
          </p>
          <p className="w-1/5 text-[13px] text-primary-gray">Năm tốt nghiệp</p>
          <p className="w-1/5 text-[13px] text-primary-gray">Nơi đào tạo</p>
          <p className="w-1/5 text-[13px] text-primary-gray">Tệp đính kèm</p>
        </div>

        <div className="flex justify-between mt-4">
          <p className="w-1/5 text-[13px]">Đại học</p>
          <p className="w-1/5 text-[13px]">Kỹ sư xây dựng</p>
          <p className="w-1/5 text-[13px]">2008</p>
          <p className="w-1/5 text-[13px]">Đại học Bách Khoa Hà Nội</p>
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

export default Education;
