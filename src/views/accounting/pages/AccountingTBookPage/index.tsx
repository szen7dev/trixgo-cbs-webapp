import { FC, useCallback } from "react";
import cn from "classnames";
import styles from 'views/accounting/styles/styles.module.css';

export const AccountingTBookPage: FC = () => {
  return (
    <main className="h-full text-sm">
      <header className="h-[50px] w-full border border-primary-border flex items-center justify-between px-6">
        <p className="text-lg">000-Tên tài khoản</p>
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
              0.000.000.000
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
              0.000.000.000
            </td>
            <td className="pt-2 px-2 border-r border-primary-border font-bold text-primary text-right">
              0.000.000.000
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
              0.000.000.000
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
              0.000.000.000
            </td>
            <td className="pt-2 px-2 border-r border-primary-border text-right">
              0.000.000.000
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
  )
}