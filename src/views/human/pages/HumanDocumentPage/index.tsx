import React, { FC, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import moment from "moment";

import {
    DropdownSearchableV2,
    Loader,
} from "shareComponents/common";

// ========== Utils ========== //
import { GENDER_TYPES } from 'apis/localdb';
import { createLinkAndClick } from "utils";
import TimeRangeDropdown from "shareComponents/common/TimeRangeDropdown";
import TriangleDown from "assets/icons/TriangleDown";
import downloadIcon from "assets/images/icons8-download-64.svg";
import PaginateV2 from "../../../../shareComponents/common/PaginateV2";
import {debounce} from "lodash";
import {useDispatch} from "react-redux";
import {useAppSelector} from "redux/reducer";
import {setFilterDropdown} from "redux/reducer/DocumentProjectSlice";
import { humanFileSize } from 'utils/converter';

// ========== Hooks ========== //
import { useHumanCustom, useListFilterHuman} from "services/hooks/human/useDocumentHuman";
import {useProjectCustom} from "services/hooks/items/useProject";

export const HumanDocumentPage: FC = () => {
    const [keyword, setKeyword] = useState('');

    const dispatch = useDispatch();
    const {keywordInput} = useAppSelector(
        (state) => state.documentProject.data
    );

    useEffect(() => {
        setPageIndex(0);
        ref.current&&ref.current.resetPaginate();
    }, [keywordInput]);

    type PaginateHandle = React.ElementRef<typeof PaginateV2>;
    type DropdownHandle = React.ElementRef<typeof DropdownSearchableV2>;
    type TimeRangeHandle = React.ElementRef<typeof TimeRangeDropdown>;

    const ref = React.useRef<PaginateHandle>(null);
    const datahubRef = React.useRef<DropdownHandle>(null);
    const typeRef = React.useRef<DropdownHandle>(null);
    const fromToRef = React.useRef<TimeRangeHandle>(null);

    const [pageIndex, setPageIndex] = useState(0);

    useEffect(() => {
        document.title = `Trixgo | Hồ sơ nhân sự`;
    });

    const location = useLocation()

    //_____Import, export excel
    const [stateExport, setStateExport] = useState<{ isExporting: boolean }>({
        isExporting: false,
    });

    const [genders, setGenders] = useState<string[]>([]);
    const [departmentsID, setDepartmentsID] = useState<string[]>([]);

    const [fromToDate, setFromToDate] = useState({fromDate: "", toDate: ""})

    const { listHumanWithPager, isLoading, isFetching, totalRecord, totalPage, fetchNextPageHuman, hasNextPage, refetchListHuman } = useListFilterHuman({
        params: {
            ...fromToDate,
            genders,
            departmentsID,
            keyword,
            types: ['5']
        },
        isFetchList: true
    });
    // console.log(listHumanWithPager)

    const onChangeSearch = debounce((event: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(event.target.value)
    }, 500)

    const { exportHumanAsync } = useHumanCustom({});

    // Làm việc với Excel
    const handleExport = async () => {
        try {
            setStateExport({ isExporting: true });
            const { error, data } = await exportHumanAsync({
                filterParams: {  
                    ...fromToDate,
                    genders,
                    departmentsID,
                    keyword
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
           <div className={"sticky top-0 z-10"}>
                <div className={"flex flex-wrap items-center px-4 py-2"}>
                    <div className={"flex items-center flex-1"}>
                        <div className="relative flex items-center">
                            <input 
                            placeholder="Tìm kiếm" 
                            className="pl-3 pr-3 mr-1 w-[175px] h-[32px] bg-cbs-table-header border border-primary-border rounded-lg mb-2"
                            onChange={onChangeSearch}
                            />
                        </div>
                        {/* <DropdownSearchableV2
                            ref={typeRef}
                            className={"mr-1 border border-primary-border rounded-lg mb-2"}
                            placeholder={"Giới tính"}
                            isMultiple={true}
                            disableSearch={true}
                            allowClearValueSingleInput={true}
                            data={GENDER_TYPES}
                            formatItem={{
                                "id": "value"
                            }}
                            onchangeValue={item => {
                                const cloneIDs = [...genders];
                                cloneIDs.push(item.value);
                                setGenders(cloneIDs);
                                dispatch(setFilterDropdown({keyFilter: "genders", dataFilter: cloneIDs}))

                                setPageIndex(0);
                                ref.current&&ref.current.resetPaginate();
                            }}
                            onClearData={() => {
                                setGenders([]);
                                dispatch(setFilterDropdown({keyFilter: "genders", dataFilter: []}))

                                setPageIndex(0);
                                ref.current&&ref.current.resetPaginate();
                            }}
                            onMultipleRemoveValue={id => {
                                const cloneIDs = [...genders];
                                const newList = cloneIDs.filter(selectId => selectId !== id);
                                setGenders(newList);
                                dispatch(setFilterDropdown({keyFilter: "genders", dataFilter: newList}))

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
                        /> */}

                        <TimeRangeDropdown
                            ref={fromToRef}
                            className={
                                "mr-1 border border-primary-border rounded-lg mb-2 p-1 pl-2 "
                            }
                            placeholder={"Thời hạn"}
                            iconBack={<TriangleDown />}
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
                                    text: "Quá hạn",
                                    fromDate: moment().subtract(100, "years").format("YYYY-MM-DD h:mm"),
                                    toDate: moment().subtract(1, "minutes").format("YYYY-MM-DD h:mm"),
                                },
                                {
                                    text: "Trong vòng 1 tháng tới",
                                    fromDate: moment().add(1, "minutes").format("YYYY-MM-DD h:mm"),
                                    toDate: moment().add(1, "months").format("YYYY-MM-DD h:mm"),
                                },
                                {
                                    text: "Từ 1 tới 3 tháng tới",
                                    fromDate: moment().add(1, "months").format("YYYY-MM-DD h:mm"),
                                    toDate: moment().add(3, "months").format("YYYY-MM-DD h:mm"),
                                },
                                {
                                    text: "Từ 3-6 tháng tới",
                                    fromDate: moment().add(3, "months").format("YYYY-MM-DD h:mm"),
                                    toDate: moment().add(6, "months").format("YYYY-MM-DD h:mm"),
                                },
                                {
                                    text: "Từ 6 tháng trở lên",
                                    fromDate: moment().add(6, "months").format("YYYY-MM-DD h:mm"),
                                    toDate: moment().add(100, "years").format("YYYY-MM-DD h:mm"),
                                },
                            ]}
                        />
                    </div>
                </div>
                <div className={"flex items-center pb-2"}>
                    <button className={"flex items-center justify-center mx-3 ml-6"}
                        onClick={handleExport}
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
                            fetchNextPageHuman();
                            setPageIndex(oldState => oldState+1)
                        }}
                        prevPageAction={() => {
                            setPageIndex(oldState => oldState-1)
                        }}
                    />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto">
            {isLoading || isFetching && <Loader absolute={true} className="border-primary" />}
                {(!listHumanWithPager[pageIndex] || listHumanWithPager[pageIndex].length === 0) && !isLoading && !isFetching && (
                    <h2 className="text-center">Không có kết quả được trả về</h2>
                )}

                {!isLoading && listHumanWithPager[pageIndex] && listHumanWithPager[pageIndex].length > 0 && (
                    <table
                        className="text-black text-medium border-separate space-x-0 space-y-0 w-full"
                        style={{ borderSpacing: 0 }}
                    >
                        <thead className="">
                        <tr className="text-primary-gray whitespace-nowrap align-middle text-left">
                            <th className="px-4 py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border" style={{ width: '30px' }}>
                                TT
                            </th>
                            <th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border">
                                Hồ sơ
                            </th>
                            <th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border">
                                Nhân sự
                            </th>
                            <th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border" >
                                Số hiệu
                            </th>
                            <th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border">
                                Ngày cấp
                            </th>
                            <th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border">
                                Nơi cấp
                            </th>
                            <th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border">
                                Thời hạn
                            </th>
                            <th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border">
                                Ghi chú
                            </th>
                        </tr>
                        </thead>
                        <tbody className="">
                        {listHumanWithPager[pageIndex].map((document, index) => {
                            let linkRef;
                            if(location.pathname.includes("/human/document/")){
                                linkRef = `/human/home/hid=${document?.contact?._id}`
                            }else{
                                linkRef = `/human/home/hid=${document?.contact?._id}`
                            }
                            return (
                                <tr
                                    key={index}
                                    className="text-left hover:bg-cbs-active-comment"
                                >
                                    <td className="px-4 py-2.5 border-b border-cbs-border">
                                        {index + 1}
                                    </td>
                                    <td className="px-2 py-2.5 border-b border-cbs-border">
                                        <Link to={linkRef}>
                                            {`${document.name}`}
                                            {/* <p><i>{document._id}</i></p> */}
                                        </Link>
                                        {!!document?.files?.length && (
                                            <div className={"comment-attach mt-2"}>
                                                {document?.files.map((file: any) => (
                                                    <div key={file._id} className={"comment-attach-item flex items-start justify-between"}>
                                                        <div className={"text-cbs-highlight-color"}>
                                                            <a href={`${process.env.REACT_APP_URL_S3}${file.path}`} className={"text-primary"}>
                                                                {file.nameOrg} ({humanFileSize(file.size)})
                                                            </a>
                                                            <p className={"text-primary-gray text-xs"}>
                                                                {file.author?.fullname} - {moment(file.createAt).format('DD/MM/YYYY HH:mm')} ({moment(file.createAt).fromNow()})
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </td>
                                    <td className="py-2.5 border-b border-cbs-border px-2">
                                        <p>{`${document?.contact?.name}`}</p>
                                    </td>
                                    <td className="py-2.5 border-b border-cbs-border px-2">
                                        {document?.sign}
                                    </td>
                                    <td className="py-2.5 border-b border-cbs-border px-2 w-24">
                                        {moment(document.fromDate).isValid() && moment(document.fromDate).format("DD/MM/YYYY")}
                                    </td>
                                    <td className="py-2.5 border-b border-cbs-border px-2">
                                        {document?.place}
                                    </td>
                                    <td className="py-2.5 border-b border-cbs-border px-2 w-24">
                                        {moment(document.toDate).isValid() && moment(document.toDate).format("DD/MM/YYYY")}
                                    </td>
                                    <td className="py-2.5 border-b border-cbs-border px-2">
                                        {document.note}
                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    )
}