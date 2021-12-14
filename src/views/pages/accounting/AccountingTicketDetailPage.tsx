import React,{FC} from "react";
import {useParams} from "react-router-dom";
import Back from "assets/icons/Back";
import DotsVerticalIcon from "assets/icons/DotsVertical";
import {NavLink} from "react-router-dom"
import ActionAccountingGroup from "./components/ActionAccountingGroup";
import LogIcon from "assets/icons/Log";
import FolderIcon from "assets/images/icons8-folder-100.svg";
import DropdownSearchable from "../../../components/common/DropdownSearch";
import Copy from "../../../assets/images/icons8-copy-96.png";
import CloseRed from "../../../assets/icons/CloseRed";
const AccountingTicketDetailPage:FC = () => {
    const params = useParams<{ id: string }>();

    return (
        <div className={"relative"}>
            <div className="shadow-lg flex border-b border-gray-200 align-items-center px-6 py-2 sticky top-0 bg-white z-10">
                <NavLink
                    exact
                    to={"/accounting/accbill"}
                >
                    <Back/>
                </NavLink>
                <button className="rounded-full h-10 w-10 flex items-center justify-center bg-gray-100 ml-5">
                    <DotsVerticalIcon/>
                </button>
            </div>
            <div className={"content-detail-ticket"}>
                <div className={"px-6 py-2"}>
                    <div className={"title-ticket-detail flex"}>
                        <div className={"flex-1 flex items-center"}>
                            <div className={"text-xl"}>
                                Tạm ứng hợp đồng số 19112021/HDKT/CPMI-PGI
                            </div>
                            <span className={"text-sm rounded-full bg-primary text-white h-5 leading-5 ml-2 px-2"}>
                            Giấy báo có
                        </span>
                        </div>
                        <button className={"rounded-full h-10 w-10 flex items-center justify-center bg-gray-100"}>
                            <ActionAccountingGroup
                                icon={<DotsVerticalIcon/>}
                            />
                        </button>
                    </div>
                    <div className={"infor-ticket flex mt-1 items-center"}>
                        <p className={"flex-1"}><span className={"text-gray-500"}>Khởi tạo:</span> Phan Văn Trường-PGI 15/9/2021 15:38</p>
                        <p><span className={"text-gray-500"}>Cập nhật:</span> Phùng Thị Thu-TRX 15/9/2021 15:38</p>
                        <button className={"ml-2"}>
                            <LogIcon/>
                        </button>
                    </div>
                    <div className={"extra-infor-ticket flex text-gray-500 items-center mt-2"}>
                        <span className={"mr-1"}>
                            <img alt={"icon-folder"} src={FolderIcon}/>
                        </span>
                        Phân vùng: Công ty Cổ phần Trixgo | Hợp đồng: Mua sắm hàng hóa thường xuyên - 1502/HDKT/CPMI/PGI - Ngày 15/2/2021 | Kỳ thanh toán đợt 1
                    </div>
                </div>
                <div className={"relative table border-collapse w-full text-center"}>
                    <div className={"header flex table-row"}>
                        <div className={"px-2 py-4 table-cell box-border border-b border-t text-gray-500 border-gray-300 align-middle"}>
                            TK nợ
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border-b border-t text-gray-500 border-gray-300 align-middle"}>
                            TK có
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border-b border-t text-gray-500 border-gray-300 align-middle"}>
                            Mã khách nợ
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border-b border-t text-gray-500 border-gray-300 align-middle"}>
                            Mã khách có
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border-b border-t text-gray-500 border-gray-300 align-middle"}>
                            Sản phẩm/Hàng hóa
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border-b border-t text-gray-500 border-gray-300 align-middle"}>
                            Kho bãi
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border-b border-t text-gray-500 border-gray-300 align-middle"}>
                            Tồn kho
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border-b border-t text-gray-500 border-gray-300 align-middle"}>
                            Số lượng
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border-b border-t text-gray-500 border-gray-300 align-middle"}>
                            Đơn giá
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border-b border-t text-gray-500 border-gray-300 align-middle"}>
                            Thành tiền
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border-b border-t text-gray-500 border-gray-300 align-middle"}>
                            Hợp đồng
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border-b border-t text-gray-500 border-gray-300 align-middle"}>
                            Ngân hàng
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border-b border-t text-gray-500 border-gray-300 align-middle"}>
                            Ghi chú
                        </div>
                    </div>
                    <div className={"flex table-row"}>
                        <div className={"px-2 py-4 table-cell box-border border-b border-t border-gray-300 align-middle"}>
                            1121-VPBank
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border-b border-t border-gray-300 align-middle"}>
                            131-Phải thu của khách hàng
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border-b border-t border-gray-300 align-middle"}>
                            Công ty Cổ phần PGI
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border-b border-t border-gray-300 align-middle"}>
                            Công ty Cổ phần đầu tư AB5
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border-b border-t border-gray-300 align-middle"}>
                            Đèn LED cao cấp A66
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border-b border-t border-gray-300 align-middle"}>
                            Kho Linh Đàm
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border-b border-t border-gray-300 align-middle"}>
                            Cái
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border-b border-t border-gray-300 align-middle"}>
                            10
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border-b border-t border-gray-300 align-middle"}>
                            1.000.000
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border-b border-t border-gray-300 align-middle"}>
                            10.000.000
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border-b border-t border-gray-300 align-middle"}>
                            Mua sắm hàng hóa thường xuyên
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border-b border-t border-gray-300 align-middle"}>

                        </div>
                        <div className={"px-2 py-4 table-cell box-border border-b border-t border-gray-300 align-middle"}>
                            Trả tiền mặt
                        </div>
                    </div>
                    <div className={"flex table-row"}>
                        <div className={"px-2 py-4 table-cell box-border border-b border-t border-gray-300 align-middle"}>
                            1121-VPBank
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border-b border-t border-gray-300 align-middle"}>
                            131-Phải thu của khách hàng
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border-b border-t border-gray-300 align-middle"}>
                            Công ty Cổ phần PGI
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border-b border-t border-gray-300 align-middle"}>
                            Công ty Cổ phần đầu tư AB5
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border-b border-t border-gray-300 align-middle"}>
                            Đèn LED cao cấp A66
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border-b border-t border-gray-300 align-middle"}>
                            Kho Linh Đàm
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border-b border-t border-gray-300 align-middle"}>
                            Cái
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border-b border-t border-gray-300 align-middle"}>
                            10
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border-b border-t border-gray-300 align-middle"}>
                            1.000.000
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border-b border-t border-gray-300 align-middle"}>
                            10.000.000
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border-b border-t border-gray-300 align-middle"}>
                            Mua sắm hàng hóa thường xuyên
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border-b border-t border-gray-300 align-middle"}>

                        </div>
                        <div className={"px-2 py-4 table-cell box-border border-b border-t border-gray-300 align-middle"}>
                            Trả tiền mặt
                        </div>
                    </div>
                    <div className={"flex table-row"}>
                        <div className={"px-2 py-4 table-cell box-border border-b border-t border-gray-300 align-middle"}>
                            1121-VPBank
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border-b border-t border-gray-300 align-middle"}>
                            131-Phải thu của khách hàng
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border-b border-t border-gray-300 align-middle"}>
                            Công ty Cổ phần PGI
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border-b border-t border-gray-300 align-middle"}>
                            Công ty Cổ phần đầu tư AB5
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border-b border-t border-gray-300 align-middle"}>
                            Đèn LED cao cấp A66
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border-b border-t border-gray-300 align-middle"}>
                            Kho Linh Đàm
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border-b border-t border-gray-300 align-middle"}>
                            Cái
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border-b border-t border-gray-300 align-middle"}>
                            10
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border-b border-t border-gray-300 align-middle"}>
                            1.000.000
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border-b border-t border-gray-300 align-middle"}>
                            10.000.000
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border-b border-t border-gray-300 align-middle"}>
                            Mua sắm hàng hóa thường xuyên
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border-b border-t border-gray-300 align-middle"}>

                        </div>
                        <div className={"px-2 py-4 table-cell box-border border-b border-t border-gray-300 align-middle"}>
                            Trả tiền mặt
                        </div>
                    </div>
                    <div className={"flex table-row"}>
                        <div className={"px-2 py-4 table-cell box-border border-b border-t border-gray-300 align-middle bg-gray-200"}>

                        </div>
                        <div className={"px-2 py-4 table-cell box-border border-b border-t border-gray-300 align-middle bg-gray-200"}>

                        </div>
                        <div className={"px-2 py-4 table-cell box-border border-b border-t border-gray-300 align-middle bg-gray-200"}>

                        </div>
                        <div className={"px-2 py-4 table-cell box-border border-b border-t border-gray-300 align-middle bg-gray-200"}>

                        </div>
                        <div className={"px-2 py-4 table-cell box-border border-b border-t border-gray-300 align-middle bg-gray-200"}>

                        </div>
                        <div className={"px-2 py-4 table-cell box-border border-b border-t border-gray-300 align-middle bg-gray-200"}>

                        </div>
                        <div className={"px-2 py-4 table-cell box-border border-b border-t border-gray-300 align-middle bg-gray-200"}>

                        </div>
                        <div className={"px-2 py-4 table-cell box-border border-b border-t border-gray-300 align-middle bg-gray-200"}>

                        </div>
                        <div className={"px-2 py-4 table-cell box-border border-b border-t border-gray-300 align-middle bg-gray-200"}>

                        </div>
                        <div className={"px-2 py-4 table-cell box-border border-b border-t border-gray-300 align-middle bg-gray-200 font-bold"}>
                            10.000.000
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border-b border-t border-gray-300 align-middle bg-gray-200"}>

                        </div>
                        <div className={"px-2 py-4 table-cell box-border border-b border-t border-gray-300 align-middle bg-gray-200"}>

                        </div>
                        <div className={"px-2 py-4 table-cell box-border border-b border-t border-gray-300 align-middle bg-gray-200"}>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AccountingTicketDetailPage;
