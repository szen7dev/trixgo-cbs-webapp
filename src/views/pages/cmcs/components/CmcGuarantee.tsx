import { FC } from "react";

import cn from "classnames";

import Paginate from "components/common/Paginate";
import SearchInput from "components/common/SearchInput";
import FinancialCashFlowFilterButton from "views/pages/financial/planning/components/FinancialCashFlow/FinancialCashFlowFilterButton";
import ActionGroupFinancial from "views/pages/financial/planning/components/FinancialCashFlow/ActionGroupFinancial";

import styles from "../styles.module.css";

import PolygonIcon from "assets/images/icon-polygon.svg";

const CmcGuarantee: FC = () => {
  return (
    <main className="relative h-full">
      <header className="sticky top-0 bg-primary-light z-10 flex items-center justify-between h-12 px-6 border border-primary-border">
        <div className="flex items-center">
          <p className="text-lg">Theo dõi bảo lãnh</p>
          <SearchInput
            classNameWrapper="ml-4"
            classNameInput="outline-none w-[296px]"
            // eslint-disable-next-line no-console
            onChange={(event) => console.log(event.target.value)}
          />
          <FinancialCashFlowFilterButton />
          <div className="border-l-2 border-primary-border ml-5 pl-5">
            <ActionGroupFinancial />
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
            <th className={cn("pb-1 pt-1", styles.theadContract)}>
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
                style={{ marginLeft: "-25px" }}
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
                style={{ marginLeft: "-25px" }}
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
                style={{ marginLeft: "-25px" }}
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
                style={{ marginLeft: "-25px" }}
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
