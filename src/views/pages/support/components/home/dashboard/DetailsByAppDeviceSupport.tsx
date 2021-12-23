import { FC } from "react";

import cn from "classnames";

import styles from "../../../styles.module.css";

const data = [
  {
    id: 1,
    name: "Quản lý công việc",
    "%": 12,
    mob: 1522,
    tab: 3566,
    web: 4800,
  },
  {
    id: 2,
    name: "Quản lý hồ sơ văn bản",
    "%": 12,
    mob: 1522,
    tab: 3566,
    web: 4800,
  },
  {
    id: 3,
    name: "Quản lý hợp đồng",
    "%": 12,
    mob: 1522,
    tab: 3566,
    web: 4800,
  },
  {
    id: 4,
    name: "Quản trị tài chính",
    "%": 12,
    mob: 1522,
    tab: 3566,
    web: 4800,
  },
  {
    id: 5,
    name: "Quản lý nhân sự",
    "%": 12,
    mob: 1522,
    tab: 3566,
    web: 4800,
  },
  {
    id: 6,
    name: "Quản lý dự án",
    "%": 12,
    mob: 1522,
    tab: 3566,
    web: 4800,
  },
  {
    id: 7,
    name: "Truyền thông",
    "%": 12,
    mob: 1522,
    tab: 3566,
    web: 4800,
  },
  {
    id: 8,
    name: "Kế toán",
    "%": 12,
    mob: 1522,
    tab: 3566,
    web: 4800,
  },
  {
    id: 9,
    name: "...",
    "%": 12,
    mob: 1522,
    tab: 3566,
    web: 4800,
  },
];

const DetailsByAppDeviceSupport: FC = () => {
  return (
    <section className="bg-primary-light px-6 py-4 mt-3 h-[620px]">
      <p className="text-primary-gray font-bold text-lg">
        Chi tiết theo Ứng dụng - Thiết bị
      </p>

      <table className="table-auto mt-5 border border-primary-border w-full">
        <thead>
          <tr className="text-primary-gray h-10 border-b border-primary-border w-2/5">
            <th className="font-normal border-r border-primary-border text-left px-4">
              Ứng dụng
            </th>
            <th
              className={cn(
                "font-normal border-r border-primary-border",
                styles.widthFifteenPercent
              )}
            >
              %
            </th>
            <th
              className={cn(
                "font-normal border-r border-primary-border",
                styles.widthFifteenPercent
              )}
            >
              Mob
            </th>
            <th
              className={cn(
                "font-normal border-r border-primary-border",
                styles.widthFifteenPercent
              )}
            >
              Tab
            </th>
            <th className={cn("font-normal", styles.widthFifteenPercent)}>
              Web
            </th>
          </tr>
        </thead>

        <tbody className="text-center leading-9">
          {data.map((item) => (
            <tr key={item.id} className="h-10 border-b border-primary-border">
              <td className="border-r border-primary-border text-left px-4">
                {item.name}
              </td>
              <td
                className={cn(
                  "text-base text-primary border-r border-primary-border leading-9",
                  styles.widthFifteenPercent
                )}
              >
                {item["%"]}
              </td>
              <td
                className={cn(
                  "font-normal border-r border-primary-border",
                  styles.widthFifteenPercent
                )}
              >
                {item.mob}
              </td>
              <td
                className={cn(
                  "font-normal border-r border-primary-border",
                  styles.widthFifteenPercent
                )}
              >
                {item.tab}
              </td>
              <td
                className={cn(
                  "font-normal border-r border-primary-border",
                  styles.widthFifteenPercent
                )}
              >
                {item.web}
              </td>
            </tr>
          ))}

          <tr className="h-9 bg-cbs-active-comment font-bold leading-9">
            <td className="text-left px-4">Tổng</td>
            <td className="text-base text-primary leading-9">100</td>
            <td>15.000</td>
            <td>35.000</td>
            <td>50.000</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
};

export default DetailsByAppDeviceSupport;
