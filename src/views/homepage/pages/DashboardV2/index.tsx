import React, { FC, useState, UIEvent, useRef } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import { useQueryListCompany } from "services/hooks/useCompanies";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "views/pcm/styles/pcm.module.css";

import {
  DropdownSearchableV2,
  Loader,
  TimeRangeDropdown,
} from "../../../../shareComponents/common";
import userIcon from "assets/images/icon-user-avatar.svg";
import maleUserIcon from "assets/images/icons8-male-user-64.svg";
import categoryIcon from "assets/images/icons8-category-48.svg";
import timeTableIcon from "assets/images/icons8-timetable-48.svg";
import projectIcon from "assets/images/icons8-project-50.svg";
import downloadIcon from "assets/images/icons8-download-96.svg";
import sendMailIcon from "assets/images/icons8-send-email-96.svg";
import nextIcon from "assets/images/icons-arrow-next.svg";
import TriangleDown from "assets/icons/TriangleDown";
import timelineIcon from "assets/images/icons8-timeline-week-48.svg";
import businessBuiding from "assets/images/icons8-business-building-48.svg";

import { useUserSystem } from "services/hooks/users/useUserSystem";
import { useAuth } from "services/hooks/auth/useAuth";
import { useAppSelector } from "redux/reducer";
import {
  useListFileFromSearch,
  useListResponseFromSearch,
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
} from "redux/reducer/DashboardV2Slice";
import { useSearchTask } from "services/hooks/useMainSearch";
import { humanFileSize } from "utils/converter";

type Props = {
  type?: number;
};

