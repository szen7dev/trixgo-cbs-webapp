import { FC, ChangeEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import debounce from "lodash/debounce";
import moment from "moment";

/**
 * Components, Utils
 */
// import { DropdownFilterButton } from "views/document/sharedComponents/common";
import {
  Paginate,
  SearchInput,
  GroupActions,
  ButtonCreate,
  // ButtonMore,
} from "shareComponents/common";
import { ModalContainer } from "shareComponents/common";
import { ModalCreateCashBook, ModalUpdateCashBook } from "./components";
import { TOAST_DEFAULT_OPTIONS } from 'utils/constants';

/**
 * Hooks
 */
import useCheckedList from "services/hooks/ppt/useCheckedList";
import { useCashBook } from 'services/hooks/financial/useCashBook';
import { CashBook } from "typings/financial/cashBook";

export const CashBookPage: FC = () => {
  const [keyword, setKeyword] = useState('');
  const [cashBookIdSelected, setCashBookIdSelected] = useState('');
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [visibleCreateModal, setVisibleCreateModal] = useState<boolean>(false);
  const [visibleUpdateModal, setVisibleUpdateModal] = useState<boolean>(false);

  const {
    deleteManyAsync,
    list: listCashBook,
    refetch,
    fetchNextPage,
    totalRecord,
    hasNextPage
  } = useCashBook({
    params: {
      keyword,
      limit: 5,
    },
    isFetchList: true
  })

  const { assigned, handleChangeCheckbox, handleCheckAll, checkboxRef } = useCheckedList(listCashBook);

  useEffect(() => {
    document.title = "Sổ quỹ công ty";
  }, []);

  useEffect(() => {
    const assignedEntries = Object.entries(assigned);
    if (!assignedEntries.length) return;

    const cashBookSelected = assignedEntries.filter(([_, value]) => value);

    if (cashBookSelected.length === 1) {
      setCashBookIdSelected(cashBookSelected[0][0]);
    }
  }, [assigned])

  const handleClickRow = (item: CashBook) => handleChangeCheckbox(undefined, item);
  const toggleDeleteModal = () => setIsShowDeleteModal(!isShowDeleteModal);
  const toggleCreateModal = () => setVisibleCreateModal(!visibleCreateModal);
  const toggleUpdateModal = () => setVisibleUpdateModal(!visibleUpdateModal);

  const handleConfirmDelete = async () => {
    try {
      const ids = Object.entries(assigned).filter(([_, value]) => value).map(item => item[0]);
      const { error, data } = await deleteManyAsync({ cashBooksID: ids });

      if (error) {
        return toast.warn(data?.message);
      }

      if (data.length) {
        return data.map((item: any) => toast.warn(item.message));
      }

      refetch();
      toast.success('Xóa dữ liệu thành công', TOAST_DEFAULT_OPTIONS);
    } catch (error) {
      if (typeof error === "string") {
        toast.error(error, TOAST_DEFAULT_OPTIONS);
      } else if (error instanceof Error) {
        toast.error(error.message, TOAST_DEFAULT_OPTIONS);
      }
    } finally {
      toggleDeleteModal();
    }
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex flex-wrap items-center w-full px-4 gap-x-2 bg-white text-black border-b border-cbs-gray py-1">
        <span className="text-x-large mr-7">Sổ quỹ công ty</span>
        <SearchInput
          classNameWrapper="rounded-sm flex bg-cbs-left-menu"
          onChange={debounce(
            (e: ChangeEvent<HTMLInputElement>) => setKeyword(e.target.value),
            500
          )}
        />
        {/* <DropdownFilterButton /> */}
        <GroupActions
          className="flex items-center flex-1"
          onClickTrash={toggleDeleteModal}
          onClickPencil={toggleUpdateModal}
          types={['trash', 'edit']}
          disabled={{
            pencil: Object.values(assigned).filter(Boolean).length !== 1,
            trash: !Object.values(assigned).some(value => value)
          }}
        />

        <ButtonCreate onClick={toggleCreateModal} />
        {/* <ButtonMore /> */}
      </div>
      <div className="flex-1 overflow-y-auto">
        <table
          className="text-black text-medium border-separate space-x-0 space-y-0 w-full"
          style={{ borderSpacing: 0 }}
        >
          <thead className="">
            <tr className="text-primary-gray whitespace-nowrap align-middle text-left">
              <th className="px-4 py-2.5 font-normal bg-cbs-table-header sticky top-0 border-b border-cbs-border w-1">
                <input
                  className="cbs-checkbox"
                  type="checkbox"
                  value="all"
                  id="flexCheckDefault"
                  onClick={handleCheckAll}
                  ref={checkboxRef}
                />
              </th>
              <th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-b border-cbs-border">
                <span className="pl-2 border-l border-cbs-border">Nội dung</span>
              </th>
              <th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-b border-cbs-border">
                <span className="pl-2 border-l border-cbs-border">Số dư đầu kỳ</span>
              </th>
              <th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-b border-cbs-border">
                <span className="pl-2 border-l border-cbs-border">Phát sinh trong kỳ</span>
              </th>
              <th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-b border-cbs-border">
                <span className="pl-2 border-l border-cbs-border">Số dư cuối kỳ</span>
              </th>
              <th
                className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-b border-cbs-border"
                style={{ minWidth: "150px" }}
              >
                <span className="pl-2 border-l border-cbs-border">Khởi tạo</span>
              </th>
              <th
                className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-b border-cbs-border"
                style={{ minWidth: "150px" }}
              >
                <span className="pl-2 border-l border-cbs-border">Cập nhật lần cuối</span>
              </th>
              <th
                className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-b border-cbs-border"
                style={{ minWidth: "150px" }}
              >
                <span className="pl-2 border-l border-cbs-border">Người được truy cập</span>
              </th>
            </tr>
          </thead>
          <tbody className="text-small">
            {(listCashBook && listCashBook.length) ?
              listCashBook.map(item => (
                <tr
                  key={item._id}
                  className="text-left hover:bg-cbs-active-comment cursor-pointer"
                  onClick={handleClickRow.bind(this, item)}
                >
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
                    <Link
                      to={`/financial/cashbook/${item._id}`}
                      className="hover:text-cbs-primary"
                    >
                      {item.name}
                    </Link>
                  </td>
                  <td className="pt-2.5 pb-3 px-2 border-b border-cbs-border text-right">
                    {item.openingBalance.toLocaleString("en-US", {
                      maximumFractionDigits: 0,
                    })}
                  </td>
                  <td className="pt-2.5 pb-3 px-2 border-b border-cbs-border text-right">
                    {item.arising.toLocaleString("en-US", {
                      maximumFractionDigits: 0,
                    })}
                  </td>
                  <td className="pt-2.5 pb-3 px-2 border-b border-cbs-border text-right">
                    {item.closingBalance.toLocaleString("en-US", {
                      maximumFractionDigits: 0,
                    })}
                  </td>
                  <td className="pt-2.5 pb-3 px-2 border-b border-cbs-border">
                    {item.userCreate?.bizfullname}
                  </td>
                  <td className="pt-2.5 pb-3 px-2 border-b border-cbs-border">
                    {moment(item.modifyAt).format('HH:mm DD/MM/YY')}
                  </td>
                  <td className="pt-2.5 pb-3 px-2 border-b border-cbs-border">
                    <div className="flex">
                      {item.members?.slice(0, 2).map(member => (
                        <img
                          key={member._id}
                          src={`${process.env.REACT_APP_URL_S3_USER}/${member.image}`}
                          alt={member.bizfullname}
                          className="w-6 h-6 rounded-full"
                        />
                      ))}
                      {(item.members && item.members.length > 3) ? (
                        <div
                          className="h-6 w-6 rounded-full -ml-1.5 bg-cbs-border text-white flex justify-center items-center"
                          style={{ fontSize: "10px" }}
                        >
                          +{item.members.length - 3}
                        </div>
                      ) : ''}
                    </div>
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
              {`Xem thêm (${totalRecord - listCashBook.length})`}
            </span>
          </button>
        </div>
      )}

      {/* <Paginate
        className="min-h-24 w-full border-t z-10 flex items-center justify-center py-2 bg-white"
        totalPages={totalPage}
        totalRecord={totalRecord}
        hasNextPage={hasNextPage}
        prevPageAction={fetchPreviousPage}
        nextPageAction={fetchNextPage}
      /> */}

      {/* Modal Create Cashbook */}
      <ModalContainer isModalOpen={visibleCreateModal} toggle={toggleCreateModal}>
        <div className="inline-flex flex-col text-black w-full max-w-3xl my-8 overflow-hidden text-left align-middle transition-all transform bg-primary-light rounded-xl">
          <ModalCreateCashBook toggle={toggleCreateModal} onConfirm={refetch} />
        </div>
      </ModalContainer>
      {/* Modal Update Cashbook */}
      <ModalContainer isModalOpen={visibleUpdateModal} toggle={toggleUpdateModal}>
        <div className="inline-flex flex-col text-black w-full max-w-3xl my-8 overflow-hidden text-left align-middle transition-all transform bg-primary-light rounded-xl">
          <ModalUpdateCashBook
            toggle={toggleUpdateModal}
            onConfirm={refetch}
            cashBookID={cashBookIdSelected}
          />
        </div>
      </ModalContainer>
      {/* Modal confirm delete */}
      <ModalContainer isModalOpen={isShowDeleteModal} toggle={toggleDeleteModal}>
        <div className="inline-flex flex-col text-black w-full max-w-lg my-8 overflow-hidden text-left transition-all transform bg-white">
          <div className="p-5 mb-4">
            <span className="text-xl leading-6 font-bold"> Bạn có muốn xóa không? </span>
            <p className="mt-2 text-primary-gray">
              Dữ liệu của bạn sẽ bị xóa vĩnh viễn và bạn không thể khôi phục lại dữ liệu này
            </p>
          </div>
          <div className="text-right pt-6 pb-5 px-8 text-base leading-5 border-t border-gray-100">
            <button className="py-1.5 px-5 mr-2 uppercase" onClick={toggleDeleteModal}>
              Hủy
            </button>
            <button
              className="py-1.5 px-3 border border-primary bg-primary hover:bg-opacity-90 text-white rounded-md"
              onClick={handleConfirmDelete}
            >
              Xác nhận
            </button>
          </div>
        </div>
      </ModalContainer>
    </div>
  );
};