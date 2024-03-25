import { ChangeEvent, FC, useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import moment from "moment";
import debounce from "lodash/debounce";

/**
 * Components
 */
import { SearchInput, GroupActions, ModalContainer, ModalConfirm } from "shareComponents/common";
import ModalCreateBiddingPlan from "./components/ModalCreateBiddingPlan";
import ModalUpdateBiddingPlan from "./components/ModalUpdateBiddingPlan";
// import VerifyIcon from "assets/images/icons8-verified-check-circle-for-approved-valid-content-96.svg";
// import TriangleDown from "assets/icons/TriangleDown";
// import ThreeDotsVertical from "assets/images/icon-3dots-vertical.svg";
// import FinancialCashFlowFilterButton from "./components/CashFlowButtonFilter";
// import CashFlowActionGroup from "./components/CashFlowActionGroup";

/**
 * Utils
 */
import {
  BIDDING_PLAN_TYPE, BIDDING_PLAN_STATUS, BIDDING_PLAN_FORM,
  BIDDING_PLAN_CONTRACT_TYPE
} from "apis/localdb";
import { TOAST_DEFAULT_OPTIONS } from "utils/constants";

/**
 * Hooks
 */
import { useModal } from "services/hooks/useModal";
import useCheckedList from "services/hooks/ppt/useCheckedList";
import { convertCurrency } from "utils/converter";
import { useProject } from 'services/hooks/items/useProject';
import { useBiddingPlan } from "services/hooks/bidding/useBiddingPlan";

export const BiddingPlanPage: FC = () => {
  const { projectID } = useParams<{ projectID: string }>();
	const { info: projectInfo } = useProject({
		params: {
			departmentID: projectID
		},
		isFetchInfo: true
	})

  const { closeModal, openModal } = useModal();
  const [biddingPlanIdSelected, setbiddingPlanIdSelected] = useState("");
  const [modalShow, setModalShow] = useState({
    create: false,
    update: false,
  });

  const [keyword, setKeyword] = useState("");

  const {
    list: listBiddingPlan,
    hasNextPage,
    refetch,
    fetchNextPage,
    totalRecord,
  } = useBiddingPlan({
    params: {
      keyword,
      projectID
    },
    isFetchList: true,
  });

  const { assigned, handleChangeCheckbox, handleCheckAll, checkboxRef } =
    useCheckedList(listBiddingPlan);

  useEffect(() => {
    const assignedEntries = Object.entries(assigned);
    if (!assignedEntries.length) return;

    const cashBookSelected = assignedEntries.filter(([_, value]) => value);

    if (cashBookSelected.length === 1) {
      setbiddingPlanIdSelected(cashBookSelected[0][0]);
    }
  }, [assigned]);

  const toggleModalCreateOrUpdate = (modalType: "create" | "update") => {
    setModalShow((prevValue) => ({
      ...prevValue,
      [modalType]: !modalShow[modalType],
    }));
  };

  const toggleDeleteModal = () => {
    openModal(
      <div
        className={
          "inline-block w-[521px] h-[185px] my-8 overflow-hidden text-left align-middle transition-all transform bg-primary-light shadow-xl rounded"
        }
      >
        <ModalConfirm onConfirm={handleConfirmDelete} onCancel={closeModal} />
      </div>
    );
  };

  const handleConfirmDelete = async () => {
    toast.info("Tính năng này đang tạm đóng", TOAST_DEFAULT_OPTIONS);
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
  };

  return (
    <div className={"flex flex-col relative h-full"}>
      <div className={"flex items-center border-b py-2 px-6"}>
        <div className={"flex items-center flex-1"}>
          <div className={"text-lg"}>{projectInfo?.sign}.{projectInfo?.name}</div>
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
            onClickPencil={toggleModalCreateOrUpdate.bind(null, "update")}
            types={["trash", "edit"]}
            disabled={{
              pencil: Object.values(assigned).filter(Boolean).length !== 1,
              trash: !Object.values(assigned).some((value) => value),
            }}
          />
        </div>
        <button
          className={"bg-green-success h-[32px] text-white rounded px-5"}
          onClick={toggleModalCreateOrUpdate.bind(null, "create")}
        >
          Tạo mới
        </button>
      </div>
      <div className="flex-1 overflow-y-auto">
        <table className="text-black text-medium border-separate space-x-0 space-y-0 w-full border-spacing-0">
          <thead className="">
            <tr className="text-primary-gray whitespace-nowrap align-middle text-left">
              <th className="px-4 py-2.5 font-normal sticky top-0 border-b border-cbs-border w-1">
                <input
                  className="cbs-checkbox"
                  type="checkbox"
                  value="all"
                  onClick={handleCheckAll}
                  ref={checkboxRef}
                />
              </th>
              <th className="py-2.5 font-normal sticky top-0 border-b border-cbs-border px-2">
                Nội dung
              </th>
              <th className="py-2.5 font-normal sticky top-0 border-b border-cbs-border px-2">
                Phân loại
              </th>
              <th className="py-2.5 font-normal sticky top-0 border-b border-cbs-border px-2">
                Danh sách dự kiến
              </th>
              <th className="py-2.5 font-normal sticky top-0 border-b border-cbs-border px-2">
                KH bắt đầu
              </th>
              <th className="py-2.5 font-normal sticky top-0 border-b border-cbs-border px-2">
                KH kết thúc
              </th>
              <th className="py-2.5 font-normal sticky top-0 border-b border-cbs-border px-2">
                Hình thức
              </th>
              <th className="py-2.5 font-normal sticky top-0 border-b border-cbs-border px-2">
                Loại hợp đồng
              </th>
              <th className="py-2.5 font-normal sticky top-0 border-b border-cbs-border px-2">
                Tiến độ thực hiện
              </th>
              <th className="py-2.5 font-normal sticky top-0 border-b border-cbs-border px-2">
                Trạng thái
              </th>
              <th className="py-2.5 font-normal sticky top-0 border-b border-cbs-border px-2">
                Đơn vị trúng thầu
              </th>
            </tr>
          </thead>
          <tbody className="text-small">
            {(listBiddingPlan && listBiddingPlan.length) ?
              listBiddingPlan.map((item: any) => (
                <tr key={item._id} className="text-left hover:bg-cbs-active-comment cursor-pointer">
                  <td
                    className="pt-2.5 pb-3 px-2 border-b border-cbs-border text-center"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <input
                      className="cbs-checkbox"
                      type="checkbox"
                      value={item._id}
                      checked={Boolean(assigned[item._id])}
                      onChange={(e) => handleChangeCheckbox(e, item)}
                    />
                  </td>
                  <td
                    className="pt-2.5 pb-3 px-2 border-b border-cbs-border"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <NavLink to={`/bidding/plan/${projectID}/${item._id}`}>{item.name}</NavLink>
                    <p className={"mt-1 text-gray-500"}>
                      {item.userCreate?.bizfullname}
                      {moment(item.createAt).format("DD/MM/YYYY HH:mm")}
                    </p>
                  </td>
                  <td className="pt-2.5 pb-3 px-2 border-b border-cbs-border">
                    {BIDDING_PLAN_TYPE[item.type-1].text}
                  </td>
                  <td className="pt-2.5 pb-3 px-2 border-b border-cbs-border">
                    {convertCurrency(item.packagePrice)}
                  </td>
                  <td className="pt-2.5 pb-3 px-2 border-b border-cbs-border">
                    { moment(item.startTime).format("L")}
                  </td>
                  <td className="pt-2.5 pb-3 px-2 border-b border-cbs-border">
                    { moment(item.finishTime).format("L")}
                  </td>
                  <td className="pt-2.5 pb-3 px-2 border-b border-cbs-border">
                    {BIDDING_PLAN_FORM[item.form -1].text}
                  </td>
                  <td className="pt-2.5 pb-3 px-2 border-b border-cbs-border">
                    {BIDDING_PLAN_CONTRACT_TYPE[item.contractType -1].text}
                  </td>

                  <td className="pt-2.5 pb-3 px-2 border-b border-cbs-border">
                    {item.duration} Ngày
                  </td>
                  <td className="pt-2.5 pb-3 px-2 border-b border-cbs-border">
                    {BIDDING_PLAN_STATUS[item.status -1].text}
                  </td>
                  <td className="pt-2.5 pb-3 px-2 border-b border-cbs-border">
                    {item?.bidder?.name}
                  </td>
                </tr>
              )) : <></>}
          </tbody>
        </table>
      </div>

      {hasNextPage && (
        <div className="w-full flex justify-center my-5">
          <button onClick={fetchNextPage}>
            <span className="text-primary">
              {`Xem thêm (${totalRecord - listBiddingPlan.length})`}
            </span>
          </button>
        </div>
      )}

      {/* Modal Create bidding plan */}
      <ModalContainer
        isModalOpen={modalShow.create}
        toggle={toggleModalCreateOrUpdate.bind(null, "create")}
      >
        <div className="inline-flex flex-col text-black w-full max-w-3xl overflow-hidden text-left align-middle transition-all transform bg-primary-light rounded-xl">
          <ModalCreateBiddingPlan
            toggle={toggleModalCreateOrUpdate.bind(null, "create")}
            onConfirm={refetch}
            projectID={projectID}
          />
        </div>
      </ModalContainer>

      {/* Modal Update CashFlow */}
      <ModalContainer
        isModalOpen={modalShow.update}
        toggle={toggleModalCreateOrUpdate.bind(null, "update")}
      >
        <div className="inline-flex flex-col text-black w-full max-w-3xl overflow-hidden text-left align-middle transition-all transform bg-primary-light rounded-xl">
          <ModalUpdateBiddingPlan
            biddingPlanID={biddingPlanIdSelected}
            toggle={toggleModalCreateOrUpdate.bind(null, "update")}
            onConfirm={refetch}
          />
        </div>
      </ModalContainer>
    </div>
  );
};
