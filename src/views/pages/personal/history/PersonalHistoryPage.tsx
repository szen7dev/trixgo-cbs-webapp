import { FC, useState } from "react";

import cn from "classnames";

import Paginate from "components/common/Paginate";
import SearchInput from "components/common/SearchInput";
import FinancialCashFlowFilterButton from "views/pages/financial/planning/components/FinancialCashFlow/FinancialCashFlowFilterButton";
import ActionGroupFinancial from "views/pages/financial/planning/components/FinancialCashFlow/ActionGroupFinancial";

import styles from "../style.module.css";

import PolygonIcon from "assets/images/icon-polygon.svg";

const PersonalNotePage: FC = () => {
  const [itemChecked, setItemChecked] = useState(false);

  return (
    <main className="h-full">
      <header className="sticky top-0 z-10 flex items-center justify-between h-12 px-6 border border-primary-border">
        <div className="flex items-center">
          <p className="text-lg">Lịch sử truy cập</p>
          <SearchInput
            classNameWrapper="ml-4"
            classNameInput="outline-none w-[296px]"
            placeholder="Nhập từ khóa tìm kiếm"
            // eslint-disable-next-line no-console
            onChange={(event) => console.log(event.target.value)}
          />
          <FinancialCashFlowFilterButton />
          {itemChecked && (
            <div className="border-l-2 border-primary-border ml-5 pl-5">
              <ActionGroupFinancial />
            </div>
          )}
        </div>
      </header>

      <table className="table-fixed border-collapse w-full overflow-auto border-l border-r border-primary-border">
        <thead className="bg-cbs-table-header h-10 border-b border-primary-border">
          <tr className="text-left text-sm text-primary-gray">
            <th className={cn("pb-1 pt-1 text-center", styles.theadInput)}>
              <div className="border-r-2 border-gray-300 flex items-center justify-center">
                <input
                  className="form-check-input mr-2"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                  defaultChecked
                />
                <img src={PolygonIcon} alt="Polygon" />
              </div>
            </th>
            <th className="w-1/5 pb-1 pt-1">
              <div className="border-r-2 border-gray-300 font-normal pl-2">
                Họ và tên
              </div>
            </th>
            <th className="w-1/5 pb-1 pt-1 font-normal">
              <div className="border-r-2 border-gray-300 font-normal pl-2">
                Phân vùng
              </div>
            </th>
            <th className="w-1/12 pb-1 pt-1 font-normal">
              <div className="border-r-2 border-gray-300 font-normal pl-2">
                Ứng dụng
              </div>
            </th>
            <th className="w-1/12 pb-1 pt-1 font-normal">
              <div className="border-r-2 border-gray-300 font-normal pl-2">
                Tính năng
              </div>
            </th>
            <th className="w-1/12 pb-1 pt-1 font-normal">
              <div className="border-r-2 border-gray-300 font-normal pl-2">
                Thiết bị
              </div>
            </th>
            <th className="w-1/12 pb-1 pt-1 font-normal">
              <div className="font-normal pl-2">Thời gian truy cập</div>
            </th>
          </tr>
        </thead>

        <tbody className="bg-primary-light">
          <tr className="border-b border-primary-border h-10">
            <td className="py-1 px-2 text-center">
              <input
                className="form-check-input"
                type="checkbox"
                id="flexCheckDefault"
                style={{ marginLeft: "-23px" }}
                checked={itemChecked}
                onClick={() => setItemChecked(!itemChecked)}
              />
            </td>
            <td className="py-1 px-2">Trương Hoàng Việt Ánh-PGI</td>
            <td className="py-1 px-2">Công ty Cổ phần PGI Partners</td>
            <td className="py-1 px-2">Quản lý công việc</td>
            <td className="py-1 px-2">Báo cáo quản trị</td>
            <td className="py-1 px-2">Mobile</td>
            <td className="py-1 px-2 text-primary">20/12/2021 14:40</td>
          </tr>

          <tr className="border-b border-primary-border h-10">
            <td className="py-1 px-2 text-center">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
                style={{ marginLeft: "-23px" }}
              />
            </td>
            <td className="py-1 px-2">Trương Hoàng Việt Ánh-PGI</td>
            <td className="py-1 px-2">Công ty Cổ phần PGI Partners</td>
            <td className="py-1 px-2">Quản lý công việc</td>
            <td className="py-1 px-2">Báo cáo quản trị</td>
            <td className="py-1 px-2">Mobile</td>
            <td className="py-1 px-2 text-primary">20/12/2021 14:40</td>
          </tr>

          <tr className="border-b border-primary-border h-10">
            <td className="py-1 px-2 text-center">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
                style={{ marginLeft: "-23px" }}
              />
            </td>
            <td className="py-1 px-2">Trương Hoàng Việt Ánh-PGI</td>
            <td className="py-1 px-2">Công ty Cổ phần PGI Partners</td>
            <td className="py-1 px-2">Quản lý công việc</td>
            <td className="py-1 px-2">Báo cáo quản trị</td>
            <td className="py-1 px-2">Mobile</td>
            <td className="py-1 px-2 text-primary">20/12/2021 14:40</td>
          </tr>

          <tr className="border-b border-primary-border h-10">
            <td className="py-1 px-2 text-center">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
                style={{ marginLeft: "-23px" }}
              />
            </td>
            <td className="py-1 px-2">Trương Hoàng Việt Ánh-PGI</td>
            <td className="py-1 px-2">Công ty Cổ phần PGI Partners</td>
            <td className="py-1 px-2">Quản lý công việc</td>
            <td className="py-1 px-2">Báo cáo quản trị</td>
            <td className="py-1 px-2">Mobile</td>
            <td className="py-1 px-2 text-primary">20/12/2021 14:40</td>
          </tr>
        </tbody>
      </table>

      <Paginate />
    </main>
  );
};
export default PersonalNotePage;
