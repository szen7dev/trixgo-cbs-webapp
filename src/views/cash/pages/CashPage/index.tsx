import React, { FC, useRef, useState, useCallback } from "react";
import { NavLink } from "react-router-dom";
import moment from "moment";
import debounce from "lodash/debounce";
import PaginateV2, { RefPaginateHandle } from "shareComponents/common/PaginateV2";
import { CASH_OUTIN, STORE_TYPES } from "apis/localdb";
import { convertCurrency } from "utils/converter";
import { useModal } from "services/hooks/useModal";
import { toast } from "react-toastify";
import iconCopy from "assets/images/icons8-copy-96.svg";
import { ModalConfirm } from "shareComponents/common";
import {
    useQueryListStoreParent,
    useMutationStoreParent,
  } from "services/hooks/useStore";
import {
    SearchInput,
    DialogForm,
    ActionGroupButton,
} from "views/cash/shareComponents/common";
import { useContact } from "services/hooks/items/useContact";
import { useUserSystem } from 'services/hooks/users/useUserSystem';
import { DropdownSearchableV2 } from "shareComponents/common";
import { FilterDateGroup } from "views/accounting/shareComponents/common";
import { LIMIT_DROPDOWN } from "apis/localdb/index";
import {
	useQueryListWarehouse,
	// useQueryListContact,
	useQueryListContract,
	// useQueryListBudgetWork,
	// useQueryListAccount,
	// useQueryListGood
} from "services/hooks/cmcs/useContractIncome";
import { useQueryListDepartments } from "services/hooks/items/useDepartment";
import { useLocation } from "react-router-dom";
import fileIcon from "assets/images/icons8-attach.svg";
import API from "apis/repository";

const DATE_FORMAT = "DD/MM/YYYY HH:mm";
interface StoreHomePageProps {
    outin?: number
    type?: number
}

