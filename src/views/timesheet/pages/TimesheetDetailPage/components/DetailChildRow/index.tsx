import React, { FC } from "react";
import DayPickerInput from "react-day-picker/DayPickerInput";
import debounce from "lodash/debounce";
import moment from "moment";

import {DropdownSearchable} from "shareComponents/common";
import { useUserSystem } from "services/hooks/users/useUserSystem";
import {
	useQueryListBudgetWork,
} from "services/hooks/cmcs/useContractIncome";
import { LIMIT_DROPDOWN } from "apis/localdb/index";

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

const SUBTYPES = [
  { _id: 1, name: 'Ngày bình thường' },
  { _id: 2, name: 'Ngày nghỉ phép'},
  { _id: 3, name: 'Ngày lễ, tết'},
  { _id: 4, name: 'Ngày công tác'},
]

export const DetailChildRow: FC<Props> = ({
  parent,
  rowData,
  collapsed,
  index,
  hasPermission,
  onUpdatedTimeSheetChild,
}) => {

  const [searchBudgetWorkValue, setSearchBudgetWorkValue] = React.useState(
    rowData.work?.name || ""
	);

  const [searchAssigneeStr, setSearchAssigneeStr] = React.useState(
    rowData.assignee?.fullname || ""
  );

  const {
    data: listUsersSystem,
  } = useUserSystem({ keyword: searchAssigneeStr }, true);

  const { listBudgetWork } = useQueryListBudgetWork({
		limit: LIMIT_DROPDOWN,
		keyword: searchBudgetWorkValue,
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
        <p className="text-gray-400 text-[10px]"><i>Cre: {rowData?.userCreate?.fullname} {moment(rowData.createAt).format("DD/MM/YY hh:mm")}</i></p>
        <p className="text-gray-400 text-[10px]"><i>Mod: {rowData?.userUpdate?.fullname} {moment(rowData.modifyAt).format("DD/MM/YY hh:mm")}</i></p>
        <p className="text-gray-400 text-[10px]"><i>{rowData?._id}</i></p>
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
          suppressContentEditableWarning={true}
          className={
            "w-full h-full focus:outline-blue-600 px-[16px] py-[9px] flex justify-end"
          }
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
          initialValue={rowData?.work}
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
          placeholder="PL"
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
          data={SUBTYPES}
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
        <p>{SUBTYPES[Number(rowData?.subtype)-1].name}</p>
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