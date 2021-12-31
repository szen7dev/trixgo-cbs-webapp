import { FC, useState } from "react";

import { Link } from "react-router-dom";
import cn from "classnames";

import { useModal } from "services/hooks/useModal";

import Paginate from "components/common/Paginate";
import SearchInput from "components/common/SearchInput";
import FinancialCashFlowFilterButton from "views/pages/financial/planning/components/FinancialCashFlow/FinancialCashFlowFilterButton";
import ActionGroupFinancial from "views/pages/financial/planning/components/FinancialCashFlow/ActionGroupFinancial";

import IncomeFormModal from "./components/views/income/IncomeFormModal";

import styles from "./styles.module.css";

import PolygonIcon from "assets/images/icon-polygon.svg";

const CmcIncome: FC = () => {
  const [itemChecked, setItemChecked] = useState(true);

  const { openModal } = useModal();

  return (
    <main className="relative h-full">
      <header className="sticky top-0 bg-primary-light z-10 flex items-center justify-between h-12 px-6 border border-primary-border">
        <div className="flex items-center">
          <p className="text-lg">Hợp đồng bán ra</p>
          <SearchInput
            classNameWrapper="ml-4"
            classNameInput="outline-none w-[296px]"
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
        <button
          className="flex items-center justify-center text-primary-light bg-cbs-green w-[85px] h-8 rounded font-bold"
          onClick={() =>
            openModal(
              <div
                className={
                  "inline-block w-[900px] h-[800px] my-8 overflow-hidden text-left align-middle transition-all transform bg-primary-light shadow-xl"
                }
              >
                <IncomeFormModal />
              </div>
            )
          }
        >
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
                  id="flexCheckDefault"
                />
                <img src={PolygonIcon} alt="Polygon" />
              </div>
            </th>
            <th className="w-1/5 pb-1 pt-1">
              <div className="border-r-2 border-gray-300 font-normal pl-2">
                Hợp đồng
              </div>
            </th>
            <th className={cn("pb-1 pt-1 font-normal", styles.theadSignDate)}>
              <div className="border-r-2 border-gray-300 font-normal pl-2">
                Ngày ký
              </div>
            </th>
            <th className={cn("pb-1 pt-1 font-normal", styles.theadTenPercent)}>
              <div className="border-r-2 border-gray-300 font-normal pl-2">
                Giá trị ký + phát sinh (gồm cả VAT)
              </div>
            </th>
            <th className={cn("pb-1 pt-1 font-normal", styles.theadTenPercent)}>
              <div className="border-r-2 border-gray-300 font-normal pl-2">
                Giá trị nghiệm thu hoàn thành
              </div>
            </th>
            <th className={cn("pb-1 pt-1 font-normal", styles.theadTenPercent)}>
              <div className="border-r-2 border-gray-300 font-normal pl-2">
                Giá trị xuất hóa đơn (VAT)
              </div>
            </th>
            <th className={cn("pb-1 pt-1 font-normal", styles.theadTenPercent)}>
              <div className="border-r-2 border-gray-300 font-normal pl-2">
                Giá trị đề nghị tạm ứng+thanh toán
              </div>
            </th>
            <th className={cn("pb-1 pt-1 font-normal", styles.theadTenPercent)}>
              <div className="border-r-2 border-gray-300 font-normal pl-2">
                Giá trị đã tạm ứng, thanh toán
              </div>
            </th>
            <th className={cn("pb-1 pt-1 font-normal", styles.theadTenPercent)}>
              <div className="border-r-2 border-gray-300 font-normal pl-2">
                Còn lại phải thanh toán
              </div>
            </th>
            <th className={cn("pb-1 pt-1 font-normal", styles.theadTenPercent)}>
              <div className="font-normal pl-2">Tình trạng</div>
            </th>
          </tr>
        </thead>

        <tbody>
          <tr className="border-b border-primary-border h-10 bg-cbs-table-header">
            <td className="py-1 px-2 text-center">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
                style={{ marginLeft: "-23px" }}
              />
            </td>
            <td className="py-1 px-2">{""}</td>
            <td className="py-1 px-2">{""}</td>
            <td className="py-1 px-2">15.332.000.000</td>
            <td className="py-1 px-2">15.332.000.000</td>
            <td className="py-1 px-2">15.332.000.000</td>
            <td className="py-1 px-2">34.125.000</td>
            <td className="py-1 px-2">34.125.000</td>
            <td className="py-1 px-2">34.125.000</td>
            <td className="py-1 px-2">{""}</td>
          </tr>

          <tr className="border-b border-primary-border h-[50px]">
            <td className="py-1 px-2 text-center">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
                checked={itemChecked}
                onChange={() => setItemChecked(!itemChecked)}
                style={{ marginLeft: "-23px" }}
              />
            </td>
            <Link to="/cmcs/contract/12345/home">
              <td className="py-1 px-2">
                Tư vấn Quản lý dự án, Tư vấn BIM, Tư vấn giám sát và thẩm tra
              </td>
            </Link>
            <td className="py-1 px-2">05/11/2021</td>
            <td className="py-1 px-2">15.332.000.000</td>
            <td className="py-1 px-2">15.332.000.000</td>
            <td className="py-1 px-2">15.332.000.000</td>
            <td className="py-1 px-2">34.125.000</td>
            <td className="py-1 px-2">34.125.000</td>
            <td className="py-1 px-2">34.125.000</td>
            <td className="py-1 px-2">Đang làm</td>
          </tr>

          <tr className="border-b border-primary-border h-[50px]">
            <td className="py-1 px-2 text-center">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
                style={{ marginLeft: "-23px" }}
              />
            </td>
            <Link to="/cmcs/contract/12345/home">
              <td className="py-1 px-2">
                Tư vấn Quản lý dự án, Tư vấn BIM, Tư vấn giám sát và thẩm tra
              </td>
            </Link>
            <td className="py-1 px-2">05/11/2021</td>
            <td className="py-1 px-2">15.332.000.000</td>
            <td className="py-1 px-2">15.332.000.000</td>
            <td className="py-1 px-2">15.332.000.000</td>
            <td className="py-1 px-2">34.125.000</td>
            <td className="py-1 px-2">34.125.000</td>
            <td className="py-1 px-2">34.125.000</td>
            <td className="py-1 px-2">Đang làm</td>
          </tr>
        </tbody>
      </table>

      <Paginate />
    </main>
  );
};

export default CmcIncome;
