import React, {FC} from "react";
import DatePicker from "react-datepicker";
import DropdownSearchable from "../../../../../components/common/DropdownSearch";
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
    collapsed: boolean;
    isLastRow: boolean;
}

const FinancialPlanningDetailChildRow:FC<Props> = ({rowData, index, collapsed, isLastRow}) => {
    return (
        <div
            style={
                collapsed?
                    {transform: "scaleY(0)", transformOrigin: "top center", height:0, visibility: "collapse"}:
                    {}
            }
            className={"transition duration-300 ease-in-out child-row flex table-row " + (collapsed?"collapsed ":"not-collapsed ") + (isLastRow?'last-child-row':'')}
            data-row-index={rowData._id + "_" + index}>
            <div className={"financial-planning-table-action-sidebar w-6 bg-gray-300 text-white table-cell align-middle border border-gray-300"}>

            </div>
            <div className={"px-2 py-4 table-cell box-border border border-gray-300 align-middle bg-white w-"}>
                <input className={"w-full h-full "} onChange={(event) => console.log(event.target.value)} value={rowData.tt}/>
            </div>
            <div className={"px-2 py-4 table-cell box-border border border-gray-300 align-middle bg-white"}>
                <input className={"w-full h-full "} onChange={(event) => console.log(event.target.value)} value={rowData.content}/>
            </div>
            <div className={"px-2 py-4 table-cell box-border border border-gray-300 align-middle bg-white"}>
                <DatePicker
                    value={rowData.ngayDuKien}
                    name="endDate"
                    selected={null}
                    onChange={(date: Date | null) =>
                        console.log("birthDate", date)
                    }
                />
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
                <DatePicker
                    value={rowData.ngayThucTe}
                    name="endDate"
                    selected={null}
                    onChange={(date: Date | null) =>
                        console.log("birthDate", date)
                    }
                />
            </div>
            <div className={"px-2 py-4 table-cell box-border border border-gray-300 align-middle bg-white"}>
                <DropdownSearchable
                    id="ticket-creator" placeholder="Hợp đồng"
                    initialValue={rowData.hopDong}
                    data={[
                        {
                            id: "quangtt",
                            text:"Trần Thanh Quang",

                        },
                        {
                            id: 2,
                            text:"Trần Thanh Quang 2"
                        }
                    ]}
                />
            </div>
            <div className={"px-2 py-4 table-cell box-border border border-gray-300 align-middle bg-white w-3/12"}>
                <input className={"w-full h-full "} onChange={(event) => console.log(event.target.value)} value={rowData.ghiChu}/>
            </div>
        </div>
    )
}

export default FinancialPlanningDetailChildRow;
