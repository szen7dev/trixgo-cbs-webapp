import { FC } from "react";
import { map as _map } from "lodash";
import { convertCurrency } from "utils/converter";
import { Loader } from "shareComponents/common/Loader";
import { DetailChildRow } from "../DetailChildRow";

import type { TimeSheetChild, TimeSheetParent } from "typings/time-sheet";

type Props = {
  timeSheetParentInfo?: TimeSheetParent;
  listTimeSheetChild: TimeSheetChild[];
  onUpdatedTimeSheetChild: (values: any) => void;
  isFetchTimeSheetChild: boolean;
  hasPermission: boolean;
  pageIndex: number;
};

export const DetailMainRow: FC<Props> = ({
  timeSheetParentInfo,
  listTimeSheetChild,
  onUpdatedTimeSheetChild,
  isFetchTimeSheetChild,
  hasPermission,
  pageIndex,
}) => {
  if (isFetchTimeSheetChild) {
    return <Loader className="border-primary" />;
  }

  return (
    <>
      <div
        className={
          "p-2 table-cell box-border border border-gray-300 align-middle bg-blue-100 w-3"
        }
      >
        {"A"}
      </div>
      <div
        className={
          "p-2 table-cell box-border border border-gray-300 align-middle bg-blue-100 w-1/6"
        }
      >
        {timeSheetParentInfo?.name}
      </div>
      <div
        className={
          "p-2 table-cell box-border border border-gray-300 align-middle bg-blue-100 w-1/6"
        }
      ></div>
      <div
        className={
          "p-2 table-cell box-border border border-gray-300 align-middle bg-blue-100"
        }
      >
        <div className="flex justify-end">{timeSheetParentInfo?.hours}</div>
      </div>
      <div
        className={
          "p-2 table-cell box-border border border-gray-300 align-middle bg-blue-100"
        }
      >
        <div className="flex justify-end">
          {convertCurrency(timeSheetParentInfo?.unitprice)}
        </div>
      </div>
      <div
        className={
          "p-2 table-cell box-border border border-gray-300 align-middle bg-blue-100"
        }
      >
        <div className="flex justify-end">
          {`${timeSheetParentInfo?.amount}`.replace(
            /\B(?=(\d{3})+(?!\d))/g,
            ","
          )}
        </div>
      </div>
      <div
        className={
          "p-2 table-cell box-border border border-gray-300 align-middle bg-blue-100"
        }
      ></div>
      <div
        className={
          "p-2 table-cell box-border border border-gray-300 align-middle bg-blue-100"
        }
      ></div>
      <div
        className={
          "p-2 table-cell box-border border border-gray-300 align-middle bg-blue-100"
        }
        style={{width: "100px"}}
      ></div>
      <div
        className={
          "p-2 table-cell box-border border border-gray-300 align-middle bg-blue-100 w-1/6"
        }
      ></div>
      {_map(listTimeSheetChild[pageIndex] ?? [], (childRow, index) => (
        <DetailChildRow
          key={childRow._id}
          isLastRow={false}
          collapsed={false}
          rowData={childRow}
          parent={timeSheetParentInfo}
          index={+index}
          hasPermission={hasPermission}
          onUpdatedTimeSheetChild={onUpdatedTimeSheetChild}
        />
      ))}
    </>
  )
}