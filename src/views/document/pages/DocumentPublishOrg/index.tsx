import React, {FC} from "react";
import {DropdownSearchableV2} from "shareComponents/common";
import TimeRangeDropdown from "shareComponents/common/TimeRangeDropdown";
import maleUserIcon from "assets/images/icons8-male-user-64.svg";
import categoryIcon from "assets/images/icons8-category-48.svg";
import TriangleDown from "assets/icons/TriangleDown";
import timelineIcon from "assets/images/icons8-timeline-week-48.svg";
import contractIcon from "assets/images/icons8-contract-64-blue.svg";
import echoDbIcon from "assets/images/icons8-amazon-echo-48.svg";
import {NavigateTabV2} from "../../sharedComponents/common";
import nextIcon from "assets/images/icons-arrow-next.svg";
import folderIcon from "assets/images/icons8-folder-48-gray.svg";
import {Link, useParams} from "react-router-dom";
import searchIcon from "../../../../assets/images/icons8-search-120.png";

const DocumentPublishOrg:FC = () => {
    const {id: departmentID} = useParams<{id: string}>();

    return (
        <div className="flex flex-1 flex-col overflow-hidden">
            <div className={"sticky top-0 z-10"}>
                <div className={"flex flex-wrap items-center px-4 py-2"}>
                    <div className={"flex items-center flex-1"}>
                        <DropdownSearchableV2
                            className={"mr-4 border border-primary-border rounded-lg mb-2"}
                            placeholder={"Chủ đề ban hành"}
                            prefixIcon={<img className={"mr-2"} src={maleUserIcon} alt={"icon"}/>}
                            isMultiple={true}
                            disableSearch={true}
                            data={[]}
                        />
                        <DropdownSearchableV2
                            className={"mr-4 border border-primary-border rounded-lg mb-2"}
                            placeholder={"Loại hồ sơ"}
                            prefixIcon={<img className={"mr-2"} src={categoryIcon} alt={"icon"}/>}
                            isMultiple={true}
                            disableSearch={true}
                            data={[]}
                        />
                        <TimeRangeDropdown
                            className={
                                "mr-4 border border-primary-border rounded-lg mb-2 p-1 pl-2 "
                            }
                            placeholder={"Thời khoảng"}
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
                    <button className={"h-[32px] rounded bg-cbs-green text-white font-bold px-4 mb-2"}>
                        Tạo mới
                    </button>
                </div>
                <div className={"flex items-center pb-2"}>
                    <NavigateTabV2/>
                    <div className={"flex items-center ml-6"}>
                        <img src={searchIcon} alt={"search icon"} className={"w-[24px] h-[24px]"}/>
                        <input className={"py-2 border-b border-black ml-2 w-[370px] focus:outline-none focus:ring-none"} placeholder={"Tìm kiếm"}/>
                    </div>
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
                <table className={"table-fixed border-collapse w-full"}>
                    <tbody>
                    {
                        [...Array(3)].map((e,i) => (
                            <tr key={i}>
                                <td className={"border-b-0.5 border-primary-border py-3"}>
                                    <Link to={`/pm/project/${departmentID}/document-v2/1/cate/1`}>
                                        <div className={"flex items-center"}>
                                            <img src={folderIcon} alt={"-----"} className={"w-[24px] h-[24px]"}/>
                                            <span className={"ml-3"}>Ủy ban nhân dân thành phố Hà Nội</span>
                                        </div>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default  DocumentPublishOrg;