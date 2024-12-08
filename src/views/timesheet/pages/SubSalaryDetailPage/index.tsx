import React, { FC, useEffect, useState, useRef, useCallback } from "react";
import { useParams, useHistory, NavLink } from "react-router-dom";
import moment from "moment";
import { useDispatch } from "react-redux";
import { debounce } from "lodash";
import { toast } from "react-toastify";
import { read, utils } from 'xlsx';
import { TIMESHEET_SUBTYPES, CHECK_SALLARY } from "apis/localdb/index";
import API from "apis/repository";

/**
 * Components, Assets
 */
import FileColorIcon from "assets/icons/FileColor";
import StarIcon from "assets/images/star.svg";
import TrashIcon from "assets/images/icons8-remove-96.svg";

import { createLinkAndClick } from "utils";
import { APP_ID } from "apis/localdb";

import { DetailMainRow, ModalShare } from "./components";
import ModalLarge from "shareComponents/common/ModalContainer/components/ModalLarge";
import { InputWidthAdjust, DialogSalaryAddUser } from "views/timesheet/shareComponents/common";
import { setFilterDropdown } from "redux/reducer/DocumentProjectSlice";
import { usePcmFile } from "services/hooks/pcm/usePcm";
import { Loader, ModalConfirm, DropdownSearchableV2 } from "shareComponents/common";
import PaginateV2 from "shareComponents/common/PaginateV2";

import {
  useQueryDetailSalaryParent,
  useQueryListSalaryChild,
  useMutationSalaryChild,
} from "services/hooks/useSalary";

import { useModal } from "services/hooks/useModal";
import { useProjectCustom } from "services/hooks/items/useProject";
import { usePosition } from 'services/hooks/items/usePosition';
import { useCashBook } from "services/hooks/financial/useCashBook";
import { useCheckPerAccessApp } from "services/hooks/auth/usePermissions";
import { useAuth } from "services/hooks/auth/useAuth";

import { User } from "typings/user";
import { DeleteSalaryContext, DeleteSalaryContextType } from "./contexts/DeleteSalary";

