import React, {FC, useEffect, useState} from "react";
import {NavLink, useParams} from "react-router-dom";
import Paginate from "../../../../components/common/Paginate";
import TriangleDown from "assets/icons/TriangleDown";
import VerifyIcon from "assets/images/icons8-verified-check-circle-for-approved-valid-content-96.svg"
import SearchIcon from "assets/images/icons8-search-120.png";
import DownloadIcon from "assets/images/icons8-download-96.svg";
import ShareIcon from "assets/images/icons8-share-rounded-96.svg";
import CopyIcon from "assets/images/icons8-copy-96.svg";
import SendEmailIcon from "assets/images/icons8-send-email-96.svg";
import PencilIcon from "assets/images/icons8-pencil-96.svg";
import TrashIcon from "assets/images/icons8-remove-96.svg";
import PrintIcon from "assets/images/icons8-print-96.svg";
import ThreeDotsVertical from "../../../../assets/images/icon-3dots-vertical.svg";
import FinancialCashFlowFilterButton from "./components/FinancialCashFlow/FinancialCashFlowFilterButton";

const FinancialCashFlowPage:FC = () => {

    return (
        <div className={"financial-cashflow-listing paginate-wrapper relative"}>
            <div className={"financial-cashflow-listing-heading flex items-center border-b py-2 px-6"}>
                <div className={"flex items-center flex-1"}>
                    <div className={"text-lg"}>Kế hoạch dòng tiền</div>
                    <div className={"relative flex items-center ml-4"}>
                        <img src={SearchIcon} alt={"icon search"} className={"absolute w-[14px] h-[14px] left-2"}/>
                        <input className={"h-[30px] w-full bg-gray-50 pl-10 rounded"} type={"text"} placeholder={"Nhập từ khóa tìm kiếm"}/>
                    </div>
                    <FinancialCashFlowFilterButton/>
                    <div className={"mr-3 w-4 border-r border-gray-400 h-[16px]"}/>
                    <button className={"flex items-center mr-3"}>
                        <img className={"w-[24px] h-[24px]"} alt={"icon"} src={DownloadIcon}/>
                    </button>
                    <button className={"flex items-center mr-3"}>
                        <img className={"w-[24px] h-[24px]"} alt={"icon"} src={ShareIcon}/>
                    </button>
                    <button className={"flex items-center mr-3"}>
                        <img className={"w-[24px] h-[24px]"} alt={"icon"} src={CopyIcon}/>
                    </button>
                    <button className={"flex items-center mr-3"}>
                        <img className={"w-[24px] h-[24px]"} alt={"icon"} src={SendEmailIcon}/>
                    </button>
                    <button className={"flex items-center mr-3"}>
                        <img className={"w-[24px] h-[24px]"} alt={"icon"} src={PencilIcon}/>
                    </button>
                    <button className={"flex items-center mr-3"}>
                        <img className={"w-[24px] h-[24px]"} alt={"icon"} src={TrashIcon}/>
                    </button>
                    <button className={"flex items-center mr-3"}>
                        <img className={"w-[24px] h-[24px]"} alt={"icon"} src={PrintIcon}/>
                    </button>
                </div>
                <button className={"bg-green-success h-[32px] text-white rounded px-5"}>
                    Tạo mới
                </button>
                <button className="rounded-full h-10 w-10 flex items-center justify-center bg-gray-100 ml-5">
                    <img alt={"Icon"} src={ThreeDotsVertical}/>
                </button>
            </div>
            <div className={"financial-cashflow-table"}>
                <div className={"relative table border-collapse w-full"}>
                    <div className={"header flex table-row sticky z-10"}>
                        <div className={"px-6 py-4 table-cell box-border border-b align-middle w-3"}>
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border-b align-middle w-2/12 text-gray-500"}>
                            <div className={"flex items-center"}>
                                <TriangleDown/>
                                <span className={"ml-2"}>Nội dung</span>
                            </div>
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border-b align-middle text-gray-500"}>
                            Phân loại
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border-b align-middle text-gray-500"}>
                            Dự án/phòng ban
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border-b align-middle text-gray-500"}>
                            Kế hoạch thu
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border-b align-middle text-gray-500"}>
                            Kế hoạch chi
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border-b align-middle text-gray-500"}>
                            Ghi chú
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border-b align-middle text-gray-500"}>
                            Trạng thái/Phê duyệt
                        </div>
                    </div>
                    <div className={"body-table row flex table-row"}>
                        <div className={"px-6 py-4 table-cell box-border border-b align-middle w-3"}>
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border-b align-middle w-2/12"}>
                            <NavLink to={"fin/cashflow/123"}>Kế hoạch dòng tiền T12.21</NavLink>
                            <p className={"mt-1 text-gray-500"}>Phùng Thị Hà-PG 20/07/2021 15:26</p>
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border-b"}>
                            Loại 1
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border-b"}>
                            Tổ hợp chung cư cao cấp SH5-Public
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border-b"}>
                            34.125.000
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border-b"}>
                            34.125.000
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border-b"}>
                            Áp dụng cho toàn bộ hệ thống của CBSGroup
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border-b"}>
                            <div className={"flex items-center text-primary"}>
                                <span className={"mr-3"}>Đã phê duyệt</span>
                                <img src={VerifyIcon} alt={"icon"}/>
                            </div>
                            <p className={"mt-1 text-gray-500"}>Nguyễn Hữu Hiệp-PG 12/12/2021 15:45</p>
                        </div>
                    </div>
                    <div className={"body-table row flex table-row"}>
                        <div className={"px-6 py-4 table-cell box-border border-b align-middle w-3"}>
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border-b align-middle w-2/12"}>
                            <NavLink to={"fin/cashflow/123"}>Kế hoạch dòng tiền T12.21</NavLink>
                            <p className={"mt-1 text-gray-500"}>Phùng Thị Hà-PG 20/07/2021 15:26</p>
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border-b"}>
                            Loại 1
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border-b"}>
                            Tổ hợp chung cư cao cấp SH5-Public
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border-b"}>
                            34.125.000
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border-b"}>
                            34.125.000
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border-b"}>
                            Áp dụng cho toàn bộ hệ thống của CBSGroup
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border-b"}>
                            <div className={"flex items-center text-primary"}>
                                <span className={"mr-3"}>Đã phê duyệt</span>
                                <img src={VerifyIcon} alt={"icon"}/>
                            </div>
                            <p className={"mt-1 text-gray-500"}>Nguyễn Hữu Hiệp-PG 12/12/2021 15:45</p>
                        </div>
                    </div>
                    <div className={"body-table row flex table-row"}>
                        <div className={"px-6 py-4 table-cell box-border border-b align-middle w-3"}>
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border-b align-middle w-2/12"}>
                            <NavLink to={"fin/cashflow/123"}>Kế hoạch dòng tiền T12.21</NavLink>
                            <p className={"mt-1 text-gray-500"}>Phùng Thị Hà-PG 20/07/2021 15:26</p>
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border-b"}>
                            Loại 1
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border-b"}>
                            Tổ hợp chung cư cao cấp SH5-Public
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border-b"}>
                            34.125.000
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border-b"}>
                            34.125.000
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border-b"}>
                            Áp dụng cho toàn bộ hệ thống của CBSGroup
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border-b"}>
                            <div className={"flex items-center text-primary"}>
                                <span className={"mr-3"}>Đã phê duyệt</span>
                                <img src={VerifyIcon} alt={"icon"}/>
                            </div>
                            <p className={"mt-1 text-gray-500"}>Nguyễn Hữu Hiệp-PG 12/12/2021 15:45</p>
                        </div>
                    </div>
                </div>
            </div>
            <Paginate/>
        </div>
    )
}

export default FinancialCashFlowPage;
