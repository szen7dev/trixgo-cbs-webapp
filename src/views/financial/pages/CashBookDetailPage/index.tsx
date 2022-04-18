import { UIEvent, FC, useEffect, useState, useCallback, ChangeEvent } from "react";
import { useParams, Link } from 'react-router-dom';
import { toast } from "react-toastify";
import debounce from "lodash/debounce";

/**
 * Components
 */
// import { DropdownFilterButton } from "views/document/sharedComponents/common";
import {
  Paginate,
  SearchInput,
  GroupActions,
  ButtonMore,
} from "shareComponents/common";
import ModalReport from "./components/ModalReport";
import RowTableInsertInline from "./components/RowTableInsertInline";
import RowTableUpdateInline from "./components/RowTableUpdateInline";
import { ModalContainer } from "shareComponents/common";
import { TOAST_DEFAULT_OPTIONS } from 'utils/constants';
import iconGraphReport from "assets/images/icons8-stop-graph-report-96.png";

/**
 * Hooks, Typings
 */
import { useCashBook } from 'services/hooks/financial/useCashBook';
import { useContract } from "services/hooks/items/useContract";
import { useContact } from "services/hooks/items/useContact";
import { useAccount } from "services/hooks/items/useAccount";
import { CashBook } from "typings/financial/cashBook";

