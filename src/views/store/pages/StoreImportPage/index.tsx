import React, { FC, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import moment from "moment";
import debounce from "lodash/debounce";
import PaginateV2, { RefPaginateHandle } from "shareComponents/common/PaginateV2";
import { STORE_OUTIN, STORE_TYPES } from "apis/localdb";
import { convertCurrency } from "utils/converter";
import { useModal } from "services/hooks/useModal";
import { useDeleteConfirm } from "services/hooks/useDeleteConfirm";
import {
    useQueryListStoreParent,
    useMutationStoreParent,
  } from "services/hooks/useStore";
import {
    SearchInput,
    DialogForm,
    ActionGroupButton,
} from "views/store/shareComponents/common";

const DATE_FORMAT = "DD/MM/YYYY HH:mm";
interface StoreHomePageProps {
    outin?: number
    type?: number
}

export const StoreImportPage: FC<StoreHomePageProps> = ({ outin = 2, type = 2 }) => {
  const [recordSelected, toggleRecord] = React.useState<any>({});
  const [keyword, setKeyword] = React.useState("");
  const [pageIndex, setPageIndex] = useState(0);

  const ref = useRef<RefPaginateHandle>(null);

  const { openModal, closeModal } = useModal();
  const { openDeleteConfirm } = useDeleteConfirm();
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
  } = useQueryListStoreParent({ keyword, outin, type, sortOption: 2 });
  console.log(dataNotFilter)

  const {
    onCreateStoreParentAsync,
    onUpdateStoreParentAsync,
    onDeleteStoreParentAsync,
  } = useMutationStoreParent();

  const handleCreateStore = React.useCallback(
    async (values) => {
      try {
        const isCreated = await onCreateStoreParentAsync(values);
        if (!isCreated.error) {
          refreshListStore();
          closeModal();
          return null;
        }
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
          refreshListStore();
          closeModal();
          return null;
        }
        throw new Error("Can not create!");
      } catch (err) {
        return null;
      }
    },
    [closeModal, onUpdateStoreParentAsync, refreshListStore]
  );

  const handleClickDeleteStore = React.useCallback(
    (StoreID) => {
      openDeleteConfirm({
        deleteAction: async () => {
          const res = await onDeleteStoreParentAsync({
            expertStoreID: StoreID,
          });
          if (res.status === 200) {
            refreshListStore();
          }
        },
      });
    },
    [onDeleteStoreParentAsync, refreshListStore, openDeleteConfirm]
  );

  return (
    <div className={"financial-cashflow-listing paginate-wrapper relative"}>
      <div
        className={
          "financial-cashflow-listing-heading flex items-center border-b py-2 px-6"
        }
      >
        <div className={"flex items-center flex-1"}>
          <SearchInput
            classNameWrapper={""}
            onChange={debounce((e) => {
              setKeyword(e.target.value);
            }, 1000)}
          />
          {Object.keys(recordSelected).length > 1 && (
            <>
              <div className={"mr-3 w-4 border-r border-gray-400 h-[16px]"} />
              <ActionGroupButton
                recordSelected={recordSelected}
                onUpdateStore={handleUpdateStore}
                onDeleteStore={handleClickDeleteStore}
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
                  outin={2}
                  type={2}
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
              Kho bãi
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
              Giá trị
            </div>
            <div
              className={
                "px-2 py-2 table-cell box-border border-b align-middle text-gray-500"
              }
            >
              Ghi chú
            </div>
          </div>
          {dataNotFilter[pageIndex] && dataNotFilter[pageIndex].map((StoreParent: any) => (
            <div className={"body-table table-row"} key={StoreParent._id}>
              <div
                className={
                  "px-2 py-2 table-cell box-border border-b align-middle w-3"
                }
              >
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="flexCheckDefault"
                  checked={recordSelected?._id === StoreParent._id}
                  onChange={(e) => {
                    if (e.target.checked) {
                      toggleRecord(StoreParent);
                      return null;
                    }
                    toggleRecord({});
                    return null;
                  }}
                />
              </div>
              <div className={"px-2 py-2 table-cell box-border border-b"}>
                {moment(StoreParent.date).format('DD/MM/YYYY')}
              </div>
              <div
                className={
                  "px-1 py-2 table-cell box-border border-b align-middle"
                }
              >
                <NavLink to={`/Store/home/${StoreParent._id}`} className="text-cbs-highlight-color font-bold text-medium">
                  {StoreParent.name}
                </NavLink>
                <p className={"mt-1 text-gray-500"}>
                  {StoreParent?.userCreate?.fullname} {moment(StoreParent.createAt).format(DATE_FORMAT)}
                </p>
                <p className={"mt-1 text-gray-500"}>
                  {StoreParent?.userUpdate?.fullname} {moment(StoreParent.modifyAt).format(DATE_FORMAT)}
                </p>
              </div>
              <div className={"px-2 py-2 table-cell box-border border-b"}>
                {StoreParent.sign}
              </div>
              <div className={"px-2 py-2 table-cell box-border border-b"}>
                {STORE_OUTIN[Number(StoreParent.outin - 1)].text}
                <p>{STORE_TYPES[Number(StoreParent.type - 1)].text}</p>
              </div>
              <div className={"px-2 py-2 table-cell box-border border-b"}>
                {StoreParent?.project?.name}
              </div>
              <div className={"px-2 py-2 table-cell box-border border-b"}>
                {StoreParent?.warehouse?.name}
              </div>
              <div className={"px-2 py-2 table-cell box-border border-b"}>
                {StoreParent?.customer?.name}
              </div>
              <div
                className={
                  "px-2 py-2 table-cell box-border border-b text-right"
                }
              >
                {convertCurrency(StoreParent?.amount)}
              </div>
              <div className={"px-2 py-2 table-cell box-border border-b"}>
                {StoreParent.note}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}