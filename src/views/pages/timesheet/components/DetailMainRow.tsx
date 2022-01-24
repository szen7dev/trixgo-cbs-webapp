import { FC, useRef } from "react";
import { map as _map } from "lodash";

import Loader from "components/shared/Loader";
import RightClickMenu from "components/common/RightClickMenu";
import MenuMainRow from "../../financial/planning/components/FinancialCashFlowDetail/MenuMainRow";
import CollapseButton from "./CollapseButton";
import DetailChildRow from "./DetailChildRow";

import type { TimeSheetChild, TimeSheetParent } from "typings/time-sheet";

type Props = {
  timeSheetParentInfo?: TimeSheetParent;
  listTimeSheetChild: TimeSheetChild[];
  onUpdatedTimeSheetChild: (values: any) => void;
  isFetchTimeSheetChild: boolean;
};

const DetailMainRow: FC<Props> = ({
  timeSheetParentInfo,
  listTimeSheetChild,
  onUpdatedTimeSheetChild,
  isFetchTimeSheetChild,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  if (isFetchTimeSheetChild) {
    return <Loader className="border-primary" />;
  }

  return (
    <>
      <div
        ref={wrapperRef}
        className={
          "row table-row font-semibold main-row " + "not-collapsed"
          // (rowData.collapsed ? "collapsed " : "not-collapsed")
        }
      >
        <div
          className={
            "financial-planning-table-action-sidebar w-6 bg-gray-300 text-white table-cell align-middle border border-gray-300 transition duration-300 ease-in-out"
          }
        >
          <div className={"flex flex-col items-center justify-center"}>
            <CollapseButton
              idDetail={timeSheetParentInfo?._id || ""}
              collapsed={false}
              index={1}
            />
          </div>
        </div>
        <div
          className={
            "p-2 table-cell box-border border border-gray-300 align-middle bg-blue-100 w-3"
          }
        >
          {"A"}
        </div>
        <div
          className={
            "p-2 table-cell box-border border border-gray-300 align-middle bg-blue-100 w-2/12"
          }
        >
          {timeSheetParentInfo?.name}
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
        >
          <input type="checkbox" className="form-check-input cursor-pointer" />
        </div>
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
        ></div>
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
            "p-2 table-cell box-border border border-gray-300 align-middle bg-blue-100 w-4/12"
          }
        ></div>
        <RightClickMenu wrapperRef={wrapperRef} menu={<MenuMainRow />} />
      </div>
      {_map(listTimeSheetChild, (childRow, index) => (
        <DetailChildRow
          key={childRow._id}
          isLastRow={false}
          collapsed={false}
          rowData={childRow}
          index={index}
          onUpdatedTimeSheetChild={onUpdatedTimeSheetChild}
        />
      ))}
    </>
  );
};

export default DetailMainRow;
