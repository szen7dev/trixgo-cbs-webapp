import React, {FC} from "react";
import {DropdownSearchableV2} from "shareComponents/common";
import categoryIcon from "assets/images/icons8-category-48.svg";
import contractIcon from "assets/images/icons8-contract-64-blue.svg";
import {NavigateTabBudgetPage} from "./NavigateTabBudgetPage";
import downloadIcon from "assets/images/icons8-download-64.svg";
import iconPencil from "assets/images/icons8-pencil-96 1.png";
import nextIcon from "assets/images/icons-arrow-next.svg";

export const ProjectBudgetPageType3:FC = () => {
    return (
        <>
            <div className={"sticky top-0 z-10 block"}>
                <div className={"flex items-center px-4 py-2"}>
                    {/* <div className={"flex items-center flex-1"}>
                        <DropdownSearchableV2
                            className={"mr-4 border border-primary-border rounded-lg mb-2"}
                            placeholder={"Loại gói thầu"}
                            prefixIcon={<img className={"mr-2"} src={categoryIcon} alt={"icon"}/>}
                            isMultiple={true}
                            disableSearch={true}
                            data={[]}
                        />
                        <DropdownSearchableV2
                            className={"mr-4 border border-primary-border rounded-lg mb-2"}
                            placeholder={"Hình thức"}
                            prefixIcon={<img className={"mr-2"} src={categoryIcon} alt={"icon"}/>}
                            isMultiple={true}
                            disableSearch={true}
                            data={[]}
                        />
                        <DropdownSearchableV2
                            className={"mr-4 border border-primary-border rounded-lg mb-2"}
                            placeholder={"Loại hợp đồng"}
                            prefixIcon={<img className={"mr-2"} src={contractIcon} alt={"icon"}/>}
                            isMultiple={true}
                            disableSearch={true}
                            data={[]}
                        />
                        <DropdownSearchableV2
                            className={"mr-4 border border-primary-border rounded-lg mb-2"}
                            placeholder={"Trạng thái"}
                            prefixIcon={<img className={"mr-2"} src={categoryIcon} alt={"icon"}/>}
                            isMultiple={true}
                            disableSearch={true}
                            data={[]}
                        />
                    </div>
                    <button className={"h-[32px] rounded bg-cbs-green text-white font-bold px-4"}>
                        Tạo mới
                    </button> */}
                </div>
                <div className={"flex items-center pb-2"}>
                    <NavigateTabBudgetPage/>
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
                <table className="table-fixed border-collapse w-full overflow-auto border-0.5 border-primary-border">
                    <thead>
                    <tr className={"sticky top-0"}>
                        <th className={"w-[50px] bg-cbs-table-header p-2 border-0.5 border-primary-border align-middle"}>
                            <input className="form-check-input line mr-2" type="checkbox" value="" id="check"/>
                        </th>
                        <th className={"w-5/12 bg-cbs-table-header p-2 border-0.5 border-primary-border text-normal text-left"}>
                            Hợp đồng
                        </th>
                        <th className={"bg-cbs-table-header p-2 border-0.5 border-primary-border text-normal text-left"}>
                            Thời hạn bảo lãnh
                        </th>
                        <th className={"bg-cbs-table-header p-2 border-0.5 border-primary-border text-normal text-left"}>
                            Số ngày còn lại
                        </th>
                        <th className={"bg-cbs-table-header p-2 border-0.5 border-primary-border text-normal text-left"}>
                            Giá trị bảo lãnh
                        </th>
                        <th className={"bg-cbs-table-header p-2 border-0.5 border-primary-border text-normal text-left"}>
                            Ghi chú
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {[...Array(3)].map((e,i) => (
                        <tr key={i}>
                            <td className={"p-2 border-0.5 border-primary-border text-center"}>
                                <input className="form-check-input line mr-2" type="checkbox" value="" id="check"/>
                            </td>
                            <td className={"p-2 border-0.5 border-primary-border"}>
                                <p>CHG.THT.Tư vấn Quản lý dự án, Tư vấn BIM, Tư vấn giám sát và tư vấn thẩm tra</p>
                                <p className={"text-primary-gray text-xs"}>1502/HDKT/CPMI-PGI | Ngày ký: 15/2/2021</p>
                            </td>
                            <td className={"p-2 border-0.5 border-primary-border"}>
                                05/11/2021
                            </td>
                            <td className={"p-2 border-0.5 border-primary-border"}>
                                125
                            </td>
                            <td className={"p-2 border-0.5 border-primary-border"}>
                                15.332.000.000
                            </td>
                            <td className={"p-2 border-0.5 border-primary-border"}>
                                Đang yêu cầu nhà thầu gia hạn
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}