import React, { FC, useEffect, useState, useRef, useCallback } from "react";
import { useParams, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import moment from "moment";
// import debounce from "lodash/debounce";
import { read, utils } from 'xlsx';

// import FileColorIcon from "assets/icons/FileColor";
// import StarIcon from "assets/images/star.svg";
// import ModalLarge from "shareComponents/common/ModalContainer/components/ModalLarge";
// import { InputWidthAdjust } from "views/store/shareComponents/common";
import { createLinkAndClick } from "utils";
import { DetailMainRow, ModalShare } from "./components";
import { CreateRow } from "./components/Form";
// import {
//   FilterDateGroup
// } from "views/accounting/shareComponents/common";
// import { useUserSystem } from 'services/hooks/users/useUserSystem';
import { DropdownSearchableV2 } from "shareComponents/common";

import {
  useQueryDetailStoreParent,
  useQueryListStoreChild,
  useMutationStoreChild,
} from "services/hooks/useStore";

import { useCashBook } from "services/hooks/financial/useCashBook";

import { useAuth } from "services/hooks/auth/useAuth";
import { User } from "typings/user";
import { Loader } from "shareComponents/common";
import PaginateV2, { RefPaginateHandle } from "shareComponents/common/PaginateV2";

export const StoreDetailPage: FC = () => {
  type PaginateHandle = React.ElementRef<typeof PaginateV2>;
  type DropdownHandle = React.ElementRef<typeof DropdownSearchableV2>;

  const params = useParams<{ id: string }>();
  const [pageIndex, setPageIndex] = useState(0);

  const ref = React.useRef<PaginateHandle>(null);
  const cashBookID = params["id"];
  // const accountRef = React.useRef<DropdownHandle>(null);

  // const history = useHistory();
  // const [userID, setUserID] = useState<string | null>();
  // const [subtype, setSubtype] = useState<string | null>();
  // const [userKeyword, setUserKeyword] = useState("");  
  // const [keyword, setKeyword] = useState('');

  const { user } = useAuth();

  // const { data: listUser } = useUserSystem({
  //   companyID: user?.company?._id,
  //   keyword: userKeyword,
  //   limit: 10,
  //   isFetch: true
  // }, true)

  const [modalShare, setModalShare] = useState<{
    isShow: boolean;
    users: User[] | undefined;
    modalType: "members" | "admins";
  }>({
    isShow: false,
    users: [],
    modalType: "members",
  });

  const [permissions, setPermissions] = useState<{
    usersShared: User[];
    onlyView: boolean;
    hasPermissionCreateUpdate: boolean;
    hasPermissionShare: boolean;
  }>({
    usersShared: [],
    onlyView: true,
    hasPermissionCreateUpdate: false,
    hasPermissionShare: false,
  });

  const {
    data: storeInfo,
    refetch,
    loading,
  } = useQueryDetailStoreParent(cashBookID);

  const {
    dataNotFilter: listStoreChild,
    loading: isFetchStoreChild,
    totalPages,
    totalRecord,
    limit,
    hasNextPage,
    fetchNextPage,
    fetchPrevPage,
    refetch: onRefreshStoreChild,
  } = useQueryListStoreChild({
    // keyword,
    // humanID: userID,
    // subtype,
    parentID: cashBookID,
    limit: 50
  })

  const { onUpdateStoreAsync, onCreateStoreAsync } =
    useMutationStoreChild();

  useEffect(() => {
    if (!storeInfo || !user || loading) return;

    const usersShared = [...storeInfo?.admins, ...storeInfo?.members];
    const adminsID = storeInfo.admins.map((item) => item._id);
    const membersID = storeInfo.members.map((item) => item._id);

    const usersIDShared = [...adminsID, ...membersID];
    let authorID = "";

    if (typeof storeInfo.userCreate === "string") {
      authorID = storeInfo.userCreate;
    } else {
      authorID = storeInfo.userCreate?._id;
    }
    usersIDShared.push(authorID);

    const hasPermissionCreateUpdate =
      adminsID.includes(user._id) || authorID === user._id;
    const hasPermissionShare = authorID === user._id;
    const onlyView =
      membersID.includes(user._id) &&
      !adminsID.includes(user._id) &&
      authorID !== user._id;

    setPermissions({
      usersShared,
      onlyView,
      hasPermissionCreateUpdate,
      hasPermissionShare,
    });
  }, [JSON.stringify(storeInfo), JSON.stringify(user)]);

  const handleUpdatedStore = React.useCallback(
    async (values) => {
      try {
        const isUpdated = await onUpdateStoreAsync({
          ...values,
          cashBookID: values._id,
          // hours: `${values.hours}`,
          // amount: `${values.amount}`,
          // state: `${values.state}`,
          // unitprice: `${values.unitprice}`,
          // subtype: `${values.subtype}`,
          // type: `${values.type}`,
          // status: `${values.status}`,
        });
        if (!isUpdated.error) {
          onRefreshStoreChild();
          refetch(); // refetch time sheet parent
        }
      } catch (err) {
        return null;
      }
    },
    [onRefreshStoreChild, onUpdateStoreAsync, refetch]
  );

  const handleCreateStore = React.useCallback(
    async (values) => {
      try {
        if (!values.name) {
          throw new Error("Name is required");
        }
        const isCreated = await onCreateStoreAsync({
          name: values.name,
          parentID: cashBookID,
        });
        if (isCreated.error) {
          throw new Error("ERROR~");
        }

        refetch();
        onRefreshStoreChild();

        return true;
      } catch (err) {
        return false;
      }
    },
    [
      cashBookID,
      onCreateStoreAsync,
      onRefreshStoreChild,
      refetch,
    ]
  );

  const toggleModalShare = (
    modalType: "admins" | "members",
    users: User[] | undefined
  ) => setModalShare({ isShow: !modalShare.isShow, users, modalType });

  //_____Import, export excel
  const [, setStateExport] = useState<{ isExporting: boolean }>({
    isExporting: false,
  });

  const { exportExcelAsync, importExcelAsync } = useCashBook({});

  const handleDownloadExcel = async (param: any) => {
    try {
      setStateExport({ isExporting: true });
      const { error, data } = await exportExcelAsync({
        option: param.option,
        parentID: cashBookID,
      });

      if (error) {
        return toast.warn(data?.message);
      }

      data && createLinkAndClick(data, "_self");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setStateExport({ isExporting: false });
    }
  };

  const [dataImport, setDataImport] = useState([]);

  const handleImport = ($event: any) => {
    const files = $event.target.files;
    if (files.length) {
        const file = files[0];
        const reader = new FileReader();
        reader.onload = (event: any) => {
            const wb = read(event.target.result);
            const sheets = wb.SheetNames;

            if (sheets.length) {
                const rows: any = utils.sheet_to_json(wb.Sheets[sheets[0]]); // Index=1 (tức Sheet số 2 từ trái sang)

                // Set data để Import
                setDataImport(rows)
            }
        }

        reader.readAsArrayBuffer(file);
    }

    // Đọc xong thì xóa value trong Input đi
    $event.target.value = null;
}

// Gọi tới API để đẩy data lên
useEffect(() => {
    if(dataImport.length){
        const fetchData = async () => {
            const data = await importExcelAsync({ option: "2", parentID: cashBookID, dataImport: JSON.stringify(dataImport) });
            setDataImport([]);

            if(!data.error){
                return toast.success("Import thành công");
            }
            return toast.error(data.message);
        }
        fetchData();
    }
}, [JSON.stringify(dataImport)])

  if (!storeInfo || loading || !user)
    return <Loader className="border-primary" />;

  return (
    <div className={"financial-planning-detail"}>
      <div
        className={
          "financial-planning-header flex p-2 sticky top-0 z-10 bg-white"
        }
      >
        <div className="w-auto">
          <div className={"flex"}>
            <p className="font-bold text-medium">{storeInfo.name} | {storeInfo.sign} | {moment(storeInfo.date).format("DD/MM/YYYY")}</p>
          </div>
          <p className={"text-gray-400"}>
            Chỉnh sửa {" "}
              {moment(storeInfo.modifyAt).isValid() &&
              moment(storeInfo.modifyAt).fromNow()}{" "}
            bởi {storeInfo.userUpdate?.fullname}
          </p>
        </div>
        <div className={"flex-1 flex items-center justify-end"}>
          <button className={"mr-2 text-primary"} onClick={() => handleDownloadExcel({option: 5})}>
            Tải excel Phiếu kho
          </button>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-end">
        <PaginateV2
          ref={ref}
          totalRecord={totalRecord}
          totalPages={totalPages}
          hasNextPage={hasNextPage}
          limit={limit}
          isFetching={isFetchStoreChild}
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

      <div className={"financial-planning-table mt-2"}>
        <div className={"relative table border-collapse w-full"}>
          <div className={"header table-row sticky z-10"}>
            <div
              className={
                "p-2 table-cell box-border border border-gray-300 align-middle bg-gray-100"
              }
            >
              TT
            </div>
            <div
              className={
                "p-2 table-cell box-border border border-gray-300 align-middle bg-gray-100"
              }
            >
              Nội dung
            </div>
            <div
              className={
                "p-2 table-cell box-border border border-gray-300 align-middle bg-gray-100"
              }
            >
              Hàng hóa, vật tư, công cụ
            </div>
            <div
              className={
                "p-2 table-cell box-border border border-gray-300 align-middle bg-gray-100"
              }
            >
              Đơn vị
            </div>
            <div
              className={
                "p-2 table-cell box-border border border-gray-300 align-middle bg-gray-100"
              }
            >
              Khối lượng
            </div>
            <div
              className={
                "p-2 table-cell box-border border border-gray-300 align-middle bg-gray-100"
              }
            >
              Đơn giá
            </div>
            <div
              className={
                "p-2 table-cell box-border border border-gray-300 align-middle bg-gray-100"
              }
            >
              Thành tiền
            </div>
            <div
              className={
                "p-2 table-cell box-border border border-gray-300 align-middle bg-gray-100"
              }
            >
              Ngân sách
            </div>
            <div
              className={
                "p-2 table-cell box-border border border-gray-300 align-middle bg-gray-100"
              }
            >
              Thuộc thiết bị
            </div>
            <div
              className={
                "p-2 table-cell box-border border border-gray-300 align-middle bg-gray-100"
              }
            >
              Ghi chú
            </div>
          </div>
          {storeInfo?._id && Array.isArray(listStoreChild) && (
            <DetailMainRow
              storeParentInfo={storeInfo}
              listStoreChild={listStoreChild}
              onUpdatedStoreChild={handleUpdatedStore}
              isFetchStoreChild={isFetchStoreChild}
              hasPermission={permissions.hasPermissionCreateUpdate}
              pageIndex={pageIndex}
            />
          )}

          {permissions.hasPermissionCreateUpdate && (
            <CreateRow onInsert={handleCreateStore} />
          )}
        </div>
      </div>
    </div>
  )
}