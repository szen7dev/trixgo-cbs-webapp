import { FC, useState } from "react";
import cn from "classnames";

import { Paginate, DropdownSearchable, SearchInput } from "shareComponents/common";

// import FinancialCashFlowFilterButton from "views/pages/financial/planning/components/FinancialCashFlow/FinancialCashFlowFilterButton";
// import ActionGroupFinancial from "views/pages/financial/planning/components/FinancialCashFlow/ActionGroupFinancial";

import PolygonIcon from "assets/images/icon-polygon.svg";
import ThreeDotVerticalIcon from "assets/images/icon-3dots-vertical-gray.svg";

import styles from "views/support/styles/support.module.css";

export const SupportMemberPage: FC = () => {
  const [itemChecked, setItemChecked] = useState(false);

  return (
    <main className="relative h-full">
      <header className="sticky top-0 bg-primary-light z-10">
        <div className="h-10 border border-primary-border flex items-center justify-between px-5">
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
        </div>
        <div className="h-[50px] border border-primary-border flex items-center justify-between px-5">
          <div className="flex items-center">
            <p className="text-lg">Hợp đồng bán ra</p>
            <SearchInput
              classNameWrapper="ml-4"
              classNameInput="outline-none w-[296px]"
              onChange={(event) => console.log(event.target.value)}
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
            <th className="w-1/6 py-1">
              <div className="border-r-2 border-gray-300 font-normal pl-2">
                Họ và tên
              </div>
            </th>
            <th className={cn("py-1 font-normal", styles.theadTwelvePercent)}>
              <div className="border-r-2 border-gray-300 font-normal pl-2">
                Email
              </div>
            </th>
            <th className="w-1/12 py-1 font-normal">
              <div className="border-r-2 border-gray-300 font-normal pl-2">
                Phòng ban
              </div>
            </th>
            <th className={cn("py-1 font-normal", styles.theadTwelvePercent)}>
              <div className="border-r-2 border-gray-300 font-normal pl-2">
                Chức danh
              </div>
            </th>
            <th className={cn("py-1 font-normal", styles.theadSignDate)}>
              <div className="border-r-2 border-gray-300 font-normal pl-2">
                Quyền
              </div>
            </th>
            <th className="w-1/12 py-1 font-normal">
              <div className="border-r-2 border-gray-300 font-normal pl-2">
                Đăng nhập lần cuối
              </div>
            </th>
            <th className="w-1/12 py-1 font-normal">
              <div className="font-normal pl-2">Tình trạng</div>
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
            <td className="py-1 px-2">Nguyễn Phan Thanh Hương-CPMI</td>
            <td className="py-1 px-2">ketoan.kiemthu@gmail.com</td>
            <td className="py-1 px-2">Ban lãnh đạo</td>
            <td className="py-1 px-2">Trưởng phòng kinh doanh</td>
            <td className="py-1 px-2 text-primary">Admin</td>
            <td className="py-1 px-2">05/01/2022 - 14:07</td>
            <td className="py-1 px-2 text-primary">Đang hoạt động</td>
          </tr>

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
            <td className="py-1 px-2">Nguyễn Phan Thanh Hương-CPMI</td>
            <td className="py-1 px-2">ketoan.kiemthu@gmail.com</td>
            <td className="py-1 px-2">Ban lãnh đạo</td>
            <td className="py-1 px-2">Trưởng phòng kinh doanh</td>
            <td className="py-1 px-2">Member</td>
            <td className="py-1 px-2">05/01/2022 - 14:07</td>
            <td className="py-1 px-2">Đã tạm khoá</td>
          </tr>
        </tbody>
      </table>

      <Paginate />
    </main>
  );
};