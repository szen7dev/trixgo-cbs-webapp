import React, {FC} from "react"
import iconBack from "assets/images/icon-back-gray.svg";
import {Link, useParams} from "react-router-dom";
import downloadIcon from "../../../../assets/images/icons8-download-64.svg";
import nextIcon from "../../../../assets/images/icons-arrow-next.svg";

const DocumentListProfileByCate:FC = () => {
    const {id: departmentID, cateId} = useParams<{id: string, cateId: string}>();

    return (
        <div className={"flex flex-1 flex-col overflow-hidden"}>
            <div className={"sticky top-0 bg-white"}>
                <div className={"flex items-center border-b-0.5 border-primary-border py-2"}>
                    <button className={"rounded-full flex items-center justify-center w-[40px] h-[40px] max-w-[40px] max-h-[40px] min-w-[40px] min-h-[40px] hover:bg-cbs-form-input-bg mr-3"}>
                        <img src={iconBack} alt={"----"} className={"w-[18px]"}/>
                    </button>
                    <span className={"text-lg text-primary-gray"}>Ủy ban nhân dân thành phố Hà Nội</span>
                    <img src={nextIcon} alt={"-----"} className={"mx-4 h-[12px] w-[12px]"}/>
                    <span className={"text-lg text-primary-gray"}>Quyết định</span>
                    <button className={"flex items-center justify-center mx-3 ml-6"}>
                        <img src={downloadIcon} alt={"-----"} className={"w-[18px] h-[18px]"}/>
                    </button>
                </div>
            </div>
            <div className="flex-1 overflow-y-auto">
                <table className={"table-fixed border-collapse w-full"}>
                    <thead>
                    <tr className={"sticky top-0"}>
                        <th className={"bg-cbs-table-header text-primary-gray text-center font-normal w-[50px] border-b-0.5 border-primary-border align-middle py-3"}>
                            <input
                                className="form-check-input"
                                type="checkbox"
                                value=""
                                id="flexCheckDefault"
                            />
                        </th>
                        <th className={"bg-cbs-table-header text-primary-gray text-left font-normal w-1/5 border-b-0.5 border-primary-border align-middle py-3"}>
                            Nội dung
                        </th>
                        <th className={"bg-cbs-table-header text-primary-gray text-left font-normal w-1/6 border-b-0.5 border-primary-border align-middle py-3"}>
                            Chủ thể ban hành
                        </th>
                        <th className={"bg-cbs-table-header text-primary-gray text-left font-normal border-b-0.5 border-primary-border align-middle py-3"}>
                            Mã hiệu
                        </th>
                        <th className={"bg-cbs-table-header text-primary-gray text-left font-normal border-b-0.5 border-primary-border align-middle py-3"}>
                            Ngày văn bản
                        </th>
                        <th className={"bg-cbs-table-header text-primary-gray text-left font-normal border-b-0.5 border-primary-border align-middle py-3"}>
                            Mã hiệu lưu
                        </th>
                        <th className={"bg-cbs-table-header w-[70px] text-primary-gray text-center font-normal border-b-0.5 border-primary-border align-middle py-3"}>
                            Số lượng
                        </th>
                        <th className={"bg-cbs-table-header text-primary-gray text-left font-normal border-b-0.5 border-primary-border align-middle py-3"}>
                            Tình trạng
                        </th>
                        <th className={"bg-cbs-table-header text-primary-gray text-left font-normal w-1/7 border-b-0.5 border-primary-border align-middle py-3"}>
                            Ghi chú
                        </th>
                        <th className={"bg-cbs-table-header text-primary-gray text-left font-normal w-1/7 border-b-0.5 border-primary-border align-middle py-3"}>
                            Địa chỉ lưu trữ
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        [...Array(3)].map((e,i) => (
                            <tr key={i}>
                                <td className={"border-b-0.5 border-primary-border py-3 text-center"}>
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        value=""
                                        id="flexCheckDefault"
                                    />
                                </td>
                                <td className={"border-b-0.5 border-primary-border py-3"}>
                                    <p>Giấy chứng nhận Đăng ký doanh nghiệp (thay đổi lần thứ 2 ngày 17/05/2021)</p>
                                    <p className={"mt-1 text-primary-gray text-xs"}>Phùng Thị Hà-PGI-20/07/2021</p>
                                </td>
                                <td className={"border-b-0.5 border-primary-border py-3"}>
                                    Sở Kế hoạch và Đầu tư thành phố Hà Nội
                                </td>
                                <td className={"border-b-0.5 border-primary-border py-3"}>
                                    ARM.CAL-PGI.PMI\HDCG\210515
                                </td>
                                <td className={"border-b-0.5 border-primary-border py-3 text-center"}>
                                    20/05/2021
                                </td>
                                <td className={"border-b-0.5 border-primary-border py-3"}>
                                    ARM.CAL-PGI.PMI\HDCG\210515
                                </td>
                                <td className={"border-b-0.5 border-primary-border py-3 text-right pr-2"}>
                                    12
                                </td>
                                <td className={"border-b-0.5 border-primary-border py-3"}>
                                    Đã ký
                                </td>
                                <td className={"border-b-0.5 border-primary-border py-3"}>
                                    Có bản gốc đi kèm
                                </td>
                                <td className={"border-b-0.5 border-primary-border py-3"}>
                                    Cặp F1, Ngăn A5, Tủ A1
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default DocumentListProfileByCate;