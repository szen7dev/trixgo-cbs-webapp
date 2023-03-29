import React, { FC } from "react";
import DayPickerInput from "react-day-picker/DayPickerInput";
import debounce from "lodash/debounce";
import moment from "moment";

import {DropdownSearchable} from "shareComponents/common";

// import MenuChildRow from "./MenuChildRow";

// import { useRightClickMenu } from "services/hooks/useRightClickMenu";
import { useQueryListFriend } from "services/hooks/users/useFriend";

import type {
  TimeSheetChild,
  TimeSheetParent,
  UpdateTimeSheetChildPayload,
} from "typings/time-sheet";
import { toast } from "react-toastify";

type Props = {
  parent?: TimeSheetParent;
  rowData: TimeSheetChild;
  collapsed: boolean;
  isLastRow: boolean;
  index: number;
  onUpdatedTimeSheetChild: (values: UpdateTimeSheetChildPayload) => void;
  hasPermission: boolean;
};

export const DetailChildRow: FC<Props> = ({
  parent,
  rowData,
  collapsed,
  isLastRow,
  index,
  hasPermission,
  onUpdatedTimeSheetChild,
}) => {
  // const { closeRightClick, openRightClick } = useRightClickMenu();

  const [searchAssigneeStr, setSearchAssigneeStr] = React.useState(
    rowData.assignee?.fullname || ""
  );

  const { data: listFriend } = useQueryListFriend({
    keyword: searchAssigneeStr,
  });

  const handleClickUpdateTimeSheet = React.useCallback(
    (value) => {
      if(!hasPermission) {
        return toast.warn('Bạn không có quyền cập nhật nội dung này')
      }
      onUpdatedTimeSheetChild({
        ...rowData,
        ...value,
      });
    },
    [onUpdatedTimeSheetChild, rowData, hasPermission]
  );

  // const handleContextMenu = React.useCallback(
  //   (e) => {
  //     e.preventDefault();
  //     openRightClick({
  //       content: <MenuChildRow />,
  //       x: e.pageX,
  //       y: e.pageY,
  //     });
  //   },
  //   [openRightClick]
  // );

  // React.useEffect(() => {
  //   document.addEventListener("click", closeRightClick);
  //   document.addEventListener("contextmenu", handleContextMenu);
  //   return () => {
  //     document.addEventListener("click", closeRightClick);
  //     document.removeEventListener("contextmenu", handleContextMenu);
  //   };
  // }, [closeRightClick, handleContextMenu]);

  return (
    <div
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
      className={"transition duration-300 ease-in-out child-row table-row "}
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
          initialValue={rowData?.assignee ?? parent?.assignee}
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
    </div>
  );
};