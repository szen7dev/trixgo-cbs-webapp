import { FC } from "react";

import cn from "classnames";

import Paginate from "components/common/Paginate";

import styles from "../../styles.module.css";

import ThreeDotsVertical from "assets/images/icon-3dots-vertical.svg";
import SearchIcon from "assets/images/icons8-search.svg";
import SortIcon from "assets/images/icons8-sorting.svg";
import PolygonIcon from "assets/images/icon-polygon.svg";

const ByRegisterListSupport: FC = () => {
  return (
    <section className={cn("h-full", styles.borderLeft, styles.borderBottom)}>
      <div className="flex justify-between items-center border border-primary-border py-1 pr-2 pl-4">
        <div className="flex items-center">
          <p className="text-primary-gray font-bold text-lg">
            Danh sách đăng ký
          </p>

          <div className="relative px-4 ml-6">
            <span>
              <img
                src={SearchIcon}
                alt="Search"
                className="absolute top-2 left-6 h-4 w-4"
              />
            </span>
            <input
              type="text"
              placeholder="Nhập từ khóa tìm kiếm"
              className="w-72 h-8 pl-8 outline-none bg-secondary-light"
            />
          </div>

          <div className="flex items-center justify-around h-8 w-20 bg-secondary-light cursor-pointer">
            <img src={SortIcon} alt="Sort" />
            <span className="text-primary-gray">Filter</span>
          </div>
        </div>

        <button className="rounded-full h-10 w-10 flex items-center justify-center bg-gray-100 ml-5">
          <img alt={"Icon"} src={ThreeDotsVertical} />
        </button>
      </div>

      <table className="table-auto border-collapse w-full overflow-auto">
        <thead className="bg-gray-100 h-9 border border-primary-border">
          <tr className="text-left">
            <th className="w-8 pb-1 pt-1 text-center">
              <div className="border-r-2 border-gray-300 flex justify-center">
                <input
                  className="form-check-input mr-3"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                />
                <img src={PolygonIcon} alt="Polygon" />
              </div>
            </th>
            <th className="w-1/6 pb-1 pt-1">
              <div className="border-r-2 border-gray-300 font-normal pl-2">
                Họ và tên
              </div>
            </th>
            <th className="w-1/6 pb-1 pt-1 font-normal">
              <div className="border-r-2 border-gray-300 font-normal pl-2">
                Thuộc phân vùng
              </div>
            </th>
            <th className="w-1/12 pb-1 pt-1 font-normal">
              <div className="border-r-2 border-gray-300 font-normal pl-2">
                Phân loại
              </div>
            </th>
            <th className="w-1/6 pb-1 pt-1 font-normal">
              <div className="border-r-2 border-gray-300 font-normal pl-2">
                Email
              </div>
            </th>
            <th className="w-1/12 pb-1 pt-1 font-normal">
              <div className="border-r-2 border-gray-300 font-normal pl-2">
                Điện thoại
              </div>
            </th>
            <th className="w-1/6 pb-1 pt-1 font-normal">
              <div className="font-normal pl-2">Ghi chú</div>
            </th>
          </tr>
        </thead>

        <tbody className="border border-primary-border">
          <tr className="border-b border-primary-border h-12">
            <td className="w-1/12 pt-2 pb-2 text-center">
              <input
                className={cn(
                  "form-check-input",
                  styles.tableContentMarginLeft
                )}
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
            </td>
            <td className="pt-2 pb-2 pl-2">Trương Hoàng Việt Ánh</td>
            <td className="pt-2 pb-2 pl-2">Đại học xây dựng</td>
            <td className="pt-2 pb-2 pl-2">Sinh viên</td>
            <td className="pt-2 pb-2 pl-2">vanphuqd@gmail.com</td>
            <td className="pt-2 pb-2 pl-2">0123456789</td>
            <td className="pt-2 pb-2 pl-2">Đã nhận đủ tiền</td>
          </tr>

          <tr className="border-b border-primary-border h-12">
            <td className="w-1/12 pt-2 pb-2 text-center">
              <input
                className={cn(
                  "form-check-input",
                  styles.tableContentMarginLeft
                )}
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
            </td>
            <td className="pt-2 pb-2 pl-2">Trương Hoàng Việt Ánh</td>
            <td className="pt-2 pb-2 pl-2">Đại học xây dựng</td>
            <td className="pt-2 pb-2 pl-2">Sinh viên</td>
            <td className="pt-2 pb-2 pl-2">vanphuqd@gmail.com</td>
            <td className="pt-2 pb-2 pl-2">0123456789</td>
            <td className="pt-2 pb-2 pl-2">Đã nhận đủ tiền</td>
          </tr>

          <tr className="border-b border-primary-border h-12">
            <td className="w-1/12 pt-2 pb-2 text-center">
              <input
                className={cn(
                  "form-check-input",
                  styles.tableContentMarginLeft
                )}
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
            </td>
            <td className="pt-2 pb-2 pl-2">Trương Hoàng Việt Ánh</td>
            <td className="pt-2 pb-2 pl-2">Đại học xây dựng</td>
            <td className="pt-2 pb-2 pl-2">Sinh viên</td>
            <td className="pt-2 pb-2 pl-2">vanphuqd@gmail.com</td>
            <td className="pt-2 pb-2 pl-2">0123456789</td>
            <td className="pt-2 pb-2 pl-2">Đã nhận đủ tiền</td>
          </tr>

          <tr className="border-b border-primary-border h-12">
            <td className="w-1/12 pt-2 pb-2 text-center">
              <input
                className={cn(
                  "form-check-input",
                  styles.tableContentMarginLeft
                )}
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
            </td>
            <td className="pt-2 pb-2 pl-2">Trương Hoàng Việt Ánh</td>
            <td className="pt-2 pb-2 pl-2">Đại học xây dựng</td>
            <td className="pt-2 pb-2 pl-2">Sinh viên</td>
            <td className="pt-2 pb-2 pl-2">vanphuqd@gmail.com</td>
            <td className="pt-2 pb-2 pl-2">0123456789</td>
            <td className="pt-2 pb-2 pl-2">Đã nhận đủ tiền</td>
          </tr>

          <tr className="border-b border-primary-border h-12">
            <td className="w-1/12 pt-2 pb-2 text-center">
              <input
                className={cn(
                  "form-check-input",
                  styles.tableContentMarginLeft
                )}
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
            </td>
            <td className="pt-2 pb-2 pl-2">Trương Hoàng Việt Ánh</td>
            <td className="pt-2 pb-2 pl-2">Đại học xây dựng</td>
            <td className="pt-2 pb-2 pl-2">Sinh viên</td>
            <td className="pt-2 pb-2 pl-2">vanphuqd@gmail.com</td>
            <td className="pt-2 pb-2 pl-2">0123456789</td>
            <td className="pt-2 pb-2 pl-2">Đã nhận đủ tiền</td>
          </tr>

          <tr className="border-b border-primary-border h-12">
            <td className="w-1/12 pt-2 pb-2 text-center">
              <input
                className={cn(
                  "form-check-input",
                  styles.tableContentMarginLeft
                )}
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
            </td>
            <td className="pt-2 pb-2 pl-2">Trương Hoàng Việt Ánh</td>
            <td className="pt-2 pb-2 pl-2">Đại học xây dựng</td>
            <td className="pt-2 pb-2 pl-2">Sinh viên</td>
            <td className="pt-2 pb-2 pl-2">vanphuqd@gmail.com</td>
            <td className="pt-2 pb-2 pl-2">0123456789</td>
            <td className="pt-2 pb-2 pl-2">Đã nhận đủ tiền</td>
          </tr>

          <tr className="border-b border-primary-border h-12">
            <td className="w-1/12 pt-2 pb-2 text-center">
              <input
                className={cn(
                  "form-check-input",
                  styles.tableContentMarginLeft
                )}
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
            </td>
            <td className="pt-2 pb-2 pl-2">Trương Hoàng Việt Ánh</td>
            <td className="pt-2 pb-2 pl-2">Đại học xây dựng</td>
            <td className="pt-2 pb-2 pl-2">Sinh viên</td>
            <td className="pt-2 pb-2 pl-2">vanphuqd@gmail.com</td>
            <td className="pt-2 pb-2 pl-2">0123456789</td>
            <td className="pt-2 pb-2 pl-2">Đã nhận đủ tiền</td>
          </tr>

          <tr className="border-b border-primary-border h-12">
            <td className="w-1/12 pt-2 pb-2 text-center">
              <input
                className={cn(
                  "form-check-input",
                  styles.tableContentMarginLeft
                )}
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
            </td>
            <td className="pt-2 pb-2 pl-2">Trương Hoàng Việt Ánh</td>
            <td className="pt-2 pb-2 pl-2">Đại học xây dựng</td>
            <td className="pt-2 pb-2 pl-2">Sinh viên</td>
            <td className="pt-2 pb-2 pl-2">vanphuqd@gmail.com</td>
            <td className="pt-2 pb-2 pl-2">0123456789</td>
            <td className="pt-2 pb-2 pl-2">Đã nhận đủ tiền</td>
          </tr>

          <tr className="border-b border-primary-border h-12">
            <td className="w-1/12 pt-2 pb-2 text-center">
              <input
                className={cn(
                  "form-check-input",
                  styles.tableContentMarginLeft
                )}
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
            </td>
            <td className="pt-2 pb-2 pl-2">Trương Hoàng Việt Ánh</td>
            <td className="pt-2 pb-2 pl-2">Đại học xây dựng</td>
            <td className="pt-2 pb-2 pl-2">Sinh viên</td>
            <td className="pt-2 pb-2 pl-2">vanphuqd@gmail.com</td>
            <td className="pt-2 pb-2 pl-2">0123456789</td>
            <td className="pt-2 pb-2 pl-2">Đã nhận đủ tiền</td>
          </tr>
        </tbody>
      </table>

      <div className="relative h-11 border border-primary-border">
        <Paginate />
      </div>
    </section>
  );
};

export default ByRegisterListSupport;
