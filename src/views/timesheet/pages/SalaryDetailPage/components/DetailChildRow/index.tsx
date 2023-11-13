import React, { FC } from "react";
// import DayPickerInput from "react-day-picker/DayPickerInput";
import debounce from "lodash/debounce";
// import moment from "moment";

import { DropdownSearchable } from "shareComponents/common";
import { useUserSystem } from "services/hooks/users/useUserSystem";

import type {
  SalaryChild,
  SalaryParent,
  UpdateSalaryChildPayload,
} from "typings/salary";
import { toast } from "react-toastify";

type Props = {
  parent?: SalaryParent;
  rowData: SalaryChild;
  collapsed: boolean;
  isLastRow: boolean;
  index: number;
  onUpdatedSalaryChild: (values: UpdateSalaryChildPayload) => void;
  hasPermission: boolean;
};

export const DetailChildRow: FC<Props> = ({
  rowData,
  collapsed,
  index,
  hasPermission,
  onUpdatedSalaryChild,
}) => {
  const [searchBudgetWorkValue, setSearchBudgetWorkValue] = React.useState(
    rowData.work?.name || ""
	);

  const [searchAssigneeStr, setSearchAssigneeStr] = React.useState(
    rowData.human?.fullname || ""
  );

  const {
    data: listUsersSystem,
  } = useUserSystem({ keyword: searchAssigneeStr }, true);

  const handleClickUpdateSalary = React.useCallback(
    (value) => {
      if(!hasPermission) {
        return toast.warn('Bạn không có quyền cập nhật nội dung này')
      }
      onUpdatedSalaryChild({
        ...rowData,
        ...value,
      });
    },
    [onUpdatedSalaryChild, rowData, hasPermission]
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
          "px-[2px] py-[2px] table-cell relative box-border border border-gray-300 bg-white"
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
          initialValue={rowData?.human}
          formatItem={{
            id: "_id",
            text: "fullname",
          }}
          onSearchInputChange={debounce(
            (value) => setSearchAssigneeStr(value),
            500
          )}
          onchangeValue={(value) =>
            handleClickUpdateSalary({
              ...rowData,
              humanID: value.id,
            })
          }
        />
      </div>
      {/* <div
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
            handleClickUpdateSalary({
              ...rowData,
              name: value,
            });
          }}
        >
          {rowData.name}
        </p>
      </div> */}
      <div
        className={
          "px-[16px] py-[9px] table-cell relative box-border border border-gray-300 bg-white"
        }
      >
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
            handleClickUpdateSalary({
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
}