import React, { FC, useRef } from "react";
import DatePicker from "react-datepicker";
import debounce from "lodash/debounce";
import moment from "moment";

import DropdownSearchable from "components/common/DropdownSearch";
import RightClickMenu from "components/common/RightClickMenu";
import MenuChildRow from "../../financial/planning/components/FinancialCashFlowDetail/MenuChildRow";

import { useQueryListFriend } from "services/hooks/users/useFriend";

import type { TimeSheetChild, UpdateTimeSheetChildPayload } from "typings/time-sheet";

type Props = {
  rowData: TimeSheetChild;
  collapsed: boolean;
  isLastRow: boolean;
  index: number;
  onUpdatedTimeSheetChild: (values: UpdateTimeSheetChildPayload) => void;
};

const DetailChildRow: FC<Props> = ({
  rowData,
  collapsed,
  isLastRow,
  index,
  onUpdatedTimeSheetChild
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [searchAssigneeStr, setSearchAssigneeStr] = React.useState("");
  const [isInitialValue, setInitialValue] = React.useState(false);

  const { data: listFriend } = useQueryListFriend({
    keyword: searchAssigneeStr,
  });

  const handleClickUpdateTimeSheet = React.useCallback((value) => {
    onUpdatedTimeSheetChild({
      ...rowData,
      ...value
    })
  }, [onUpdatedTimeSheetChild, rowData]);

  React.useEffect(() => {
    if (!isInitialValue) {
      setInitialValue(true);
      setSearchAssigneeStr(rowData.assignee?.fullname || "");
    }
  }, [isInitialValue, rowData]);

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
      data-row-index={rowData._id}
    >
      <div
        className={
          "financial-planning-table-action-sidebar w-6 bg-gray-300 text-white table-cell relative align-middle border border-gray-300"
        }
      ></div>
      <div
        className={
          "table-cell relative box-border border border-gray-300 align-middle bg-white"
        }
      >
        <p
          suppressContentEditableWarning={true}
          className={"w-full h-full focus:outline-blue-600 px-2 py-5"}
        >
          {index + 1}
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
          onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
            const value = e.target.innerText;
            handleClickUpdateTimeSheet({
              ...rowData,
              name: value
            })
          }}
        >
          {rowData.name}
        </p>
      </div>
      <div
        className={
          "p-2 table-cell relative box-border border border-gray-300 bg-white"
        }
      >
        <DatePicker
          className="w-16"
          value={rowData.date}
          selected={null}
          placeholderText='Chọn thời gian'
          onChange={(date: Date | null) => {
            if (moment(date).isValid())
            handleClickUpdateTimeSheet({
              ...rowData,
              date: moment(date).toJSON(),
            })
          }}
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
          onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
            const value = e.target.innerText;
            handleClickUpdateTimeSheet({
              ...rowData,
              hours: `${value}`
            })
          }}
        >
          {rowData.hours}
        </p>
      </div>
      <div
        className={
          "table-cell relative box-border border border-gray-300 bg-white w-1/12"
        }
      >
        <p
          contentEditable={"true"}
          suppressContentEditableWarning={true}
          className={
            "w-full h-full focus:outline-blue-600 p-2 flex justify-end"
          }
          onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
            const value = e.target.innerText;
            handleClickUpdateTimeSheet({
              ...rowData,
              unitprice: `${value}`
            })
          }}
        >
          {rowData.unitprice}
        </p>
      </div>
      <div
        className={
          "table-cell relative box-border border border-gray-300 bg-white w-1/12"
        }
      >
        <p
          contentEditable={"true"}
          suppressContentEditableWarning={true}
          className={
            "w-full h-full focus:outline-blue-600 p-2 flex justify-end"
          }
          onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
            const value = e.target.innerText;
            handleClickUpdateTimeSheet({
              ...rowData,
              amount: `${value}`
            })
          }}
        >
          {rowData.amount}
        </p>
      </div>
      <div
        className={
          "p-2 table-cell relative box-border border border-gray-300 bg-white"
        }
      >
        <DropdownSearchable
          id="ticket-creator"
          className={"w-full flex-1 py-1 px-3"}
          bordered
          isMultiple={false}
          allowClearValueSingleInput
          showTriangle
          placeholder="Người thực hiện"
          renderSelectedItem={(item) => <span>{item.text}</span>}
          data={listFriend}
          initialValue={rowData?.assignee?._id}
          formatItem={{
            id: "_id",
            text: "fullname",
          }}
          onSearchInputChange={debounce(
            (value) => setSearchAssigneeStr(value),
            500
          )}
          onchangeValue={(value) =>
            handleClickUpdateTimeSheet({
              ...rowData,
              assigneeID: value
            })
          }
        />
      </div>
      <div
        className={
          "table-cell relative box-border border border-gray-300 bg-white"
        }
      >
        <p
          contentEditable={"true"}
          suppressContentEditableWarning={true}
          className={"w-full h-full focus:outline-blue-600 p-2"}
          onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
            const value = e.target.innerText;
            handleClickUpdateTimeSheet({
              ...rowData,
              note: value
            })
          }}
        >
          {rowData.note}
        </p>
      </div>
      <RightClickMenu wrapperRef={wrapperRef} menu={<MenuChildRow />} />
    </div>
  );
};

export default DetailChildRow;
