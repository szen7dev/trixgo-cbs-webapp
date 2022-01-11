import { FC } from "react";

import cn from "classnames";

import Paginate from "components/common/Paginate";

import styles from "../../style.module.css";

const PurchaseList: FC = () => {
  return (
    <main className="h-full">
      <header className="bg-cbs-table-header h-[50px] border border-primary-border flex justify-between text-primary-gray">
        <div
          className={cn(
            "border-r border-primary-border flex items-center h-full px-2",
            styles.theadCode
          )}
        >
          Số hóa đơn
        </div>
        <div
          className={cn(
            "border-r border-primary-border flex items-center h-full px-2",
            styles.theadCode
          )}
        >
          Ngày hóa đơn
        </div>
        <div
          className={cn(
            "border-r border-primary-border flex items-center h-full px-2",
            styles.theadCode
          )}
        >
          Ngày hoạch toán
        </div>
        <div
          className={cn(
            "border-r border-primary-border flex items-center h-full px-2",
            styles.theadEightteenPercent
          )}
        >
          Mã khách
        </div>
        <div
          className={cn(
            "border-r border-primary-border flex items-center h-full px-2",
            styles.theadCode
          )}
        >
          Mã số thuế người bán
        </div>
        <div
          className={cn(
            "border-r border-primary-border flex items-center h-full px-2",
            styles.theadEightteenPercent
          )}
        >
          Địa chỉ người bán
        </div>
        <div
          className={cn(
            "border-r border-primary-border flex items-center h-full px-2",
            styles.theadTenPercent
          )}
        >
          Hợp đồng
        </div>
        <div
          className={cn(
            "border-r border-primary-border flex items-center h-full px-2",
            styles.theadTenPercent
          )}
        >
          Mặt hàng
        </div>
        <div
          className={cn(
            "border-r border-primary-border flex items-center h-full px-2",
            styles.theadTenPercent
          )}
        >
          Doanh số mua chưa có thuế
        </div>
        <div
          className={cn(
            "border-r border-primary-border flex items-center h-full px-2",
            styles.theadTenPercent
          )}
        >
          Thuế GTGT đủ điều kiện khấu trừ
        </div>
      </header>

      <section>
        <div className="h-[50px] border border-primary-border flex justify-between text-primary-gray">
          <div
            className={cn(
              "border-r border-primary-border flex items-center h-full px-2",
              styles.theadCode
            )}
          >
            PGI.PKT13
          </div>
          <div
            className={cn(
              "border-r border-primary-border flex items-center h-full px-2",
              styles.theadCode
            )}
          >
            5/11/2021
          </div>
          <div
            className={cn(
              "border-r border-primary-border flex items-center h-full px-2",
              styles.theadCode
            )}
          >
            5/11/2021
          </div>
          <div
            className={cn(
              "border-r border-primary-border flex items-center h-full px-2",
              styles.theadEightteenPercent
            )}
          >
            Công ty xăng dầu số 2 Vạn Phúc
          </div>
          <div
            className={cn(
              "border-r border-primary-border flex items-center h-full px-2",
              styles.theadCode
            )}
          >
            0120000
          </div>
          <div
            className={cn(
              "border-r border-primary-border flex items-center h-full px-2",
              styles.theadEightteenPercent
            )}
          >
            Tầng 3, tòa nhà 789, số 147 đường Hoàng Quốc Việt, Phường Nghĩa Đô
          </div>
          <div
            className={cn(
              "border-r border-primary-border flex items-center h-full px-2",
              styles.theadTenPercent
            )}
          >
            Tư vấn Quản lý dự án
          </div>
          <div
            className={cn(
              "border-r border-primary-border flex items-center h-full px-2",
              styles.theadTenPercent
            )}
          >
            CN trả lãi
          </div>
          <div
            className={cn(
              "border-r border-primary-border flex items-center h-full px-2",
              styles.theadTenPercent
            )}
          >
            15.000.000
          </div>
          <div
            className={cn(
              "border-r border-primary-border flex items-center h-full px-2",
              styles.theadTenPercent
            )}
          >
            1.500.000
          </div>
        </div>

        <div className="h-[800px] border border-primary-border flex justify-between text-primary-gray">
          <div
            className={cn(
              "border-r border-primary-border flex items-center h-full px-2",
              styles.theadCode
            )}
          >
            {""}
          </div>
          <div
            className={cn(
              "border-r border-primary-border flex items-center h-full px-2",
              styles.theadCode
            )}
          >
            {""}
          </div>
          <div
            className={cn(
              "border-r border-primary-border flex items-center h-full px-2",
              styles.theadCode
            )}
          >
            {""}
          </div>
          <div
            className={cn(
              "border-r border-primary-border flex items-center h-full px-2",
              styles.theadEightteenPercent
            )}
          >
            {""}
          </div>
          <div
            className={cn(
              "border-r border-primary-border flex items-center h-full px-2",
              styles.theadCode
            )}
          >
            {""}
          </div>
          <div
            className={cn(
              "border-r border-primary-border flex items-center h-full px-2",
              styles.theadEightteenPercent
            )}
          >
            {""}
          </div>
          <div
            className={cn(
              "border-r border-primary-border flex items-center h-full px-2",
              styles.theadTenPercent
            )}
          >
            {""}
          </div>
          <div
            className={cn(
              "border-r border-primary-border flex items-center h-full px-2",
              styles.theadTenPercent
            )}
          >
            {""}
          </div>
          <div
            className={cn(
              "border-r border-primary-border flex items-center h-full px-2",
              styles.theadTenPercent
            )}
          >
            {""}
          </div>
          <div
            className={cn(
              "border-r border-primary-border flex items-center h-full px-2",
              styles.theadTenPercent
            )}
          >
            {""}
          </div>
        </div>
      </section>

      <div className="absolute bottom-9 w-full border border-gray-300">
        <Paginate />
      </div>
      <footer
        className={cn(
          "h-9 w-full border border-primary-border flex items-center justify-between absolute bottom-0",
          styles.bgFooterYellow
        )}
      >
        <div
          className={cn(
            "font-bold text-primary flex items-center h-full px-2",
            styles.theadCode
          )}
        >
          Tổng
        </div>
        <div className={cn("flex items-center h-full px-2", styles.theadCode)}>
          {""}
        </div>
        <div className={cn("flex items-center h-full px-2", styles.theadCode)}>
          {""}
        </div>
        <div
          className={cn(
            "flex items-center h-full px-2",
            styles.theadEightteenPercent
          )}
        >
          {""}
        </div>
        <div className={cn("flex items-center h-full px-2", styles.theadCode)}>
          {""}
        </div>
        <div
          className={cn(
            "flex items-center h-full px-2",
            styles.theadEightteenPercent
          )}
        >
          {""}
        </div>
        <div
          className={cn(
            "flex items-center h-full px-2",
            styles.theadTenPercent
          )}
        >
          {""}
        </div>
        <div
          className={cn(
            "flex items-center h-full px-2",
            styles.theadTenPercent
          )}
        >
          {""}
        </div>
        <div
          className={cn(
            "font-bold flex items-center h-full px-2",
            styles.theadTenPercent
          )}
        >
          30.000.000
        </div>
        <div
          className={cn(
            "font-bold flex items-center h-full px-2",
            styles.theadTenPercent
          )}
        >
          3.000.000
        </div>
      </footer>
    </main>
  );
};

export default PurchaseList;
