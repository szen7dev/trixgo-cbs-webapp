import React, {FC} from "react";
import iconBack from "assets/images/icon-back-gray.svg";
import downloadIcon from "assets/images/icons8-download-64.svg";
import iconPencil from "assets/images/icons8-pencil-96 1.png";
import nextIcon from "assets/images/icons-arrow-next.svg";

const ProjectBudgetDetailPage:FC = () => {
    return (
        <div className={"project-budget-detail relative flex flex-col h-full overflow-hidden"}>
            <div className={"sticky top-0 bg-white"}>
                <div className={"flex items-center"}>
                    <button className={"rounded-full flex items-center justify-center w-[40px] h-[40px] max-w-[40px] max-h-[40px] min-w-[40px] min-h-[40px] hover:bg-cbs-form-input-bg mr-3"}>
                        <img src={iconBack} alt={"----"} className={"w-[18px]"}/>
                    </button>
                    <p className={"text-lg text-primary-gray ml-2"}>Hợp đồng cung cấp, lắp đặt thiết bị hệ thống trạm xử lý nước thải</p>
                </div>
                <div className={"flex items-center pb-2 mt-2"}>
                    <div className={"border-0.5 border-primary-border flex items-center"}>
                        <button className={"px-4 py-2 bg-cbs-soft-blue border-r-0.5 border-primary-border text-primary"}>
                            Thông tin chung
                        </button>
                        <button className={"px-4 py-2 bg-white border-r-0.5 border-primary-border text-primary-gray"}>
                            Sản lượng
                        </button>
                        <button className={"px-4 py-2 bg-white border-r-0.5 border-primary-border text-primary-gray"}>
                            Nghiệm thu
                        </button>
                        <button className={"px-4 py-2 bg-white border-r-0.5 border-primary-border text-primary-gray"}>
                            Thanh toán
                        </button>
                    </div>
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
                {/*Thông tin chung*/}
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
                {/*End Thông tin chung*/}

                {/*Sản lượng*/}
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
                {/*End sản lượng*/}

                {/*Nghiệm thu*/}
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
                            Đề nghị tạm ứng/thanh toán (1)
                        </th>
                        <th className={"bg-cbs-table-header p-2 border-0.5 border-primary-border text-primary-gray font-normal text-left"}>
                            Thời hạn thanh toán
                        </th>
                        <th className={"bg-cbs-table-header p-2 border-0.5 border-primary-border text-primary-gray font-normal text-left"}>
                            Đã thanh toán (2)
                        </th>
                        <th className={"bg-cbs-table-header p-2 border-0.5 border-primary-border text-primary-gray font-normal text-left"}>
                            Còn lại chưa thanh toán (3=1-2)
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
                                    Nghiệm thu khối lượng thực hiện tháng 6 năm 2021 gói thầu Binary
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
                                    15/12/2021
                                </td>
                                <td className={"border-0.5 border-primary-border p-2 text-right"}>
                                    10.000.000
                                </td>
                                <td className={"border-0.5 border-primary-border p-2 text-right"}>
                                    10.000.000
                                </td>
                                <td className={"border-0.5 border-primary-border p-2"}>
                                    Đệ trình phê duyệt Hồ sơ thanh toán Đợt 6 PGI-PMI Dự án CHG
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
                {/*End nghiệm thu*/}

                {/*Thanh toán*/}
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
                {/*End thanh toán*/}
            </div>
        </div>
    )
}

export default ProjectBudgetDetailPage;