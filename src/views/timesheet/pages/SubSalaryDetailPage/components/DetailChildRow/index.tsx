import React, { FC, useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import type {
  SalaryChild,
  SalaryParent,
  UpdateSalaryChildPayload,
} from "typings/salary";
import { toast } from "react-toastify";
import moment from "moment";
import { convertCurrency } from "utils/converter";
import { DeleteSalaryContext } from "../../contexts/DeleteSalary";
import downloadIcon from "assets/images/icons8-download-64.svg";
import { useCashBook } from "services/hooks/financial/useCashBook";
import { createLinkAndClick } from "utils";

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
  const deleteSalaryContext = useContext(DeleteSalaryContext)

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

  const onChangeCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!deleteSalaryContext) return;

    const { setSalaryIds } = deleteSalaryContext;
    const { checked, value } = event.target;

    setSalaryIds((curr: string[]) => {
      if (checked) {
        const newIds: string[] = [...curr, value];
        return newIds;
      }

      const filterCurr = curr.filter(id => id !== value);
      return filterCurr;
    })
  }

  //_____Import, export excel
  const [, setStateExport] = useState<{ isExporting: boolean }>({
    isExporting: false,
  });

  const { downloadTemplateExcelAsync } = useCashBook({});

  const handleDownloadExcel = async (param: any) => {
    try {
      setStateExport({ isExporting: true });
      const { error, data } = await downloadTemplateExcelAsync({
        salaryID: param.salaryID,
        option: param.option,
      });

      if (error) {
        return toast.warn(data?.message);
      }

      data && createLinkAndClick(data, "_self");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setStateExport({ isExporting: false });
    }
  };

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
      className={"transition duration-300 ease-in-out child-row table-row"}
      data-row-index={rowData._id}
    >
      <div
        className={
          "table-cell relative box-border border border-gray-300 align-middle bg-white"
        }
      >
        <p
          suppressContentEditableWarning={true}
          className={"w-full h-full focus:outline-blue-600 text-center"}
        >
          <input
						className="form-check-input"
						type="checkbox"
						value={rowData._id}
            checked={deleteSalaryContext ? deleteSalaryContext.salaryIds.includes(rowData._id) : false}
						onChange={onChangeCheckbox}
					/>
          <p>{index + 1}</p>
          <button className={"mr-2 text-primary"} onClick={() => handleDownloadExcel({option: 4, salaryID: rowData?._id})}>
            <img src={downloadIcon} className="max-w-full" />
          </button>
        </p>
      </div>
      <div
        className={
          "px-[2px] py-[2px] table-cell relative box-border border border-gray-300 align-middle bg-white"
        }
      >
        <NavLink to={`/timesheet/human_detail/${rowData?.human?._id}/${new Date(rowData?.date).getFullYear()}/${Number(new Date(rowData?.date).getMonth()) + 1}`}>
          {rowData?.human?.fullname}
        </NavLink>
        <p className="text-gray-400 text-[10px]"><i>P.ban: {rowData?.project?.name}</i></p>
        <p className="text-gray-400 text-[10px]"><i>C.anh: {rowData?.position?.name}</i></p>
        {/* <p className="text-gray-400 text-[10px]"><i>{rowData?._id}</i></p> */}
        <hr className="text-gray-400"/>
        <p className="text-[10px] text-cbs-highlight-color"><i>Giờ chính thức: {rowData?.hours1} ({rowData?.hours1 > 0 ? convertCurrency(Number(rowData?.salary/rowData?.hours1).toFixed(0)) : 0 })</i></p>
        <p className="text-[10px] text-cbs-highlight-color"><i>Giờ thử việc: {rowData?.hours4} ({rowData?.hours4 > 0 ? convertCurrency(Number(rowData?.mealAllowance/rowData?.hours4).toFixed(0)) : 0})</i></p>
        <p className="text-[10px] text-cbs-highlight-color"><i>Số ngày làm: {rowData?.nowds}</i></p>
        <p className="text-[10px] text-cbs-highlight-color"><i>Số ngày làm CN: {rowData?.nowdsos}</i></p>
        <hr className="text-gray-400"/>
        <p className="text-[10px] text-cbs-highlight-color"><i>Còn lại phải trả: {convertCurrency(Number(rowData?.remaining).toFixed(0))}</i></p>
        <hr className="text-gray-400"/>
        <p className="text-gray-400 text-[10px]"><i>Cre: {rowData?.userCreate?.fullname} {moment(rowData.createAt).format("DD/MM/YY hh:mm")}</i></p>
        <p className="text-gray-400 text-[10px]"><i>Mod: {rowData?.userUpdate?.fullname} {moment(rowData.modifyAt).format("DD/MM/YY hh:mm")}</i></p>
      </div>
      <div className="table-cell relative box-border border border-gray-300 align-middle bg-white">
        <p contentEditable={"true"} suppressContentEditableWarning={true} className="w-full h-full focus:outline-blue-600 px-[16px] py-[9px] flex justify-end"
          onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
            const value = e.target.innerText;
            handleClickUpdateSalary({...rowData, subAllowance1: `${value}`});
          }}
        >
          {convertCurrency(rowData.subAllowance1)}
        </p>
      </div>
      <div className="table-cell relative box-border border border-gray-300 align-middle bg-white">
        <p contentEditable={"true"} suppressContentEditableWarning={true} className="w-full h-full focus:outline-blue-600 px-[16px] py-[9px] flex justify-end"
          onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
            const value = e.target.innerText;
            handleClickUpdateSalary({...rowData, subAllowance2: `${value}`});
          }}
        >
          {convertCurrency(rowData.subAllowance2)}
        </p>
      </div>
      <div className="table-cell relative box-border border border-gray-300 align-middle bg-white">
        <p contentEditable={"true"} suppressContentEditableWarning={true} className="w-full h-full focus:outline-blue-600 px-[16px] py-[9px] flex justify-end"
          onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
            const value = e.target.innerText;
            handleClickUpdateSalary({...rowData, subAllowance3: `${value}`});
          }}
        >
          {convertCurrency(rowData.subAllowance3)}
        </p>
      </div>
      <div className="table-cell relative box-border border border-gray-300 align-middle bg-white">
        <p contentEditable={"true"} suppressContentEditableWarning={true} className="w-full h-full focus:outline-blue-600 px-[16px] py-[9px] flex justify-end"
          onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
            const value = e.target.innerText;
            handleClickUpdateSalary({...rowData, subAllowance4: `${value}`});
          }}
        >
          {convertCurrency(rowData.subAllowance4)}
        </p>
      </div>
      <div className="table-cell relative box-border border border-gray-300 align-middle bg-white">
        <p contentEditable={"true"} suppressContentEditableWarning={true} className="w-full h-full focus:outline-blue-600 px-[16px] py-[9px] flex justify-end"
          onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
            const value = e.target.innerText;
            handleClickUpdateSalary({...rowData, subAllowance5: `${value}`});
          }}
        >
          {convertCurrency(rowData.subAllowance5)}
        </p>
      </div>
      <div className="table-cell relative box-border border border-gray-300 align-middle bg-white">
        <p contentEditable={"true"} suppressContentEditableWarning={true} className="w-full h-full focus:outline-blue-600 px-[16px] py-[9px] flex justify-end"
          onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
            const value = e.target.innerText;
            handleClickUpdateSalary({...rowData, subAllowance6: `${value}`});
          }}
        >
          {convertCurrency(rowData.subAllowance6)}
        </p>
      </div>
      <div className="table-cell relative box-border border border-gray-300 align-middle bg-white">
        <p contentEditable={"true"} suppressContentEditableWarning={true} className="w-full h-full focus:outline-blue-600 px-[16px] py-[9px] flex justify-end"
          onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
            const value = e.target.innerText;
            handleClickUpdateSalary({...rowData, subAllowance7: `${value}`});
          }}
        >
          {convertCurrency(rowData.subAllowance7)}
        </p>
      </div>
      <div className="table-cell relative box-border border border-gray-300 align-middle bg-white">
        <p contentEditable={"true"} suppressContentEditableWarning={true} className="w-full h-full focus:outline-blue-600 px-[16px] py-[9px] flex justify-end"
          onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
            const value = e.target.innerText;
            handleClickUpdateSalary({...rowData, subAllowance8: `${value}`});
          }}
        >
          {convertCurrency(rowData.subAllowance8)}
        </p>
      </div>
      <div className="table-cell relative box-border border border-gray-300 align-middle bg-white">
        <p contentEditable={"true"} suppressContentEditableWarning={true} className="w-full h-full focus:outline-blue-600 px-[16px] py-[9px] flex justify-end"
          onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
            const value = e.target.innerText;
            handleClickUpdateSalary({...rowData, subAllowance9: `${value}`});
          }}
        >
          {convertCurrency(rowData.subAllowance9)}
        </p>
      </div>
      <div className="table-cell relative box-border border border-gray-300 align-middle bg-white">
        <p contentEditable={"true"} suppressContentEditableWarning={true} className="w-full h-full focus:outline-blue-600 px-[16px] py-[9px] flex justify-end"
          onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
            const value = e.target.innerText;
            handleClickUpdateSalary({...rowData, subAllowance10: `${value}`});
          }}
        >
          {convertCurrency(rowData.subAllowance10)}
        </p>
      </div>
      <div className="table-cell relative box-border border border-gray-300 align-middle bg-white">
        <p contentEditable={"true"} suppressContentEditableWarning={true} className="w-full h-full focus:outline-blue-600 px-[16px] py-[9px] flex justify-end"
          onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
            const value = e.target.innerText;
            handleClickUpdateSalary({...rowData, subAllowance11: `${value}`});
          }}
        >
          {convertCurrency(rowData.subAllowance11)}
        </p>
      </div>
      <div className="table-cell relative box-border border border-gray-300 align-middle bg-white">
        <p contentEditable={"true"} suppressContentEditableWarning={true} className="w-full h-full focus:outline-blue-600 px-[16px] py-[9px] flex justify-end"
          onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
            const value = e.target.innerText;
            handleClickUpdateSalary({...rowData, subAllowance12: `${value}`});
          }}
        >
          {convertCurrency(rowData.subAllowance12)}
        </p>
      </div>
      <div className="table-cell relative box-border border border-gray-300 align-middle bg-white">
        <p contentEditable={"true"} suppressContentEditableWarning={true} className="w-full h-full focus:outline-blue-600 px-[16px] py-[9px] flex justify-end"
          onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
            const value = e.target.innerText;
            handleClickUpdateSalary({...rowData, subAllowance13: `${value}`});
          }}
        >
          {convertCurrency(rowData.subAllowance13)}
        </p>
      </div>
      <div className="table-cell relative box-border border border-gray-300 align-middle bg-white">
        <p contentEditable={"true"} suppressContentEditableWarning={true} className="w-full h-full focus:outline-blue-600 px-[16px] py-[9px] flex justify-end"
          onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
            const value = e.target.innerText;
            handleClickUpdateSalary({...rowData, subAllowance14: `${value}`});
          }}
        >
          {convertCurrency(rowData.subAllowance14)}
        </p>
      </div>
      <div className="table-cell relative box-border border border-gray-300 align-middle bg-white">
        <p contentEditable={"true"} suppressContentEditableWarning={true} className="w-full h-full focus:outline-blue-600 px-[16px] py-[9px] flex justify-end"
          onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
            const value = e.target.innerText;
            handleClickUpdateSalary({...rowData, subAllowance15: `${value}`});
          }}
        >
          {convertCurrency(rowData.subAllowance15)}
        </p>
      </div>   
      <div className="table-cell relative box-border border border-gray-300 align-middle bg-white">
        <p className="w-full h-full focus:outline-blue-600 px-[16px] py-[9px] flex justify-end font-bold">
          {convertCurrency(rowData.mealAllowance)}
        </p>
      </div>
      <div className="table-cell relative box-border border border-gray-300 align-middle bg-white">
        <p contentEditable={"true"} suppressContentEditableWarning={true} className="w-full h-full focus:outline-blue-600 px-[16px] py-[9px] flex justify-end"
          onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
            const value = e.target.innerText;
            handleClickUpdateSalary({...rowData, subAllowance16: `${value}`});
          }}
        >
          {convertCurrency(rowData.subAllowance16)}
        </p>
      </div>
      <div className="table-cell relative box-border border border-gray-300 align-middle bg-white">
        <p contentEditable={"true"} suppressContentEditableWarning={true} className="w-full h-full focus:outline-blue-600 px-[16px] py-[9px] flex justify-end"
          onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
            const value = e.target.innerText;
            handleClickUpdateSalary({...rowData, subAllowance17: `${value}`});
          }}
        >
          {convertCurrency(rowData.subAllowance17)}
        </p>
      </div>
      <div className="table-cell relative box-border border border-gray-300 align-middle bg-white">
        <p contentEditable={"true"} suppressContentEditableWarning={true} className="w-full h-full focus:outline-blue-600 px-[16px] py-[9px] flex justify-end"
          onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
            const value = e.target.innerText;
            handleClickUpdateSalary({...rowData, subAllowance18: `${value}`});
          }}
        >
          {convertCurrency(rowData.subAllowance18)}
        </p>
      </div>
      <div className="table-cell relative box-border border border-gray-300 align-middle bg-white">
        <p contentEditable={"true"} suppressContentEditableWarning={true} className="w-full h-full focus:outline-blue-600 px-[16px] py-[9px] flex justify-end"
          onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
            const value = e.target.innerText;
            handleClickUpdateSalary({...rowData, subAllowance19: `${value}`});
          }}
        >
          {convertCurrency(rowData.subAllowance19)}
        </p>
      </div>
      <div className="table-cell relative box-border border border-gray-300 align-middle bg-white">
        <p contentEditable={"true"} suppressContentEditableWarning={true} className="w-full h-full focus:outline-blue-600 px-[16px] py-[9px] flex justify-end"
          onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
            const value = e.target.innerText;
            handleClickUpdateSalary({...rowData, subAllowance20: `${value}`});
          }}
        >
          {convertCurrency(rowData.subAllowance20)}
        </p>
      </div>
      <div className="table-cell relative box-border border border-gray-300 align-middle bg-white">
        <p contentEditable={"true"} suppressContentEditableWarning={true} className="w-full h-full focus:outline-blue-600 px-[16px] py-[9px] flex justify-end"
          onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
            const value = e.target.innerText;
            handleClickUpdateSalary({...rowData, subAllowance21: `${value}`});
          }}
        >
          {convertCurrency(rowData.subAllowance21)}
        </p>
      </div>
      <div className="table-cell relative box-border border border-gray-300 align-middle bg-white">
        <p contentEditable={"true"} suppressContentEditableWarning={true} className="w-full h-full focus:outline-blue-600 px-[16px] py-[9px] flex justify-end"
          onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
            const value = e.target.innerText;
            handleClickUpdateSalary({...rowData, subAllowance22: `${value}`});
          }}
        >
          {convertCurrency(rowData.subAllowance22)}
        </p>
      </div>
      <div className="table-cell relative box-border border border-gray-300 align-middle bg-white">
        <p className="w-full h-full focus:outline-blue-600 px-[16px] py-[9px] flex justify-end font-bold">
          {convertCurrency(rowData.other)}
        </p>
      </div>   
      <div className="table-cell relative box-border border border-gray-300 align-middle bg-white">
        <p
          contentEditable={"true"} suppressContentEditableWarning={true} className={"w-full h-full focus:outline-blue-600 px-[16px] py-[9px]"}
          onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
            const value = e.target.innerText;
            handleClickUpdateSalary({...rowData, note: value});
          }}
        >
          {rowData.note}
        </p>
      </div>
    </div>
  )
}