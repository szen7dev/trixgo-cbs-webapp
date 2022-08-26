import React, {FC} from "react";
import {DropdownSearchableV2} from "shareComponents/common";
import TimeRangeDropdown from "shareComponents/common/TimeRangeDropdown";
import maleUserIcon from "assets/images/icons8-male-user-64.svg";
import categoryIcon from "assets/images/icons8-category-48.svg";
import TriangleDown from "assets/icons/TriangleDown";
import timelineIcon from "assets/images/icons8-timeline-week-48.svg";
import contractIcon from "assets/images/icons8-contract-64-blue.svg";
import echoDbIcon from "assets/images/icons8-amazon-echo-48.svg";
import downloadIcon from "assets/images/icons8-download-64.svg";
import iconPencil from "assets/images/icons8-pencil-96 1.png";
import nextIcon from "assets/images/icons-arrow-next.svg";
import {NavigateTab} from "../../sharedComponents/common";

const DocumentProjectPageV2:FC = () => {
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
                    <NavigateTab/>
                    <button className={"flex items-center justify-center mx-3 ml-6"}>
                        <img src={downloadIcon} alt={"-----"} className={"w-[18px] h-[18px]"}/>
                    </button>
                    <button
                        className={"flex items-center justify-center mx-3 ml-6"}>
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
                            [...Array(3)].map((e,i) => (
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
                                    <p>Giấy chứng nhận Đăng ký doanh nghiệp (thay đổi lần thứ 2 ngày 17/05/2021)</p>
                                    <p className={"mt-1 text-primary-gray text-xs"}>Phùng Thị Hà-PGI-20/07/2021</p>
                                </td>
                                <td className={"border-b-0.5 border-primary-border py-3"}>
                                    Sở Kế hoạch và Đầu tư thành phố Hà Nội
                                </td>
                                <td className={"border-b-0.5 border-primary-border py-3"}>
                                    ARM.CAL-PGI.PMI\HDCG\210515
                                </td>
                                <td className={"border-b-0.5 border-primary-border py-3 text-center"}>
                                    20/05/2021
                                </td>
                                <td className={"border-b-0.5 border-primary-border py-3"}>
                                    ARM.CAL-PGI.PMI\HDCG\210515
                                </td>
                                <td className={"border-b-0.5 border-primary-border py-3 text-right pr-2"}>
                                    12
                                </td>
                                <td className={"border-b-0.5 border-primary-border py-3"}>
                                    Đã ký
                                </td>
                                <td className={"border-b-0.5 border-primary-border py-3"}>
                                    Có bản gốc đi kèm
                                </td>
                                <td className={"border-b-0.5 border-primary-border py-3"}>
                                    Cặp F1, Ngăn A5, Tủ A1
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default DocumentProjectPageV2;