const SubSalaryDetailPage: FC = () => {
  type DropdownHandle = React.ElementRef<typeof DropdownSearchableV2>;
  type PaginateHandle = React.ElementRef<typeof PaginateV2>;
  const [projectKeyword, setProjectKeyword] = useState("");
  const [departmentsID, setDepartmentsID] = useState<string[]>([]);
  const [salaryIds, setSalaryIds] = useState<DeleteSalaryContextType['salaryIds']>([]);
  const accountRef = React.useRef<DropdownHandle>(null);

  const [subtype, setSubtype] = useState<string | null>();
  const [salary, setSalary] = useState<string | null>();
  const [onLeaveSalary, setOnLeaveSalary] = useState<string | null>();
  const [overtimeSalary, setOvertimeSalary] = useState<string | null>();
  const [mealAllowance, setMealAllowance] = useState<string | null>();
  const [punishment, setPunishment] = useState<string | null>();
  const [positionKeyword, setpPositionKeyword] = useState("");
  const [positionsID, setPositionsID] = useState<string[]>([]);

  const [templateKeyword, setpTemplateKeyword] = useState("");
  const [templateID, setTemplateID] = useState<string | null>();

  const { closeModal, openModal } = useModal();
  const dispatch = useDispatch();

  const datahubRef = React.useRef<DropdownHandle>(null);
  const history = useHistory()
  const { hasPermission } = useCheckPerAccessApp({ appID: APP_ID.TIMESHEET.id })

  useEffect(() => {
    if (!hasPermission) {
      toast.error("Bạn không có quyền truy cập chức năng này");
      history.push("/")
    }
  }, [hasPermission])

  const params = useParams<{ id: string }>();
  const [pageIndex, setPageIndex] = useState(0);

  const ref = useRef<PaginateHandle>(null);
  const salaryParentID = params["id"];
  const [keyword, setKeyword] = useState('');

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

  const { user } = useAuth();

  const {
    data: salaryInfo,
    refetch,
    loading,
  } = useQueryDetailSalaryParent(salaryParentID);

  const {
    dataNotFilter: listSalaryChild,
    loading: isFetchSalaryChild,
    refetch: onRefreshSalaryChild,
    hasNextPage,
    totalPages,
    totalRecord,
    limit,
    fetchNextPage,
    fetchPrevPage,
  } = useQueryListSalaryChild(salaryParentID, {
    keyword,
    limit: 50,
    positionsID,
    departmentsID,
    subtype,
    salary,
    onLeaveSalary,
    overtimeSalary,
    mealAllowance,
    punishment,
    templateID
  })

  const { 
    listFilesPcm, 
    // isLoading, 
    // totalRecord, 
    // totalPage, 
    // nextCursor 
  } = usePcmFile({
    params: {
      isTemplateFile: true,
      isXlsxFile: true,
      companyID: user?.company?._id,
      keyword: templateKeyword
    },
    isFetch: true
  })

  const { listProjectsUserIsMember } = useProjectCustom({ paramsProjectsUserIsMember: { keyword: projectKeyword }, isFetchProjectsUserIsMember: true });
  const { data: listPosition } = usePosition({ keyword: positionKeyword }, true);

  const { onUpdateSalaryAsync, onDeleteSalaryAsync } = useMutationSalaryChild();

  useEffect(() => {
    if (!salaryInfo || !user) return;

    const usersShared = [...salaryInfo?.admins, ...salaryInfo?.members];
    const adminsID = salaryInfo.admins.map((item) => item._id);
    const membersID = salaryInfo.members.map((item) => item._id);

    const usersIDShared = [...adminsID, ...membersID];
    let authorID = "";

    if (typeof salaryInfo.userCreate === "string") {
      authorID = salaryInfo.userCreate;
    } else {
      authorID = salaryInfo.userCreate?._id;
    }

    usersIDShared.push(authorID);

    if (!usersIDShared.includes(user._id)) {
      toast.warn("Bạn đang không có quyền truy cập");
      history.push("/timesheet/home");
    }

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
  }, [JSON.stringify(salaryInfo), JSON.stringify(user)]);

  const handleUpdatedSalary = React.useCallback(
    async (values) => {
      try {
        const isUpdated = await onUpdateSalaryAsync({
          ...values,
          expertSalaryID: values._id,
          state: `${values.state}`,
          type: `${values.type}`,
          status: `${values.status}`,
          salary: `${values.salary}`,
          reward: `${values.reward}`,
          punishment: `${values.punishment}`,
          revenueBonus: `${values.revenueBonus}`,
          mealAllowance: `${values.mealAllowance}`,
          insurance: `${values.insurance}`,
          pitax: `${values.pitax}`,
          union: `${values.union}`,
          share: `${values.share}`,
          kpiFactor: `${values.kpiFactor}`,
        });
        if (!isUpdated.error) {
          onRefreshSalaryChild();
          refetch(); // refetch time sheet parent
        }
      } catch (err) {
        return null;
      }
    },
    [onRefreshSalaryChild, onUpdateSalaryAsync, refetch]
  );

  const toggleModalShare = (
    modalType: "admins" | "members",
    users: User[] | undefined
  ) => setModalShare({ isShow: !modalShare.isShow, users, modalType });

  //_____Import, export excel
  const [, setStateExport] = useState<{ isExporting: boolean }>({
    isExporting: false,
  });

  const { downloadTemplateExcelAsync, importExcelAsync } = useCashBook({});

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
              const data = await importExcelAsync({ option: "1", parentID: salaryParentID, dataImport: JSON.stringify(dataImport) });
              setDataImport([]);

              if(!data.error){
                  return toast.success("Import thành công");
              }

              return toast.error(data?.data?.message);
          }
          fetchData();
      }
  }, [JSON.stringify(dataImport)])

  const handleDownloadExcel = async () => {
    try {
      setStateExport({ isExporting: true });
      const { error, data } = await downloadTemplateExcelAsync({
        parentID: salaryParentID,
        option: "2",
        templateID,
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

  const onChangeSearch = debounce((event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value)
  }, 500)

  const handleConfirmDeleteSalary = async () => {
    try {
      closeModal();

      if(!salaryIds.length) {
        return toast.warn('Bạn chưa chọn dữ liệu để xóa');
      }

      const { error, message, data } = await onDeleteSalaryAsync({ arraysRemove: salaryIds })

      if(error) {
        return toast.warn(data?.message);
      }

      setSalaryIds((curr: string[]) => {
        const filterCurr = curr.filter(id => !salaryIds.includes(id));
        return filterCurr;
      })

      toast.success(message);
      onRefreshSalaryChild();
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  const handleConfirmSync = useCallback(async (param: any) => {
    closeModal();

    const { data, status } = await API.post(
      `/api/timesheet/expert_salary/sync-data`, {
        option: 1,
        salaryID: salaryParentID,
        arrUser: [param.assigneeID]
      }
    )
   
    if (status !== 200 || data.error) {
      return toast.warn('Cập nhật thất bại')
    }

    onRefreshSalaryChild();
    return toast.success('Cập nhật thành công')
  }, [])

  const openDeleteModal = () => {
    openModal(
      <div
        className={
          "inline-block w-[521px] h-[185px] my-8 overflow-hidden text-left align-middle transition-all transform bg-primary-light shadow-xl rounded"
        }
      >
        <ModalConfirm onConfirm={handleConfirmDeleteSalary} onCancel={closeModal} />
      </div>
    );
  }

  if (!salaryInfo || loading || !user) {
    return <Loader className="border-primary" />;
  }

  return (
    <DeleteSalaryContext.Provider value={{ salaryIds, setSalaryIds }}>
      <div className={"financial-planning-detail"}>
        <div
          className={
            "financial-planning-header flex p-2 sticky top-0 z-10 bg-white"
          }
        >
          <div className="w-auto">
            <p className="text-lg">
              {salaryInfo.name}
              <NavLink to={`/timesheet/salary_detail/${salaryInfo?._id}`} className="ml-5 text-cbs-highlight-color text-sm">
                Xem Bảng lương chính
              </NavLink>
            </p>
            <p className={"text-gray-400"}>
              Chỉnh sửa lần cuối cách đây{" "}
              {moment(salaryInfo.modifyAt).isValid() &&
                moment(salaryInfo.modifyAt).fromNow()}{" "}
              bởi {salaryInfo.userCreate?.fullname}
            </p>
          </div>
          <div className={"flex-1 flex items-center justify-end"}>
            <button className={"mr-2 text-primary"} onClick={handleDownloadExcel}>
              Tải Bảng lương
            </button>
            <button className={"flex items-center justify-center mx-3 ml-3"}>
                <input type="file" name="file" className="custom-file-input" id="inputGroupFile" required hidden onChange={handleImport}
                accept=".xlsx, .xlsm, .xls, .csv"/>
                <label className="custom-file-label" htmlFor="inputGroupFile">Import excel cập nhật</label>
            </button>
            <button
              className="text-gray-400 mr-2"
              onClick={() => {
                toggleModalShare("admins", salaryInfo.admins);
              }}
            >
              Admin ({salaryInfo.admins?.length})
            </button>{" "}
            |
            <button
              className="text-gray-400 mr-2 ml-2"
              onClick={() => {
                toggleModalShare("members", salaryInfo.members);
              }}
            >
              Thành viên ({salaryInfo.members?.length})
            </button>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-end">
          <div className="relative flex items-center">
              <input
              placeholder="Tìm kiếm"
              className="pl-3 pr-3 mr-1 w-[225px] h-[32px] bg-cbs-table-header border border-primary-border rounded-lg mb-2"
              onChange={onChangeSearch}
              />
          </div>
          <DropdownSearchableV2
              ref={datahubRef}
              className={"mr-1 border border-primary-border rounded-lg mb-2"}
              placeholder={"Phòng ban"}
              isMultiple={true}
              allowClearValueSingleInput={true}
              data={listProjectsUserIsMember}
              formatItem={{
                  id: "_id",
                  text: "name"
              }}
              onSearchInputChange={debounce(
                  (valueSearch) => setProjectKeyword(valueSearch),
                  500
              )}
              onchangeValue={item => {
                  const cloneIDs = [...departmentsID];
                  cloneIDs.push(item._id);
                  setDepartmentsID(cloneIDs);
                  dispatch(setFilterDropdown({keyFilter: "departmentsID", dataFilter: cloneIDs}))

                  setPageIndex(0);
                  ref.current&&ref.current.resetPaginate();
              }}
              onClearData={() => {
                  setDepartmentsID([]);
                  dispatch(setFilterDropdown({keyFilter: "departmentsID", dataFilter: []}))

                  setPageIndex(0);
                  ref.current&&ref.current.resetPaginate();
              }}
              onMultipleRemoveValue={id => {
                  const cloneIDs = [...departmentsID];
                  const newList = cloneIDs.filter(selectId => selectId !== id);
                  setDepartmentsID(newList);
                  dispatch(setFilterDropdown({keyFilter: "departmentsID", dataFilter: newList}))

                  setPageIndex(0);
                  ref.current&&ref.current.resetPaginate();
              }}
              renderItem={(item) => (
                  <p className={"min-w-[300px]"}>{item.text}</p>
              )}
              selectOneByOne={true}
          />

          <DropdownSearchableV2
              ref={datahubRef}
              className={"mr-1 border border-primary-border rounded-lg mb-2"}
              placeholder={"Bộ phận"}
              isMultiple={true}
              allowClearValueSingleInput={true}
              data={listPosition}
              formatItem={{
                  id: "_id",
                  text: "name"
              }}
              onSearchInputChange={debounce(
                  (valueSearch) => setpPositionKeyword(valueSearch),
                  500
              )}
              onchangeValue={item => {
                  const cloneIDs = [...positionsID];
                  cloneIDs.push(item._id);
                  setPositionsID(cloneIDs);
                  dispatch(setFilterDropdown({keyFilter: "positionsID", dataFilter: cloneIDs}))

                  setPageIndex(0);
                  ref.current&&ref.current.resetPaginate();
              }}
              onClearData={() => {
                setPositionsID([]);
                  dispatch(setFilterDropdown({keyFilter: "positionsID", dataFilter: []}))

                  setPageIndex(0);
                  ref.current&&ref.current.resetPaginate();
              }}
              onMultipleRemoveValue={id => {
                  const cloneIDs = [...positionsID];
                  const newList = cloneIDs.filter(selectId => selectId !== id);
                  setPositionsID(newList);
                  dispatch(setFilterDropdown({keyFilter: "positionsID", dataFilter: newList}))

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
              className={"mr-1 border border-primary-border rounded-lg mb-2"}
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
              className={"mr-1 border border-primary-border rounded-lg mb-2"}
              placeholder={"Lương"}
              isMultiple={false}
              allowClearValueSingleInput={true}
              data={CHECK_SALLARY}
              formatItem={{
                  id: "_id",
                  text: "name",
              }}
              onClearData={() => {
                setSalary("");
              }}
              onchangeValue={item => {
                setSalary(item._id);
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
              className={"mr-1 border border-primary-border rounded-lg mb-2"}
              placeholder={"Phép"}
              isMultiple={false}
              allowClearValueSingleInput={true}
              data={CHECK_SALLARY}
              formatItem={{
                  id: "_id",
                  text: "name",
              }}
              onClearData={() => {
                setOnLeaveSalary("");
              }}
              onchangeValue={item => {
                setOnLeaveSalary(item._id);
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
              className={"mr-1 border border-primary-border rounded-lg mb-2"}
              placeholder={"Làm thêm"}
              isMultiple={false}
              allowClearValueSingleInput={true}
              data={CHECK_SALLARY}
              formatItem={{
                  id: "_id",
                  text: "name",
              }}
              onClearData={() => {
                setOvertimeSalary("");
              }}
              onchangeValue={item => {
                setOvertimeSalary(item._id);
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
              className={"mr-1 border border-primary-border rounded-lg mb-2"}
              placeholder={"Phụ cấp"}
              isMultiple={false}
              allowClearValueSingleInput={true}
              data={CHECK_SALLARY}
              formatItem={{
                  id: "_id",
                  text: "name",
              }}
              onClearData={() => {
                setMealAllowance("");
              }}
              onchangeValue={item => {
                setMealAllowance(item._id);
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
              className={"mr-1 border border-primary-border rounded-lg mb-2"}
              placeholder={"Vi phạm"}
              isMultiple={false}
              allowClearValueSingleInput={true}
              data={CHECK_SALLARY}
              formatItem={{
                  id: "_id",
                  text: "name",
              }}
              onClearData={() => {
                setPunishment("");
              }}
              onchangeValue={item => {
                setPunishment(item._id);
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
            className={"mr-1 border border-primary-border rounded-lg mb-2"}
            placeholder={"Template"}
            isMultiple={false}
            allowClearValueSingleInput={true}
            data={listFilesPcm.map((item) => ({
                _id: item._id,
                name: `${item?.name} | ${item?.comment?.content}`,
            }))}
            formatItem={{
                id: "_id",
                text: "name",
            }}
            onSearchInputChange={debounce(
                (valueSearch) => setpTemplateKeyword(valueSearch),
                500
            )}
            onClearData={() => {
              setTemplateID("");
            }}
            onchangeValue={item => {
              setTemplateID(item._id);
                setPageIndex(0);
                ref.current&&ref.current.resetPaginate();
            }}
            renderItem={(item) => (
                <p className={"min-w-[300px]"}>{item.text}</p>
            )}
            selectOneByOne={true}
        />

          {!!salaryIds.length && (
            <div className="w-9 h-9 mb-2 flex items-center justify-center rounded-full cursor-pointer hover:bg-cbs-gray" onClick={openDeleteModal}>
  						<img src={TrashIcon} alt="Trash" />
  					</div>
          )}

          <button
            className={"bg-green-success h-[32px] text-white rounded px-2 mb-2"}
            onClick={() =>
              openModal(
                <div className="t-main-search text-left transition-all transform bg-primary-light shadow-xl rounded my-20 align-top inline-block">
                  <DialogSalaryAddUser
                    title="Thêm nhân sự"
                    onSubmit={handleConfirmSync}
                    projectName={""}
                    assigneeName={""}
                  />
                </div>
              )
            }
          >
            Thêm nhân sự
          </button>

          <PaginateV2
            ref={ref}
            totalRecord={totalRecord}
            totalPages={totalPages}
            limit={limit}
            hasNextPage={hasNextPage}
            isFetching={isFetchSalaryChild}
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
                  "p-2 table-cell box-border border border-gray-300 align-middle bg-gray-100 w-1/8"
                }
              >
                Họ tên
              </div>
              <div
                className={
                  "p-2 table-cell box-border border border-gray-300 align-middle bg-gray-100"
                }
              >
                Phụ cấp trách nhiệm
              </div>
              <div
                className={
                  "p-2 table-cell box-border border border-gray-300 align-middle bg-gray-100"
                }
              >
                Phụ cấp kiêm nhiệm
              </div>
              <div
                className={
                  "p-2 table-cell box-border border border-gray-300 align-middle bg-gray-100"
                }
              >
                Phụ cấp tiền ăn
              </div>
              <div
                className={
                  "p-2 table-cell box-border border border-gray-300 align-middle bg-gray-100"
                }
              >
                Phụ cấp xăng xe, điện thoại
              </div>
              <div
                className={
                  "p-2 table-cell box-border border border-gray-300 align-middle bg-gray-100"
                }
              >
                Phụ cấp trực
              </div>
              <div
                className={
                  "p-2 table-cell box-border border border-gray-300 align-middle bg-gray-100"
                }
              >
                Phụ cấp đi công tác
              </div>
              <div
                className={
                  "p-2 table-cell box-border border border-gray-300 align-middle bg-gray-100"
                }
              >
                Phụ cấp làm ngoài giờ
              </div>
              <div
                className={
                  "p-2 table-cell box-border border border-gray-300 align-middle bg-gray-100"
                }
              >
                Phụ cấp làm Chủ nhật
              </div>
              <div
                className={
                  "p-2 table-cell box-border border border-gray-300 align-middle bg-gray-100"
                }
              >
                Truy lĩnh
              </div>
              <div
                className={
                  "p-2 table-cell box-border border border-gray-300 align-middle bg-gray-100"
                }
              >
                Thưởng lễ, tết
              </div>
              <div
                className={
                  "p-2 table-cell box-border border border-gray-300 align-middle bg-gray-100"
                }
              >
                Phụ cấp độc hại
              </div>
              <div
                className={
                  "p-2 table-cell box-border border border-gray-300 align-middle bg-gray-100"
                }
              >
                Phụ cấp làm ngày nghỉ, ngày lễ
              </div>
              <div
                className={
                  "p-2 table-cell box-border border border-gray-300 align-middle bg-gray-100"
                }
              >
                Phụ cấp khác (1)
              </div>
              <div
                className={
                  "p-2 table-cell box-border border border-gray-300 align-middle bg-gray-100"
                }
              >
                Phụ cấp khác (2)
              </div>
              <div
                className={
                  "p-2 table-cell box-border border border-gray-300 align-middle bg-gray-100"
                }
              >
                Phụ cấp khác (3)
              </div>
              <div
                className={
                  "p-2 table-cell box-border border border-gray-300 align-middle bg-gray-100 font-bold"
                }
              >
                Tổng Phụ cấp
              </div>
              <div
                className={
                  "p-2 table-cell box-border border border-gray-300 align-middle bg-gray-100"
                }
              >
                Chi phí tiền phòng/nhà
              </div>
              <div
                className={
                  "p-2 table-cell box-border border border-gray-300 align-middle bg-gray-100"
                }
              >
                Tiền điện
              </div>
              <div
                className={
                  "p-2 table-cell box-border border border-gray-300 align-middle bg-gray-100"
                }
              >
                Truy thu BHXH
              </div>
              <div
                className={
                  "p-2 table-cell box-border border border-gray-300 align-middle bg-gray-100"
                }
              >
                Chi phí du lịch
              </div>
              <div
                className={
                  "p-2 table-cell box-border border border-gray-300 align-middle bg-gray-100"
                }
              >
                Chi phí khác (1)
              </div>
              <div
                className={
                  "p-2 table-cell box-border border border-gray-300 align-middle bg-gray-100"
                }
              >
                Chi phí khác (2)
              </div>
              <div
                className={
                  "p-2 table-cell box-border border border-gray-300 align-middle bg-gray-100"
                }
              >
                Chi phí khác (3)
              </div>
              <div
                className={
                  "p-2 table-cell box-border border border-gray-300 align-middle bg-gray-100 font-bold"
                }
              >
                Tổng Trả khác
              </div>
              <div
                className={
                  "p-2 table-cell box-border border border-gray-300 align-middle bg-gray-100"
                }
              >
                Ghi chú
              </div>
            </div>
            {salaryInfo?._id && Array.isArray(listSalaryChild) && (
              <DetailMainRow
                salaryParentInfo={salaryInfo}
                listSalaryChild={listSalaryChild}
                onUpdatedSalaryChild={handleUpdatedSalary}
                isFetchSalaryChild={isFetchSalaryChild}
                hasPermission={permissions.hasPermissionCreateUpdate}
                pageIndex={pageIndex}
              />
            )}
          </div>
        </div>

        <ModalLarge
          show={modalShare.isShow}
          toggle={() => setModalShare(prev => ({ ...prev, isShow: !modalShare.isShow }))}
          className="inline-flex flex-col text-black w-full my-8 overflow-hidden text-left align-middle transition-all transform bg-white max-w-[600px] rounded-cbs-md"
        >
          <ModalShare
            toggle={() => setModalShare(prev => ({ ...prev, isShow: !modalShare.isShow }))}
            refetch={refetch}
            expertSalaryID={salaryParentID}
            users={modalShare.users}
            modalType={modalShare.modalType}
            hasPermission={permissions.hasPermissionShare}
          />
        </ModalLarge>
      </div>
    </DeleteSalaryContext.Provider>
  );
};

export default SubSalaryDetailPage;