import { UIEvent, FC, useEffect, useState, useCallback, ChangeEvent } from "react";
import { useParams, Link, useHistory } from 'react-router-dom';
import { toast } from "react-toastify";
import debounce from "lodash/debounce";

/**
 * Components
 */
// import { DropdownFilterButton } from "views/document/sharedComponents/common";
import {
  SearchInput,
  GroupActions,
  ModalContainer,
  Loader,
} from "shareComponents/common";
import { CustomAutoComplete } from "shareComponents/common/Form/CustomForm";
import ModalLarge from "shareComponents/common/ModalContainer/components/ModalLarge";

import { AccessingUsers } from "../../sharedComponents/common";
import ModalReport from "./components/ModalReport";
import RowTableInsertInline from "./components/RowTableInsertInline";
import RowTableUpdateInline from "./components/RowTableUpdateInline";
import RowTableView from "./components/RowTableView";
import ModalShare from "./components/ModalShare";

/**
 * Utils
 */
import { TOAST_DEFAULT_OPTIONS } from 'utils/constants';
import iconGraphReport from "assets/images/icons8-stop-graph-report-96.png";
// import SortingIcon from "assets/images/icons8-sorting-100.svg";

/**
 * Hooks, Typings
 */
import { useCashBook, useCashBookCustom } from 'services/hooks/financial/useCashBook';
import { useContract } from "services/hooks/items/useContract";
import { useContact } from "services/hooks/items/useContact";
import { useAccount } from "services/hooks/items/useAccount";
import { useAuth } from "services/hooks/auth/useAuth";
import { CashBook } from "typings/financial/cashBook";
import { User } from "typings/user";

