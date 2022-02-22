import React, { FC, useRef } from "react";
import { map as _map } from "lodash";

import Loader from "components/shared/Loader";
import MenuMainRow from "./MenuMainRow";
import { CollapseButton } from "../../../shareComponents/common/Button";
import DetailChildRow from "../DetailChildRow";

import type { TimeSheetChild, TimeSheetParent } from "typings/time-sheet";
import RightClickMenuWrapper from "components/common/RightClickMenuWrapper";

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
  if (isFetchTimeSheetChild) {
    return <Loader className="border-primary" />;
  }

  return (
    <>
      <RightClickMenuWrapper
          contextMenu={<MenuMainRow />}
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
      </RightClickMenuWrapper>
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
