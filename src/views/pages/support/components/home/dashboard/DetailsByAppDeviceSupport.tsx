import { FC } from "react";

import cn from "classnames";

import styles from "../../../styles.module.css";
import { useListAppDeviceAccess } from 'services/hooks/useSupport';

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

const dataNew = [
  {
    id: 1,
    name: "",
    "%": 0,
    mob: 0,
    tab: 0,
    web: 0,
  },
];
const DetailsByAppDeviceSupport: FC = () => {
  const { listAppDeviceAccess } = useListAppDeviceAccess();
  console.log('listAppDeviceAccess',listAppDeviceAccess);
  let totalMobile = 0;
  let totalTablet = 0;
  let totalWebsite = 0;
  let totalMo = 0;
  let totalTab = 0;
  let totalWeb = 0;
  for (const key in listAppDeviceAccess) {
    if(listAppDeviceAccess[key].data[0].type === 1) {
      totalMo = listAppDeviceAccess[key].data[0].amountAccesses;
      totalMobile += totalMo;
    }
    if(listAppDeviceAccess[key] && listAppDeviceAccess[key].data[1] && listAppDeviceAccess[key].data[1].type === 2) {
       totalTab = listAppDeviceAccess[key].data[1].amountAccesses;
      totalTablet += totalTab
    }
    if(listAppDeviceAccess[key] && listAppDeviceAccess[key].data[2] && listAppDeviceAccess[key].data[2].type === 3) {
       totalWeb = listAppDeviceAccess[key].data[2].amountAccesses;
      totalWebsite += totalWeb
    }
    // console.log('totalAccessApp1111',totalAccessApp)
  }
  const totalAccess = totalMobile + totalTablet + totalWebsite;
  console.log('totalMobile',totalMobile)
  console.log('totalTablet',totalTablet)
  console.log('totalWebsite',totalWebsite)
  console.log('totalAccess',totalAccess)
  console.log('dataNew',dataNew)
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
          {listAppDeviceAccess.map((item, index) => (
            <tr key={index} className="h-10 border-b border-primary-border">
              <td className="border-r border-primary-border text-left px-4">
                {item.app.name}
              </td>
              <td
                className={cn(
                  "text-base text-primary border-r border-primary-border leading-9",
                  styles.widthFifteenPercent
                )}
              >
                {
                  (((
                      (item?.data?.[0] && item.data[0].type === 1 ? item.data[0].amountAccesses : 0)
                      + (item?.data?.[1] && item.data[1].type === 2 ? item.data[1].amountAccesses : 0)
                      + (item?.data?.[2] && item.data[2].type === 3 ? item.data[2].amountAccesses : 0)
                  )/totalAccess)*100).toFixed(2)
                }
              </td>
              <td
                className={cn(
                  "font-normal border-r border-primary-border",
                  styles.widthFifteenPercent
                )}
              >
                { item?.data?.[0] && item.data[0].type === 1 ? item.data[0].amountAccesses : 0 }
              </td>
              <td
                className={cn(
                  "font-normal border-r border-primary-border",
                  styles.widthFifteenPercent
                )}
              >
                { item?.data?.[1] && item.data[1].type === 2 ? item.data[1].amountAccesses : 0 }
              </td>
              <td
                className={cn(
                  "font-normal border-r border-primary-border",
                  styles.widthFifteenPercent
                )}
              >
                { item?.data?.[2] && item.data[2].type === 3 ? item.data[2].amountAccesses : 0 }
              </td>
            </tr>
          ))}

          <tr className="h-9 bg-cbs-active-comment font-bold leading-9">
            <td className="text-left px-4">Tổng</td>
            <td className="text-base text-primary leading-9">100</td>
            <td>{totalMobile}</td>
            <td>{totalTablet}</td>
            <td>{totalWebsite}</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
};

export default DetailsByAppDeviceSupport;
