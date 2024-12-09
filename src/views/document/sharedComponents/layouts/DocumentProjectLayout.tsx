import React, {createContext, FC, useContext, useEffect, useMemo, useState} from "react";
import {DropdownSearchableV2} from "shareComponents/common";
import TimeRangeDropdown from "shareComponents/common/TimeRangeDropdown";
import maleUserIcon from "assets/images/icons8-male-user-64.svg";
import categoryIcon from "assets/images/icons8-category-48.svg";
import TriangleDown from "assets/icons/TriangleDown";
import timelineIcon from "assets/images/icons8-timeline-week-48.svg";
import contractIcon from "assets/images/icons8-contract-64-blue.svg";
import echoDbIcon from "assets/images/icons8-amazon-echo-48.svg";
import downloadIcon from "assets/images/icons8-download-64.svg";
import pencilIcon from "assets/images/icons8-pencil-96 1.png";
import nextIcon from "assets/images/icons-arrow-next.svg";
import {useParams} from "react-router-dom";
import { Link } from "react-router-dom";
import { ModalContext } from "views/document/contexts/modal";
import {useQueryDetailDepartment} from "services/hooks/items/useDepartment";
import {useMutationDocumentChild} from "services/hooks/document/useDocumentChild";
import {useQueryDetailDocument, useQueryListDocument} from "../../../../services/hooks/ppt/useDocument";

