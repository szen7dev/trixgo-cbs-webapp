import { FC, useRef } from "react";
import { map as _map } from "lodash";

import RightClickMenu from "components/common/RightClickMenu";
import MenuMainRow from "../../financial/planning/components/FinancialCashFlowDetail/MenuMainRow";
import CollapseButton from "./CollapseButton";
import DetailChildRow from "./DetailChildRow";

type Props = {
  rowData: any;
  index: number | string;
  idDetail: number | string;
};

const DetailMainRow: FC<Props> = ({ rowData, index, idDetail }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div
        ref={wrapperRef}
        className={
          "row table-row font-semibold main-row " +
          (rowData.collapsed ? "collapsed " : "not-collapsed ")
        }
      >
        <div
          className={
            "financial-planning-table-action-sidebar w-6 bg-gray-300 text-white table-cell align-middle border border-gray-300 transition duration-300 ease-in-out"
          }
        >
          <div className={"flex flex-col items-center justify-center"}>
            <CollapseButton
              idDetail={idDetail}
              collapsed={rowData.collapsed}
              index={index}
            />
          </div>
        </div>
        <div
          className={
            "p-2 table-cell box-border border border-gray-300 align-middle bg-blue-100 w-3"
          }
        >
          {rowData.tt}
        </div>
        <div
          className={
            "p-2 table-cell box-border border border-gray-300 align-middle bg-blue-100 w-2/12"
          }
        >
          {rowData.content}
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
          <div className="flex justify-end">{rowData.totalHour}</div>
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
          <div className="flex justify-end">{rowData.amount}</div>
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
      {_map(rowData.childrens, (childRow, indexChild) => (
        <DetailChildRow
          isLastRow={Number(indexChild) === rowData.childrens.length - 1}
          collapsed={rowData.collapsed}
          index={indexChild}
          rowData={childRow}
          key={childRow._id}
        />
      ))}
    </>
  );
};

export default DetailMainRow;
