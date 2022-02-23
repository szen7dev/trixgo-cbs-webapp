import { FC } from "react";

import cn from "classnames";

import styles from "../style.module.css";
import DropdownSearchable from "components/common/DropdownSearch";
import FinancialCashFlowFilterButton from "views/pages/financial/planning/components/FinancialCashFlow/FinancialCashFlowFilterButton";

import ThreeDotVerticalIcon from "assets/images/icon-3dots-vertical-gray.svg";

export const AccountingInOutPage: FC = () => {
  return (
    <main className="h-full text-sm">
      <header className="h-[50px] w-full border border-primary-border flex items-center justify-between px-6">
        <p className="text-lg">156-Hàng hóa</p>

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
            <img src={ThreeDotVerticalIcon} alt="Three Dot" />
          </div>
        </div>
      </header>

      <section className="h-9 bg-cbs-table-header border border-primary-border flex items-center justify-between text-primary-gray">
        <div className="w-1/6 h-full border-r border-primary-border flex items-center px-2">
          Nguyên vật liệu/hàng hóa
        </div>
        <div className="w-1/12 h-full border-r border-primary-border flex items-center px-2">
          Mã hiệu
        </div>
        <div className="w-1/12 h-full border-r border-primary-border flex items-center px-2">
          Đơn vị
        </div>
        <div className="w-1/6 h-full border-r border-primary-border flex items-center justify-center px-2">
          TỒN ĐẦU KỲ
        </div>
        <div className="w-1/6 h-full border-r border-primary-border flex items-center justify-center px-2">
          NHẬP
        </div>
        <div className="w-1/6 h-full border-r border-primary-border flex items-center justify-center px-2">
          XUẤT
        </div>
        <div className="w-1/6 text-center">TỒN CUỐI KỲ</div>
      </section>

      <section className="h-9 bg-cbs-table-header border border-primary-border flex items-center justify-between text-primary-gray">
        <div className="w-1/6 h-full border-r border-primary-border flex items-center px-2">
          {""}
        </div>
        <div className="w-1/12 h-full border-r border-primary-border flex items-center px-2">
          {""}
        </div>
        <div className="w-1/12 h-full border-r border-primary-border flex items-center px-2">
          {""}
        </div>
        <div className="w-1/6 h-full border-r border-primary-border flex items-center">
          <div className="w-1/5 h-full border-r border-primary-border flex items-center justify-center">
            SL
          </div>
          <div className="w-2/5 h-full border-r border-primary-border flex items-center justify-center">
            Đơn giá
          </div>
          <div className="w-2/5 h-full flex items-center justify-center">
            Thành tiền
          </div>
        </div>
        <div className="w-1/6 h-full border-r border-primary-border flex items-center">
          <div className="w-1/5 h-full border-r border-primary-border flex items-center justify-center">
            SL
          </div>
          <div className="w-2/5 h-full border-r border-primary-border flex items-center justify-center">
            Đơn giá
          </div>
          <div className="w-2/5 h-full flex items-center justify-center">
            Thành tiền
          </div>
        </div>
        <div className="w-1/6 h-full border-r border-primary-border flex items-center">
          <div className="w-1/5 h-full border-r border-primary-border flex items-center justify-center">
            SL
          </div>
          <div className="w-2/5 h-full border-r border-primary-border flex items-center justify-center">
            Đơn giá
          </div>
          <div className="w-2/5 h-full flex items-center justify-center">
            Thành tiền
          </div>
        </div>
        <div className="w-1/6 h-full border-r border-primary-border flex items-center">
          <div className="w-1/5 h-full border-r border-primary-border flex items-center justify-center">
            SL
          </div>
          <div className="w-2/5 h-full border-r border-primary-border flex items-center justify-center">
            Đơn giá
          </div>
          <div className="w-2/5 h-full flex items-center justify-center">
            Thành tiền
          </div>
        </div>
      </section>

      <section>
        <div className="h-9 border border-primary-border flex items-center justify-between">
          <div className="w-1/6 h-full border-r border-primary-border flex items-center px-2 text-primary">
            Xi măng PC30-Hoàng Thạch
          </div>
          <div className="w-1/12 h-full border-r border-primary-border flex items-center px-2">
            PC30
          </div>
          <div className="w-1/12 h-full border-r border-primary-border flex items-center px-2">
            Kg
          </div>
          <div className="w-1/6 h-full border-r border-primary-border flex items-center">
            <div className="w-1/5 h-full border-r border-primary-border flex items-center justify-center">
              15.000
            </div>
            <div className="w-2/5 h-full border-r border-primary-border flex items-center justify-center">
              1.000
            </div>
            <div className="w-2/5 h-full flex items-center justify-center">
              15.000.000
            </div>
          </div>
          <div className="w-1/6 h-full border-r border-primary-border flex items-center">
            <div className="w-1/5 h-full border-r border-primary-border flex items-center justify-center">
              15.000
            </div>
            <div className="w-2/5 h-full border-r border-primary-border flex items-center justify-center">
              1.000
            </div>
            <div className="w-2/5 h-full flex items-center justify-center">
              15.000.000
            </div>
          </div>
          <div className="w-1/6 h-full border-r border-primary-border flex items-center">
            <div className="w-1/5 h-full border-r border-primary-border flex items-center justify-center">
              15.000
            </div>
            <div className="w-2/5 h-full border-r border-primary-border flex items-center justify-center">
              1.000
            </div>
            <div className="w-2/5 h-full flex items-center justify-center">
              15.000.000
            </div>
          </div>
          <div className="w-1/6 h-full border-r border-primary-border flex items-center">
            <div className="w-1/5 h-full border-r border-primary-border flex items-center justify-center">
              15.000
            </div>
            <div className="w-2/5 h-full border-r border-primary-border flex items-center justify-center">
              1.000
            </div>
            <div className="w-2/5 h-full flex items-center justify-center">
              15.000.000
            </div>
          </div>
        </div>

        <div className="h-[751px] border border-primary-border flex items-center justify-between">
          <div className="w-1/6 h-full border-r border-primary-border flex items-center px-2 text-primary">
            {""}
          </div>
          <div className="w-1/12 h-full border-r border-primary-border flex items-center px-2">
            {""}
          </div>
          <div className="w-1/12 h-full border-r border-primary-border flex items-center px-2">
            {""}
          </div>
          <div className="w-1/6 h-full border-r border-primary-border flex items-center">
            <div className="w-1/5 h-full border-r border-primary-border flex items-center justify-center">
              {""}
            </div>
            <div className="w-2/5 h-full border-r border-primary-border flex items-center justify-center">
              {""}
            </div>
            <div className="w-2/5 h-full flex items-center justify-center">
              {""}
            </div>
          </div>
          <div className="w-1/6 h-full border-r border-primary-border flex items-center">
            <div className="w-1/5 h-full border-r border-primary-border flex items-center justify-center">
              {""}
            </div>
            <div className="w-2/5 h-full border-r border-primary-border flex items-center justify-center">
              {""}
            </div>
            <div className="w-2/5 h-full flex items-center justify-center">
              {""}
            </div>
          </div>
          <div className="w-1/6 h-full border-r border-primary-border flex items-center">
            <div className="w-1/5 h-full border-r border-primary-border flex items-center justify-center">
              {""}
            </div>
            <div className="w-2/5 h-full border-r border-primary-border flex items-center justify-center">
              {""}
            </div>
            <div className="w-2/5 h-full flex items-center justify-center">
              {""}
            </div>
          </div>
          <div className="w-1/6 h-full border-r border-primary-border flex items-center">
            <div className="w-1/5 h-full border-r border-primary-border flex items-center justify-center">
              {""}
            </div>
            <div className="w-2/5 h-full border-r border-primary-border flex items-center justify-center">
              {""}
            </div>
            <div className="w-2/5 h-full flex items-center justify-center">
              {""}
            </div>
          </div>
        </div>
      </section>

      <footer
        className={cn(
          "h-9 w-full border border-primary-border flex items-center justify-between bottom-0",
          styles.bgFooterYellow
        )}
      >
        <div className="w-1/6 h-full flex items-center px-2 tont-bold">
          Tổng
        </div>
        <div className="w-1/12 h-full flex items-center px-2">{""}</div>
        <div className="w-1/12 h-full flex items-center px-2">{""}</div>
        <div className="w-1/6 h-full flex items-center">
          <div className="w-1/5 h-full flex items-center justify-center">
            {""}
          </div>
          <div className="w-2/5 h-full flex items-center justify-center">
            {""}
          </div>
          <div className="w-2/5 h-full flex items-center justify-center font-bold">
            15.000.000
          </div>
        </div>
        <div className="w-1/6 h-full flex items-center">
          <div className="w-1/5 h-full flex items-center justify-center">
            {""}
          </div>
          <div className="w-2/5 h-full flex items-center justify-center">
            {""}
          </div>
          <div className="w-2/5 h-full flex items-center justify-center font-bold">
            15.000.000
          </div>
        </div>
        <div className="w-1/6 h-full flex items-center">
          <div className="w-1/5 h-full flex items-center justify-center">
            {""}
          </div>
          <div className="w-2/5 h-full flex items-center justify-center">
            {""}
          </div>
          <div className="w-2/5 h-full flex items-center justify-center">
            15.000.000
          </div>
        </div>
        <div className="w-1/6 h-full flex items-center">
          <div className="w-1/5 h-full flex items-center justify-center">
            {""}
          </div>
          <div className="w-2/5 h-full flex items-center justify-center">
            {""}
          </div>
          <div className="w-2/5 h-full flex items-center justify-center font-bold">
            15.000.000
          </div>
        </div>
      </footer>
    </main>
  );
};