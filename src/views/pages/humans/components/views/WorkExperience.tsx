import { FC } from "react";

import HumanInfoHeader from "../layouts/HumanInfoHeader";

import ThreeDotIcon from "assets/images/icon-3dots.png";

const WorkExperience: FC = () => {
  const expertise = "Tư vấn giám sát";
  const startDate = "15/2/2008";
  const endDate = "15/2/2008";
  const belong =
    "Tư vấn giám sát | Tổ hợp cao tầng Z54 | Công ty Cổ phần đầu tư An Thái Xanh";
  const role = "Trưởng đoàn TVGS";
  const file = "File";
  const data = [];
  for (let i = 0; i <= 2; i++) {
    data.push({ expertise, startDate, endDate, belong, role, file, id: i });
  }

  return (
    <div className="border-b-4 border-accent-light px-4 py-6">
      <HumanInfoHeader title="3-KINH NGHIỆM THỰC TẾ THAM GIA CÁC DỰ ÁN" />
      <div>
        <div className="flex justify-between mt-4">
          <p className="text-[13px] text-primary-gray" style={{ width: "10%" }}>
            Từ ngày
          </p>
          <p className="text-[13px] text-primary-gray" style={{ width: "10%" }}>
            Đến ngày
          </p>
          <p className="w-1/5 text-[13px] text-primary-gray">
            Lĩnh vực chuyên môn tham gia
          </p>
          <p className="w-1/5 text-[13px] text-primary-gray">
            Thuộc hợp đồng/Dự án/Chủ đầu tư
          </p>
          <p className="w-1/5 text-[13px] text-primary-gray">
            Vị trí công việc đảm nhận
          </p>
          <p className="w-1/5 text-[13px] text-primary-gray">Tệp đính kèm</p>
        </div>

        {data.map((item) => (
          <div className="flex justify-between mt-4" key={item.id}>
            <p className="text-[13px]" style={{ width: "10%" }}>
              {item.startDate}
            </p>
            <p className="text-[13px]" style={{ width: "10%" }}>
              {item.endDate}
            </p>
            <p className="w-1/5 text-[13px]">{item.expertise}</p>
            <div className="w-1/5 text-[13px]">
              <p style={{ maxWidth: "80%" }}>{item.belong}</p>
            </div>
            <p className="w-1/5 text-[13px]">{item.role}</p>
            <div className="flex justify-between items-center w-1/5">
              <p className="text-[13px]">{item.file}</p>
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
      <div className="mt-10 text-center text-primary">Xem thêm (128)</div>
    </div>
  );
};

export default WorkExperience;
