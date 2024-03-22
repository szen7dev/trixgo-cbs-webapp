import React, { FC } from "react";
import { NavLink, useParams, useHistory } from "react-router-dom";
import type {
  SalaryChild,
  SalaryParent,
  UpdateSalaryChildPayload,
} from "typings/salary";
import { toast } from "react-toastify";
import moment from "moment";
import { convertCurrency } from "utils/converter";

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
  onUpdatedSalaryChild
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
          "px-[2px] py-[2px] table-cell relative box-border border border-gray-300 align-middle bg-white"
        }
      >
        <NavLink to={`/timesheet/mine/${rowData?.human?._id}`}>
          {rowData?.human?.fullname}
        </NavLink>
        <p className="text-gray-400 text-[10px]"><i>{rowData?.project?.name}</i></p>
        <p className="text-gray-400 text-[10px]"><i>{rowData?.position?.name}</i></p>
        <p className="text-gray-400 text-[10px]"><i>Cre: {rowData?.userCreate?.fullname} {moment(rowData.createAt).format("DD/MM/YY hh:mm")}</i></p>
        <p className="text-gray-400 text-[10px]"><i>Mod: {rowData?.userUpdate?.fullname} {moment(rowData.modifyAt).format("DD/MM/YY hh:mm")}</i></p>
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
              salary: `${value}`,
            });
          }}
        >
          {convertCurrency(rowData.salary)}
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
              onLeaveSalary: `${value}`,
            });
          }}
        >
          {convertCurrency(rowData.onLeaveSalary)}
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
              revenueBonus: `${value}`,
            });
          }}
        >
          {convertCurrency(rowData.revenueBonus)}
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
              reward: `${value}`,
            });
          }}
        >
          {convertCurrency(rowData.reward)}
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
              mealAllowance: `${value}`,
            });
          }}
        >
          {convertCurrency(rowData.mealAllowance)}
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
          {convertCurrency(rowData.punishment)}
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
          {convertCurrency(rowData.insurance)}
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
          {convertCurrency(rowData.pitax)}
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
              union: `${value}`,
            });
          }}
        >
          {convertCurrency(rowData.union)}
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
              share: `${value}`,
            });
          }}
        >
          {convertCurrency(rowData.share)}
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
              other: `${value}`,
            });
          }}
        >
          {convertCurrency(rowData.other)}
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
          {convertCurrency(rowData.advance)}
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
          {convertCurrency(rowData.paid)}
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
          {convertCurrency(rowData.remaining)}
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