export const CashPage: FC<StoreHomePageProps> = ({ outin, type }) => {
  const location = useLocation();
  const { pathname: currentPathname } = location;
  
  type PaginateHandle = React.ElementRef<typeof PaginateV2>;
  type DropdownHandle = React.ElementRef<typeof DropdownSearchableV2>;
  const ref = React.useRef<PaginateHandle>(null);
  const accountRef = React.useRef<DropdownHandle>(null);

  const [recordSelected, toggleRecord] = React.useState<any>({});
  const [keyword, setKeyword] = React.useState("");
  const [pageIndex, setPageIndex] = useState(0);

  const [userID, setUserID] = useState<string | null>();
  const [projectID, setProjectID] = useState<string | null>();
  const [warehouseID, setWarehouseID] = useState<string | null>();
  const [customerID, setCustomerID] = useState<string | null>();

  const { openModal, closeModal } = useModal();

	// const today = new Date();
	// const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth()+1, 0);
	// const currentMonth = new Date().getMonth()
  // const [inputFilter, setInputFilter] = useState({
	//   // fromDate: new Date(new Date().getFullYear(), currentMonth, 1),
	//   // toDate: lastDayOfMonth,
  //   fromDate: new Date(new Date().getFullYear(), 0, 1),
  //   toDate: new Date(new Date().getFullYear(), 11, 31)
	// })

  // Danh sách mẩu tin
  const {
    dataNotFilter,
    refetch: refreshListStore,
    totalPages,
    totalRecord,
    fetchNextPage,
    fetchPrevPage,
    limit,
    loading,
    hasNextPage,
  } = useQueryListStoreParent({
    projectID,
    warehouseID,
    customerID,
    userCreateID: userID,
    keyword, 
    outin, 
    type, 
    sortOption: 2,
    // fromDate: inputFilter.fromDate,
    // toDate: inputFilter.toDate,
  })

  const [userKeyword, setUserKeyword] = useState("");  
  const [projectKeyword, setProjectKeyword] = useState("");
  const [contractKeyword, setContractKeyword] = useState("");
  const [contactKeyword, setContactKeyword] = useState("");

  const { list: listCustomer } = useContact({
    params: { keyword: contactKeyword, limit: 10 },
    isFetchList: true
  })

  const { data: listUser } = useUserSystem({
    keyword: userKeyword,
    limit: 10,
    isFetch: true
  }, true)

  const { listDepartments } = useQueryListDepartments({
    keyword: projectKeyword,
  }, true);

	const { listContract } = useQueryListContract({
		limit: LIMIT_DROPDOWN,
		keyword: contractKeyword,
	});

  const {
    onCreateStoreParentAsync,
    onUpdateStoreParentAsync,
  } = useMutationStoreParent();

  const handleCreateStore = React.useCallback(
    async (values) => {
      try {
        const isCreated = await onCreateStoreParentAsync(values);
        if (!isCreated.error) {
          toast.success('Khởi tạo thành công');
          refreshListStore();
          closeModal();
          return null;
        }
        toast.error(isCreated?.data?.message);
        throw new Error("Can not create!");
      } catch (err) {
        return null;
      }
    },
    [closeModal, onCreateStoreParentAsync, refreshListStore]
  );

  const handleUpdateStore = React.useCallback(
    async (values) => {
      try {
        const isUpdated = await onUpdateStoreParentAsync(values);
        if (!isUpdated.error) {
          toast.success('Cập nhật thành công');
          refreshListStore();
          closeModal();
          return null;
        }
        toast.error(isUpdated?.data?.message);
        throw new Error("Can not update!");
      } catch (err) {
        return null;
      }
    },
    [closeModal, onUpdateStoreParentAsync, refreshListStore]
  );

  // const handleOnChangeDate = useCallback((date, input) => {
  //   if (input) {
  //     setInputFilter((value) => ({ ...value, toDate: date }))
  //   } else {
  //     setInputFilter((value) => ({ ...value, fromDate: date }))
  //   }
  //   }, [])
  
  const toggleModalCopy = (param: any) => {
    openModal(
      <div
        className={
          "inline-block w-[521px] h-[240px] my-8 overflow-hidden text-left align-middle transition-all transform bg-primary-light shadow-xl rounded"
        }
      >
        <ModalConfirm
          title="Bạn có muốn xác nhận Copy phiếu không"
          description= "Dữ liệu phiếu cũ sẽ được Copy sang phiếu mới"
          onConfirm={() => handleConfirmSync({ option: param.option, orderID: param.orderID })}
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
        orderID: param.orderID,
      }
    )
   
    if (status !== 200 || data.error) {
      return toast.warn('Đồng bộ thất bại')
    }

    refreshListStore();
    return toast.success('Đồng bộ thành công')
  }, [])

  return (
    <div className={"financial-cashflow-listing paginate-wrapper relative"}>
      <div
        className={
          "financial-cashflow-listing-heading flex items-center border-b py-2 px-2"
        }
      >
        <div className={"filter-bar flex flex-wrap px-4 py-1"}>
            <SearchInput
              classNameWrapper={"mr-2"}
              onChange={debounce((e) => {
                setKeyword(e.target.value);
              }, 1000)}
            />
            <DropdownSearchableV2
                ref={accountRef}
                className={"mr-1 border border-primary-border rounded-lg"}
                placeholder={"Dự án"}
                isMultiple={false}
                allowClearValueSingleInput={true}
                data={listDepartments.map((item: any) => ({
                  _id: item._id,
                  name: `${item.sign}.${item.name}`,
                }))}
                formatItem={{
                    id: "_id",
                    text: "name",
                }}
                onSearchInputChange={debounce(
                    (valueSearch) => setProjectKeyword(valueSearch),
                    500
                )}
                onClearData={() => {
                  setProjectID("");
                }}
                onchangeValue={item => {
                  setProjectID(item._id);
                    setPageIndex(0);
                    ref.current&&ref.current.resetPaginate();
                }}
                renderItem={(item) => (
                    <p className={"min-w-[300px]"}>{item.text}</p>
                )}
                selectOneByOne={true}
            />
            <DropdownSearchableV2
              ref={accountRef}
              className={"mr-1 border border-primary-border rounded-lg"}
              placeholder={"Mã khách"}
              isMultiple={false}
              allowClearValueSingleInput={true}
              data={listCustomer.map((item: any) => ({
                _id: item._id,
                name: `${item.name}.${item.phone}.${item.taxid}`,
              }))}
              formatItem={{
                  id: "_id",
                  text: "name",
              }}
              onSearchInputChange={debounce(
                  (valueSearch) => setContactKeyword(valueSearch),
                  500
              )}
              onClearData={() => {
                setCustomerID("");
              }}
              onchangeValue={item => {
                  setCustomerID(item._id);
                  setPageIndex(0);
                  ref.current&&ref.current.resetPaginate();
              }}
              renderItem={(item) => (
                  <p className={"min-w-[300px]"}>{item.text}</p>
              )}
              selectOneByOne={true}
          />
          <DropdownSearchableV2
              ref={accountRef}
              className={"mr-1 border border-primary-border rounded-lg"}
              placeholder={"Hợp đồng"}
              isMultiple={false}
              allowClearValueSingleInput={true}
              data={listContract}
              formatItem={{
                  id: "_id",
                  text: "name",
              }}
              onSearchInputChange={debounce(
                  (valueSearch) => setContractKeyword(valueSearch),
                  500
              )}
              onClearData={() => {
                setWarehouseID("");
              }}
              onchangeValue={item => {
                setWarehouseID(item._id);
                  setPageIndex(0);
                  ref.current&&ref.current.resetPaginate();
              }}
              renderItem={(item) => (
                  <p className={"min-w-[300px]"}>{item.text}</p>
              )}
              selectOneByOne={true}
          />
          <DropdownSearchableV2
              ref={accountRef}
              className={"mr-1 border border-primary-border rounded-lg"}
              placeholder={"Người tạo"}
              isMultiple={false}
              allowClearValueSingleInput={true}
              data={listUser}
              formatItem={{
                  id: "_id",
                  text: "fullname",
              }}
              onSearchInputChange={debounce(
                  (valueSearch) => setUserKeyword(valueSearch),
                  500
              )}
              onClearData={() => {
                setUserID("");
              }}
              onchangeValue={item => {
                  setUserID(item._id);
                  setPageIndex(0);
                  ref.current&&ref.current.resetPaginate();
              }}
              renderItem={(item) => (
                  <p className={"min-w-[300px]"}>{item.text}</p>
              )}
              selectOneByOne={true}
          />
          {/* <FilterDateGroup fromDate={inputFilter.fromDate} endDate={inputFilter.toDate} onChangeDate={handleOnChangeDate} /> */}
          
          {Object.keys(recordSelected).length > 1 && (
            <>
              <div className={"mr-3 w-4 border-r border-gray-400 h-[16px]"} />
              <ActionGroupButton
                recordSelected={recordSelected}
                onUpdateStore={handleUpdateStore}
              />
            </>
          )}
        </div>
        <button
          className={"bg-green-success h-[32px] text-white rounded px-5"}
          onClick={() =>
            openModal(
              <div className="t-main-search text-left transition-all transform bg-primary-light shadow-xl rounded my-20 align-top inline-block">
                <DialogForm
                  title="Tạo mới"
                  onSubmit={handleCreateStore}
                  outin={Number(outin)}
                  type={Number(type)}
                  fundaName={""}
                  projectName={""}
                  assigneeName={""}
                  warehouseName={""}
                  customerName={""}
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
          limit={limit}
          hasNextPage={hasNextPage}
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
        <div className={"table border-collapse w-full"}>
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
              style={{ width: "80px" }}
            >
              Ngày
            </div>
            <div
              className={
                "px-2 py-2 table-cell box-border border-b align-middle text-gray-500 w-1/6"
              }
            >
              Nội dung
            </div>
            <div
              className={
                "px-2 py-2 table-cell box-border border-b align-middle text-gray-500"
              }
            >
              Số phiếu
            </div>
            <div
              className={
                "px-2 py-2 table-cell box-border border-b align-middle text-gray-500"
              }
            >
              Phân loại
            </div>
            <div
              className={
                "px-2 py-2 table-cell box-border border-b align-middle text-gray-500"
              }
            >
              Dự án/phòng ban
            </div>
            <div
              className={
                "px-2 py-2 table-cell box-border border-b align-middle text-gray-500"
              }
            >
              Mã khách
            </div>
            <div
              className={
                "px-2 py-2 table-cell box-border border-b align-middle text-gray-500"
              }
            >
              Hợp đồng
            </div>
            <div
              className={
                "px-2 py-2 table-cell box-border border-b align-middle text-gray-500"
              }
            >
              Giá trị
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
            ></div>
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
              <div className={"px-2 py-2 table-cell box-border border-b"}>
                {moment(item.date).format('DD/MM/YYYY')}
              </div>
              <div
                className={
                  "px-1 py-2 table-cell box-border border-b align-middle"
                }
              >
                {Number(item.status) == 6 ? <div className="relative z-5 inline-block -translate-y-1"><button className="text-[10px] text-white rounded px-1 py-0.5 mx-1 bg-red-400">Phiếu hủy</button></div> : <></>}
                <NavLink to={`${currentPathname}/${item._id}`} className="text-cbs-highlight-color font-bold text-medium">
                  {item.name}
                  {item?.files?.length ? <span className="text-gray-500"><img src={fileIcon} alt="" className="h-6 w-6 px-1 inline"/>({item?.files?.length})</span> : <></>}
                </NavLink>
                <p className={"mt-1 text-gray-500"}>
                  {item?.userCreate?.fullname} {moment(item.createAt).format(DATE_FORMAT)}
                </p>
                <p className={"mt-1 text-gray-500"}>
                  {item?.userUpdate?.fullname} {moment(item.modifyAt).format(DATE_FORMAT)}
                </p>
              </div>
              <div className={"px-2 py-2 table-cell box-border border-b"}>
                {item.sign}
              </div>
              <div className={"px-2 py-2 table-cell box-border border-b"}>
                {CASH_OUTIN[Number(item.outin - 1)].text}
                <p>{STORE_TYPES[Number(item.type - 1)].text}</p>
              </div>
              <div className={"px-2 py-2 table-cell box-border border-b"}>
                {item?.project?.name}
                <p className="text-gray-500"><i>{item?.funda?.name}</i></p>
              </div>
              <div className={"px-2 py-2 table-cell box-border border-b"}>
                {item?.customer?.name}
              </div>
              <div className={"px-2 py-2 table-cell box-border border-b"}>
                {item?.contract?.name}
              </div>
              <div
                className={
                  "px-2 py-2 table-cell box-border border-b text-right text-cbs-highlight-color font-bold text-medium"
                }
              >
                {convertCurrency(Number(item?.amount).toFixed(0))}
              </div>
              <div className={"px-2 py-2 table-cell box-border border-b"}>
                {item.note}
              </div>
              <div className={"px-2 py-2 table-cell box-border border-b"}>
                <button className={"flex text-primary-gray items-center rounded hover:bg-cbs-form-input-bg px-3 h-[30px] ml-2 mr-2"} onClick={() => toggleModalCopy({ option: 5, orderID: item?._id })}>
                  <img src={iconCopy} title={'Cập nhật dữ liệu'} className={"w-[24px] h-[24px] mr-3"} />
                  <span>Sao chép</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}