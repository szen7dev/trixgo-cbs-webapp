import React, { FC, useState, UIEvent, useEffect } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import { useQueryListCompany } from "services/hooks/useCompanies";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "views/pcm/styles/pcm.module.css";

import { DropdownSearchableV2, Loader } from "shareComponents/common";
import TimeRangeDropdown from "shareComponents/common/TimeRangeDropdown";
import userIcon from "assets/images/icon-user-avatar.svg";
import maleUserIcon from "assets/images/icons8-male-user-64.svg";
import categoryIcon from "assets/images/icons8-category-48.svg";
import timeTableIcon from "assets/images/icons8-timetable-48.svg";
import projectIcon from "assets/images/icons8-project-50.svg";
import TriangleDown from "assets/icons/TriangleDown";
import timelineIcon from "assets/images/icons8-timeline-week-48.svg";
import businessBuiding from "assets/images/icons8-business-building-48.svg";
import iconChat from "assets/images/icons8-chat-96 1.svg";
import iconTrash from "assets/images/icons8-delete-96 1.svg";
import taskUserAvt from "assets/images/task-user.svg";
import trashIcon from "assets/images/icons8-trash-96 1.svg";
import mailIcon from "assets/images/icons8-email-96 1.svg";
import moreIcon from "assets/images/moreIcon.svg";
import arrowDown from "assets/images/icon-arrowdown.svg";
import defaultAva from "assets/images/image 166.jpg";
import icons8pdf from "assets/images/icons8-pdf-100 1.svg";
import arrowDownRed from "assets/images/Arrow 1 (1) 1.svg";
import dotGreen from "assets/images/Frame 4283.svg";
import iconShift from "assets/images/icons8-shift-100 1.svg";
import iconChannel from "assets/images/icons8-omnichannel-96 1.svg";
import iconSandtime from "assets/images/icons8-sand-timer-96 1.svg";
import iconOk from "assets/images/icons8-ok-96 1.svg";
import iconWarning from "assets/images/icons8-high-risk-96 1.svg";
import iconCalendar from "assets/images/icons8-calendar-96 2.svg";
import iconSupport from "assets/images/icons8-online-support-96 1.svg";
import iconDown from "assets/images/icons8-download-64 1.svg";
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

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
import { Popover } from "@mui/material";
import ChartRevenueByHour from "./components/chart";

type Props = {
  type?: number;
};

