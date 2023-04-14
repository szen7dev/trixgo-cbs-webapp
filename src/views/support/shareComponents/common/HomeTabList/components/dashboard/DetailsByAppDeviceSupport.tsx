import { FC } from "react";

import cn from "classnames";

import styles from 'views/support/styles/support.module.css'
import { useListAppDeviceAccess } from 'services/hooks/useSupport';
import { checkTimeType } from "utils/app";

type Props = {
  timeType: string;
};

const DetailsByAppDeviceSupport:FC<Props> = (props) => {
  const { timeType } = props;
  const listParam = checkTimeType(timeType);
  const { listAppDeviceAccess } = useListAppDeviceAccess(listParam);
  let totalMobile = 0;
  let totalTablet = 0;
  let totalWebsite = 0;

  for (const key in listAppDeviceAccess) {
      listAppDeviceAccess[key].data?.forEach(element => {
        if(+element.type === 1){
          totalWebsite += element.amountAccesses;
        }
        if(+element.type === 2){
          totalMobile += element.amountAccesses;
        }
        if(+element.type === 3){
          totalTablet += element.amountAccesses;
        }
      })
  }

  const totalAccess = totalMobile + totalTablet + totalWebsite;

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
                {item._id.app.name}
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
              <td
                className={cn(
                  "font-normal border-r border-primary-border",
                  styles.widthFifteenPercent
                )}
              >
                { item?.data?.[0] && item.data[0].type === 1 ? item.data[0].amountAccesses : 0 }
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