import { FC } from "react";

import HumanInfoHeader from "../layouts/HumanInfoHeader";

import ThreeDotIcon from "assets/images/icon-3dots.png";

const ExperienceAppointment: FC = () => {
  return (
    <div className="border-b-4 border-accent-light px-4 py-6">
      <HumanInfoHeader title="4-KINH NGHIỆM THEO QUYẾT ĐỊNH BỔ NHIỆM" />
      <div>
        <div className="flex justify-between mt-4">
          <p className="w-1/5 text-[13px] text-primary-gray">
            Nội dung quyết định
          </p>
          <p className="text-[13px] text-primary-gray" style={{ width: "13%" }}>
            Số hiệu/Ngày tháng
          </p>
          <p className="text-[13px] text-primary-gray" style={{ width: "15%" }}>
            Vị trí công việc đảm nhận
          </p>
          <p className="w-1/5 text-[13px] text-primary-gray">
            Thuộc hợp đồng/Loại dự án/Cấp công trình{" "}
          </p>
          <p className="text-[13px] text-primary-gray" style={{ width: "12%" }}>
            Thời gian huy động/Hệ số
          </p>
          <p className="w-1/5 text-[13px] text-primary-gray">Tệp đính kèm</p>
        </div>

        <div className="flex justify-between mt-4">
          <div className="w-1/5 text-[13px]">
            <p style={{ maxWidth: "80%" }}>
              Thành lập đoàn TVGS dự án Himlam Hạ tầng xanh
            </p>
          </div>
          <p className="text-[13px]" style={{ width: "13%" }}>
            1502/QĐ | 15/2/2009
          </p>
          <p className="text-[13px]" style={{ width: "15%" }}>
            Trưởng đoàn TVGS
          </p>
          <p className="w-1/5 text-[13px]">
            Tư vấn giám sát/Tổ hợp cao tầng Z54/Cấp 1
          </p>
          <p className="text-[13px]" style={{ width: "12%" }}>
            8h | 1,5
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

export default ExperienceAppointment;
