import React, {FC, useState} from "react";
import {DropdownSearchableV2} from "shareComponents/common";
import TimeRangeDropdown from "shareComponents/common/TimeRangeDropdown";
import maleUserIcon from "assets/images/icons8-male-user-64.svg";
import categoryIcon from "assets/images/icons8-category-48.svg";
import TriangleDown from "assets/icons/TriangleDown";
import timelineIcon from "assets/images/icons8-timeline-week-48.svg";
import contractIcon from "assets/images/icons8-contract-64-blue.svg";
import echoDbIcon from "assets/images/icons8-amazon-echo-48.svg";
import downloadIcon from "assets/images/icons8-download-96.svg";
import projectIcon from "assets/images/icons8-project-50.svg";
import iconPencil from "assets/images/icons8-pencil-96 1.png";
import {useListDocument} from "services/hooks/document/useDocument";
import moment from "moment";
import PaginateV2 from "shareComponents/common/PaginateV2";
import {DOCUMENT_TYPES} from "apis/localdb";
import {useDatahubContact} from "services/hooks/datahub/contact/useDatahubContact";
const DocumentHomePageV2:FC = () => {
    type PaginateHandle = React.ElementRef<typeof PaginateV2>;

    const ref = React.useRef<PaginateHandle>(null);
    const [pageIndex, setPageIndex] = useState(0);
    const [fromToDate, setFromToDate] = useState({fromDate: "", toDate: ""})

    const [keywordDatahubContact, setKeywordDatahubContact] = useState("");
    const [datahubContact, setDatahubContact] = useState("");

    const [type, setType] = useState("");

    const { data: listDatahubContact } = useDatahubContact({ keyword: keywordDatahubContact }, true, false); // Danh bạ hệ thống
    const { listDocumentWithPager, isLoading, totalRecord, totalPage, fetchNextPageDocument, hasNextPage, refetchListDocument } = useListDocument({
        params: {
            ...fromToDate,
            datahubContact,
            type
        },
        isFetchList: true
    });

    return (
        <div className="flex flex-1 flex-col overflow-hidden h-full">
            <div className={"sticky top-0 z-10"}>
                <div className={"flex flex-wrap items-center px-4 py-2"}>
                    <DropdownSearchableV2
                        className={"mr-4 border border-primary-border rounded-lg mb-2"}
                        placeholder={"Tổ chức ban hành"}
                        prefixIcon={<img className={"mr-2"} src={maleUserIcon} alt={"icon"}/>}
                        isMultiple={false}
                        allowClearValueSingleInput={true}
                        data={listDatahubContact}
                        formatItem={{
                            id: "_id",
                            text: "name"
                        }}
                        onSearchInputChange={valueSearch => setKeywordDatahubContact(valueSearch)}
                        onchangeValue={item => {
                            setDatahubContact(item._id);
                            setPageIndex(0);
                            ref.current&&ref.current.resetPaginate();
                        }}
                        onClearData={() => {
                            setDatahubContact("");
                            setPageIndex(0);
                            ref.current&&ref.current.resetPaginate();
                        }}
                    />
                    <DropdownSearchableV2
                        className={"mr-4 border border-primary-border rounded-lg mb-2"}
                        placeholder={"Tính chất hồ sơ"}
                        prefixIcon={<img className={"mr-2"} src={categoryIcon} alt={"icon"}/>}
                        isMultiple={false}
                        disableSearch={true}
                        allowClearValueSingleInput={true}
                        data={DOCUMENT_TYPES}
                        formatItem={{
                            "id": "value"
                        }}
                        onchangeValue={item => {
                            setType(item.value);
                            setPageIndex(0);
                            ref.current&&ref.current.resetPaginate();
                        }}
                        onClearData={() => {
                            setType("");
                            setPageIndex(0);
                            ref.current&&ref.current.resetPaginate();
                        }}
                    />
                    <DropdownSearchableV2
                        className={"mr-4 border border-primary-border rounded-lg mb-2"}
                        placeholder={"Dự án"}
                        prefixIcon={<img className={"mr-2"} src={projectIcon} alt={"icon"}/>}
                        isMultiple={false}
                        disableSearch={true}
                        allowClearValueSingleInput={true}
                        data={[]}
                    />
                    <TimeRangeDropdown
                        className={
                            "mr-4 border border-primary-border rounded-lg mb-2 p-1 pl-2 "
                        }
                        placeholder={"Thời khoảng"}
                        iconBack={<TriangleDown />}
                        iconFront={<img src={timelineIcon} alt={"----"} />}
                        onValueChange={(val) => setFromToDate(val)}
                        options={[
                            {
                                text: "Tất cả",
                                fromDate: "",
                                toDate: "",
                            },
                            {
                                text: "Cách đây 1 tuần",
                                fromDate: moment().format("YYYY-MM-DD"),
                                toDate: moment().subtract(7,'d').format("YYYY-MM-DD"),
                            },
                            {
                                text: "Cách đây 1 tháng",
                                fromDate: moment().format("YYYY-MM-DD"),
                                toDate: moment().subtract(1,'m').format("YYYY-MM-DD"),
                            },
                        ]}
                    />
                    <DropdownSearchableV2
                        className={"mr-4 border border-primary-border rounded-lg mb-2"}
                        placeholder={"Hướng hồ sơ"}
                        prefixIcon={<img className={"mr-2"} src={contractIcon} alt={"icon"}/>}
                        isMultiple={false}
                        disableSearch={true}
                        allowClearValueSingleInput={true}
                        data={[]}
                    />
                    <DropdownSearchableV2
                        className={"mr-4 border border-primary-border rounded-lg mb-2"}
                        placeholder={"Thuộc hợp đồng"}
                        prefixIcon={<img className={"mr-2"} src={contractIcon} alt={"icon"}/>}
                        isMultiple={false}
                        disableSearch={true}
                        allowClearValueSingleInput={true}
                        data={[]}
                    />
                    <DropdownSearchableV2
                        className={"mr-4 border border-primary-border rounded-lg mb-2"}
                        placeholder={"Địa chỉ lưu trữ"}
                        prefixIcon={<img className={"mr-2"} src={echoDbIcon} alt={"icon"}/>}
                        isMultiple={false}
                        disableSearch={true}
                        allowClearValueSingleInput={true}
                        data={[]}
                    />
                </div>
                <div className={"flex items-center pb-2"}>
                    <input
                        className="form-check-input ml-4"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                    />
                    <span className={"text-lg mx-4"}>Kết quả tìm kiếm</span>
                    <button className={"flex items-center justify-center mx-3 ml-6"}>
                        <img src={downloadIcon} alt={"-----"} className={"w-[18px] h-[18px]"}/>
                    </button>
                    <button
                        className={"flex items-center justify-center mx-3 ml-6"}>
                        <img src={iconPencil} alt={"-----"} className={"w-[18px] h-[18px]"}/>
                    </button>
                    <PaginateV2
                        ref={ref}
                        totalRecord={totalRecord}
                        totalPages={totalPage}
                        limit={30}
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
                <table className={"table-fixed border-collapse w-full"}>
                    <thead>
                    <tr className={"sticky top-0"}>
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
                            Chủ thể ban hành
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
                        (listDocumentWithPager[pageIndex]??[]).map((document,i) => (
                            <tr key={i}>
                                <td className={"border-b-0.5 border-primary-border py-3 text-center"}>
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        value=""
                                        id="flexCheckDefault"
                                    />
                                </td>
                                <td className={"border-b-0.5 border-primary-border py-3"}>
                                    <p>{document.name}</p>
                                    <p className={"mt-1 text-primary-gray text-xs"}>{document.author?.fullname}-{document.createAt}</p>
                                </td>
                                <td className={"border-b-0.5 border-primary-border py-3"}>
                                    {document.sender?.name}
                                </td>
                                <td className={"border-b-0.5 border-primary-border py-3 break-all"}>
                                    ARM.CAL-PGI.PMI\HDCG\210515
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
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default DocumentHomePageV2;