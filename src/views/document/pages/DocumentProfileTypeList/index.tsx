import React, {FC} from "react"
import {Link, useParams} from "react-router-dom";
import {DropdownSearchableV2, TimeRangeDropdown} from "shareComponents/common";
import maleUserIcon from "assets/images/icons8-male-user-64.svg";
import categoryIcon from "assets/images/icons8-category-48.svg";
import TriangleDown from "assets/icons/TriangleDown";
import timelineIcon from "assets/images/icons8-timeline-week-48.svg";
import contractIcon from "assets/images/icons8-contract-64-blue.svg";
import echoDbIcon from "assets/images/icons8-amazon-echo-48.svg";
import {NavigateTab} from "../../sharedComponents/common";
import downloadIcon from "assets/images/icons8-download-64.svg";
import iconPencil from "assets/images/icons8-pencil-96 1.png";
import nextIcon from "assets/images/icons-arrow-next.svg";

const DocumentProfileTypeList:FC = () => {
    const {id: departmentID} = useParams<{id: string, cateId: string}>();

    return (
        <div className={"flex flex-1 flex-col overflow-hidden"}>
            <div className={"sticky top-0 bg-white"}>
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
                    <NavigateTab/>
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
            <div className={"flex justify-between gap-y-3.5 flex-wrap mt-4"}>
                {
                    [...Array(10)].map((e, i) => (
                        <Link key={i} className={"2xl:w-1/5 lg:w-1/3 px-2"} to={`/pm/project/${departmentID}/document-v2/2/profile-type/1`}>
                            <div
                                className="bg-white border-0.5 border-primary-border rounded-lg h-[150px] px-3.5 py-4 flex flex-col justify-between">
                                <div className="flex justify-between"><h4 className="text-x-large">Chung, khác</h4>
                                    <div>
                                        <div
                                            className="bg-cbs-secondary rounded-md px-2.5 py-0.5 text-x-small text-white">Monthly
                                        </div>
                                    </div>
                                </div>
                                <p className="text-3x-large">175</p>
                                <div><span
                                    className="bg-cbs-up text-cbs-up-text py-0.5 px-1 rounded-sm mr-2.5 text-small">0+</span><span
                                    className="text-medium">Tháng này</span></div>
                            </div>
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}

export default DocumentProfileTypeList;