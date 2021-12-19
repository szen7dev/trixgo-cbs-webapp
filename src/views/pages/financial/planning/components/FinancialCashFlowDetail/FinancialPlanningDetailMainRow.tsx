import React, {FC, useRef} from "react";
import CollapseButton from "./CollapseButton";
import {map as _map} from "lodash";
import FinancialPlanningDetailChildRow from "./FinancialPlanningDetailChildRow";
import RightClickMenu from "../../../../../../components/common/RightClickMenu";
import {RowPlanningFinancial} from "../../../../../../typings/app";
import MenuMainRow from "./MenuMainRow";

type Props = {
    rowData: RowPlanningFinancial;
    index: number|string;
    idDetail: number|string;
}

const FinancialPlanningDetailMainRow:FC<Props> = ({rowData, index, idDetail}) => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    return (
        <>
            <div ref={wrapperRef} className={"row flex table-row font-semibold main-row " + (rowData.collapsed?"collapsed ":"not-collapsed ")}>
                <div className={"financial-planning-table-action-sidebar w-6 bg-gray-300 text-white table-cell align-middle border border-gray-300 transition duration-300 ease-in-out"}>
                    <div className={"flex flex-col items-center justify-center"}>
                        <CollapseButton idDetail={idDetail} collapsed={rowData.collapsed} index={index}/>
                    </div>
                </div>
                <div className={"px-2 py-4 table-cell box-border border border-gray-300 align-middle bg-blue-100 w-3"}>
                    {rowData.tt}
                </div>
                <div className={"px-2 py-4 table-cell box-border border border-gray-300 align-middle bg-blue-100 w-2/12"}>
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
                <div className={"px-2 py-4 table-cell box-border border border-gray-300 align-middle bg-blue-100 w-2/12"}>

                </div>
                <div className={"px-2 py-4 table-cell box-border border border-gray-300 align-middle bg-blue-100 w-2/12"}>

                </div>
                <RightClickMenu wrapperRef={wrapperRef} menu={<MenuMainRow/>}/>
            </div>
            {
                _map(rowData.childrens, (childRow, indexChild) => (
                    <FinancialPlanningDetailChildRow isLastRow={indexChild===((rowData.childrens??[]).length-1)} collapsed={rowData.collapsed} index={indexChild} rowData={childRow} key={childRow._id}/>
                ))
            }
        </>
    )
}

export default FinancialPlanningDetailMainRow;
