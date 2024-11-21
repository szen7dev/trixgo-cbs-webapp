import React, { FC, useRef, useState, useEffect, useCallback } from "react";
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { APP_ID } from "apis/localdb";
import { toast } from "react-toastify";
import { useCheckPerAccessApp } from "services/hooks/auth/usePermissions";
import moment from "moment";
import debounce from "lodash/debounce";
import PaginateV2, { RefPaginateHandle } from "shareComponents/common/PaginateV2";
import { ModalConfirm } from "shareComponents/common";
import API from "apis/repository";
import iconRefresh from "assets/images/icons8-refresh.png";
import iconCopy from "assets/images/icons8-copy-96.svg";
import { convertCurrency } from "utils/converter";
import { useAuth } from "services/hooks/auth/useAuth";

import {
  SearchInput,
  DialogSalaryForm,
  ActionGroupButton2,
} from "views/timesheet/shareComponents/common";

import { useModal } from "services/hooks/useModal";
import { useDeleteConfirm } from "services/hooks/useDeleteConfirm";
import {
  useQueryListSalaryParent,
  useMutationSalaryParent,
} from "services/hooks/useSalary";
import { SALARY_RESET_PERMISSION } from "apis/localdb";

const DATE_FORMAT = "DD/MM/YYYY HH:mm";

