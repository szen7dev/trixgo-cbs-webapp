import { FC, useCallback } from "react";

import cn from "classnames";

import { DropdownFilterButton } from "views/accounting/shareComponents/common";
import { DropdownSearchable } from "shareComponents/common";
import styles from 'views/accounting/styles/styles.module.css';

import ThreeDotVerticalIcon from "assets/images/icon-3dots-vertical-gray.svg";
import { Link } from "react-router-dom";

export const ReceivablesCustomers: FC = () => {
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
        <p className="text-lg">131-Phải thu của khách hàng</p>

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
            <img src={ThreeDotVerticalIcon} alt="Three Dot" />
          </div>
        </div>
      </header>

      <header className="h-9 bg-cbs-table-header border border-primary-border flex items-center justify-between text-primary-gray">
        <div className="w-1/12 h-full border-r border-primary-border flex items-center px-2">
          Mã khách hàng
        </div>
        <div
          className={cn(
            "h-full border-r border-primary-border flex items-center px-2",
            styles.theadDes
          )}
        >
          Tên khách hàng
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
        <Link to="/accounting/debt-tracking/account/:id/customer/:id">
          <div className="h-9 border border-primary-border flex items-center justify-between text-primary-gray">
            <div className="w-1/12 h-full border-r border-primary-border flex items-center px-2 text-primary">
              huongnpt
            </div>
            <div
              className={cn(
                "h-full border-r border-primary-border flex items-center px-2 text-primary",
                styles.theadDes
              )}
            >
              Nguyễn Phan Thanh Hương
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
        </Link>
        <div className="h-9 border border-primary-border flex items-center justify-between text-primary-gray">
          <div className="w-1/12 h-full border-r border-primary-border flex items-center px-2 text-primary">
            duongnt
          </div>
          <div
            className={cn(
              "h-full border-r border-primary-border flex items-center px-2 text-primary",
              styles.theadDes
            )}
          >
            Nguyễn Tiến Dương
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
