import { FC, useState } from "react";
import cn from "classnames";

import { Paginate, SearchInput } from "shareComponents/common";
// import FinancialCashFlowFilterButton from "views/pages/financial/planning/components/FinancialCashFlow/FinancialCashFlowFilterButton";
// import ActionGroupFinancial from "views/pages/financial/planning/components/FinancialCashFlow/ActionGroupFinancial";

import PolygonIcon from "assets/images/icon-polygon.svg";
import CompanyLogo from "assets/images/thumbnail1.jpg";
import ThreeDotVerticalIcon from "assets/images/icon-3dots-vertical-gray.svg";

import styles from "views/support/styles/support.module.css";

export const SupportCompanyPage: FC = () => {
  const [itemChecked, setItemChecked] = useState(false);

  return (
    <main className="relative h-full">
      <header className="sticky top-0 bg-primary-light z-10 flex items-center justify-between h-12 px-6 border border-primary-border">
        <div className="flex items-center">
          <p className="text-lg">Danh sách</p>
          <SearchInput
            classNameWrapper="ml-4"
            classNameInput="outline-none w-[296px]"
            onChange={() => ''}
          />
          {/* <FinancialCashFlowFilterButton />
          {itemChecked && (
            <div className="border-l-2 border-primary-border ml-5 pl-5">
              <ActionGroupFinancial />
            </div>
          )} */}
        </div>
        <div className="flex items-center">
          <button
            className="flex items-center justify-center text-primary-light bg-cbs-green w-[85px] h-8 rounded font-bold"
            // onClick={() =>
            //   openModal(
            //     <div
            //       className={
            //         "inline-block w-[900px] h-[800px] my-8 overflow-hidden text-left align-middle transition-all transform bg-primary-light shadow-xl"
            //       }
            //     >
            //       <IncomeFormModal />
            //     </div>
            //   )
            // }
          >
            Tạo mới
          </button>
          <div className="w-10 h-10 bg-secondary-light rounded-full flex items-center justify-center ml-5 cursor-pointer">
            <img src={ThreeDotVerticalIcon} alt="Three Dot" />
          </div>
        </div>
      </header>

      <table className="table-fixed border-collapse w-full overflow-auto border-l border-r border-primary-border">
        <thead className="bg-cbs-table-header h-[38px] border-b border-primary-border">
          <tr className="text-left text-sm">
            <th className={cn("py-1 text-center", styles.theadInput)}>
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
            <th className="w-1/5 py-1">
              <div className="border-r-2 border-gray-300 font-normal pl-2">
                Nội dung
              </div>
            </th>
            <th className={cn("py-1 font-normal", styles.theadSignDate)}>
              <div className="border-r-2 border-gray-300 font-normal pl-2">
                Mã hiệu
              </div>
            </th>
            <th className={cn("py-1 font-normal", styles.theadSignDate)}>
              <div className="border-r-2 border-gray-300 font-normal pl-2">
                Logo
              </div>
            </th>
            <th className="w-1/6 py-1 font-normal">
              <div className="border-r-2 border-gray-300 font-normal pl-2">
                Địa chỉ
              </div>
            </th>
            <th className="w-1/12 py-1 font-normal">
              <div className="border-r-2 border-gray-300 font-normal pl-2">
                Mã số thuế
              </div>
            </th>
            <th className="w-1/12 py-1 font-normal">
              <div className="border-r-2 border-gray-300 font-normal pl-2">
                Điện thoại
              </div>
            </th>
            <th className="w-2/12 py-1 font-normal">
              <div className="border-r-2 border-gray-300 font-normal pl-2">
                Email
              </div>
            </th>
            <th className={cn("py-1 font-normal", styles.theadTenPercent)}>
              <div className="border-r-2 border-gray-300 font-normal pl-2">
                Ngày khởi tạo
              </div>
            </th>
            <th className="w-1/12 py-1 font-normal">
              <div className="font-normal pl-2">Quy mô</div>
            </th>
          </tr>
        </thead>

        <tbody>
          <tr className="border-b border-primary-border h-10">
            <td className="py-1 px-2 text-center">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
                style={{ marginLeft: "-23px" }}
                checked={itemChecked}
                onClick={() => setItemChecked(!itemChecked)}
              />
            </td>
            <td className="py-1 px-2">Công ty cổ phần dịch vụ kiểm thử</td>
            <td className="py-1 px-2">ITEST</td>
            <td className="py-1 px-2">
              <img src={CompanyLogo} alt="Company" className="w-10 h-10" />
            </td>
            <td className="py-1 px-2">
              Số 11, ngách 42/20, đường Yên Bình, tổ 15, Phường Yên Nghĩa
            </td>
            <td className="py-1 px-2">123456789</td>
            <td className="py-1 px-2">123456789</td>
            <td className="py-1 px-2">nameofc@gmail.com</td>
            <td className="py-1 px-2">11/12/21 (6 tháng)</td>
            <td className="py-1 px-2">1-10</td>
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
            <td className="py-1 px-2">Công ty cổ phần dịch vụ kiểm thử</td>
            <td className="py-1 px-2">ITEST</td>
            <td className="py-1 px-2">
              <img src={CompanyLogo} alt="Company" className="w-10 h-10" />
            </td>
            <td className="py-1 px-2">
              Số 11, ngách 42/20, đường Yên Bình, tổ 15, Phường Yên Nghĩa
            </td>
            <td className="py-1 px-2">123456789</td>
            <td className="py-1 px-2">123456789</td>
            <td className="py-1 px-2">nameofc@gmail.com</td>
            <td className="py-1 px-2">11/12/21 (6 tháng)</td>
            <td className="py-1 px-2">1-10</td>
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
            <td className="py-1 px-2">Công ty cổ phần dịch vụ kiểm thử</td>
            <td className="py-1 px-2">ITEST</td>
            <td className="py-1 px-2">
              <img src={CompanyLogo} alt="Company" className="w-10 h-10" />
            </td>
            <td className="py-1 px-2">
              Số 11, ngách 42/20, đường Yên Bình, tổ 15, Phường Yên Nghĩa
            </td>
            <td className="py-1 px-2">123456789</td>
            <td className="py-1 px-2">123456789</td>
            <td className="py-1 px-2">nameofc@gmail.com</td>
            <td className="py-1 px-2">11/12/21 (6 tháng)</td>
            <td className="py-1 px-2">1-10</td>
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
            <td className="py-1 px-2">Công ty cổ phần dịch vụ kiểm thử</td>
            <td className="py-1 px-2">ITEST</td>
            <td className="py-1 px-2">
              <img src={CompanyLogo} alt="Company" className="w-10 h-10" />
            </td>
            <td className="py-1 px-2">
              Số 11, ngách 42/20, đường Yên Bình, tổ 15, Phường Yên Nghĩa
            </td>
            <td className="py-1 px-2">123456789</td>
            <td className="py-1 px-2">123456789</td>
            <td className="py-1 px-2">nameofc@gmail.com</td>
            <td className="py-1 px-2">11/12/21 (6 tháng)</td>
            <td className="py-1 px-2">1-10</td>
          </tr>
        </tbody>
      </table>

      <Paginate />
    </main>
  );
};