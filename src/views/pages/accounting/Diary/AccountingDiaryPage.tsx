import { FC } from "react";

import cn from "classnames";

import DropdownSearchable from "components/common/DropdownSearch";
import FinancialCashFlowFilterButton from "../../financial/planning/components/FinancialCashFlow/FinancialCashFlowFilterButton";
import Paginate from "components/common/Paginate";

import ThreeDotsVertical from "assets/images/icon-3dots-vertical-gray.svg";
import PolygonIcon from "assets/images/icon-polygon.svg";

import styles from "../style.module.css";

const AccountingDiaryPage: FC = () => {
  return (
    <main className="h-full">
      <header className="h-[50px] w-full border border-primary-border flex items-center justify-between px-6">
        <p className="text-lg">Sổ nhật ký chung</p>

        <div className="flex items-center">
          <p className="text-primary mr-3">From 1/1/2021 - To 31/12/202</p>

          <DropdownSearchable
            placeholder="Tìm kiếm"
            className="w-[322px] px-2 bg-cbs-table-header"
            classNameInput="h-[30px] bg-cbs-table-header"
            isMultiple={false}
            allowClearValueSingleInput={false}
            showTriangle={true}
            maxWidthInput="max-w-none"
            renderSelectedItem={(item) => <span>{item.text}</span>}
            classNameItem="p-0"
            data={[
              {
                _id: 1,
                content: "131-Phải thu của khách hàng",
              },
              {
                _id: 2,
                content: "131-Phải thu của khách hàng",
              },
              {
                _id: 3,
                content: "131-Phải thu của khách hàng",
              },
            ]}
            formatItem={{
              id: "_id",
              text: "content",
            }}
            inlineSearch={true}
          />
          <FinancialCashFlowFilterButton />
          <div className="w-10 h-10 ml-3 bg-cbs-gray rounded-full flex items-center justify-center cursor-pointer hover:bg-accent-light">
            <img src={ThreeDotsVertical} alt="Three Dot" />
          </div>
        </div>
      </header>

      <section className="mt-4">
        <table className="table-auto w-full text-left">
          <thead className="h-10 bg-cbs-table-header border border-primary-border text-primary-gray">
            <tr>
              <th
                className={cn(
                  "text-center border-r border-primary-border",
                  styles.theadInput
                )}
              >
                <div className="flex items-center justify-center">
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
              <th
                className={cn(
                  "border-r border-primary-border px-2 font-normal",
                  styles.theadCode
                )}
              >
                Ngày
              </th>
              <th className="w-1/12 border-r border-primary-border px-2 font-normal">
                Tên phiếu
              </th>
              <th
                className={cn(
                  "border-r border-primary-border px-2 font-normal",
                  styles.theadContent
                )}
              >
                Nội dung
              </th>
              <th
                className={cn(
                  "border-r border-primary-border px-2 font-normal",
                  styles.theadCode
                )}
              >
                Số hiệu
              </th>
              <th
                className={cn(
                  "border-r border-primary-border px-2 font-normal",
                  styles.theadContent
                )}
              >
                Mã khách
              </th>
              <th className="w-1/12 border-r border-primary-border px-2 font-normal">
                Tài khoản đối ứng
              </th>
              <th className="w-1/12 border-r border-primary-border px-2 font-normal">
                Số tiền nợ
              </th>
              <th className="w-1/12 border-r border-primary-border px-2 font-normal">
                Số tiền có
              </th>
              <th
                className={cn(
                  "border-r border-primary-border px-2 font-normal",
                  styles.theadContent
                )}
              >
                Hợp đồng
              </th>
              <th
                className={cn(
                  "border-r border-primary-border px-2 font-normal",
                  styles.theadContent
                )}
              >
                Sản phẩm
              </th>
            </tr>
          </thead>

          <tbody>
            <tr
              className={cn(
                "border-b border-primary-border h-11",
                styles.bgFooterYellow
              )}
            >
              <td className="py-1 px-2 text-center border-r border-primary-border">
                {""}
              </td>
              <td className="px-2 py-1 border-r border-primary-border">{""}</td>
              <td className="px-2 py-1 border-r border-primary-border">{""}</td>
              <td className="px-2 py-1 font-bold border-r border-primary-border">
                Tổng hợp
              </td>
              <td className="px-2 py-1 border-r border-primary-border">{""}</td>
              <td className="px-2 py-1 border-r border-primary-border">{""}</td>
              <td className="px-2 py-1 border-r border-primary-border">{""}</td>
              <td className="px-2 py-1 font-bold border-r border-primary-border">
                10.000.000
              </td>
              <td className="px-2 py-1 font-bold border-r border-primary-border">
                10.000.000
              </td>
              <td className="px-2 py-1 border-r border-primary-border">{""}</td>
              <td className="px-2 py-1 border-r border-primary-border">{""}</td>
            </tr>

            <tr className="border-b border-primary-border h-11">
              <td className="py-1 px-2 text-center border-r border-primary-border">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                  style={{ marginLeft: "-21px" }}
                />
              </td>
              <td className="px-2 py-1 border-r border-primary-border">
                5/11/2021
              </td>
              <td className="px-2 py-1 border-r border-primary-border">
                Giấy báo nợ
              </td>
              <td className="text-primary px-2 py-1 border-r border-primary-border">
                Chi phí xăng xe phục vụ việc đi lại của nhóm dự án CHG
              </td>
              <td className="px-2 py-1 border-r border-primary-border">
                PGI.PKT13
              </td>
              <td className="px-2 py-1 border-r border-primary-border">
                Công ty xăng dầu số 2 Vạn Phúc
              </td>
              <td className="px-2 py-1 border-r border-primary-border">
                641-Chi phí
              </td>
              <td className="px-2 py-1 border-r border-primary-border">
                10.000.000
              </td>
              <td className="px-2 py-1 border-r border-primary-border">{""}</td>
              <td className="px-2 py-1 border-r border-primary-border">
                Mua bán xăng xe định kỳ cho hoạt động
              </td>
              <td className="px-2 py-1 border-r border-primary-border">
                Than hoạt tính K58
              </td>
            </tr>

            <tr className="border-b border-primary-border h-[720px]">
              <td className="py-1 px-2 text-center border-r border-primary-border">
                {""}
              </td>
              <td className="px-2 py-1 border-r border-primary-border">{""}</td>
              <td className="px-2 py-1 border-r border-primary-border">{""}</td>
              <td className="text-primary px-2 py-1 border-r border-primary-border">
                {""}
              </td>
              <td className="px-2 py-1 border-r border-primary-border">{""}</td>
              <td className="px-2 py-1 border-r border-primary-border">{""}</td>
              <td className="px-2 py-1 border-r border-primary-border">{""}</td>
              <td className="px-2 py-1 border-r border-primary-border">{""}</td>
              <td className="px-2 py-1 border-r border-primary-border">{""}</td>
              <td className="px-2 py-1 border-r border-primary-border">{""}</td>
              <td className="px-2 py-1 border-r border-primary-border">{""}</td>
            </tr>
          </tbody>
        </table>
      </section>

      <Paginate />
    </main>
  );
};

export default AccountingDiaryPage;
