import React, {FC} from "react";
import ThreeDotsVertical from "assets/images/icon-3dots-vertical.svg";
import "react-datepicker/dist/react-datepicker.css";
import ActionAccountingGroup from "./components/ActionAccountingGroup";
import Paginate from "../../../components/common/Paginate";
import {useModal} from "../../../services/hooks/useModal";
import CreateNewTicket from "./components/CreateNewTicket";
import {useSocial} from "../../../services/hooks/useSocial";
import {NavLink} from "react-router-dom";
import SearchInput from "../../../components/common/SearchInput";
import FinancialCashFlowFilterButton from "../financial/planning/components/FinancialCashFlow/FinancialCashFlowFilterButton";
import TriangleDown from "../../../assets/icons/TriangleDown";

const AccountingTicketsPage:FC = () => {
    const { openModal } = useModal();
    const {
        listMedias,
        isLoadingListMedias,
        nextPageListMedias,
        prevPageListMedias,
        totalRecord,
        totalPages,
        hasNextPage
    } = useSocial();

    return (
        <div className={"paginate-wrapper relative"}>
            <div className={"financial-cashflow-listing-heading flex items-center border-b py-2 px-6"}>
                <div className={"flex items-center flex-1"}>
                    <div className={"text-lg"}>Danh sách</div>
                    <SearchInput classNameWrapper={"ml-4"} onChange={event => console.log(event.target.value)}/>
                    <FinancialCashFlowFilterButton/>
                </div>
                <button
                    onClick={() =>
                        openModal(
                            <div className={"bg-white inline-block w-screen h-screen overflow-hidden transition-all transform bg-primary-light shadow-xl rounded absolute left-0 right-0 top-0"}>
                                <CreateNewTicket/>
                            </div>
                        )
                    }
                    className={"bg-green-success h-[32px] text-white rounded px-5"}>
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
                            <div className={"flex items-center"}>
                                <input className="form-check-input mr-2" type="checkbox" value="" id="flexCheckDefault"/>
                                <TriangleDown/>
                            </div>
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border-b align-middle w-2/12 text-gray-500"}>
                            Nội dung
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border-b align-middle text-gray-500"}>
                            Ngày chứng từ
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border-b align-middle text-gray-500"}>
                            Loại phiếu
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border-b align-middle text-gray-500"}>
                            Số hiệu
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border-b align-middle text-gray-500"}>
                            Mã khách
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border-b align-middle text-gray-500"}>
                            Hợp đồng
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border-b align-middle text-gray-500"}>
                            Giá trị/Thành tiền
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border-b align-middle text-gray-500"}>
                            Ghi chú
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border-b align-middle text-gray-500"}>
                        </div>
                    </div>
                    <div className={"body-table row flex table-row"}>
                        <div className={"px-6 py-4 table-cell box-border border-b align-middle w-3"}>
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border-b align-middle w-2/12"}>
                            <NavLink to={"/accounting/home/123"}>Chi phí xăng xe phục vụ việc đi lại của nhóm dự án CHG</NavLink>
                            <p className={"mt-1 text-gray-500"}>Phùng Thị Hà-PG 20/07/2021 15:26</p>
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border-b"}>
                            05/11/2021
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border-b"}>
                            Phiếu chi
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border-b"}>
                            PGI.PKT13
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border-b"}>
                            Công ty xăng dầu số 2 Vạn Phúc
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border-b"}>
                            Cung cấp xăng dầu định kỳ
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border-b"}>
                            34.125.000
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border-b"}>
                            Đã cung cấp chứng từ gốc trả về cho công ty
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border-b"}>
                            <ActionAccountingGroup/>
                        </div>
                    </div>
                    <div className={"body-table row flex table-row"}>
                        <div className={"px-6 py-4 table-cell box-border border-b align-middle w-3"}>
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border-b align-middle w-2/12"}>
                            <NavLink to={"/accounting/home/123"}>Chi phí xăng xe phục vụ việc đi lại của nhóm dự án CHG</NavLink>
                            <p className={"mt-1 text-gray-500"}>Phùng Thị Hà-PG 20/07/2021 15:26</p>
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border-b"}>
                            05/11/2021
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border-b"}>
                            Phiếu chi
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border-b"}>
                            PGI.PKT13
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border-b"}>
                            Công ty xăng dầu số 2 Vạn Phúc
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border-b"}>
                            Cung cấp xăng dầu định kỳ
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border-b"}>
                            34.125.000
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border-b"}>
                            Đã cung cấp chứng từ gốc trả về cho công ty
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border-b"}>
                            <ActionAccountingGroup/>
                        </div>
                    </div>
                    <div className={"body-table row flex table-row"}>
                        <div className={"px-6 py-4 table-cell box-border border-b align-middle w-3"}>
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border-b align-middle w-2/12"}>
                            <NavLink to={"/accounting/home/123"}>Chi phí xăng xe phục vụ việc đi lại của nhóm dự án CHG</NavLink>
                            <p className={"mt-1 text-gray-500"}>Phùng Thị Hà-PG 20/07/2021 15:26</p>
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border-b"}>
                            05/11/2021
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border-b"}>
                            Phiếu chi
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border-b"}>
                            PGI.PKT13
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border-b"}>
                            Công ty xăng dầu số 2 Vạn Phúc
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border-b"}>
                            Cung cấp xăng dầu định kỳ
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border-b"}>
                            34.125.000
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border-b"}>
                            Đã cung cấp chứng từ gốc trả về cho công ty
                        </div>
                        <div className={"px-2 py-4 table-cell box-border border-b"}>
                            <ActionAccountingGroup/>
                        </div>
                    </div>
                </div>
            </div>
            <Paginate  hasNextPage={hasNextPage} totalRecord={totalRecord} totalPages={totalPages} isFetching={isLoadingListMedias} nextPageAction={nextPageListMedias} prevPageAction={prevPageListMedias}/>
        </div>
    )
};

export default AccountingTicketsPage;
