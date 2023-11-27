import React, { FC, useState, UIEvent, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useQueryListCompany } from "services/hooks/useCompanies";
import moment from "moment";
import parse from "html-react-parser";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "views/pcm/styles/pcm.module.css";

import { DropdownSearchableV2, Loader } from "shareComponents/common";
import TimeRangeDropdown from "shareComponents/common/TimeRangeDropdown";
// import iconChat from "assets/images/icons8-chat-96 1.svg";
// import iconTrash from "assets/images/icons8-delete-96 1.svg";
// import taskUserAvt from "assets/images/task-user.svg";

// import moreIcon from "assets/images/moreIcon.svg";
// import arrowDown from "assets/images/icon-arrowdown.svg";
// import defaultAva from "assets/images/image 166.jpg";
// import iconPdf from "assets/images/icons8-attach.svg";
// import downloadIcon from "assets/images/icons8-attach.svg";
// import mailIcon from "assets/images/icons8-email-96 1.svg";
// import sendMailIcon from "assets/images/icons8-attach.svg";
import userIcon from "assets/images/icon-user-avatar.svg";
import maleUserIcon from "assets/images/icons8-male-user-64.svg";
import categoryIcon from "assets/images/icons8-category-48.svg";
import timeTableIcon from "assets/images/icons8-timetable-48.svg";
import projectIcon from "assets/images/icons8-project-50.svg";
import TriangleDown from "assets/icons/TriangleDown";
import timelineIcon from "assets/images/icons8-timeline-week-48.svg";
import businessBuiding from "assets/images/icons8-business-building-48.svg";
import trashIcon from "assets/images/icons8-trash-96 1.svg";

import iconPhoto from "assets/images/icons8-photo.svg";
import iconFile from "assets/images/icons8-attach.svg";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { ModalZoomView } from "shareComponents/common";
import { ModalConfirm } from "shareComponents/common";
import { ModalErrorDetailItem } from "views/fnb/pages/FnbHomePage/components/ModalErrorDetailItem";

import { useUserSystem } from "services/hooks/users/useUserSystem";
import { useAuth } from "services/hooks/auth/useAuth";
import { useAppSelector } from "redux/reducer";
import {
  useListFileFromSearch,
  useListResponseFromSearch,
  usePcmPlanTaskNotification,
} from "services/hooks/pcm/usePcmDashboardV2";
import { debounce } from "lodash";
import { useQueryListDepartmentsIsMember } from "services/hooks/items/useDepartment";
import { useDispatch } from "react-redux";
import {
  resetFilterDashboard,
  setQueryFile,
  setQueryResponse,
  setQuerySubject,
  setTabActive,
  setTabIndex,
} from "redux/reducer/DashboardV2Slice";
import { useSearchTask } from "services/hooks/useMainSearch";
import { humanFileSize } from "utils/converter";
import PaginateV2 from "shareComponents/common/PaginateV2";
import { useTask } from "services/hooks/useTask";
import { useModal } from "services/hooks/useModal";
import { UpdateStatusDialog } from "./UpdateStatusDialog";
import { ModalCreateResultSearch } from "./ModalCreateResultSearch";
import { ImageProps } from "typings/common";
import { toast } from "react-toastify";
import { useSocket } from "services/hooks/useSocket";
import { APP_KEY } from "utils/constants";

type Props = {
  type?: number;
};
type PaginateHandle = React.ElementRef<typeof PaginateV2>;

