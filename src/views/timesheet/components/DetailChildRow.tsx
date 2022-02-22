import React, { FC } from "react";
import DayPickerInput from "react-day-picker/DayPickerInput";
import debounce from "lodash/debounce";
import moment from "moment";

import DropdownSearchable from "components/common/DropdownSearch";
import MenuChildRow from "../../financial/planning/components/FinancialCashFlowDetail/MenuChildRow";

import { useQueryListFriend } from "services/hooks/users/useFriend";

import type {
  TimeSheetChild,
  UpdateTimeSheetChildPayload,
} from "typings/time-sheet";
import RightClickMenuWrapper from "components/common/RightClickMenuWrapper";

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
  onUpdatedTimeSheetChild,
}) => {
  const [searchAssigneeStr, setSearchAssigneeStr] = React.useState(
    rowData.assignee?.fullname || ""
  );

  const { data: listFriend } = useQueryListFriend({
    keyword: searchAssigneeStr,
  });

  const handleClickUpdateTimeSheet = React.useCallback(
    (value) => {
      onUpdatedTimeSheetChild({
        ...rowData,
        ...value,
      });
    },
    [onUpdatedTimeSheetChild, rowData]
  );

  return (
    <RightClickMenuWrapper
      contextMenu={<MenuChildRow />}
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
          className={"w-full h-full focus:outline-blue-600 px-[16px] py-[9px]"}
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
              name: value,
            });
          }}
        >
          {rowData.name}
        </p>
      </div>
      <div
        className={
          "px-[16px] py-[9px] table-cell relative box-border border border-gray-300 bg-white"
        }
      >
        <DayPickerInput
          // className="w-16"
          // selected={null}
          value={
            (moment(rowData.date).isValid() &&
              moment(rowData.date).format("DD/MM/YYYY")) ||
            ""
          }
          placeholder="Chọn thời gian"
          onDayChange={(date: Date | null) => {
            if (moment(date).isValid())
              handleClickUpdateTimeSheet({
                ...rowData,
                date: moment(date).toJSON(),
              });
          }}
        />
      </div>
      <div
        className={
          "table-cell relative box-border border border-gray-300 text-end bg-white"
        }
      >
        <p
          className={"w-full h-full focus:outline-blue-600 px-[16px] py-[9px]"}
        >
          <input
            type="checkbox"
            className="form-check-input cursor-pointer"
            checked={rowData.status === 1 ? true : false}
            onChange={(e) => {
              handleClickUpdateTimeSheet({
                ...rowData,
                status: e.target.checked ? 1 : 0,
              });
            }}
          />
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
            "w-full h-full focus:outline-blue-600 px-[16px] py-[9px] flex justify-end"
          }
          onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
            const value = e.target.innerText;
            handleClickUpdateTimeSheet({
              ...rowData,
              hours: `${value}`,
            });
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
            "w-full h-full focus:outline-blue-600 px-[16px] py-[9px] flex justify-end"
          }
          onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
            const value = e.target.innerText;
            handleClickUpdateTimeSheet({
              ...rowData,
              unitprice: `${value}`,
            });
          }}
        >
          {`${rowData.unitprice}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </p>
      </div>
      <div
        className={
          "table-cell relative box-border border border-gray-300 bg-white w-1/12"
        }
      >
        <p
          // contentEditable={"true"}
          suppressContentEditableWarning={true}
          className={
            "w-full h-full focus:outline-blue-600 px-[16px] py-[9px] flex justify-end"
          }
          // onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
          //   const value = e.target.innerText;
          //   handleClickUpdateTimeSheet({
          //     ...rowData,
          //     amount: `${value}`,
          //   });
          // }}
        >
          {`${rowData.amount}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </p>
      </div>
      <div
        className={
          "px-[16px] py-[9px] table-cell relative box-border border border-gray-300 bg-white"
        }
      >
        <DropdownSearchable
          id="ticket-creator"
          className={"w-full pl-0 -mb-1 outline-none "}
          bordered
          isMultiple={false}
          allowClearValueSingleInput
          showTriangle
          placeholder="Người thực hiện"
          renderSelectedItem={(item) => (
            <p
              style={{
                textOverflow: "ellipsis",
                maxWidth: "100%",
                minWidth: 0,
                width: "100px",
                whiteSpace: "nowrap",
                overflow: "hidden",
              }}
            >
              {item.text}
            </p>
          )}
          data={listFriend}
          initialValue={rowData?.assignee}
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
              assigneeID: value.id,
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
          className={"w-full h-full focus:outline-blue-600 px-[16px] py-[9px]"}
          onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
            const value = e.target.innerText;
            handleClickUpdateTimeSheet({
              ...rowData,
              note: value,
            });
          }}
        >
          {rowData.note}
        </p>
      </div>
    </RightClickMenuWrapper>
  );
};

export default DetailChildRow;