export const FnBHomePage: FC<Props> = ({ type = 0 }) => {
  type PaginateHandle = React.ElementRef<typeof PaginateV2>;
  const dispatch = useDispatch();
  const [popBox1, setpopBox1] = React.useState(false)
  const [popBox2, setpopBox2] = React.useState(false)
  const [filter, setFilter] = useState("all");
  const { user } = useAuth();
  const [pageIndex, setPageIndex] = useState(0);
  const ref = React.useRef<PaginateHandle>(null);
  const tabIndex = useAppSelector((state) => state.dashboardV2.data.tabIndex);
  const tabActive = useAppSelector((state) => state.dashboardV2.data.tabActive);
  const [showUpdateStatus, setShowUpdateStatus] = useState(false);
  const { openModal } = useModal();

  const StarToggle = () => {
    const [selectStar, setSelectStar] = React.useState(false)
    return (
      <button onClick={() => setSelectStar(!selectStar)} className="h-[16px]">
        {(selectStar ? <StarIcon sx={{ color: '#FFCA28', width: 16, height: 16 }} /> : <StarBorderIcon sx={{ color: '#FFCA28', width: 16, height: 16 }} />)}
      </button>
    )
  }
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
  //

  // Danh sách các response

  const query: any = {
    ...queryResponse,
    keyword: keywordForResponse,
    projectsID: project,
    fromDate: fromCreateDate,
    toDate: toCreateDate,
    isGroup: (queryResponse.companyOfAuthorsID.length ||
      queryResponse.authorsID.length ||
      queryResponse.projectsID.length ||
      queryResponse.official != 0 || keywordForResponse) ? "1" : "0",
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

  // Danh sách các subject theo keyword

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
    isGroup: (querySubject.companiesOfAssignee.length ||
      querySubject.assigneesID.length ||
      keywordForSubject) ? "1" : "0",
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
    refetchListTask
  } = useSearchTask({
    params: querySearchTask,
    isFetch: tabActive === 2 ? true : false,
  });

  // Danh sách File
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
    isGroup: (queryFile.companyOfAuthorsID.length ||
      queryFile.authorsID.length ||
      keywordForFile) ? "1" : "0",
    ...queryFile,
    enabled: tabActive === 3 ? true : false,
  });
  //////

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
    }
  }, []);

  const { refetch: refetchPcmPlanTaskNotification } = usePcmPlanTaskNotification({ enabled: false });

  const { updateStatusMultipleAsync } = useTask({
    params: {},
    isFetchInfo: false,
  });

  const onPressUpdateStatus = async () => {
    await updateStatusMultipleAsync({ option: 2 });
    refetchPcmPlanTaskNotification();
    refetchListTask();
  };

  const checkActive = (relateds: string[], user: string) => {
    let result = "read border-b-0.5 border-primary-border hover:shadow-md hover:z-2 hover:relative";
    if (relateds.includes(user)) {
      result = "unread border-b-0.5 border-primary-border hover:shadow-md hover:z-2 hover:relative";
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
    )
  }
  // popover
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  return (
    <div className="t-home flex flex-col h-full overflow-hidden">
      <div className={"sticky top-0 bg-white z-10"}>
        <div className={"filter-bar flex flex-wrap px-4 py-2"}>
          {(isLoadingResponse ||
            isLoadingListTask ||
            isFetchingNextPageSubject ||
            isFetchingResponse ||
            isLoadingFile ||
            isFetchingFile) && <Loader className="border-primary" />}
          {tabIndex === 1 && (
            <DropdownSearchableV2
              reset={reset}
              selectOneByOne={true}
              countBadge={queryResponse.companyOfAuthorsID.length}
              className={"mr-2 border border-primary-border rounded-lg mb-2"}
              placeholder={"Cơ sở"}
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
              placeholder={"Ca làm"}
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
                <img className={"mr-2"} src={iconShift} alt={"icon"} />
              }
            />
          )}

          {(tabIndex === 1) && (
            <DropdownSearchableV2
              selectOneByOne={true}
              reset={reset}
              className={"mr-2 border border-primary-border rounded-lg mb-2"}
              placeholder={"Kênh khách hàng"}
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

          {tabIndex === 1 && (
            <DropdownSearchableV2
              selectOneByOne={true}
              reset={reset}
              className={"mr-2 border border-primary-border rounded-lg mb-2"}
              placeholder={"Hình thức phục vụ"}
              prefixIcon={
                <img className={"mr-2"} src={iconSupport} alt={"icon"} />
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

          {(tabIndex === 1) && (
            <TimeRangeDropdown
              className={
                "mr-2 border border-primary-border rounded-lg mb-2 p-1 pl-2 "
              }
              placeholder={"Thời khoảng"}
              iconBack={<TriangleDown />}
              iconFront={<img src={iconSandtime} alt={"----"} />}
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
                  fromDate: moment().subtract(7, "days").format("YYYY-MM-DD 00:00"),
                  toDate: moment().format("YYYY-MM-DD HH:mm"),
                },
                {
                  text: "Cách đây 1 tháng",
                  fromDate: moment().subtract(1, "months").format("YYYY-MM-DD 00:00"),
                  toDate: moment().format("YYYY-MM-DD HH:mm"),
                },
              ]}
            />
          )}

          {tabIndex === 1 && (
            <DropdownSearchableV2
              selectOneByOne={true}
              reset={reset}
              className={"mr-2 border border-primary-border rounded-lg mb-2"}
              placeholder={"Trạng thái"}
              prefixIcon={
                <img className={"mr-2"} src={iconOk} alt={"icon"} />
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

          {tabIndex === 1 && (
            <DropdownSearchableV2
              selectOneByOne={true}
              reset={reset}
              className={"mr-2 border border-primary-border rounded-lg mb-2"}
              placeholder={"Lỗi gặp phải"}
              prefixIcon={
                <img className={"mr-2"} src={iconWarning} alt={"icon"} />
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

          <button
            className={"border-primary border-0.5 bg-cbs-secondary rounded text-white px-4 h-[32px] mb-2"}
          >
            Lọc
          </button>

          {tabIndex === 2 && (
            <button
              className={"bg-green-success rounded text-white px-2 h-[32px] ml-2"}
              onClick={onSaveResultSearch}
            >
              Lưu
            </button>
          )}

        </div>
        <div className={"header-table flex px-4 w-full top-0 bg-white mb-1 pb-2"}>
          <div className={"flex gap-7 items-center justify-center mr-2"}>
            <div className="flex gap-2 items-center">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="checkAll"
                style={{ width: "14px", height: "14px" }}
              />
              <div>
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
              </div>
            </div>
            <div className="flex gap-7 items-center">
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
              <button className="text-cbs-schedule-expired">Hủy đơn</button>
              <button className="text-cbs-schedule-nextweek">Gán lỗi gặp phải</button>
              <button><img src={iconDown} alt="" /></button>
            </div>
          </div>
          {/* <button
            onClick={() => setFilter("all")}
            className={
              "py-1 px-6 mx-2 rounded-full border border-primary-border " +
              (filter === "all"
                ? "text-white bg-cbs-secondary border-none"
                : "text-primary-gray bg-white")
            }
          >
            Tất cả
          </button>
          <button
            onClick={() => setFilter("unread")}
            className={
              "py-1 px-6 mx-2 rounded-full border border-primary-border " +
              (filter === "unread"
                ? "text-white bg-cbs-secondary border-none"
                : "text-primary-gray bg-white")
            }
          >
            Chưa đọc
          </button>
          <button
            onClick={() => setFilter("read")}
            className={
              "py-1 px-6 mx-2 rounded-full border border-primary-border " +
              (filter === "read"
                ? "text-white bg-cbs-secondary border-none"
                : "text-primary-gray bg-white")
            }
          >
            Đã đọc
          </button>
          <button
            className={"text-primary mx-2"}
            onClick={() => setShowUpdateStatus(true)}
          >
            Đánh dấu tất cả đã đọc
          </button> */}
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
              limit={50}
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
      </div>
      <div className={"flex flex-1 overflow-y-auto gap-3 bg-cbs-table-highlight"}>
        <div className="w-3/4">
          <table className={"w-full table-fixed tasks"}>
            <tbody>
              <tr
                className={"border-b-0.5 border-primary-border bg-white hover:shadow-md hover:z-2 hover:relative"}
              >
                <td className={"w-[85px]"}>
                  <div
                    className={"flex gap-4  p-4"}
                  >
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="check"
                      style={{ width: "16px", height: "16px", marginTop: "5px" }}
                    />
                    <StarToggle />
                  </div>
                </td>
                <td className={"w-[50px]"}>
                  <Link to={""}>
                    <div className={"py-2"}>
                      <img
                        src={userIcon}
                        alt={"avatar"}
                        className={
                          "w-[36px] h-[36px] max-w-[36px] max-h-[36px] min-w-[36px] min-h-[36px] rounded-full overflow-hidden"
                        }
                        aria-owns={open ? "mouse-over-popover" : undefined}
                        aria-haspopup="true"
                        onMouseEnter={handlePopoverOpen}
                        onMouseLeave={handlePopoverClose}
                      />
                    </div>
                  </Link>
                </td>
                <td className={"w-[75px]"}>
                  <Link to={""}>
                    <div className={"user-infor py-2"}>
                      <p className={"truncate user-infor-name text-[14px]"}>
                        Shopee
                      </p>
                      <span className={"text-xs text-primary-gray py-2"}>16 mặt hàng</span>
                    </div>
                  </Link>
                </td>
                <td className={"w-1/4"}>
                  <Link to={""}>
                    <div className={"user-infor py-2"}>
                      <p className={"truncate user-infor-name text-[14px]"}>
                        <span className="rounded-md bg-cbs-orage text-white px-3 py-1 mr-3">
                          02 lỗi
                        </span>
                        Đơn mang đi -
                        <span className="text-cbs-primary">T39882</span>
                      </p>
                      <span className={"truncate text-xs  text-primary-gray py-2"}>100% đường, 100% đá, Topping Nha đam...</span>
                    </div>
                  </Link>
                </td>
                <td className={"w-[75px] py-2"}>
                  <div className="text-cbs-primary">
                    100003010
                  </div>
                </td>
                <td className={"w-36	py-2"}>
                  <div>
                    Winggo Thái Thịnh
                  </div>
                </td>
                <td className={"py-2"}>
                  <div>
                    Mang đi
                  </div>
                </td>
                <td className={"px-1 py-2"}>
                  <div
                    className={
                      "task-date whitespace-nowrap"
                    }
                  >
                    23/11/2022 18:25
                  </div>
                </td>
                <td className={"px-1 py-2"}>
                  <div className="w-[70px] text-center rounded-md bg-cbs-schedule-after-7days text-white" style={{ fontSize: "10px" }}>
                    Hoàn thành
                  </div>
                </td>
                <td className={"w-[75px] py-2"}>
                  <div>
                    25.000đ
                  </div>
                </td>
              </tr>
              <tr
                className={"border-b-0.5 border-primary-border bg-white hover:shadow-md hover:z-2 hover:relative"}
              >
                <td className={"w-[85px]"}>
                  <div
                    className={"flex gap-4  p-4"}
                  >
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="check"
                      style={{ width: "16px", height: "16px", marginTop: "5px" }}
                    />
                    <StarToggle />
                  </div>
                </td>
                <td className={"w-[50px]"}>
                  <Link to={""}>
                    <div className={"py-2"}>
                      <img
                        src={userIcon}
                        alt={"avatar"}
                        className={
                          "w-[36px] h-[36px] max-w-[36px] max-h-[36px] min-w-[36px] min-h-[36px] rounded-full overflow-hidden"
                        }
                        aria-owns={open ? "mouse-over-popover" : undefined}
                        aria-haspopup="true"
                        onMouseEnter={handlePopoverOpen}
                        onMouseLeave={handlePopoverClose}
                      />
                    </div>
                  </Link>
                </td>
                <td className={"w-[75px]"}>
                  <Link to={""}>
                    <div className={"user-infor py-2"}>
                      <p className={"truncate user-infor-name text-[14px]"}>
                        Shopee
                      </p>
                      <span className={"text-xs text-primary-gray py-2"}>16 mặt hàng</span>
                    </div>
                  </Link>
                </td>
                <td className={"w-1/4"}>
                  <Link to={""}>
                    <div className={"user-infor py-2"}>
                      <p className={"truncate user-infor-name text-[14px]"}>
                        <span className="rounded-md bg-cbs-orage text-white px-3 py-1 mr-3">
                          02 lỗi
                        </span>
                        Đơn mang đi -
                        <span className="text-cbs-primary">T39882</span>
                      </p>
                      <span className={"truncate text-xs  text-primary-gray py-2"}>100% đường, 100% đá, Topping Nha đam...</span>
                    </div>
                  </Link>
                </td>
                <td className={"w-[75px] py-2"}>
                  <div className="text-cbs-primary">
                    100003010
                  </div>
                </td>
                <td className={"w-36	py-2"}>
                  <div>
                    Winggo Thái Thịnh
                  </div>
                </td>
                <td className={"py-2"}>
                  <div>
                    Mang đi
                  </div>
                </td>
                <td className={"px-1 py-2"}>
                  <div
                    className={
                      "task-date whitespace-nowrap"
                    }
                  >
                    23/11/2022 18:25
                  </div>
                </td>
                <td className={"px-1 py-2"}>
                  <div className="w-[70px] text-center rounded-md bg-cbs-schedule-expired text-white" style={{ fontSize: "10px" }}>
                    Đã hủy
                  </div>
                </td>
                <td className={"w-[75px] py-2"}>
                  <div>
                    25.000đ
                  </div>
                </td>
              </tr>
            </tbody>

          </table>
        </div>
        <div className="w-1/4 mt-3">
          <div className="bg-white border-0.5 border-second-color-border py-6 px-3">
            <button className="m-auto font-bold text-cbs-fnb-bg flex items-center">Winggo Thái thịnh <ExpandMoreIcon /></button>
            <button className="flex items-center m-auto"><img src={iconCalendar} alt="" />
              Hôm nay <ExpandMoreIcon />
            </button>
            <div className="font-bold text-center">Tổng doanh số</div>
            <div className="flex items-center gap-4 justify-center	">
              <span className="text-cbs-down-text flex gap-3"><img src={arrowDownRed} /> 93.49 %</span>
              <span className="text-primary text-[22px] font-bold ">20.000.000đ</span>
            </div>
            <div className="flex border-t-0.5 border-b-0.5 border-primary-border justify-between mx-1 py-2">
              <div>
                <div className="flex text-cbs-subtext gap-1"><img src={dotGreen} alt="" /> Hệ thống</div>
                <div className="font-bold ">15.000.000</div>
              </div>
              <div className="border-r-0.5 border-primary-border pr-2">
                <div className="flex text-cbs-subtext gap-1"><img src={dotGreen} alt="" />Nhượng quyền</div>
                <div className="font-bold ">15.000.000</div>
              </div>
              <div>
                <div className="flex text-cbs-subtext gap-1"><img src={dotGreen} alt="" />Tiền mặt</div>
                <div className="text-cbs-fnb-bg ">15.000.000</div>
              </div>
              <div>
                <div className="flex text-cbs-subtext gap-1"><img src={dotGreen} alt="" />Chuyển khoản</div>
                <div className="text-cbs-fnb-bg">15.000.000</div>
              </div>
            </div>
            <div className="flex  justify-between my-3">
              <div>
                <div className=" text-cbs-subtext pb-3">Tỷ lệ Off</div>
                <div className="font-bold text-cbs-fnb-bg">5%</div>
              </div>
              <div>
                <div className=" text-cbs-subtext pb-3">Tỷ lệ App</div>
                <div className="font-bold text-cbs-fnb-bg">5%</div>
              </div>
              <div>
                <div className=" text-cbs-subtext pb-3">Hóa đơn</div>
                <div className="font-bold ">50</div>
              </div>
              <div>
                <div className=" text-cbs-subtext pb-3">Mặt hàng</div>
                <div className="font-bold ">200</div>
              </div>
              <div>
                <div className=" text-cbs-subtext pb-3">Khách hàng</div>
                <div className="font-bold ">50</div>
              </div>
            </div>
            <div>
              <div className="flex justify-between	">
                <div className="text-cbs-schedule-nextweek font-bold">Các lỗi hay gặp (168) </div>
                <div><a href="#" className="text-cbs-fnb-bg">Xem tất cả</a></div>
              </div>
              <div className="flex justify-between	">
                <div>Đường quá ngọt</div>
                <div className="text-cbs-down-text">2</div>
              </div>
            </div>
            <div className="flex">
              <ChartRevenueByHour />
            </div>
          </div>
        </div>
      </div>
      <UpdateStatusDialog
        showUpdateStatus={showUpdateStatus}
        setShowUpdateStatus={setShowUpdateStatus}
        onPress={onPressUpdateStatus}
      />
    </div>
  );
};

export const subContentHtml = (html?: string) => {
  const removeHtmlTag = parse(
    (html || "").replace(/<[^>]*>?/gm, " ")
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
