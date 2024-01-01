import { FC, useEffect, useState } from "react";
import Pen from "assets/images/icons8-pencil.svg";
import LogIcon from "assets/icons/Log";
import { useHistory, useParams } from "react-router-dom";
import { VOUCHER_TYPES, DATE_FORMAT_TIME } from "apis/localdb/index";
import { Paginate } from "shareComponents/common";
import { useJournalDetailList, useUpdateAccountingVoucherMutation } from "services/hooks/accounting/useAccountingVoucher";
import { formatNumberMoney, convertDisplayDate } from "utils/cmcs"
import { CreateNewTicket } from "views/accounting/shareComponents/common";
import { useModal } from "services/hooks/useModal";

import API from "apis/repository";
const APP_ACCOUNTING_VOUCHER = "/api/accounting/vouchers";

type Props = {
  type?: number
};

export const AccountingTicketDetailPage: FC<Props> = ({ type = 1 }) => {
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

  const nextPageAction = () => setPageParam(journalDetailList.nextCursor)

  const handleFinishForm = async (values: any) => {
    const res = await updateAccountingVoucherMutateAsync(values);

    if (res.error || res.code && res.code !== 200) {
      return false;
    }

    journalDetailList.refetch();
    fetchDetailAccountingVoucher(params.id);
    return true;
  };

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
            {/* <button type="button" className={"rounded-full h-10 w-10 flex items-center justify-center bg-gray-100"}>
              <ActionAccountingGroup
                icon={<DotsVerticalIcon />}
              />
            </button> */}
          </div>
          <div className={"infor-ticket flex mt-1 items-center"}>
            <p className={"flex-1"}><span className={"text-gray-500"}>Khởi tạo:</span>  {voucherDetail?.userCreate?.fullname} {convertDisplayDate(voucherDetail?.createAt, DATE_FORMAT_TIME)}</p>
            <button type="button" className={"mr-2"}>
              <LogIcon />
            </button>
            <p><span className={"text-gray-500"}>Cập nhật:</span> {voucherDetail?.userUpdate?.fullname} {convertDisplayDate(voucherDetail?.updatedAt, DATE_FORMAT_TIME)}</p>
          </div>
          {/* <div className={"extra-infor-ticket flex text-gray-500 items-center mt-2"}>
            <span className={"mr-1"}>
              <img alt={"icon-folder"} src={FolderIcon} />
            </span>
            Phân vùng: {voucherDetail?.company?.name} | Hợp đồng: {voucherDetail?.contract?.name} - {voucherDetail?.contract?.sign} - Ngày {convertDisplayDate(voucherDetail?.contract?.date)} | {voucherDetail?.ipc?.name}
          </div> */}
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
              Tồn kho
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

          {journalDetailList?.listJournalDetail?.map((item: any) => {
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
                  Cái
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
          })}

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
            <div className={"px-2 py-4 table-cell box-border border-b border-t border-gray-300 font-bold"}>
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

      <Paginate
        totalPages={journalDetailList.totalPage}
        totalRecord={journalDetailList.totalRecord} hasNextPage
        prevPageAction={() => prevPageAction()}
        nextPageAction={() => nextPageAction()} />
    </div>
  )
}