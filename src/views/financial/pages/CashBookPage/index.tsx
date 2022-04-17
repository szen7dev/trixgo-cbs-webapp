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
  ButtonMore,
} from "shareComponents/common";
import { ModalContainer } from "shareComponents/common";
import { ModalCreateCashBook } from "./components";
import { TOAST_DEFAULT_OPTIONS } from 'utils/constants';

/**
 * Hooks
 */
import useCheckedList from "services/hooks/ppt/useCheckedList";
import { useCashBook } from 'services/hooks/financial/useCashBook';
import { CashBook } from "typings/financial/cashBook";

export const CashBookPage: FC = () => {
	const [keyword, setKeyword] = useState('');
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [visibleCreateModal, setVisibleCreateModal] = useState<boolean>(false);

  const {
    deleteManyAsync,
    list: listCashBooks,
    refetch,
    fetchNextPage,
    fetchPreviousPage,
    totalPage,
    totalRecord,
    hasNextPage
  } = useCashBook({
    params: {
      keyword,
      limit: 5,
    },
    isFetchList: true
  })

  const { assigned, handleChangeCheckbox, handleCheckAll, checkboxRef } = useCheckedList(listCashBooks);

  useEffect(() => {
    document.title = "Sổ quỹ công ty";
  }, []);

  const handleClickRow = (item: CashBook) => handleChangeCheckbox(undefined, item);
  const toggleDeleteModal = () => setIsShowDeleteModal(!isShowDeleteModal);
  const toggleCreateModal = () => setVisibleCreateModal(!visibleCreateModal);

  const handleConfirmCreate = () => refetch();

  const handleConfirmDelete = async () => {
    try {
      const ids = Object.entries(assigned).filter(([_, value]) => value).map(item => item[0]);
      const { error, data } = await deleteManyAsync({ cashBooksID: ids });

      if(error) {
        return toast.warn(data?.message);
      }

      if(data.length) {
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
    } finally{
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
          onClickPencil={() => ''}
          types={['trash', 'edit']}
          disabled={{
            pencil: Object.values(assigned).filter(Boolean).length !== 1,
            trash: !Object.values(assigned).some(value => value)
          }}
        />

        <ButtonCreate onClick={toggleCreateModal} />
        <ButtonMore />
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
            {(listCashBooks && listCashBooks.length) ?
              listCashBooks.map(item => (
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

      <Paginate
        className="min-h-24 w-full border-t z-10 flex items-center justify-center py-2 bg-white"
        totalPages={totalPage}
        totalRecord={totalRecord}
        hasNextPage={hasNextPage}
        prevPageAction={fetchPreviousPage}
        nextPageAction={fetchNextPage}
      />

      {/* Modal Create Cashbook */}
      <ModalContainer isModalOpen={visibleCreateModal} toggle={toggleCreateModal}>
        <div className="inline-flex flex-col text-black w-full max-w-3xl my-8 overflow-hidden text-left align-middle transition-all transform bg-primary-light rounded-xl">
          <ModalCreateCashBook toggle={toggleCreateModal} onConfirm={handleConfirmCreate} />
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