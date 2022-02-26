import { FC, useCallback } from "react";

import cn from "classnames";

import { DropdownSearchable, } from "shareComponents/common";
import { DropdownFilterButton } from "views/accounting/shareComponents/common";
import styles from 'views/accounting/styles/styles.module.css';

import ThreeDotsVertical from "assets/images/icon-3dots-vertical-gray.svg";

export const AccountingTBookPage: FC = () => {
  const handleOnFilter = useCallback((values) => {
    console.log('🚀 ~ handleOnFilter ~ values', values)

    // setPageParam(() => ({ ...values }));
    return true;
  }, []);

  const handleOnCancelFilter = useCallback(() => {
    // setPageParam({});
  }, []);
  return (
    <main className="h-full text-sm">
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

          <DropdownFilterButton
            onSubmit={handleOnFilter}
            onCancel={handleOnCancelFilter}
            initialValues={{}}
          />
          <div className="w-10 h-10 ml-3 bg-cbs-gray rounded-full flex items-center justify-center cursor-pointer hover:bg-accent-light">
            <img src={ThreeDotsVertical} alt="Three Dot" />
          </div>
        </div>
      </header>

      <table className="table-auto w-3/5 border border-primary-border">
        <thead className="border-b border-primary-border h-9 bg-cbs-table-header text-primary-gray">
          <tr>
            <td className="w-1/5 pt-2 px-2 border-r border-primary-border">
              Tài khoản đối ứng
            </td>
            <td className="w-2/5 pt-2 px-10 border-r border-primary-border">
              Nội dung tài khoản
            </td>
            <td className="w-1/5 pt-2 px-2 border-r border-primary-border">
              Phát sinh nợ
            </td>
            <td className="w-1/5 pt-2 px-2 border-r border-primary-border">
              Phát sinh có
            </td>
          </tr>
        </thead>

        <tbody>
          <tr
            className={cn(
              "h-9 border-b border-primary-border",
              styles.bgFooterYellow
            )}
          >
            <td className="pt-2 px-2 border-r border-primary-border">{""}</td>
            <td className="pt-2 px-10 border-r border-primary-border font-bold">
              Số dư nợ đầu kỳ
            </td>
            <td className="pt-2 px-2 border-r border-primary-border font-bold text-primary text-right">
              1.500.000.000
            </td>
            <td className="pt-2 px-2 border-r border-primary-border font-bold text-primary text-right">
              {""}
            </td>
          </tr>
          <tr
            className={cn(
              "h-9 border-b border-primary-border",
              styles.bgFooterYellow
            )}
          >
            <td className="pt-2 px-2 border-r border-primary-border">{""}</td>
            <td className="pt-2 px-10 border-r border-primary-border font-bold">
              Tổng phát sinh trong kỳ
            </td>
            <td className="pt-2 px-2 border-r border-primary-border font-bold text-primary text-right">
              2.500.000.000
            </td>
            <td className="pt-2 px-2 border-r border-primary-border font-bold text-primary text-right">
              500.000.000
            </td>
          </tr>
          <tr
            className={cn(
              "h-9 border-b border-primary-border",
              styles.bgFooterYellow
            )}
          >
            <td className="pt-2 px-2 border-r border-primary-border">{""}</td>
            <td className="pt-2 px-10 border-r border-primary-border font-bold">
              Số dư nợ cuối kỳ
            </td>
            <td className="pt-2 px-2 border-r border-primary-border font-bold text-primary text-right">
              3.500.000.000
            </td>
            <td className="pt-2 px-2 border-r border-primary-border font-bold text-primary text-right">
              {""}
            </td>
          </tr>

          <tr className="h-9">
            <td className="pt-2 px-2 border-r border-primary-border">112</td>
            <td className="pt-2 px-10 border-r border-primary-border text-primary">
              Tiền gửi Ngân hàng
            </td>
            <td className="pt-2 px-2 border-r border-primary-border text-right">
              1.500.000.000
            </td>
            <td className="pt-2 px-2 border-r border-primary-border text-right">
              1.500.000.000
            </td>
          </tr>

          <tr className="h-9 border-b border-primary-border">
            <td className="pt-2 px-2 border-r border-primary-border">...</td>
            <td className="pt-2 px-10 border-r border-primary-border text-primary">
              ...
            </td>
            <td className="pt-2 px-2 border-r border-primary-border text-right">
              ...
            </td>
            <td className="pt-2 px-2 border-r border-primary-border text-right">
              ...
            </td>
          </tr>
          <tr className="h-9 border-b border-primary-border">
            <td className="pt-2 px-2 border-r border-primary-border">...</td>
            <td className="pt-2 px-10 border-r border-primary-border text-primary">
              ...
            </td>
            <td className="pt-2 px-2 border-r border-primary-border text-right">
              ...
            </td>
            <td className="pt-2 px-2 border-r border-primary-border text-right">
              ...
            </td>
          </tr>
          <tr className="h-9 border-b border-primary-border">
            <td className="pt-2 px-2 border-r border-primary-border">...</td>
            <td className="pt-2 px-10 border-r border-primary-border text-primary">
              ...
            </td>
            <td className="pt-2 px-2 border-r border-primary-border text-right">
              ...
            </td>
            <td className="pt-2 px-2 border-r border-primary-border text-right">
              ...
            </td>
          </tr>
        </tbody>
      </table>
    </main>
  );
};
