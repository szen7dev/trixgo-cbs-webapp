import { FC } from "react";

import cn from "classnames";

import { useModal } from "services/hooks/useModal";

import Paginate from "components/common/Paginate";
import SearchInput from "components/common/SearchInput";
import FinancialCashFlowFilterButton from "views/pages/financial/planning/components/FinancialCashFlow/FinancialCashFlowFilterButton";
import ActionGroupFinancial from "views/pages/financial/planning/components/FinancialCashFlow/ActionGroupFinancial";
import ContractProduceModal from "./ContractProduceModal";

import styles from "../../../styles.module.css";

import PolygonIcon from "assets/images/icon-polygon.svg";
import Vertical3Dots from "assets/images/icon-3dots-vertical-gray.svg";

const ContractProduce: FC = () => {
  const { openModal } = useModal();

  return (
    <main className="relative h-full">
      <header className="sticky top-0 bg-primary-light z-10 flex items-center justify-between h-12 px-6 border border-primary-border">
        <div className="flex items-center">
          <p className="text-lg">Sản lượng</p>
          <SearchInput
            classNameWrapper="ml-20"
            classNameInput="outline-none w-[296px]"
            // eslint-disable-next-line no-console
            onChange={(event) => console.log(event.target.value)}
          />
          <FinancialCashFlowFilterButton />
          <div className="border-l-2 border-primary-border ml-5 pl-5">
            <ActionGroupFinancial />
          </div>
        </div>
        <div className="flex items-center">
          <button
            className="flex items-center justify-center text-primary-light bg-cbs-green w-[85px] h-8 rounded font-bold mr-6"
            onClick={() =>
              openModal(
                <div
                  className={
                    "inline-block w-[900px] h-[800px] my-8 overflow-hidden text-left align-middle transition-all transform bg-primary-light shadow-xl"
                  }
                >
                  <ContractProduceModal />
                </div>
              )
            }
          >
            Tạo mới
          </button>
          <button className="w-10 h-10 rounded-full bg-cbs-left-menu flex items-center justify-center">
            <img src={Vertical3Dots} alt="3Dots" />
          </button>
        </div>
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
                Nội dung
              </div>
            </th>
            <th className={cn("pb-1 pt-1 font-normal", styles.theadSignDate)}>
              <div className="border-r-2 border-gray-300 font-normal pl-2">
                Ngày tháng
              </div>
            </th>
            <th className={cn("pb-1 pt-1 font-normal", styles.theadTenPercent)}>
              <div className="border-r-2 border-gray-300 font-normal pl-2">
                Mã hiệu
              </div>
            </th>
            <th className={cn("pb-1 pt-1 font-normal", styles.theadTenPercent)}>
              <div className="border-r-2 border-gray-300 font-normal pl-2">
                Sản lượng trước VAT
              </div>
            </th>
            <th className={cn("pb-1 pt-1 font-normal", styles.theadTenPercent)}>
              <div className="border-r-2 border-gray-300 font-normal pl-2">
                Sản lượng phần VAT
              </div>
            </th>
            <th className={cn("pb-1 pt-1 font-normal", styles.theadTenPercent)}>
              <div className="border-r-2 border-gray-300 font-normal pl-2">
                Sản lượng phát sinh trước VAT
              </div>
            </th>
            <th className={cn("pb-1 pt-1 font-normal", styles.theadTenPercent)}>
              <div className="border-r-2 border-gray-300 font-normal pl-2">
                Còn lại phải thanh toán
              </div>
            </th>
            <th className={cn("pb-1 pt-1 font-normal", styles.theadTenPercent)}>
              <div className="font-normal pl-2">Ghi chú</div>
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
            <td className="py-1 px-2">{""}</td>
            <td className="py-1 px-2">300.000.000</td>
            <td className="py-1 px-2">300.000.000</td>
            <td className="py-1 px-2">300.000.000</td>
            <td className="py-1 px-2">300.000.000</td>
            <td className="py-1 px-2">{""}</td>
          </tr>

          <tr className="border-b border-primary-border h-[50px]">
            <td className="py-1 px-2 text-center">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                defaultChecked
                id="flexCheckDefault"
                style={{ marginLeft: "-23px" }}
              />
            </td>
            <td className="py-1 px-2">
              Khối lượng thực hiện tháng 6 năm 2021 gói thầu Binary
            </td>
            <td className="py-1 px-2">05/11/2021</td>
            <td className="py-1 px-2">P15008</td>
            <td className="py-1 px-2">100.000.000</td>
            <td className="py-1 px-2">100.000.000</td>
            <td className="py-1 px-2">100.000.000</td>
            <td className="py-1 px-2">100.000.000</td>
            <td className="py-1 px-2">Đang triển khai</td>
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
            <td className="py-1 px-2">
              Khối lượng thực hiện tháng 6 năm 2021 gói thầu Binary
            </td>
            <td className="py-1 px-2">05/11/2021</td>
            <td className="py-1 px-2">P15008</td>
            <td className="py-1 px-2">100.000.000</td>
            <td className="py-1 px-2">100.000.000</td>
            <td className="py-1 px-2">100.000.000</td>
            <td className="py-1 px-2">100.000.000</td>
            <td className="py-1 px-2">Đang triển khai</td>
          </tr>
        </tbody>
      </table>

      <Paginate />
    </main>
  );
};

export default ContractProduce;
