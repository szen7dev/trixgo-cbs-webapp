import { FC } from "react";

import HumanInfoHeader from "../layouts/HumanInfoHeader";

import ThreeDotIcon from "assets/images/icon-3dots.png";
import PDFIcon from "assets/images/icons8-pdf.svg";

const WorkExperience: FC = () => {
  const expertise = "Tư vấn giám sát";
  const startDate = "15/2/2008";
  const endDate = "15/2/2008";
  const belong =
    "Tư vấn giám sát | Tổ hợp cao tầng Z54 | Công ty Cổ phần đầu tư An Thái Xanh";
  const role = "Trưởng đoàn TVGS";
  const data = [];
  for (let i = 0; i <= 1; i++) {
    data.push({ expertise, startDate, endDate, belong, role, id: i });
  }

  return (
    <div className="border-b-8 border-accent-light px-4 py-6">
      <HumanInfoHeader title="3-KINH NGHIỆM THỰC TẾ THAM GIA CÁC DỰ ÁN" />
      <div className="text-[13px]">
        <div className="flex justify-between mt-4 text-primary-gray">
          <p style={{ width: "10%" }}>Từ ngày</p>
          <p style={{ width: "10%" }}>Đến ngày</p>
          <p className="w-1/5 ">Lĩnh vực chuyên môn tham gia</p>
          <p className="w-1/5 ">Thuộc hợp đồng/Dự án/Chủ đầu tư</p>
          <p className="w-1/5 ">Vị trí công việc đảm nhận</p>
          <p className="w-1/5 ">Tệp đính kèm</p>
        </div>

        {data.map((item) => (
          <div className="flex justify-between mt-4 " key={item.id}>
            <p style={{ width: "10%" }}>{item.startDate}</p>
            <p style={{ width: "10%" }}>{item.endDate}</p>
            <p className="w-1/5">{item.expertise}</p>
            <div className="w-1/5">
              <p style={{ maxWidth: "80%" }}>{item.belong}</p>
            </div>
            <p className="w-1/5">{item.role}</p>
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
        ))}
      </div>
      <div className="mt-6 text-center text-primary">Xem thêm (128)</div>
    </div>
  );
};

export default WorkExperience;
