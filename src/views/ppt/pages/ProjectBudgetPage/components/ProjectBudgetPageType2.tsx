import React, {FC, useState} from "react";
import chervUpIcon from "assets/images/icon-cherv-up.svg";
import {RightClickMenuWrapper} from "shareComponents/common";
import MenuChildRow from "./MenuChildRow";
import {formatNumberMoney} from "utils/cmcs";
import BugetRowGroupTemp from "./BudgetRowGroupTemp";
import {Project} from "typings/items/project";
import {usePcmProjectBudget} from "services/hooks/pcm/usePcmProjectBudget";
import {Link, useParams} from "react-router-dom";

export const ProjectBudgetPageType2:FC = () => {
    const { id: projectID } = useParams<{ id: string }>();

    return (
        <>
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
        </>
    )
}