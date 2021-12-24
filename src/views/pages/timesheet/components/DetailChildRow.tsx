import { FC, useRef } from "react";
import DatePicker from "react-datepicker";

import DropdownSearchable from "components/common/DropdownSearch";
import RightClickMenu from "components/common/RightClickMenu";
import MenuChildRow from "../../financial/planning/components/FinancialCashFlowDetail/MenuChildRow";

type Props = {
  rowData: any;
  index: number | string;
  collapsed: boolean;
  isLastRow: boolean;
};

const DetailChildRow: FC<Props> = ({
  rowData,
  index,
  collapsed,
  isLastRow,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={wrapperRef}
      style={
        collapsed
          ? {
              transform: "scaleY(0)",
              transformOrigin: "top center",
              height: 0,
              visibility: "collapse",
            }
          : {}
      }
      className={
        "transition duration-300 ease-in-out child-row table-row " +
        (collapsed ? "collapsed " : "not-collapsed ") +
        (isLastRow ? "last-child-row" : "")
      }
      data-row-index={rowData._id + "_" + index}
    >
      <div
        className={
          "financial-planning-table-action-sidebar w-6 bg-gray-300 text-white table-cell relative align-middle border border-gray-300"
        }
      ></div>
      <div
        className={
          "table-cell relative box-border border border-gray-300 align-middle bg-white w-1"
        }
      >
        <p
          contentEditable={"true"}
          suppressContentEditableWarning={true}
          className={"w-full h-full focus:outline-blue-600 px-2 py-5"}
        >
          {rowData.tt}
        </p>
      </div>
      <div
        className={
          "table-cell relative box-border border border-gray-300 align-middle bg-white w-2/12"
        }
      >
        <p
          contentEditable={"true"}
          suppressContentEditableWarning={true}
          className={"w-full h-full focus:outline-blue-600 p-2"}
        >
          {rowData.content}
        </p>
      </div>
      <div
        className={
          "p-2 table-cell relative box-border border border-gray-300 align-middle bg-white w-5"
        }
      >
        <DatePicker
          value={rowData.date}
          selected={null}
          onChange={(date: Date | null) => console.log(date)}
        />
      </div>
      <div
        className={
          "table-cell relative box-border border border-gray-300 text-end bg-white"
        }
      >
        <p className={"w-full h-full focus:outline-blue-600 p-2"}>
          <input type="checkbox" className="form-check-input cursor-pointer" />
        </p>
      </div>
      <div
        className={
          "table-cell relative box-border border border-gray-300 align-middle bg-white"
        }
      >
        <p
          contentEditable={"true"}
          suppressContentEditableWarning={true}
          className={
            "w-full h-full focus:outline-blue-600 p-2 flex justify-end"
          }
        >
          {rowData.totalHour}
        </p>
      </div>
      <div
        className={
          "table-cell relative box-border border border-gray-300 align-middle bg-white"
        }
      >
        <p
          contentEditable={"true"}
          suppressContentEditableWarning={true}
          className={"w-full h-full focus:outline-blue-600 p-2"}
        >
          {rowData.price}
        </p>
      </div>
      <div
        className={
          "table-cell relative box-border border border-gray-300 align-middle bg-white"
        }
      >
        <p
          contentEditable={"true"}
          suppressContentEditableWarning={true}
          className={
            "w-full h-full focus:outline-blue-600 p-2 flex justify-end"
          }
        >
          {rowData.amount}
        </p>
      </div>
      <div
        className={
          "p-2 table-cell relative box-border border border-gray-300 align-middle bg-white"
        }
      >
        <DropdownSearchable
          id="ticket-creator"
          placeholder="Người thực hiện"
          initialValue={rowData.assignee}
          data={[
            {
              id: "1",
              text: "Nguyễn Phan Thanh Hương-CPMI",
            },
            {
              id: "2",
              text: "Nguyễn Phan Thanh Hương-CPMI",
            },
          ]}
        />
      </div>
      <div
        className={
          "table-cell relative box-border border border-gray-300 align-middle bg-white w-2/12"
        }
      >
        <p
          contentEditable={"true"}
          suppressContentEditableWarning={true}
          className={"w-full h-full focus:outline-blue-600 p-2"}
        >
          {rowData.description}
        </p>
      </div>
      <RightClickMenu wrapperRef={wrapperRef} menu={<MenuChildRow />} />
    </div>
  );
};

export default DetailChildRow;