export const CashBookDetailPage: FC = () => {
  const { cashbookId } = useParams<{ cashbookId: string }>();
  const history = useHistory();

  const [keyword, setKeyword] = useState('');
  const [keywordContract, setKeywordContract] = useState('');
  const [keywordContact, setKeywordContact] = useState('');
  const [keywordAccount, setKeywordAccount] = useState('');
  const [keywordAccountSearch, setKeywordAccountSearch] = useState('');

  const [accountSearchSelected, setAccountSearchSelected] = useState('');

  const [visibleDrawer, setVisibleDrawer] = useState<boolean>(false);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [showRowInsert, setShowRowInsert] = useState(true);
  const [itemsChecked, setItemsChecked] = useState<string[]>([]);
  const [dataCashBook, setDataCashBook] = useState<CashBook[]>([]);
  const [permissions, setPermissions] = useState<{
    usersShared: User[];
    onlyView: boolean;
    hasPermissionCreateUpdate: boolean;
    hasPermissionDelete: boolean;
    hasPermissionShare: boolean;
  }>({
    usersShared: [],
    onlyView: true,
    hasPermissionCreateUpdate: false,
    hasPermissionDelete: false,
    hasPermissionShare: false,
  });

  const [modalShare, setModalShare] = useState<{ isShow: boolean, users: User[] | undefined, modalType: 'members' | 'admins' }>({
    isShow: false,
    users: [],
    modalType: 'members'
  });

  const { user } = useAuth();

  const { info: cashBookInfo, isLoadingInfo, refetchInfo } = useCashBook({
    params: {
      cashBookID: cashbookId,
      populates: JSON.stringify({
        path: 'admins members userCreate',
        select: '_id bizfullname image'
      })
    },
    isFetchInfo: true
  })

  const {
    deleteManyAsync: deleteManyCashBookAsync,
    insertAsync: insertCashBookAsync,
    updateAsync: updateCashBookAsync,
    list: listCashBook,
    isLoading: isLoadingListCashBook,
    refetch,
    fetchNextPage,
    hasNextPage,
    totalRecord
  } = useCashBook({
    params: {
      parentID: cashbookId,
      accountID: accountSearchSelected,
      keyword,
      sortKey: JSON.stringify(['date__-1', 'createAt__-1']),
    },
    isFetchList: !!cashbookId,
  })

  const {
    amountIncomeExpenseByParent,
    isLoadingAmountIncomeExpense,
    refetchAmountIncomeExpense
  } = useCashBookCustom({
    paramsAmountIncomeExpense: { parentID: cashbookId },
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

  // Danh sách tài khoản (searching)
  const {
    list: listAccountSearch,
    hasNextPage: hasNextPageListAccountSearch,
    fetchNextPage: fetchNextPageListAccountSearch
  } = useAccount({
    params: {
      companyID: cashBookInfo?.company as string,
      keyword: keywordAccountSearch
    },
    isFetchList: !!cashBookInfo?.company
  })

  const calculate = () => {
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

    return newListCashBook;
  }

  useEffect(() => {
    document.title = "Chi tiết sổ quỹ";
  }, []);

  useEffect(() => {
    if(!amountIncomeExpenseByParent ||
        isLoadingAmountIncomeExpense ||
        !listCashBook
      ) return;

    const newListCashBook = calculate();
    setDataCashBook(newListCashBook);
  }, [cashbookId, JSON.stringify(amountIncomeExpenseByParent), JSON.stringify(listCashBook)])

  useEffect(() => {
    if(!cashBookInfo || !user || isLoadingInfo) return;

    const usersShared = [...cashBookInfo?.admins, ...cashBookInfo?.members];
    const adminsID    = cashBookInfo.admins.map(item => item._id);
    const membersID   = cashBookInfo.members.map(item => item._id);

    const usersIDShared = [
      ...adminsID,
      ...membersID,
    ];
    let authorID = '';

    if(typeof cashBookInfo.userCreate === 'string') {
      authorID = cashBookInfo.userCreate;
    } else{
      authorID = cashBookInfo.userCreate?._id;
    }

    usersIDShared.push(authorID);

    if(!usersIDShared.includes(user._id)) {
      toast.warn('Bạn đang không có quyền truy cập');
      history.push('/financial/cashbook');
    }

    const hasPermissionCreateUpdate = adminsID.includes(user._id) || authorID === user._id;
    const hasPermissionShare = authorID === user._id;
    const hasPermissionDelete = authorID === user._id;
    const onlyView = membersID.includes(user._id) && !adminsID.includes(user._id) && authorID !== user._id;

    setPermissions({
      usersShared,
      onlyView,
      hasPermissionCreateUpdate,
      hasPermissionDelete,
      hasPermissionShare
    })
  }, [JSON.stringify(user), JSON.stringify(cashBookInfo)])

  const toggleVisible = () => setVisibleDrawer(!visibleDrawer);
  const toggleDeleteModal = () => setIsShowDeleteModal(!isShowDeleteModal);

  const onChangeSearch = debounce((event: ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  }, 500);

  const onChangeAccountSearch = debounce((keyword: string | ChangeEvent<HTMLInputElement>) => {
    if(!keyword) {
      setAccountSearchSelected('');
    }

    setTimeout(() => {
      setKeywordAccountSearch(keyword as string);
    }, 300);
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

  const handleScrollAccountSearch = (e: UIEvent<HTMLDivElement>) => {
    const { scrollHeight, scrollTop, clientHeight } = e.currentTarget;
    const bottom = scrollHeight - scrollTop === clientHeight;

    if (bottom && hasNextPageListAccountSearch) {
      fetchNextPageListAccountSearch();
    }
  }

  const handleInsert = async (values: any) => {
    if(!permissions.hasPermissionCreateUpdate) {
      return toast.warn('Bạn không có quyền tạo nội dung này');
    }

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
    if(!permissions.hasPermissionCreateUpdate) {
      return toast.warn('Bạn không có quyền cập nhật nội dung này');
    }

    try {
      const { error, data } = await updateCashBookAsync(values);

      if (error) {
        return toast.warn(data?.message);
      }

      if (data.length) {
        return data.map((item: any) => toast.warn(item.message));
      }

      refetch();
      refetchAmountIncomeExpense();
      // callback && callback(data, previousInventory);
    } catch (error) {
      if (typeof error === "string") {
        toast.error(error);
      } else if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  }

  const handleDelete = async () => {
    if(!permissions.hasPermissionDelete) {
      toggleDeleteModal();
      return toast.warn('Bạn không có quyền xóa nội dung này');
    }

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

  const toggleModalShare = (modalType: 'admins' | 'members', users: User[] | undefined) =>
    setModalShare({ isShow: !modalShare.isShow, users, modalType });

  if(isLoadingInfo || isLoadingListCashBook || !cashBookInfo || !user) return <Loader className="border-primary" />

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex flex-wrap items-center w-full px-4 gap-x-2 bg-white text-black border-b border-cbs-gray py-1">
        <Link to={`/financial/cashbook`}>
          <img src="/images/common/button_back.png" alt="Button Back" />
        </Link>
        <span className="text-x-large mr-2 ml-2">{cashBookInfo?.name}</span>
        <SearchInput classNameWrapper="rounded-sm flex bg-cbs-left-menu" onChange={onChangeSearch} />
        {/* <DropdownFilterButton /> */}

        <CustomAutoComplete
          data={listAccountSearch}
          onScroll={handleScrollAccountSearch}
          onChange={onChangeAccountSearch}
          server={true}
          onChangeValue={value => setAccountSearchSelected(value._id)}
          renderValue={item => `${item.name}-${item.description}`}
          wrapperClassName="w-[170px] z-40"
          className="w-full h-full py-2.5 px-3 focus:outline-none"
          placeholder="Tài khoản"
        />

        {/* <button className={"bg-gray-50 flex items-center justify-center ml-3 px-3 h-[30px] rounded hover:bg-blue-100"}>
          <img src={SortingIcon} alt={"icon sorting icon"}/>
          <span className={"ml-2 text-gray-500"}>Filter</span>
        </button> */}

        <GroupActions
          className="flex items-center flex-1"
          onClickTrash={toggleDeleteModal}
          disabled={{
            trash: !itemsChecked.length || !permissions.hasPermissionDelete
          }}
          types={permissions.hasPermissionDelete ? ['trash'] : []}
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
        <button
          className="w-10 h-10 rounded-full flex justify-center items-center"
          onClick={toggleVisible}
        >
          <img src={iconGraphReport} alt="" />
        </button>
        <button
          className="text-gray-400"
          onClick={() => toggleModalShare('admins', cashBookInfo.admins)}
        >Admin ({cashBookInfo.admins?.length})</button> |
        <button
          className="text-gray-400 mr-2"
          onClick={() => toggleModalShare('members', cashBookInfo.members)}
        >Thành viên ({cashBookInfo.members?.length})</button>
        <AccessingUsers users={permissions.usersShared} />
      </div>
      <div className="flex-1 overflow-y-auto">
        <table
          className="text-black text-medium border-separate space-x-0 space-y-0 w-full"
          style={{ borderSpacing: 0 }}
        >
          <thead className="z-10 relative">
            <tr className="text-primary-gray whitespace-nowrap align-middle text-left">
              {!permissions.onlyView ? (
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
              ) : <></>}
              <th className="px-2 py-2.5 font-normal bg-cbs-table-header sticky top-0 border-0.5 border-cbs-border">
                Ngày tháng
              </th>
              <th className="px-2 py-2.5 font-normal bg-cbs-table-header sticky top-0 border-0.5 border-cbs-border" style={{ width: "20%" }}>
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
            {(dataCashBook && dataCashBook.length) ? dataCashBook.map((item, index) => {
              if(permissions.onlyView) {
                return (
                  <RowTableView key={item._id} cashBook={item} />
                )
              }

              return (
                <RowTableUpdateInline
                  key={item._id}
                  contracts={listContract}
                  contacts={listContact}
                  accounts={listAccount}
                  cashBook={item}
                  inventory={item.previousInventory ?? 0}
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
              )
            }) : <></>}

            {(showRowInsert && permissions.hasPermissionCreateUpdate) && <RowTableInsertInline onInsert={handleInsert} />}
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

      <ModalLarge
        show={modalShare.isShow}
        toggle={() => setModalShare(prev => ({ ...prev, isShow: !modalShare.isShow }))}
        className="inline-flex flex-col text-black w-full my-8 overflow-hidden text-left align-middle transition-all transform bg-white max-w-[600px] rounded-cbs-md"
      >
        <ModalShare
            toggle={() => setModalShare(prev => ({ ...prev, isShow: !modalShare.isShow }))}
            refetch={refetchInfo}
            cashbookId={cashbookId}
            users={modalShare.users}
            modalType={modalShare.modalType}
            hasPermission={permissions.hasPermissionShare}
        />
      </ModalLarge>
    </div>
  );
};