export const CashBookDetailPage: FC = () => {
  const { cashbookId } = useParams<{ cashbookId: string }>();

  const [keyword, setKeyword] = useState('');
  const [keywordContract, setKeywordContract] = useState('');
  const [keywordContact, setKeywordContact] = useState('');
  const [keywordAccount, setKeywordAccount] = useState('');

  const [visibleDrawer, setVisibleDrawer] = useState<boolean>(false);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [showRowInsert, setShowRowInsert] = useState(true);
  const [itemsChecked, setItemsChecked] = useState<string[]>([]);
  const [dataCashBook, setDataCashBook] = useState<CashBook[]>([]);

  const { info: cashBookInfo } = useCashBook({
    params: { cashBookID: cashbookId },
    isFetchInfo: true
  })

  const {
    amountIncomeExpenseByParent,
    deleteManyAsync: deleteManyCashBookAsync,
    insertAsync: insertCashBookAsync,
    updateAsync: updateCashBookAsync,
    list: listCashBook,
    refetch,
    fetchNextPage,
    hasNextPage,
    totalRecord
  } = useCashBook({
    params: {
      parentID: cashbookId,
      keyword,
      sortKey: JSON.stringify(['date__-1', 'createAt__-1']),
      limit: 3
    },
    paramsAmountIncomeExpense: { parentID: cashbookId },
    isFetchList: !!cashbookId,
    isFetchAmountIncomeExpenseByParent: !!cashbookId
  })

  // Danh sách hợp đồng
  const {
    listContracts: listContract,
    hasNextPage: hasNextPageListContract,
    fetchNextPage: fetchNextPageListContract
  } = useContract({
    params: { keyword: keywordContract },
    isFetch: true
  })

  // Danh sách contact (mã khách)
  const {
    list: listContact,
    hasNextPage: hasNextPageListContact,
    fetchNextPage: fetchNextPageListContact
  } = useContact({
    params: { keyword: keywordContact },
    isFetchList: true
  })

  // Danh sách tài khoản
  const {
    list: listAccount,
    hasNextPage: hasNextPageListAccount,
    fetchNextPage: fetchNextPageListAccount
  } = useAccount({
    params: { keyword: keywordAccount },
    isFetchList: true
  })

  useEffect(() => {
    document.title = "Chi tiết sổ quỹ";
  }, []);

  useEffect(() => {
    if(!amountIncomeExpenseByParent) return;

    const currentInventory = amountIncomeExpenseByParent.income - amountIncomeExpenseByParent.expense;

    listCashBook.reverse();
    const currentPageInventory = listCashBook.reduce((prevValue, currValue) => (
      prevValue += (currValue.income - currValue.expense)
    ), 0);
    const previousPageInventory = (currentInventory - currentPageInventory) || 0;

    const inventories: number[] = [];
    const newListCashBook = listCashBook.map((cashBook, index) => {
      let previousInventory = 0;

      if (index === 0) {
        previousInventory = (previousPageInventory + cashBook.income) - cashBook.expense;
      } else {
        previousInventory = (inventories[index - 1] + cashBook.income) - cashBook.expense;
      }
      inventories[inventories.length] = previousInventory;

      return {
        ...cashBook,
        previousInventory
      }
    })

    setDataCashBook(newListCashBook);
  }, [cashbookId, listCashBook.length, amountIncomeExpenseByParent])

  const toggleVisible = () => setVisibleDrawer(!visibleDrawer);
  const toggleDeleteModal = () => setIsShowDeleteModal(!isShowDeleteModal);

  const onChangeSearch = debounce((event: ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  }, 500);

  const onChangeSearchContract = (keyword: string) => setKeywordContract(keyword);
  const onChangeSearchContact = (keyword: string) => setKeywordContact(keyword);
  const onChangeSearchAccount = (keyword: string) => setKeywordAccount(keyword);

  // Handle for checkbox each table row
  const handleChangeCheckbox = (ids: string[]) => setItemsChecked(ids);

  // Handle for checkbox all
  const getStateCheckboxAll = useCallback(() => {
    return itemsChecked.length === dataCashBook.length;
  }, [itemsChecked, dataCashBook]);

  const handleChangeCheckboxAll = (event: ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;

    if (isChecked) {
      const ids = dataCashBook.map(item => item._id);
      setItemsChecked(ids);
    } else {
      setItemsChecked([]);
    }
  }

  const handleScrollContract = (e: UIEvent<HTMLDivElement>) => {
    const { scrollHeight, scrollTop, clientHeight } = e.currentTarget;
    const bottom = scrollHeight - scrollTop === clientHeight;

    if (bottom && hasNextPageListContract) {
      fetchNextPageListContract();
    }
  }

  const handleScrollContact = (e: UIEvent<HTMLDivElement>) => {
    const { scrollHeight, scrollTop, clientHeight } = e.currentTarget;
    const bottom = scrollHeight - scrollTop === clientHeight;

    if (bottom && hasNextPageListContact) {
      fetchNextPageListContact();
    }
  }

  const handleScrollAccount = (e: UIEvent<HTMLDivElement>) => {
    const { scrollHeight, scrollTop, clientHeight } = e.currentTarget;
    const bottom = scrollHeight - scrollTop === clientHeight;

    if (bottom && hasNextPageListAccount) {
      fetchNextPageListAccount();
    }
  }

  const handleInsert = async (values: any) => {
    try {
      setShowRowInsert(false);

      const dataInsert = {
        parentID: cashbookId,
        date: new Date(),
        ...values
      };
      const { error, data } = await insertCashBookAsync(dataInsert);

      if (error) {
        return toast.warn(data?.message);
      }

      if (data.length) {
        return data.map((item: any) => toast.warn(item.message));
      }

      setDataCashBook(previous => ([
        ...previous,
        data,
      ]))
      toast.success('Tạo thành công');
    } catch (error) {
      if (typeof error === "string") {
        toast.error(error);
      } else if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setShowRowInsert(true);
    }
  }

  const handleUpdate = async (
    values: any,
    previousInventory?: number,
    callback?: (response: CashBook, previousInventory?: number) => void
  ) => {
    try {
      console.log({ values });
      const { error, data } = await updateCashBookAsync(values);

      if (error) {
        return toast.warn(data?.message);
      }

      if (data.length) {
        return data.map((item: any) => toast.warn(item.message));
      }

      callback && callback(data, previousInventory);
    } catch (error) {
      if (typeof error === "string") {
        toast.error(error);
      } else if (error instanceof Error) {
        toast.error(error.message);

      }
    }
  }

  const handleDelete = async () => {
    try {
      const { error, data } = await deleteManyCashBookAsync({
        cashBooksID: itemsChecked
      });

      if (error) {
        return toast.warn(data?.message);
      }

      if (data.length) {
        return data.map((item: any) => toast.warn(item.message));
      }

      toast.success('Xoá dữ liệu thành công', TOAST_DEFAULT_OPTIONS);
      refetch();
      setItemsChecked([]);
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
        <Link to={`/financial/cashbook`}>
          <img src="/images/common/button_back.png" alt="Button Back" />
        </Link>
        <span className="text-x-large mr-2 ml-2">{cashBookInfo?.name}</span>
        <SearchInput classNameWrapper="rounded-sm flex bg-cbs-left-menu" onChange={onChangeSearch} />
        {/* <DropdownFilterButton /> */}
        <button
          className="w-10 h-10 rounded-full flex justify-center items-center"
          onClick={toggleVisible}
        >
          <img src={iconGraphReport} alt="" />
        </button>
        <GroupActions
          className="flex items-center flex-1"
          onClickTrash={toggleDeleteModal}
          disabled={{
            trash: !itemsChecked.length
          }}
          types={[
            'trash',
          ]}
        />

        {/* <ButtonCreate onClick={toggleModal} /> */}
        {/* <ButtonMore /> */}
        {hasNextPage && (
          <div className="flex justify-center">
            <button onClick={fetchNextPage}>
              <span className="text-primary">
                {`Xem thêm (${totalRecord - listCashBook.length})`}
              </span>
            </button>
          </div>
        )}
      </div>
      <div className="flex-1 overflow-y-auto">
        <table
          className="text-black text-medium border-separate space-x-0 space-y-0 w-full"
          style={{ borderSpacing: 0 }}
        >
          <thead className="z-10 relative">
            <tr className="text-primary-gray whitespace-nowrap align-middle text-left">
              <th className="px-2 py-2.5 font-normal bg-cbs-table-header sticky top-0 border-0.5 border-cbs-border">
                <div className="flex items-center justify-center">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={getStateCheckboxAll()}
                    onChange={handleChangeCheckboxAll}
                  />
                </div>
              </th>
              <th className="px-2 py-2.5 font-normal bg-cbs-table-header sticky top-0 border-0.5 border-cbs-border">
                Ngày tháng
              </th>
              <th className="px-2 py-2.5 font-normal bg-cbs-table-header sticky top-0 border-0.5 border-cbs-border">
                Nội dung
              </th>
              <th className="px-2 py-2.5 font-normal bg-cbs-table-header sticky top-0 border-0.5 border-cbs-border">
                Tài khoản
              </th>
              <th className="px-2 py-2.5 font-normal bg-cbs-table-header sticky top-0 border-0.5 border-cbs-border">
                Mã khách
              </th>
              <th className="px-2 py-2.5 font-normal bg-cbs-table-header sticky top-0 border-0.5 border-cbs-border">
                Hợp đồng
              </th>
              <th className="px-2 py-2.5 font-normal bg-cbs-table-header sticky top-0 border-0.5 border-cbs-border">
                Thu
              </th>
              <th className="px-2 py-2.5 font-normal bg-cbs-table-header sticky top-0 border-0.5 border-cbs-border">
                Chi
              </th>
              <th className="px-2 py-2.5 font-normal bg-cbs-table-header sticky top-0 border-0.5 border-cbs-border">
                Tồn
              </th>
              <th className="px-2 py-2.5 font-normal bg-cbs-table-header sticky top-0 border-0.5 border-cbs-border">
                Mô tả/ghi chú
              </th>
            </tr>
          </thead>
          <tbody className="text-small">
            {(dataCashBook && dataCashBook.length) ? dataCashBook.map((item, index) => (
              <RowTableUpdateInline
                key={item._id}
                contracts={listContract}
                contacts={listContact}
                accounts={listAccount}
                cashBook={item}
                inventory={dataCashBook[index] && dataCashBook[index].previousInventory || 0}
                previousInventory={dataCashBook[index - 1] && dataCashBook[index - 1].previousInventory || 0}
                itemsChecked={itemsChecked}
                onChangeCheckbox={handleChangeCheckbox}
                onUpdate={handleUpdate}
                onScrollContract={handleScrollContract}
                onScrollContact={handleScrollContact}
                onScrollAccount={handleScrollAccount}
                onSearchContract={onChangeSearchContract}
                onSearchContact={onChangeSearchContact}
                onSearchAccount={onChangeSearchAccount}
              />
            )) : <></>}

            {showRowInsert && <RowTableInsertInline onInsert={handleInsert} />}

            {/* <tr key={id} className="text-left hover:bg-cbs-active-comment cursor-pointer">
              <td className="pt-2.5 pb-3 px-2 border-0.5 border-t-0 border-cbs-border text-center">
                {created_at}
              </td>
              <td className="pt-2.5 pb-3 px-2 border-0.5 border-t-0 border-cbs-border text-left">
                {content}
              </td>
              <td className="pb-3 px-2 border-0.5 border-t-0 border-cbs-border text-left">
                <DropdownSearchable
                  id="ticket-creator"
                  placeholder="Hợp đồng"
                  initialValue={{
                    id: "quangtt",
                    text: "1111-Tiền mặt tại quỹ công ty",
                  }}
                  data={[
                    {
                      id: "quangtt",
                      text: "1111-Tiền mặt tại quỹ công ty",
                    },
                    {
                      id: 2,
                      text: "1111-Tiền mặt tại quỹ công ty",
                    },
                  ]}
                />
              </td>
              <td className="pb-3 px-2 border-0.5 border-t-0 border-cbs-border text-left">
                <DropdownSearchable
                  id="ticket-creator"
                  placeholder="Công ty"
                  initialValue={{
                    id: "quangtt",
                    text: "Công ty TNHH Hoàng Mai Xanh và Tím",
                  }}
                  data={[
                    {
                      id: "quangtt",
                      text: "Công ty TNHH Hoàng Mai Xanh và Tím",
                    },
                    {
                      id: 2,
                      text: "Công ty TNHH Hoàng Mai Xanh và Tím",
                    },
                  ]}
                />
              </td>
              <td className="pb-3 px-2 border-0.5 border-t-0 border-cbs-border text-left">
                <DropdownSearchable
                  id="ticket-creator"
                  placeholder="Công ty"
                  initialValue={{
                    id: "quangtt",
                    text: "Cung cấp dịch vụ tư vấn chất lượng nhân sự",
                  }}
                  data={[
                    {
                      id: "quangtt",
                      text: "Cung cấp dịch vụ tư vấn chất lượng nhân sự",
                    },
                    {
                      id: 2,
                      text: "Cung cấp dịch vụ tư vấn chất lượng nhân sự",
                    },
                  ]}
                />
              </td>
              <td className="pt-2.5 pb-3 px-2 border-0.5 border-t-0 border-cbs-border text-right">
                {parseInt(opening_balance).toLocaleString("en-US", {
                  maximumFractionDigits: 0,
                })}
              </td>
              <td className="pt-2.5 pb-3 px-2 border-0.5 border-t-0 border-cbs-border text-right">
                {parseInt(increased_balance).toLocaleString("en-US", {
                  maximumFractionDigits: 0,
                })}
              </td>
              <td className="pt-2.5 pb-3 px-2 border-0.5 border-t-0 border-cbs-border text-right">
                {parseInt(closing_balance).toLocaleString("en-US", {
                  maximumFractionDigits: 0,
                })}
              </td>
              <td className="pt-2.5 pb-3 px-2 border-0.5 border-t-0 border-cbs-border text-left">
                Xây dựng mẫu BoQ cho công tác preliminaries
              </td>
            </tr> */}
          </tbody>
        </table>
      </div>

      {/* <Paginate
        className="min-h-24 w-full border-t z-10 flex items-center justify-center py-2 bg-white"
        totalPages={totalPage}
        totalRecord={totalRecord}
        hasNextPage={hasNextPage}
        prevPageAction={fetchPreviousPage}
        nextPageAction={fetchNextPage}
      /> */}

      <ModalReport open={visibleDrawer} onClose={setVisibleDrawer} />
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
              onClick={handleDelete}
            >
              Xác nhận
            </button>
          </div>
        </div>
      </ModalContainer>
    </div>
  );
};