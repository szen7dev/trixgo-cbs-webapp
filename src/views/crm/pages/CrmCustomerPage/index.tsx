import React, { FC, useState, useEffect, useRef } from "react";
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
import { debounce } from "lodash";
import { useDispatch } from "react-redux";
import { useAppSelector } from "redux/reducer";
import { setFilterDropdown } from "redux/reducer/DocumentProjectSlice";

// ========== Hooks ========== //
import { useHumanCustom, useListFilterHuman } from "services/hooks/human/useHuman";
import { useProjectCustom } from "services/hooks/items/useProject";
import { useSocket } from "services/hooks/useSocket";
import { useAuth } from "services/hooks/auth/useAuth";

interface HumanHomePageProps {
    type?: number
}

type PaginateHandle = React.ElementRef<typeof PaginateV2>;
type DropdownHandle = React.ElementRef<typeof DropdownSearchableV2>;
type TimeRangeHandle = React.ElementRef<typeof TimeRangeDropdown>;

export const CrmCustomerPage: FC<HumanHomePageProps> = () => {
    const [keyword, setKeyword] = useState('');

    const dispatch = useDispatch();
    const { keywordInput } = useAppSelector(
        (state) => state.documentProject.data
    );

    const { current: socket }: any = useSocket();
    const { user } = useAuth();

    useEffect(() => {
        setPageIndex(0);
        ref.current&&ref.current.resetPaginate();
    }, [keywordInput]);

    const ref = useRef<PaginateHandle>(null);
    const datahubRef = useRef<DropdownHandle>(null);
    const typeRef = useRef<DropdownHandle>(null);
    const fromToRef = useRef<TimeRangeHandle>(null);

    const [pageIndex, setPageIndex] = useState(0);

    useEffect(() => {
        document.title = `Trixgo | Quản lý nhân sự`;
    });

    const location = useLocation()

    //_____Import, export excel
    const [stateExport, setStateExport] = useState<{ isExporting: boolean }>({
        isExporting: false,
    });

    const [genders, setGenders] = useState<string[]>([]);

    const [projectKeyword, setProjectKeyword] = useState("");
    const [departmentsID, setDepartmentsID] = useState<string[]>([]);

    const [fromToDate, setFromToDate] = useState({fromDate: "", toDate: ""})

    const { listProjectsUserIsMember } = useProjectCustom({
        paramsProjectsUserIsMember: { keyword: projectKeyword },
        isFetchProjectsUserIsMember: true
    });

    const { listHumanWithPager, isLoading, isFetching, totalRecord, totalPage, fetchNextPageHuman, hasNextPage, lastestIDs } = useListFilterHuman({
        params: {
            ...fromToDate,
            genders,
            departmentsID,
            keyword
        },
        isFetchList: true
    });

    const onChangeSearch = debounce((event: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(event.target.value)
    }, 500)

    const { exportHumanAsync, exportHumanByFilterAsync } = useHumanCustom({});

    // Làm việc với Excel
    const handleExport = async () => {
        try {
            setStateExport({ isExporting: true });
            const { error, data } = await exportHumanAsync({
                filterParams: {
                    ...fromToDate,
                    type: '1',
                    genders,
                    departmentsID,
                    keyword
                }
            });

            if(error) {
                return toast.warn(data?.message);
            }
        } catch (error: any) {
            toast.error(error.message)
        } 
    }

    const handleExportByFilter = async () => {
        try {
            setStateExport({ isExporting: true });
            const { error, data } = await exportHumanByFilterAsync({
                filterParams: {
                    ...fromToDate,
                    lastestID: lastestIDs && lastestIDs[pageIndex],
                    type: '1',
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

    const handleSocketExportAllContacts = ({ data, error }: any) => {
        setStateExport({ isExporting: false });
        if(error) return toast.error("Can't download data");

        const { receiverID, link } = data;
        if(user?._id !== receiverID) return;
        link && createLinkAndClick(link, '_self');
    }

  useEffect(() => {
    if(!socket) return;

    socket.on("ITEM_SSC_EXPORT_ALL_CONTACTS", handleSocketExportAllContacts);

    return () => {
      socket.off("ITEM_SSC_EXPORT_ALL_CONTACTS", handleSocketExportAllContacts);
    }
  }, [socket])

    if(stateExport.isExporting) {
        return <Loader className="border-primary" />
    }

    return (
        <div className="flex flex-1 flex-col overflow-hidden h-full">
           <div className={"sticky top-0 z-10"}>
                <div className={"flex flex-wrap items-center px-2 py-1"}>
                    <div className={"flex items-center flex-1"}>
                        <div className="relative flex items-center">
                            <input
                            placeholder="Tìm kiếm"
                            className="pl-3 pr-3 mr-1 w-[175px] h-[32px] bg-cbs-table-header border border-primary-border rounded-lg mb-2"
                            onChange={onChangeSearch}
                            />
                        </div>
                        <DropdownSearchableV2
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
                        />

                        <TimeRangeDropdown
                            ref={fromToRef}
                            className={
                                "mr-1 border border-primary-border rounded-lg mb-2 p-1 pl-2 "
                            }
                            placeholder={"Thâm niên"}
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
                                    text: "Trong vòng 5 năm",
                                    fromDate: moment().subtract(5, "years").format("YYYY-MM-DD h:mm"),
                                    toDate: moment().add(1, "minutes").format("YYYY-MM-DD h:mm"),
                                },
                                {
                                    text: "Từ 5-10 năm",
                                    fromDate: moment().subtract(10, "years").format("YYYY-MM-DD h:mm"),
                                    toDate: moment().subtract(5, "years").format("YYYY-MM-DD h:mm"),
                                },
                                {
                                    text: "Từ 10-15 năm",
                                    fromDate: moment().subtract(15, "years").format("YYYY-MM-DD h:mm"),
                                    toDate: moment().subtract(10, "years").format("YYYY-MM-DD h:mm"),
                                },
                                {
                                    text: "Từ 15 năm trở lên",
                                    fromDate: moment().subtract(100, "years").format("YYYY-MM-DD h:mm"),
                                    toDate: moment().subtract(15, "years").format("YYYY-MM-DD h:mm"),
                                },
                            ]}
                        />
                    </div>

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
                                Nhân sự
                            </th>
                            <th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border">
                                Điện thoại/Email
                            </th>
                            <th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border" >
                                Nơi ở hiện tại
                            </th>
                            <th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border">
                                Thuế, bảo hiểm
                            </th>
                            <th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border">
                                Phòng ban
                            </th>
                            <th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border">
                                Hợp đồng lao động
                            </th>
                            <th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border">
                                Tình trạng
                            </th>
                            <th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border">
                                Ghi chú
                            </th>
                        </tr>
                        </thead>
                        <tbody className="">
                        {listHumanWithPager[pageIndex].map((document, index) => {
                            let linkRef;
                            if(location.pathname.includes("/human/home/")){
                                linkRef = `/human/home/hid=${document._id}`
                            }else{
                                linkRef = `/human/home/hid=${document._id}`
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
                                        <p>
                                            {`${document.name}`}
                                            - {(document?.gender && document?.gender >= 1) && GENDER_TYPES[document?.gender -1].text}
                                        </p>
                                        <p className="text-primary-gray mt-1">{document?.identity != null && document?.identity }</p>
                                        <p className="text-primary-gray mt-1">Ngày sinh: { document?.birthday != null && moment(document?.birthday).format("DD/MM/YYYY")}</p>
                                        </Link>
                                    </td>
                                    <td className="py-2.5 border-b border-cbs-border px-2">
                                        <p>{`${document?.phone}`}</p>
                                        <p className="text-primary-gray">{document?.email != null && document?.email }</p>
                                    </td>
                                    <td className="py-2.5 border-b border-cbs-border px-2">
                                        {document.address},
                                        {document?.area?.name}, {document?.area?.parent?.name}, {document?.area?.parent?.parent?.name}
                                    </td>
                                    <td className="py-2.5 border-b border-cbs-border px-2">
                                        <p>MST: {document?.taxid}</p>
                                        <p>MBH: {document?.insuranceSign} - {moment(document.insuranceDate).isValid() && moment(document.insuranceDate).format("DD/MM/YYYY")}</p>
                                    </td>
                                    <td className="py-2.5 border-b border-cbs-border px-2 w-24">
                                        <p>{document?.department?.name}</p>
                                        <p>{document?.position?.name}</p>
                                    </td>
                                    <td className="py-2.5 border-b border-cbs-border px-2">
                                        {document?.contractType?.name}
                                        <p><i>
                                            {moment(document.contractDate).isValid() && moment(document.contractDate).format("DD/MM/YYYY")}
                                            </i></p>
                                    </td>
                                    <td className="py-2.5 border-b border-cbs-border px-2">
                                        {document?.workingStatus?.name}
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