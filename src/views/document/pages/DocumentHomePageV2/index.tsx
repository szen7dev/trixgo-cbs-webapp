import React, { FC, useEffect, useState } from "react";
import moment from "moment";
import { debounce } from "lodash";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { createLinkAndClick } from "utils";

import { useDispatch } from "react-redux";
import { useAppSelector } from "redux/reducer";
import { setFilterDropdown } from "redux/reducer/DocumentHomeSlice";

import { useDocumentCustom, useListFilterDocument} from "services/hooks/document/useDocument";
import { useQueryListCompany } from "services/hooks/useCompanies";
import { useContractIsMembers } from "services/hooks/items/useContract";
import { useProjectCustom } from "services/hooks/items/useProject";

import { DIRECTION_TYPES, DOCUMENT_TYPES_SORT } from "apis/localdb";

import { Loader, DropdownSearchableV2 } from "shareComponents/common";
import TimeRangeDropdown from "shareComponents/common/TimeRangeDropdown";
import TriangleDown from "assets/icons/TriangleDown";
import PaginateV2 from "shareComponents/common/PaginateV2";

import maleUserIcon from "assets/images/icons8-business-building-48.svg";
import categoryIcon from "assets/images/icons8-category-48.svg";
import timelineIcon from "assets/images/icons8-timeline-week-48.svg";
import contractIcon from "assets/images/icons8-contract-64-blue.svg";
import downloadIcon from "assets/images/icons8-download-64.svg";
import projectIcon from "assets/images/icons8-project-50.svg";
import pdfIcon from "assets/images/icons8-attach.svg";

