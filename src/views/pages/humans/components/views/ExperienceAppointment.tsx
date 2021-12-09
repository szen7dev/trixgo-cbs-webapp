import { FC } from "react";

import HumanInfoHeader from "../layouts/HumanInfoHeader";

import ThreeDotIcon from "assets/images/icon-3dots.png";
import PDFIcon from "assets/images/icons8-pdf.svg";

const ExperienceAppointment: FC = () => {
  return (
    <div className="border-b-8 border-accent-light px-4 py-6">
      <HumanInfoHeader title="4-KINH NGHIỆM THEO QUYẾT ĐỊNH BỔ NHIỆM" />
      <div className="text-[13px]">
        <div className="flex justify-between mt-4 text-primary-gray">
          <p className="w-1/5">Nội dung quyết định</p>
          <p style={{ width: "13%" }}>Số hiệu/Ngày tháng</p>
          <p style={{ width: "15%" }}>Vị trí công việc đảm nhận</p>
          <p className="w-1/5 ">Thuộc hợp đồng/Loại dự án/Cấp công trình </p>
          <p style={{ width: "12%" }}>Thời gian huy động/Hệ số</p>
          <p className="w-1/5">Tệp đính kèm</p>
        </div>

        <div className="flex justify-between mt-4">
          <div className="w-1/5">
            <p style={{ maxWidth: "80%" }}>
              Thành lập đoàn TVGS dự án Himlam Hạ tầng xanh
            </p>
          </div>
          <p style={{ width: "13%" }}>1502/QĐ | 15/2/2009</p>
          <p style={{ width: "15%" }}>Trưởng đoàn TVGS</p>
          <p className="w-1/5">Tư vấn giám sát/Tổ hợp cao tầng Z54/Cấp 1</p>
          <p style={{ width: "12%" }}>8h | 1,5</p>
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

export default ExperienceAppointment;
