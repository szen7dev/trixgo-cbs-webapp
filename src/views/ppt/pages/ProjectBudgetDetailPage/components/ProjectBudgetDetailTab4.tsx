import React, {FC} from "react";

export const ProjectBudgetDetailTab4:FC = () => {
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
                    Thuộc kỳ thanh toán
                </th>
                <th className={"bg-cbs-table-header p-2 border-0.5 border-primary-border text-primary-gray font-normal text-left"}>
                    Phân loại
                </th>
                <th className={"bg-cbs-table-header p-2 border-0.5 border-primary-border text-primary-gray font-normal text-left"}>
                    Giá trị giải ngân
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
                <td className={"border-0.5 border-primary-border p-2 bg-cbs-table-highlight font-bold text-primary-gray"}>
                </td>
                <td className={"border-0.5 border-primary-border p-2 bg-cbs-table-highlight font-bold text-primary-gray"}>
                </td>
                <td className={"border-0.5 border-primary-border p-2 bg-cbs-table-highlight font-bold text-primary-gray text-right"}>
                    3.000.000
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
                            Khối lượng thực hiện tháng 1 năm 2021 gói thầu Binary
                        </td>
                        <td className={"border-0.5 border-primary-border p-2"}>
                            05/11/2021
                        </td>
                        <td className={"border-0.5 border-primary-border p-2"}>
                            P15008
                        </td>
                        <td className={"border-0.5 border-primary-border p-2"}>
                            Thanh toán kỳ 1 năm 2021
                        </td>
                        <td className={"border-0.5 border-primary-border p-2 text-right"}>
                            Tạm ứng
                        </td>
                        <td className={"border-0.5 border-primary-border p-2 text-right"}>
                            1.000.000
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