export const DashboardV2: FC<Props> = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const [filter, setFilter] = useState("all");
  const { user } = useAuth();
  const [pageIndex, setPageIndex] = useState(0);
  const ref = React.useRef<PaginateHandle>(null);
  const tabIndex = useAppSelector((state) => state.dashboardV2.data.tabIndex);
  const tabActive = useAppSelector((state) => state.dashboardV2.data.tabActive);
  const [showUpdateStatus, setShowUpdateStatus] = useState(false);
  const [isShowImageFullScreen, setIsShowImageFullScreen] = useState(false);
  const { openModal, closeModal } = useModal();
  const { current: socket }: any = useSocket();

  const [defaultState, setDefaultState] = useState({
    mediaID: "",
    images: [] as ImageProps[],
    index: 0,
    createAt: "",
  });

  const StarToggle = () => {
    const [selectStar, setSelectStar] = React.useState(false);
    return (
      <button onClick={() => setSelectStar(!selectStar)} className="h-[16px]">
        {selectStar ? (
          <StarIcon sx={{ color: "#FFCA28", width: 16, height: 16 }} />
        ) : (
          <StarBorderIcon sx={{ color: "#FFCA28", width: 16, height: 16 }} />
        )}
      </button>
    );
  };

  const keywordForResponse = useAppSelector(
    (state) => state.dashboardV2.data.keywordForResponse
  );

  const queryResponse = useAppSelector(
    (state) => state.dashboardV2.data.queryResponse
  );

  const keywordForSubject = useAppSelector(
    (state) => state.dashboardV2.data.keywordForSubject
  );

  const keywordForFile = useAppSelector(
    (state) => state.dashboardV2.data.keywordForFile
  );

  const querySubject = useAppSelector(
    (state) => state.dashboardV2.data.querySubject
  );

  const queryFile = useAppSelector((state) => state.dashboardV2.data.queryFile);

  const [reset, setReset] = useState(false);
  ///// Danh sách công ty
  const [searchCompanyName, setSearchCompanyName] = useState("");
  const {
    data: listCompany,
    hasNextPage: hasNextPageCompany,
    fetchNextPage: fetchNextPageCompany,
  } = useQueryListCompany({ keyword: searchCompanyName });

  const handleScrollCompany = (e: UIEvent<HTMLDivElement>) => {
    const { scrollHeight, scrollTop, clientHeight } = e.currentTarget;
    const bottom = scrollHeight - scrollTop === clientHeight;

    if (bottom && hasNextPageCompany) {
      fetchNextPageCompany();
    }
  };

  // Người tạo
  const [authors, setAuthors] = useState<string[]>([]);

  ////  Danh sách user
  const [searchUserSystem, setSearchUserSystem] = useState("");
  const {
    data: listUsersSystem,
    hasNextPage: hasNextPageUserSystem,
    fetchNextPage: fetchNextPageUserSystem,
  } = useUserSystem({ keyword: searchUserSystem }, true);

  const handleScrollUserSystem = (e: UIEvent<HTMLDivElement>) => {
    const { scrollHeight, scrollTop, clientHeight } = e.currentTarget;
    const bottom = scrollHeight - scrollTop === clientHeight;

    if (bottom && hasNextPageUserSystem) {
      fetchNextPageUserSystem();
    }
  };

  const [fromCreateDate, setFromCreateDate] = useState("1990/01/01");
  const [toCreateDate, settoCreateDate] = useState("2999/12/31");
  ////  Dự án
  const [project, setProject] = useState<string[]>([]);
  const [searchProject, setSearchProject] = useState("");

  const {
    data: listProject,
    fetchNextPage: fetchNextPagePrject,
    hasNextPage: hasNextPageProject,
  } = useQueryListDepartmentsIsMember({
    keyword: searchProject,
    isFetch: true,
  });

  const handleScrollProject = (e: UIEvent<HTMLDivElement>) => {
    const { scrollHeight, scrollTop, clientHeight } = e.currentTarget;
    const bottom = scrollHeight - scrollTop === clientHeight;

    if (bottom && hasNextPageProject) {
      fetchNextPagePrject();
    }
  };

  // Danh sách các response

  const query: any = {
    ...queryResponse,
    keyword: keywordForResponse,
    projectsID: project,
    fromDate: fromCreateDate,
    toDate: toCreateDate,
    isGroup:
      queryResponse.companyOfAuthorsID.length ||
      queryResponse.authorsID.length ||
      queryResponse.projectsID.length ||
      queryResponse.official != 0 ||
      keywordForResponse
        ? "1"
        : "0",
    enabled: tabActive === 1 ? true : false,
  };

  if (filter !== "all") {
    query.read = filter === "read" ? 2 : 1;
  }

  const {
    listDataForResponseWithPager: listDataForResponse,
    isLoadingResponse,
    totalRecord: totalRecordResponse,
    totalPage: totalPageResponse,
    hasNextPageSubject: hasNextPageResponse,
    nextPageSubject: nextPageResponse,
    isFetching: isFetchingResponse,
  } = useListResponseFromSearch(query);

  const [fromExpiredDate, setFromExpiredDate] = useState("1990/01/01");
  const [toExpiredDate, setToExpiredDate] = useState("2999/12/31");
  const [isExpired, setIsExpired] = useState<any>(0);
  const [isParent, setIsParent] = useState<any>(-1);
  const [subtypes, setSubtypes] = useState<string[]>([]);
  const [status, setStatus] = useState<string[]>([]);
  // const [selectStar, setSelectStar] = React.useState(false);

  const querySearchTask: any = {
    keyword: keywordForSubject,
    fromDate: fromExpiredDate,
    toDate: toExpiredDate,
    authorsID: authors,
    projectsID: project,
    isExpired: isExpired,
    isParent: isParent,
    subtypes: subtypes,
    status: status,
    isGroup:
      querySubject.companiesOfAssignee.length ||
      querySubject.assigneesID.length ||
      keywordForSubject
        ? "1"
        : "0",
    ...querySubject,
  };
  if (filter !== "all") {
    querySearchTask.read = filter === "read" ? 2 : 1;
  }

  const {
    listTasksWithPager: listDataForSubject,
    nextPageListTask,
    totalRecord: totalRecordSubject,
    totalPage: totalPageSubject,
    hasNextPage: hasNextPageSubject,
    isLoadingListTask,
    isFetching: isFetchingNextPageSubject,
    refetchListTask,
  } = useSearchTask({
    params: querySearchTask,
    isFetch: tabActive === 2 ? true : false,
  });

  const {
    isLoadingFile,
    nextPageFile,
    totalRecord: totalRecordFile,
    totalPage: totalPageFile,
    listDataForFileWithPager: listDataForFile,
    isFetching: isFetchingFile,
    hasNextPageFile,
  } = useListFileFromSearch({
    keyword: keywordForFile,
    fromDate: fromCreateDate,
    toDate: toCreateDate,
    projectsID: project,
    isGroup:
      queryFile.companyOfAuthorsID.length ||
      queryFile.authorsID.length ||
      keywordForFile
        ? "1"
        : "0",
    ...queryFile,
    enabled: tabActive === 3 ? true : false,
  });

  const onReset = () => {
    setReset(false);
    dispatch(resetFilterDashboard({}));
    setFromCreateDate("1990/01/01");
    settoCreateDate("2999/12/31");
    setProject([]);
    setAuthors([]);
    setIsParent(-1);
    setFromExpiredDate("1990/01/01");
    setToExpiredDate("2999/12/31");
    setIsExpired(0);
    setSubtypes([]);
    setStatus([]);
    setTimeout(() => {
      setReset(true);
    }, 0);
  };

  useEffect(() => {
    return () => {
      onReset();
      dispatch(setTabActive(2));
      dispatch(setTabIndex(1));
    };
  }, []);

  const { refetch: refetchPcmPlanTaskNotification } =
    usePcmPlanTaskNotification({ enabled: false });

  const { updateStatusMultipleAsync, updateTaskAsync } = useTask({
    params: {},
    isFetchInfo: false,
  });

  const onPressUpdateStatus = async () => {
    await updateStatusMultipleAsync({ option: 2 });
    refetchPcmPlanTaskNotification();
    refetchListTask();
  };

  const checkActive = (relateds: string[], user: string) => {
    let result =
      "read border-b-0.5 border-primary-border hover:shadow-md hover:z-2 hover:relative";
    if (relateds && Array.isArray(relateds) && relateds.includes(user)) {
      result =
        "unread border-b-0.5 border-primary-border hover:shadow-md hover:z-2 hover:relative";
    }
    return result;
  };

  const onSaveResultSearch = () => {
    openModal(
      <div
        className={
          "inline-block w-[521px] h-[280px] my-8 overflow-hidden text-left align-middle transition-all transform bg-primary-light shadow-xl"
        }
      >
        <ModalCreateResultSearch condition={querySearchTask} />
      </div>
    );
  };
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  const toggleModalConfirmDeleteTask = (task: any) => {
    openModal(
      <div
        className={
          "inline-block w-[521px] h-[240px] my-8 overflow-hidden text-left align-middle transition-all transform bg-primary-light shadow-xl rounded"
        }
      >
        <ModalConfirm
          title="Bạn có chắc chắn muốn xóa công việc không?"
          description="Bạn sẽ không thể hoàn tác lại công việc vừa xóa"
          onConfirm={handleDeleteTask.bind(null, task)}
          defaultText={false}
          onCancel={closeModal}
        />
      </div>
    );
  };

  const handleDeleteTask = async (task: any) => {
    try {
      closeModal();
      if (!user) return;

      const { error, data } = await updateTaskAsync({
        taskID: task._id,
        usersDeleteID: [user._id],
      });

      if (error) return toast.warn(data?.message);

      refetchListTask();
    } catch (error: any) {
      return toast.error(error.message);
    }
  };

  const handleMarkTask = async (task: any) => {
    try {
      if (!user) return;

      const isMarked = task?.flags?.includes(user?._id) ?? false;
      const dataUpdate = {
        taskID: task._id,
        ...(isMarked ? { flagsRemoves: [user._id] } : { flags: [user._id] }),
      };
      const { error, data } = await updateTaskAsync(dataUpdate);

      if (error) return toast.warn(data?.message);

      refetchListTask();
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
      if (typeof error === "string") toast.error(error);
    }
  };

  useEffect(() => {
    const onEventAddComment = (result: any) => {
      const { data, error } = result;

      if (error || !user) return;
      const { infoObject, app } = data;
      const accessUsers = infoObject?.accessUsers ?? [];

      if (app !== APP_KEY.PCM_PLAN_TASK) return;
      if (!accessUsers.includes(user._id)) return;

      refetchListTask();
    };

    const onEventCreateNewTask = (result: any) => {
      const { data, error } = result;
      if (error || !data.infoTask || !user) return;
      refetchListTask();
    };

    socket?.on("COMMENT_SSC_ADD_COMMENT", onEventAddComment);
    socket?.on("SUBJECT_PCM_SSC_ADD_TASK", onEventCreateNewTask);

    return () => {
      socket?.off("COMMENT_SSC_ADD_COMMENT", onEventAddComment);
      socket?.off("SUBJECT_PCM_SSC_ADD_TASK", onEventCreateNewTask);
    };
  }, [socket]);

  return (
    <div className="t-home flex flex-col h-full overflow-hidden">
      <div className={"sticky top-0 bg-white z-10"}>
        <div className={"filter-bar flex flex-wrap px-4 py-1"}>
          {(isLoadingResponse ||
            isLoadingListTask ||
            isFetchingNextPageSubject ||
            isFetchingResponse ||
            isLoadingFile ||
            isFetchingFile) && <Loader className="border-primary" />}
          {tabIndex === 2 && (
            <DropdownSearchableV2
              reset={reset}
              className={"mr-2 border border-primary-border rounded-lg mb-2"}
              placeholder={"Đơn vị thực hiện"}
              countBadge={querySubject.companiesOfAssignee.length}
              showTriangle={true}
              isMultiple={true}
              selectOneByOne={true}
              onchangeValue={(value) => {
                if (
                  !querySubject.companiesOfAssignee?.includes?.(
                    value.id as string
                  )
                ) {
                  const newData: any = [
                    ...querySubject.companiesOfAssignee,
                    value.id,
                  ];
                  dispatch(
                    setQuerySubject({
                      ...querySubject,
                      companiesOfAssignee: newData,
                    })
                  );
                }
                setSearchCompanyName("");
                dispatch(setTabActive(tabIndex));
                setPageIndex(0);
                ref.current && ref.current.resetPaginate();
              }}
              onMultipleRemoveValue={(id: any) => {
                const newList = querySubject.companiesOfAssignee.filter(
                  (item: any) => item !== id
                );
                dispatch(
                  setQuerySubject({
                    ...querySubject,
                    companiesOfAssignee: newList,
                  })
                );
              }}
              onClearData={() =>
                dispatch(
                  setQuerySubject({
                    ...querySubject,
                    companiesOfAssignee: [],
                  })
                )
              }
              onScroll={handleScrollCompany}
              onSearchInputChange={debounce(
                (value) => setSearchCompanyName(value),
                500
              )}
              data={listCompany.map((company) => ({
                label: company.name,
                value: company._id,
              }))}
              formatItem={{
                id: "value",
                text: "label",
              }}
              renderItem={(item) => (
                <p className={"min-w-[300px]"}>{item.text}</p>
              )}
              prefixIcon={
                <img className={"mr-2"} src={businessBuiding} alt={"icon"} />
              }
            />
          )}

          {tabIndex === 2 && (
            <DropdownSearchableV2
              selectOneByOne={true}
              reset={reset}
              className={"mr-2 border border-primary-border rounded-lg mb-2"}
              placeholder={"Người thực hiện"}
              showTriangle={true}
              isMultiple={true}
              countBadge={querySubject.assigneesID.length}
              onchangeValue={(value) => {
                if (!querySubject.assigneesID?.includes?.(value.id as string)) {
                  const newData: any = [...querySubject.assigneesID, value.id];
                  dispatch(
                    setQuerySubject({
                      ...querySubject,
                      assigneesID: newData,
                    })
                  );
                }
                setSearchUserSystem("");
                dispatch(setTabActive(tabIndex));
                setPageIndex(0);
                ref.current && ref.current.resetPaginate();
              }}
              onMultipleRemoveValue={(id: any) => {
                const newList = querySubject.assigneesID.filter(
                  (item: any) => item !== id
                );
                dispatch(
                  setQuerySubject({
                    ...querySubject,
                    assigneesID: newList,
                  })
                );
              }}
              onClearData={() =>
                dispatch(
                  setQuerySubject({
                    ...querySubject,
                    assigneesID: [],
                  })
                )
              }
              onSearchInputChange={debounce(
                (value) => setSearchUserSystem(value),
                500
              )}
              onScroll={handleScrollUserSystem}
              renderSelectedItem={(item: any) => (
                <div className="flex items-center">
                  <img
                    alt="Thumbnail"
                    src={item.imageUrl || userIcon}
                    className="mr-1 w-6 h-6 rounded-full"
                  />
                  <p
                    style={{
                      textOverflow: "ellipsis",
                      maxWidth: "100%",
                      minWidth: 0,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      flex: "1 1 auto",
                    }}
                  >
                    {item.text}
                  </p>
                </div>
              )}
              data={listUsersSystem.map((item) => ({
                label: item.bizfullname || item.fullname,
                value: item._id,
                imgUrl: item.imgUrl,
                email: item.email,
              }))}
              formatItem={{
                id: "value",
                text: "label",
                imageUrl: "imgUrl",
              }}
              renderItem={(item) => (
                <div className={"flex"}>
                  <div
                    className={
                      "w-[44px] h-[44px] flex items-center justify-center rounded-full bg-accent text-white text-2xl font-bold"
                    }
                  >
                    {item.label.charAt(0)}
                  </div>
                  <div className={"flex-1 ml-2"}>
                    <p className={"truncate"}>{item.label}</p>
                    <p className={"text-primary-gray truncate"}>{item.email}</p>
                  </div>
                </div>
              )}
              prefixIcon={
                <img className={"mr-2"} src={maleUserIcon} alt={"icon"} />
              }
            />
          )}

          {tabIndex === 2 && (
            <TimeRangeDropdown
              className={
                "mr-2 border border-primary-border rounded-lg mb-2 p-1 pl-2 "
              }
              placeholder={"Thời hạn"}
              iconBack={<TriangleDown />}
              iconFront={<img src={timelineIcon} alt={"----"} />}
              onValueChange={(val) => {
                setFromExpiredDate(val.fromDate);
                setToExpiredDate(val.toDate);
                dispatch(setTabActive(tabIndex));
              }}
              options={[
                {
                  text: "Tất cả",
                  fromDate: "1990/01/01",
                  toDate: "2999/12/31",
                },
                {
                  text: "1 tuần tới",
                  fromDate: moment().format("YYYY/MM/DD 00:00"),
                  toDate: moment(
                    moment().add(7, "days").calendar(),
                    "DD-MM-YYYY"
                  ).format("YYYY/MM/DD 23:59"),
                },
                {
                  text: "> 7 ngày tiếp theo",
                  fromDate: moment(
                    moment().add(7, "days").calendar(),
                    "DD-MM-YYYY"
                  ).format("YYYY/MM/DD"),
                  toDate: "2999/12/31",
                },
              ]}
            />
          )}

          {tabIndex === 3 && (
            <DropdownSearchableV2
              selectOneByOne={true}
              reset={reset}
              countBadge={queryFile.companyOfAuthorsID.length}
              className={"mr-2 border border-primary-border rounded-lg mb-2"}
              placeholder={"Đơn vị tạo"}
              onchangeValue={(value) => {
                dispatch(setTabActive(tabIndex));
                if (
                  !queryFile.companyOfAuthorsID?.includes?.(value.id as string)
                ) {
                  const newData: any = [
                    ...queryFile.companyOfAuthorsID,
                    value.id,
                  ];
                  dispatch(
                    setQueryFile({
                      ...queryFile,
                      companyOfAuthorsID: newData,
                    })
                  );
                }
                setSearchCompanyName("");
                setPageIndex(0);
                ref.current && ref.current.resetPaginate();
              }}
              onMultipleRemoveValue={(id: any) => {
                const newList = queryFile.companyOfAuthorsID.filter(
                  (item: any) => item !== id
                );
                dispatch(
                  setQueryFile({
                    ...queryFile,
                    companyOfAuthorsID: newList,
                  })
                );
              }}
              onClearData={() =>
                dispatch(
                  setQueryFile({
                    ...queryFile,
                    companyOfAuthorsID: [],
                  })
                )
              }
              onScroll={handleScrollCompany}
              onSearchInputChange={debounce(
                (value) => setSearchCompanyName(value),
                500
              )}
              showTriangle={true}
              isMultiple={true}
              data={listCompany.map((company) => ({
                label: company.name,
                value: company._id,
              }))}
              formatItem={{
                id: "value",
                text: "label",
              }}
              renderItem={(item) => (
                <p className={"min-w-[300px]"}>{item.text}</p>
              )}
              prefixIcon={
                <img className={"mr-2"} src={businessBuiding} alt={"icon"} />
              }
            />
          )}

          {(tabIndex === 2 || tabIndex === 3) && (
            <DropdownSearchableV2
              selectOneByOne={true}
              reset={reset}
              countBadge={
                tabIndex === 3
                  ? (queryFile.authorsID && queryFile.authorsID.length) || 0
                  : 0
              }
              className={"mr-2 border border-primary-border rounded-lg mb-2"}
              placeholder={"Người tạo"}
              showTriangle={true}
              isMultiple={true}
              onchangeValue={(value) => {
                dispatch(setTabActive(tabIndex));
                if (tabIndex === 3) {
                  if (!queryFile.authorsID?.includes?.(value.id as string)) {
                    const newData: any = [...queryFile.authorsID, value.id];
                    dispatch(
                      setQueryFile({
                        ...queryFile,
                        authorsID: newData,
                      })
                    );
                  }
                } else {
                  if (!authors?.includes?.(value.id as string)) {
                    const newData: any = [...authors, value.id];
                    setAuthors(newData);
                  }
                }
                setSearchUserSystem("");
                setPageIndex(0);
                ref.current && ref.current.resetPaginate();
              }}
              onMultipleRemoveValue={(id: any) => {
                if (tabIndex === 3) {
                  const newList = queryFile.authorsID.filter(
                    (item: any) => item !== id
                  );
                  dispatch(
                    setQueryFile({
                      ...queryFile,
                      authorsID: newList,
                    })
                  );
                } else {
                  const newList = authors.filter((item: any) => item !== id);
                  setAuthors(newList);
                }
              }}
              onClearData={() => setAuthors([])}
              onSearchInputChange={debounce(
                (value) => setSearchUserSystem(value),
                500
              )}
              onScroll={handleScrollUserSystem}
              renderSelectedItem={(item: any) => (
                <div className="flex items-center">
                  <img
                    alt="Thumbnail"
                    src={item.imageUrl || userIcon}
                    className="mr-1 w-6 h-6 rounded-full"
                  />
                  <p
                    style={{
                      textOverflow: "ellipsis",
                      maxWidth: "100%",
                      minWidth: 0,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      flex: "1 1 auto",
                    }}
                  >
                    {item.text}
                  </p>
                </div>
              )}
              data={listUsersSystem.map((item) => ({
                label: item.bizfullname || item.fullname,
                value: item._id,
                imgUrl: item.imgUrl,
                email: item.email,
              }))}
              formatItem={{
                id: "value",
                text: "label",
                imageUrl: "imgUrl",
              }}
              renderItem={(item) => (
                <div className={"flex"}>
                  <div
                    className={
                      "w-[44px] h-[44px] flex items-center justify-center rounded-full bg-accent text-white text-2xl font-bold"
                    }
                  >
                    {item.label.charAt(0)}
                  </div>
                  <div className={"flex-1 ml-2"}>
                    <p className={"truncate"}>{item.label}</p>
                    <p className={"text-primary-gray truncate"}>{item.email}</p>
                  </div>
                </div>
              )}
              prefixIcon={
                <img className={"mr-2"} src={maleUserIcon} alt={"icon"} />
              }
            />
          )}

          {tabIndex === 1 && (
            <DropdownSearchableV2
              reset={reset}
              selectOneByOne={true}
              countBadge={queryResponse.companyOfAuthorsID.length}
              className={"mr-2 border border-primary-border rounded-lg mb-2"}
              // placeholder={"Đơn vị tạo phản hồi"}
              placeholder={t("homepage:companyAuthor")}
              onchangeValue={(value) => {
                if (
                  !queryResponse.companyOfAuthorsID?.includes?.(
                    value.id as string
                  )
                ) {
                  const newData: any = [
                    ...queryResponse.companyOfAuthorsID,
                    value.id,
                  ];
                  dispatch(
                    setQueryResponse({
                      ...queryResponse,
                      companyOfAuthorsID: newData,
                    })
                  );
                }
                setSearchCompanyName("");
                dispatch(setTabActive(tabIndex));
                setPageIndex(0);
                ref.current && ref.current.resetPaginate();
              }}
              onMultipleRemoveValue={(id: any) => {
                const newList = queryResponse.companyOfAuthorsID.filter(
                  (item: any) => item !== id
                );
                dispatch(
                  setQueryResponse({
                    ...queryResponse,
                    companyOfAuthorsID: newList,
                  })
                );
              }}
              onClearData={() =>
                dispatch(
                  setQueryResponse({
                    ...queryResponse,
                    companyOfAuthorsID: [],
                  })
                )
              }
              onScroll={handleScrollCompany}
              onSearchInputChange={debounce(
                (value) => setSearchCompanyName(value),
                500
              )}
              showTriangle={true}
              isMultiple={true}
              data={listCompany.map((company) => ({
                label: company.name,
                value: company._id,
              }))}
              formatItem={{
                id: "value",
                text: "label",
              }}
              renderItem={(item) => (
                <p className={"min-w-[300px]"}>{item.text}</p>
              )}
              prefixIcon={
                <img className={"mr-2"} src={businessBuiding} alt={"icon"} />
              }
            />
          )}

          {tabIndex === 1 && (
            <DropdownSearchableV2
              selectOneByOne={true}
              reset={reset}
              countBadge={queryResponse.authorsID.length}
              className={"mr-2 border border-primary-border rounded-lg mb-2"}
              placeholder={t("homepage:author")}
              showTriangle={true}
              isMultiple={true}
              onchangeValue={(value) => {
                if (!queryResponse.authorsID?.includes?.(value.id as string)) {
                  const newData: any = [...queryResponse.authorsID, value.id];
                  dispatch(
                    setQueryResponse({
                      ...queryResponse,
                      authorsID: newData,
                    })
                  );
                }
                setSearchUserSystem("");
                dispatch(setTabActive(tabIndex));
                setPageIndex(0);
                ref.current && ref.current.resetPaginate();
              }}
              onMultipleRemoveValue={(id: any) => {
                const newList = queryResponse.authorsID.filter(
                  (item: any) => item !== id
                );
                dispatch(
                  setQueryResponse({
                    ...queryResponse,
                    authorsID: newList,
                  })
                );
              }}
              onClearData={() =>
                dispatch(
                  setQueryResponse({
                    ...queryResponse,
                    authorsID: [],
                  })
                )
              }
              onSearchInputChange={debounce(
                (value) => setSearchUserSystem(value),
                500
              )}
              onScroll={handleScrollUserSystem}
              renderSelectedItem={(item: any) => (
                <div className="flex items-center">
                  <img
                    alt="Thumbnail"
                    src={item.imageUrl || userIcon}
                    className="mr-1 w-6 h-6 rounded-full"
                  />
                  <p
                    style={{
                      textOverflow: "ellipsis",
                      maxWidth: "100%",
                      minWidth: 0,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      flex: "1 1 auto",
                    }}
                  >
                    {item.text}
                  </p>
                </div>
              )}
              data={listUsersSystem.map((item) => ({
                label: item.bizfullname || item.fullname,
                value: item._id,
                imgUrl: item.imgUrl,
                email: item.email,
              }))}
              formatItem={{
                id: "value",
                text: "label",
                imageUrl: "imgUrl",
              }}
              renderItem={(item) => (
                <div className={"flex"}>
                  <div
                    className={
                      "w-[44px] h-[44px] flex items-center justify-center rounded-full bg-accent text-white text-2xl font-bold"
                    }
                  >
                    {item.label.charAt(0)}
                  </div>
                  <div className={"flex-1 ml-2"}>
                    <p className={"truncate"}>{item.label}</p>
                    <p className={"text-primary-gray truncate"}>{item.email}</p>
                  </div>
                </div>
              )}
              prefixIcon={
                <img className={"mr-2"} src={maleUserIcon} alt={"icon"} />
              }
            />
          )}

          {(tabIndex === 1 || tabIndex === 2 || tabIndex === 3) && (
            <DropdownSearchableV2
              selectOneByOne={true}
              reset={reset}
              className={"mr-2 border border-primary-border rounded-lg mb-2"}
              placeholder={t("homepage:project")}
              prefixIcon={
                <img className={"mr-2"} src={projectIcon} alt={"icon"} />
              }
              isMultiple={true}
              onchangeValue={(value) => {
                if (!project?.includes?.(value.id as string)) {
                  const newData: any = [...project, value.id];
                  setProject(newData);
                }
                setSearchProject("");
                dispatch(setTabActive(tabIndex));
                setPageIndex(0);
                ref.current && ref.current.resetPaginate();
              }}
              onMultipleRemoveValue={(id: any) => {
                const newList = project.filter((item: any) => item !== id);
                setProject(newList);
              }}
              onClearData={() => setProject([])}
              onSearchInputChange={debounce(
                (value) => setSearchProject(value),
                500
              )}
              onScroll={handleScrollProject}
              data={listProject.map((item) => ({
                label: `${item.sign}.${item.name}`,
                value: item._id,
              }))}
              formatItem={{
                id: "value",
                text: "label",
              }}
              renderItem={(item) => (
                <p className={"min-w-[300px]"}>{item.text}</p>
              )}
            />
          )}

          {(tabIndex === 1 || tabIndex === 3) && (
            <TimeRangeDropdown
              className={
                "mr-2 border border-primary-border rounded-lg mb-2 p-1 pl-2 "
              }
              placeholder={t("homepage:timecCreated")}
              iconBack={<TriangleDown />}
              iconFront={<img src={timelineIcon} alt={"----"} />}
              onValueChange={(val) => {
                setFromCreateDate(val.fromDate);
                settoCreateDate(val.toDate);
                dispatch(setTabActive(tabIndex));
              }}
              options={[
                {
                  text: "Tất cả",
                  fromDate: "",
                  toDate: "",
                },
                {
                  text: "Ngày nay",
                  fromDate: moment().format("YYYY-MM-DD 00:00"),
                  toDate: moment().format("YYYY-MM-DD 23:59"),
                },
                {
                  text: "Cách đây 1 tuần",
                  fromDate: moment()
                    .subtract(7, "days")
                    .format("YYYY-MM-DD 00:00"),
                  toDate: moment().format("YYYY-MM-DD HH:mm"),
                },
                {
                  text: "Cách đây 1 tháng",
                  fromDate: moment()
                    .subtract(1, "months")
                    .format("YYYY-MM-DD 00:00"),
                  toDate: moment().format("YYYY-MM-DD HH:mm"),
                },
              ]}
            />
          )}

          {tabIndex === 2 && (
            <DropdownSearchableV2
              selectOneByOne={true}
              disableSearch={true}
              reset={reset}
              className={"mr-2 border border-primary-border rounded-lg mb-2"}
              placeholder={"Quá hạn"}
              prefixIcon={
                <img className={"mr-2"} src={timeTableIcon} alt={"icon"} />
              }
              onchangeValue={(val) => {
                setIsExpired(val.id);
                dispatch(setTabActive(tabIndex));
                setPageIndex(0);
                ref.current && ref.current.resetPaginate();
              }}
              data={[
                {
                  id: 0,
                  text: "Tất cả",
                },
                {
                  id: 1,
                  text: "Đã quá hạn",
                },
                {
                  id: 2,
                  text: "Chưa quá hạn",
                },
              ]}
            />
          )}
          {tabIndex === 2 && (
            <DropdownSearchableV2
              selectOneByOne={true}
              reset={reset}
              className={"mr-2 border border-primary-border rounded-lg mb-2"}
              placeholder={"Trạng thái"}
              prefixIcon={
                <img className={"mr-2"} src={categoryIcon} alt={"icon"} />
              }
              isMultiple={true}
              disableSearch={true}
              onchangeValue={(value) => {
                if (!status.includes?.(value.id as string)) {
                  const newData: any = [...status, value.id];
                  setStatus(newData);
                }
                dispatch(setTabActive(tabIndex));
                setPageIndex(0);
                ref.current && ref.current.resetPaginate();
              }}
              onMultipleRemoveValue={(id: any) => {
                const newList = status.filter((item) => item !== id);
                setStatus(newList);
              }}
              onClearData={() => setStatus([])}
              data={[
                {
                  id: 1,
                  text: "Khởi tạo, sắp triển khai",
                },
                {
                  id: 2,
                  text: "Đang triển khai",
                },
                {
                  id: 3,
                  text: "Hoàn thành",
                },
                {
                  id: 4,
                  text: "Treo lại",
                },
                {
                  id: 5,
                  text: "Chờ người khác giải quyết",
                },
                {
                  id: 6,
                  text: "Tiếp tục theo dõi",
                },
                // {
                //   id: 7,
                //   text: "Khóa đóng",
                // },
              ]}
            />
          )}
          {tabIndex === 1 && (
            <DropdownSearchableV2
              selectOneByOne={true}
              reset={reset}
              className={"mr-2 border border-primary-border rounded-lg mb-2"}
              placeholder={t("homepage:category")}
              prefixIcon={
                <img className={"mr-2"} src={categoryIcon} alt={"icon"} />
              }
              isMultiple={false}
              disableSearch={true}
              data={[
                {
                  id: 0,
                  text: "Tất cả",
                },
                {
                  id: 1,
                  text: "Chính thức",
                },
                {
                  id: 2,
                  text: "Không chính thức",
                },
              ]}
              onchangeValue={(value) => {
                dispatch(
                  setQueryResponse({
                    ...queryResponse,
                    official: value.id,
                  })
                );
                dispatch(setTabActive(tabIndex));
                setPageIndex(0);
                ref.current && ref.current.resetPaginate();
              }}
            />
          )}
          {tabIndex === 2 && (
            <DropdownSearchableV2
              selectOneByOne={true}
              reset={reset}
              className={"mr-2 border border-primary-border rounded-lg mb-2"}
              placeholder={"Loại"}
              prefixIcon={
                <img className={"mr-2"} src={categoryIcon} alt={"icon"} />
              }
              isMultiple={true}
              disableSearch={true}
              onchangeValue={(value) => {
                if (!subtypes.includes?.(value.id as string)) {
                  const newData: any = [...subtypes, value.id];
                  setSubtypes(newData);
                }
                dispatch(setTabActive(tabIndex));
                setPageIndex(0);
                ref.current && ref.current.resetPaginate();
              }}
              onMultipleRemoveValue={(id: any) => {
                const newList = subtypes.filter((item) => item !== id);
                setSubtypes(newList);
              }}
              onClearData={() => setSubtypes([])}
              data={[
                {
                  id: 0,
                  text: "Việc thông thường",
                },
                {
                  id: 1,
                  text: "Đề nghị cấp thông tin",
                },
                {
                  id: 2,
                  text: "Đề nghị phê duyệt",
                },
                {
                  id: 3,
                  text: "Thanh toán",
                },
                {
                  id: 4,
                  text: "Thầu và mua sắm",
                },
                {
                  id: 5,
                  text: "Nghiệm thu",
                },
                {
                  id: 6,
                  text: "Đề nghị sửa chữa",
                },
                {
                  id: 7,
                  text: "Đề nghị thay đổi",
                },
                {
                  id: 8,
                  text: "Đề nghị thực hiện",
                },
                {
                  id: 9,
                  text: "Báo cáo",
                },
                {
                  id: 10,
                  text: "Tiến độ, kế hoạch",
                },
                {
                  id: 11,
                  text: "Họp",
                },
              ]}
            />
          )}

          {tabIndex === 2 && (
            <DropdownSearchableV2
              selectOneByOne={true}
              disableSearch={true}
              reset={reset}
              className={"mr-2 border border-primary-border rounded-lg mb-2"}
              placeholder={"Cấp"}
              prefixIcon={
                <img className={"mr-2"} src={categoryIcon} alt={"icon"} />
              }
              onchangeValue={(val) => {
                setIsParent(val.id);
                dispatch(setTabActive(tabIndex));
                setPageIndex(0);
                ref.current && ref.current.resetPaginate();
              }}
              data={[
                {
                  id: 0,
                  text: "Tất cả",
                },
                {
                  id: 1,
                  text: "Việc cha",
                },
                {
                  id: 2,
                  text: "Việc con",
                },
              ]}
            />
          )}

          <button
            className={"bg-gray-300 rounded text-white px-2 h-[32px] mb-2"}
            onClick={onReset}
          >
            Reset
          </button>

          {tabIndex === 2 && (
            <button
              className={
                "bg-green-success rounded text-white px-2 h-[32px] ml-2"
              }
              onClick={onSaveResultSearch}
            >
              Lưu
            </button>
          )}
        </div>
        <div
          className={"header-table flex px-4 w-full top-0 bg-white mb-1 pb-2"}
        >
          <div className={"flex gap-7 items-center justify-center mr-2"}>
            <div className="flex gap-2 items-center">
              {/* <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="checkAll"
                style={{ width: "14px", height: "14px" }}
              /> */}
              {/* <div>
                <button onClick={() => setpopBox1(!popBox1)} className="relative w-[20px] h-[20px]">
                  <img src={arrowDown} className="m-auto" />
                </button>
                <div
                  className={"w-auto rounded flex flex-col bg-white absolute " + (popBox1 ? "block" : "hidden")}
                  style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}
                >
                  <button className="w-full px-9 py-2 text-left hover:bg-cbs-gray">
                    Tất cả
                  </button>
                  <button className="w-full px-9 py-2 text-left hover:bg-cbs-gray">
                    Bỏ chọn tất cả
                  </button>
                  <button className="w-full px-9 py-2 text-left hover:bg-cbs-gray">
                    Chủ đề đã đọc
                  </button>
                  <button className="w-full px-9 py-2 text-left hover:bg-cbs-gray">
                    Chủ đề chưa đọc
                  </button>
                  <button className="w-full px-9 py-2 text-left hover:bg-cbs-gray">
                    Chủ đề quan tâm
                  </button>
                  <button className="w-full px-9 py-2 text-left hover:bg-cbs-gray">
                    Chủ đề không quan tâm
                  </button>
                </div>
              </div> */}
            </div>
            {/* <div className="flex gap-7 items-center">
              <button><img src={trashIcon} alt="" /></button>
              <button><img src={mailIcon} alt="" /></button>
              <button onClick={() => setpopBox2(!popBox2)} className="relative w-[20px] h-[20px]">
                <img src={moreIcon} className="m-auto" />
                <div
                  className={"w-[250px] rounded flex flex-col bg-white absolute " + (popBox2 ? "block" : "hidden")}
                  style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}
                >
                  <button className="w-full px-9 py-2 text-left hover:bg-cbs-gray">
                    Đánh dấu là đã đọc
                  </button>
                  <button className="w-full px-9 py-2 text-left hover:bg-cbs-gray">
                    Đánh dấu là quan trọng
                  </button>
                  <button className="w-full px-9 py-2 text-left hover:bg-cbs-gray">
                    Đánh dấu quan tâm
                  </button>
                  <button className="w-full px-9 py-2 text-left hover:bg-cbs-gray">
                    Chủ đề chưa đọc
                  </button>
                  <button className="w-full px-9 py-2 text-left hover:bg-cbs-gray">
                    Chủ đề quan tâm
                  </button>
                  <button className="w-full px-9 py-2 text-left hover:bg-cbs-gray">
                    Chủ đề không quan tâm
                  </button>
                </div>
              </button>
            </div> */}
          </div>
          <button
            onClick={() => setFilter("all")}
            className={
              "py-1 px-3 mx-1 rounded-full border border-primary-border " +
              (filter === "all"
                ? "text-white bg-cbs-secondary border-none"
                : "text-primary-gray bg-white")
            }
          >
            {t("homepage:all")}
          </button>
          <button
            onClick={() => setFilter("unread")}
            className={
              "py-1 px-3 mx-1 rounded-full border border-primary-border " +
              (filter === "unread"
                ? "text-white bg-cbs-secondary border-none"
                : "text-primary-gray bg-white")
            }
          >
            {t("homepage:unread")}
          </button>
          <button
            onClick={() => setFilter("read")}
            className={
              "py-1 px-3 mx-1 rounded-full border border-primary-border " +
              (filter === "read"
                ? "text-white bg-cbs-secondary border-none"
                : "text-primary-gray bg-white")
            }
          >
            {t("homepage:read")}
          </button>
          <button
            className={"text-primary mx-2"}
            onClick={() => setShowUpdateStatus(true)}
          >
            {t("homepage:markAsRead")}
          </button>
              <button
                className="text-cbs-schedule-nextweek"
                onClick={() =>
                  openModal(
                    <div className=" text-left transition-all transform bg-primary-light shadow-xl rounded my-16 align-top inline-block" style={{ width: "640px" }}>
                      <ModalErrorDetailItem defaultValues={{ orderID: '' }} />
                    </div>
                  )
                }
              >
                Gán thành tích/vi phạm
              </button>
          {/* <button className={"flex items-center justify-center mx-3"}>
            <img src={downloadIcon} alt={"-----"} />
          </button>
          <button className={"flex items-center justify-center mx-3"}>
            <img src={sendMailIcon} alt={"-----"} />
          </button> */}
          <div className={"flex-1 flex items-center justify-end"}>
            <PaginateV2
              ref={ref}
              totalRecord={
                tabActive === 1
                  ? totalRecordResponse
                  : tabActive === 2
                  ? totalRecordSubject
                  : totalRecordFile
              }
              totalPages={
                tabActive === 1
                  ? totalPageResponse
                  : tabActive === 2
                  ? totalPageSubject
                  : totalPageFile
              }
              limit={20}
              hasNextPage={
                tabActive === 1
                  ? hasNextPageResponse
                  : tabActive === 2
                  ? hasNextPageSubject
                  : hasNextPageFile
              }
              isFetching={
                tabActive === 1
                  ? isFetchingResponse
                  : tabActive === 2
                  ? isFetchingNextPageSubject
                  : isFetchingFile
              }
              nextPageAction={() => {
                switch (tabActive) {
                  case 1:
                    nextPageResponse();
                    break;
                  case 2:
                    nextPageListTask();
                    break;
                  case 3:
                    nextPageFile();
                    break;
                  default:
                    break;
                }
                setPageIndex((oldState) => oldState + 1);
              }}
              prevPageAction={() => {
                setPageIndex((oldState) => oldState - 1);
              }}
            />
          </div>
        </div>
        {/* <div className="flex justify-between mb-4 border-t-0.5 border-b-0.5 border-cbs-border">
          <div className="flex gap-3 items-center py-1">
            <a href="#"><img src={defaultAva} alt="" /></a>
            <div className="flex gap-3 py-1">
              <button className="flex gap-5 items-center px-4 rounded-md text-white bg-primary">
                <span>Việc của tôi</span>
                <span className="font-bold text-[18px]">100</span>
              </button>
              <button className="flex gap-5 items-center px-4 rounded-md text-white bg-cbs-secondary">
                <span>Quan trọng</span>
                <span className="font-bold text-[18px]">15</span>
              </button>
              <button className="flex gap-5 items-center px-4 rounded-md text-white bg-cbs-schedule-expired">
                <span>Quá hạn</span>
                <span className="font-bold text-[18px]">15</span>
              </button>
              <button className="flex gap-5 items-center px-4 rounded-md text-white bg-cbs-schedule-nextweek">
                <span>Tuần tới</span>
                <span className="font-bold text-[18px]">15</span>
              </button>
              <button className="flex gap-5 items-center px-4 rounded-md text-white bg-cbs-schedule-after-7days">
                <span>Sau tuần tới</span>
                <span className="font-bold text-[18px]">15</span>
              </button>
            </div>
          </div>
          <div className="flex">
            <div className="flex flex-col border-l-0.5 border-cbs-border text-center mx-auto" style={{ width: "80px" }}>
              <span className="text-cbs-subtext">Công ty</span>
              <span className="font-bold text-[18px]">123</span>
            </div>
            <div className="flex flex-col border-l-0.5 border-cbs-border text-center mx-auto" style={{ width: "80px" }}>
              <span className="text-cbs-subtext">Đối tác</span>
              <span className="font-bold text-[18px]">123</span>
            </div>
          </div>
        </div> */}
      </div>
      <div className={"flex-1 overflow-y-auto"}>
        <table className={"w-full table-fixed tasks"}>
          {tabActive === 1 ? (
            <tbody>
              {(listDataForResponse[pageIndex] ?? []).map(
                (item: any, index: number) => {
                  return (
                    <tr
                      key={index}
                      className={
                        "read border-b-0.5 border-primary-border hover:shadow-md hover:z-2 hover:relative"
                      }
                    >
                      <td className={"w-[100px]"}>
                        <div
                          className={
                            "flex gap-4 items-center justify-center py-4"
                          }
                        >
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="check"
                            style={{
                              width: "16px",
                              height: "16px",
                              marginTop: "5px",
                            }}
                          />
                          <StarToggle />
                        </div>
                      </td>
                      <td className={"w-[55px]"}>
                        <Link to={"/pcm/detail/" + item.task?._id}>
                          <div className={"py-2"}>
                            <img
                              src={
                                item?.author?.image
                                  ? `${process.env.REACT_APP_URL_S3_USER}/${item?.author?.image}`
                                  : userIcon
                              }
                              alt={"avatar"}
                              className={
                                "w-[36px] h-[36px] max-w-[36px] max-h-[36px] min-w-[36px] min-h-[36px] rounded-full overflow-hidden"
                              }
                              aria-owns={
                                open ? "mouse-over-popover" : undefined
                              }
                              aria-haspopup="true"
                              onMouseEnter={handlePopoverOpen}
                              onMouseLeave={handlePopoverClose}
                            />
                          </div>
                        </Link>
                      </td>
                      <td className={"w-[170px]"}>
                        <Link to={"/pcm/detail/" + item.task?._id}>
                          <div className={"user-infor py-2"}>
                            <p
                              className={"truncate user-infor-name text-[14px]"}
                            >
                              {item.author.fullname}
                            </p>
                            <span className={"text-xs text-primary-gray py-2"}>
                              {item.task.related.length}{" "}
                              {t("homepage:markAsRead")}
                            </span>
                          </div>
                        </Link>
                      </td>
                      <td className={"w-td-dashboard"}>
                        <Link to={"/pcm/detail/" + item.task?._id}>
                          <p className={"task-title truncate text-[14px] mt-2"}>
                            {item.project?.sign}.{item.task?.name}
                          </p>
                          <p
                            className={
                              "crop-text truncate text-xs text-primary-gray py-2"
                            }
                          >
                            {subContentHtml(item.content)}
                          </p>
                        </Link>
                      </td>
                      <td className={"w-[100px]"}>
                        <div
                          className={
                            "task-date whitespace-nowrap py-2 text-right pr-4"
                          }
                        >
                          {showTime(item.createAt)}
                        </div>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          ) : (
            <></>
          )}

          {tabActive === 2 ? (
            <tbody>
              {(listDataForSubject[pageIndex] ?? []).map(
                (item: any, index: number) => {
                  return (
                    <tr
                      key={index}
                      className={
                        checkActive(item.news, `${user?._id}`) + " group"
                      }
                    >
                      <td className={"w-[60px]"}>
                        <div
                          className={
                            "flex gap-4 items-center justify-center py-4 px-1"
                          }
                        >
                          {/* <input
                            className="form-check-input mt-[5px]"
                            type="checkbox"
                            value=""
                            style={{ width: "13px", height: "13px", marginTop: "5px" }}
                          /> */}
                          <button onClick={handleMarkTask.bind(null, item)}>
                            {item?.flags?.includes(user?._id) ?? false ? (
                              <StarIcon
                                sx={{ color: "#FFCA28", width: 20, height: 20 }}
                              />
                            ) : (
                              <StarBorderIcon
                                sx={{ color: "#FFCA28", width: 20, height: 20 }}
                              />
                            )}
                          </button>
                        </div>
                      </td>
                      <td className={"w-[55px]"}>
                        <Link to={"/pcm/detail/" + item._id}>
                          <div className={"py-2"}>
                            <img
                              src={`${process.env.REACT_APP_URL_S3_USER}/${
                                item.lastComment
                                  ? item.lastComment.author.image
                                  : item.author.image
                              }`}
                              alt={"avatar"}
                              className={
                                "w-[36px] h-[36px] max-w-[36px] max-h-[36px] min-w-[36px] min-h-[36px] rounded-full overflow-hidden"
                              }
                              aria-owns={
                                open ? "mouse-over-popover" : undefined
                              }
                              aria-haspopup="true"
                              onMouseEnter={handlePopoverOpen}
                              onMouseLeave={handlePopoverClose}
                            />
                          </div>
                        </Link>
                      </td>
                      <td className={"w-[170px]"}>
                        <Link to={"/pcm/detail/" + item._id}>
                          <div className={"user-infor py-2"}>
                            <p
                              className={"truncate user-infor-name text-[14px]"}
                            >
                              {item.lastComment
                                ? item.lastComment.author.fullname
                                : item.author.fullname}
                            </p>
                            <span className={"text-xs text-primary-gray py-2"}>
                              {item.related.length} {t("homepage:relaled")}
                            </span>
                          </div>
                        </Link>
                      </td>
                      <td className={"w-td-dashboard"}>
                        <Link to={"/pcm/detail/" + item._id}>
                          <div
                            className={"task-title truncate text-[14px] mt-2"}
                            style={{ lineHeight: "20px" }}
                          >
                            {item?.priority == 3 ? (
                              <span className="bg-cbs-orage text-white mr-1 py-1 px-3 rounded-md">
                                Cao
                              </span>
                            ) : (
                              <></>
                            )}
                            {item.project.sign}.{subContentHtml(item.name)}
                          </div>
                          <p
                            className={
                              "crop-text truncate text-xs text-primary-gray py-2"
                            }
                          >
                            {subContentHtml(item.lastComment?.content)}
                          </p>
                        </Link>

                        {item.subtype != 4 ? (
                          <div className="flex mr-2 gap-2 text-primary-gray pb-2">
                            {item?.lastComment?.files
                              ?.slice(0, 3)
                              .map((file: any, subindex: any) => (
                                <a
                                  key={file._id}
                                  href={`${process.env.REACT_APP_URL_S3}${file.path}`}
                                >
                                  <div className="border-0.5 border-cbs-border rounded-full px-3 py-1 flex">
                                    <img
                                      src={iconFile}
                                      className="mr-[5px] w-5 h-5"
                                      alt="File"
                                    />
                                    <span>
                                      {file?.nameOrg.substring(0, 20)}...
                                    </span>
                                  </div>
                                </a>
                              ))}
                            {item?.lastComment?.files.length > 3 && (
                              <div className="border-0.5 border-cbs-border rounded-full py-1 px-2">
                                +{item?.lastComment?.files.length - 1}
                              </div>
                            )}
                          </div>
                        ) : (
                          <></>
                        )}

                        {item.subtype != 4 ? (
                          <div className="flex wrap flex-wrap mr-2 text-primary-gray pb-2">
                            {item?.lastComment?.images
                              ?.slice(0, 3)
                              .map((file: any, subindex: any) => (
                                <button
                                  key={file._id}
                                  onClick={() => {
                                    setDefaultState({
                                      mediaID: file._id,
                                      images: item?.lastComment?.images,
                                      index: subindex,
                                      createAt: file.createAt,
                                    });
                                    setIsShowImageFullScreen(true);
                                  }}
                                >
                                  <div className="border-0.5 border-cbs-border rounded-full px-3 py-1 flex">
                                    <img
                                      src={iconPhoto}
                                      className="mr-[5px] w-6 h-6"
                                      alt="File"
                                    />
                                    <span>
                                      {file?.nameOrg.substring(0, 10)}...
                                    </span>
                                  </div>
                                </button>
                              ))}
                            {item?.lastComment?.images.length > 3 && (
                              <div className="border-0.5 border-cbs-border rounded-full py-1 px-2">
                                +{item?.lastComment?.images.length - 1}
                              </div>
                            )}
                          </div>
                        ) : (
                          <></>
                        )}
                      </td>
                      <td className={"w-[100px] align-middle"}>
                        <div className="justify-items-end absolute ml-[10px] hidden group-hover:block homeboxbutton">
                          <button
                            className="w-[40px] h-[40px] rounded-full hover:bg-cbs-form-input-bg"
                            onClick={toggleModalConfirmDeleteTask.bind(
                              null,
                              item
                            )}
                          >
                            <img
                              src={trashIcon}
                              className="m-auto"
                              alt="Trash"
                            />
                          </button>
                          {/* <button className="w-[40px] h-[40px] rounded-full hover:bg-cbs-form-input-bg">
                            <img src={mailIcon} className="m-auto" />
                          </button> */}
                        </div>
                        <div
                          className={
                            "task-date whitespace-nowrap py-2 text-right pr-4"
                          }
                        >
                          {showTime(item.modifyAt)}
                        </div>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          ) : (
            <></>
          )}
        </table>

        {tabActive === 3 ? (
          <table
            className={
              "table-fixed border-collapse w-full border-0.5 border-primary-border"
            }
          >
            <thead>
              <tr className={"sticky top-0"}>
                <th
                  className={
                    "text-center py-2 font-normal text-primary-gray w-[70px] bg-cbs-table-header"
                  }
                >
                  TT
                </th>
                <th
                  className={
                    "w-1/12 bg-cbs-table-header text-left font-normal text-primary-gray py-2 border-b-0.5 border-primary-border"
                  }
                >
                  Ngày tạo
                </th>
                <th
                  className={
                    "w-2/12 bg-cbs-table-header text-left font-normal text-primary-gray py-2 border-b-0.5 border-primary-border"
                  }
                >
                  Người tạo
                </th>
                <th
                  className={
                    "w-3/12 bg-cbs-table-header text-left font-normal text-primary-gray py-2 border-b-0.5 border-primary-border"
                  }
                >
                  Tên file
                </th>
                <th
                  className={
                    "w-1/12 bg-cbs-table-header text-left font-normal text-primary-gray py-2 border-b-0.5 border-primary-border"
                  }
                >
                  Dung lượng
                </th>
                <th
                  className={
                    "min-w-4/12 bg-cbs-table-header text-left font-normal text-primary-gray py-2 border-b-0.5 border-primary-border"
                  }
                >
                  Thuộc chủ đề
                </th>
              </tr>
            </thead>
            <tbody>
              {(listDataForFile[pageIndex] ?? []).map(
                (item: any, i: number) => (
                  <tr key={i}>
                    <td
                      className={
                        "py-2 border-b-0.5 border-primary-border text-center align-middle"
                      }
                    >
                      {i + 1}
                    </td>
                    <td
                      className={
                        "py-2 border-b-0.5 border-primary-border align-middle"
                      }
                    >
                      <p>{showTime(item.createAt)}</p>
                      <p className={"text-primary-gray"}>
                        {moment(item.createAt).fromNow()}
                      </p>
                    </td>
                    <td
                      className={
                        "py-2 border-b-0.5 border-primary-border align-middle"
                      }
                    >
                      <div className={"flex items-center"}>
                        <img
                          src={
                            item?.author?.image
                              ? `${process.env.REACT_APP_URL_S3_USER}/${item?.author?.image}`
                              : userIcon
                          }
                          alt={"---"}
                          className={
                            "w-[36px] h-[36px] min-w-[36px] min-h-[36px] max-w-[36px] max-h-[36px rounded-full overflow-hidden]"
                          }
                        />
                        <span className={"ml-2"}>{item?.author?.fullname}</span>
                      </div>
                    </td>
                    <td
                      className={
                        "py-2 border-b-0.5 border-primary-border align-middle text-cbs-highlight-color break-all pr-2"
                      }
                    >
                      {item.task && item.task?.subtype != 4 ? (
                        <a
                          href={`${process.env.REACT_APP_URL_S3}${item.path}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-cbs-highlight-color"
                        >
                          {item.nameOrg}
                        </a>
                      ) : (
                        item.nameOrg
                      )}
                    </td>
                    <td
                      className={
                        "py-2 border-b-0.5 border-primary-border align-middle"
                      }
                    >
                      {humanFileSize(item.size)}
                    </td>
                    <td
                      className={
                        "py-2 border-b-0.5 border-primary-border align-middle"
                      }
                    >
                      <Link to={"/pcm/detail/" + item.task?._id}>
                        {item?.project?.sign}.{item.task?.name}
                      </Link>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        ) : (
          <></>
        )}
      </div>
      <UpdateStatusDialog
        showUpdateStatus={showUpdateStatus}
        setShowUpdateStatus={setShowUpdateStatus}
        onPress={onPressUpdateStatus}
      />
      <ModalZoomView
        isShow={isShowImageFullScreen}
        toggle={() => setIsShowImageFullScreen(!isShowImageFullScreen)}
        initialData={defaultState}
      />
    </div>
  );
};

export const subContentHtml = (html?: string) => {
  const removeHtmlTag = parse(
    (html || "").replace?.(/<[^>]*>?/gm, " ")
  ).toString();

  const result =
    removeHtmlTag.length > 150
      ? `${removeHtmlTag.slice(0, 150)}...`
      : removeHtmlTag;
  return result;
};

export const showTime = (time: any) => {
  const toDay = new Date();
  const timeDay = new Date(time);
  if (
    toDay.getDate() === timeDay.getDate() &&
    toDay.getMonth() === timeDay.getMonth()
  ) {
    return moment(time).format("HH:mm");
  } else {
    return moment(time).format("DD/MM/YYYY");
  }
};
