import { FC } from "react";

import CaretDownIcon from "assets/images/icon-caret-down.png";
import ClassifyProgress from "./ClassifyProgress";

const ClassifyTable: FC = () => {
  return (
    <table className="relative">
      <thead className="bg-gray-50 sticky top-0 z-10 py-2 border-b">
        <tr>
          <th className="pl-2 py-2 w-12">
            <div className="flex items-center justify-between">
              <input type="checkbox" />
              <img
                className="w-6 object-contain"
                src={CaretDownIcon}
                alt="Dropdown"
              />
            </div>
          </th>
          <th className="p-2 text-left text-[13px] w-5/12">
            <span className="py-1 px-2 border-l text-[13px] font-normal">
              Dự án/ phòng ban
            </span>
          </th>
          <th className="p-2">
            <div className="flex space-x-5 px-2 border-l">
              <span className="text-primary-gray text-left font-normal">
                Tình trạng tiến độ
              </span>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-500" />
                <span className="ml-1 text-primary-gray font-normal">
                  Quá hạn
                </span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-yellow-500" />
                <span className="ml-1 text-primary-gray font-normal">
                  Tuần tới
                </span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500" />
                <span className="ml-1 text-primary-gray font-normal">
                  {" "}
                  {">7 ngày"}
                </span>
              </div>
            </div>
          </th>
          <th className="text-[13px] text-primary-gray text-left font-normal">
            <span className="border-l py-1 px-2">Tổng</span>
          </th>
        </tr>
      </thead>

      <tbody>
        <tr className="border-b">
          <td className="p-2">
            <input type="checkbox" />
          </td>
          <td className="py-2 px-4">
            MAR.HAR.Court Yard By Marriott Ha Long Bay
          </td>
          <td className="py-2 px-4">
            <ClassifyProgress />
          </td>
          <td className="py-2 px-4 text-[13px]">50</td>
        </tr>
        <tr className="border-b">
          <td className="p-2">
            <input type="checkbox" />
          </td>
          <td className="py-2 px-4">
            ARM.CAL.Tổ hợp chung cư Calla Apartment Quy Nhơn
          </td>
          <td className="py-2 px-4">
            <ClassifyProgress />
          </td>
          <td className="py-2 px-4 text-[13px]">50</td>
        </tr>
        <tr className="border-b">
          <td className="p-2">
            <input type="checkbox" />
          </td>
          <td className="py-2 px-4">
            CHG.THT.Xây dựng cụm trường Tiểu học và THCS Tây Hồ Tây
          </td>
          <td className="py-2 px-4">
            <ClassifyProgress />
          </td>
          <td className="py-2 px-4 text-[13px]">50</td>
        </tr>
        <tr className="border-b">
          <td className="p-2">
            <input type="checkbox" />
          </td>
          <td className="py-2 px-4">
            NBK.NBK.Trường trung học và tiểu học Nguyễn Bỉnh Khiêm Tây Hồ Tây
          </td>
          <td className="py-2 px-4">
            <ClassifyProgress />
          </td>
          <td className="py-2 px-4 text-[13px]">50</td>
        </tr>
        <tr className="border-b">
          <td className="p-2">
            <input type="checkbox" />
          </td>
          <td className="py-2 px-4">
            PTIT.NBH.Xây dựng nhà hiệu bộ và ký túc xá Học Viện Bưu Chính Viễn
            Thông
          </td>
          <td className="py-2 px-4">
            <ClassifyProgress />
          </td>
          <td className="py-2 px-4 text-[13px]">50</td>
        </tr>
        <tr className="border-b">
          <td className="p-2">
            <input type="checkbox" />
          </td>
          <td className="py-2 px-4">BMLC.SUN.Sunrise Resort</td>
          <td className="py-2 px-4">
            <ClassifyProgress />
          </td>
          <td className="py-2 px-4 text-[13px]">50</td>
        </tr>
      </tbody>
    </table>
  );
};

export default ClassifyTable;
