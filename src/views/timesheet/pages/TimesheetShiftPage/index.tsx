import { FC, useState, useEffect, useCallback } from "react";
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { APP_ID } from "apis/localdb";
import { toast } from "react-toastify";
import { useCheckPerAccessApp } from "services/hooks/auth/usePermissions";
import { convertCurrency } from "utils/converter";
import { createLinkAndClick } from "utils";
import iconCreate from "assets/images/icons8-create.png";
import {
    useByProperty,
    useTimesheetCustom
  } from "services/hooks/useTimeSheet";
import { useModal } from "services/hooks/useModal";
import { ModalConfirm } from "shareComponents/common";
import API from "apis/repository";
interface TimesheetHomePageProps {
  type?: number
}

const TimesheetShiftPage: FC<TimesheetHomePageProps> = ({type}) => {
    const params = useParams<{ year: string }>();

    let url: any
    const pathname = window.location.pathname;
    if(pathname.includes('indirect')){
      url = 'indirect'
    }else{
      url = 'shift'
    }

    const year = Number(params["year"]);
    const history = useHistory()
    const { hasPermission } = useCheckPerAccessApp({ appID: APP_ID.TIMESHEET.id })
    useEffect(() => {
      if (!hasPermission) {
        toast.error("Bạn không có quyền truy cập chức năng này");
        history.push("/")
      }
    }, [hasPermission])

    const { openModal, closeModal } = useModal();
    
    let yearFilter = new Date().getFullYear()
    if(year && !isNaN(year)){
        yearFilter = Number(year)
    }
    const items = [yearFilter-2, yearFilter-1, yearFilter, yearFilter+1];

    const { listByProperty } = useByProperty({
      params: {
          type,
          year: yearFilter
      },
      isFetchList: true
    })
    
    //_____Import, export excel
    const [, setStateExport] = useState<{ isExporting: boolean }>({
      isExporting: false,
    });

    const { exportExcelAsync } = useTimesheetCustom({});

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
                title="Bạn có muốn xác nhận không?"
                description= "Hệ thống sẽ tạo các bảng chấm công theo từng Cơ sở"
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
            `/api/timesheet/expert_timesheets/sync-data`, {
                option: param.option,
                year: param.year,
                month: param.month,
                // timesheetID: param.timesheetID,
            }
        )
        
        if (status !== 200 || data.error) {
            return toast.warn(data?.data?.message)
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
                <NavLink className="px-2 py-2" to={`/timesheet/${url}/${item}`} key={item}>
                  Năm {item}
                </NavLink>
              ))}
            </div>
            <span className="text-primary">Năm {yearFilter}</span>
          </div>
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
                  "px-2 py-2 table-cell box-border border-b text-gray-500"
                }
              >
                Tổng
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
                  "px-2 py-2 table-cell box-border border-b text-right text-gray-500"
                }
              >
                Tải dữ liệu
              </div>
            </div>
            {[1,2,3,4,5,6,7,8,9,10,11,12]?.map((item: any, index: any) => {

                let evenNumbers: any
                if(listByProperty && listByProperty.length){
                  evenNumbers = listByProperty.filter((num: any) => num._id.month == item);
                }

                return (
                  <div className={"body-table table-row"} key={item}>
                    <div
                      className={
                        "px-2 py-2 table-cell box-border border-b"
                      }
                    >
                        <NavLink to={`/timesheet/${url}/${yearFilter}/${item}`}>
                            Tháng {item}/{yearFilter}
                        </NavLink>
                    </div>
                    <div
                      className={
                        "px-2 py-2 table-cell box-border border-b text-right"
                      }
                    >
                      {(Array.isArray(evenNumbers) && evenNumbers[0]) ? convertCurrency(Number(evenNumbers[0].amount).toFixed(0)) : 0}
                    </div>
                    <div
                      className={
                        "px-2 py-2 table-cell box-border border-b text-right"
                      }
                    >
                      {(url.toString() === 'shift') ? <button className={"flex text-primary-gray items-center rounded hover:bg-cbs-form-input-bg px-3 h-[30px] mr-2"} onClick={() => toggleModalOpen({ year: yearFilter, month: item})}>
                          <img src={iconCreate} title={'Tạo bảng chấm công theo cơ sở'} className={"w-[24px] h-[24px]"} />
                          <span>Tạo bảng chấm công theo cơ sở</span>
                      </button> : <></>}
                    </div>
                    <div
                      className={
                        "px-2 py-2 table-cell box-border border-b text-right"
                      }
                    >
                      <button className={"ml-5 text-primary"} onClick={() => handleDownloadExcel({option: 2, year: yearFilter, month: item._id?.month})}>
                          Tải dữ liệu
                      </button>
                    </div>
                  </div>
                )
            }
            )}
          </div>
        </div>
      </div>
    );
};

export default TimesheetShiftPage;