const DocumentHomePageV2: FC = () => {
    type PaginateHandle = React.ElementRef<typeof PaginateV2>;

    const dispatch = useDispatch();
    const { keywordInput } = useAppSelector(
        (state) => state.documentHome.data
    );

    useEffect(() => {
        setPageIndex(0);
        ref.current && ref.current.resetPaginate();
    }, [keywordInput]);

    const [recordSelected, setSelectRecord] = useState<any>({});

    const ref = React.useRef<PaginateHandle>(null);
    const [pageIndex, setPageIndex] = useState(0);
    const [fromToDate, setFromToDate] = useState({ fromDate: "", toDate: "" })

    const [keywordDatahubContact, setKeywordDatahubContact] = useState("");
    const [datahubContactsID, setDatahubContactsID] = useState<string[]>([]);

    const [projectKeyword, setProjectKeyword] = useState("");
    const [departmentsID, setDepartmentsID] = useState<string[]>([]);

    const [types, setTypes] = useState<string[]>([]);

    const [directions, setDirections] = useState<string[]>([]);

    const [contractKeyword, setContractKeyword] = useState("");
    const [contractsID, setContractsID] = useState<string[]>([]);

    const [stateExport, setStateExport] = useState<{ isExporting: boolean }>({
        isExporting: false,
    });
    const { exportDocumentAsync } = useDocumentCustom({});
	const { data: listDatahubContact } = useQueryListCompany({ keyword: keywordDatahubContact })

    const { listProjectsUserIsMember } = useProjectCustom({ paramsProjectsUserIsMember: { keyword: projectKeyword }, isFetchProjectsUserIsMember: true });
    const { listContracts } = useContractIsMembers({ params: { keyword: contractKeyword, populates: JSON.stringify({ "path": "project", "select": "name sign" }) }, isFetch: true });

    const {
        listDocumentWithPager,
        isLoading,
        totalRecord,
        totalPage,
        fetchNextPageDocument,
        hasNextPage,
        isFetching
    } = useListFilterDocument({
        params: {
            ...fromToDate,
            datahubContactsID,
            types,
            departmentsID,
            directions,
            contractsID,
            keyword: keywordInput
        },
        isFetchList: true
    })

    const handleExport = async () => {
        try {
            setStateExport({ isExporting: true });
            const { error, data } = await exportDocumentAsync({
                filterParams: {
                    ...fromToDate,
                    datahubContactsID,
                    types,
                    departmentsID,
                    directions,
                    contractsID,
                    keyword: keywordInput
                }
            });

            if(error) {
                return toast.warn(data?.message);
            }

            data && createLinkAndClick(data, '_self');
        } catch (error: any) {
            toast.error(error.message)
        } finally {
            setStateExport({ isExporting: false });
        }
    }

    if(stateExport.isExporting) {
        return <Loader className="border-primary" />
    }

    return (
        <div className="flex flex-1 flex-col overflow-hidden h-full">
            {isLoading || isFetching && <Loader absolute={true} className="border-primary" />}
            <div className={"sticky top-0 z-10"}>
                <div className={"flex flex-wrap items-center px-4 py-2"}>
                    <DropdownSearchableV2
                        className={"mr-4 border border-primary-border rounded-lg mb-2"}
                        placeholder={"Đơn vị ban hành"}
                        prefixIcon={<img className={"mr-2"} src={maleUserIcon} alt={"icon"} />}
                        isMultiple={true}
                        allowClearValueSingleInput={true}
                        data={listDatahubContact}
                        formatItem={{
                            id: "_id",
                            text: "name"
                        }}
                        onSearchInputChange={debounce(
                            (valueSearch) => setKeywordDatahubContact(valueSearch),
                            500
                        )}
                        onchangeValue={item => {
                            const cloneIDs = [...datahubContactsID];
                            cloneIDs.push(item._id);
                            setDatahubContactsID(cloneIDs);
                            dispatch(setFilterDropdown({ keyFilter: "datahubContactsID", dataFilter: cloneIDs }))

                            setPageIndex(0);
                            ref.current && ref.current.resetPaginate();
                        }}
                        onClearData={() => {
                            setDatahubContactsID([]);
                            dispatch(setFilterDropdown({ keyFilter: "datahubContactsID", dataFilter: [] }))

                            setPageIndex(0);
                            ref.current && ref.current.resetPaginate();
                        }}
                        onMultipleRemoveValue={id => {
                            const cloneIDs = [...datahubContactsID];
                            const newList = cloneIDs.filter(selectId => selectId !== id);
                            setDatahubContactsID(newList);
                            dispatch(setFilterDropdown({ keyFilter: "datahubContactsID", dataFilter: newList }))

                            setPageIndex(0);
                            ref.current && ref.current.resetPaginate();
                        }}
                        renderItem={(item) => (
                            <p className={"min-w-[300px]"}>{item.text}</p>
                        )}
                        selectOneByOne={true}
                    />
                    <DropdownSearchableV2
                        className={"mr-4 border border-primary-border rounded-lg mb-2"}
                        placeholder={"Tính chất hồ sơ"}
                        prefixIcon={<img className={"mr-2"} src={categoryIcon} alt={"icon"} />}
                        isMultiple={true}
                        disableSearch={true}
                        allowClearValueSingleInput={true}
                        data={DOCUMENT_TYPES_SORT}
                        formatItem={{
                            "id": "value"
                        }}
                        onchangeValue={item => {
                            const cloneIDs = [...types];
                            cloneIDs.push(item.value);
                            setTypes(cloneIDs);
                            dispatch(setFilterDropdown({ keyFilter: "types", dataFilter: cloneIDs }))

                            setPageIndex(0);
                            ref.current && ref.current.resetPaginate();
                        }}
                        onClearData={() => {
                            setTypes([]);
                            dispatch(setFilterDropdown({ keyFilter: "types", dataFilter: [] }))

                            setPageIndex(0);
                            ref.current && ref.current.resetPaginate();
                        }}
                        onMultipleRemoveValue={id => {
                            const cloneIDs = [...types];
                            const newList = cloneIDs.filter(selectId => selectId !== id);
                            setTypes(newList);
                            dispatch(setFilterDropdown({ keyFilter: "types", dataFilter: newList }))

                            setPageIndex(0);
                            ref.current && ref.current.resetPaginate();
                        }}
                        renderItem={(item) => (
                            <p className={"min-w-[300px]"}>{item.text}</p>
                        )}
                        selectOneByOne={true}
                    />
                    <DropdownSearchableV2
                        className={"mr-4 border border-primary-border rounded-lg mb-2"}
                        placeholder={"Dự án"}
                        prefixIcon={<img className={"mr-2"} src={projectIcon} alt={"icon"} />}
                        isMultiple={true}
                        allowClearValueSingleInput={true}
                        data={listProjectsUserIsMember}
                        formatItem={{
                            id: "_id",
                            text: "name"
                        }}
                        onSearchInputChange={debounce(valueSearch => setProjectKeyword(valueSearch), 500)}
                        onchangeValue={item => {
                            const cloneIDs = [...departmentsID];
                            cloneIDs.push(item._id);
                            setDepartmentsID(cloneIDs);
                            dispatch(setFilterDropdown({ keyFilter: "departmentsID", dataFilter: cloneIDs }))

                            setPageIndex(0);
                            ref.current && ref.current.resetPaginate();
                        }}
                        onClearData={() => {
                            setDepartmentsID([]);
                            dispatch(setFilterDropdown({ keyFilter: "departmentsID", dataFilter: [] }))

                            setPageIndex(0);
                            ref.current && ref.current.resetPaginate();
                        }}
                        onMultipleRemoveValue={id => {
                            const cloneIDs = [...departmentsID];
                            const newList = cloneIDs.filter(selectId => selectId !== id);
                            setDepartmentsID(newList);
                            dispatch(setFilterDropdown({ keyFilter: "departmentsID", dataFilter: newList }))

                            setPageIndex(0);
                            ref.current && ref.current.resetPaginate();
                        }}
                        renderItem={(item) => (
                            <p className={"min-w-[300px]"}>{item.sign}.{item.text}</p>
                        )}
                        selectOneByOne={true}
                    />
                    <TimeRangeDropdown
                        className={
                            "mr-4 border border-primary-border rounded-lg mb-2 p-1 pl-2 "
                        }
                        placeholder={"Ngày nhận"}
                        iconBack={<TriangleDown />}
                        iconFront={<img src={timelineIcon} alt={"----"} />}
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
                                text: "Cách đây 1 tuần",
                                fromDate: moment().subtract(7, "days").format("YYYY-MM-DD h:mm"),
                                toDate: moment().add(1, "minutes").format("YYYY-MM-DD h:mm"),
                            },
                            {
                                text: "Cách đây 1 tháng",
                                fromDate: moment().subtract(1, "months").format("YYYY-MM-DD h:mm"),
                                toDate: moment().add(1, "minutes").format("YYYY-MM-DD h:mm"),
                            },
                        ]}
                    />
                    <DropdownSearchableV2
                        className={"mr-4 border border-primary-border rounded-lg mb-2"}
                        placeholder={"Hướng hồ sơ"}
                        prefixIcon={<img className={"mr-2"} src={contractIcon} alt={"icon"} />}
                        isMultiple={true}
                        disableSearch={true}
                        allowClearValueSingleInput={true}
                        data={DIRECTION_TYPES}
                        formatItem={{
                            "id": "value"
                        }}
                        onchangeValue={item => {
                            const cloneIDs = [...directions];
                            cloneIDs.push(item.value);
                            setDirections(cloneIDs);
                            dispatch(setFilterDropdown({ keyFilter: "directions", dataFilter: cloneIDs }))

                            setPageIndex(0);
                            ref.current && ref.current.resetPaginate();
                        }}
                        onClearData={() => {
                            setDirections([]);
                            dispatch(setFilterDropdown({ keyFilter: "directions", dataFilter: [] }))

                            setPageIndex(0);
                            ref.current && ref.current.resetPaginate();
                        }}
                        onMultipleRemoveValue={id => {
                            const cloneIDs = [...directions];
                            const newList = cloneIDs.filter(selectId => selectId !== id);
                            setDirections(newList);
                            dispatch(setFilterDropdown({ keyFilter: "directions", dataFilter: newList }))

                            setPageIndex(0);
                            ref.current && ref.current.resetPaginate();
                        }}
                        renderItem={(item) => (
                            <p className={"min-w-[300px]"}>{item.text}</p>
                        )}
                        selectOneByOne={true}
                    />
                    <DropdownSearchableV2
                        className={"mr-4 border border-primary-border rounded-lg mb-2"}
                        placeholder={"Hợp đồng"}
                        prefixIcon={<img className={"mr-2"} src={contractIcon} alt={"icon"} />}
                        isMultiple={true}
                        disableSearch={false}
                        allowClearValueSingleInput={true}
                        data={listContracts}
                        formatItem={{
                            id: "_id",
                            text: "name"
                        }}
                        onSearchInputChange={debounce(valueSearch => setContractKeyword(valueSearch), 500)}
                        onchangeValue={item => {
                            const cloneIDs = [...contractsID];
                            cloneIDs.push(item._id);
                            setContractsID(cloneIDs);
                            dispatch(setFilterDropdown({ keyFilter: "contractsID", dataFilter: cloneIDs }))

                            setPageIndex(0);
                            ref.current && ref.current.resetPaginate();
                        }}
                        onClearData={() => {
                            setContractsID([]);
                            dispatch(setFilterDropdown({ keyFilter: "contractsID", dataFilter: [] }))

                            setPageIndex(0);
                            ref.current && ref.current.resetPaginate();
                        }}
                        onMultipleRemoveValue={id => {
                            const cloneIDs = [...contractsID];
                            const newList = cloneIDs.filter(selectId => selectId !== id);
                            setContractsID(newList);
                            dispatch(setFilterDropdown({ keyFilter: "contractsID", dataFilter: newList }))

                            setPageIndex(0);
                            ref.current && ref.current.resetPaginate();
                        }}
                        renderItem={(item) => (
                            <p className={"min-w-[300px]"}>{item.project.sign}.{item.name}-{item.sign}</p>
                        )}
                        selectOneByOne={true}
                    />
                </div>
                <div className={"flex items-center pb-2"}>
                    <input
                        className="form-check-input ml-4"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                    />
                    <button className={"flex items-center justify-center mx-3 ml-6"}
                        onClick={handleExport.bind(null)}
                    >
                        Download
                        <img src={downloadIcon} alt={"-----"} className={"ml-2 w-[18px] h-[18px]"}/>
                    </button>

                    <PaginateV2
                        ref={ref}
                        totalRecord={totalRecord}
                        totalPages={totalPage}
                        limit={20}
                        hasNextPage={hasNextPage}
                        isFetching={isLoading}
                        nextPageAction={() => {
                            fetchNextPageDocument();
                            setPageIndex(oldState => oldState + 1)
                        }}
                        prevPageAction={() => {
                            setPageIndex(oldState => oldState - 1)
                        }}
                    />
                </div>
            </div>
            <div className="flex-1 overflow-y-auto">
                {(!listDocumentWithPager[pageIndex] || listDocumentWithPager[pageIndex].length === 0) && !isLoading && !isFetching && (
                    <h2 className="text-center">Không có kết quả được trả về</h2>
                )}

                {!isLoading && listDocumentWithPager[pageIndex] && listDocumentWithPager[pageIndex].length > 0 && (
                    <table className={"table-fixed border-collapse w-full"}>
                        <thead>
                            <tr className={"sticky top-0 z-5"}>
                                <th className={"bg-cbs-table-header text-primary-gray text-center font-normal w-[50px] border-b-0.5 border-primary-border align-middle py-3"}>
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        value=""
                                        id="flexCheckDefault"
                                    />
                                </th>
                                <th className={"bg-cbs-table-header text-primary-gray text-left font-normal w-1/5 border-b-0.5 border-primary-border align-middle py-3"}>
                                    Nội dung
                                </th>
                                <th className={"bg-cbs-table-header text-primary-gray text-left font-normal w-1/6 border-b-0.5 border-primary-border align-middle py-3"}>
                                    Đơn vị ban hành hồ sơ
                                </th>
                                <th className={"bg-cbs-table-header text-primary-gray text-left font-normal border-b-0.5 border-primary-border align-middle py-3"}>
                                    Mã hiệu
                                </th>
                                <th className={"bg-cbs-table-header text-primary-gray text-left font-normal border-b-0.5 border-primary-border align-middle py-3"}>
                                    Ngày văn bản
                                </th>
                                <th className={"bg-cbs-table-header text-primary-gray text-left font-normal border-b-0.5 border-primary-border align-middle py-3"}>
                                    Mã hiệu lưu
                                </th>
                                <th className={"bg-cbs-table-header w-[70px] text-primary-gray text-center font-normal border-b-0.5 border-primary-border align-middle py-3"}>
                                    Số lượng
                                </th>
                                <th className={"bg-cbs-table-header text-primary-gray text-left font-normal border-b-0.5 border-primary-border align-middle py-3"}>
                                    Tình trạng
                                </th>
                                <th className={"bg-cbs-table-header text-primary-gray text-left font-normal w-1/7 border-b-0.5 border-primary-border align-middle py-3"}>
                                    Ghi chú
                                </th>
                                <th className={"bg-cbs-table-header text-primary-gray text-left font-normal w-1/7 border-b-0.5 border-primary-border align-middle py-3"}>
                                    Địa chỉ lưu trữ
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                (listDocumentWithPager[pageIndex] ?? []).map((document, i) => (
                                    <tr key={i}>
                                        <td className={"border-b-0.5 border-primary-border py-3 text-center"}>
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                value=""
                                                id={"flexCheckDefault_" + document._id}
                                                checked={document._id === recordSelected._id}
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        setSelectRecord(document);
                                                        return null;
                                                    }
                                                    setSelectRecord({});
                                                    return null;
                                                }}
                                            />
                                        </td>
                                        <td className={"border-b-0.5 border-primary-border py-3"}>
                                            <p><Link to={`/document/home/${document._id}`}>{document.name}</Link></p>
                                            <p className={"mt-1 text-primary-gray text-xs"}>{moment(document.createAt).format('DD/MM/YYYY HH:mm')} | {document.author?.fullname}</p>
                                            {document?.files.map((fileAttach: any) => (
                                                <div className="flex items-center" key={fileAttach._id}>
                                                    <img
                                                        src={pdfIcon}
                                                        alt=""
                                                        className="h-6 w-6 px-1 box-content"
                                                    />
                                                    <a className="text-primary" href={`${process.env.REACT_APP_URL_S3}${fileAttach?.path}`} target="_blank" rel="noreferrer"> {fileAttach?.nameOrg || "-"} </a>
                                                </div>
                                            ))}
                                        </td>
                                        <td className={"border-b-0.5 border-primary-border py-3"}>
                                            {document.publish?.name}
                                        </td>
                                        <td className={"border-b-0.5 border-primary-border py-3 break-all"}>
                                            {document.sign}
                                        </td>
                                        <td className={"border-b-0.5 border-primary-border py-3 text-center"}>
                                            {moment(document.date).format('DD/MM/YYYY')}
                                        </td>
                                        <td className={"border-b-0.5 border-primary-border py-3 break-all"}>
                                            {document.storeSign}
                                        </td>
                                        <td className={"border-b-0.5 border-primary-border py-3 text-right pr-2"}>
                                            {document.amount}
                                        </td>
                                        <td className={"border-b-0.5 border-primary-border py-3"}>
                                            {document.status}
                                        </td>
                                        <td className={"border-b-0.5 border-primary-border py-3"}>
                                            {document.note}
                                        </td>
                                        <td className={"border-b-0.5 border-primary-border py-3"}>
                                            {document.storage?.name}
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    )
}

export default DocumentHomePageV2;