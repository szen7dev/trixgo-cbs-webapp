import { FC } from "react";

import HumanInfoHeader from "../layouts/HumanInfoHeader";

import ThreeDotIcon from "assets/images/icon-3dots.png";
import PDFIcon from "assets/images/icons8-pdf.svg";

const Certificate: FC = () => {
  return (
    <div className="border-accent-light px-4 py-6">
      <HumanInfoHeader title="6-CHỨNG CHỈ/HỒ SƠ KHÁC" />
      <div className="text-[13px]">
        <div className="flex justify-between mt-4 text-primary-gray">
          <p style={{ width: "15%" }}>Nội dung/Nơi cấp</p>
          <p style={{ width: "10%" }}>Số hiệu/Ngày tháng</p>
          <p style={{ width: "10%" }}>Ngày hết hạn</p>
          <p style={{ width: "13%" }}>Loại/Lĩnh vực/Hạng</p>
          <p style={{ width: "7%" }}>Số lượng</p>
          <p style={{ width: "15%" }}>Vị trí lưu trữ</p>
          <p style={{ width: "10%" }}>Ghi chú</p>
          <p className="w-1/5">Tệp đính kèm</p>
        </div>

        <div className="flex justify-between mt-4">
          <div style={{ width: "15%" }}>
            <p style={{ maxWidth: "90%" }}>
              Chứng chỉ TVGS Cục giám định thuộc sở xây dựng
            </p>
          </div>
          <p style={{ width: "10%" }}>00223A | 25/1/2018</p>
          <p style={{ width: "10%" }}>15/2/2023</p>
          <div style={{ width: "13%" }}>
            <p style={{ maxWidth: "90%" }}>
              {" "}
              Chứng chỉ giám sát | Dân dụng | Hạng 1
            </p>
          </div>
          <p style={{ width: "7%" }}>12</p>
          <div style={{ width: "15%" }}>
            <p style={{ maxWidth: "90%" }}>
              Cặp F3, Tầng 4, Giá A1, Kho công ty
            </p>
          </div>
          <p style={{ width: "10%" }}>Đang lưu gốc</p>
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

export default Certificate;
