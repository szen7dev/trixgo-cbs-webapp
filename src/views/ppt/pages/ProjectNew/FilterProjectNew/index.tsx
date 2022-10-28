import React, { FC, useEffect, useState } from "react";
import projectIcon from "assets/images/icons8-project-50.svg";
import timetableIcon from "assets/images/icons8-timetable-48.svg";
import { debounce } from "lodash";
import { createLinkAndClick } from 'utils';
import { toast } from "react-toastify";
import { DropdownSearchableV2, Loader } from "shareComponents/common";
import { setFilterDropdown } from "redux/reducer/CmcsHomeSlice";
import { useProjectCustom } from "services/hooks/items/useProject";
import { useDispatch } from "react-redux";
import PaginateV2 from "shareComponents/common/PaginateV2";
import { useAppSelector } from "redux/reducer";
import { useListAccessByContract, useListFilterContract } from "services/hooks/cmcs/useContract";
// Hook dùng để export excel
import { useContractCustom } from "services/hooks/cmcs/useContractIncome";
import TriangleDown from "assets/icons/TriangleDown";
import moment from "moment";
import TimeRangeDropdown from "shareComponents/common/TimeRangeDropdown";
import iconMaleUser from "assets/images/icons8-male-user-64.svg";
import { formatNumberMoney } from "utils";
import { CONTRACT_COME_IN_STATUS } from "apis/localdb";
import iconSmallBlackDown from "assets/images/iconSmallBlackDown.svg";
import icons8pdf from "assets/images/icons8-pdf-100 1.svg";
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import FilterItem from "./FilterItem";

