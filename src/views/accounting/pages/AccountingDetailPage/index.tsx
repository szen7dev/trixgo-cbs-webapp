import { FC, useCallback } from "react";

import cn from "classnames";

import { DropdownSearchable, Paginate } from "shareComponents/common";
import { DropdownFilterButton } from "views/accounting/shareComponents/common";
import styles from 'views/accounting/styles/styles.module.css';

import ThreeDotVerticalIcon from "assets/images/icon-3dots-vertical-gray.svg";
import PolygonIcon from "assets/images/icon-polygon.svg";

export const AccountingDetailPage: FC = () => {
  const handleOnFilter = useCallback((values) => {
    // setPageParam(() => ({ ...values }));
    return true;
  }, []);

  const handleOnCancelFilter = useCallback(() => {
    // setPageParam({});
  }, []);
  return (
    <main className="h-full">
      <header className="h-[50px] w-full border border-primary-border flex items-center justify-between px-6">
        <p className="text-lg">111-Tiền mặt</p>

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
                content: "111-Tiền mặt",
              },
              {
                _id: 2,
                content: "222-Tiền mặt",
              },
              {
                _id: 3,
                content: "333-Tiền mặt",
              },
            ]}
            formatItem={{
              id: "_id",
              text: "content",
            }}
            inlineSearch={true}
          />

          <DropdownFilterButton
            onSubmit={handleOnFilter}
            onCancel={handleOnCancelFilter}
            initialValues={{}}
          />
          <div className="w-10 h-10 ml-3 bg-cbs-gray rounded-full flex items-center justify-center cursor-pointer hover:bg-accent-light">
            <img src={ThreeDotVerticalIcon} alt="Three Dot" />
          </div>
        </div>
      </header>

      <table className="table-fixed border-collapse w-full overflow-auto border-l border-r border-primary-border">
        <thead className="bg-cbs-table-header h-10 border-b border-primary-border">
          <tr className="text-left text-sm text-primary-gray">
            <th
              className={cn(
                "py-1 px-2 text-center border-r border-primary-border",
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
                "py-1 px-2 font-normal border-r border-primary-border",
                styles.theadDate
              )}
            >
              Ngày
            </th>
            <th
              className={cn(
                "py-1 px-2 font-normal border-r border-primary-border",
                styles.theadCode
              )}
            >
              Tên phiếu
            </th>
            <th
              className={cn(
                "py-1 px-2 font-normal border-r border-primary-border",
                styles.theadContent
              )}
            >
              Nội dung
            </th>
            <th
              className={cn(
                "py-1 px-2 font-normal border-r border-primary-border",
                styles.theadCode
              )}
            >
              Số hiệu
            </th>
            <th
              className={cn(
                "py-1 px-2 font-normal border-r border-primary-border",
                styles.theadCusCode
              )}
            >
              Mã khách
            </th>
            <th className="w-1/12 py-1 px-2 font-normal border-r border-primary-border">
              Tài khoản đối ứng
            </th>
            <th
              className={cn(
                "py-1 px-2 font-normal border-r border-primary-border",
                styles.theadCode
              )}
            >
              Phát sinh nợ
            </th>
            <th
              className={cn(
                "py-1 px-2 font-normal border-r border-primary-border",
                styles.theadCode
              )}
            >
              Phát sinh có
            </th>
            <th
              className={cn(
                "py-1 px-2 font-normal border-r border-primary-border",
                styles.theadCode
              )}
            >
              Dư nợ/có
            </th>
            <th className="w-1/12 py-1 px-2 font-normal border-r border-primary-border">
              Hợp đồng
            </th>
            <th className="w-1/12 py-1 px-2 font-normal">Ghi chú</th>
          </tr>
        </thead>

        <tbody className="bg-primary-light">
          <tr
            className={cn(
              "border-b border-primary-border h-10",
              styles.bgBlueLight
            )}
          >
            <td className="py-1 px-2 text-center border-r border-primary-border">
              {""}
            </td>
            <td className="py-1 px-2 border-r border-primary-border">{""}</td>
            <td className="py-1 px-2 border-r border-primary-border">{""}</td>
            <td className="py-1 px-2 font-bold border-r border-primary-border">
              Đầu kỳ
            </td>
            <td className="py-1 px-2 border-r border-primary-border">{""}</td>
            <td className="py-1 px-2 border-r border-primary-border">{""}</td>
            <td className="py-1 px-2 border-r border-primary-border">{""}</td>
            <td className="py-1 px-2 border-r border-primary-border">{""}</td>
            <td className="py-1 px-2 border-r border-primary-border">{""}</td>
            <td className="py-1 px-2 font-bold border-r border-primary-border">
              20.000.000
            </td>
            <td className="py-1 px-2 border-r border-primary-border">{""}</td>
            <td className="py-1 px-2 border-r border-primary-border">{""}</td>
          </tr>

          <tr className="border-b border-primary-border h-10">
            <td className="py-1 px-2 text-center border-r border-primary-border">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
                style={{ marginLeft: "-23px" }}
              />
            </td>
            <td className="py-1 px-2 border-r border-primary-border">
              5/11/2021
            </td>
            <td className="py-1 px-2 border-r border-primary-border">
              Giấy báo nợ
            </td>
            <td className="py-1 px-2 text-primary border-r border-primary-border">
              Chi phí xăng xe phục vụ việc đi lại của nhóm dự án CHG
            </td>
            <td className="py-1 px-2 border-r border-primary-border">
              PGI.PKT13
            </td>
            <td className="py-1 px-2 border-r border-primary-border">
              Công ty xăng dầu số 2 Vạn Phúc
            </td>
            <td className="py-1 px-2 border-r border-primary-border">
              4111-Vốn đầu tư của chủ sở hữu
            </td>
            <td className="py-1 px-2 border-r border-primary-border">
              10.000.000
            </td>
            <td className="py-1 px-2 border-r border-primary-border">{""}</td>
            <td className="py-1 px-2 border-r border-primary-border">
              30.000.000
            </td>
            <td className="py-1 px-2 border-r border-primary-border">
              Mua bán xăng xe định kỳ cho hoạt động
            </td>
            <td className="py-1 px-2 border-r border-primary-border">
              Đã lưu chứng từ gốc tại công ty
            </td>
          </tr>

          <tr className="border-b border-primary-border h-10">
            <td className="py-1 px-2 text-center border-r border-primary-border">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
                style={{ marginLeft: "-23px" }}
              />
            </td>
            <td className="py-1 px-2 border-r border-primary-border">
              5/11/2021
            </td>
            <td className="py-1 px-2 border-r border-primary-border">
              Giấy báo nợ
            </td>
            <td className="py-1 px-2 text-primary border-r border-primary-border">
              Chi phí xăng xe phục vụ việc đi lại của nhóm dự án CHG
            </td>
            <td className="py-1 px-2 border-r border-primary-border">
              PGI.PKT13
            </td>
            <td className="py-1 px-2 border-r border-primary-border">
              Công ty xăng dầu số 2 Vạn Phúc
            </td>
            <td className="py-1 px-2 border-r border-primary-border">
              4111-Vốn đầu tư của chủ sở hữu
            </td>
            <td className="py-1 px-2 border-r border-primary-border">
              10.000.000
            </td>
            <td className="py-1 px-2 border-r border-primary-border">{""}</td>
            <td className="py-1 px-2 border-r border-primary-border">
              30.000.000
            </td>
            <td className="py-1 px-2 border-r border-primary-border">
              Mua bán xăng xe định kỳ cho hoạt động
            </td>
            <td className="py-1 px-2 border-r border-primary-border">
              Đã lưu chứng từ gốc tại công ty
            </td>
          </tr>

          <tr className="border-b border-primary-border h-[643px]">
            <td className="py-1 px-2 text-center border-r border-primary-border">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
                style={{ marginLeft: "-23px" }}
              />
            </td>
            <td className="py-1 px-2 border-r border-primary-border">...</td>
            <td className="py-1 px-2 border-r border-primary-border">...</td>
            <td className="py-1 px-2 text-primary border-r border-primary-border">
              ...
            </td>
            <td className="py-1 px-2 border-r border-primary-border">...</td>
            <td className="py-1 px-2 border-r border-primary-border">...</td>
            <td className="py-1 px-2 border-r border-primary-border">...</td>
            <td className="py-1 px-2 border-r border-primary-border">
              10.000.000
            </td>
            <td className="py-1 px-2 border-r border-primary-border">...</td>
            <td className="py-1 px-2 border-r border-primary-border">
              45.000.000
            </td>
            <td className="py-1 px-2 border-r border-primary-border">...</td>
            <td className="py-1 px-2 border-r border-primary-border">...</td>
          </tr>

          <tr
            className={cn(
              "border-b border-primary-border h-10",
              styles.bgFooterYellow
            )}
          >
            <td className="py-1 px-2 text-center border-r border-primary-border">
              {""}
            </td>
            <td className="py-1 px-2 border-r border-primary-border">{""}</td>
            <td className="py-1 px-2 border-r border-primary-border">{""}</td>
            <td className="py-1 px-2 font-bold border-r border-primary-border">
              Cuối kỳ
            </td>
            <td className="py-1 px-2 border-r border-primary-border">{""}</td>
            <td className="py-1 px-2 border-r border-primary-border">{""}</td>
            <td className="py-1 px-2 border-r border-primary-border">{""}</td>
            <td className="py-1 px-2 font-bold border-r border-primary-border">
              30.000.000
            </td>
            <td className="py-1 px-2 font-bold border-r border-primary-border">
              5.000.000
            </td>
            <td className="py-1 px-2 font-bold border-r border-primary-border">
              45.000.000
            </td>
            <td className="py-1 px-2 border-r border-primary-border">{""}</td>
            <td className="py-1 px-2 border-r border-primary-border">{""}</td>
          </tr>
        </tbody>
      </table>

      <Paginate />
    </main>
  );
};
