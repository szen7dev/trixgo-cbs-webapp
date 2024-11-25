import React, { FC, useRef, useState, useEffect, useCallback } from "react";
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { APP_ID } from "apis/localdb";
import { toast } from "react-toastify";
import { useCheckPerAccessApp } from "services/hooks/auth/usePermissions";
import moment from "moment";
import { convertCurrency } from "utils/converter";
import { useAuth } from "services/hooks/auth/useAuth";

import {
  DialogSalaryForm,
} from "views/timesheet/shareComponents/common";

import { useModal } from "services/hooks/useModal";
import {
  useByProperty,
  useMutationSalaryParent,
  useSalaryCustom,
} from "services/hooks/useSalary";

import { createLinkAndClick } from "utils";

const SalaryHomePageMonth: FC = () => {
    const params = useParams<{ year: string }>();
    const year = Number(params["year"]);
  const { user } = useAuth();
  const history = useHistory()
  const { hasPermission } = useCheckPerAccessApp({ appID: APP_ID.TIMESHEET.id })
  useEffect(() => {
    if (!hasPermission) {
      toast.error("Bạn không có quyền truy cập chức năng này");
      history.push("/")
    }
  }, [hasPermission])

  const { openModal, closeModal } = useModal();

  const {
    onCreateSalaryParentAsync,
  } = useMutationSalaryParent();
  
  const currentYear = new Date().getFullYear()
  let yearFilter = new Date().getFullYear()
  if(year && !isNaN(year)){
      yearFilter = Number(year)
  }
  const items = [yearFilter-2, yearFilter-1, yearFilter, yearFilter+1];

  const { listByProperty, refetchListByProperty } = useByProperty({
    params: {
        year: yearFilter
    },
    isFetchList: true
  })

  const handleCreateSalary = React.useCallback(
    async (values) => {
      try {
        const isCreated = await onCreateSalaryParentAsync(values);
        if (!isCreated.error) {
          refetchListByProperty();
          closeModal();
          return null;
        } else {
          return toast.error(isCreated.data.message)
        }
      } catch (err) {
        return null;
      }
    },
    [closeModal, onCreateSalaryParentAsync, refetchListByProperty]
  );

  //_____Import, export excel
  const [, setStateExport] = useState<{ isExporting: boolean }>({
    isExporting: false,
  });

  const { exportExcelAsync } = useSalaryCustom({});

  const handleDownloadExcel = async (param: any) => {
    try {
      setStateExport({ isExporting: true });
      const { error, data } = await exportExcelAsync({
        option: param.option,
        year: param.year,
        month: param.month,
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
    <div className={"financial-cashflow-listing paginate-wrapper relative"}>
      <div
        className={
          "financial-cashflow-listing-heading flex items-center border-b py-2 px-6"
        }
      >
        <div className={"flex items-center flex-1"}>
          <div>
            {items?.map((item: any, index: any) => (
              <NavLink className="px-2 py-2" to={`/timesheet/salary/${item}`} key={item}>
                Năm {item}
              </NavLink>
            ))}
          </div>
          <span className="text-primary">Bảng lương năm {yearFilter}</span>
        </div>

        <button
          className={"bg-green-success h-[32px] text-white rounded px-5"}
          onClick={() =>
            openModal(
              <div className="t-main-search text-left transition-all transform bg-primary-light shadow-xl rounded my-20 align-top inline-block">
                <DialogSalaryForm
                  title="Tạo mới bảng lương"
                  onSubmit={handleCreateSalary}
                  projectName={""}
                  assigneeName={""}
                />
              </div>
            )
          }
        >
          Tạo mới
        </button>
      </div>

      <div className={"financial-cashflow-table"}>
        <div className={"relative table border-collapse w-full"}>
          <div className={"header table-row sticky z-10"}>
            <div
              className={
                "px-2 py-2 table-cell box-border border-b text-gray-500"
              }
            >
              Tháng
            </div>
            <div
              className={
                "px-2 py-2 table-cell box-border border-b text-right text-gray-500"
              }
            >
             Ghi nhận lương
            </div>
            <div
              className={
                "px-2 py-2 table-cell box-border border-b text-right text-gray-500"
              }
            >
              Đã trả
            </div>
            <div
              className={
                "px-2 py-2 table-cell box-border border-b text-right text-gray-500"
              }
            >
            </div>
            <div
              className={
                "px-2 py-2 table-cell box-border border-b text-right text-gray-500"
              }
            >
              Còn lại
            </div>
            <div
              className={
                "px-2 py-2 table-cell box-border border-b text-right text-gray-500"
              }
            >
            </div>
            <div
              className={
                "px-2 py-2 table-cell box-border border-b text-gray-500"
              }
            >
              Tải báo cáo tổng hợp
            </div>
          </div>
          {listByProperty?.map((item: any, index: any) => (
            <div className={"body-table table-row"} key={item._id?.month}>
              <div
                className={
                  "px-2 py-2 table-cell box-border border-b"
                }
              >
                <NavLink to={`/timesheet/salary/${yearFilter}/${item._id?.month}`}>
                  Tháng {item._id?.month}/{yearFilter}
                </NavLink>
              </div>
              <div
                className={
                  "px-2 py-2 table-cell box-border border-b text-right"
                }
              >
                {convertCurrency(Number(item?.salary))}
              </div>
              <div
                className={
                  "px-2 py-2 table-cell box-border border-b text-right"
                }
              >
                {convertCurrency(Number(item?.paid))}
              </div>
              <div
                className={
                  "px-2 py-2 table-cell box-border border-b text-right"
                }
              >
                <p><i>{Number(100*(item?.paid / item?.salary)).toFixed(0)}%</i></p>
              </div>
              <div
                className={
                  "px-2 py-2 table-cell box-border border-b text-right"
                }
              >
                {convertCurrency(Number(item?.salary - item?.paid))}
              </div>
              <div
                className={
                  "px-2 py-2 table-cell box-border border-b text-right"
                }
              >
                <p><i>{Number(100*((item?.salary - item?.paid) / item?.salary)).toFixed(0)}%</i></p>
              </div>
              <div
                  className={
                    "px-2 py-2 table-cell box-border border-b"
                  }
                >
                  <button className={"text-primary"} onClick={() => handleDownloadExcel({option: 1, year: yearFilter, month: item._id?.month})}>
                      Tải dữ liệu
                  </button>
                </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SalaryHomePageMonth;