export const DashboardV2: FC<Props> = ({ type = 0 }) => {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState("all");
  const { user } = useAuth();
  const tabIndex = useAppSelector((state) => state.dashboardV2.data.tabIndex);
  const tabActive = useAppSelector((state) => state.dashboardV2.data.tabActive);

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
    limit: 50,
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
    enabled: tabActive === 1 ? true : false,
  };

  const {
    listDataForResponse,
    isLoadingResponse,
    totalRecord: totalRecordResponse,
    nextPageSubject,
    isFetching: isFetchingResponse,
  } = useListResponseFromSearch(query);

  const [fromExpiredDate, setFromExpiredDate] = useState("1990/01/01");
  const [toExpiredDate, setToExpiredDate] = useState("2999/12/31");
  const [isExpired, setIsExpired] = useState<any>(0);
  const [subtypes, setSubtypes] = useState<string[]>([]);
  const [status, setStatus] = useState<string[]>([]);

  // Danh sách các subject theo keyword
  const {
    listTasks: listDataForSubject,
    nextPageListTask,
    totalRecord: totalRecordSubject,
    isLoadingListTask,
    isFetching: isFetchingNextPageSubject,
  } = useSearchTask({
    params: {
      keyword: keywordForSubject,
      fromDate: fromExpiredDate,
      toDate: toExpiredDate,
      authorsID: authors,
      projectsID: project,
      isExpired: isExpired,
      subtypes: subtypes,
      status: status,
      // read: 1, // 1-Chưa đọc, 2-Đã đọc, Không truyền => lấy tất cả
      limit: 5,
      ...querySubject,
    },
    isFetch: tabActive === 2 ? true : false,
  });

  // Danh sách File
  const {
    isLoadingFile,
    nextPageFile,
    totalRecord: totalRecordFile,
    listDataForFile,
    isFetching: isFetchingFile,
  } = useListFileFromSearch({
    keyword: keywordForFile,
    fromDate: fromCreateDate,
    toDate: toCreateDate,
    projectsID: project,
    ...queryFile,
    limit: "50",
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
    setFromExpiredDate("1990/01/01");
    setToExpiredDate("2999/12/31");
    setIsExpired(0);
    setSubtypes([]);
    setStatus([]);
    setTimeout(() => {
      setReset(true);
    }, 0);
  }

  const checkActive = (relateds: string[], user: string) => {
    let result = "read border-b-0.5 border-primary-border";
    if (relateds.includes(user)) {
      result = "unread border-b-0.5 border-primary-border";
    }
    return result;
  };

  const dropdownSearchableV2: any = useRef(null);
  
  const xxxxxx = 
  [{
    label: "Công ty C1020",
value: "6046c7c02c1dc33996dde3f6"
  }];

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
                  fromDate: moment().format("YYYY/MM/DD"),
                  toDate: moment(
                    moment().add(7, "days").calendar(),
                    "DD-MM-YYYY"
                  ).format("YYYY/MM/DD"),
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
              placeholder={"Đơn vị tạo phản hồi"}
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
              placeholder={"Người tạo phản hồi"}
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
              placeholder={"Dự án"}
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
                label: item.name,
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
              placeholder={"Thời gian tạo"}
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
                  fromDate: "1990/01/01",
                  toDate: "2999/12/31",
                },
                {
                  text: "Ngày nay",
                  fromDate: moment().format("YYYY/MM/DD"),
                  toDate: moment().format("YYYY/MM/DD"),
                },
                {
                  text: "Cách đây 1 tuần",
                  fromDate: moment(
                    moment().subtract(7, "days").calendar(),
                    "DD-MM-YYYY"
                  ).format("YYYY/MM/DD"),
                  toDate: moment().format("YYYY/MM/DD"),
                },
                {
                  text: "Cách đây 1 tháng",
                  fromDate: moment(
                    moment().subtract(31, "days").calendar(),
                    "DD-MM-YYYY"
                  ).format("YYYY/MM/DD"),
                  toDate: moment().format("YYYY/MM/DD"),
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
                {
                  id: 7,
                  text: "Khóa đóng",
                },
              ]}
            />
          )}
          {tabIndex === 1 && (
            <DropdownSearchableV2
              selectOneByOne={true}
              reset={reset}
              className={"mr-2 border border-primary-border rounded-lg mb-2"}
              placeholder={"Phân loại"}
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
              }}
            />
          )}
          {tabIndex === 2 && (
            <DropdownSearchableV2
              selectOneByOne={true}
              reset={reset}
              className={"mr-2 border border-primary-border rounded-lg mb-2"}
              placeholder={"Phân loại"}
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
                  text: "Yêu cầu thông tin",
                },
                {
                  id: 2,
                  text: "Yêu cầu phê duyệt",
                },
                {
                  id: 3,
                  text: "Thanh toán",
                },
                {
                  id: 4,
                  text: "Lựa chọn nhà thầu",
                },
                {
                  id: 5,
                  text: "Nghiệm thu chất lượng",
                },
                {
                  id: 6,
                  text: "Yêu cầu sửa chữa",
                },
                {
                  id: 7,
                  text: "Yêu cầu thay đổi",
                },
                {
                  id: 8,
                  text: "Yêu cầu thực hiện",
                },
                {
                  id: 9,
                  text: "Báo cáo",
                },
                {
                  id: 10,
                  text: "Tiến độ",
                },
                {
                  id: 11,
                  text: "Họp",
                },
              ]}
            />
          )}
          {/* {tabIndex === 2 && (
            <button
              className={
                "bg-green-success rounded text-white px-2 h-[32px] mb-2"
              }
            >
              Lưu kết quả
            </button>
          )} */}

          <button
            className={"bg-green-success rounded text-white px-2 h-[32px] mb-2"}
            onClick={onReset}
          >
            Thiết lập lại
          </button>
        </div>
        <div className={"header-table flex px-4 w-full top-0 bg-white pb-4"}>
          <div className={"flex items-center justify-center mr-2"}>
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="checkAll"
            />
          </div>
          <button
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
          <button className={"text-primary mx-2"}>
            Đánh dấu tất cả đã đọc
          </button>
          <button className={"flex items-center justify-center mx-3"}>
            <img src={downloadIcon} alt={"-----"} />
          </button>
          <button className={"flex items-center justify-center mx-3"}>
            <img src={sendMailIcon} alt={"-----"} />
          </button>
          <div className={"flex-1 flex items-center justify-end"}>
            <span className={"text-primary-gray"}>
              {tabActive === 1 && listDataForResponse.length
                ? "1"
                : tabActive === 2 && listDataForSubject.length
                ? "1"
                : tabActive === 3 && listDataForFile.length
                ? "1"
                : "0"}
              -
              {tabActive === 1
                ? listDataForResponse.length
                : tabActive === 2
                ? listDataForSubject.length
                : listDataForFile.length}{" "}
              trong số{" "}
              {tabActive === 1
                ? totalRecordResponse
                : tabActive === 2
                ? totalRecordSubject
                : totalRecordFile}
            </span>
            <button
              className={
                "w-[36px] h-[36px] rounded-full bg-cbs-left-menu mx-2 disabled:bg-transparent disabled:opacity-50 flex items-center justify-center"
              }
              disabled={true}
            >
              <img src={nextIcon} alt={"----"} className={"rotate-180"} />
            </button>
            <button
              className={
                "w-[36px] h-[36px] rounded-full bg-cbs-left-menu mx-2 disabled:bg-transparent disabled:opacity-50 flex items-center justify-center"
              }
              onClick={() => {
                switch (tabActive) {
                  case 1:
                    nextPageSubject();
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
              }}
            >
              <img src={nextIcon} alt={"----"} />
            </button>
          </div>
        </div>
      </div>
      <div className={"flex-1 overflow-y-auto"}>
        <table className={"w-full table-fixed tasks"}>
          {tabActive === 1 ? (
            <tbody>
              {listDataForResponse.map((item: any, index: number) => {
                return (
                  <tr
                    key={index}
                    className={"read border-b-0.5 border-primary-border"}
                  >
                    <td className={"w-[46px]"}>
                      <div className={"flex items-center justify-center py-2"}>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="check"
                        />
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
                          />
                        </div>
                      </Link>
                    </td>
                    <td className={"w-[170px]"}>
                      <Link to={"/pcm/detail/" + item.task?._id}>
                        <div className={"user-infor py-2"}>
                          <p className={"truncate user-infor-name text-[14px]"}>
                            {item.author.fullname}
                          </p>
                          <span className={"text-xs text-primary-gray py-2"}>
                            {item.task.related.length} liên quan
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
                        {moment(item.createAt).format("DD/MM/YYYY")}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          ) : (
            <></>
          )}

          {tabActive === 2 ? (
            <tbody>
              {listDataForSubject?.map((item: any, index: number) => {
                return (
                  <tr
                    key={index}
                    className={checkActive(item.news, `${user?._id}`)}
                  >
                    <td className={"w-[46px]"}>
                      <div className={"flex items-center justify-center py-2"}>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="check"
                        />
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
                          />
                        </div>
                      </Link>
                    </td>
                    <td className={"w-[170px]"}>
                      <Link to={"/pcm/detail/" + item._id}>
                        <div className={"user-infor py-2"}>
                          <p className={"truncate user-infor-name text-[14px]"}>
                            {item.lastComment
                              ? item.lastComment.author.fullname
                              : item.author.fullname}
                          </p>
                          <span className={"text-xs text-primary-gray py-2"}>
                            {item.related.length} liên quan
                          </span>
                        </div>
                      </Link>
                    </td>
                    <td className={"w-td-dashboard"}>
                      <Link to={"/pcm/detail/" + item._id}>
                        <p className={"task-title truncate text-[14px] mt-2"}>
                          {item.project.sign}.{subContentHtml(item.name)}
                        </p>
                        <p
                          className={
                            "crop-text truncate text-xs text-primary-gray py-2"
                          }
                        >
                          {subContentHtml(item.lastComment?.content)}
                        </p>
                      </Link>
                    </td>
                    <td className={"w-[100px]"}>
                      <div
                        className={
                          "task-date whitespace-nowrap py-2 text-right pr-4"
                        }
                      >
                        {moment(item.modifyAt).format("DD/MM/YYYY")}
                      </div>
                    </td>
                  </tr>
                );
              })}
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
              {(listDataForFile || []).map((item: any, i: number) => (
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
                    <p>{moment(item.createAt).format("DD/MM/YYYY")}</p>
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
                    <a
                      href={`${process.env.REACT_APP_URL_S3}${item.path}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cbs-highlight-color"
                    >
                      {item.nameOrg}
                    </a>
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
              ))}
            </tbody>
          </table>
        ) : (
          <></>
        )}
      </div>
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
