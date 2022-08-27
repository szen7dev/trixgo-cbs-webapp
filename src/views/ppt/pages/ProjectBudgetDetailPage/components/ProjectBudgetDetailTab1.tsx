import React, {FC} from "react";

export const ProjectBudgetDetailTab1:FC = () => {
    return (
        <div className={"mt-4 mb-6"}>
            <div className={"px-4 mb-2 text-lg text-primary-gray"}>
                Thông tin chung
            </div>
            <table className={"table-fixed border-collapse w-full"}>
                <tbody>
                <tr>
                    <td className={"w-2/12 border-0.5 border-primary-border text-primary-gray px-4 py-2"}>
                        Hợp đồng
                    </td>
                    <td className={"w-4/12 border-0.5 border-primary-border text-cbs-highlight-color px-4 py-2"}>
                        Tư vấn Quản lý dự án và Tư vấn giám sát
                    </td>
                    <td className={"w-2/12 border-0.5 border-primary-border text-primary-gray px-4 py-2"}>
                        Thuộc dự án
                    </td>
                    <td className={"w-4/12 border-0.5 border-primary-border text-cbs-highlight-color px-4 py-2"}>
                        Xây dựng trường Tiểu học và Trung học cơ sở Tây Hồ Tây
                    </td>
                </tr>
                <tr>
                    <td className={"w-2/12 border-0.5 border-primary-border text-primary-gray px-4 py-2"}>
                        Số hiệu/Ngày ký
                    </td>
                    <td className={"w-4/12 border-0.5 border-primary-border text-cbs-highlight-color px-4 py-2"}>
                        1502/HDKT/CDT-QLDA ngày 15/2/2021
                    </td>
                    <td className={"w-2/12 border-0.5 border-primary-border text-primary-gray px-4 py-2"}>
                        Trạng thái
                    </td>
                    <td className={"w-4/12 border-0.5 border-primary-border text-cbs-highlight-color px-4 py-2"}>
                        Đang triển khai
                    </td>
                </tr>
                <tr>
                    <td className={"w-2/12 border-0.5 border-primary-border text-primary-gray px-4 py-2"}>
                        Thông tin người mua/Tài khoản
                    </td>
                    <td className={"w-4/12 border-0.5 border-primary-border text-cbs-highlight-color px-4 py-2"}>
                        Công ty cổ phần ABC. Tài khoản 002212233 ngân hàng ACB
                    </td>
                    <td className={"w-2/12 border-0.5 border-primary-border text-primary-gray px-4 py-2"}>
                        Bảo lãnh tạm ứng
                    </td>
                    <td className={"w-4/12 border-0.5 border-primary-border text-cbs-highlight-color px-4 py-2"}>
                        Thời hạn 15/7/2022
                    </td>
                </tr>
                <tr>
                    <td className={"w-2/12 border-0.5 border-primary-border text-primary-gray px-4 py-2"}>
                        Thông tin người bán/Tài khoản
                    </td>
                    <td className={"w-4/12 border-0.5 border-primary-border text-cbs-highlight-color px-4 py-2"}>
                        Công ty cổ phần ABC. Tài khoản 002212233 ngân hàng ACB
                    </td>
                    <td className={"w-2/12 border-0.5 border-primary-border text-primary-gray px-4 py-2"}>
                        Bảo lãnh thực hiện hợp đồng
                    </td>
                    <td className={"w-4/12 border-0.5 border-primary-border text-cbs-highlight-color px-4 py-2"}>
                        Thời hạn 15/7/2022
                    </td>
                </tr>
                </tbody>
            </table>

            <div className={"px-4 mb-2 mt-4 text-lg text-primary-gray"}>
                Giá trị ký, sản lượng, nghiệm thu, thanh toán
            </div>
            <table className={"table-fixed border-collapse w-1/2"}>
                <tbody>
                <tr>
                    <td className={"w-2/12 border-0.5 border-primary-border text-primary-gray px-4 py-2"}>
                        Giá trị ký
                    </td>
                    <td className={"w-4/12 border-0.5 border-primary-border text-cbs-highlight-color px-4 py-2"}>
                        100.000.000.000
                    </td>
                </tr>
                <tr>
                    <td className={"w-2/12 border-0.5 border-primary-border text-primary-gray px-4 py-2"}>
                        Sản lượng
                    </td>
                    <td className={"w-4/12 border-0.5 border-primary-border text-cbs-highlight-color px-4 py-2"}>
                        100.000.000.000
                    </td>
                </tr>
                <tr>
                    <td className={"w-2/12 border-0.5 border-primary-border text-primary-gray px-4 py-2"}>
                        Nghiệm thu hoàn thành
                    </td>
                    <td className={"w-4/12 border-0.5 border-primary-border text-cbs-highlight-color px-4 py-2"}>
                        100.000.000.000
                    </td>
                </tr>
                <tr>
                    <td className={"w-2/12 border-0.5 border-primary-border text-primary-gray px-4 py-2"}>
                        Thanh toán
                    </td>
                    <td className={"w-4/12 border-0.5 border-primary-border text-cbs-highlight-color px-4 py-2"}>
                        100.000.000.000
                    </td>
                </tr>
                <tr>
                    <td className={"w-2/12 border-0.5 border-primary-border text-primary-gray px-4 py-2"}>
                        Còn lại chưa thanh toán
                    </td>
                    <td className={"w-4/12 border-0.5 border-primary-border text-cbs-highlight-color px-4 py-2"}>
                        100.000.000.000
                    </td>
                </tr>
                <tr>
                    <td className={"w-2/12 border-0.5 border-primary-border text-primary-gray px-4 py-2"}>
                        Ngày quyết toán
                    </td>
                    <td className={"w-4/12 border-0.5 border-primary-border text-cbs-highlight-color px-4 py-2"}>
                        15/08/2022
                    </td>
                </tr>
                <tr>
                    <td className={"w-2/12 border-0.5 border-primary-border text-primary-gray px-4 py-2"}>
                        Giá trị quyết toán
                    </td>
                    <td className={"w-4/12 border-0.5 border-primary-border text-cbs-highlight-color px-4 py-2"}>
                        100.000.000.000
                    </td>
                </tr>
                </tbody>
            </table>

            <div className={"px-4 mb-2 mt-4 text-lg text-primary-gray"}>
                Hồ sơ đính kèm
            </div>

            <table className={"table-fixed border-collapse w-full"}>
                <tbody>
                {[...Array(4)].map((e, i) => (
                    <tr key={i}>
                        <td className={"w-4/12 border-b-0.5 border-primary-border px-4 py-2"}>
                            <p>Giấy chứng nhận Đăng ký doanh nghiệp (thay đổi lần thứ 2 ngày 17/05/2021)</p>
                            <p className={"text-xs text-primary-gray mt-1"}>Phùng Thị Hà-PGI-20/07/2021</p>
                        </td>
                        <td className={"w-3/12 border-b-0.5 border-primary-border px-4 py-2"}>
                            ARM.CAL-PGI.PMI\HDCG\210515
                        </td>
                        <td className={"w-1/12 border-b-0.5 border-primary-border px-4 py-2"}>
                            20/05/2021
                        </td>
                        <td className={"w-2/12 border-b-0.5 border-primary-border px-4 py-2"}>
                            Cặp F1, Ngăn A5, Tủ A1
                        </td>
                        <td className={"w-2/12 border-b-0.5 border-primary-border px-4 py-2"}>
                            Hồ sơ gốc đã được scan
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

        </div>
    )
}