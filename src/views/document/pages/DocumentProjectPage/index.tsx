import React, { FC, Fragment, useContext, useState, useEffect } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { Transition } from "@headlessui/react";
import { toast } from "react-toastify";
import moment from "moment";
import { read, utils } from 'xlsx';

// ========== Context ==========
import { ModalContext } from "views/document/contexts/modal";

// ========= Global Components =========
import {
    DropdownSearchableV2,
    Loader,
} from "shareComponents/common";

// ========== Components ==========

// ========== Hooks ==========
import {
    useQueryListDocument,
    useQueryDetailDocument,
} from "services/hooks/ppt/useDocument";
import { useQueryDetailDepartment } from "services/hooks/items/useDepartment";
import { useMutationDocumentChild } from "services/hooks/document/useDocumentChild";
import { useHistoryTraffics } from "services/hooks/auth/useAuth";
import { useDocumentCustom, useListFilterDocument } from "services/hooks/document/useDocument";

// ========== Utils ==========
import {APP_ID, DIRECTION_TYPES, DOCUMENT_TYPES, DOCUMENT_TYPES_SORT} from 'apis/localdb';
import { createLinkAndClick } from "utils";

import {useProject, useProjectCustom} from "services/hooks/items/useProject";
import maleUserIcon from "assets/images/icons8-male-user-64.svg";
import categoryIcon from "assets/images/icons8-category-48.svg";
import TimeRangeDropdown from "shareComponents/common/TimeRangeDropdown";
import TriangleDown from "assets/icons/TriangleDown";
import timelineIcon from "assets/images/icons8-timeline-week-48.svg";
import contractIcon from "assets/images/icons8-contract-64-blue.svg";
import echoDbIcon from "assets/images/icons8-amazon-echo-48.svg";
import downloadIcon from "assets/images/icons8-download-64.svg";
import iconPencil from "assets/images/icons8-pencil-96 1.png";
import nextIcon from "assets/images/icons-arrow-next.svg";
import {NavigateTab} from "../../sharedComponents/common";
import PaginateV2 from "../../../../shareComponents/common/PaginateV2";
import {useDatahubContact} from "services/hooks/datahub/contact/useDatahubContact";
import {useContractIsMembers} from "services/hooks/items/useContract";
import {debounce} from "lodash";
import {useStorage} from "services/hooks/items/useStorage";
import {useDispatch} from "react-redux";
import {useAppSelector} from "redux/reducer";
import {setFilterDropdown, resetAllFilterAndKeyword} from "redux/reducer/DocumentProjectSlice";
import { PmDocumentHeaderSearchInput } from "shareComponents/layouts/PmLayout/components";
import { useQueryListCompany } from "services/hooks/useCompanies";

const payloadHistoryTraffic: any = {
    appID: APP_ID.PCM.id,
    menuID: APP_ID.PCM.menuPcmProject.document.id,
    type: "1"
};

