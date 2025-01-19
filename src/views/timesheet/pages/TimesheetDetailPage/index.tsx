import React, { FC, useEffect, useState, useRef, useCallback } from "react";
import { useParams, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import moment from "moment";
import debounce from "lodash/debounce";
import ModalLarge from "shareComponents/common/ModalContainer/components/ModalLarge";
import { createLinkAndClick } from "utils";
import { DetailMainRow, ModalShare } from "./components";
import { CreateRow } from "./components/Form";
import { TIMESHEET_SUBTYPES, TIMESHEET_SHIFT_TYPES, TIMESHEET_OFFICIAL } from "apis/localdb/index";
import { FilterDateGroup } from "views/accounting/shareComponents/common";
import { useUserSystem } from 'services/hooks/users/useUserSystem';
import { DropdownSearchableV2 } from "shareComponents/common";
import {
  useMutationTimeSheetParent,
  useQueryDetailTimeSheetParent,
  useQueryListTimeSheetChild,
  useMutationTimeSheetChild,
} from "services/hooks/useTimeSheet";
import { useCashBook } from "services/hooks/financial/useCashBook";
import { useAuth } from "services/hooks/auth/useAuth";
import { User } from "typings/user";
import { Loader } from "shareComponents/common";
import PaginateV2 from "shareComponents/common/PaginateV2";
import iconUpload from "assets/images/icons8-upload-file-100 1.png";
import { validateFiles } from 'validation/file';
import { useUpload } from 'services/hooks/useUpload';
import { APP_KEY } from 'utils/constants';
import fileIcon from "assets/images/icons8-attach.svg";
import { formatNumberMoney } from "utils/converter";

const TimeSheetDetailPage: FC = () => {
  type PaginateHandle = React.ElementRef<typeof PaginateV2>;
  type DropdownHandle = React.ElementRef<typeof DropdownSearchableV2>;

  const params = useParams<{ id: string }>();
  const [pageIndex, setPageIndex] = useState(0);

  const ref = React.useRef<PaginateHandle>(null);
  const timeSheetParentID = params["id"];
  const accountRef = React.useRef<DropdownHandle>(null);

  const [userID, setUserID] = useState<string | null>();
  const [subtype, setSubtype] = useState<string | null>();
  const [shiftType, setShiftType] = useState<string | null>();
  const [official, setOfficial] = useState<string | null>();
  const [userKeyword, setUserKeyword] = useState("");  
  const [keyword, setKeyword] = useState('');

  const today = new Date();
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth()+1, 0);
  const currentMonth = new Date().getMonth()

  const [inputFilter, setInputFilter] = useState({
    fromDate: new Date(new Date().getFullYear(), currentMonth, 1),
    toDate: lastDayOfMonth
  });

  const { user } = useAuth();

  const { data: listUser } = useUserSystem({
    companyID: user?.company?._id,
    keyword: userKeyword,
    limit: 10,
    isFetch: true
  }, true)

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
    data: timeSheetInfo,
    refetch,
    loading,
  } = useQueryDetailTimeSheetParent(timeSheetParentID);

  const {
    dataNotFilter: listTimeSheetChild,
    loading: isFetchTimeSheetChild,
    totalPages,
    totalRecord,
    limit,
    hasNextPage,
    fetchNextPage,
    fetchPrevPage,
    refetch: onRefreshTimeSheetChild,
  } = useQueryListTimeSheetChild(timeSheetParentID,{
    keyword,
    humanID: userID,
    subtype,
    shiftType,
    official,
    limit: 50
  });

  const { onUpdateTimeSheetAsync, onCreateTimeSheetAsync } =
    useMutationTimeSheetChild();

  useEffect(() => {
    if (!timeSheetInfo || !user || loading) return;

    const usersShared = [...timeSheetInfo?.admins, ...timeSheetInfo?.members];
    const adminsID = timeSheetInfo.admins.map((item) => item._id);
    const membersID = timeSheetInfo.members.map((item) => item._id);

    const usersIDShared = [...adminsID, ...membersID];
    let authorID = "";

    if (typeof timeSheetInfo.userCreate === "string") {
      authorID = timeSheetInfo.userCreate;
    } else {
      authorID = timeSheetInfo.userCreate?._id;
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
  }, [JSON.stringify(timeSheetInfo), JSON.stringify(user)]);

  const handleUpdatedTimeSheet = React.useCallback(
    async (values) => {
      try {
        const isUpdated = await onUpdateTimeSheetAsync({
          ...values,
          expertTimesheetID: values._id,
          hours: `${values.hours}`,
          amount: `${values.amount}`,
          state: `${values.state}`,
          unitprice: `${values.unitprice}`,
          subtype: `${values.subtype}`,
          type: `${values.type}`,
          status: `${values.status}`,
        });
        if (!isUpdated.error) {
          onRefreshTimeSheetChild();
          refetch(); // refetch time sheet parent
        }
      } catch (err) {
        return null;
      }
    },
    [onRefreshTimeSheetChild, onUpdateTimeSheetAsync, refetch]
  );

  const handleCreateTimeSheet = React.useCallback(
    async (values) => {
      try {
        if (!values.name) {
          throw new Error("Name is required");
        }
        const isCreated = await onCreateTimeSheetAsync({
          name: values.name,
          parentID: timeSheetParentID,
        });
        if (isCreated.error) {
          throw new Error("ERROR");
        }

        refetch();
        onRefreshTimeSheetChild();

        return true;
      } catch (err) {
        return false;
      }
    },
    [
      timeSheetParentID,
      onCreateTimeSheetAsync,
      onRefreshTimeSheetChild,
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

  const { exportExcelAsync } = useCashBook({});
  const handleDownloadExcel = async (param: any) => {
    try {
      setStateExport({ isExporting: true });
      const { error, data } = await exportExcelAsync({
        option: param.option,
        parentID: timeSheetParentID,
        fromDate: inputFilter.fromDate,
        toDate: inputFilter.toDate,
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
  }

  const handleOnChangeDate = useCallback((date, input) => {
    if (input) {
      setInputFilter((value) => ({ ...value, toDate: date }))
    } else {
      setInputFilter((value) => ({ ...value, fromDate: date }))
    }
  }, [])

  const onChangeSearch = debounce((event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value)
  }, 500)

  // Upload file
  const { onUpdateTimeSheetParentAsync } = useMutationTimeSheetParent();

  const { addFileToUpload } = useUpload({
    appID: APP_KEY.TIMESHEET,
    companyID: user?.company._id,
  })

  const handleSetFiles = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      // Đọc file từ Client
      if (!event.target.files || !event.target.files.length) return;

      const validation = await validateFiles(event.target.files);
      if(validation.error) return toast.warn(validation.message);

      const arrFileID: any = []

      // Upload files to S3 và lưu DB file-core
      for (const [, file] of Object.entries(event.target.files)) {
        const { _id } = await addFileToUpload({
          files: file as any,
          fileType: 2,
          useCompress: true
        })
        arrFileID.push(_id)
      }

      const { error, data } = await onUpdateTimeSheetParentAsync({
        expertTimesheetID: timeSheetParentID,
        filesID: arrFileID,
      });

      if (error) {
        return toast.warning(data?.message);
      }

      toast.success('Thêm file thành công');
      refetch();
    } catch (error) {
      console.log({ error })
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  }

  if (!timeSheetInfo || loading || !user)
    return <Loader className="border-primary" />;

  return (
    <div className={"financial-planning-detail"}>
      <div
        className={
          "financial-planning-header flex p-2 sticky top-0 z-10 bg-white"
        }
      >
        <div className="w-auto">
          <p className="text-lg">{timeSheetInfo.name}</p>
          <p className={"text-gray-400"}>
            Chỉnh sửa {" "}
              {moment(timeSheetInfo.modifyAt).isValid() &&
              moment(timeSheetInfo.modifyAt).fromNow()}{" "}
            bởi {timeSheetInfo.userUpdate?.fullname}
          </p>
        </div>
        <div className={"flex-1 flex items-center justify-end"}>
          <button className={"mr-2"} onClick={() => handleDownloadExcel({option: 4})}>
            Check
          </button>
          <button className={"mr-2"} onClick={() => handleDownloadExcel({option: 3})}>
            Tải điểm danh
          </button>
          <button className={"mr-2 text-primary"} onClick={() => handleDownloadExcel({option: 1})}>
            Tải chấm công
          </button>
          <button className={"mr-2"} onClick={() => handleDownloadExcel({option: 2})}>
            Tải ngân sách
          </button>
          <button
            className="text-gray-400 mr-2"
            onClick={() => {
              toggleModalShare("admins", timeSheetInfo.admins);
            }}
          >
            Admin ({timeSheetInfo.admins?.length})
          </button>{" "}
          |
          <button
            className="text-gray-400 mr-2 ml-2"
            onClick={() => {
              toggleModalShare("members", timeSheetInfo.members);
            }}
          >
            Thành viên ({timeSheetInfo.members?.length})
          </button>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-end">
        <div className="relative flex items-center">
            <input 
            placeholder="Tìm kiếm" 
            className="pl-3 pr-3 mr-1 w-[275px] h-[32px] bg-cbs-table-header border border-primary-border rounded-lg"
            onChange={onChangeSearch}
            />
        </div>
        <DropdownSearchableV2
            ref={accountRef}
            className={"mr-1 border border-primary-border rounded-lg"}
            placeholder={"Nhân sự"}
            isMultiple={false}
            allowClearValueSingleInput={true}
            data={listUser}
            formatItem={{
                id: "_id",
                text: "fullname",
            }}
            onSearchInputChange={debounce(
                (valueSearch) => setUserKeyword(valueSearch),
                500
            )}
            onClearData={() => {
              setUserID("");
            }}
            onchangeValue={item => {
                setUserID(item._id);
                setPageIndex(0);
                ref.current&&ref.current.resetPaginate();
            }}
            renderItem={(item) => (
                <p className={"min-w-[300px]"}>{item.text}</p>
            )}
            selectOneByOne={true}
        />
        <DropdownSearchableV2
            ref={accountRef}
            className={"mr-1 border border-primary-border rounded-lg"}
            placeholder={"Phân loại"}
            isMultiple={false}
            allowClearValueSingleInput={true}
            data={TIMESHEET_SUBTYPES}
            formatItem={{
                id: "_id",
                text: "name",
            }}
            onClearData={() => {
              setSubtype("");
            }}
            onchangeValue={item => {
                setSubtype(item._id);
                setPageIndex(0);
                ref.current&&ref.current.resetPaginate();
            }}
            renderItem={(item) => (
                <p className={"min-w-[300px]"}>{item.text}</p>
            )}
            selectOneByOne={true}
        />
        <DropdownSearchableV2
            ref={accountRef}
            className={"mr-1 border border-primary-border rounded-lg"}
            placeholder={"Ca làm việc"}
            isMultiple={false}
            allowClearValueSingleInput={true}
            data={TIMESHEET_SHIFT_TYPES}
            formatItem={{
                id: "_id",
                text: "name",
            }}
            onClearData={() => {
              setShiftType("");
            }}
            onchangeValue={item => {
              setShiftType(item._id);
              setPageIndex(0);
              ref.current&&ref.current.resetPaginate();
            }}
            renderItem={(item) => (
                <p className={"min-w-[300px]"}>{item.text}</p>
            )}
            selectOneByOne={true}
        />
        <DropdownSearchableV2
            ref={accountRef}
            className={"mr-1 border border-primary-border rounded-lg"}
            placeholder={"Chính thức/Thử việc"}
            isMultiple={false}
            allowClearValueSingleInput={true}
            data={TIMESHEET_OFFICIAL}
            formatItem={{
                id: "_id",
                text: "name",
            }}
            onClearData={() => {
              setOfficial("");
            }}
            onchangeValue={item => {
              setOfficial(item._id);
              setPageIndex(0);
              ref.current&&ref.current.resetPaginate();
            }}
            renderItem={(item) => (
                <p className={"min-w-[300px]"}>{item.text}</p>
            )}
            selectOneByOne={true}
        />
        <FilterDateGroup fromDate={inputFilter.fromDate} endDate={inputFilter.toDate} onChangeDate={handleOnChangeDate} />
        <PaginateV2
          ref={ref}
          totalRecord={totalRecord}
          totalPages={totalPages}
          hasNextPage={hasNextPage}
          limit={limit}
          isFetching={isFetchTimeSheetChild}
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

      <div className="flex flex-wrap mt-3">
        <h3 className="text-cbs-subtext text-x-large font-bold flex-1">
          Tài liệu đính kèm chấm công
        </h3>
        <label className="px-[10px] py-[5px] h-10 rounded-md bg-gray-100 flex justify-center items-center text-primary text-[13px] cursor-pointer">
          <img src={iconUpload} alt="" className="mr-2.5 h-6 w-6" /> Thêm file
          <input type="file" name="files" id="file" className="hidden" accept="*" multiple onChange={handleSetFiles} />
        </label>
      </div>

      <table className="w-full mt-3">
        <tbody>
          {timeSheetInfo?.files?.map((item: any) => (
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
              Ngày
            </div>
            <div
              className={
                "p-2 table-cell box-border border border-gray-300 align-middle bg-gray-100"
              }
            >
              KL
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
              Người thực hiện
            </div>
            <div
              className={
                "p-2 table-cell box-border border border-gray-300 align-middle bg-gray-100"
              }
            >
              Phân loại
            </div>
            <div
              className={
                "p-2 table-cell box-border border border-gray-300 align-middle bg-gray-100"
              }
            >
              Công việc/Bill
            </div>
            <div
              className={
                "p-2 table-cell box-border border border-gray-300 align-middle bg-gray-100"
              }
            >
              Mô tả/ghi chú
            </div>
          </div>
          {timeSheetInfo?._id && Array.isArray(listTimeSheetChild) && (
            <DetailMainRow
              timeSheetParentInfo={timeSheetInfo}
              listTimeSheetChild={listTimeSheetChild}
              onUpdatedTimeSheetChild={handleUpdatedTimeSheet}
              isFetchTimeSheetChild={isFetchTimeSheetChild}
              hasPermission={permissions.hasPermissionCreateUpdate}
              pageIndex={pageIndex}
            />
          )}

          {permissions.hasPermissionCreateUpdate && (
            <CreateRow onInsert={handleCreateTimeSheet} />
          )}
        </div>

      </div>

      <ModalLarge
        show={modalShare.isShow}
        toggle={() =>
          setModalShare((prev) => ({ ...prev, isShow: !modalShare.isShow }))
        }
        className="inline-flex flex-col text-black w-full my-8 overflow-hidden text-left align-middle transition-all transform bg-white max-w-[600px] rounded-cbs-md"
      >
        <ModalShare
          toggle={() =>
            setModalShare((prev) => ({ ...prev, isShow: !modalShare.isShow }))
          }
          refetch={refetch}
          expertTimesheetID={timeSheetParentID}
          users={modalShare.users}
          modalType={modalShare.modalType}
          hasPermission={permissions.hasPermissionShare}
        />
      </ModalLarge>
    </div>
  )
}

export default TimeSheetDetailPage