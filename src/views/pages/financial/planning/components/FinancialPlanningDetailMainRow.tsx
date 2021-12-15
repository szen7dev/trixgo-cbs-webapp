import React, {FC} from "react";
import CollapseButton from "./CollapseButton";
import {map as _map} from "lodash";
import FinancialPlanningDetailChildRow from "./FinancialPlanningDetailChildRow";
type RowPlanningFinancial = {
    collapsed: boolean;
    _id: string|number;
    tt?: string|number;
    content?: string;
    ngayDuKien?: string;
    duKienThu?: string|number;
    thucTheThu?: string|number;
    duKienChi?: string|number;
    thucTeChi?: string|number;
    ngayThucTe?: string;
    hopDong?: string|number;
    ghiChu?: string;
    childrens?: RowPlanningFinancial[]
}
type Props = {
    rowData: RowPlanningFinancial;
    index: number|string;
}

const FinancialPlanningDetailMainRow:FC<Props> = ({rowData, index}) => {
    return (
        <>
            <div className={"header flex table-row font-semibold"}>
                <div className={"financial-planning-table-action-sidebar w-6 bg-gray-300 text-white table-cell align-middle"}>
                    <div className={"flex flex-col items-center justify-center"}>
                        <CollapseButton collapsed={rowData.collapsed}/>
                    </div>
                </div>
                <div className={"px-2 py-4 table-cell box-border border border-gray-300 align-middle bg-blue-100"}>
                    {rowData.tt}
                </div>
                <div className={"px-2 py-4 table-cell box-border border border-gray-300 align-middle bg-blue-100"}>
                    {rowData.content}
                </div>
                <div className={"px-2 py-4 table-cell box-border border border-gray-300 align-middle bg-blue-100"}>
                </div>
                <div className={"px-2 py-4 table-cell box-border border border-gray-300 align-middle bg-blue-100"}>
                    {rowData.duKienThu}
                </div>
                <div className={"px-2 py-4 table-cell box-border border border-gray-300 align-middle bg-blue-100"}>
                    {rowData.thucTheThu}
                </div>
                <div className={"px-2 py-4 table-cell box-border border border-gray-300 align-middle bg-blue-100"}>
                    {rowData.duKienChi}
                </div>
                <div className={"px-2 py-4 table-cell box-border border border-gray-300 align-middle bg-blue-100"}>
                    {rowData.thucTeChi}
                </div>
                <div className={"px-2 py-4 table-cell box-border border border-gray-300 align-middle bg-blue-100"}>

                </div>
                <div className={"px-2 py-4 table-cell box-border border border-gray-300 align-middle bg-blue-100"}>

                </div>
                <div className={"px-2 py-4 table-cell box-border border border-gray-300 align-middle bg-blue-100 w-3/12"}>

                </div>
            </div>
            {
                _map(rowData.childrens, (childRow, indexChild) => (
                    <FinancialPlanningDetailChildRow index={indexChild} rowData={childRow} key={childRow._id}/>
                ))
            }
        </>
    )
}

export default FinancialPlanningDetailMainRow;
