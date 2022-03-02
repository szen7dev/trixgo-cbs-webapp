import { FC } from "react";
import cn from "classnames";

import { Paginate, DropdownSearchable } from "shareComponents/common";
import PolygonIcon from "assets/images/icon-polygon.svg";

import styles from "views/support/styles/support.module.css";
import { Link } from "react-router-dom";

export const SupportGrantPage: FC = () => {
  return (
    <main className="relative h-full">
      <header className="h-10 border border-primary-border flex items-center justify-between px-5">
        <p className="text-lg">
          Công ty Cổ phần CONINCO Quản lý dự án và Đầu tư
        </p>

        <DropdownSearchable
          placeholder="Chọn phân vùng để thực hiện"
          className="w-[322px] pl-0 bg-cbs-table-header"
          classNameInput="h-[28px] bg-cbs-table-header"
          isMultiple={false}
          allowClearValueSingleInput={false}
          showTriangle={true}
          maxWidthInput="max-w-none"
          renderSelectedItem={(item) => <span>{item.text}</span>}
          classNameItem="p-0"
          data={[
            {
              _id: 1,
              content: "Kết quả trả về 1",
            },
            {
              _id: 2,
              content: "Kết quả trả về 2",
            },
            {
              _id: 3,
              content: "Kết quả trả về 3",
            },
          ]}
          formatItem={{
            id: "_id",
            text: "content",
          }}
          inlineSearch={false}
          disableSearch={false}
          searchInputClassName="h-[40px] w-[322px] px-[46px]"
        />
      </header>

      <table className="table-fixed border-collapse w-full overflow-auto border-l border-r border-primary-border">
        <thead className="bg-cbs-table-header h-10 border-b border-primary-border">
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
                Ứng dụng
              </div>
            </th>
            <th className="w-1/6 py-1 font-normal">
              <div className="border-r-2 border-gray-300 font-normal pl-2">
                Hạn mức tài khoản
              </div>
            </th>
            <th className="w-1/6 py-1 font-normal">
              <div className="border-r-2 border-gray-300 font-normal pl-2">
                Hạn mức dung lượng
              </div>
            </th>
            <th className="w-1/6 py-1 font-normal">
              <div className="border-r-2 border-gray-300 font-normal pl-2">
                Ngày bắt đầu
              </div>
            </th>
            <th className="w-1/6 py-1 font-normal">
              <div className="font-normal pl-2">Hạn sử dụng</div>
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
              />
            </td>
            <td className="py-1 px-2">Quản lý dự án</td>
            <td className="py-1 px-2">100</td>
            <td className="py-1 px-2">100</td>
            <td className="py-1 px-2">15/12/2021</td>
            <td className="py-1 px-2">15/12/2022</td>
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
            <Link to="/support/grant/documents-management">
              <td className="py-1 px-2">Quản lý hồ sơ văn bản</td>
            </Link>
            <td className="py-1 px-2">100</td>
            <td className="py-1 px-2">100</td>
            <td className="py-1 px-2">15/12/2021</td>
            <td className="py-1 px-2">15/12/2022</td>
          </tr>
        </tbody>
      </table>

      <Paginate />
    </main>
  );
};