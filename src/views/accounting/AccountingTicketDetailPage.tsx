import React, { FC, useEffect, useState } from "react";
import Back from "assets/icons/Back";
import DotsVerticalIcon from "assets/icons/DotsVertical";
import { NavLink, useParams } from "react-router-dom"
import ActionAccountingGroup from "./components/ActionAccountingGroup";
import LogIcon from "assets/icons/Log";
import FolderIcon from "assets/images/icons8-folder-100.svg";
import { VOUCHER_TYPES, DATE_FORMAT_TIME } from "apis/localdb/index";
import Paginate from "components/common/Paginate";

import {
    useJournalDetailList
} from "services/hooks/useAccountingVoucher";
import { convertDisplayDate, formatNumberMoney } from "helpers/index"

import API from "apis/repository";
const APP_ACCOUNTING_VOUCHER = "/api/accounting/voucher";

const AccountingTicketDetailPage: FC = () => {

    const params: any = useParams();

    const [voucherDetail, setVoucherDetail] = useState({} as any);

    useEffect(() => {
        const fetchDetailAccountingVoucher = async (id: any) => {
            const { data } = await API.get(
                `${APP_ACCOUNTING_VOUCHER}/${id}`, {
                params: {
                    populates: {
                        "path": "customer contract ipc subtype userCreate userUpdate company",
                        "select": "name description bizfullname",
                    }
                }
            }
            )
            setVoucherDetail(data?.data || {})
            return data
        }
        params.id && fetchDetailAccountingVoucher(params.id)
    }, [params.id]);

    const [pageParam, setPageParam] = useState('');
    const [prevCursor, setPrevCursor] = useState([null]);
    const journalDetailList = useJournalDetailList(pageParam, params.id);

    useEffect(() => {
        if (!journalDetailList.nextCursor) {
            return;
        }
        const isExist = prevCursor.find(item => item === journalDetailList.nextCursor)
        if (!isExist) {
            setPrevCursor([...prevCursor, journalDetailList.nextCursor])
        }
    }, [journalDetailList.nextCursor]);
    const prevPageAction = () => {
        if (!journalDetailList.nextCursor) {
            setPageParam(prevCursor[prevCursor.length - 2] || '')
        } else {
            const prev = prevCursor.findIndex(item => item === journalDetailList.nextCursor)
            setPageParam(prevCursor[prev - 2] || '')
        }

    };

    const nextPageAction = () => {
        setPageParam(journalDetailList.nextCursor)
    }

    return (
        <div className={"relative min-h-full pb-10"}>
            <div className="shadow-lg flex border-b border-gray-200 align-items-center px-6 py-2 sticky top-0 bg-white z-10">
                <NavLink
                    exact
                    to={"/accounting/messageHome"}
                >
                    <Back />
                </NavLink>
                <button type="button" className="rounded-full h-10 w-10 flex items-center justify-center bg-gray-100 ml-5">
                    <DotsVerticalIcon />
                </button>
            </div>
            <div className={"content-detail-ticket"}>
                <div className={"px-6 py-2"}>
                    <div className={"title-ticket-detail flex"}>
                        <div className={"flex-1 flex items-center"}>
                            <div className={"text-xl"}>
                                {voucherDetail?.name}
                            </div>
                            <span className={"text-sm rounded-full bg-primary text-white h-5 leading-5 ml-2 px-2"}>
                                {VOUCHER_TYPES.find(item => item.value === voucherDetail?.type)?.text}
                            </span>
                        </div>
                        <button type="button" className={"rounded-full h-10 w-10 flex items-center justify-center bg-gray-100"}>
                            <ActionAccountingGroup
                                icon={<DotsVerticalIcon />}
                            />
                        </button>
                    </div>
                    <div className={"infor-ticket flex mt-1 items-center"}>
                        <p className={"flex-1"}><span className={"text-gray-500"}>Khởi tạo:</span>  {voucherDetail?.userCreate?.bizfullname} {convertDisplayDate(voucherDetail?.createAt, DATE_FORMAT_TIME)}</p>
                        <p><span className={"text-gray-500"}>Cập nhật:</span> {voucherDetail?.userUpdate?.bizfullname} {convertDisplayDate(voucherDetail?.updatedAt, DATE_FORMAT_TIME)}</p>
                        <button type="button" className={"ml-2"}>
                            <LogIcon />
                        </button>
                    </div>
                    <div className={"extra-infor-ticket flex text-gray-500 items-center mt-2"}>
                        <span className={"mr-1"}>
                            <img alt={"icon-folder"} src={FolderIcon} />
                        </span>
                        Phân vùng: {voucherDetail?.company?.name} | Hợp đồng: {voucherDetail?.contract?.name} - {voucherDetail?.contract?.sign} - Ngày {convertDisplayDate(voucherDetail?.contract?.date)} | {voucherDetail?.ipc?.name}
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

                    {journalDetailList?.listJournalDetail?.map((item: any) => {
                        return (
                            <div key={item._id} className={"flex table-row"}>
                                <div className={"px-2 py-4 table-cell text-left box-border border-b border-t border-gray-300 align-middle"}>
                                    {item?.debit?.name} - {item?.debit?.description}
                                </div>
                                <div className={"px-2 py-4 table-cell box-border border-b border-t border-gray-300 align-middle"}>
                                    {item?.credit?.name} - {item?.credit?.description}
                                </div>
                                <div className={"px-2 py-4 table-cell box-border border-b border-t border-gray-300 align-middle"}>
                                    {item?.customerDebit?.name}
                                </div>
                                <div className={"px-2 py-4 table-cell box-border border-b border-t border-gray-300 align-middle"}>
                                    {item?.customerCredit?.name}
                                </div>
                                <div className={"px-2 py-4 table-cell box-border border-b border-t border-gray-300 align-middle"}>
                                    {item?.goods?.name}
                                </div>
                                <div className={"px-2 py-4 table-cell box-border border-b border-t border-gray-300 align-middle"}>
                                    {item?.warehouse?.name}
                                </div>
                                <div className={"px-2 py-4 table-cell box-border border-b border-t border-gray-300 align-middle"}>
                                    Cái
                                </div>
                                <div className={"px-2 py-4 table-cell box-border border-b border-t border-gray-300 align-middle"}>
                                    {formatNumberMoney(item?.quantity)}
                                </div>
                                <div className={"px-2 py-4 table-cell box-border border-b border-t border-gray-300 align-middle"}>
                                    {formatNumberMoney(item?.unitprice)}
                                </div>
                                <div className={"px-2 py-4 table-cell box-border border-b border-t border-gray-300 align-middle"}>
                                    {formatNumberMoney(item?.amount)}
                                </div>
                                <div className={"px-2 py-4 table-cell box-border border-b border-t border-gray-300 align-middle"}>
                                    {item?.contract?.name}
                                </div>
                                <div className={"px-2 py-4 table-cell box-border border-b border-t border-gray-300 align-middle"}>

                                </div>
                                <div className={"px-2 py-4 table-cell box-border border-b border-t border-gray-300 align-middle"}>
                                    {item?.note}
                                </div>
                            </div>
                        )
                    })}

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
                            {formatNumberMoney(voucherDetail?.amount)}
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

            <Paginate
                totalPages={journalDetailList.totalPage}
                totalRecord={journalDetailList.totalRecord} hasNextPage
                prevPageAction={() => prevPageAction()}
                nextPageAction={() => nextPageAction()} />
        </div>
    )
}
export default AccountingTicketDetailPage;
