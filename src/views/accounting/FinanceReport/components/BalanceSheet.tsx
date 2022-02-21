import { FC } from "react";

import cn from "classnames";

import styles from "../../style.module.css";

const BalanceSheet: FC = () => {
  return (
    <main className="h-full text-sm">
      <header className="h-9 bg-cbs-table-header border border-primary-border flex items-center justify-between text-primary-gray">
        <div className="w-1/12 h-full border-r border-primary-border flex items-center px-2">
          Tài khoản
        </div>
        <div
          className={cn(
            "h-full border-r border-primary-border flex items-center px-2",
            styles.theadDes
          )}
        >
          Mô tả
        </div>
        <div className="w-1/5 h-full border-r border-primary-border flex items-center justify-center px-2">
          ĐẦU KỲ
        </div>
        <div className="w-1/5 h-full border-r border-primary-border flex items-center justify-center px-2">
          TRONG KỲ
        </div>
        <div className="w-1/5 text-center">CUỐI KỲ</div>
      </header>

      <header className="h-9 bg-cbs-table-header border border-primary-border flex items-center justify-between text-primary-gray">
        <div className="w-1/12 h-full border-r border-primary-border flex items-center px-2">
          {""}
        </div>
        <div
          className={cn(
            "h-full border-r border-primary-border flex items-center px-2",
            styles.theadDes
          )}
        >
          {""}
        </div>
        <div className="w-1/5 h-full border-r border-primary-border flex items-center px-2">
          <div className="w-1/2 h-full border-r border-primary-border flex items-center">
            Phát sinh nợ
          </div>
          <div className="w-1/2 h-full flex items-center pl-2">
            Phát sinh có
          </div>
        </div>
        <div className="w-1/5 h-full border-r border-primary-border flex items-center px-2">
          <div className="w-1/2 h-full border-r border-primary-border flex items-center">
            Phát sinh nợ
          </div>
          <div className="w-1/2 h-full flex items-center pl-2">
            Phát sinh có
          </div>
        </div>
        <div className="w-1/5 h-full flex items-center px-2">
          <div className="w-1/2 h-full border-r border-primary-border flex items-center">
            Phát sinh nợ
          </div>
          <div className="w-1/2 h-full flex items-center pl-2">
            Phát sinh có
          </div>
        </div>
      </header>

      <section>
        <div className="h-9 border border-primary-border flex items-center justify-between text-primary-gray">
          <div className="w-1/12 h-full border-r border-primary-border flex items-center px-2 text-primary font-bold">
            131
          </div>
          <div
            className={cn(
              "h-full border-r border-primary-border flex items-center px-2 text-primary font-bold",
              styles.theadDes
            )}
          >
            Phải thu của khách hàng
          </div>
          <div className="w-1/5 h-full border-r border-primary-border flex items-center px-2">
            <div className="w-1/2 h-full border-r border-primary-border flex items-center">
              15.000.000
            </div>
            <div className="w-1/2 h-full flex items-center pl-2">
              15.000.000
            </div>
          </div>
          <div className="w-1/5 h-full border-r border-primary-border flex items-center px-2">
            <div className="w-1/2 h-full border-r border-primary-border flex items-center">
              15.000.000
            </div>
            <div className="w-1/2 h-full flex items-center pl-2">
              15.000.000
            </div>
          </div>
          <div className="w-1/5 h-full flex items-center px-2">
            <div className="w-1/2 h-full border-r border-primary-border flex items-center">
              15.000.000
            </div>
            <div className="w-1/2 h-full flex items-center pl-2">
              15.000.000
            </div>
          </div>
        </div>
        <div className="h-9 border border-primary-border flex items-center justify-between text-primary-gray">
          <div className="w-1/12 h-full border-r border-primary-border flex items-center px-2 text-primary font-bold">
            141
          </div>
          <div
            className={cn(
              "h-full border-r border-primary-border flex items-center px-2 text-primary font-bold",
              styles.theadDes
            )}
          >
            Tạm ứng
          </div>

          <div className="w-1/5 h-full border-r border-primary-border flex items-center px-2">
            <div className="w-1/2 h-full border-r border-primary-border flex items-center">
              15.000.000
            </div>
            <div className="w-1/2 h-full flex items-center pl-2">
              15.000.000
            </div>
          </div>
          <div className="w-1/5 h-full border-r border-primary-border flex items-center px-2">
            <div className="w-1/2 h-full border-r border-primary-border flex items-center">
              15.000.000
            </div>
            <div className="w-1/2 h-full flex items-center pl-2">
              15.000.000
            </div>
          </div>
          <div className="w-1/5 h-full flex items-center px-2">
            <div className="w-1/2 h-full border-r border-primary-border flex items-center">
              15.000.000
            </div>
            <div className="w-1/2 h-full flex items-center pl-2">
              15.000.000
            </div>
          </div>
        </div>

        <div className="h-9 border border-primary-border flex items-center justify-between text-primary-gray">
          <div className="w-1/12 h-full border-r border-primary-border flex items-center px-2 text-primary font-bold">
            331
          </div>
          <div
            className={cn(
              "h-full border-r border-primary-border flex items-center px-2 text-primary font-bold",
              styles.theadDes,
              styles.tdMarginRightMinus
            )}
          >
            Phải trả cho người bán
          </div>
          <div className="w-1/5 h-full border-r border-primary-border flex items-center px-2">
            <div className="w-1/2 h-full border-r border-primary-border flex items-center">
              15.000.000
            </div>
            <div className="w-1/2 h-full flex items-center pl-2">
              15.000.000
            </div>
          </div>
          <div className="w-1/5 h-full border-r border-primary-border flex items-center px-2">
            <div className="w-1/2 h-full border-r border-primary-border flex items-center">
              15.000.000
            </div>
            <div className="w-1/2 h-full flex items-center pl-2">
              15.000.000
            </div>
          </div>
          <div className="w-1/5 h-full flex items-center px-2">
            <div className="w-1/2 h-full border-r border-primary-border flex items-center">
              15.000.000
            </div>
            <div className="w-1/2 h-full flex items-center pl-2">
              15.000.000
            </div>
          </div>
        </div>

        <div className="h-[700px] border border-primary-border flex items-center justify-between text-primary-gray">
          <div className="w-1/12 h-full border-r border-primary-border flex items-center px-2 text-primary font-bold">
            {""}
          </div>
          <div
            className={cn(
              "h-full border-r border-primary-border flex items-center px-2 text-primary font-bold",
              styles.theadDes,
              styles.tdMarginRightMinus
            )}
          >
            {""}
          </div>
          <div className="w-1/5 h-full border-r border-primary-border flex items-center px-2">
            <div className="w-1/2 h-full border-r border-primary-border flex items-center">
              {""}
            </div>
            <div className="w-1/2 h-full flex items-center pl-2">
              {""}
            </div>
          </div>
          <div className="w-1/5 h-full border-r border-primary-border flex items-center px-2">
            <div className="w-1/2 h-full border-r border-primary-border flex items-center">
              {""}
            </div>
            <div className="w-1/2 h-full flex items-center pl-2">
              {""}
            </div>
          </div>
          <div className="w-1/5 h-full flex items-center px-2">
            <div className="w-1/2 h-full border-r border-primary-border flex items-center">
              {""}
            </div>
            <div className="w-1/2 h-full flex items-center pl-2">
              {""}
            </div>
          </div>
        </div>
      </section>

      <footer
        className={cn(
          "h-9 w-full border border-primary-border flex items-center justify-between absolute bottom-0",
          styles.bgFooterYellow
        )}
      >
        <div className="w-1/12 h-full border-r border-primary-border flex items-center px-2 text-primary font-bold">
          {""}
        </div>
        <div
          className={cn(
            "h-full border-r border-primary-border flex items-center px-2 font-bold",
            styles.theadDes
          )}
        >
          Tổng
        </div>
        <div className="w-1/5 h-full border-r border-primary-border flex items-center px-2">
          <div className="w-1/2 h-full border-r border-primary-border flex items-center font-bold">
            15.000.000
          </div>
          <div className="w-1/2 h-full flex items-center pl-2 font-bold">
            15.000.000
          </div>
        </div>
        <div className="w-1/5 h-full border-r border-primary-border flex items-center px-2">
          <div className="w-1/2 h-full border-r border-primary-border flex items-center font-bold">
            15.000.000
          </div>
          <div className="w-1/2 h-full flex items-center pl-2 font-bold">
            15.000.000
          </div>
        </div>
        <div className="w-1/5 h-full flex items-center px-2">
          <div className="w-1/2 h-full border-r border-primary-border flex items-center font-bold">
            15.000.000
          </div>
          <div className="w-1/2 h-full flex items-center pl-2 font-bold">
            15.000.000
          </div>
        </div>
      </footer>
    </main>
  );
};

export default BalanceSheet;
