import React, { FC, useCallback, useState, useRef, ReactNode } from "react";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import moment from "moment";
import { useModal } from "services/hooks/useModal";
import { formatNumberMoney } from "utils/cmcs";
import PaginateV2 from "../../../../shareComponents/common/PaginateV2";
import { Popover } from "shareComponents/common";
import debounce from "lodash/debounce";
import { useDeleteConfirm } from "services/hooks/useDeleteConfirm";
import { SearchInput } from "shareComponents/common";
import { DropdownSearchableV2 } from "shareComponents/common";
import { useFunda } from "services/hooks/items/useFunda";
import { useContact } from "services/hooks/items/useContact";
import { useUserSystem } from 'services/hooks/users/useUserSystem';
import {
  CreateNewTicket,
  // ActionAccountingGroup,
  FilterDateGroup
} from "views/accounting/shareComponents/common";
import { useAuth } from "services/hooks/auth/useAuth";
import {
  useCreateAccountingVoucherMutation,
  useUpdateAccountingVoucherMutation,
  useDeleteAccountingVoucherMutation,
} from "services/hooks/accounting/useAccountingVoucher";
import { DATE_FORMAT, VOUCHER_TYPES } from "apis/localdb/index";
import {
  useVoucherList
} from "services/hooks/accounting/useAccVoucher";
import { useCheckPerAccessOneMenu } from "services/hooks/auth/usePermissions";
import { APP_ID } from "apis/localdb";
import 'moment/locale/vi'; // Import file ngôn ngữ tiếng Việt
// import ThreeDotsHorizontal from "assets/images/three-dots-horizontal.svg";
// import Printer from "assets/images/icons8-print-96.png";
import Copy from "assets/images/icons8-copy-96.png";
import Pen from "assets/images/icons8-pencil.svg";
import iconUpload from "assets/images/icons8-upload-file-100 1.png";
import { useUpload } from 'services/hooks/useUpload';
import { APP_KEY } from 'utils/constants';
import { toast } from "react-toastify";
import { validateFiles } from 'validation/file';

moment.locale('vi'); // Kích hoạt sử dụng tiếng Việt

type Props = {
  data?: any;
  handleAction?: (data: any, action: number) => void; // 1. In, 2. Copy 3. Cập nhật 4. Xóa
  icon?: ReactNode;
}

interface AccountingTicketsPageProps {
  type?: number
}

