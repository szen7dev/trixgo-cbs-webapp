import { FC } from "react";

import cn from "classnames";

import SearchInput from "components/common/SearchInput";

import styles from "../style.module.css";

import PolygonIcon from "assets/images/icon-polygon.svg";

const PersonalNotePage: FC = () => {
  return (
    <main className="h-full">
      <header className="sticky top-0 z-10 flex items-center justify-between h-12 px-6 border border-primary-border">
        <div className="flex items-center">
          <p className="text-lg">Danh sách</p>
          <SearchInput
            classNameWrapper="ml-4"
            classNameInput="outline-none w-[296px]"
            placeholder="Nhập từ khóa tìm kiếm"
            // eslint-disable-next-line no-console
            onChange={(event) => console.log(event.target.value)}
          />
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
            <th className="w-2/5 pb-1 pt-1">
              <div className="border-r-2 border-gray-300 font-normal pl-2">
                Doanh nghiệp triển khai
              </div>
            </th>
            <th className="w-1/5 pb-1 pt-1 font-normal">
              <div className="border-r-2 border-gray-300 font-normal pl-2">
                Ghi nhận thực hiện
              </div>
            </th>
            <th className="w-1/5 pb-1 pt-1 font-normal">
              <div className="border-r-2 border-gray-300 font-normal pl-2">
                Đã thanh toán
              </div>
            </th>
            <th className="w-1/5 pb-1 pt-1 font-normal">
              <div className="font-normal pl-2">Còn lại phải trả</div>
            </th>
          </tr>
        </thead>

        <tbody className="bg-primary-light text-right">
          <tr className="border-b border-primary-border h-10">
            <td className="py-1 px-2 text-center">
              <input
                className="form-check-input"
                type="checkbox"
                id="flexCheckDefault"
                style={{ marginLeft: "-23px" }}
              />
            </td>
            <td className="py-1 px-2 text-left">
              Công ty Cổ phần PGI partners
            </td>
            <td className="py-1 px-4">10.000.000</td>
            <td className="py-1 px-4">2.000.000</td>
            <td className="py-1 px-4">8.000.000</td>
          </tr>

          <tr className="border-b border-primary-border h-10">
            <td className="py-1 px-2 text-center">
              <input
                className="form-check-input"
                type="checkbox"
                id="flexCheckDefault"
                style={{ marginLeft: "-23px" }}
              />
            </td>
            <td className="py-1 px-2 text-left">
              Công ty Cổ phần PGI partners
            </td>
            <td className="py-1 px-4">10.000.000</td>
            <td className="py-1 px-4">2.000.000</td>
            <td className="py-1 px-4">8.000.000</td>
          </tr>

          <tr
            className={cn(
              "border-b border-primary-border h-10 font-bold",
              styles.totalBg
            )}
          >
            <td className="py-1 px-2 text-center">
              <input
                className="form-check-input"
                type="checkbox"
                id="flexCheckDefault"
                style={{ marginLeft: "-23px" }}
              />
            </td>
            <td className="py-1 px-2 text-left">Tổng</td>
            <td className="py-1 px-4">20.000.000</td>
            <td className="py-1 px-4">4.000.000</td>
            <td className="py-1 px-4">16.000.000</td>
          </tr>
        </tbody>
      </table>
    </main>
  );
};
export default PersonalNotePage;
