import { ChangeEvent, FC, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import moment from "moment";
import debounce from "lodash/debounce";

/**
 * Components
 */
import { SearchInput, GroupActions, ModalContainer, ModalConfirm } from "shareComponents/common";
import ModalCreateCashFlow from "./components/ModalCreateCashFlow";
import ModalUpdateCashFlow from "./components/ModalUpdateCashFlow";
import VerifyIcon from "assets/images/icons8-verified-check-circle-for-approved-valid-content-96.svg";
// import TriangleDown from "assets/icons/TriangleDown";
// import ThreeDotsVertical from "assets/images/icon-3dots-vertical.svg";
// import FinancialCashFlowFilterButton from "./components/CashFlowButtonFilter";
// import CashFlowActionGroup from "./components/CashFlowActionGroup";

/**
 * Utils
 */
import { FINANCIAL_PLANNING_TYPES } from 'apis/localdb';
import { TOAST_DEFAULT_OPTIONS } from "utils/constants";

/**
 * Hooks
 */
import { useModal } from "services/hooks/useModal";
import useCheckedList from "services/hooks/ppt/useCheckedList";
import { useCashFlowPlan } from "services/hooks/financial/useCashFlow";
import { convertCurrency } from "utils/converter";

export const CashFlowPage: FC = () => {
  const { closeModal, openModal } = useModal();
  const [cashFlowIdSelected, setCashFlowIdSelected] = useState('');
  const [modalShow, setModalShow] = useState({
    create: false,
    update: false
  });
  const [keyword, setKeyword] = useState('');

  const {
    list: listCashFlowPlan,
    hasNextPage,
    refetch,
    fetchNextPage,
    totalRecord
  } = useCashFlowPlan({
      params: { keyword },
      isFetchList: true
  });

  const { assigned, handleChangeCheckbox, handleCheckAll, checkboxRef } = useCheckedList(listCashFlowPlan);

  useEffect(() => {
    const assignedEntries = Object.entries(assigned);
    if (!assignedEntries.length) return;

    const cashBookSelected = assignedEntries.filter(([_, value]) => value);

    if (cashBookSelected.length === 1) {
      setCashFlowIdSelected(cashBookSelected[0][0]);
    }
  }, [assigned])

  const toggleModalCreateOrUpdate = (modalType: 'create' | 'update') => {
    setModalShow(prevValue => ({
      ...prevValue,
      [modalType]: !modalShow[modalType]
    }))
  }

  const toggleDeleteModal = () => {
    openModal(
      <div
          className={
              "inline-block w-[521px] h-[185px] my-8 overflow-hidden text-left align-middle transition-all transform bg-primary-light shadow-xl rounded"
          }
      >
        <ModalConfirm onConfirm={handleConfirmDelete} onCancel={closeModal} />
      </div>
  )
  }

  const handleConfirmDelete = async () => {
    toast.info('Tính năng này đang tạm đóng', TOAST_DEFAULT_OPTIONS);
    closeModal();
    // try {
    //   const ids = Object.entries(assigned).filter(([_, value]) => value).map(item => item[0]);
    //   const { error, data } = await deleteManyAsync({ cashFlowsID: ids });

    //   if (error) {
    //     return toast.warn(data?.message);
    //   }

    //   if (data.length) {
    //     return data.map((item: any) => toast.warn(item.message));
    //   }

    //   refetch();
    //   toast.success('Xóa dữ liệu thành công', TOAST_DEFAULT_OPTIONS);
    // } catch (error) {
    //   if (typeof error === "string") {
    //     toast.error(error, TOAST_DEFAULT_OPTIONS);
    //   } else if (error instanceof Error) {
    //     toast.error(error.message, TOAST_DEFAULT_OPTIONS);
    //   }
    // }
  }

  return (
    <div className={"financial-cashflow-listing paginate-wrapper relative"}>
      <div className={"financial-cashflow-listing-heading flex items-center border-b py-2 px-6"}>
        <div className={"flex items-center flex-1"}>
          <div className={"text-lg"}>Kế hoạch dòng tiền</div>
          <SearchInput
            classNameWrapper={"ml-4"}
            onChange={debounce(
              (e: ChangeEvent<HTMLInputElement>) => setKeyword(e.target.value),
              500
            )}
          />
          <div className={"mr-3 w-4 border-r border-gray-400 h-[16px]"} />
          <GroupActions
            className="flex items-center flex-1"
            onClickTrash={toggleDeleteModal}
            onClickPencil={toggleModalCreateOrUpdate.bind(null, 'update')}
            types={['trash', 'edit']}
            disabled={{
              pencil: Object.values(assigned).filter(Boolean).length !== 1,
              trash: !Object.values(assigned).some(value => value)
            }}
          />
        </div>
        <button
          className={"bg-green-success h-[32px] text-white rounded px-5"}
          onClick={toggleModalCreateOrUpdate.bind(null, 'create')}
        >
            Tạo mới
          </button>
      </div>
      <div className={"financial-cashflow-table"}>
        <div className={"relative table border-collapse w-full"}>
          <div className={"header flex table-row sticky z-10"}>
            <div className={"px-6 py-4 table-cell box-border border-b align-middle w-3"}>
              <div className={"flex items-center"}>
                <input
                  className="cbs-checkbox mr-2"
                  type="checkbox"
                  value="all"
                  onClick={handleCheckAll}
                  ref={checkboxRef}
                />
                {/* <TriangleDown /> */}
              </div>
            </div>
            <div className="px-2 py-4 table-cell box-border border-b align-middle w-2/12 text-gray-500">
              Nội dung
            </div>
            <div className={"px-2 py-4 table-cell box-border border-b align-middle text-gray-500"}>
              Phân loại
            </div>
            <div className={"px-2 py-4 table-cell box-border border-b align-middle text-gray-500"}>
              Dự án/phòng ban
            </div>
            <div className={"px-2 py-4 table-cell box-border border-b align-middle text-gray-500"}>
              Kế hoạch giải ngân
            </div>
            <div className={"px-2 py-4 table-cell box-border border-b align-middle text-gray-500"}>
              Thực tế giải ngân
            </div>
            <div className={"px-2 py-4 table-cell box-border border-b align-middle text-gray-500"}>
              Ghi chú
            </div>
            <div className={"px-2 py-4 table-cell box-border border-b align-middle text-gray-500"}>
              Trạng thái/Phê duyệt
            </div>
          </div>

          {(listCashFlowPlan && listCashFlowPlan.length) ? listCashFlowPlan.map(item => (
            <div key={item._id} className="body-table row table-row">
              <div className={"px-6 py-4 table-cell box-border border-b align-middle w-3"}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  value={item._id}
                  checked={Boolean(assigned[item._id])}
                  onChange={(e) => handleChangeCheckbox(e, item)}
                />
              </div>
              <div className={"px-2 py-4 table-cell box-border border-b align-middle w-2/12"}>
                <NavLink to={`/financial/cashflow/${item._id}`}>{item.name}</NavLink>
                <p className={"mt-1 text-gray-500"}>
                  {item.userCreate?.bizfullname}
                  {moment(item.createAt).format('DD/MM/YYYY HH:mm')}
                </p>
              </div>
              <div className={"px-2 py-4 table-cell box-border border-b"}>
                {item.type && FINANCIAL_PLANNING_TYPES[item.type - 1].text}
              </div>
              <div className={"px-2 py-4 table-cell box-border border-b"}>
                {item.project?.name}
              </div>
              <div className={"px-2 py-4 table-cell box-border border-b"}>
                {convertCurrency(item.value)}
              </div>
              <div className={"px-2 py-4 table-cell box-border border-b"}>
                {convertCurrency(item.realValue)}
              </div>
              <div className={"px-2 py-4 table-cell box-border border-b"}>
                {item.note}
              </div>
              <div className={"px-2 py-4 table-cell box-border border-b"}>
                {(item.approver && item.status === 2) ? (
                  <>
                    <div className={"flex items-center text-primary"}>
                      <span className={"mr-3"}>Đã phê duyệt</span>
                      <img src={VerifyIcon} alt={"icon"} />
                    </div>
                    <p className={"mt-1 text-gray-500"}>
                      {item.approver?.bizfullname}
                      {moment(item.timeApproved).format('DD/MM/YYYY HH:mm')}
                    </p>
                  </>
                ) : (
                  <div className={"flex items-center"}>
                    <span className={"mr-3"}>Chưa phê duyệt</span>
                  </div>
                )}
              </div>
            </div>
          )) : <></>}
          {/* <div className={"body-table row table-row"}>
            <div className={"px-6 py-4 table-cell box-border border-b align-middle w-3"}>
              <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
            </div>
            <div className={"px-2 py-4 table-cell box-border border-b align-middle w-2/12"}>
              <NavLink to={"/financial/cashflow/123"}>Kế hoạch dòng tiền T12.21</NavLink>
              <p className={"mt-1 text-gray-500"}>Phùng Thị Hà-PG 20/07/2021 15:26</p>
            </div>
            <div className={"px-2 py-4 table-cell box-border border-b"}>Loại 1</div>
            <div className={"px-2 py-4 table-cell box-border border-b"}>
              Tổ hợp chung cư cao cấp SH5-Public
            </div>
            <div className={"px-2 py-4 table-cell box-border border-b"}>34.125.000</div>
            <div className={"px-2 py-4 table-cell box-border border-b"}>34.125.000</div>
            <div className={"px-2 py-4 table-cell box-border border-b"}>
              Áp dụng cho toàn bộ hệ thống của CBSGroup
            </div>
            <div className={"px-2 py-4 table-cell box-border border-b"}>
              <div className={"flex items-center text-primary"}>
                <span className={"mr-3"}>Đã phê duyệt</span>
                <img src={VerifyIcon} alt={"icon"} />
              </div>
              <p className={"mt-1 text-gray-500"}>Nguyễn Hữu Hiệp-PG 12/12/2021 15:45</p>
            </div>
          </div> */}

        </div>
      </div>

      {hasNextPage && (
          <div className="w-full flex justify-center my-5">
              <button onClick={fetchNextPage}>
                  <span className="text-primary">
                      {`Xem thêm (${totalRecord - listCashFlowPlan.length})`}
                  </span>
              </button>
          </div>
      )}

      {/* Modal Create CashFlow */}
      <ModalContainer isModalOpen={modalShow.create} toggle={toggleModalCreateOrUpdate.bind(null, 'create')}>
        <div className="inline-flex flex-col text-black w-full max-w-3xl overflow-hidden text-left align-middle transition-all transform bg-primary-light rounded-xl">
          <ModalCreateCashFlow
            toggle={toggleModalCreateOrUpdate.bind(null, 'create')}
            onConfirm={refetch}
          />
        </div>
      </ModalContainer>

      {/* Modal Update CashFlow */}
      <ModalContainer isModalOpen={modalShow.update} toggle={toggleModalCreateOrUpdate.bind(null, 'update')}>
        <div className="inline-flex flex-col text-black w-full max-w-3xl overflow-hidden text-left align-middle transition-all transform bg-primary-light rounded-xl">
          <ModalUpdateCashFlow
            cashFlowId={cashFlowIdSelected}
            toggle={toggleModalCreateOrUpdate.bind(null, 'update')}
            onConfirm={refetch}
          />
        </div>
      </ModalContainer>
    </div>
  );
};