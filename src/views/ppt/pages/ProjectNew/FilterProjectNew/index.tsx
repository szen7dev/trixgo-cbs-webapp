import React, { FC, useEffect, useRef, useState } from "react";
import { debounce } from "lodash";
import { DropdownSearchableV2, Loader } from "shareComponents/common";
import { useDispatch } from "react-redux";
import PaginateV2 from "shareComponents/common/PaginateV2";
import { useAppSelector } from "redux/reducer";
// Hook dùng để export excel
import TriangleDown from "assets/icons/TriangleDown";
import moment from "moment";
import TimeRangeDropdown from "shareComponents/common/TimeRangeDropdown";
import { PCM_STATUS_TASK, PCM_PROPOSAL_TASK } from "apis/localdb";
import iconSmallBlackDown from "assets/images/iconSmallBlackDown.svg";
import FilterItem from "./FilterItem";
import { useSearchTask } from "services/hooks/useMainSearch";
import { setQueryPcmMine } from "redux/reducer/DashboardV2Slice";

const FilterProjectNew: FC<any> = ({ user, listDataCompany, listDataUser, listDataProject, listDataSubtype, listDataStatus }) => {
    const dispatch = useDispatch();
    type PaginateHandle = React.ElementRef<typeof PaginateV2>;
    type DropdownSearchableV2Handle = React.ElementRef<typeof DropdownSearchableV2>;
    const ref = React.useRef<PaginateHandle>(null);
    const [pageIndex, setPageIndex] = useState(0);
    const companiesOfAuthor: any = useAppSelector(state => state.dashboardV2.data.pcmMine.companiesOfAuthor);
    const authorsID = useAppSelector(state => state.dashboardV2.data.pcmMine.authorsID);
    const projectsID = useAppSelector(state => state.dashboardV2.data.pcmMine.projectsID);
    const status = useAppSelector(state => state.dashboardV2.data.pcmMine.status);
    const subtypes = useAppSelector(state => state.dashboardV2.data.pcmMine.subtypes);
    const fromDate = useAppSelector(state => state.dashboardV2.data.pcmMine.fromDate);
    const toDate = useAppSelector(state => state.dashboardV2.data.pcmMine.toDate);
    const priority = useAppSelector(state => state.dashboardV2.data.pcmMine.priority);
    const isExpired = useAppSelector(state => state.dashboardV2.data.pcmMine.isExpired);

    const companyOfAuthorRef = useRef<DropdownSearchableV2Handle>(null);
    const authorsIDRef = useRef<DropdownSearchableV2Handle>(null);
    const projectsIDRef = useRef<DropdownSearchableV2Handle>(null);
    const subtypesRef = useRef<DropdownSearchableV2Handle>(null);
    const statusRef = useRef<DropdownSearchableV2Handle>(null);

    useEffect(() => {
        companyOfAuthorRef.current && companyOfAuthorRef.current.setValuesDropdown(companiesOfAuthor);
    }, [companiesOfAuthor]);

    useEffect(() => {
        authorsIDRef.current && authorsIDRef.current.setValuesDropdown(authorsID);
    }, [authorsID]);

    useEffect(() => {
        projectsIDRef.current && projectsIDRef.current.setValuesDropdown(projectsID);
    }, [projectsID]);

    useEffect(() => {
        subtypesRef.current && subtypesRef.current.setValuesDropdown(subtypes);
    }, [subtypes]);

    useEffect(() => {
        statusRef.current && statusRef.current.setValuesDropdown(status);
    }, [status]);

    const querySearchTask: any = {
        priority: priority,
        isExpired: isExpired,
        reportType: "1",
        companiesOfAuthor: companiesOfAuthor.map((e: any) => e.id),
        authorsID: authorsID.map((e: any) => e.id),
        projectsID: projectsID.map((e: any) => e.id),
        status: status.map((e: any) => e.id),
        subtypes: subtypes.map((e: any) => e.id),
        fromDate: fromDate,
        toDate: toDate,
        limit: 20,
    };

    const {
        listTasksWithPager: listDataForSubject,
        nextPageListTask,
        totalRecord: totalRecordSubject,
        totalPage: totalPageSubject,
        hasNextPage: hasNextPageSubject,
        isLoadingListTask,
        isFetching,
      } = useSearchTask({
        params: querySearchTask,
        isFetch: true,
      });

    return (
        <div className="cmcs-home flex flex-col h-full overflow-hidden">
            {isLoadingListTask || isFetching ?
               <Loader absolute={true} className="border-primary" /> : <></>
            }
            <div className={"sticky top-0 bg-white z-10"}>
                <div className={"flex items-center"}>
                    <div className={"filter-bar flex flex-wrap px-4 py-1"}>
                        <div className="flex gap-1 items-center  my-2 mr-4">
                            <input type="checkbox" />
                            <button>
                                <img src={iconSmallBlackDown} alt="Small blackdown" style={{ width: "9px", height: "5px" }} />
                            </button>
                        </div>
                        <DropdownSearchableV2
                            ref={companyOfAuthorRef}
                            className={"mr-4 border border-primary-border rounded-lg my-2 text-cbs-subtext"}
                            placeholder={"Đơn vị giao"}
                            isMultiple={true}
                            allowClearValueSingleInput={true}
                            data={listDataCompany.filter((e: any) => e?._id?.companyOfAuthor?._id).map((item: any) => ({
                                label: `${item?._id?.companyOfAuthor?.sign}.${item?._id?.companyOfAuthor?.name} (${item.amount})`,
                                id: item?._id?.companyOfAuthor?._id,
                            }))}
                            formatItem={{
                                id: "id",
                                text: "label"
                            }}
                            onSearchInputChange={debounce(valueSearch => { return null}, 500)}
                            onchangeValue={item => {
                                const cloneIDs: any = [...companiesOfAuthor];
                                cloneIDs.push(item);
                                dispatch(setQueryPcmMine({ key: "companiesOfAuthor", data: cloneIDs }))
                                setPageIndex(0);
                                ref.current && ref.current.resetPaginate();
                            }}
                            onClearData={() => {
                                dispatch(setQueryPcmMine({ key: "companiesOfAuthor", data: [] }))
                                setPageIndex(0);
                                ref.current && ref.current.resetPaginate();
                            }}
                            onMultipleRemoveValue={id => {
                                const cloneIDs = [...companiesOfAuthor];
                                const newList = cloneIDs.filter(selectId => selectId.id !== id);
                                dispatch(setQueryPcmMine({ key: "companiesOfAuthor", data: newList }))
                                setPageIndex(0);
                                ref.current && ref.current.resetPaginate();
                            }}
                            selectOneByOne={true}
                        />
                        <DropdownSearchableV2
                            ref={authorsIDRef}
                            className={"mr-4 border border-primary-border rounded-lg my-2 text-cbs-subtext"}
                            placeholder={"Người giao"}
                            isMultiple={true}
                            allowClearValueSingleInput={true}
                            data={listDataUser.map((item: any) => ({
                                label: `${item?._id?.author?.fullname} (${item.amount})`,
                                id: item?._id?.author?._id,
                            }))}
                            formatItem={{
                                id: "id",
                                text: "label"
                            }}
                            onSearchInputChange={debounce(valueSearch => { return null}, 500)}
                            onchangeValue={item => {
                                const cloneIDs: any = [...authorsID];
                                cloneIDs.push(item);
                                dispatch(setQueryPcmMine({ key: "authorsID", data: cloneIDs }))
                                setPageIndex(0);
                                ref.current && ref.current.resetPaginate();
                            }}
                            onClearData={() => {
                                dispatch(setQueryPcmMine({ key: "authorsID", data: [] }))
                                setPageIndex(0);
                                ref.current && ref.current.resetPaginate();
                            }}
                            onMultipleRemoveValue={id => {
                                const cloneIDs = [...authorsID];
                                const newList = cloneIDs.filter(selectId => selectId.id !== id);
                                dispatch(setQueryPcmMine({ key: "authorsID", data: newList }));
                                setPageIndex(0);
                                ref.current && ref.current.resetPaginate();
                            }}
                            selectOneByOne={true}
                        />
                          <DropdownSearchableV2
                            ref={projectsIDRef}
                            className={"mr-4 border border-primary-border rounded-lg my-2 text-cbs-subtext"}
                            placeholder={"Dự án"}
                            isMultiple={true}
                            allowClearValueSingleInput={true}
                            data={listDataProject.map((item: any) => ({
                                label: `${item?._id?.project?.sign}.${item?._id?.project?.name} (${item.amount})`,
                                id: item?._id?.project?._id,
                            }))}
                            formatItem={{
                                id: "id",
                                text: "label"
                            }}
                            onSearchInputChange={debounce(valueSearch => { return null}, 500)}
                            onchangeValue={item => {
                                const cloneIDs: any = [...projectsID];
                                cloneIDs.push(item);
                                dispatch(setQueryPcmMine({ key: "projectsID", data: cloneIDs }));
                                setPageIndex(0);
                                ref.current && ref.current.resetPaginate();
                            }}
                            onClearData={() => {
                                dispatch(setQueryPcmMine({ key: "projectsID", data: [] }));
                                setPageIndex(0);
                                ref.current && ref.current.resetPaginate();
                            }}
                            onMultipleRemoveValue={id => {
                                const cloneIDs = [...projectsID];
                                const newList = cloneIDs.filter(selectId => selectId.id !== id);
                                dispatch(setQueryPcmMine({ key: "projectsID", data: newList }));
                                setPageIndex(0);
                                ref.current && ref.current.resetPaginate();
                            }}
                            selectOneByOne={true}
                        />

                        <TimeRangeDropdown
                            className={
                                "mr-4 border border-primary-border rounded-lg my-2 text-cbs-subtext p-1 pl-2 "
                            }
                            placeholder={"Thời hạn"}
                            iconBack={<TriangleDown />}
                            // iconFront={<img src={timetableIcon} alt={"----"} />}
                            onValueChange={(val) => {
                                dispatch(setQueryPcmMine({ key: "fromDate", data: val.fromDate }))
                                dispatch(setQueryPcmMine({ key: "toDate", data: val.toDate }))
                                setPageIndex(0);
                                ref.current && ref.current.resetPaginate();
                            }}
                            options={[
                                {
                                    text: "Tất cả",
                                    fromDate: "",
                                    toDate: "",
                                },
                                {
                                    text: moment().subtract(2, 'y').format("YYYY"),
                                    fromDate: moment().subtract(2, 'y').startOf('year').format("YYYY-MM-DD"),
                                    toDate: moment().subtract(2, 'y').endOf('year').format("YYYY-MM-DD"),
                                },
                                {
                                    text: moment().subtract(1, 'y').format("YYYY"),
                                    fromDate: moment().subtract(1, 'y').startOf('year').format("YYYY-MM-DD"),
                                    toDate: moment().subtract(1, 'y').endOf('year').format("YYYY-MM-DD"),
                                },
                                {
                                    text: moment().format("YYYY"),
                                    fromDate: moment().startOf('year').format("YYYY-MM-DD"),
                                    toDate: moment().endOf('year').format("YYYY-MM-DD"),
                                },
                            ]}
                        />
                        <DropdownSearchableV2
                            ref={statusRef}
                            selectOneByOne={true}
                            className={"mr-2 border border-primary-border rounded-lg my-2 text-cbs-subtext"}
                            placeholder={"Trạng thái"}
                            isMultiple={true}
                            disableSearch={true}
                            onchangeValue={item => {
                                const cloneIDs = [...status];
                                cloneIDs.push(item);
                                dispatch(setQueryPcmMine({ key: "status", data: cloneIDs }))
                                setPageIndex(0);
                                ref.current && ref.current.resetPaginate();
                            }}
                            onClearData={() => {
                                dispatch(setQueryPcmMine({ key: "status", data: [] }))
                                setPageIndex(0);
                                ref.current && ref.current.resetPaginate();
                            }}
                            onMultipleRemoveValue={id => {
                                const cloneIDs = [...status];
                                const newList = cloneIDs.filter(selectId => selectId.id !== id);
                                dispatch(setQueryPcmMine({ key: "status", data: newList }))
                                setPageIndex(0);
                                ref.current && ref.current.resetPaginate();
                            }}
                            data={PCM_STATUS_TASK.map((item: any) => {
                                const itemFromAPI: any = listDataStatus.find((e: any) => e._id?.status === item.value);
                                return {
                                    label: `${item.text} (${itemFromAPI?.amount || 0})`,
                                    id: item.value,
                                }
                            })}
                            formatItem={{
                                text: "label",
                                id: "id",
                            }}
                            initialValue={
                                [
                                    {
                                        label: `${PCM_STATUS_TASK[0]?.text}`,
                                        id: 1,
                                    },
                                    {
                                        label: `${PCM_STATUS_TASK[1]?.text}`,
                                        id: 2,
                                    },
                                    {
                                        label: `${PCM_STATUS_TASK[3]?.text}`,
                                        id: 4,
                                    },
                                    {
                                        label: `${PCM_STATUS_TASK[4]?.text}`,
                                        id: 5,
                                    },
                                    {
                                        label: `${PCM_STATUS_TASK[5]?.text}`,
                                        id: 6,
                                    }
                                ]
                            }
                        />
                        <DropdownSearchableV2
                            ref={subtypesRef}
                            selectOneByOne={true}
                            className={"mr-2 border border-primary-border rounded-lg my-2 text-cbs-subtext"}
                            placeholder={"Phân loại"}
                            isMultiple={true}
                            disableSearch={true}
                            onchangeValue={item => {
                                const cloneIDs = [...subtypes];
                                cloneIDs.push(item);
                                dispatch(setQueryPcmMine({ key: "subtypes", data: cloneIDs }))

                                setPageIndex(0);
                                ref.current && ref.current.resetPaginate();
                            }}
                            onClearData={() => {
                                dispatch(setQueryPcmMine({ key: "subtypes", data: [] }))
                                setPageIndex(0);
                                ref.current && ref.current.resetPaginate();
                            }}
                            onMultipleRemoveValue={id => {
                                const cloneIDs = [...subtypes];
                                const newList = cloneIDs.filter(selectId => selectId.id !== id);
                                dispatch(setQueryPcmMine({ key: "subtypes", data: newList }))
                                setPageIndex(0);
                                ref.current && ref.current.resetPaginate();
                            }}
                            data={listDataSubtype.map((item: any) => ({
                                label: `${PCM_PROPOSAL_TASK[item?._id?.subtype]?.text} (${item.amount})`,
                                id: item?._id?.subtype,
                            }))}
                            formatItem={{
                                id: "id",
                                text: "label"
                            }}
                        />
                    </div>
                    <PaginateV2
                        ref={ref}
                        totalRecord={totalRecordSubject}
                        totalPages={totalPageSubject}
                        limit={20}
                        hasNextPage={hasNextPageSubject}
                        isFetching={isLoadingListTask}
                        nextPageAction={() => {
                            nextPageListTask();
                            setPageIndex(oldState => oldState + 1)
                        }}
                        prevPageAction={() => {
                            setPageIndex(oldState => oldState - 1)
                        }}
                    />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto bg-white px-4 py-2">
                {(listDataForSubject[pageIndex] ?? []).map(
                    (item: any, index: number) =>
                        <FilterItem item={item} key={index} userId={user._id} />
                    )}
            </div>
        </div>
    )
}

export default FilterProjectNew;