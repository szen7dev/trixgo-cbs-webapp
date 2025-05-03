import React, { FC } from "react";
import DayPickerInput from "react-day-picker/DayPickerInput";
import debounce from "lodash/debounce";
import { convertCurrency } from "utils/converter";
import moment from "moment";
// import "moment-timezone";

import {DropdownSearchable} from "shareComponents/common";
import { useUserSystem } from "services/hooks/users/useUserSystem";
import {
	useQueryListBudgetWork,
} from "services/hooks/cmcs/useContractIncome";
import { LIMIT_DROPDOWN, TIMESHEET_SUBTYPES, DAYOFWEEKS, TIMESHEET_SHIFT_TYPES, TIMESHEET_OFFICIAL } from "apis/localdb/index";
import { useAuth } from "services/hooks/auth/useAuth";

import type {
  TimeSheetChild,
  TimeSheetParent,
  UpdateTimeSheetChildPayload,
} from "typings/time-sheet";
// import { toast } from "react-toastify";

type Props = {
  parent?: TimeSheetParent;
  rowData: TimeSheetChild;
  collapsed: boolean;
  isLastRow: boolean;
  index: number;
  onUpdatedTimeSheetChild: (values: UpdateTimeSheetChildPayload) => void;
  hasPermission: boolean;
}

export const DetailChildRow: FC<Props> = ({
  parent,
  rowData,
  collapsed,
  index,
  hasPermission,
  onUpdatedTimeSheetChild,
}) => {
  const { user } = useAuth();

  const [searchBudgetWorkValue, setSearchBudgetWorkValue] = React.useState(
    rowData?.budgetWork?.name || ""
	);

  const [searchAssigneeStr, setSearchAssigneeStr] = React.useState(
    rowData.assignee?.fullname || ""
  );

  const {
    data: listUsersSystem,
  } = useUserSystem({ 
    companyID: user?.company._id,
    keyword: searchAssigneeStr 
  }, true);

  const { listBudgetWork } = useQueryListBudgetWork({
		limit: LIMIT_DROPDOWN,
		keyword: searchBudgetWorkValue,
	});

  const handleClickUpdateTimeSheet = React.useCallback(
    (value) => {
      // if(!hasPermission) {
      //   return toast.warn('Bạn không có quyền cập nhật nội dung này')
      // }
      onUpdatedTimeSheetChild({
        ...rowData,
        ...value,
      });
    },
    [onUpdatedTimeSheetChild, rowData, hasPermission]
  );

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
        <p className="text-cbs-highlight-color ml-3"><i>{rowData?.shiftType ? TIMESHEET_SHIFT_TYPES[rowData?.shiftType - 1].name : ''}</i></p>
      </div>
      <div
        className={
          "px-[16px] py-[9px] table-cell relative box-border border border-gray-300 bg-white"
        }
      >
        <DayPickerInput
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
        <p className="text-gray-400 text-[10px]">
          <i>Cre: {rowData?.userCreate?.fullname}{" "}
          {rowData?.createAt ? new Date(rowData?.createAt).toLocaleString("en-GB", {
              timeZone: "Asia/Ho_Chi_Minh",
              day: "2-digit",
              month: "2-digit",
              year: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              hour12: false, // Định dạng 24 giờ
            }) : ''}
          </i></p>
        <p className="text-gray-400 text-[10px]">
          <i>Mod: {rowData?.userUpdate?.fullname}{" "}
          {rowData?.modifyAt ? new Date(rowData?.modifyAt).toLocaleString("en-GB", {
              timeZone: "Asia/Ho_Chi_Minh",
              day: "2-digit",
              month: "2-digit",
              year: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              hour12: false, // Định dạng 24 giờ
            }) : ''}
          </i></p>
        <p className="text-gray-400 text-[10px]"><i>{rowData?._id}</i></p>
        <p className="text-gray-400 text-[10px] text-cbs-highlight-color"><i>{DAYOFWEEKS[Number(new Date(rowData?.date).getDay())]?.name}</i></p>
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
          {/* {rowData.hours} */}
          {convertCurrency(rowData.hours)}
        </p>
      </div>
      <div
        className={
          "table-cell relative box-border border border-gray-300 bg-white"
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
          {convertCurrency(rowData.unitprice)}
          {/* {`${rowData.unitprice}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} */}
        </p>
      </div>
      <div
        className={
          "table-cell relative box-border border border-gray-300 bg-white"
        }
      >
        <p
          suppressContentEditableWarning={true}
          className={
            "w-full h-full focus:outline-blue-600 px-[16px] py-[9px] flex justify-end"
          }
        >
          {convertCurrency(rowData.amount)}
          {/* {`${rowData.amount}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} */}
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
          data={listUsersSystem}
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
          "px-[16px] py-[9px] table-cell relative box-border border border-gray-300 bg-white"
        }
      >
        <DropdownSearchable
          id="ticket-creator"
          className={"w-full pl-0 outline-none text-gray-400"}
          bordered
          isMultiple={false}
          allowClearValueSingleInput
          showTriangle
          placeholder="Loại"
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
          data={TIMESHEET_SUBTYPES}
          initialValue={rowData?.subtype}
          formatItem={{
            id: "_id",
            text: "name",
          }}
          onchangeValue={(value) =>
            handleClickUpdateTimeSheet({
              ...rowData,
              subtype: value.id,
            })
          }
        />
        <p>{TIMESHEET_SUBTYPES[Number(rowData?.subtype)-1].name}</p>

        <hr />
        <DropdownSearchable
          id="ticket-creator"
          className={"w-full pl-0 outline-none text-gray-400"}
          bordered
          isMultiple={false}
          allowClearValueSingleInput
          showTriangle
          placeholder="Khác"
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
          data={TIMESHEET_OFFICIAL}
          initialValue={rowData?.official}
          formatItem={{
            id: "_id",
            text: "name",
          }}
          onchangeValue={(value) =>
            handleClickUpdateTimeSheet({
              ...rowData,
              official: value.id,
            })
          }
        />
        <p>{rowData?.official ? TIMESHEET_OFFICIAL[Number(rowData?.official)-1].name : ''}</p>
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
          placeholder="Ngân sách"
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
          data={listBudgetWork}
          initialValue={rowData?.budgetWork}
          formatItem={{
            id: "_id",
            text: "name",
          }}
          onSearchInputChange={debounce(
            (value) => setSearchBudgetWorkValue(value),
            500
          )}
          onchangeValue={(value) =>
            handleClickUpdateTimeSheet({
              ...rowData,
              workID: value.id,
            })
          }
        />
          <p className="text-gray-400"><i>{rowData?.budgetWork?.name} - {convertCurrency(rowData?.budgetWork?.unitPrice)}/{rowData?.budgetWork?.unit}</i></p>
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
        <p>{rowData?.history}</p>
      </div>
    </div>
  )
}