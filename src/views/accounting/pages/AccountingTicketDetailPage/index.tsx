import React, { FC, useEffect, useState } from "react";
import Pen from "assets/images/icons8-pencil.svg";
import LogIcon from "assets/icons/Log";
import { useHistory, useParams } from "react-router-dom";
import { VOUCHER_TYPES, DATE_FORMAT_TIME } from "apis/localdb/index";
import { useUpdateAccountingVoucherMutation } from "services/hooks/accounting/useAccountingVoucher";
import { formatNumberMoney, convertDisplayDate } from "utils/cmcs";
import { CreateNewTicket } from "views/accounting/shareComponents/common";
import { useModal } from "services/hooks/useModal";
import { useJournalList, useJournal } from "services/hooks/accounting/useGeneralJournal";
import PaginateV2 from "../../../../shareComponents/common/PaginateV2";
import { toast } from "react-toastify";
import { read, utils } from 'xlsx';
import { createLinkAndClick } from "utils";

import API from "apis/repository";
const APP_ACCOUNTING_VOUCHER = "/api/accounting/vouchers";

type Props = {
  type?: number
};

export const AccountingTicketDetailPage: FC<Props> = ({ type = 1 }) => {
  const [pageIndex, setPageIndex] = useState(0)
  type PaginateHandle = React.ElementRef<typeof PaginateV2>;
  const ref = React.useRef<PaginateHandle>(null);

  const history = useHistory();
  const params: any = useParams();
  const [voucherDetail, setVoucherDetail] = useState<any>({});

  const { updateAccountingVoucherMutateAsync } = useUpdateAccountingVoucherMutation();
  const { openModal } = useModal();

  const fetchDetailAccountingVoucher = async (id: any) => {
    const { data } = await API.get(
      `${APP_ACCOUNTING_VOUCHER}?voucherID=${id}`, {
      params: {
        populates: {
          "path": "customer contract ipc subtype userCreate userUpdate company",
          "select": "name description fullname",
        }
      }
    }
    )
    setVoucherDetail(data?.data || {})
    return data
  }

  useEffect(() => {
    params.id && fetchDetailAccountingVoucher(params.id)
  }, [params.id]);

  const { listDataWithPager, isLoading, totalRecord, totalPage, fetchNextPage, hasNextPage, refetch } = useJournalList({
    params: {
        limit: 50,
        voucherID: params.id,
    },
    isFetchList: true
  })

  const handleFinishForm = async (values: any) => {
    const res = await updateAccountingVoucherMutateAsync(values);

    if (res.error || res.code && res.code !== 200) {
      return false;
    }

    refetch();
    fetchDetailAccountingVoucher(params.id);
    return true;
  }

    //_____Excel
    const [stateExport, setStateExport] = useState<{ isExporting: boolean }>({
      isExporting: false,
    })
    const { exportExcelAsync } = useJournal({})
    const handleExportExcel = async (param: any) => {
      try {
          console.log('Clicked with parameter:', param);
            setStateExport({ isExporting: true })
            const { error, data } = await exportExcelAsync({ 
              type: param.option,
              voucherID: params.id,
              filterParams: {
                voucherID: params.id
              }
             })
  
            if(error) {
                return toast.warn(data?.message);
            }
  
            data && createLinkAndClick(data, '_self')
        } catch (error: any) {
            toast.error(error.message)
        } finally {
            setStateExport({ isExporting: false })
      }
    }

  const openModalUpdate = () => {
    openModal(
      <div className={"bg-white inline-block w-screen h-screen overflow-hidden transition-all transform bg-primary-light shadow-xl rounded absolute left-0 right-0 top-0"}>
        <CreateNewTicket
          onFinish={handleFinishForm}
          type={type}
          isEdit={true}
          idEdit={voucherDetail._id}
          contractId={voucherDetail?.contract?._id}
          title="Cập nhật"
        />
      </div>
    )
  }

  return (
    <div className={"relative min-h-full pb-10"}>
      <div className={"content-detail-ticket"}>
        <div className={"px-2 py-2"}>
          <div className={"title-ticket-detail flex"}>
            <div className={"flex-1 flex items-center"}>
              <button
                type="button"
                className="p-2 rounded-3xl mr-2"
                onClick={() => history.goBack()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
              </button>
              <p className="text-lg">{voucherDetail?.name}</p>
              <span className={"text-sm rounded-full bg-primary text-white h-5 leading-5 ml-2 px-2"}>
                {VOUCHER_TYPES.find(item => item.value === voucherDetail?.type)?.text}
              </span>
              <button onClick={openModalUpdate} className={"p-3 ml-3 rounded-full hover:bg-gray-100"}>
                <img alt={"Icon"} src={Pen} />
              </button>
            </div>
          </div>
          <div className={"infor-ticket flex mt-1 items-center"}>
            <p className={"flex-1"}><span className={"text-gray-500"}>Khởi tạo:</span>  {voucherDetail?.userCreate?.fullname} {convertDisplayDate(voucherDetail?.createAt, DATE_FORMAT_TIME)}</p>
            <button type="button" className={"mr-2"}>
              <LogIcon />
            </button>
            <p><span className={"text-gray-500"}>Cập nhật:</span> {voucherDetail?.userUpdate?.fullname} {convertDisplayDate(voucherDetail?.updatedAt, DATE_FORMAT_TIME)}</p>
            <button className={"ml-10 px-4 py-2 text-left hover:bg-cbs-table-header text-cbs-highlight-color"}
              onClick={() => handleExportExcel({option: 3})}
            >
                Tải excel
            </button>
            <PaginateV2
                ref={ref}
                totalRecord={totalRecord}
                totalPages={totalPage}
                limit={50}
                hasNextPage={hasNextPage}
                isFetching={isLoading}
                nextPageAction={() => {
                  fetchNextPage();
                    setPageIndex(oldState => oldState+1)
                }}
                prevPageAction={() => {
                    setPageIndex(oldState => oldState-1)
                }}
            />
          </div>
        </div>
        <div className={"relative table border-collapse w-full"}>
          <div className={"header flex table-row"}>
            <div className={"px-2 py-4 table-cell box-border border-b border-t text-gray-500 border-gray-300"}>
              TK nợ
            </div>
            <div className={"px-2 py-4 table-cell box-border border-b border-t text-gray-500 border-gray-300"}>
              TK có
            </div>
            <div className={"px-2 py-4 table-cell box-border border-b border-t text-gray-500 border-gray-300"}>
              Mã khách nợ
            </div>
            <div className={"px-2 py-4 table-cell box-border border-b border-t text-gray-500 border-gray-300"}>
              Mã khách có
            </div>
            <div className={"px-2 py-4 table-cell box-border border-b border-t text-gray-500 border-gray-300"}>
              Sản phẩm/Hàng hóa
            </div>
            <div className={"px-2 py-4 table-cell box-border border-b border-t text-gray-500 border-gray-300"}>
              Kho bãi
            </div>
            <div className={"px-2 py-4 table-cell box-border border-b border-t text-gray-500 border-gray-300"}>
              Đơn vị
            </div>
            <div className={"px-2 py-4 table-cell box-border border-b border-t text-gray-500 border-gray-300"}>
              Số lượng
            </div>
            <div className={"px-2 py-4 table-cell box-border border-b border-t text-gray-500 border-gray-300"}>
              Đơn giá
            </div>
            <div className={"px-2 py-4 table-cell box-border border-b border-t text-gray-500 border-gray-300"}>
              Thành tiền
            </div>
            <div className={"px-2 py-4 table-cell box-border border-b border-t text-gray-500 border-gray-300"}>
              Hợp đồng/Khoản mục phí
            </div>
            <div className={"px-2 py-4 table-cell box-border border-b border-t text-gray-500 border-gray-300"}>
              Ngân sách
            </div>
            <div className={"px-2 py-4 table-cell box-border border-b border-t text-gray-500 border-gray-300"}>
              Ghi chú
            </div>
          </div>
          {
            (listDataWithPager[pageIndex] ?? []).map((item, index) => {
              return (
                  <div key={item._id} className={"flex table-row"}>
                  <div className={"px-2 py-4 table-cell text-left box-border border-b border-t border-gray-300"}>
                    {item?.debit?.name} - {item?.debit?.description}
                  </div>
                  <div className={"px-2 py-4 table-cell box-border border-b border-t border-gray-300"}>
                    {item?.credit?.name} - {item?.credit?.description}
                  </div>
                  <div className={"px-2 py-4 table-cell box-border border-b border-t border-gray-300"}>
                    {item?.customerDebit?.name}
                  </div>
                  <div className={"px-2 py-4 table-cell box-border border-b border-t border-gray-300"}>
                    {item?.customerCredit?.name}
                  </div>
                  <div className={"px-2 py-4 table-cell box-border border-b border-t border-gray-300"}>
                    {item?.goods?.name}
                  </div>
                  <div className={"px-2 py-4 table-cell box-border border-b border-t border-gray-300"}>
                    {item?.warehouse?.name}
                  </div>
                  <div className={"px-2 py-4 table-cell box-border border-b border-t border-gray-300"}>
                    {item?.goods?.unit}
                  </div>
                  <div className={"px-2 py-4 table-cell box-border border-b border-t border-gray-300 text-right"}>
                    {formatNumberMoney(item?.quantity)}
                  </div>
                  <div className={"px-2 py-4 table-cell box-border border-b border-t border-gray-300 text-right"}>
                    {formatNumberMoney(item?.unitprice)}
                  </div>
                  <div className={"px-2 py-4 table-cell box-border border-b border-t border-gray-300 text-right"}>
                    {formatNumberMoney(item?.amount)}
                  </div>
                  <div className={"px-2 py-4 table-cell box-border border-b border-t border-gray-300"}>
                    {item?.contract?.name}
                    <p className="text-primary"><i>{item.subtype?.name}</i></p>
                  </div>
                  <div className={"px-2 py-4 table-cell box-border border-b border-t border-gray-300"}>
                    {item?.budgetWork?.name}
                  </div>
                  <div className={"px-2 py-4 table-cell box-border border-b border-t border-gray-300"}>
                    {item?.note}
                  </div>
                </div>
                )
              })
          }

          <div className={"flex table-row"}>
            <div className={"px-2 py-4 table-cell box-border border-b border-t border-gray-300"}>

            </div>
            <div className={"px-2 py-4 table-cell box-border border-b border-t border-gray-300"}>

            </div>
            <div className={"px-2 py-4 table-cell box-border border-b border-t border-gray-300"}>

            </div>
            <div className={"px-2 py-4 table-cell box-border border-b border-t border-gray-300"}>

            </div>
            <div className={"px-2 py-4 table-cell box-border border-b border-t border-gray-300"}>

            </div>
            <div className={"px-2 py-4 table-cell box-border border-b border-t border-gray-300"}>

            </div>
            <div className={"px-2 py-4 table-cell box-border border-b border-t border-gray-300"}>

            </div>
            <div className={"px-2 py-4 table-cell box-border border-b border-t border-gray-300"}>

            </div>
            <div className={"px-2 py-4 table-cell box-border border-b border-t border-gray-300"}>

            </div>
            <div className={"px-2 py-4 table-cell box-border border-b border-t border-gray-300 font-bold text-right"}>
              {formatNumberMoney(voucherDetail?.amount)}
            </div>
            <div className={"px-2 py-4 table-cell box-border border-b border-t border-gray-300"}>

            </div>
            <div className={"px-2 py-4 table-cell box-border border-b border-t border-gray-300"}>

            </div>
            <div className={"px-2 py-4 table-cell box-border border-b border-t border-gray-300"}>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}