import React, { FC, useRef, useState, useEffect, useCallback } from "react";
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { APP_ID } from "apis/localdb";
import { toast } from "react-toastify";
import { useCheckPerAccessApp } from "services/hooks/auth/usePermissions";
import moment from "moment";
import { convertCurrency } from "utils/converter";
import { useAuth } from "services/hooks/auth/useAuth";
import iconCreate from "assets/images/icons8-create.png";
import { useModal } from "services/hooks/useModal";
import { ModalConfirm } from "shareComponents/common";
import { createLinkAndClick } from "utils";
import API from "apis/repository";
import {
  DialogSalaryForm,
} from "views/timesheet/shareComponents/common";
import {
  useByProperty,
  useMutationSalaryParent,
  useSalaryCustom,
} from "services/hooks/useSalary";

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
  }

  const toggleModalOpen = (param: any) => {
      openModal(
          <div
          className={
              "inline-block w-[521px] h-[240px] my-8 overflow-hidden text-left align-middle transition-all transform bg-primary-light shadow-xl rounded"
          }
          >
          <ModalConfirm
              title="Bạn có muốn xác nhận Đồng bộ không?"
              description= "Dữ liệu từ Bảng chấm công ca làm việc sẽ được đồng bộ về bảng chấm công tháng"
              onConfirm={() => handleConfirmSync({ option: param.option, year: param.year, month: param.month })}
              defaultText={false}
              onCancel={closeModal}
          />
          </div>
      )
  }

  const handleConfirmSync = useCallback(async (param: any) => {
      closeModal();

      const { data, status } = await API.post(
          `/api/timesheet/expert_salary/sync-data`, {
              option: param.option,
              year: param.year,
              month: param.month,
          }
      )
      
      if (status !== 200 || data.error) {
          return toast.warn('Đồng bộ thất bại')
      }
      return toast.success('Đồng bộ thành công')
  }, [])

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
             Tổng lương - Thu hộ
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
              Hành động
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
                      "px-2 py-2 table-cell box-border border-b text-right"
                    }
                  >
                    { ["6046bedeb55525368b11c5c3","6046bf25b55525368b11d311"].includes(`${user?.company?._id.toString()}`) ? <button className={"flex text-primary-gray items-center rounded hover:bg-cbs-form-input-bg px-3 h-[30px] mr-2"} onClick={() => toggleModalOpen({ option: 6, year: yearFilter, month: item._id?.month })}><img src={iconCreate} title={'Tạo bảng lương theo cơ sở'} className={"w-[24px] h-[24px]"} /><span>Tạo bảng lương theo cơ sở</span></button> : <></>}
              </div>
              <div
                  className={
                    "px-2 py-2 table-cell box-border border-b"
                  }
                >
                  <button className={"text-primary mr-3"} onClick={() => handleDownloadExcel({option: 1, year: yearFilter, month: item._id?.month})}>
                      Tải dữ liệu
                  </button>
                  |
                  <button className={"text-primary mr-3"} onClick={() => handleDownloadExcel({option: 2, year: yearFilter, month: item._id?.month})}>
                      Tải KPI Quản lý cơ sở
                  </button>
                  |
                  <button className={"text-primary"} onClick={() => handleDownloadExcel({option: 3, year: yearFilter, month: item._id?.month})}>
                      Tải KPI Nhân viên cơ sở
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