const FilterProjectNew: FC = () => {
    const dispatch = useDispatch();
    const { keywordInput } = useAppSelector(
        (state) => state.cmcsHome.data
    );

    useEffect(() => {
        setPageIndex(0);
        ref.current && ref.current.resetPaginate();
    }, [keywordInput]);

    type PaginateHandle = React.ElementRef<typeof PaginateV2>;
    const ref = React.useRef<PaginateHandle>(null);
    const [pageIndex, setPageIndex] = useState(0);
    const [recordSelected, setSelectRecord] = useState<any>({});

    const [fromToDate, setFromToDate] = useState({ fromDate: "", toDate: "" })

    const [projectKeyword, setProjectKeyword] = useState("");
    const [projectsID, setProjectsID] = useState<string[]>([]);

    const { listProjectsUserIsMember } = useProjectCustom({ paramsProjectsUserIsMember: { keyword: projectKeyword }, isFetchProjectsUserIsMember: true });

    const [listAccessByContractSellKeyword, setListAccessByContractSellKeyword] = useState("");
    const [buyerInfosID, setBuyerInfosID] = useState<string[]>([]);

    const [listAccessByContractBuyKeyword, setListAccessByContractBuyKeyword] = useState("");
    const [sellerInfosID, setSellerInfosID] = useState<string[]>([]);

    const { listAccessByContract: listAccessByContractSell } = useListAccessByContract({ params: { keyword: listAccessByContractSellKeyword, option: 1 }, isFetchList: true });
    const { listAccessByContract: listAccessByContractBuy } = useListAccessByContract({ params: { keyword: listAccessByContractBuyKeyword, option: 2 }, isFetchList: true });

    const [statuss, setStatuss] = useState<string[]>([]);
    const [ontimes, setOntimes] = useState<string[]>([]);
    const [onbudgets, setOnbudgets] = useState<string[]>([]);

    const { isLoading, totalRecord, totalPage, hasNextPage, listCmcsByFilterWithPager, fetchNextPageListCmcsByFilter } = useListFilterContract({
        params: {
            ...fromToDate,
            projectsID,
            buyerInfosID,
            sellerInfosID,
            statuss,
            ontimes,
            onbudgets,
            keyword: keywordInput
        },
        isFetchList: true
    })

    //Down load excel
    const [stateExport, setStateExport] = useState<{ isExporting: boolean }>({
        isExporting: false,
    });

    const { exportContractAsync } = useContractCustom({});
    const handleExportReport = async () => {
        try {
            setStateExport({ isExporting: true });
            const { error, data } = await exportContractAsync({
                filterParams: {
                    ...fromToDate,
                    projectsID,
                    buyerInfosID,
                    sellerInfosID,
                    statuss,
                    ontimes,
                    onbudgets,
                    keyword: keywordInput
                },
                type: 'all'
            });
            if (error) {
                return toast.warn(data?.message);
            }

            data && createLinkAndClick(data, '_self');
        } catch (error: any) {
            toast.error(error.message)
        } finally {
            setStateExport({ isExporting: false });
        }
    }

    if (stateExport.isExporting) {
        return <Loader className="border-primary" />
    }

    return (
        <div className="cmcs-home flex flex-col h-full overflow-hidden">
            <div className={"sticky top-0 bg-white z-10"}>
                <div className={"flex items-center"}>
                    <div className={"filter-bar flex flex-wrap px-4 py-2"}>
                        <div className="flex gap-1 items-center  my-2 mr-4">
                            <input type="checkbox" />
                            <button><img src={iconSmallBlackDown} style={{ width: "9px", height: "5px" }} /></button>
                        </div>
                        <DropdownSearchableV2
                            className={"mr-4 border border-primary-border rounded-lg my-2 text-cbs-subtext"}
                            placeholder={"Đơn vị giao"}
                            // prefixIcon={<img className={"mr-2"} src={projectIcon} alt={"icon"} />}
                            isMultiple={true}
                            allowClearValueSingleInput={true}
                            data={listProjectsUserIsMember}
                            formatItem={{
                                id: "_id",
                                text: "name"
                            }}
                            onSearchInputChange={debounce(valueSearch => setProjectKeyword(valueSearch), 500)}
                            onchangeValue={item => {
                                const cloneIDs = [...projectsID];
                                cloneIDs.push(item._id);
                                setProjectsID(cloneIDs);
                                dispatch(setFilterDropdown({ keyFilter: "projectsID", dataFilter: cloneIDs }))

                                setPageIndex(0);
                                ref.current && ref.current.resetPaginate();
                            }}
                            onClearData={() => {
                                setProjectsID([]);
                                dispatch(setFilterDropdown({ keyFilter: "projectsID", dataFilter: [] }))

                                setPageIndex(0);
                                ref.current && ref.current.resetPaginate();
                            }}
                            onMultipleRemoveValue={id => {
                                const cloneIDs = [...projectsID];
                                const newList = cloneIDs.filter(selectId => selectId !== id);
                                setProjectsID(newList);
                                dispatch(setFilterDropdown({ keyFilter: "projectsID", dataFilter: newList }))

                                setPageIndex(0);
                                ref.current && ref.current.resetPaginate();
                            }}
                            renderItem={(item) => (
                                <p className={"min-w-[300px]"}>{item.sign}.{item.text}</p>
                            )}
                            selectOneByOne={true}
                        />
                        <DropdownSearchableV2
                            className={"mr-4 border border-primary-border rounded-lg my-2 text-cbs-subtext"}
                            placeholder={"Người giao"}
                            // prefixIcon={<img className={"mr-2"} src={iconMaleUser} alt={"icon"} />}
                            isMultiple={true}
                            allowClearValueSingleInput={true}
                            data={listAccessByContractBuy}
                            formatItem={{
                                id: "_id",
                                text: "name"
                            }}
                            onSearchInputChange={debounce(valueSearch => setListAccessByContractBuyKeyword(valueSearch), 500)}
                            onchangeValue={item => {
                                const cloneIDs = [...buyerInfosID];
                                cloneIDs.push(item._id);
                                setBuyerInfosID(cloneIDs);
                                dispatch(setFilterDropdown({ keyFilter: "buyerInfosID", dataFilter: cloneIDs }))

                                setPageIndex(0);
                                ref.current && ref.current.resetPaginate();
                            }}
                            onClearData={() => {
                                setBuyerInfosID([]);
                                dispatch(setFilterDropdown({ keyFilter: "buyerInfosID", dataFilter: [] }))

                                setPageIndex(0);
                                ref.current && ref.current.resetPaginate();
                            }}
                            onMultipleRemoveValue={id => {
                                const cloneIDs = [...buyerInfosID];
                                const newList = cloneIDs.filter(selectId => selectId !== id);
                                setBuyerInfosID(newList);
                                dispatch(setFilterDropdown({ keyFilter: "buyerInfosID", dataFilter: newList }))

                                setPageIndex(0);
                                ref.current && ref.current.resetPaginate();
                            }}
                            renderItem={(item) => (
                                <p className={"min-w-[300px]"}>{item.company.sign}.{item.text}</p>
                            )}
                            selectOneByOne={true}
                        />
                        <DropdownSearchableV2
                            className={"mr-4 border border-primary-border rounded-lg my-2 text-cbs-subtext"}
                            placeholder={"Dự án"}
                            // prefixIcon={<img className={"mr-2"} src={iconMaleUser} alt={"icon"} />}
                            isMultiple={true}
                            allowClearValueSingleInput={true}
                            data={listAccessByContractSell}
                            formatItem={{
                                id: "_id",
                                text: "name"
                            }}
                            onSearchInputChange={debounce(valueSearch => setListAccessByContractSellKeyword(valueSearch), 500)}
                            onchangeValue={item => {
                                const cloneIDs = [...sellerInfosID];
                                cloneIDs.push(item._id);
                                setSellerInfosID(cloneIDs);
                                dispatch(setFilterDropdown({ keyFilter: "sellerInfosID", dataFilter: cloneIDs }))

                                setPageIndex(0);
                                ref.current && ref.current.resetPaginate();
                            }}
                            onClearData={() => {
                                setSellerInfosID([]);
                                dispatch(setFilterDropdown({ keyFilter: "sellerInfosID", dataFilter: [] }))

                                setPageIndex(0);
                                ref.current && ref.current.resetPaginate();
                            }}
                            onMultipleRemoveValue={id => {
                                const cloneIDs = [...sellerInfosID];
                                const newList = cloneIDs.filter(selectId => selectId !== id);
                                setSellerInfosID(newList);
                                dispatch(setFilterDropdown({ keyFilter: "sellerInfosID", dataFilter: newList }))

                                setPageIndex(0);
                                ref.current && ref.current.resetPaginate();
                            }}
                            renderItem={(item) => (
                                <p className={"min-w-[300px]"}>{item.company.sign}.{item.text}</p>
                            )}
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
                                setFromToDate(val)
                                dispatch(setFilterDropdown({ keyFilter: "fromDate", dataFilter: val.fromDate }))
                                dispatch(setFilterDropdown({ keyFilter: "toDate", dataFilter: val.toDate }))
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
                            selectOneByOne={true}
                            className={"mr-2 border border-primary-border rounded-lg my-2 text-cbs-subtext"}
                            placeholder={"Trạng thái"}
                            // prefixIcon={
                            //     <img className={"mr-2"} src={categoryIcon} alt={"icon"} />
                            // }
                            isMultiple={true}
                            disableSearch={true}
                            onchangeValue={item => {
                                const cloneIDs = [...statuss];
                                cloneIDs.push(item.value);
                                setStatuss(cloneIDs);
                                dispatch(setFilterDropdown({ keyFilter: "statuss", dataFilter: cloneIDs }))

                                setPageIndex(0);
                                ref.current && ref.current.resetPaginate();
                            }}
                            onClearData={() => {
                                setStatuss([]);
                                dispatch(setFilterDropdown({ keyFilter: "statuss", dataFilter: [] }))

                                setPageIndex(0);
                                ref.current && ref.current.resetPaginate();
                            }}
                            onMultipleRemoveValue={id => {
                                const cloneIDs = [...statuss];
                                const newList = cloneIDs.filter(selectId => selectId !== id);
                                setStatuss(newList);
                                dispatch(setFilterDropdown({ keyFilter: "statuss", dataFilter: newList }))

                                setPageIndex(0);
                                ref.current && ref.current.resetPaginate();
                            }}
                            data={CONTRACT_COME_IN_STATUS}
                            renderItem={(item) => (
                                <p className={"min-w-[300px]"}>{item.text}</p>
                            )}
                            formatItem={{
                                id: "value"
                            }}
                        />
                        <DropdownSearchableV2
                            selectOneByOne={true}
                            className={"mr-2 border border-primary-border rounded-lg my-2 text-cbs-subtext"}
                            placeholder={"Phân loại"}
                            // prefixIcon={
                            //     <img className={"mr-2"} src={categoryIcon} alt={"icon"} />
                            // }
                            isMultiple={true}
                            disableSearch={true}
                            onchangeValue={item => {
                                const cloneIDs = [...ontimes];
                                cloneIDs.push(item.id as string);
                                setOntimes(cloneIDs);
                                dispatch(setFilterDropdown({ keyFilter: "ontimes", dataFilter: cloneIDs }))

                                setPageIndex(0);
                                ref.current && ref.current.resetPaginate();
                            }}
                            onClearData={() => {
                                setOntimes([]);
                                dispatch(setFilterDropdown({ keyFilter: "ontimes", dataFilter: [] }))

                                setPageIndex(0);
                                ref.current && ref.current.resetPaginate();
                            }}
                            onMultipleRemoveValue={id => {
                                const cloneIDs = [...ontimes];
                                const newList = cloneIDs.filter(selectId => selectId !== id);
                                setOntimes(newList);
                                dispatch(setFilterDropdown({ keyFilter: "ontimes", dataFilter: newList }))

                                setPageIndex(0);
                                ref.current && ref.current.resetPaginate();
                            }}
                            data={[
                                {
                                    id: 1,
                                    text: "Đúng tiến độ"
                                },
                                {
                                    id: 2,
                                    text: "Chậm tiến độ"
                                }
                            ]}
                            renderItem={(item) => (
                                <p className={"min-w-[300px]"}>{item.text}</p>
                            )}
                        />
                    </div>
                    <PaginateV2
                        ref={ref}
                        totalRecord={totalRecord}
                        totalPages={totalPage}
                        limit={10}
                        hasNextPage={hasNextPage}
                        isFetching={isLoading}
                        nextPageAction={() => {
                            fetchNextPageListCmcsByFilter();
                            setPageIndex(oldState => oldState + 1)
                        }}
                        prevPageAction={() => {
                            setPageIndex(oldState => oldState - 1)
                        }}
                    />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto bg-white px-4 py-2">
                <FilterItem/>
                <FilterItem/>
            </div>
        </div>
    )
}

export default FilterProjectNew;