export const DocumentProjectContext = createContext<{
    recordSelected: any;
    setSelectRecord: React.Dispatch<React.SetStateAction<any>>;
}>({
    recordSelected: {},
    setSelectRecord: () => undefined,
});
export const DocumentProjectLayout:FC = ({children}) => {
    const {id: departmentID, "0": type} = useParams<{id: string, 0: string}>();

    const [recordSelected, setSelectRecord] = useState<any>({});

    const value = useMemo(
        () => ({ recordSelected, setSelectRecord}),
        [recordSelected]
    );

    const [pageParam, setPageParam] = useState<any>({});
    const [cursorPage, setCursorPage] = useState<string[]>([]);
    const { toggleModal, updateModal } = useContext(ModalContext);
    const { onFetchDetailDepartmentAsync } = useQueryDetailDepartment();
    const { insertDocumentChildAsync, updateDocumentChildAsync } = useMutationDocumentChild();
    const { data, totalRecord, totalPages, loading, nextCursor, refetch } = useQueryListDocument(departmentID, pageParam, "");
    const { onFetchDetailDocumentAsync }   = useQueryDetailDocument();

    const handleNextPage = React.useCallback(() => {
        if (nextCursor) {
            setPageParam({ lastestID: nextCursor });
        }
    }, [nextCursor]);

    const handlePrevPage = React.useCallback(() => {
        const currentIndex = cursorPage.findIndex(
            (cursor) => cursor === pageParam?.lastestID
        );
        if (currentIndex >= 0) {
            setPageParam({ lastestID: cursorPage[currentIndex - 1] }); // lấy id trước đó
        }
    }, [cursorPage, pageParam]);

    const handleOnFilter = React.useCallback((values) => {
        setPageParam(() => ({ ...values }));
        return true;
    }, []);

    const handleOnCancelFilter = React.useCallback(() => {
        setPageParam({});
    }, []);

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
                    refetch();
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
        refetch,
        toggleModal,
        updateModal,
    ]);

    const handleOnClickUpdate = React.useCallback(
        (record) => async () => {
            const result = await onFetchDetailDocumentAsync(record._id);
            toggleModal();
            updateModal({
                departmentId: departmentID,
                departmentInfo: {
                    company: {
                        _id: record.company,
                    },
                },
                title: "Cập nhật",
                initialValues: result,
                onSubmit: async (values: any) => {
                    const result = await updateDocumentChildAsync({
                        ...values,
                        documentID: record._id,
                    });
                    if (result.status === 200) {
                        refetch();
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
            refetch,
            toggleModal,
            updateDocumentChildAsync,
            updateModal,
        ]
    );

    return (
        <div className="flex flex-1 flex-col overflow-hidden">
            <div className={"sticky top-0 z-10"}>
                <div className={"flex flex-wrap items-center px-4 py-2"}>
                    <div className={"flex items-center flex-1"}>
                        <DropdownSearchableV2
                            className={"mr-4 border border-primary-border rounded-lg mb-2"}
                            placeholder={"Đơn vị ban hành"}
                            prefixIcon={<img className={"mr-2"} src={maleUserIcon} alt={"icon"}/>}
                            isMultiple={true}
                            disableSearch={true}
                            data={[]}
                        />
                        <DropdownSearchableV2
                            className={"mr-4 border border-primary-border rounded-lg mb-2"}
                            placeholder={"Tính chất hồ sơ"}
                            prefixIcon={<img className={"mr-2"} src={categoryIcon} alt={"icon"}/>}
                            isMultiple={true}
                            disableSearch={true}
                            data={[]}
                        />
                        <TimeRangeDropdown
                            className={
                                "mr-4 border border-primary-border rounded-lg mb-2 p-1 pl-2 "
                            }
                            placeholder={"Ngày nhận"}
                            iconBack={<TriangleDown />}
                            iconFront={<img src={timelineIcon} alt={"----"} />}
                            onValueChange={(val) => console.log(val)}
                            options={[
                                {
                                    text: "Tất cả",
                                    fromDate: "00/00/0000",
                                    toDate: "31/12/2999",
                                },
                                {
                                    text: "1 tuần tới",
                                    fromDate: "12/08/2022",
                                    toDate: "17/08/2022",
                                },
                                {
                                    text: "> 7 ngày tiếp theo",
                                    fromDate: "17/08/2022",
                                    toDate: "31/12/2999",
                                },
                            ]}
                        />
                        <DropdownSearchableV2
                            className={"mr-4 border border-primary-border rounded-lg mb-2"}
                            placeholder={"Hướng hồ sơ"}
                            prefixIcon={<img className={"mr-2"} src={contractIcon} alt={"icon"}/>}
                            isMultiple={true}
                            disableSearch={true}
                            data={[]}
                        />
                        <DropdownSearchableV2
                            className={"mr-4 border border-primary-border rounded-lg mb-2"}
                            placeholder={"Thuộc hợp đồng"}
                            prefixIcon={<img className={"mr-2"} src={contractIcon} alt={"icon"}/>}
                            isMultiple={true}
                            disableSearch={true}
                            data={[]}
                        />
                        <DropdownSearchableV2
                            className={"mr-4 border border-primary-border rounded-lg mb-2"}
                            placeholder={"Địa chỉ lưu trữ"}
                            prefixIcon={<img className={"mr-2"} src={echoDbIcon} alt={"icon"}/>}
                            isMultiple={true}
                            disableSearch={true}
                            data={[]}
                        />
                    </div>
                    <button
                        onClick={() => handleCreate()}
                        className={"h-[32px] rounded bg-cbs-green text-white font-bold px-4 mb-2"}>
                        Tạo mới
                    </button>
                </div>
                <div className={"flex items-center pb-2"}>
                    <div className={"border-0.5 border-primary-border flex items-center"}>
                        <Link to={`/pm/project/${departmentID}/document`} className={"px-4 py-2 border-r-0.5 border-primary-border " + (!type ? "bg-cbs-soft-blue text-primary" : "bg-white text-primary-gray")}>
                            Danh sách
                        </Link>
                        <Link to={`/pm/project/${departmentID}/document/1`} className={"px-4 py-2 border-r-0.5 border-primary-border " + (type === "1" ? "bg-cbs-soft-blue text-primary" : "bg-white text-primary-gray")}>
                            Tính chất
                        </Link>
                        <Link to={`/pm/project/${departmentID}/document/2`} className={"px-4 py-2 border-r-0.5 border-primary-border " + (type === "2" ? "bg-cbs-soft-blue text-primary" : "bg-white text-primary-gray")}>
                            Đơn vị ban hành
                        </Link>
                        <Link to={`/pm/project/${departmentID}/document/3`} className={"px-4 py-2 border-r-0.5 border-primary-border " + (type === "3" ? "bg-cbs-soft-blue text-primary" : "bg-white text-primary-gray")}>
                            Gói thầu
                        </Link>
                    </div>
                    <button className={"flex items-center justify-center mx-3 ml-6"}>
                        <img src={downloadIcon} alt={"-----"} className={"w-[18px] h-[18px]"}/>
                    </button>
                    {
                        recordSelected._id&&
                        <button
                            onClick={handleOnClickUpdate(recordSelected)}
                            className={"flex items-center justify-center mx-3 ml-6"}>
                            <img src={pencilIcon} alt={"-----"} className={"w-[18px] h-[18px]"}/>
                        </button>
                    }
                    <div className={"flex-1 flex items-center justify-end"}>
                        <span className={"text-primary-gray"}>1-50 trong số 2.358</span>
                        <button className={"w-[36px] h-[36px] rounded-full bg-cbs-left-menu mx-2 disabled:bg-transparent disabled:opacity-50 flex items-center justify-center"} disabled={true}>
                            <img src={nextIcon} alt={"----"} className={"rotate-180"}/>
                        </button>
                        <button className={"w-[36px] h-[36px] rounded-full bg-cbs-left-menu mx-2 disabled:bg-transparent disabled:opacity-50 flex items-center justify-center"}>
                            <img src={nextIcon} alt={"----"}/>
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex-1 overflow-y-auto">
                <DocumentProjectContext.Provider value={value}>
                    {children}
                </DocumentProjectContext.Provider>
            </div>
        </div>
    );
}