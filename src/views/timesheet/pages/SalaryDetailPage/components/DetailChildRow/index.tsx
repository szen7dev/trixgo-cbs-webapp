import React, { FC } from "react";
import DayPickerInput from "react-day-picker/DayPickerInput";
import moment from "moment";

import { DropdownSearchable } from "shareComponents/common";

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
  hasPermission: boolean;
  listUserSearched: any[];
  onUpdatedSalaryChild: (values: UpdateSalaryChildPayload) => void;
  onSearchUser: (value: string) => void;
};

export const DetailChildRow: FC<Props> = ({
  rowData,
  collapsed,
  index,
  hasPermission,
  listUserSearched,
  onUpdatedSalaryChild,
  onSearchUser,
}) => {
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
        {rowData?.human?.fullname}
        {/* <DropdownSearchable
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
                width: "150px",
                whiteSpace: "nowrap",
                overflow: "hidden",
              }}
            >
              {item.text}
            </p>
          )}
          data={listUserSearched}
          initialValue={rowData?.human}
          formatItem={{
            id: "_id",
            text: "fullname",
          }}
          onSearchInputChange={onSearchUser}
          onchangeValue={(value) =>
            handleClickUpdateSalary({
              ...rowData,
              humanID: value.id,
            })
          }
        /> */}
      </div>
      {/* <div
        className={
          "px-[5px] py-[2px] table-cell relative box-border border border-gray-300 bg-white w-50"
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
              handleClickUpdateSalary({
                ...rowData,
                date: moment(date).toJSON(),
              });
          }}
        />
      </div> */}
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
            handleClickUpdateSalary({
              ...rowData,
              salary: `${value}`,
            });
          }}
        >
          {`${rowData.salary}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
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
            handleClickUpdateSalary({
              ...rowData,
              revenueBonus: `${value}`,
            });
          }}
        >
          {`${rowData.revenueBonus}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
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
            handleClickUpdateSalary({
              ...rowData,
              reward: `${value}`,
            });
          }}
        >
          {`${rowData.reward}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
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
            handleClickUpdateSalary({
              ...rowData,
              mealAllowance: `${value}`,
            });
          }}
        >
          {`${rowData.mealAllowance}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
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
            handleClickUpdateSalary({
              ...rowData,
              punishment: `${value}`,
            });
          }}
        >
          {`${rowData.punishment}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
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
            handleClickUpdateSalary({
              ...rowData,
              insurance: `${value}`,
            });
          }}
        >
          {`${rowData.insurance}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
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
            handleClickUpdateSalary({
              ...rowData,
              pitax: `${value}`,
            });
          }}
        >
          {`${rowData.pitax}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
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
            handleClickUpdateSalary({
              ...rowData,
              advance: `${value}`,
            });
          }}
        >
          {`${rowData.advance}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </p>
      </div>
      <div
        className={
          "table-cell relative box-border border border-gray-300 align-middle bg-white"
        }
      >
        <p
          suppressContentEditableWarning={true}
          className={
            "w-full h-full focus:outline-blue-600 px-[16px] py-[9px] flex justify-end"
          }
          onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
            const value = e.target.innerText;
            handleClickUpdateSalary({
              ...rowData,
              remaining: `${value}`,
            });
          }}
        >
          {`${rowData.remaining}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
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
            handleClickUpdateSalary({
              ...rowData,
              paid: `${value}`,
            });
          }}
        >
          {`${rowData.paid}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
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
  )
}