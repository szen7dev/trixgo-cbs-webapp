import { ChangeEvent, FC, useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import moment from "moment";
import debounce from "lodash/debounce";

/**
 * Components
 */
import { SearchInput, GroupActions, ModalContainer } from "shareComponents/common";
import ModalCreateCashFlow from "./components/ModalCreateCashFlow";
import ModalUpdateCashFlow from "./components/ModalUpdateCashFlow";

/**
 * Utils
 */
import { FINANCIAL_PLANNING_STATUS } from "apis/localdb";

/**
 * Hooks
 */
import useCheckedList from "services/hooks/ppt/useCheckedList";
import { useCashFlowPlan } from "services/hooks/financial/useCashFlow";
import { convertCurrency } from "utils/converter";

export const AccountingCashFlowPage: FC = () => {
  const location = useLocation();
  const [cashFlowIdSelected, setCashFlowIdSelected] = useState("");
  const [modalShow, setModalShow] = useState({
    create: false,
    update: false,
  });
  const [keyword, setKeyword] = useState("");

  const {
    list: listCashFlowPlan,
    hasNextPage,
    refetch,
    fetchNextPage,
    totalRecord,
  } = useCashFlowPlan({
    params: {
      keyword,
      isCompanyOther: location.pathname === '/accounting/cashflow-other'
    },
    isFetchList: true,
  });

  const { assigned, handleChangeCheckbox, handleCheckAll, checkboxRef } =
    useCheckedList(listCashFlowPlan);

  useEffect(() => {
    const assignedEntries = Object.entries(assigned);
    if (!assignedEntries.length) return;

    const cashBookSelected = assignedEntries.filter(([_, value]) => value);

    if (cashBookSelected.length === 1) {
      setCashFlowIdSelected(cashBookSelected[0][0]);
    }
  }, [assigned]);

  const toggleModalCreateOrUpdate = (modalType: "create" | "update") => {
    setModalShow((prevValue) => ({
      ...prevValue,
      [modalType]: !modalShow[modalType],
    }));
  }

  return (
    <div className={"flex flex-col relative h-full"}>
      <div className={"flex items-center border-b py-2 px-6"}>
        <div className={"flex items-center flex-1"}>
          <div className={"text-lg"}>Ngân sách</div>
          <SearchInput
            classNameWrapper={"ml-4"}
            onChange={debounce(
              (e: ChangeEvent<HTMLInputElement>) => setKeyword(e.target.value),
              500
            )}
          />
          <div className={"w-4 border-gray-400 h-[16px]"} />
          <GroupActions
            className="flex items-center flex-1"
            onClickPencil={toggleModalCreateOrUpdate.bind(null, "update")}
            types={["edit"]}
            disabled={{
              pencil: Object.values(assigned).filter(Boolean).length !== 1,
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
              <th className="py-2.5 font-normal sticky top-0 border-b border-cbs-border px-2">
                TT
              </th>
              <th className="py-2.5 font-normal sticky top-0 border-b border-cbs-border px-2">
                Ngân sách
              </th>
              <th className="py-2.5 font-normal sticky top-0 border-b border-cbs-border px-2">
                Từ ngày
              </th>
              <th className="py-2.5 font-normal sticky top-0 border-b border-cbs-border px-2">
                Đến ngày
              </th>
              <th className="py-2.5 font-normal sticky top-0 border-b border-cbs-border px-2">
                Doanh thu kế hoạch
              </th>
              <th className="py-2.5 font-normal sticky top-0 border-b border-cbs-border px-2">
                Chi phí kế hoạch
              </th>
              <th className="py-2.5 font-normal sticky top-0 border-b border-cbs-border px-2">
                Doanh thu thực tế
              </th>
              <th className="py-2.5 font-normal sticky top-0 border-b border-cbs-border px-2">
                Chi phí thực tế
              </th>
              <th className="py-2.5 font-normal sticky top-0 border-b border-cbs-border px-2">
                Ghi chú
              </th>
              <th className="py-2.5 font-normal sticky top-0 border-b border-cbs-border px-2">
                Trạng thái
              </th>
            </tr>
          </thead>
          <tbody className="text-small">
            {(listCashFlowPlan && listCashFlowPlan.length) ?
              listCashFlowPlan.map((item) => (
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
                    <NavLink to={`/accounting/cashflow/${item._id}`}>{item.name}</NavLink>
                    <p className={"mt-1 text-gray-500"}>
                      {item.userCreate?.fullname}
                      {moment(item.createAt).format("DD/MM/YYYY HH:mm")}
                    </p>
                  </td>
                  <td className="pt-2.5 pb-3 px-2 border-b border-cbs-border">{moment(item.fromDate).format('DD/MM/YYYY HH:mm')}</td>
                  <td className="pt-2.5 pb-3 px-2 border-b border-cbs-border">{moment(item.toDate).format('DD/MM/YYYY HH:mm')}</td>
                  <td className="pt-2.5 pb-3 px-2 border-b border-cbs-border">
                    {convertCurrency(item.revenue)}
                  </td>
                  <td className="pt-2.5 pb-3 px-2 border-b border-cbs-border">
                    {convertCurrency(item.expense)}
                  </td>
                  <td className="pt-2.5 pb-3 px-2 border-b border-cbs-border">
                    {convertCurrency(item.actualRevenue)}
                  </td>
                  <td className="pt-2.5 pb-3 px-2 border-b border-cbs-border">
                    {convertCurrency(item.actualExpense)}
                  </td>
                  <td className="pt-2.5 pb-3 px-2 border-b border-cbs-border">{item.note}</td>
                  <td className="pt-2.5 pb-3 px-2 border-b border-cbs-border">{FINANCIAL_PLANNING_STATUS[Number(item.status) - 1].text}</td>
                </tr>
              )) : <></>}
          </tbody>
        </table>
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
      <ModalContainer
        isModalOpen={modalShow.create}
        toggle={toggleModalCreateOrUpdate.bind(null, "create")}
      >
        <div className="inline-flex flex-col text-black w-full max-w-3xl overflow-hidden text-left align-middle transition-all transform bg-primary-light rounded-xl">
          <ModalCreateCashFlow
            toggle={toggleModalCreateOrUpdate.bind(null, "create")}
            onConfirm={refetch}
          />
        </div>
      </ModalContainer>

      {/* Modal Update CashFlow */}
      <ModalContainer
        isModalOpen={modalShow.update}
        toggle={toggleModalCreateOrUpdate.bind(null, "update")}
      >
        <div className="inline-flex flex-col text-black w-full max-w-3xl overflow-hidden text-left align-middle transition-all transform bg-primary-light rounded-xl">
          <ModalUpdateCashFlow
            cashFlowId={cashFlowIdSelected}
            toggle={toggleModalCreateOrUpdate.bind(null, "update")}
            onConfirm={refetch}
          />
        </div>
      </ModalContainer>
    </div>
  );
};