const SalaryHomePage: FC = () => {
  const params = useParams<{ year: string, month: string }>();
  const year = Number(params["year"]);
  const month = Number(params["month"]);
  const { user } = useAuth();

  const history = useHistory()
  const { hasPermission } = useCheckPerAccessApp({ appID: APP_ID.TIMESHEET.id })
  useEffect(() => {
    if (!hasPermission) {
      toast.error("Bạn không có quyền truy cập chức năng này");
      history.push("/")
    }
  }, [hasPermission])

  const [recordSelected, toggleRecord] = React.useState<any>({});
  const [keyword, setKeyword] = React.useState("");
  const [pageIndex, setPageIndex] = useState(0);

  const ref = useRef<RefPaginateHandle>(null);

  const { openModal, closeModal } = useModal();
  const { openDeleteConfirm } = useDeleteConfirm();
  const {
    dataNotFilter,
    refetch: refreshListSalary,
    limit,
    totalPages,
    totalRecord,
    fetchNextPage,
    fetchPrevPage,
    loading,
    hasNextPage,
  } = useQueryListSalaryParent({ 
    keyword,
    year,
    month
  })

  const {
    onCreateSalaryParentAsync,
    onUpdateSalaryParentAsync,
    onDeleteSalaryParentAsync,
  } = useMutationSalaryParent();

  const handleCreateSalary = React.useCallback(
    async (values) => {
      try {
        const isCreated = await onCreateSalaryParentAsync(values);
        if (!isCreated.error) {
          refreshListSalary();
          closeModal();
          return null;
        } else {
          return toast.error(isCreated.data.message)
        }
      } catch (err) {
        return null;
      }
    },
    [closeModal, onCreateSalaryParentAsync, refreshListSalary]
  );

  const handleUpdateSalary = React.useCallback(
    async (values) => {

      try {
        const isUpdated = await onUpdateSalaryParentAsync(values);
        if (!isUpdated.error) {
          refreshListSalary();
          closeModal();
          return null;
        }
        throw new Error("Can not create!");
      } catch (err) {
        return null;
      }
    },
    [closeModal, onUpdateSalaryParentAsync, refreshListSalary]
  );

  const handleClickDeleteSalary = React.useCallback(
    (SalaryID) => {
      openDeleteConfirm({
        deleteAction: async () => {
          const res = await onDeleteSalaryParentAsync({
            expertSalaryID: SalaryID,
          });
          if (res.status === 200) {
            refreshListSalary();
          }
        },
      });
    },
    [onDeleteSalaryParentAsync, refreshListSalary, openDeleteConfirm]
  )

  const toggleModalOpenSign = (param: any) => {
    openModal(
      <div
        className={
          "inline-block w-[521px] h-[240px] my-8 overflow-hidden text-left align-middle transition-all transform bg-primary-light shadow-xl rounded"
        }
      >
        <ModalConfirm
          title="Bạn có muốn xác nhận Cập nhật/Đồng bộ không?"
          description= "Dữ liệu từ Bảng chấm công, KPI sẽ được đồng bộ sang Bảng lương này"
          onConfirm={() => handleConfirmSync({ option: param.option, salaryID: param.salaryID })}
          defaultText={false}
          onCancel={closeModal}
        />
      </div>
    )
  }

  const toggleModalOpenSignReset = (param: any) => {
    openModal(
      <div
        className={
          "inline-block w-[521px] h-[240px] my-8 overflow-hidden text-left align-middle transition-all transform bg-primary-light shadow-xl rounded"
        }
      >
        <ModalConfirm
          title="Bạn có muốn xác nhận Xóa không?"
          description= "Toàn bộ dữ liệu bảng lương này sẽ bị xóa và bạn không thể khôi phục"
          onConfirm={() => handleConfirmSync({ option: param.option, salaryID: param.salaryID })}
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
        salaryID: param.salaryID,
      }
    )
   
    if (status !== 200 || data.error) {
      return toast.warn('Đồng bộ thất bại')
    }

    refreshListSalary();
    return toast.success('Đồng bộ thành công')
  }, [])

  const currentYear = new Date().getFullYear()
  let yearFilter = new Date().getFullYear()
  if(year && !isNaN(year)){
      yearFilter = Number(year)
  }else{
      yearFilter = Number(currentYear)
  }
  const items = [currentYear-2, currentYear-1, currentYear, currentYear+1];

  let salary = 0, paid = 0, remaining = 0, human = 0
  if(dataNotFilter && dataNotFilter.length){
    for(const item of dataNotFilter[0]){
      salary = Number(salary) + Number(item?.salary + item?.onLeaveSalary + item?.overtimeSalary + item?.revenueBonus + item?.reward + item?.mealAllowance - item?.punishment - item?.insurance - item?.pitax - item?.union - item?.share - item?.other)
  
      paid = Number(paid) + Number(item?.paid + item?.advance)
  
      human = Number(human) + Number(item?.numberOfHuman)
    }
    remaining = Number(remaining) + Number(salary - paid)
  }

  return (
    <div className={"financial-cashflow-listing paginate-wrapper relative"}>
      <div
        className={
          "financial-cashflow-listing-heading flex items-center border-b py-2 px-6"
        }
      >
        <div className={"flex items-center flex-1"}>
          <SearchInput
            classNameWrapper={"ml-4"}
            onChange={debounce((e) => {
              setKeyword(e.target.value);
            }, 1000)}
          />
          {Object.keys(recordSelected).length > 1 && (
            <>
              <div className={"mr-3 w-4 border-r border-gray-400 h-[16px]"} />
              <ActionGroupButton2
                recordSelected={recordSelected}
                onUpdateSalary={handleUpdateSalary}
                onDeleteSalary={handleClickDeleteSalary}
              />
            </>
          )}
          
          <div>
            {items?.map((item: any, index: any) => (
              <NavLink className="mr-3 px-2 py-2" to={`/timesheet/salary/${item}`} key={item}>
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

        <PaginateV2
          ref={ref}
          totalRecord={totalRecord}
          totalPages={totalPages}
          hasNextPage={hasNextPage}
          limit={limit}
          isFetching={loading}
          nextPageAction={() => {
            setPageIndex((oldState) => oldState + 1);
            fetchNextPage();
          }}
          prevPageAction={() => {
            setPageIndex((oldState) => oldState - 1);
            fetchPrevPage();
          }}
        />
      </div>

      <div className={"financial-cashflow-table"}>
        <div className={"relative table border-collapse w-full"}>
          <div className={"header table-row sticky z-10"}>
            <div
              className={
                "px-2 py-2 table-cell box-border border-b align-middle w-3"
              }
            ></div>
            <div
              className={
                "px-2 py-2 table-cell box-border border-b align-middle text-gray-500"
              }
            >
              Nội dung
            </div>
            <div
              className={
                "px-2 py-2 table-cell box-border border-b align-middle text-gray-500"
              }
            >
              Số nhân sự
            </div>
            <div
              className={
                "px-2 py-2 table-cell box-border border-b align-middle text-gray-500"
              }
            >
              Ghi nhận lương
            </div>
            <div
              className={
                "px-2 py-2 table-cell box-border border-b align-middle text-gray-500"
              }
            >
              Đã trả
            </div>
            <div
              className={
                "px-2 py-2 table-cell box-border border-b align-middle text-gray-500"
              }
            >
              Còn lại
            </div>
            <div
              className={
                "px-2 py-2 table-cell box-border border-b align-middle text-gray-500"
              }
            >
              Ghi chú
            </div>
            <div
              className={
                "px-2 py-2 table-cell box-border border-b align-middle text-gray-500"
              }
            >
              Sao chép
            </div>
            <div
              className={
                "px-2 py-2 table-cell box-border border-b align-middle text-gray-500"
              }
            >
              Đồng bộ dữ liệu
            </div>
            <div
              className={
                "px-2 py-2 table-cell box-border border-b align-middle text-gray-500"
              }
            >
              Xóa dữ liệu
            </div>
          </div>
          {dataNotFilter[pageIndex] && dataNotFilter[pageIndex].map((item: any) => (
            <div className={"body-table table-row"} key={item._id}>
              <div
                className={
                  "px-2 py-2 table-cell box-border border-b align-middle w-3"
                }
              >
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="flexCheckDefault"
                  checked={recordSelected?._id === item._id}
                  onChange={(e) => {
                    if (e.target.checked) {
                      toggleRecord(item);
                      return null;
                    }
                    toggleRecord({});
                    return null;
                  }}
                />
              </div>
              <div
                className={
                  "px-2 py-2 table-cell box-border border-b align-middle"
                }
              >
                <NavLink to={`/timesheet/salary_detail/${item._id}`}>
                  {item.name}
                </NavLink>
                <p><i>{item?.type == 1 ? 'Khối quản lý' : 'Khối trực tiếp'} ({item?.type})</i></p>
                <p><i>Ngày ghi nhận:  {moment(item.date).format('DD/MM/YYYY')}</i></p>
                <p><i>Admin: {item.admins.length} | Member: {item.members.length}</i></p>
                <p className={"mt-1 text-gray-500"}>
                  Tạo: {item?.userCreate?.fullname} {moment(item.createAt).format(DATE_FORMAT)}
                </p>
                <p className={"mt-1 text-gray-500"}>
                  Cập nhật: {item?.userUpdate?.fullname} {moment(item.modifyAt).format(DATE_FORMAT)}
                </p>
              </div>
              <div className={"px-2 py-2 table-cell box-border border-b"}>
                {item.numberOfHuman}
              </div>
              <div
                className={
                  "px-2 py-2 table-cell box-border border-b text-right"
                }
              >
                {convertCurrency(Number(item?.salary + item?.onLeaveSalary + item?.overtimeSalary + item?.revenueBonus + item?.reward + item?.mealAllowance - item?.punishment - item?.insurance - item?.pitax - item?.union - item?.share - item?.other))}
              </div>
              <div
                className={
                  "px-2 py-2 table-cell box-border border-b text-right"
                }
              >
                {convertCurrency(Number(item?.paid + item?.advance))}
              </div>
              <div
                className={
                  "px-2 py-2 table-cell box-border border-b text-right"
                }
              >
                {convertCurrency(Number(item?.remaining))}
              </div>
              <div className={"px-2 py-2 table-cell box-border border-b"}>
                {item.note}
              </div>
              <div className={"px-2 py-2 table-cell box-border border-b"}>
                <button className={"flex text-primary-gray items-center rounded hover:bg-cbs-form-input-bg px-3 h-[30px] ml-2 mr-2"} onClick={() => toggleModalOpenSign({ option: 4, salaryID: item._id })}>
                  <img src={iconCopy} title={'Cập nhật dữ liệu'} className={"w-[24px] h-[24px] mr-3"} />
                  <span>Sao chép</span>
                </button>
              </div>
              <div className={"px-2 py-2 table-cell box-border border-b"}>
                <button className={"flex text-primary-gray items-center rounded hover:bg-cbs-form-input-bg px-3 h-[30px] ml-2 mr-2"} onClick={() => toggleModalOpenSign({ option: 2, salaryID: item._id })}>
                  <img src={iconRefresh} title={'Cập nhật dữ liệu'} className={"w-[24px] h-[24px] mr-3"} />
                  <span>Đồng bộ dữ liệu</span>
                </button>
              </div>
              <div className={"px-2 py-2 table-cell box-border border-b"}>
                <button className={"flex text-primary-gray items-center rounded hover:bg-cbs-form-input-bg px-3 h-[30px] ml-2 mr-2"} onClick={() => toggleModalOpenSignReset({ option: 3, salaryID: item._id })}>
                  <span style={{ "color": "red" }}>Xóa dữ liệu</span>
                </button>
              </div>
            </div>
          ))}

          <div className={"body-table table-row font-bold"}>
              <div
                className={
                  "px-2 py-2 table-cell box-border border-b align-middle w-3"
                }
              >
              </div>
              <div
                className={
                  "px-2 py-2 table-cell box-border border-b align-middle"
                }
              >
                Tổng
              </div>
              <div className={"px-2 py-2 table-cell box-border border-b"}>
                {convertCurrency(Number(human))}
              </div>
              <div
                className={
                  "px-2 py-2 table-cell box-border border-b text-right"
                }
              >
                {convertCurrency(Number(salary))}
              </div>
              <div
                className={
                  "px-2 py-2 table-cell box-border border-b text-right"
                }
              >
                {convertCurrency(Number(paid))}
              </div>
              <div
                className={
                  "px-2 py-2 table-cell box-border border-b text-right"
                }
              >
                {convertCurrency(Number(remaining))}
              </div>
              <div className={"px-2 py-2 table-cell box-border border-b"}>
              </div>
              <div className={"px-2 py-2 table-cell box-border border-b"}>
              </div>
              <div className={"px-2 py-2 table-cell box-border border-b"}>
              </div>
              <div className={"px-2 py-2 table-cell box-border border-b"}>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default SalaryHomePage;