export const AccountingTicketsPage: FC<AccountingTicketsPageProps> = ({ type = 1 }) => {
  const { user } = useAuth();
  const { hasPermission, permission } = useCheckPerAccessOneMenu({ appID: APP_ID.ACCOUNTING.id, menuID: APP_ID.ACCOUNTING.menuAccountingApp.accbill.id, companyID: user?.company._id, type: "1", });

  const { openModal } = useModal();
  const [pageIndex, setPageIndex] = useState(0)

  const history = useHistory();
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const fundaIDParams = searchParams.get("fundaID")

  type PaginateHandle = React.ElementRef<typeof PaginateV2>;
  type DropdownHandle = React.ElementRef<typeof DropdownSearchableV2>;
  const ref = React.useRef<PaginateHandle>(null);
  const accountRef = React.useRef<DropdownHandle>(null);

  const [fundaID, setFundaID] = useState<string | null>(fundaIDParams);
  const [customerID, setCustomerID] = useState<string | null>();
  const [userID, setUserID] = useState<string | null>();

  const [inputFilter, setInputFilter] = useState({
    keyword: '',
    fromDate: null,
    toDate: null,
  });

  const [fundaKeyword, setFundaKeyword] = useState("");
  const [contactKeyword, setContactKeyword] = useState("");
  const [userKeyword, setUserKeyword] = useState("");

  const { list: listFunda } = useFunda({
		params: { keyword: fundaKeyword },
    isFetchList: true
	})

  const { list: listCustomer } = useContact({
		params: { keyword: contactKeyword },
    isFetchList: true
	})

  const { data: listUser } = useUserSystem({
    keyword: userKeyword,
    limit: 5,
    isFetch: true
	}, true)

  const { listDataWithPager, isLoading, totalRecord, totalPage, fetchNextPage, hasNextPage, refetch } = useVoucherList({
    params: {
        type,
        fundaID,
        customerID,
        userCreateID: userID,
        keyword: inputFilter.keyword,
        fromDate: inputFilter.fromDate,
        toDate: inputFilter.toDate,
        limit: 20,
    },
    isFetchList: true
  })
  // console.log(listDataWithPager)

  const { createAccountingVoucherMutateAsync } = useCreateAccountingVoucherMutation();
  const { updateAccountingVoucherMutateAsync } = useUpdateAccountingVoucherMutation();
  const { deleteAccountingVoucherMutateAsync } = useDeleteAccountingVoucherMutation();

  const handleFinishForm = useCallback(async (values, isEdit = false) => {
    let res: any
    if (isEdit) {
      res = await updateAccountingVoucherMutateAsync(values);
    } else {
      res = await createAccountingVoucherMutateAsync({ ...values });
    }

    if (res.code && res.code !== 200) {
      return false;
    }

    if (!res.error) {
      refetch()
      return true;
    }
    return false;
  }, [listDataWithPager]);

  const { openDeleteConfirm } = useDeleteConfirm();

  const handleAction = async (data: any, action: any) => {
    switch (action) { // 1. In, 2. Copy 3. Cập nhật 4. Xóa
      case 1:
        break;
      case 2:
        if(hasPermission && permission && Number(permission?.create) >= 1){
          openModal(
            <div className={"bg-white inline-block w-screen h-screen overflow-hidden transition-all transform bg-primary-light shadow-xl rounded absolute left-0 right-0 top-0"}>
              <CreateNewTicket
                onFinish={handleFinishForm}
                type={type}
                isEdit={false}
                idEdit={data._id}
                contractId={data?.contract?._id}
                title="Copy phiếu"
              />
            </div>
          )
        }
        break;
      case 3:
        if(hasPermission && permission && Number(permission?.update) >= 1){
          openModal(
            <div className={"bg-white inline-block w-screen h-screen overflow-hidden transition-all transform bg-primary-light shadow-xl rounded absolute left-0 right-0 top-0"}>
              <CreateNewTicket
                onFinish={handleFinishForm}
                type={type}
                isEdit={true}
                idEdit={data._id}
                contractId={data?.contract?._id}
                title="Cập nhật"
              />
            </div>
          )
        }
        break;
      case 4:
        openDeleteConfirm({
          deleteAction: async () => {
            const res = await deleteAccountingVoucherMutateAsync(data._id)
            if (!res.error) {
              refetch()
            }
          },
        });
        break;

      default:
        break;
    }
  }

  const onChangeSearch = debounce((event: React.ChangeEvent<HTMLInputElement>) => {
    setInputFilter((value) => ({ ...value, keyword: event.target.value }))
  }, 500);

  const handleOnChangeDate = useCallback((date, input) => {
    if (input) {
      setInputFilter((value) => ({ ...value, toDate: date }))
    } else {
      setInputFilter((value) => ({ ...value, fromDate: date }))
    }
  }, [])

  const getStatusColor = (deadline: any, isPaid: any ) => {
      if (!deadline) return "text-green-600";
      const now = moment();
      const end = moment(deadline);
      const diffDays = end.diff(now, 'days');

      if (diffDays < 0 && isPaid == 0) return "text-red-600"; // Quá hạn
      if (diffDays <= 3 && isPaid == 0) return "text-cbs-schedule-nextweek"
      return "text-green-600";                          // Còn hạn
  }

  // Upload file  
  const { addFileToUpload } = useUpload({
    appID: APP_KEY.ACCOUNTING,
    companyID: user?.company._id,
  })

  const handleSetFiles = async (event: React.ChangeEvent<HTMLInputElement>, voucherID: string) => {
    try {
      // Đọc file từ Client
      if (!event.target.files || !event.target.files.length) return;

      const validation = await validateFiles(event.target.files);
      if(validation.error) return toast.warn(validation.message);

      const arrFileID: any = []

      // Upload files to S3 và lưu DB file-core
      for (const [, file] of Object.entries(event.target.files)) {
        const { _id } = await addFileToUpload({
          files: file as any,
          fileType: 2,
          useCompress: true
        })
        arrFileID.push(_id)
      }

      const { error, data } = await updateAccountingVoucherMutateAsync({
        voucherID: voucherID,
        filesID: arrFileID,
      });

      if (error) {
        return toast.warning(data?.message);
      }

      toast.success('Thêm file thành công');
      refetch();
    } catch (error) {
      console.log({ error })
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  }

  return (
    <main className="h-full">
      <header className="h-[50px] w-full border border-primary-border flex items-center px-3">
        <SearchInput classNameWrapper={"mr-1"} onChange={onChangeSearch} />
        <DropdownSearchableV2
            ref={accountRef}
            className={"mr-1 border border-primary-border rounded-lg"}
            placeholder={"Đơn vị cơ sở"}
            isMultiple={false}
            allowClearValueSingleInput={true}
            data={listFunda}
            formatItem={{
                id: "_id",
                text: "name",
            }}
            onSearchInputChange={debounce(
                (valueSearch) => setFundaKeyword(valueSearch),
                500
            )}
            onClearData={() => {
              if (searchParams.has('fundaID')) {
                searchParams.delete('fundaID');

                history.replace({
                  search: searchParams.toString(),
                })
              }
              setFundaID("");
            }}
            onchangeValue={item => {
                history.push({ search: `?fundaID=${item._id}` })
                setFundaID(item._id);
                setPageIndex(0);
                ref.current && ref.current.resetPaginate();
            }}
            renderItem={(item) => (
                <p className={"min-w-[300px]"}>{item.text}</p>
            )}
            selectOneByOne={true}
        />
        <DropdownSearchableV2
            ref={accountRef}
            className={"mr-1 border border-primary-border rounded-lg"}
            placeholder={"Mã khách"}
            isMultiple={false}
            allowClearValueSingleInput={true}
            data={listCustomer}
            formatItem={{
                id: "_id",
                text: "name",
            }}
            onSearchInputChange={debounce(
                (valueSearch) => setContactKeyword(valueSearch),
                500
            )}
            onClearData={() => {
              setCustomerID("");
            }}
            onchangeValue={item => {
                setCustomerID(item._id);
                setPageIndex(0);
                ref.current&&ref.current.resetPaginate();
            }}
            renderItem={(item) => (
                <p className={"min-w-[300px]"}>{item.text}</p>
            )}
            selectOneByOne={true}
        />
        <DropdownSearchableV2
            ref={accountRef}
            className={"mr-1 border border-primary-border rounded-lg"}
            placeholder={"Người tạo phiếu"}
            isMultiple={false}
            allowClearValueSingleInput={true}
            data={listUser}
            formatItem={{
                id: "_id",
                text: "fullname",
            }}
            onSearchInputChange={debounce(
                (valueSearch) => setUserKeyword(valueSearch),
                500
            )}
            onClearData={() => {
              setUserID("");
            }}
            onchangeValue={item => {
                setUserID(item._id);
                setPageIndex(0);
                ref.current&&ref.current.resetPaginate();
            }}
            renderItem={(item) => (
                <p className={"min-w-[300px]"}>{item.text}</p>
            )}
            selectOneByOne={true}
        />
        <div className="flex items-center">
          <FilterDateGroup fromDate={inputFilter.fromDate} endDate={inputFilter.toDate} onChangeDate={handleOnChangeDate} />
          {
          (hasPermission && permission && Number(permission?.create) >= 1) ? 
            <button
              onClick={() =>
                openModal(
                  <div className={"bg-white inline-block w-screen h-screen overflow-hidden transition-all transform bg-primary-light shadow-xl rounded absolute left-0 right-0 top-0"}>
                    <CreateNewTicket onFinish={handleFinishForm} type={type} title="Phiếu mới" />
                  </div>
                )
              }
              className={"bg-green-success h-[32px] text-white rounded px-3"}>
              Tạo mới
            </button>
            :
            <></>
          }
          
          <div className="absolute right-0">
            <PaginateV2
                ref={ref}
                totalRecord={totalRecord}
                totalPages={totalPage}
                limit={20}
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
      </header>

      <section className="mt-4">
      <table className="text-black text-medium border-separate space-x-0 space-y-0 w-full" style={{ borderSpacing: 0 }}>
        <thead className="">
          <tr className="text-primary-gray whitespace-nowrap align-middle text-left relative z-1">
            <th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border">
              <span className="pl-2 border-l border-cbs-border">
                Ngày
              </span>
            </th>
            <th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border">
              <span className="pl-2 border-l border-cbs-border">
                Nội dung
              </span>
            </th>
            <th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border">
              <span className="pl-2 border-l border-cbs-border">
                Mã khách
              </span>
            </th>
            <th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border">
              <span className="pl-2 border-l border-cbs-border">
                Người giới thiệu/Sales/CSKH
              </span>
            </th>
            <th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border">
              <span className="pl-2 border-l border-cbs-border">
                Hợp đồng/Khoản mục phí
              </span>
            </th>
            <th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border">
              <span className="pl-2 border-l border-cbs-border">
                Giá trị/Thành tiền
              </span>
            </th>
            <th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border">
              <span className="pl-2 border-l border-cbs-border">
                Ghi chú
              </span>
            </th>
            <th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border w-min px-2">
            </th>
          </tr>
        </thead>
        <tbody className="text-small">
          {
            (listDataWithPager[pageIndex] ?? []).map((item, index) => {
              if(item?.cancel == 0){
                if(item?.forward == 1){
                  return (
                    <tr key={item._id} className="text-left hover:bg-cbs-active-comment" style={{ color: "orange" }}>
                      <td className="pt-2.5 pb-3 px-2 border-b border-cbs-border">
                        {moment(item.date).isValid() && moment(item.date).format(DATE_FORMAT)}
                        <p>{item.sign}</p>
                        <p className="text-cbs-highlight-color mt-3" title="Số hóa đơn"><b>{item?.signInvoice}</b></p>
                        <p className="text-gray-500 text-[12px]">{moment(item.dateInvoice).isValid() && moment(item.dateInvoice).format(DATE_FORMAT)}</p>
                        <p>Kết chuyển cuối kỳ</p>
                      </td>
                      <td className="pt-2.5 pb-3 px-2 border-b border-cbs-border text-medium">
                        <NavLink to={`/accounting/${VOUCHER_TYPES.find(item => item.value === type)?.slug}/detail/${item._id}`}>
                          <Popover onMouseEnterTooltip={false} tooltip={`${item.name}`} classTooltip="w-[336px] whitespace-normal left-0" >
                            <p className="text-2-line-clamp">{`${item.name}`}</p>
                          </Popover>
                        </NavLink>
                        {item?.files?.map((file: any, fileIndex: number) => (
                           <p key={fileIndex} className="mt-1 text-gray-500 text-[12px]">
                              <a className="text-primary mt-3" href={`${process.env.REACT_APP_URL_S3}${file?.path}`} target="_blank" rel="noreferrer"> {file?.nameOrg || "-"} </a>
                          </p>
                        ))}
                        <p className={"mt-1 text-gray-500 text-gray-500 text-[12px]"}>{item?.linkFunda?.name}</p>
                        {/* <p className={"mt-1 text-gray-500 text-gray-500 text-[12px]"}>{item?.linkVoucher?.name}</p> */}
                      </td>
                      <td className="pt-2.5 pb-3 px-2 border-b border-cbs-border">
                        {item.customer?.name} - {item.customer?.phone} - {item.customer?.taxid}
                        <hr className="text-gray-500 mt-3"/>
                        <p className={"mt-1 text-gray-500 text-gray-500 text-[12px]"}>Cơ sở: {item?.funda?.name}</p>
                      </td>
                      <td className="pt-2.5 pb-3 px-2 border-b border-cbs-border">
                        <p className="">GT: {item.referrer?.name}</p>
                        <p className="">Sales: {item.sales?.name}</p>
                      </td>
                      <td className="pt-2.5 pb-3 px-2 border-b border-cbs-border">
                        <p className="">Khoản mục: {item.subtype?.name}</p>
                        {/* <p className="">Hợp đồng: {item.contract?.name}</p> */}
                      </td>
                      <td className="pt-2.5 pb-3 px-2 border-b border-cbs-border text-right text-cbs-highlight-color font-bold">{formatNumberMoney(item.amount)}</td>
                      <td className="pt-2.5 pb-3 px-2 border-b border-cbs-border">
                        {item.note}
                        <p className={"mt-1 text-gray-500 text-gray-500 text-[12px]"}>
                          {item?.userCreate?.fullname.split(' ').pop()} {moment(item.createAt).isValid() && moment(item.createAt).format('DD/MM/YY HH:mm')}
                        </p>
                         <p className={"mt-1 text-gray-500 text-gray-500 text-[12px]"}>
                          {item?.userUpdate?.fullname.split(' ').pop()} {moment(item.modifyAt).isValid() && moment(item.modifyAt).format('DD/MM/YY HH:mm')}
                        </p>
                        {item?.isDocumented == 1 ? <p className="mt-1" style={{ color: 'green'}}>Có chứng từ</p> : <p className="mt-1" style={{ color: 'red'}}>Không chứng từ</p>}
                      </td>
                      <td className="pt-2.5 pb-3 pr-2 border-b border-cbs-border" style={{width: "50px"}}>
                        {/* <ActionAccountingGroup data={item} handleAction={handleAction} /> */}
                          {
                          (hasPermission && permission && Number(permission?.create) >= 1) ? 
                              <button onClick={() => {handleAction && handleAction(item, 2) }} className={"flex p-1 hover:bg-gray-100"}>
                                <div className={""}>
                                  <img alt={"Icon"} src={Copy} style={{width: "20px"}}/>
                                </div>
                              </button>
                              :
                              <></>
                          }
                          {
                            (hasPermission && permission && Number(permission?.update) >= 1) ? 
                              <button onClick={() => { handleAction && handleAction(item, 3) }} className={"flex p-1 hover:bg-gray-100"}>
                                <div className={""}>
                                  <img alt={"Icon"} src={Pen} style={{width: "20px"}} />
                                </div>
                              </button>
                              :
                              <></>
                          }
                          {
                            (hasPermission && permission && Number(permission?.update) >= 1) ? 
                              <button className="flex p-1 hover:bg-gray-100">
                                <label className="cursor-pointer" style={{width: "20px"}}>
                                  <img src={iconUpload} alt=""/>
                                  <input
                                    type="file"
                                    name="files"
                                    id="file"
                                    className="hidden"
                                    accept="*"
                                    multiple
                                    onChange={(e) => handleSetFiles(e, item._id)}
                                  />
                                </label>
                              </button>
                              :
                              <></>
                          }
                      </td>
                    </tr>
                  )
                }else{
                  return (
                    <tr key={item._id} className="text-left hover:bg-cbs-active-comment">
                      <td className="pt-2.5 pb-3 px-2 border-b border-cbs-border">
                        {moment(item.date).isValid() && moment(item.date).format(DATE_FORMAT)}
                        <p>{item.sign}</p>
                        <p className="text-cbs-highlight-color mt-3" title="Số hóa đơn"><b>{item?.signInvoice}</b></p>
                        <p className="text-gray-500 text-[12px]">{moment(item.dateInvoice).isValid() && moment(item.dateInvoice).format(DATE_FORMAT)}</p>
                      </td>
                      <td className="pt-2.5 pb-3 px-2 border-b border-cbs-border text-medium">
                        <NavLink to={`/accounting/${VOUCHER_TYPES.find(item => item.value === type)?.slug}/detail/${item._id}`}>
                          <Popover onMouseEnterTooltip={false} tooltip={`${item.name}`} classTooltip="w-[336px] whitespace-normal left-0" >
                            <p className="text-2-line-clamp text-cbs-highlight-color font-bold">{`${item.name}`}</p>
                          </Popover>
                        </NavLink>
                        {item?.files?.map((file: any, fileIndex: number) => (
                           <p key={fileIndex} className="mt-1 text-gray-500 text-[12px]">
                              <a className="text-primary mt-3" href={`${process.env.REACT_APP_URL_S3}${file?.path}`} target="_blank" rel="noreferrer"> {file?.nameOrg || "-"} </a>
                          </p>
                        ))}
                        <p className={"mt-1 text-gray-500 text-gray-500 text-[12px]"}>{item?.linkFunda?.name}</p>
                        {/* <p className={"mt-1 text-gray-500 text-gray-500 text-[12px]"}>{item?.linkVoucher?.name}</p> */}
                      </td>
                      <td className="pt-2.5 pb-3 px-2 border-b border-cbs-border">
                        {item.customer?.name} - {item.customer?.phone} - {item.customer?.taxid}
                        <hr className="text-gray-500 mt-3"/>
                        <p className={"mt-1 text-gray-500 text-gray-500 text-[12px]"}>Cơ sở: {item?.funda?.name}</p>
                      </td>
                      <td className="pt-2.5 pb-3 px-2 border-b border-cbs-border">
                        <p className="">Sales/CSKH: {item.sales?.name}</p>
                        <p className="">Giới thiệu: {item.referrer?.name}</p>
                      </td>
                      <td className="pt-2.5 pb-3 px-2 border-b border-cbs-border">
                        <p className="">Khoản mục: {item.subtype?.name}</p>
                        <p className="">
                          Hạn TT: <span className={`${getStatusColor(item.paymentDeadline, item.isPaid)}`}>
                            {moment(item.paymentDeadline).isValid() && `${moment(item.paymentDeadline).format('DD/MM/YYYY')} - ${moment(item.paymentDeadline).fromNow()}`}
                          </span>
                        </p>
                        {(item?.isPaid == 0 && item?.paymentDeadline) ? <p className="mt-1" style={{ color: 'red'}}>Chưa thanh toán</p> : <p className="mt-1" style={{ color: 'green'}}>Đã thanh toán</p>}
                        {/* <p className="">Hợp đồng: {item.contract?.name}</p> */}
                      </td>
                      <td className="pt-2.5 pb-3 px-2 border-b border-cbs-border text-right text-cbs-highlight-color font-bold">{formatNumberMoney(item.amount)}</td>
                      <td className="pt-2.5 pb-3 px-2 border-b border-cbs-border">
                        {item.note}
                        <p className={"mt-1 text-gray-500 text-gray-500 text-[12px]"}>
                          {item?.userCreate?.fullname.split(' ').pop()} {moment(item.createAt).isValid() && moment(item.createAt).format('DD/MM/YY HH:mm')}
                        </p>
                         <p className={"mt-1 text-gray-500 text-gray-500 text-[12px]"}>
                          {item?.userUpdate?.fullname.split(' ').pop()} {moment(item.modifyAt).isValid() && moment(item.modifyAt).format('DD/MM/YY HH:mm')}
                        </p>
                        {item?.isDocumented == 1 ? <p className="mt-1" style={{ color: 'green'}}>Có chứng từ</p> : <p className="mt-1" style={{ color: 'red'}}>Không chứng từ</p>}
                      </td>
                      <td className="pt-2.5 pb-3 pr-2 border-b border-cbs-border" style={{width: "50px"}}>
                        {/* <ActionAccountingGroup data={item} handleAction={handleAction} /> */}
                          {
                          (hasPermission && permission && Number(permission?.create) >= 1) ? 
                              <button onClick={() => {handleAction && handleAction(item, 2) }} className={"flex p-1 hover:bg-gray-100"}>
                                <div className={""}>
                                  <img alt={"Icon"} src={Copy} style={{width: "20px"}}/>
                                </div>
                              </button>
                              :
                              <></>
                          }
                          {
                            (hasPermission && permission && Number(permission?.update) >= 1) ? 
                              <button onClick={() => { handleAction && handleAction(item, 3) }} className={"flex p-1 hover:bg-gray-100"}>
                                <div className={""}>
                                  <img alt={"Icon"} src={Pen} style={{width: "20px"}} />
                                </div>
                              </button>
                              :
                              <></>
                          }
                          {
                            (hasPermission && permission && Number(permission?.update) >= 1) ? 
                              <button className="flex p-1 hover:bg-gray-100">
                                <label className="cursor-pointer" style={{width: "20px"}}>
                                  <img src={iconUpload} alt=""/>
                                  <input
                                    type="file"
                                    name="files"
                                    id="file"
                                    className="hidden"
                                    accept="*"
                                    multiple
                                    onChange={(e) => handleSetFiles(e, item._id)}
                                  />
                                </label>
                              </button>
                              :
                              <></>
                          }
                      </td>
                    </tr>
                  )
                }
              }else{
                return (
                  <tr key={item._id} className="text-left hover:bg-cbs-active-comment" style={{ color: "red" }}>
                    <td className="pt-2.5 pb-3 px-2 border-b border-cbs-border">
                      {moment(item.date).isValid() && moment(item.date).format(DATE_FORMAT)}
                        <p>{item.sign}</p>
                        <p className="text-cbs-highlight-color mt-3" title="Số hóa đơn"><b>{item?.signInvoice}</b></p>
                        <p className="text-gray-500 text-[12px]">{moment(item.dateInvoice).isValid() && moment(item.dateInvoice).format(DATE_FORMAT)}</p>
                        <p>Phiếu hủy</p>
                    </td>
                    <td className="pt-2.5 pb-3 px-2 border-b border-cbs-border text-medium">
                      <NavLink to={`/accounting/${VOUCHER_TYPES.find(item => item.value === type)?.slug}/detail/${item._id}`}>
                        <Popover onMouseEnterTooltip={false} tooltip={`${item.name}`} classTooltip="w-[336px] whitespace-normal left-0" >
                          <p className="text-2-line-clamp">{`${item.name}`}</p>
                        </Popover>
                      </NavLink>
                        {item?.files?.map((file: any, fileIndex: number) => (
                           <p key={fileIndex} className="mt-1 text-gray-500 text-[12px]">
                              <a className="text-primary mt-3" href={`${process.env.REACT_APP_URL_S3}${file?.path}`} target="_blank" rel="noreferrer"> {file?.nameOrg || "-"} </a>
                          </p>
                        ))}
                      <p className={"mt-1 text-gray-500 text-gray-500 text-[12px]"}>{item?.linkFunda?.name}</p>
                        {/* <p className={"mt-1 text-gray-500 text-gray-500 text-[12px]"}>{item?.linkVoucher?.name}</p> */}
                    </td>
                    <td className="pt-2.5 pb-3 px-2 border-b border-cbs-border">
                      {item.customer?.name} - {item.customer?.phone} - {item.customer?.taxid}
                      <hr className="text-gray-500 mt-3"/>
                      <p className={"mt-1 text-gray-500 text-gray-500 text-[12px]"}>Cơ sở: {item?.funda?.name}</p>
                    </td>
                    <td className="pt-2.5 pb-3 px-2 border-b border-cbs-border">
                      <p className="">Sales/CSKH: {item.sales?.name}</p>
                      <p className="">Giới thiệu: {item.referrer?.name}</p>
                    </td>
                    <td className="pt-2.5 pb-3 px-2 border-b border-cbs-border">
                        <p className="">Khoản mục: {item.subtype?.name}</p>
                        <p className="">
                          Hạn TT: <span className={`${getStatusColor(item.paymentDeadline, item.isPaid)}`}>
                            {moment(item.paymentDeadline).isValid() && `${moment(item.paymentDeadline).format('DD/MM/YYYY')} - ${moment(item.paymentDeadline).fromNow()}`}
                          </span>
                        </p>
                        {(item?.isPaid == 0 && item?.paymentDeadline) ? <p className="mt-1" style={{ color: 'red'}}>Chưa thanh toán</p> : <p className="mt-1" style={{ color: 'green'}}>Đã thanh toán</p>}
                        {/* <p className="">Hợp đồng: {item.contract?.name}</p> */}
                    </td>
                    <td className="pt-2.5 pb-3 px-2 border-b border-cbs-border text-right text-cbs-highlight-color font-bold">{formatNumberMoney(item.amount)}</td>
                      <td className="pt-2.5 pb-3 px-2 border-b border-cbs-border">
                        {item.note}
                        <p className={"mt-1 text-gray-500 text-gray-500 text-[12px]"}>
                          {item?.userCreate?.fullname.split(' ').pop()} {moment(item.createAt).isValid() && moment(item.createAt).format('DD/MM/YY HH:mm')}
                        </p>
                         <p className={"mt-1 text-gray-500 text-gray-500 text-[12px]"}>
                          {item?.userUpdate?.fullname.split(' ').pop()} {moment(item.modifyAt).isValid() && moment(item.modifyAt).format('DD/MM/YY HH:mm')}
                        </p>
                        {item?.isDocumented == 1 ? <p className="mt-1" style={{ color: 'green'}}>Có chứng từ</p> : <p className="mt-1" style={{ color: 'red'}}>Không chứng từ</p>}
                      </td>
                    <td className="pt-2.5 pb-3 pr-2 border-b border-cbs-border" style={{width: "50px"}}>
                      {/* <ActionAccountingGroup data={item} handleAction={handleAction} /> */}
                          {
                          (hasPermission && permission && Number(permission?.create) >= 1) ? 
                              <button onClick={() => {handleAction && handleAction(item, 2) }} className={"flex p-1 hover:bg-gray-100"}>
                                <div className={""}>
                                  <img alt={"Icon"} src={Copy} style={{width: "20px"}}/>
                                </div>
                              </button>
                              :
                              <></>
                          }
                          {
                            (hasPermission && permission && Number(permission?.update) >= 1) ? 
                              <button onClick={() => { handleAction && handleAction(item, 3) }} className={"flex p-1 hover:bg-gray-100"}>
                                <div className={""}>
                                  <img alt={"Icon"} src={Pen} style={{width: "20px"}} />
                                </div>
                              </button>
                              :
                              <></>
                          }
                          {
                            (hasPermission && permission && Number(permission?.update) >= 1) ? 
                              <button className="flex p-1 hover:bg-gray-100">
                                <label className="cursor-pointer" style={{width: "20px"}}>
                                  <img src={iconUpload} alt=""/>
                                  <input
                                    type="file"
                                    name="files"
                                    id="file"
                                    className="hidden"
                                    accept="*"
                                    multiple
                                    onChange={(e) => handleSetFiles(e, item._id)}
                                  />
                                </label>
                              </button>
                              :
                              <></>
                          }
                    </td>
                  </tr>
                )
              }
            })
          }
        </tbody>
      </table>
      </section>
    </main>
  )
}