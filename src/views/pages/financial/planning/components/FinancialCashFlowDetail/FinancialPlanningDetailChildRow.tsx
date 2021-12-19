import React, {FC, useRef} from "react";
import DatePicker from "react-datepicker";
import DropdownSearchable from "../../../../../../components/common/DropdownSearch";
import RightClickMenu from "../../../../../../components/common/RightClickMenu";
import MenuChildRow from "./MenuChildRow";
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
    const wrapperRef = useRef<HTMLDivElement>(null);
    return (
        <div
            ref={wrapperRef}
            style={
                collapsed?
                    {transform: "scaleY(0)", transformOrigin: "top center", height:0, visibility: "collapse"}:
                    {}
            }
            className={"transition duration-300 ease-in-out child-row flex table-row " + (collapsed?"collapsed ":"not-collapsed ") + (isLastRow?'last-child-row':'')}
            data-row-index={rowData._id + "_" + index}>
            <div className={"financial-planning-table-action-sidebar w-6 bg-gray-300 text-white table-cell relative align-middle border border-gray-300"}>

            </div>
            <div className={"table-cell relative box-border border border-gray-300 align-middle bg-white w-1"}>
                {/*<input className={"w-full h-full absolute top-0 left-0 overflow-y-auto"} onChange={(event) => console.log(event.target.value)} value={rowData.tt}/>*/}
                <p contentEditable={"true"} className={"w-full h-full focus:outline-blue-600 px-2 py-5"}>{rowData.tt}</p>
            </div>
            <div className={"table-cell relative box-border border border-gray-300 align-middle bg-white w-2/12"}>
                {/*<input className={"w-full h-full absolute top-0 left-0"} onChange={(event) => console.log(event.target.value)} value={rowData.content}/>*/}
                <p contentEditable={"true"} className={"w-full h-full focus:outline-blue-600 px-2 py-5"}>{rowData.content}</p>
            </div>
            <div className={"px-2 py-4 table-cell relative box-border border border-gray-300 align-middle bg-white"}>
                <DatePicker
                    value={rowData.ngayDuKien}
                    name="endDate"
                    selected={null}
                    onChange={(date: Date | null) =>
                        console.log("birthDate", date)
                    }
                />
            </div>
            <div className={"table-cell relative box-border border border-gray-300 align-middle bg-white"}>
                {/*<input className={"w-full h-full absolute top-0 left-0"} onChange={(event) => console.log(event.target.value)} value={rowData.duKienThu}/>*/}
                <p contentEditable={"true"} className={"w-full h-full focus:outline-blue-600 px-2 py-5"}>{rowData.duKienThu}</p>
            </div>
            <div className={"table-cell relative box-border border border-gray-300 align-middle bg-white"}>
                {/*<input className={"w-full h-full absolute top-0 left-0"} onChange={(event) => console.log(event.target.value)} value={rowData.thucTheThu}/>*/}
                <p contentEditable={"true"} className={"w-full h-full focus:outline-blue-600 px-2 py-5"}>{rowData.thucTheThu}</p>
            </div>
            <div className={"table-cell relative box-border border border-gray-300 align-middle bg-white"}>
                {/*<input className={"w-full h-full absolute top-0 left-0"} onChange={(event) => console.log(event.target.value)} value={rowData.duKienChi}/>*/}
                <p contentEditable={"true"} className={"w-full h-full focus:outline-blue-600 px-2 py-5"}>{rowData.duKienChi}</p>
            </div>
            <div className={"table-cell relative box-border border border-gray-300 align-middle bg-white"}>
                {/*<input className={"w-full h-full absolute top-0 left-0"} onChange={(event) => console.log(event.target.value)} value={rowData.thucTeChi}/>*/}
                <p contentEditable={"true"} className={"w-full h-full focus:outline-blue-600 px-2 py-5"}>{rowData.thucTeChi}</p>
            </div>
            <div className={"px-2 py-4 table-cell relative box-border border border-gray-300 align-middle bg-white"}>
                <DatePicker
                    value={rowData.ngayThucTe}
                    name="endDate"
                    selected={null}
                    onChange={(date: Date | null) =>
                        console.log("birthDate", date)
                    }
                />
            </div>
            <div className={"px-2 py-4 table-cell relative box-border border border-gray-300 align-middle bg-white w-2/12"}>
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
            <div className={"table-cell relative box-border border border-gray-300 align-middle bg-white w-2/12"}>
                {/*<input className={"w-full h-full absolute top-0 left-0"} onChange={(event) => console.log(event.target.value)} value={rowData.ghiChu}/>*/}
                <p contentEditable={"true"} className={"w-full h-full focus:outline-blue-600 px-2 py-5"}>{rowData.ghiChu}</p>
            </div>
            <RightClickMenu wrapperRef={wrapperRef} menu={<MenuChildRow/>}/>
        </div>
    )
}

export default FinancialPlanningDetailChildRow;
