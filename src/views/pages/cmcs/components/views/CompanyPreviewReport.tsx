import { FC } from "react";

import cn from "classnames";

import styles from "../../styles.module.css";

import FilterIcon from "assets/images/icons8-filter.svg";

const CompanyPreviewReport: FC = () => {
  return (
    <>
      <div
        className={cn(
          "w-full h-20 flex",
          styles.borderTop,
          styles.borderLeft,
          styles.borderBottom
        )}
      >
        <div
          className={cn(
            "w-3/5 flex items-center py-2 px-4",
            styles.borderRight
          )}
        >
          <div className="w-2/4 flex items-center">
            <div className="w-14 h-10 flex items-center justify-center bg-accent-light rounded mr-2">
              <img src={FilterIcon} alt="Filter" />
            </div>
            <span className="text-primary text-sm">
              Công ty Cổ phần CONINCO Quản lý dự án và đầu tư...
            </span>
          </div>

          <div className="w-2/4 flex items-center">
            <div className="w-5/6 flex flex-col gap-3">
              <div className="flex justify-between text-xs">
                <div>
                  <span className="text-primary-gray">Bắt đầu: </span>
                  <span>1/1/21</span>
                </div>
                <div>
                  <span className="text-primary-gray">Kết thúc: </span>
                  <span>31/12/21</span>
                </div>
              </div>

              <div className="w-full border h-2">
                <div
                  className="bg-warning"
                  style={{ width: "82%", marginTop: -0.25, height: 7 }}
                ></div>
              </div>
            </div>

            <p className="w-1/6 text-primary text-sm px-4">82%</p>
          </div>
        </div>

        <div className="w-2/5 flex">
          <div
            className={cn(
              "w-1/3 flex flex-col justify-around py-2 px-4",
              styles.borderRight
            )}
          >
            <p className="text-primary-gray">Số HĐ ký 2021</p>
            <div className="flex items-center">
              <span className="font-bold text-lg">15</span>
              <span className="text-xs ml-1 text-primary-gray">(hợp đồng)</span>
            </div>
          </div>

          <div
            className={cn(
              "w-1/3 flex flex-col justify-around py-2 px-4",
              styles.borderRight
            )}
          >
            <p className="text-primary-gray">Giá trị ký 2021</p>
            <p className="font-bold text-lg">90 tỷ</p>
          </div>

          <div
            className={cn(
              "w-1/3 flex flex-col justify-around py-2 px-4",
              styles.borderRight
            )}
          >
            <p className="text-primary-gray">Đang triển khai</p>
            <div className="flex items-center">
              <span className="font-bold text-lg">26</span>
              <span className="text-xs ml-1 text-primary-gray">(hợp đồng)</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanyPreviewReport;
