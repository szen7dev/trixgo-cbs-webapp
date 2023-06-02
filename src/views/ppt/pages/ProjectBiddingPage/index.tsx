import React, { ChangeEvent, FC, useState, useEffect } from "react";
import { Link, NavLink, useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import moment from "moment";
import debounce from "lodash/debounce";

/**
 * Components
 */
import { SearchInput, GroupActions, ModalContainer, ModalConfirm, DropdownSearchableV2 } from "shareComponents/common";
// import ModalCreateBiddingPlan from "./components/ModalCreateBiddingPlan";
// import ModalUpdateBiddingPlan from "./components/ModalUpdateBiddingPlan";
import ModalCreateBiddingPlan from "../../../bidding/pages/BiddingPlanPage/components/ModalCreateBiddingPlan";
import ModalUpdateBiddingPlan from "../../../bidding/pages/BiddingPlanPage/components/ModalUpdateBiddingPlan";
import PaginateV2 from "shareComponents/common/PaginateV2";
import VerifyIcon from "../../../../assets/images/icons8-verified-check-circle-for-approved-valid-content-96.svg";
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
import { useDocumentPackage } from "services/hooks/document/useDocumentPackage";

import categoryIcon from "../../../../assets/images/icons8-category-48.svg";
import contractIcon from "../../../../assets/images/icons8-contract-64-blue.svg";
import downloadIcon from "../../../../assets/images/icons8-download-64.svg";
import iconPencil from "../../../../assets/images/icons8-pencil-96 1.png";
import nextIcon from "../../../../assets/images/icons-arrow-next.svg";
import userIcon from "../../../../assets/images/icons8-male-user-64.svg";
import customCheckbox from "../../../../assets/images/custom-checkbox.png";
import customCheckboxChecked from "../../../../assets/images/custom-checkbox-checked.png";

const ProjectBiddingPage: FC = () => {
  // Phân trang
  type PaginateHandle = React.ElementRef<typeof PaginateV2>;
  const ref = React.useRef<PaginateHandle>(null);
  const [pageIndex, setPageIndex] = React.useState(0);

  const location = useLocation();
  const { id: projectID } = useParams<{ id: string }>();
  const { info: projectInfo } = useProject({
    params: {
      departmentID: projectID
    },
    isFetchInfo: true
  })

  useEffect(() => {
    document.title = `${projectInfo.sign} | Lựa chọn nhà thầu`
  }, []);

  const { closeModal, openModal } = useModal();
  const [biddingPlanIdSelected, setbiddingPlanIdSelected] = useState("");
  const [modalShow, setModalShow] = useState({
    create: false,
    update: false,
  });
  const [keyword, setKeyword] = useState("");
  const {
    data: listBiddingPlan,
    listDocumentPackageWithPager,
    fetchNextPage,
    hasNextPage,
    totalRecord,
    totalPages,
    refetch,
    isFetching
  } = useDocumentPackage({
    // parentID: packageID,
    departmentID: projectID,
    isShowAll: "1",
    keyword,
    limit: "20"
  }, true, false);

  useEffect(() => {
    ref.current && ref.current.resetPaginate();
    setPageIndex(0);
  }, []);

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

  const ToggleCheckBox = () => {
    const [toggeleBox, setToggeleBox] = React.useState(false)
    return (
      <button onClick={() => setToggeleBox(!toggeleBox)}>
        {(toggeleBox ? <img src={customCheckboxChecked} /> : <img src={customCheckbox} />)}
      </button>
    )
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

  // console.log(listDocumentPackageWithPager)

  return (
    <div className={"flex flex-col relative h-full"}>
      <div className={"sticky top-0 z-10"}>
        <div className={"flex items-center px-4 py-2"}>
          {/* <div className={"flex items-center flex-1"}>
            <DropdownSearchableV2
              className={"mr-4 border border-primary-border rounded-lg mb-2"}
              placeholder={"Loại gói thầu"}
              prefixIcon={<img className={"mr-2"} src={userIcon} alt={"icon"} />}
              isMultiple={true}
              disableSearch={true}
              data={[]}
            />
            <DropdownSearchableV2
              className={"mr-4 border border-primary-border rounded-lg mb-2"}
              placeholder={"Hình thức"}
              prefixIcon={<img className={"mr-2"} src={categoryIcon} alt={"icon"} />}
              isMultiple={true}
              disableSearch={true}
              data={[]}
            />
            <DropdownSearchableV2
              className={"mr-4 border border-primary-border rounded-lg mb-2"}
              placeholder={"Loại hợp đồng"}
              prefixIcon={<img className={"mr-2"} src={contractIcon} alt={"icon"} />}
              isMultiple={true}
              disableSearch={true}
              data={[]}
            />
            <DropdownSearchableV2
              className={"mr-4 border border-primary-border rounded-lg mb-2"}
              placeholder={"Trạng thái"}
              prefixIcon={<img className={"mr-2"} src={categoryIcon} alt={"icon"} />}
              isMultiple={true}
              disableSearch={true}
              data={[]}
            />
          </div> */}
          {/* <button
            onClick={toggleModalCreateOrUpdate.bind(null, "create")}
            className={"h-[32px] rounded bg-cbs-green text-white font-bold px-4"}>
            Tạo mới
          </button> */}
        </div>
        <div className={"flex items-center pb-2"}>
          {/* <div className={"border-0.5 border-primary-border flex items-center"}>
            <div className="w-[300px] bg-cbs-gray h-5.5">
              <div className="bg-cbs-bg-light-blue-bar h-5.5 text-white text-center"
                style={{ width: "30%" }}>30%</div>
            </div>
          </div> */}
          <button className={"flex items-center justify-center mx-3 ml-6"}>
            <img src={downloadIcon} alt={"-----"} className={"w-[18px] h-[18px]"} />
          </button>
          {
            Object.values(assigned).filter(Boolean).length === 1 &&
            <button
              onClick={toggleModalCreateOrUpdate.bind(null, "update")}
              className={"flex items-center justify-center mx-3 ml-6"}>
              <img src={iconPencil} alt={"-----"} className={"w-[18px] h-[18px]"} />
            </button>
          }
          <div className={"flex-1 flex items-center justify-end"}>
            <PaginateV2
              ref={ref}
              totalRecord={totalRecord}
              totalPages={totalPages}
              limit={20}
              hasNextPage={hasNextPage}
              isFetching={isFetching}
              nextPageAction={() => {
                fetchNextPage();
                setPageIndex((oldState) => oldState + 1);
              }}
              prevPageAction={() => {
                setPageIndex((oldState) => oldState - 1);
              }}
            />
          </div>
          {/* <div className={"flex-1 flex items-center justify-end"}>
            <span className={"text-primary-gray"}>1-50 trong số 2.358</span>
            <button className={"w-[36px] h-[36px] rounded-full bg-cbs-left-menu mx-2 disabled:bg-transparent disabled:opacity-50 flex items-center justify-center"} disabled={true}>
              <img src={nextIcon} alt={"----"} className={"rotate-180"}/>
            </button>
            <button className={"w-[36px] h-[36px] rounded-full bg-cbs-left-menu mx-2 disabled:bg-transparent disabled:opacity-50 flex items-center justify-center"}>
              <img src={nextIcon} alt={"----"}/>
            </button>
          </div> */}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto pb-5">
        <table className="text-black text-medium border-separate border-spacing-0 space-x-0 space-y-0 w-full border-spacing-0">
          <thead className="sticky top-0">
            <tr className="border-0.5 border-cbs-border bg-cbs-table-header text-primary-gray whitespace-nowrap align-middle text-left">
              <th className="px-4 py-2.5 font-normal border-t-0.5 border-l-0.5 border-r-0.5 border-cbs-border w-1">
                <input
                  className="cbs-checkbox"
                  type="checkbox"
                  value="all"
                  onClick={handleCheckAll}
                  ref={checkboxRef}
                />
              </th>
              <th className="py-2.5 font-normal border-t-0.5 border-r-0.5 border-cbs-border px-1">
                Nội dung
              </th>
              <th className="py-2.5 font-normal border-t-0.5 border-r-0.5 border-cbs-border px-1">
                KH bắt đầu
              </th>
              <th className="py-2.5 font-normal border-t-0.5 border-r-0.5 border-cbs-border px-1">
                KH kết thúc
              </th>
              <th className="py-2.5 font-normal border-t-0.5 border-r-0.5 border-cbs-border px-1">
                Số ngày
              </th>
              <th className="py-2.5 font-normal border-t-0.5 border-r-0.5 border-cbs-border px-1">
                Ghi chú
              </th>
              <th className="py-2.5 font-normal border-t-0.5 border-r-0.5 border-cbs-border px-1" style={{ minWidth: "120px" }}>
                Trạng thái
              </th>
              {/* <th className="py-2.5 font-normal text-center border-t-0.5 border-r-0.5 border-cbs-border px-1" colSpan={9}>
                Tiến trình
              </th> */}
            </tr>
            {/* <tr className="border-0.5 border-cbs-border bg-cbs-table-header text-primary-gray whitespace-nowrap align-middle text-left">
              <th className="px-4 py-2.5 font-normal border-0.5 border-cbs-border w-1">
              </th>
              <th className="py-2.5 font-normal border-t-0.5 border-b-0.5 border-r-0.5 border-cbs-border px-1">
              </th>
              <th className="py-2.5 font-normal border-t-0.5 border-b-0.5 border-r-0.5 border-cbs-border px-1">
              </th>
              <th className="py-2.5 font-normal border-t-0.5 border-b-0.5 border-r-0.5 border-cbs-border px-1">
              </th>
              <th className="py-2.5 font-normal border-t-0.5 border-b-0.5 border-r-0.5 border-cbs-border px-1">
              </th>
              <th className="py-2.5 font-normal border-t-0.5 border-b-0.5 border-r-0.5 border-cbs-border px-1">
              </th>
              <th className="py-2.5 font-normal border-t-0.5 border-b-0.5 border-r-0.5 border-cbs-border px-1">
              </th>
              <th className="py-2.5 font-normal border-t-0.5 border-b-0.5 border-r-0.5 border-cbs-border px-1">
                Bước 1
              </th>
              <th className="py-2.5 font-normal border-t-0.5 border-b-0.5 border-r-0.5 border-cbs-border px-1">
                Bước 2
              </th>
              <th className="py-2.5 font-normal border-t-0.5 border-b-0.5 border-r-0.5 border-cbs-border px-1">
                Bước 3
              </th>
              <th className="py-2.5 font-normal border-t-0.5 border-b-0.5 border-r-0.5 border-cbs-border px-1">
                Bước 4
              </th>
              <th className="py-2.5 font-normal border-t-0.5 border-b-0.5 border-r-0.5 border-cbs-border px-1">
                Bước 5
              </th>
              <th className="py-2.5 font-normal border-t-0.5 border-b-0.5 border-r-0.5 border-cbs-border px-1">
                Bước 6
              </th>
              <th className="py-2.5 font-normal border-t-0.5 border-b-0.5 border-r-0.5 border-cbs-border px-1">
                Bước 7
              </th>
              <th className="py-2.5 font-normal border-t-0.5 border-b-0.5 border-r-0.5 border-cbs-border px-1">
                Bước 8
              </th>
              <th className="py-2.5 font-normal border-t-0.5 border-b-0.5 border-r-0.5 border-cbs-border px-1">
                Tổng %
              </th>
            </tr> */}
          </thead>
          <tbody className="text-small">
            {
              (listDocumentPackageWithPager[pageIndex] ?? []).map((item: any) => {
                console.log(item)
                return (
                  <tr key={item._id} className="text-left hover:bg-cbs-active-comment cursor-pointer">
                    <td
                      className="pt-2.5 pb-3 px-1 border-b-0.5 border-l-0.5 border-r-0.5 border-cbs-border text-center"
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
                      className="pt-2.5 pb-3 px-1 border-b-0.5 border-r-0.5 border-cbs-border"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <NavLink to={`#`}>
                        <div style={{lineHeight: "20px"}}>
                          {/* <span className="bg-cbs-orage text-white mr-1 py-1 px-3 rounded">Cao</span> */}
                          {item.name}
                        </div>
                        <p className={"mt-1 text-gray-500"}>
                          {item?.contractors?.length ? "Số đơn vị tham gia:" + item?.contractors?.length : ""}
                        </p>
                        <p>
                          {item?.bidder?.name ? "Đơn vị trúng thầu:" + item?.bidder?.name : ""}
                        </p>
                      </NavLink>
                      {/* {item.name} */}
                      {/* <p className={"mt-1 text-gray-500"}>
                        {item.userCreate?.bizfullname}
                        {moment(item.createAt).format("DD/MM/YYYY HH:mm")}
                      </p> */}
                      {/* <p className={"mt-1 text-gray-500"}>
                        {item?.contractors?.length ? "Số đơn vị tham gia:" + item?.contractors?.length : ""}
                      </p>
                      <p>
                        {item?.bidder?.name ? "Đơn vị trúng thầu:" + item?.bidder?.name : ""}
                      </p> */}
                    </td>
                    <td className="pt-2.5 pb-3 px-1 border-b-0.5 border-r-0.5 border-cbs-border">
                      {moment(item.startTime).format("L")}
                    </td>
                    <td className="pt-2.5 pb-3 px-1 border-b-0.5 border-r-0.5 border-cbs-border">
                      {moment(item.finishTime).format("L")}
                    </td>
                    <td className="pt-2.5 pb-3 px-1 border-b-0.5 border-r-0.5 border-cbs-border">
                      {moment.duration((moment(item.finishTime)).diff((moment(item.startTime)))).asDays()}
                    </td>
                    <td className="pt-2.5 pb-3 px-1 border-b-0.5 border-r-0.5 border-cbs-border">
                      {item.note}
                    </td>
                    <td className="pt-2.5 pb-3 px-1 border-b-0.5 border-r-0.5 border-cbs-border text-center">
                      <span className="text-white bg-cbs-inline-badge-blue rounded-full py-1 px-2"> {BIDDING_PLAN_STATUS[item.status - 1]?.text}
                      </span>
                    </td>
                    {/* <td className="pt-2.5 pb-3 px-1 border-b-0.5 border-r-0.5 border-cbs-border text-center">
                      <ToggleCheckBox />
                    </td>
                    <td className="pt-2.5 pb-3 px-1 border-b-0.5 border-r-0.5  border-cbs-border text-center">
                      <ToggleCheckBox />
                    </td>
                    <td className="pt-2.5 pb-3 px-1 border-b-0.5 border-r-0.5  border-cbs-border text-center">
                      <ToggleCheckBox />
                    </td>
                    <td className="pt-2.5 pb-3 px-1 border-b-0.5 border-r-0.5  border-cbs-border text-center">
                      <ToggleCheckBox />
                    </td>
                    <td className="pt-2.5 pb-3 px-1 border-b-0.5 border-r-0.5 border-cbs-border text-center">
                      <ToggleCheckBox />
                    </td>
                    <td className="pt-2.5 pb-3 px-1 border-b-0.5 border-r-0.5 border-cbs-border text-center">
                      <ToggleCheckBox />
                    </td>
                    <td className="pt-2.5 pb-3 px-1 border-b-0.5 border-r-0.5 border-cbs-border text-center">
                      <ToggleCheckBox />
                    </td>
                    <td className="pt-2.5 pb-3 px-1 border-b-0.5 border-r-0.5  border-cbs-border text-center">
                      <ToggleCheckBox />
                    </td>
                    <td className="pt-2.5 pb-3 px-1 border-b-0.5 border-r-0.5  border-cbs-border text-center">
                      {item?.percentOfCompletedPackage ? item?.percentOfCompletedPackage + "%" : ""}
                    </td> */}
                  </tr>
                )
              })
            }

          </tbody>
        </table>
      </div>

      {/* {hasNextPage && (
        <div className="w-full flex justify-center my-5">
          <button onClick={fetchNextPage}>
            <span className="text-primary">
              {`Xem thêm (${totalRecord - listBiddingPlan.length})`}
            </span>
          </button>
        </div>
      )} */}

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
export default ProjectBiddingPage;
