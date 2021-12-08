import { FC } from "react";

import HumanInfoHeader from "../layouts/HumanInfoHeader";

import ThreeDotIcon from "assets/images/icon-3dots.png";
// import UpdateFileIcon from "assets/images/icons8-upload-document.png";
// import PencilIcon from "assets/images/icons8-pencil-96.png";
// import DeleteIcon from "assets/images/icons8-remove-96.png";

const WorkHistory: FC = () => {
  const name = "Nguyễn Hữu Hiệp";
  const startDate = "15/2/2008";
  const endDate = "15/2/2008";
  const company = "Công ty Cổ phần PGI Partners";
  const file = "File";
  const data = [];
  for (let i = 0; i <= 2; i++) {
    data.push({ name, startDate, endDate, company, file, id: i });
  }

  return (
    <div className="border-b-4 border-accent-light px-4 py-6">
      <HumanInfoHeader title="2-LỊCH SỬ LÀM VIỆC TẠI CÁC ĐƠN VỊ" />
      <div>
        <div className="flex justify-between mt-4">
          <p
            className="text-[13px] text-primary-gray"
            style={{ width: "12.5%" }}
          >
            Từ ngày
          </p>
          <p
            className="text-[13px] text-primary-gray"
            style={{ width: "12.5%" }}
          >
            Đến ngày
          </p>
          <p className="w-1/4 text-[13px] text-primary-gray">
            Tên cơ quan đơn vị công tác
          </p>
          <p className="w-1/4 text-[13px] text-primary-gray">
            Thông tin người tham chiếu
          </p>
          <p className="w-1/4 text-[13px] text-primary-gray">Tệp đính kèm</p>
        </div>
        {data.map((item) => (
          <div className="flex justify-between mt-4" key={item.id}>
            <p className="text-[13px]" style={{ width: "12.5%" }}>
              {item.startDate}
            </p>
            <p className="text-[13px]" style={{ width: "12.5%" }}>
              {item.endDate}
            </p>
            <p className="w-1/4 text-[13px]">{item.company}</p>
            <p className="w-1/4 text-[13px]">{item.name}</p>
            <div className="flex justify-between items-center w-1/4">
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

export default WorkHistory;
