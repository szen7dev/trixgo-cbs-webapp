import { FC, useState } from "react";

import DatePicker from "react-datepicker";
import cn from "classnames";
import "react-datepicker/dist/react-datepicker.css";

import { DropdownSearchable, } from "shareComponents/common";

import ThreeDotsVertical from "assets/images/icon-3dots-vertical-gray.svg";
import PolygonIcon from "assets/images/icon-polygon.svg";

import styles from 'views/accounting/styles/styles.module.css';

const CostAnalysis: FC = () => {
  const [fromDate, setFromDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());

  return (
    <main className="h-full bg-cbs-gray p-4">
      <section className="px-8 py-6 bg-primary-light">
        <p className="text-lg font-bold text-primary-gray">Phân tích giá vốn</p>

        <div className="mt-4 flex items-end gap-3">
          <div>
            <p className="text-sm mb-2">
              Chọn loại hàng hóa/thành phẩm/nguyên vật liệu
            </p>
            <DropdownSearchable
              placeholder="Tìm kiếm"
              className="w-[322px] px-2 border border-primary-border rounded"
              classNameInput="h-[36px]"
              isMultiple={false}
              allowClearValueSingleInput={false}
              showTriangle={true}
              maxWidthInput="max-w-none"
              renderSelectedItem={(item: any) => <span>{item.text}</span>}
              classNameItem="p-0"
              data={[
                {
                  _id: 1,
                  content: "Thuốc làm đẹp da Hababa",
                },
                {
                  _id: 2,
                  content: "Thuốc làm đẹp da Hababa",
                },
                {
                  _id: 3,
                  content: "Thuốc làm đẹp da Hababa",
                },
              ]}
              formatItem={{
                id: "_id",
                text: "content",
              }}
              inlineSearch={true}
            />
          </div>

          <div>
            <p className="text-sm mb-2">Từ ngày</p>
            <DatePicker
              selected={fromDate}
              onChange={(date: Date | null) => setFromDate(date)}
              dateFormat="dd/MM/yyyy"
              customInput={
                <input
                  type="text"
                  placeholder="Từ ngày"
                  className="w-[322px] h-[38px] px-2 border border-primary-border rounded"
                />
              }
            />
          </div>

          <div>
            <p className="text-sm mb-2">Đến ngày</p>
            <DatePicker
              selected={endDate}
              onChange={(date: Date | null) => setEndDate(date)}
              dateFormat="dd/MM/yyyy"
              customInput={
                <input
                  type="text"
                  placeholder="Đến ngày"
                  className="w-[322px] h-[38px] px-2 border border-primary-border rounded"
                />
              }
            />
          </div>

          <button className="bg-primary text-[15px] rounded w-[105px] h-[38px] text-primary-light hover:opacity-90">
            Cập nhật
          </button>
        </div>
      </section>

      <section className="bg-primary-light mt-4 h-screen">
        <div className="flex items-center justify-between px-6 h-[53px]">
          <p className="text-lg">
            Kiểm tra hàng hóa xuất âm kho khi chạy giá vốn
          </p>
          <div className="h-10 w-10 rounded-full bg-cbs-table-header flex items-center justify-center">
            <img src={ThreeDotsVertical} alt="Three Dots" />
          </div>
        </div>

        <table className="table-auto w-full text-left">
          <thead className="h-10 bg-cbs-table-header">
            <tr>
              <th className={cn("text-center", styles.theadInput)}>
                <div className="flex items-center justify-center border-r-2 border-primary-border">
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
              <th>
                <p className="border-r-2 border-primary-border pl-2 font-normal">
                  Hàng hóa/Nguyên vật liệu số liệu Xuất
                </p>
              </th>
              <th className="w-1/12 pl-2">
                <p className="border-r-2 border-primary-border font-normal">
                  Mã hiệu
                </p>
              </th>
              <th className="w-1/6 pl-2">
                <p className="font-normal">Kho</p>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-primary-border h-11">
              <td className="py-1 px-2 text-center">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                  style={{ marginLeft: "-21px" }}
                />
              </td>
              <td>Thuốc làm đẹp da Hababa</td>
              <td>HaZ8822</td>
              <td>Kho khu vực Hà Nội</td>
            </tr>

            <tr className="border-b border-primary-border h-11">
              <td className="py-1 px-2 text-center">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                  style={{ marginLeft: "-21px" }}
                />
              </td>
              <td>Thuốc làm đẹp da Hababa</td>
              <td>HaZ8822</td>
              <td>Kho khu vực Hà Nội</td>
            </tr>

            <tr className="border-b border-primary-border h-11">
              <td className="py-1 px-2 text-center">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                  style={{ marginLeft: "-21px" }}
                />
              </td>
              <td>Thuốc làm đẹp da Hababa</td>
              <td>HaZ8822</td>
              <td>Kho khu vực Hà Nội</td>
            </tr>

            <tr className="border-b border-primary-border h-11">
              <td className="py-1 px-2 text-center">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                  style={{ marginLeft: "-21px" }}
                />
              </td>
              <td>Thuốc làm đẹp da Hababa</td>
              <td>HaZ8822</td>
              <td>Kho khu vực Hà Nội</td>
            </tr>
          </tbody>
        </table>
      </section>
    </main>
  );
};

export default CostAnalysis;
