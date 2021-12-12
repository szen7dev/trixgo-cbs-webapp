import { FC, useRef, useState } from "react";

import HumanInfoHeader from "../layouts/HumanInfoHeader";

import ThreeDotIcon from "assets/images/icon-3dots.png";
import UploadFileIcon from "assets/images/icons8-upload-document.svg";
import PencilIcon from "assets/images/icons8-pencil.svg";
import DeleteIcon from "assets/images/icons8-remove.svg";
import PDFIcon from "assets/images/icons8-pdf.svg";
import { useOnClickOutside } from "services/hooks/useOnclickOutside";

const WorkHistory: FC = () => {
  const [openFileOption, setOpenFileOption] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  useOnClickOutside(ref, () => setOpenFileOption(!openFileOption));

  return (
    <div className="border-b-8 border-accent-light px-4 py-6">
      <HumanInfoHeader title="2-LỊCH SỬ LÀM VIỆC TẠI CÁC ĐƠN VỊ" />
      <div className="text-[13px]">
        <div className="flex justify-between mt-4 text-primary-gray">
          <p style={{ width: "12.5%" }}>Từ ngày</p>
          <p style={{ width: "12.5%" }}>Đến ngày</p>
          <p className="w-1/4">Tên cơ quan đơn vị công tác</p>
          <p className="w-1/4">Thông tin người tham chiếu</p>
          <p className="w-1/4">Tệp đính kèm</p>
        </div>

        <div className="flex justify-between mt-4">
          <p style={{ width: "12.5%" }}>15/2/2008</p>
          <p style={{ width: "12.5%" }}>15/2/2008</p>
          <p className="w-1/4 ">Công ty Cổ phần PGI Partners</p>
          <p className="w-1/4 ">Nguyễn Hữu Hiệp</p>
          <div className="flex justify-between items-center w-1/4">
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
                onClick={() => setOpenFileOption(!openFileOption)}
              />
              {openFileOption && (
                <div
                  className="absolute right-0 mt-1 w-60 h-32 bg-primary-light rounded z-10"
                  style={{ border: "1px solid #cccccc" }}
                  ref={ref}
                >
                  <div className="flex items-center w-full h-1/3 hover:bg-accent-light px-8 cursor-pointer">
                    <img src={UploadFileIcon} alt="Upload" className="mr-5" />
                    <span>Upload file</span>
                  </div>
                  <div className="flex items-center w-full h-1/3 hover:bg-accent-light px-8 cursor-pointer">
                    <img src={PencilIcon} alt="Pencil" className="mr-5" />
                    <span>Cập nhật</span>
                  </div>
                  <div className="flex items-center w-full h-1/3 hover:bg-accent-light px-8 cursor-pointer">
                    <img src={DeleteIcon} alt="Delete" className="mr-5" />
                    <span>Xóa</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-4">
          <p style={{ width: "12.5%" }}>15/2/2008</p>
          <p style={{ width: "12.5%" }}>15/2/2008</p>
          <p className="w-1/4 ">Công ty Cổ phần PGI Partners</p>
          <p className="w-1/4 ">Nguyễn Hữu Hiệp</p>
          <div className="flex justify-between items-center w-1/4">
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
      <div className="mt-6 text-center text-primary">Xem thêm (128)</div>
    </div>
  );
};

export default WorkHistory;
