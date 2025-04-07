import React, { FC, useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import moment from "moment";
import { createLinkAndClick } from "utils";
import { DetailMainRow, SignatureDetail } from "./components";
import { CreateRow } from "./components/Form";
import { convertCurrency } from "utils/converter";

import {
  useQueryListStoreChild,
  useMutationStoreChild,
} from "services/hooks/useStoreProduct";

import { useQueryDetailStoreParent } from "services/hooks/useStore";

import { useCashBook } from "services/hooks/financial/useCashBook";
import { User } from "typings/user";
import { Loader } from "shareComponents/common";
import PaginateV2 from "shareComponents/common/PaginateV2";

import { useAuth } from "services/hooks/auth/useAuth";
import iconUpload from "assets/images/icons8-upload-file-100 1.png";
import { useUpload } from "services/hooks/useUpload";
import { validateFiles } from "validation/file";
import { APP_KEY } from "utils/constants";
import { useMutationStoreParent } from "services/hooks/useStore";
import fileIcon from "assets/images/icons8-attach.svg";
import { formatNumberMoney } from "utils/converter";
import iconCheckmark from "assets/images/icons8-checkmark-yes-64.svg";
import { ModalConfirm } from "shareComponents/common";
import { useModal } from "services/hooks/useModal";

type Props = {
  user?: User | null;
  onConfirmSign?: () => void;
  hasPermissionAddSignature?: boolean;
  refetchInfo?: () => void;
};
type PaginateHandle = React.ElementRef<typeof PaginateV2>;

export const CrmStoreDetailPage: FC<Props> = () => {
  const { openModal, closeModal } = useModal();

  const params = useParams<{ id: string }>();
  const [pageIndex, setPageIndex] = useState(0);

  const ref = React.useRef<PaginateHandle>(null);
  const orderID = params["id"];
  const { user } = useAuth();

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
  } = useQueryDetailStoreParent(orderID);

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
    orderID,
    limit: 50,
  });

  const { onUpdateStoreAsync, onCreateStoreAsync } = useMutationStoreChild();

  const handleUpdatedStore = React.useCallback(
    async (values) => {
      try {
        const isUpdated = await onUpdateStoreAsync({
          ...values,
          orderProductID: values._id,
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
          orderID: orderID,
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
    [orderID, onCreateStoreAsync, onRefreshStoreChild, refetch]
  );

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
        parentID: orderID,
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

  // Gọi tới API để đẩy data lên
  useEffect(() => {
    if (dataImport.length) {
      const fetchData = async () => {
        const data = await importExcelAsync({
          option: "2",
          parentID: orderID,
          dataImport: JSON.stringify(dataImport),
        });
        setDataImport([]);

        if (!data.error) {
          return toast.success("Import thành công");
        }
        return toast.error(data.message);
      };
      fetchData();
    }
  }, [JSON.stringify(dataImport)]);

  /**
   *  Upload file
   */
  const { onUpdateStoreParentAsync } = useMutationStoreParent();

  const { addFileToUpload } = useUpload({
    appID: APP_KEY.STORE,
    companyID: user?.company._id,
  });

  const handleSetFiles = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      // Đọc file từ Client
      if (!event.target.files || !event.target.files.length) return;

      const validation = await validateFiles(event.target.files);
      if (validation.error) return toast.warn(validation.message);

      const arrFileID: any = [];

      // Upload files to S3 và lưu DB file-core
      for (const [, file] of Object.entries(event.target.files)) {
        const { _id } = await addFileToUpload({
          files: file as any,
          fileType: 2,
          useCompress: true,
        });
        arrFileID.push(_id);
      }

      const { error, data } = await onUpdateStoreParentAsync({
        orderID,
        filesID: arrFileID,
      });

      if (error) {
        return toast.warning(data?.message);
      }

      toast.success("Thêm file thành công");
      refetch();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  const toggleModalOpenSign = () => {
    openModal(
      <div
        className={
          "inline-block w-[521px] h-[240px] my-8 overflow-hidden text-left align-middle transition-all transform bg-primary-light shadow-xl rounded"
        }
      >
        <ModalConfirm
          title="Bạn có muốn xác nhận không?"
          description="Thông tin xác nhận của bạn sẽ được hiển thị trong chi tiết"
          onConfirm={handleConfirmSignature}
          defaultText={false}
          onCancel={closeModal}
        />
      </div>
    );
  };

  const handleConfirmSignature = useCallback(async () => {
    try {
      const { error, data } = await onUpdateStoreParentAsync({
        orderID,
        isAddSignature: true,
      });

      closeModal();
      if (error) {
        return toast.warning(data.message);
      }

      refetch();

      toast.success("Ký xác nhận thành công");
    } catch (error) {
      closeModal();
      if (typeof error === "string") {
        toast.error(error);
      } else if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  }, [storeInfo?._id]);

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
            <p className="font-bold text-medium">
              {storeInfo?.name} | {storeInfo?.sign} |{" "}
              {convertCurrency(storeInfo?.amount)} |{" "}
              {moment(storeInfo?.date).format("DD/MM/YYYY")}
            </p>
          </div>
          <p className={"text-gray-400"}>
            Chỉnh sửa{" "}
            {moment(storeInfo.modifyAt).isValid() &&
              moment(storeInfo.modifyAt).fromNow()}{" "}
            bởi {storeInfo.userUpdate?.fullname}
          </p>
        </div>
        <div className={"flex-1 flex items-center justify-end"}>
          <button
            className={"mr-2 text-primary"}
            onClick={() => handleDownloadExcel({ option: 5 })}
          >
            Tải excel đơn hàng
          </button>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-end">
        <button
          className={
            "flex text-primary-gray items-center rounded hover:bg-cbs-form-input-bg px-3 h-[30px] ml-2 mr-2"
          }
          onClick={toggleModalOpenSign}
        >
          <img src={iconCheckmark} alt={"----"} className={"mr-2"} />
          <span>Xác nhận</span>
        </button>
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
              Số lượng
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

          <CreateRow onInsert={handleCreateStore} />
        </div>

        <div className="flex flex-wrap mt-3">
          <h3 className="text-cbs-subtext text-x-large font-bold flex-1">
            Tài liệu đính kèm
          </h3>
          <label className="px-[10px] py-[5px] h-10 rounded-md bg-gray-100 flex justify-center items-center text-primary text-[13px] cursor-pointer">
            <img src={iconUpload} alt="" className="mr-2.5 h-6 w-6" /> Thêm file
            <input
              type="file"
              name="files"
              id="file"
              className="hidden"
              accept="*"
              multiple
              onChange={handleSetFiles}
            />
          </label>
        </div>

        <table className="w-full mt-3">
          <tbody>
            {storeInfo?.files.map((item: any) => (
              <tr key={item._id}>
                <td className="py-2">
                  <div className="flex items-center">
                    <img
                      src={fileIcon}
                      alt=""
                      className="h-6 w-6 px-1 box-content"
                    />
                    <a
                      className="text-primary"
                      href={`${process.env.REACT_APP_URL_S3}${item?.path}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {" "}
                      {item?.nameOrg || "-"}{" "}
                    </a>
                  </div>
                </td>
                <td className="py-2 align-middle">
                  {item?.author?.fullname || "-"}
                </td>
                <td className="py-2 align-middle">
                  {moment(item.createAt).format("DD/MM/YYYY HH:mm")}
                </td>
                <td className="py-2 align-middle">
                  {formatNumberMoney(Number(item?.size / 1024 || 0).toFixed(0))}{" "}
                  KB
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {storeInfo?.signatures?.length ? (
          <SignatureDetail task={storeInfo} />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};