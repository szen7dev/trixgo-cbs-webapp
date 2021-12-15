import React, {FC} from "react";
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

const FinancialPlanningDetailChildRow:FC<Props> = ({rowData, index}) => {
    return (
        <div className={"header flex table-row"}>
            <div className={"financial-planning-table-action-sidebar w-6 bg-gray-300 text-white table-cell align-middle"}>

            </div>
            <div className={"px-2 py-4 table-cell box-border border border-gray-300 align-middle bg-white"}>
                <input className={"w-full h-full "} onChange={(event) => console.log(event.target.value)} value={rowData.tt}/>
            </div>
            <div className={"px-2 py-4 table-cell box-border border border-gray-300 align-middle bg-white"}>
                <input className={"w-full h-full "} onChange={(event) => console.log(event.target.value)} value={rowData.content}/>
            </div>
            <div className={"px-2 py-4 table-cell box-border border border-gray-300 align-middle bg-white"}>
                <input className={"w-full h-full "} onChange={(event) => console.log(event.target.value)} value={rowData.ngayDuKien}/>
            </div>
            <div className={"px-2 py-4 table-cell box-border border border-gray-300 align-middle bg-white"}>
                <input className={"w-full h-full "} onChange={(event) => console.log(event.target.value)} value={rowData.duKienThu}/>
            </div>
            <div className={"px-2 py-4 table-cell box-border border border-gray-300 align-middle bg-white"}>
                <input className={"w-full h-full "} onChange={(event) => console.log(event.target.value)} value={rowData.thucTheThu}/>
            </div>
            <div className={"px-2 py-4 table-cell box-border border border-gray-300 align-middle bg-white"}>
                <input className={"w-full h-full "} onChange={(event) => console.log(event.target.value)} value={rowData.duKienChi}/>
            </div>
            <div className={"px-2 py-4 table-cell box-border border border-gray-300 align-middle bg-white"}>
                <input className={"w-full h-full "} onChange={(event) => console.log(event.target.value)} value={rowData.thucTeChi}/>
            </div>
            <div className={"px-2 py-4 table-cell box-border border border-gray-300 align-middle bg-white"}>
                <input className={"w-full h-full "} onChange={(event) => console.log(event.target.value)} value={rowData.ngayThucTe}/>
            </div>
            <div className={"px-2 py-4 table-cell box-border border border-gray-300 align-middle bg-white"}>
                <input className={"w-full h-full "} onChange={(event) => console.log(event.target.value)} value={rowData.hopDong}/>
            </div>
            <div className={"px-2 py-4 table-cell box-border border border-gray-300 align-middle bg-white w-3/12"}>
                <input className={"w-full h-full "} onChange={(event) => console.log(event.target.value)} value={rowData.ghiChu}/>
            </div>
        </div>
    )
}

export default FinancialPlanningDetailChildRow;
