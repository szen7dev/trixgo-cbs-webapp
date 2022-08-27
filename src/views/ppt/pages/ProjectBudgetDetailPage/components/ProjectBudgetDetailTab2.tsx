import React, {FC} from "react";

export const ProjectBudgetDetailTab2:FC = () => {
    return (
        <table className={"table-fixed border-collapse w-full mt-4 mb-6"}>
            <thead>
            <tr className={"sticky top-0"}>
                <th className={"w-[50px] bg-cbs-table-header p-2 border-0.5 border-primary-border align-middle"}>
                    <input className="form-check-input line mr-2" type="checkbox" value="" id="check"/>
                </th>
                <th className={"w-3/12 bg-cbs-table-header p-2 border-0.5 border-primary-border text-primary-gray font-normal text-left"}>
                    Nội dung
                </th>
                <th className={"bg-cbs-table-header p-2 border-0.5 border-primary-border text-primary-gray font-normal text-left"}>
                    Ngày tháng
                </th>
                <th className={"bg-cbs-table-header p-2 border-0.5 border-primary-border text-primary-gray font-normal text-left"}>
                    Mã hiệu
                </th>
                <th className={"bg-cbs-table-header p-2 border-0.5 border-primary-border text-primary-gray font-normal text-left"}>
                    Sản lượng trước VAT
                </th>
                <th className={"bg-cbs-table-header p-2 border-0.5 border-primary-border text-primary-gray font-normal text-left"}>
                    Sản lượng phần VAT
                </th>
                <th className={"bg-cbs-table-header p-2 border-0.5 border-primary-border text-primary-gray font-normal text-left"}>
                    Sản lượng phát sinh trước VAT
                </th>
                <th className={"bg-cbs-table-header p-2 border-0.5 border-primary-border text-primary-gray font-normal text-left"}>
                    Sản lượng phát sinh phần VAT
                </th>
                <th className={"w-3/12 bg-cbs-table-header p-2 border-0.5 border-primary-border text-primary-gray font-normal text-left"}>
                    Ghi chú
                </th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td className={"border-0.5 border-primary-border p-2 bg-cbs-table-highlight"}>
                </td>
                <td className={"border-0.5 border-primary-border p-2 bg-cbs-table-highlight"}>
                </td>
                <td className={"border-0.5 border-primary-border p-2 bg-cbs-table-highlight"}>
                </td>
                <td className={"border-0.5 border-primary-border p-2 bg-cbs-table-highlight"}>
                </td>
                <td className={"border-0.5 border-primary-border p-2 bg-cbs-table-highlight font-bold text-primary-gray text-right"}>
                    300.000.000
                </td>
                <td className={"border-0.5 border-primary-border p-2 bg-cbs-table-highlight font-bold text-primary-gray text-right"}>
                    30.000.000
                </td>
                <td className={"border-0.5 border-primary-border p-2 bg-cbs-table-highlight font-bold text-primary-gray text-right"}>
                    30.000.000
                </td>
                <td className={"border-0.5 border-primary-border p-2 bg-cbs-table-highlight font-bold text-primary-gray text-right"}>
                    30.000.000
                </td>
                <td className={"border-0.5 border-primary-border p-2 bg-cbs-table-highlight"}>
                </td>
            </tr>
            {
                [...Array(3)].map((e,i) => (
                    <tr key={i}>
                        <td className={"border-0.5 border-primary-border p-2 text-center align-middle"}>
                            <input className="form-check-input line mr-2" type="checkbox" value="" id="check"/>
                        </td>
                        <td className={"border-0.5 border-primary-border p-2"}>
                            Khối lượng thực hiện tháng 6 năm 2021 gói thầu Binary
                        </td>
                        <td className={"border-0.5 border-primary-border p-2"}>
                            05/11/2021
                        </td>
                        <td className={"border-0.5 border-primary-border p-2"}>
                            P15008
                        </td>
                        <td className={"border-0.5 border-primary-border p-2 text-right"}>
                            100.000.000
                        </td>
                        <td className={"border-0.5 border-primary-border p-2 text-right"}>
                            10.000.000
                        </td>
                        <td className={"border-0.5 border-primary-border p-2 text-right"}>
                            10.000.000
                        </td>
                        <td className={"border-0.5 border-primary-border p-2 text-right"}>
                            10.000.000
                        </td>
                        <td className={"border-0.5 border-primary-border p-2"}>
                            Đang triển khai
                        </td>
                    </tr>
                ))
            }
            </tbody>
        </table>
    )
}