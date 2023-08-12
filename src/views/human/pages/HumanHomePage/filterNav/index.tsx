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
import downloadIcon from "assets/images/icons8-download-64.svg";
import contractIcon from "assets/images/icons8-contract-64 1.svg";
import echoIcon from "assets/images/icons8-amazon-echo-48.svg";

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
import { ModalCreateResultSearch } from "views/homepage/pages/DashboardV2/ModalCreateResultSearch";
import { subContentHtml } from "views/homepage/pages/DashboardV2";
// import { UpdateStatusDialog } from "./UpdateStatusDialog";
// import { ModalCreateResultSearch } from "./ModalCreateResultSearch";

type Props = {
    type?: number;
};

export const FilterNav: FC<Props> = ({ type = 0, children }) => {
    type PaginateHandle = React.ElementRef<typeof PaginateV2>;
    const dispatch = useDispatch();
    const [filter, setFilter] = useState("all");
    const { user } = useAuth();
    const [pageIndex, setPageIndex] = useState(0);
    const ref = React.useRef<PaginateHandle>(null);
    const tabIndex = useAppSelector((state) => state.dashboardV2.data.tabIndex);
    const tabActive = useAppSelector((state) => state.dashboardV2.data.tabActive);
    const [showUpdateStatus, setShowUpdateStatus] = useState(false);
    const { openModal } = useModal();

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

    return (
        <div className="t-home flex flex-col h-full overflow-hidden">
            <div className={"sticky top-0 bg-white z-10"}>
                <div className={"filter-bar flex flex-wrap px-4 py-1"}>
                    {(isLoadingResponse ||
                        isLoadingListTask ||
                        isFetchingNextPageSubject ||
                        isFetchingResponse ||
                        isLoadingFile ||
                        isFetchingFile) && <Loader className="border-primary" />
                    }

                    {(tabIndex === 1) && (
                        <DropdownSearchableV2
                            selectOneByOne={true}
                            reset={reset}
                            className={"mr-2 border border-primary-border rounded-lg mb-2"}
                            placeholder={"Giới tính"}
                            prefixIcon={
                                <img className={"mr-2"} src={maleUserIcon} alt={"icon"} />
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

                    {(tabIndex === 1) && (
                        <DropdownSearchableV2
                            selectOneByOne={true}
                            reset={reset}
                            className={"mr-2 border border-primary-border rounded-lg mb-2"}
                            placeholder={"Phòng ban"}
                            prefixIcon={
                                <img className={"mr-2"} src={categoryIcon} alt={"icon"} />
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

                    {(tabIndex === 1) && (
                        <DropdownSearchableV2
                            selectOneByOne={true}
                            reset={reset}
                            className={"mr-2 border border-primary-border rounded-lg mb-2"}
                            placeholder={"Chức vụ"}
                            prefixIcon={
                                <img className={"mr-2"} src={timelineIcon} alt={"icon"} />
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

                    {(tabIndex === 1) && (
                        <DropdownSearchableV2
                            selectOneByOne={true}
                            reset={reset}
                            className={"mr-2 border border-primary-border rounded-lg mb-2"}
                            placeholder={"Loại hợp đồng"}
                            prefixIcon={
                                <img className={"mr-2"} src={contractIcon} alt={"icon"} />
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
                            placeholder={"Tình trạng"}
                            iconBack={<TriangleDown />}
                            iconFront={<img src={echoIcon} alt={"----"} />}
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

                </div>

            </div>
            {/* child */}
            {children}
        </div>
    );
};