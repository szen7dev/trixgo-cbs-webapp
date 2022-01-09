import { FC } from "react";

import cn from "classnames";

import Paginate from "components/common/Paginate";
import SearchInput from "components/common/SearchInput";
import FinancialCashFlowFilterButton from "views/pages/financial/planning/components/FinancialCashFlow/FinancialCashFlowFilterButton";

import styles from "../../style.module.css";

import PolygonIcon from "assets/images/icon-polygon.svg";
import Vertical3Dots from "assets/images/icon-3dots-vertical-gray.svg";
import MemberIcon from "assets/images/member-icon.svg";
import CopyIcon from "assets/images/icons8-copy-96.svg";

const Friends: FC = () => {
  return (
    <main className="h-full">
      <header className="sticky top-0 z-10 flex items-center justify-between h-12 px-6 border border-primary-border">
        <div className="flex items-center">
          <p className="text-lg">Danh sách</p>
          <SearchInput
            classNameWrapper="ml-4"
            classNameInput="outline-none w-[296px]"
            placeholder="Nhập từ khóa hoặc mã kết bạn"
            // eslint-disable-next-line no-console
            onChange={(event) => console.log(event.target.value)}
          />
          <FinancialCashFlowFilterButton />
        </div>
        <div className="flex items-center">
          <div className="flex items-center mr-14">
            <p className={cn("text-2xl mr-5", styles.textBoldBlue)}>999336</p>
            <img src={CopyIcon} alt="Copy" className="cursor-pointer" />
          </div>
          <button className="flex items-center justify-center text-primary-light bg-cbs-green w-[130px] h-8 rounded font-bold mr-6">
            Cấp mã kết bạn
          </button>
          <button className="w-10 h-10 rounded-full bg-cbs-left-menu flex items-center justify-center">
            <img src={Vertical3Dots} alt="3Dots" />
          </button>
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
                Tên
              </div>
            </th>
            <th className="w-1/5 pb-1 pt-1 font-normal">
              <div className="border-r-2 border-gray-300 font-normal pl-2">
                Công ty
              </div>
            </th>
            <th className="w-1/12 pb-1 pt-1 font-normal">
              <div className="border-r-2 border-gray-300 font-normal pl-2">
                Email
              </div>
            </th>
            <th className="w-1/12 pb-1 pt-1 font-normal">
              <div className="border-r-2 border-gray-300 font-normal pl-2">
                Điện thoại
              </div>
            </th>
            <th className="w-1/12 pb-1 pt-1 font-normal">
              <div className="border-r-2 border-gray-300 font-normal pl-2">
                Ngày sinh
              </div>
            </th>
            <th className="w-1/12 pb-1 pt-1 font-normal">
              <div className="font-normal pl-2">Hành động</div>
            </th>
          </tr>
        </thead>

        <tbody className="bg-primary-light">
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
            <td className="py-1 px-2">
              <div className="flex items-center">
                <img
                  src={MemberIcon}
                  alt="Member"
                  className="rounded-full mr-2"
                />
                <p>Đỗ Duy Linh-CPMI</p>
              </div>
            </td>
            <td className="py-1 px-2">
              Công ty Cổ phần CONINCO Quản lý dự án và đầu tư
            </td>
            <td className="py-1 px-2">linhdd@gmail.com</td>
            <td className="py-1 px-2">0955666333</td>
            <td className="py-1 px-2">22/12/2021</td>
            <td className="py-1 px-2 text-negative">Huỷ bạn bè</td>
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
            <td className="py-1 px-2">
              <div className="flex items-center">
                <img
                  src={MemberIcon}
                  alt="Member"
                  className="rounded-full mr-2"
                />
                <p>Đỗ Duy Linh-CPMI</p>
              </div>
            </td>
            <td className="py-1 px-2">
              Công ty Cổ phần CONINCO Quản lý dự án và đầu tư
            </td>
            <td className="py-1 px-2">{""}</td>
            <td className="py-1 px-2">{""}</td>
            <td className="py-1 px-2">{""}</td>
            <td className="py-1 px-2 text-primary">Gửi yêu cầu kết bạn</td>
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
            <td className="py-1 px-2">
              <div className="flex items-center">
                <img
                  src={MemberIcon}
                  alt="Member"
                  className="rounded-full mr-2"
                />
                <p>Đỗ Duy Linh-CPMI</p>
              </div>
            </td>
            <td className="py-1 px-2">
              Công ty Cổ phần CONINCO Quản lý dự án và đầu tư
            </td>
            <td className="py-1 px-2">{""}</td>
            <td className="py-1 px-2">{""}</td>
            <td className="py-1 px-2">{""}</td>
            <td className="py-1 px-2 text-primary-gray">Huỷ yêu cầu kết bạn</td>
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
            <td className="py-1 px-2">
              <div className="flex items-center">
                <img
                  src={MemberIcon}
                  alt="Member"
                  className="rounded-full mr-2"
                />
                <p>Đỗ Duy Linh-CPMI</p>
              </div>
            </td>
            <td className="py-1 px-2">
              Công ty Cổ phần CONINCO Quản lý dự án và đầu tư
            </td>
            <td className="py-1 px-2">linhdd@gmail.com</td>
            <td className="py-1 px-2">0955666333</td>
            <td className="py-1 px-2">22/12/2021</td>
            <td className="py-1 px-2 text-negative">Huỷ bạn bè</td>
          </tr>
        </tbody>
      </table>

      <Paginate />
    </main>
  );
};

export default Friends;