export const DocumentProjectPage: FC = () => {
    const dispatch = useDispatch();
    const {keywordInput} = useAppSelector(
        (state) => state.documentProject.data
    );

    useEffect(() => {
        setPageIndex(0);
        ref.current&&ref.current.resetPaginate();
    }, [keywordInput]);

    const { id: projectID } = useParams<{ id: string }>();
    const { info: projectInfo, isLoading: isloadingProjectInfo } = useProject({
        params: {
            departmentID: projectID
        },
        isFetchInfo: true
    })

    type PaginateHandle = React.ElementRef<typeof PaginateV2>;
    type DropdownHandle = React.ElementRef<typeof DropdownSearchableV2>;
    type TimeRangeHandle = React.ElementRef<typeof TimeRangeDropdown>;
    // console.log({projectID})
    const ref = React.useRef<PaginateHandle>(null);
    const datahubRef = React.useRef<DropdownHandle>(null);
    const typesRef = React.useRef<DropdownHandle>(null);
    const directionsRef = React.useRef<DropdownHandle>(null);
    const contractsRef = React.useRef<DropdownHandle>(null);
    const storagesRef = React.useRef<DropdownHandle>(null);
    const fromToRef = React.useRef<TimeRangeHandle>(null);

    const [pageIndex, setPageIndex] = useState(0);
    const [recordSelected, setSelectRecord] = useState<any>({});

    // console.log({projectInfo})

    useEffect(() => {
        document.title = `${projectInfo.sign} | Hồ sơ văn bản`;
    }, [projectInfo]);

    //_____Start history traffict
    const { createHistoryTraffics } = useHistoryTraffics();

    //_____End history traffict
    const location = useLocation()
    const { id: departmentID } = useParams<{ id: string }>();
    const [isShow, setIsShow] = useState<boolean>(false);

    //_____Import, export excel
    const [dataImport, setDataImport] = useState([]);
    const [stateExport, setStateExport] = useState<{ isExporting: boolean }>({
        isExporting: false,
    });

    const [fromToDate, setFromToDate] = useState({fromDate: "", toDate: ""})

    const [keywordDatahubContact, setKeywordDatahubContact] = useState("");
    const [datahubContactsID, setDatahubContactsID] = useState<string[]>([]);

    const [types, setTypes] = useState<string[]>([]);

    const [directions, setDirections] = useState<string[]>([]);

    const [contractKeyword, setContractKeyword] = useState("");
    const [contractsID, setContractsID] = useState<string[]>([]);

    const [storageKeyword, setStorageKeyword] = useState("");
    const [storagesID, setStoragesID] = useState<string[]>([]);

    // const { data: listDatahubContact } = useDatahubContact({ keyword: keywordDatahubContact }, true, false); // Danh bạ hệ thống
	const { data: listDatahubContact } = useQueryListCompany({ keyword: keywordDatahubContact }); // Danh bạ hệ thống mới

    const { listContracts } = useContractIsMembers({ params: {keyword: contractKeyword, populates: JSON.stringify({"path": "project", "select":"name sign"})}, isFetch: true });
    const { list: listStorages } = useStorage({ params: { companyID: typeof projectInfo.company === "string" ? projectInfo.company : "", keyword: storageKeyword,}, isFetchList: (!isloadingProjectInfo && typeof projectInfo._id === "string")});

    const { listDocumentWithPager, isLoading, isFetching, totalRecord, totalPage, fetchNextPageDocument, hasNextPage, refetchListDocument,  } = useListFilterDocument({
        params: {
            departmentsID: [departmentID],
            ...fromToDate,
            datahubContactsID,
            types,
            directions,
            contractsID,
            storagesID,
            keyword: keywordInput
        },
        isFetchList: true
    });

    const { downloadTemplateImportExcelDocumentAsync, importDocumentFromExcelAsync, exportDocumentAsync } = useDocumentCustom({});
    const { onFetchDetailDepartmentAsync } = useQueryDetailDepartment();
    const { insertDocumentChildAsync, updateDocumentChildAsync } = useMutationDocumentChild();
    const { toggleModal, updateModal } = useContext(ModalContext);
    const { onFetchDetailDocumentAsync }   = useQueryDetailDocument();

    const handleCreate = React.useCallback(async () => {
        const result = await onFetchDetailDepartmentAsync(departmentID);
        toggleModal();
        updateModal({
            departmentId: departmentID,
            departmentInfo: result,
            title: "Thêm mới",
            onSubmit: async (values: any) => {
                const result = await insertDocumentChildAsync({
                    ...values,
                    departmentID,
                });
                if (result.status === 200) {
                    setSelectRecord({});
                    resetAllFilter();
                    dispatch(resetAllFilterAndKeyword({}));
                    refetchListDocument();
                    setPageIndex(0);
                    ref.current&&ref.current.resetPaginate();
                    toggleModal();
                    updateModal({
                        departmentInfo: {},
                    });
                }
            },
        });
    }, [
        departmentID,
        insertDocumentChildAsync,
        onFetchDetailDepartmentAsync,
        refetchListDocument,
        toggleModal,
        updateModal,
    ]);

    const handleOnClickUpdate = React.useCallback((record) => async () => {
            const result = await onFetchDetailDocumentAsync(record._id);
            toggleModal();
            updateModal({
                departmentId: departmentID,
                departmentInfo: result,
                title: "Cập nhật",
                initialValues: result,
                onSubmit: async (values: any) => {
                    const result = await updateDocumentChildAsync({
                        ...values,
                        documentID: record._id,
                    });
                    if (result.status === 200) {
                        setSelectRecord({});
                        resetAllFilter();
                        dispatch(resetAllFilterAndKeyword({}));
                        refetchListDocument();
                        setPageIndex(0);
                        ref.current&&ref.current.resetPaginate();
                        toggleModal();
                        updateModal({
                            departmentInfo: {},
                            initialValues: {},
                        });
                    }
                },
            });
        },
        [
            departmentID,
            onFetchDetailDocumentAsync,
            refetchListDocument,
            toggleModal,
            updateDocumentChildAsync,
            updateModal,
        ]
    );

    const toggleModalConfirm = () => {
        setIsShow(!isShow);
    };

    useEffect(() => {
        createHistoryTraffics({...payloadHistoryTraffic, type: 1});
    }, []);

    /**
     * 
     * Xử lý download template excel
     */
    const handleDownloadTemplateImportExcel = async () => {
		try {
            setStateExport({ isExporting: true });
            const { error, data } = await downloadTemplateImportExcelDocumentAsync({
                projectID
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

    /**
     * 
     * Tải dữ liệu excel
     */
    const handleExport = async () => {
        try {
            setStateExport({ isExporting: true });
            const { error, data } = await exportDocumentAsync({
                filterParams: {  
                    departmentsID: [departmentID],
                    ...fromToDate,
                    datahubContactsID,
                    types,
                    directions,
                    contractsID,
                    storagesID,
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

    /**
     * Xử lý import excel (đọc file)
     */
    const handleImport = ($event: any) => {
        const files = $event.target.files;
        if (files.length) {
            const file = files[0];
            const reader = new FileReader();
            reader.onload = (event: any) => {
                const wb = read(event.target.result);
                const sheets = wb.SheetNames;

                if (sheets.length) {
                    const rows: any = utils.sheet_to_json(wb.Sheets[sheets[1]]); // Index=1 (tức Sheet số 2 từ trái sang)
                    
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
                const data = await importDocumentFromExcelAsync({ projectID, dataImport: JSON.stringify(dataImport) });
                setDataImport([]);
                // refetchTaskInfo?.()

                if(!data.error){
                    return toast.success("Import thành công");
                }
                return toast.error(data.message);
            }

            fetchData();
        }
        
        console.log('=========DATA THAY ĐỔI RỒI==============')
    }, [dataImport])

    const resetAllFilter = () => {
        datahubRef.current&&datahubRef.current.resetDropdown();
        typesRef.current&&typesRef.current.resetDropdown();
        directionsRef.current&&directionsRef.current.resetDropdown();
        storagesRef.current&&storagesRef.current.resetDropdown();
        contractsRef.current&&contractsRef.current.resetDropdown();
        fromToRef.current&&fromToRef.current.resetTimeRange();
    }

    if(stateExport.isExporting) {
        return <Loader className="border-primary" />
    }

    return (
        <div className="flex flex-1 flex-col overflow-hidden h-full">
            <div className={"sticky top-0 z-10"}>
                <div className={"flex flex-wrap items-center px-4 py-2"}>
                    <div className={"flex items-center flex-1"}>
                        <DropdownSearchableV2
                            ref={datahubRef}
                            className={"mr-4 border border-primary-border rounded-lg mb-2"}
                            placeholder={"Đơn vị ban hành"}
                            prefixIcon={<img className={"mr-2"} src={maleUserIcon} alt={"icon"}/>}
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
                                dispatch(setFilterDropdown({keyFilter: "datahubContactsID", dataFilter: cloneIDs}))

                                setPageIndex(0);
                                ref.current&&ref.current.resetPaginate();
                            }}
                            onClearData={() => {
                                setDatahubContactsID([]);
                                dispatch(setFilterDropdown({keyFilter: "datahubContactsID", dataFilter: []}))

                                setPageIndex(0);
                                ref.current&&ref.current.resetPaginate();
                            }}
                            onMultipleRemoveValue={id => {
                                const cloneIDs = [...datahubContactsID];
                                const newList = cloneIDs.filter(selectId => selectId !== id);
                                setDatahubContactsID(newList);
                                dispatch(setFilterDropdown({keyFilter: "datahubContactsID", dataFilter: newList}))

                                setPageIndex(0);
                                ref.current&&ref.current.resetPaginate();
                            }}
                            renderItem={(item) => (
                                <p className={"min-w-[300px]"}>{item.text}</p>
                            )}
                            selectOneByOne={true}
                        />
                        <DropdownSearchableV2
                            ref={typesRef}
                            className={"mr-4 border border-primary-border rounded-lg mb-2"}
                            placeholder={"Tính chất hồ sơ"}
                            prefixIcon={<img className={"mr-2"} src={categoryIcon} alt={"icon"}/>}
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
                                dispatch(setFilterDropdown({keyFilter: "types", dataFilter: cloneIDs}))

                                setPageIndex(0);
                                ref.current&&ref.current.resetPaginate();
                            }}
                            onClearData={() => {
                                setTypes([]);
                                dispatch(setFilterDropdown({keyFilter: "types", dataFilter: []}))

                                setPageIndex(0);
                                ref.current&&ref.current.resetPaginate();
                            }}
                            onMultipleRemoveValue={id => {
                                const cloneIDs = [...types];
                                const newList = cloneIDs.filter(selectId => selectId !== id);
                                setTypes(newList);
                                dispatch(setFilterDropdown({keyFilter: "types", dataFilter: newList}))

                                setPageIndex(0);
                                ref.current&&ref.current.resetPaginate();
                            }}
                            renderItem={(item) => (
                                <p className={"min-w-[300px]"}>{item.text}</p>
                            )}
                            selectOneByOne={true}
                        />
                        <TimeRangeDropdown
                            ref={fromToRef}
                            className={
                                "mr-4 border border-primary-border rounded-lg mb-2 p-1 pl-2 "
                            }
                            placeholder={"Ngày nhận"}
                            iconBack={<TriangleDown />}
                            iconFront={<img src={timelineIcon} alt={"----"} />}
                            onValueChange={(val) => {
                                setFromToDate(val)
                                dispatch(setFilterDropdown({keyFilter: "fromDate", dataFilter: val.fromDate}))
                                dispatch(setFilterDropdown({keyFilter: "toDate", dataFilter: val.toDate}))
                                setPageIndex(0);
                                ref.current&&ref.current.resetPaginate();
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
                            ref={directionsRef}
                            className={"mr-4 border border-primary-border rounded-lg mb-2"}
                            placeholder={"Hướng hồ sơ"}
                            prefixIcon={<img className={"mr-2"} src={contractIcon} alt={"icon"}/>}
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
                                dispatch(setFilterDropdown({keyFilter: "directions", dataFilter: cloneIDs}))

                                setPageIndex(0);
                                ref.current&&ref.current.resetPaginate();
                            }}
                            onClearData={() => {
                                setDirections([]);
                                dispatch(setFilterDropdown({keyFilter: "directions", dataFilter: []}))

                                setPageIndex(0);
                                ref.current&&ref.current.resetPaginate();
                            }}
                            onMultipleRemoveValue={id => {
                                const cloneIDs = [...directions];
                                const newList = cloneIDs.filter(selectId => selectId !== id);
                                setDirections(newList);
                                dispatch(setFilterDropdown({keyFilter: "directions", dataFilter: newList}))

                                setPageIndex(0);
                                ref.current&&ref.current.resetPaginate();
                            }}
                            renderItem={(item) => (
                                <p className={"min-w-[300px]"}>{item.text}</p>
                            )}
                            selectOneByOne={true}
                        />
                        <DropdownSearchableV2
                            ref={contractsRef}
                            className={"mr-4 border border-primary-border rounded-lg mb-2"}
                            placeholder={"Thuộc hợp đồng"}
                            prefixIcon={<img className={"mr-2"} src={contractIcon} alt={"icon"}/>}
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
                                dispatch(setFilterDropdown({keyFilter: "contractsID", dataFilter: cloneIDs}))

                                setPageIndex(0);
                                ref.current&&ref.current.resetPaginate();
                            }}
                            onClearData={() => {
                                setContractsID([]);
                                dispatch(setFilterDropdown({keyFilter: "contractsID", dataFilter: []}))

                                setPageIndex(0);
                                ref.current&&ref.current.resetPaginate();
                            }}
                            onMultipleRemoveValue={id => {
                                const cloneIDs = [...contractsID];
                                const newList = cloneIDs.filter(selectId => selectId !== id);
                                setContractsID(newList);
                                dispatch(setFilterDropdown({keyFilter: "contractsID", dataFilter: newList}))

                                setPageIndex(0);
                                ref.current&&ref.current.resetPaginate();
                            }}
                            renderItem={(item) => (
                                <p className={"min-w-[300px]"}>{item.project.sign}.{item.name}-{item.sign}</p>
                            )}
                            selectOneByOne={true}
                        />
                        <DropdownSearchableV2
                            ref={storagesRef}
                            className={"mr-4 border border-primary-border rounded-lg mb-2"}
                            placeholder={"Địa chỉ lưu trữ"}
                            prefixIcon={<img className={"mr-2"} src={echoDbIcon} alt={"icon"}/>}
                            disableSearch={false}
                            isMultiple={true}
                            allowClearValueSingleInput={true}
                            data={listStorages}
                            formatItem={{
                                id: "_id",
                                text: "name"
                            }}
                            onSearchInputChange={debounce(valueSearch => setStorageKeyword(valueSearch), 500)}
                            onchangeValue={item => {
                                const cloneIDs = [...storagesID];
                                cloneIDs.push(item._id);
                                setStoragesID(cloneIDs);
                                dispatch(setFilterDropdown({keyFilter: "storagesID", dataFilter: cloneIDs}))

                                setPageIndex(0);
                                ref.current&&ref.current.resetPaginate();
                            }}
                            onClearData={() => {
                                setStoragesID([]);
                                dispatch(setFilterDropdown({keyFilter: "storagesID", dataFilter: []}))

                                setPageIndex(0);
                                ref.current&&ref.current.resetPaginate();
                            }}
                            onMultipleRemoveValue={id => {
                                const cloneIDs = [...storagesID];
                                const newList = cloneIDs.filter(selectId => selectId !== id);
                                setStoragesID(newList);
                                dispatch(setFilterDropdown({keyFilter: "storagesID", dataFilter: newList}))

                                setPageIndex(0);
                                ref.current&&ref.current.resetPaginate();
                            }}
                            renderItem={(item) => (
                                <p className={"min-w-[300px]"}>{item.text}</p>
                            )}
                            selectOneByOne={true}
                        />
                    </div>
                    <button
                        onClick={() => handleCreate()}
                        className={"h-[32px] rounded bg-cbs-green text-white font-bold px-4 mb-2"}>
                        Tạo mới
                    </button>
                </div>
                <div className={"flex items-center pb-2"}>
                    <NavigateTab/>
                    <button className={"flex items-center justify-center mx-3 ml-6"}
                        onClick={handleExport.bind(null)}
                    >
                        <img src={downloadIcon} alt={"-----"} className={"w-[18px] h-[18px]"}/>
                    </button>
                    <button className={"flex items-center justify-center mx-3 ml-3"}
                            onClick={handleDownloadTemplateImportExcel}
                        >
                            Tải mẫu Import Excel
                    </button>
                    <button className={"flex items-center justify-center mx-3 ml-3"}>
                        <input type="file" name="file" className="custom-file-input" id="inputGroupFile" required hidden onChange={handleImport}
                        accept=".xlsx, .xlsm, .xls, .csv"/>
                        <label className="custom-file-label" htmlFor="inputGroupFile">Import excel tạo Hồ sơ</label>
                    </button>
                    {
                        recordSelected._id&&
                        <button
                            onClick={handleOnClickUpdate(recordSelected)}
                            className={"flex items-center justify-center mx-3 ml-6"}>
                            <img src={iconPencil} alt={"-----"} className={"w-[18px] h-[18px]"}/>
                        </button>
                    }
                    <PaginateV2
                        ref={ref}
                        totalRecord={totalRecord}
                        totalPages={totalPage}
                        limit={20}
                        hasNextPage={hasNextPage}
                        isFetching={isLoading}
                        nextPageAction={() => {
                            fetchNextPageDocument();
                            setPageIndex(oldState => oldState+1)
                        }}
                        prevPageAction={() => {
                            setPageIndex(oldState => oldState-1)
                        }}
                    />
                </div>
            </div>
            <div className="flex-1 overflow-y-auto">
                {/* Content */}
                {isLoading || isFetching && <Loader absolute={true} className="border-primary" />}
                {(!listDocumentWithPager[pageIndex] || listDocumentWithPager[pageIndex].length === 0) && !isLoading && !isFetching && (
                    <h2 className="text-center">Không có kết quả được trả về</h2>
                )}

                {!isLoading && listDocumentWithPager[pageIndex] && listDocumentWithPager[pageIndex].length > 0 && (
                    <table
                        className="text-black text-medium border-separate space-x-0 space-y-0"
                        style={{ borderSpacing: 0 }}
                    >
                        <thead className="">
                        <tr className="text-primary-gray whitespace-nowrap align-middle text-left">
                            <th className="px-4 py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border" style={{ width: '30px' }}>
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="flexCheckDefault"
                                />
                            </th>
                            <th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border" style={{ width: '25%' }}>
                                Nội dung
                            </th>
                            <th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border" style={{ width: '15%' }}>
                                Đơn vị ban hành
                            </th>
                            <th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border" style={{ width: '10%' }}>
                                Mã hiệu
                            </th>
                            <th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border" style={{ width: '5%' }}>
                                Ngày văn bản
                            </th>
                            <th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border" style={{ width: '5%' }}>
                                Mã hiệu lưu
                            </th>
                            <th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border" style={{ width: '5%' }}>
                                Số lượng
                            </th>
                            <th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border" style={{ width: '10%' }}>
                                Tình trạng
                            </th>
                            <th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border">
                                Ghi chú
                            </th>
                            <th
                                className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border"
                                style={{ width: '10%' }}
                            >
                                Địa chỉ lưu trữ
                            </th>
                        </tr>
                        </thead>
                        <tbody className="">
                        {listDocumentWithPager[pageIndex].map((document, index) => {
                            let linkRef;
                            if(location.pathname.includes("/document/project/")){
                                linkRef = `/document/project/${document.project._id}/detail/${document._id}`
                            }else{
                                linkRef = `/pm/project/${document.project._id}/document/${document._id}`
                            }
                            return (
                                <tr
                                    key={index}
                                    className="text-left hover:bg-cbs-active-comment"
                                >
                                    <td className="px-4 py-2.5 border-b border-cbs-border">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="flexCheckDefault"
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
                                    <td className="px-2 w-[271px] py-2.5 border-b border-cbs-border">
                                        <Link to={linkRef}>
                                            <p className="text-cbs-highlight-color">{document?.name || ""}</p>
                                            <p className="mt-1.5 text-primary-gray text-xs">
                                                {`${document?.author?.fullname || ""}-${
                                                    moment(document.createAt).isValid() &&
                                                    moment(document.createAt).format("DD/MM/YYYY")
                                                }`}
                                            </p>
                                        </Link>
                                    </td>
                                    <td className="py-2.5 border-b border-cbs-border px-2">
                                        {document?.publish?.name ? document?.publish?.name : <p className="text-cbs-highlight-color"><i>{document?.datahubContact?.name}</i></p>}
                                        {/* <p><i>{document?.datahubContact?.name}</i></p> */}
                                    </td>
                                    <td className="py-2.5 border-b border-cbs-border px-2">
                                        {document?.sign}
                                    </td>
                                    <td className="py-2.5 border-b border-cbs-border px-2 w-24 text-right">
                                        {moment(document.date).isValid() && moment(document.date).format("DD/MM/YYYY")}
                                    </td>
                                    <td className="py-2.5 border-b border-cbs-border px-2">
                                        {document?.storeSign}
                                    </td>
                                    <td className="py-2.5 border-b border-cbs-border px-2 whitespace-nowrap text-right">
                                        {document.amount}
                                    </td>
                                    <td className="py-2.5 border-b border-cbs-border px-2 box-border">
                                        {document.status}
                                    </td>
                                    <td className="py-2.5 border-b border-cbs-border px-2 box-border">
                                        {document.note}
                                    </td>
                                    <td className="py-2.5 border-b border-cbs-border px-2">
                                        {document?.storage?.name}
                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                )}
                <Transition.Root appear show={isShow} as={Fragment}>
                    <div className="fixed inset-0 overflow-y-auto" style={{ zIndex: 51 }}>
                        <div className="min-h-screen px-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <div className="fixed inset-0 bg-dark bg-opacity-75 transition-opacity" />
                            </Transition.Child>

                            <span
                                className="inline-block h-screen align-middle"
                                aria-hidden="true"
                            >
                              &#8203;
                            </span>

                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <div className="inline-flex flex-col text-black w-full max-w-lg my-8 overflow-hidden text-left transition-all transform bg-white">
                                    <div className="p-5 mb-4 text-xl leading-6 font-bold">
                                        Bạn có muốn xóa không?
                                    </div>
                                    <div className="text-right pt-6 pb-5 px-8 text-base leading-5 border-t border-gray-100">
                                        <button
                                            className="py-1.5 px-3 border bg-white hover:bg-gray-100 shadow-xl rounded-md mr-2"
                                            onClick={toggleModalConfirm}
                                        >
                                            Hủy
                                        </button>
                                        <button
                                            className="py-1.5 px-3 border border-primary bg-primary hover:bg-opacity-90 text-white rounded-md"
                                            onClick={toggleModalConfirm}
                                        >
                                            Xác nhận
                                        </button>
                                    </div>
                                </div>
                            </Transition.Child>
                        </div>
                    </div>
                </Transition.Root>
            </div>
        </div>
    );
};

export default DocumentProjectPage;