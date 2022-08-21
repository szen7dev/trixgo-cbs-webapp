import React, {FC} from "react";
import {DropdownSearchableV2, TimeRangeDropdown} from "shareComponents/common";
import maleUserIcon from "assets/images/icons8-male-user-64.svg";
import categoryIcon from "assets/images/icons8-category-48.svg";
import TriangleDown from "assets/icons/TriangleDown";
import timelineIcon from "assets/images/icons8-timeline-week-48.svg";
import contractIcon from "assets/images/icons8-contract-64-blue.svg";
import echoDbIcon from "assets/images/icons8-amazon-echo-48.svg";
import downloadIcon from "assets/images/icons8-download-64.svg";
import iconPencil from "assets/images/icons8-pencil-96 1.png";
import nextIcon from "assets/images/icons-arrow-next.svg";
import {useParams} from "react-router-dom";
import { Link } from "react-router-dom";

export const DocumentProjectLayout:FC = ({children}) => {
    const {id, "0": type} = useParams<{id: string, 0: string}>();

    return (
        <div className="flex flex-1 flex-col overflow-hidden">
            <div className={"sticky top-0 z-10"}>
                <div className={"flex flex-wrap items-center px-4 py-2"}>
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
                    <button className={"h-[32px] rounded bg-cbs-green text-white font-bold px-4"}>
                        Tạo mới
                    </button>
                </div>
                <div className={"flex items-center pb-2"}>
                    <div className={"border-0.5 border-primary-border flex items-center"}>
                        <Link to={`/pm/project/${id}/document`} className={"px-4 py-2 border-r-0.5 border-primary-border " + (!type ? "bg-cbs-soft-blue text-primary" : "bg-white text-primary-gray")}>
                            Danh sách
                        </Link>
                        <Link to={`/pm/project/${id}/document/1`} className={"px-4 py-2 border-r-0.5 border-primary-border " + (type === "1" ? "bg-cbs-soft-blue text-primary" : "bg-white text-primary-gray")}>
                            Phân loại
                        </Link>
                        <Link to={`/pm/project/${id}/document/2`} className={"px-4 py-2 border-r-0.5 border-primary-border " + (type === "2" ? "bg-cbs-soft-blue text-primary" : "bg-white text-primary-gray")}>
                            Danh bạ hệ thống
                        </Link>
                        <Link to={`/pm/project/${id}/document/3`} className={"px-4 py-2 border-r-0.5 border-primary-border " + (type === "3" ? "bg-cbs-soft-blue text-primary" : "bg-white text-primary-gray")}>
                            Gói thầu
                        </Link>
                    </div>
                    <button className={"flex items-center justify-center mx-3 ml-6"}>
                        <img src={downloadIcon} alt={"-----"} className={"w-[18px] h-[18px]"}/>
                    </button>
                    <button className={"flex items-center justify-center mx-3 ml-6"}>
                        <img src={iconPencil} alt={"-----"} className={"w-[18px] h-[18px]"}/>
                    </button>
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
                {children}
            </div>
        </div>
    );
}