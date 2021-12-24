import { FC } from "react";

import cn from "classnames";

import styles from "../styles.module.css";

import SearchIcon from "assets/images/icons8-search.svg";
import SortIcon from "assets/images/icons8-sorting.svg";
import DownloadIcon from "assets/images/icons8-download-96.svg";
import ShareIcon from "assets/images/icons8-share-rounded-96.svg";
import CopyIcon from "assets/images/icons8-copy-96.svg";
import SendEmailIcon from "assets/images/icons8-send-email-96.svg";
import PencilIcon from "assets/images/icons8-pencil-96.svg";
import TrashIcon from "assets/images/icons8-remove-96.svg";
import PrintIcon from "assets/images/icons8-print-96.svg";
import PolygonIcon from "assets/images/icon-polygon.svg";
import Paginate from "components/common/Paginate";

const CmcGuarantee: FC = () => {
  return (
    <main className="relative h-full">
      <header className="sticky top-0 bg-primary-light z-10 flex items-center justify-between h-12 px-6 border border-primary-border">
        <div className="flex items-center">
          <p className="text-lg">Theo dõi bảo lãnh</p>
          <div className="relative px-4">
            <span>
              <img
                src={SearchIcon}
                alt="Search"
                className="absolute top-2 left-7 w-4 h-4"
              />
            </span>
            <input
              type="text"
              placeholder="Nhập từ khóa tìm kiếm"
              className="w-[296px] h-[30px] pl-10 outline-none bg-cbs-table-header"
            />
          </div>
          <button className="w-[78px] h-[30px] flex items-center justify-around bg-cbs-table-header rounded text-primary-gray">
            <img src={SortIcon} alt="Sort" />
            <span>Filter</span>
          </button>

          <div className="flex items-center border-l-2 border-primary-border ml-5 pl-5">
            <button className={"flex items-center mr-3"}>
              <img
                className={"w-[24px] h-[24px]"}
                alt={"icon"}
                src={DownloadIcon}
              />
            </button>
            <button className={"flex items-center mr-3"}>
              <img
                className={"w-[24px] h-[24px]"}
                alt={"icon"}
                src={ShareIcon}
              />
            </button>
            <button className={"flex items-center mr-3"}>
              <img
                className={"w-[24px] h-[24px]"}
                alt={"icon"}
                src={CopyIcon}
              />
            </button>
            <button className={"flex items-center mr-3"}>
              <img
                className={"w-[24px] h-[24px]"}
                alt={"icon"}
                src={SendEmailIcon}
              />
            </button>
            <button className={"flex items-center mr-3"}>
              <img
                className={"w-[24px] h-[24px]"}
                alt={"icon"}
                src={PencilIcon}
              />
            </button>
            <button className={"flex items-center mr-3"}>
              <img
                className={"w-[24px] h-[24px]"}
                alt={"icon"}
                src={TrashIcon}
              />
            </button>
            <button className={"flex items-center mr-3"}>
              <img
                className={"w-[24px] h-[24px]"}
                alt={"icon"}
                src={PrintIcon}
              />
            </button>
          </div>
        </div>
        <button className="flex items-center justify-center text-primary-light bg-cbs-green w-[85px] h-8 rounded font-bold">
          Tạo mới
        </button>
      </header>

      <table className="table-fixed border-collapse w-full overflow-auto border-l border-r border-primary-border">
        <thead className="bg-cbs-table-header h-[50px] border-b border-primary-border">
          <tr className="text-left text-sm text-primary-gray">
            <th className={cn("pb-1 pt-1 text-center", styles.theadInput)}>
              <div className="border-r-2 border-gray-300 flex items-center justify-center">
                <input
                  className="form-check-input mr-2"
                  type="checkbox"
                  value=""
                  defaultChecked
                  id="flexCheckDefault"
                />
                <img src={PolygonIcon} alt="Polygon" />
              </div>
            </th>
            <th className={cn("pb-1 pt-1", styles.theadContact)}>
              <div className="border-r-2 border-gray-300 font-normal pl-2">
                Hợp đồng
              </div>
            </th>
            <th className={cn("pb-1 pt-1 font-normal", styles.theadTenPercent)}>
              <div className="border-r-2 border-gray-300 font-normal pl-2">
                Loại bảo lãnh
              </div>
            </th>
            <th
              className={cn(
                "pb-1 pt-1 font-normal",
                styles.theadSignDateLonger
              )}
            >
              <div className="border-r-2 border-gray-300 font-normal pl-2">
                Thời hạn bảo lãnh
              </div>
            </th>
            <th className={cn("pb-1 pt-1 font-normal", styles.theadTenPercent)}>
              <div className="border-r-2 border-gray-300 font-normal pl-2">
                Giá trị bảo lãnh
              </div>
            </th>
            <th className={cn("pb-1 pt-1 font-normal w-1/5")}>
              <div className="border-r-2 border-gray-300 font-normal pl-2">
                Người phụ trách
              </div>
            </th>
            <th className={cn("pb-1 pt-1 font-normal w-1/5")}>
              <div className="font-normal pl-2">Ghi chú</div>
            </th>
          </tr>
        </thead>

        <tbody>
          <tr className="border-b border-primary-border h-[50px]">
            <td className="py-1 pl-1 text-center">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
                style={{ marginLeft: "-26px" }}
              />
            </td>
            <td className="py-1 px-2">
              Tư vấn Quản lý dự án, Tư vấn BIM, Tư vấn giám sát và thẩm tra
            </td>
            <td className="py-1 px-2">Bảo lãnh tạm ứng</td>
            <td className="py-1 px-2">05/11/2021</td>
            <td className="py-1 px-2">15.332.000.000</td>
            <td className="py-1 px-2">Phùng Thị Thu-PGI (095566633)</td>
            <td className="py-1 px-2">Đang yêu cầu nhà thầu gia hạn</td>
          </tr>

          <tr className="border-b border-primary-border h-[50px]">
            <td className="py-1 pl-1 text-center">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
                style={{ marginLeft: "-26px" }}
              />
            </td>
            <td className="py-1 px-2">
              Tư vấn Quản lý dự án, Tư vấn BIM, Tư vấn giám sát và thẩm tra
            </td>
            <td className="py-1 px-2">Bảo lãnh tạm ứng</td>
            <td className="py-1 px-2">05/11/2021</td>
            <td className="py-1 px-2">15.332.000.000</td>
            <td className="py-1 px-2">Phùng Thị Thu-PGI (095566633)</td>
            <td className="py-1 px-2">Đang yêu cầu nhà thầu gia hạn</td>
          </tr>

          <tr className="border-b border-primary-border h-[50px]">
            <td className="py-1 pl-1 text-center">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
                style={{ marginLeft: "-26px" }}
              />
            </td>
            <td className="py-1 px-2">
              Tư vấn Quản lý dự án, Tư vấn BIM, Tư vấn giám sát và thẩm tra
            </td>
            <td className="py-1 px-2">Bảo lãnh tạm ứng</td>
            <td className="py-1 px-2">05/11/2021</td>
            <td className="py-1 px-2">15.332.000.000</td>
            <td className="py-1 px-2">Phùng Thị Thu-PGI (095566633)</td>
            <td className="py-1 px-2">Đang yêu cầu nhà thầu gia hạn</td>
          </tr>

          <tr className="border-b border-primary-border h-[50px]">
            <td className="py-1 pl-1 text-center">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
                style={{ marginLeft: "-26px" }}
              />
            </td>
            <td className="py-1 px-2">
              Tư vấn Quản lý dự án, Tư vấn BIM, Tư vấn giám sát và thẩm tra
            </td>
            <td className="py-1 px-2">Bảo lãnh tạm ứng</td>
            <td className="py-1 px-2">05/11/2021</td>
            <td className="py-1 px-2">15.332.000.000</td>
            <td className="py-1 px-2">Phùng Thị Thu-PGI (095566633)</td>
            <td className="py-1 px-2">Đang yêu cầu nhà thầu gia hạn</td>
          </tr>
        </tbody>
      </table>

      <Paginate />
    </main>
  );
};

export default CmcGuarantee;
