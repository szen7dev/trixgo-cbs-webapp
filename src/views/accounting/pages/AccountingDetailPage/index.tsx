import { FC, useCallback, useState, useEffect } from "react";
import { NavLink, useHistory, useParams } from "react-router-dom"
import cn from "classnames";
import styles from 'views/accounting/styles/styles.module.css';
import DotsVerticalIcon from "assets/icons/DotsVertical";
import Close from "assets/icons/Close";
import moment from "moment";
import { DATE_FORMAT, DATE_FORMAT_TIME, VOUCHER_TYPES } from "apis/localdb/index";
import { formatNumberMoney } from "utils/cmcs"
import {
  useJournallList
} from "services/hooks/accounting/useGeneralJournal";
import API from "apis/repository";

const ITEM_ACCOUNT = "/api/item/accounts";

export const AccountingDetailPage: FC = () => {
  const [showOption, setShowOption] = useState(false)
  const [fromToDate, setFromToDate] = useState({ fromDate: "", toDate: "" })
  const [pageIndex, setPageIndex] = useState(0)

  const params: any = useParams();

  const [infoAccount, setInfoAccount] = useState({} as any);

  useEffect(() => {
    const fetchDetailAccount = async (accountID: any) => {
      const { data } = await API.get(
        `${ITEM_ACCOUNT}?accountID=${accountID}`, {
        params: {
          // populates: {
          //   "path": "customer contract ipc subtype userCreate userUpdate company",
          //   "select": "name description bizfullname",
          // }
        }
      }
      )
      setInfoAccount(data?.data || {})
      return data
    }
    params.accountID && fetchDetailAccount(params.accountID)
  }, [params.accountID]);

  const { listDataWithPager, isLoading, totalRecord, totalPage, fetchNextPage, hasNextPage, refetch, isFetching } = useJournallList({
    params: {
        ...fromToDate,
        limit: 20,
        accountID: params?.accountID,
        // types,
        // directions,
        // contractsID,
        // keyword: keywordInput
    },
    isFetchList: true
})
// console.log(listDataWithPager)
// console.log({infoAccount})

  return (
    <main className="h-full">
      <header className="h-[50px] w-full border border-primary-border flex items-center justify-between px-2">
        <p className="text-lg">111-Tiền mặt</p>

        <div className="flex items-center">
          {/* <p className="text-primary mr-3">From 1/1/2021 - To 31/12/202</p> */}

          {/* <DropdownSearchable
            placeholder="Tìm kiếm"
            className="w-[322px] px-2 bg-cbs-table-header"
            classNameInput="h-[30px] bg-cbs-table-header"
            isMultiple={false}
            allowClearValueSingleInput={false}
            showTriangle={true}
            maxWidthInput="max-w-none"
            renderSelectedItem={(item) => <span>{item.text}</span>}
            classNameItem="p-0"
            data={[
              {
                _id: 1,
                content: "111-Tiền mặt",
              },
              {
                _id: 2,
                content: "222-Tiền mặt",
              },
              {
                _id: 3,
                content: "333-Tiền mặt",
              },
            ]}
            formatItem={{
              id: "_id",
              text: "content",
            }}
            inlineSearch={true}
          /> */}
          <div className={"relative z-5 inline-block"}>
            <button onClick={() => setShowOption(!showOption)} 
              className={"rounded-full flex items-center justify-center w-[40px] h-[40px] max-w-[40px] max-h-[40px] min-w-[40px] min-h-[40px] hover:bg-cbs-form-input-bg"}
              >
                <DotsVerticalIcon/>
            </button>
            {
                showOption &&
                <div className={"absolute right-0 z-20 bg-white w-[335px] shadow-lg rounded-md text-primary-gray"}>
                    <div className={"flex items-center mx-4 py-2 border-b-0.5 border-primary-border"}>
                        <div className={"flex-1"}>Chức năng khác</div>
                        <button onClick={() => setShowOption(false)}>
                            <Close/>
                        </button>
                    </div>

                    <div className={"mb-4"}>
                        <button className={"px-4 py-2 w-full text-left hover:bg-cbs-table-header"}>
                            Tải excel
                        </button>
                    </div>
                </div>
            }
          </div>
          
        </div>
      </header>

      <table className="table-fixed border-collapse w-full overflow-auto border-l border-r border-primary-border">
        <thead className="bg-cbs-table-header h-10 border-b border-primary-border">
          <tr className="text-left text-sm text-primary-gray">
            {/* <th
              className="py-1 px-2 font-normal border-r border-primary-border w-3"
            >
              TT
            </th> */}
            <th
              className={cn(
                "py-1 px-2 font-normal border-r border-primary-border",
                styles.theadDate
              )}
            >
              Ngày
            </th>
            <th
              className={cn(
                "py-1 px-2 font-normal border-r border-primary-border",
                styles.theadCode
              )}
            >
              Tên phiếu
            </th>
            <th
              className={cn(
                "py-1 px-2 font-normal border-r border-primary-border",
                styles.theadContent
              )}
            >
              Nội dung
            </th>
            <th
              className={cn(
                "py-1 px-2 font-normal border-r border-primary-border",
                styles.theadCode
              )}
            >
              Số hiệu
            </th>
            <th
              className={cn(
                "py-1 px-2 font-normal border-r border-primary-border",
                styles.theadCusCode
              )}
            >
              Mã khách
            </th>
            <th className="w-1/12 py-1 px-2 font-normal border-r border-primary-border">
              Tài khoản đối ứng
            </th>
            <th
              className={cn(
                "py-1 px-2 font-normal border-r border-primary-border",
                styles.theadCode
              )}
            >
              Phát sinh nợ
            </th>
            <th
              className={cn(
                "py-1 px-2 font-normal border-r border-primary-border",
                styles.theadCode
              )}
            >
              Phát sinh có
            </th>
            <th
              className={cn(
                "py-1 px-2 font-normal border-r border-primary-border",
                styles.theadCode
              )}
            >
              Dư Nợ-Có
            </th>
            <th className="w-1/12 py-1 px-2 font-normal border-r border-primary-border">
              Hợp đồng/Ngân sách
            </th>
            <th className="w-1/12 py-1 px-2 font-normal">Ghi chú</th>
          </tr>
        </thead>

        <tbody className="bg-primary-light">
          <tr
            className={cn(
              "border-b border-primary-border h-10",
              styles.bgBlueLight
            )}
          >
            {/* <td className="py-1 px-2 border-r border-primary-border w-3">{""}</td> */}
            <td className="py-1 px-2 border-r border-primary-border">{""}</td>
            <td className="py-1 px-2 border-r border-primary-border">{""}</td>
            <td className="py-1 px-2 font-bold border-r border-primary-border">
              Đầu kỳ
            </td>
            <td className="py-1 px-2 border-r border-primary-border">{""}</td>
            <td className="py-1 px-2 border-r border-primary-border">{""}</td>
            <td className="py-1 px-2 border-r border-primary-border">{""}</td>
            <td className="py-1 px-2 border-r border-primary-border">{""}</td>
            <td className="py-1 px-2 border-r border-primary-border">{""}</td>
            <td className="py-1 px-2 font-bold border-r border-primary-border text-right">
              0
            </td>
            <td className="py-1 px-2 border-r border-primary-border">{""}</td>
            <td className="py-1 px-2 border-r border-primary-border">{""}</td>
          </tr>

          {
            (listDataWithPager[pageIndex] ?? []).map((item, index) => {
              // console.log(item?.debit)
              // console.log(infoAccount?.nestedChilds)
              // console.log('==================')

              if(item?.debit && infoAccount?.nestedChilds?.includes(item?.debit?._id)){
                return (
                  <tr key={index} className="border-b border-primary-border h-10">
                    <td className="py-1 px-2 border-r border-primary-border">
                      {moment(item?.voucher?.date).format('DD/MM/YYYY')}
                    </td>
                    <td className="py-1 px-2 border-r border-primary-border">
                      {(item?.voucher?.type && item?.voucher?.type >= 1) ? VOUCHER_TYPES[Number(item?.voucher?.type - 1)].text : ''}
                    </td>
                    <td className="py-1 px-2 text-primary border-r border-primary-border">
                      <NavLink to={`/accounting/${ (item?.voucher?.type && item?.voucher?.type >= 1) ? VOUCHER_TYPES[Number(item?.voucher?.type - 1)].slug : ''}/${item?.voucher?._id}`}>
                        {item?.voucher?.name}
                      </NavLink>
                    </td>
                    <td className="py-1 px-2 border-r border-primary-border">
                      {item?.voucher?.sign}
                    </td>
                    <td className="py-1 px-2 border-r border-primary-border">
                      {item?.customerDebit?.name}
                    </td>
                    <td className="py-1 px-2 border-r border-primary-border">
                      {item?.credit?.name}-{item?.credit?.description}
                    </td>
                    <td className="py-1 px-2 border-r border-primary-border text-right">
                      {formatNumberMoney(item?.amount)}
                    </td>
                    <td className="py-1 px-2 border-r border-primary-border">

                    </td>
                    <td className="py-1 px-2 border-r border-primary-border">
                      
                    </td>
                    <td className="py-1 px-2 border-r border-primary-border">
                     
                    </td>
                    <td className="py-1 px-2 border-r border-primary-border">
                      {item?.note}
                    </td>
                  </tr>
                )
              }else{
                return (
                  <tr key={index} className="border-b border-primary-border h-10">
                    <td className="py-1 px-2 border-r border-primary-border">
                      {moment(item?.voucher?.date).format('DD/MM/YYYY')}
                    </td>
                    <td className="py-1 px-2 border-r border-primary-border">
                      {(item?.voucher?.type && item?.voucher?.type >= 1) ? VOUCHER_TYPES[Number(item?.voucher?.type - 1)].text : ''}
                    </td>
                    <td className="py-1 px-2 text-primary border-r border-primary-border">
                      <NavLink to={`/accounting/${ (item?.voucher?.type && item?.voucher?.type >= 1) ? VOUCHER_TYPES[Number(item?.voucher?.type - 1)].slug : ''}/${item?.voucher?._id}`}>
                        {item?.voucher?.name}
                      </NavLink>
                    </td>
                    <td className="py-1 px-2 border-r border-primary-border">
                      {item?.voucher?.sign}
                    </td>
                    <td className="py-1 px-2 border-r border-primary-border">
                      {item?.customerCredit?.name}
                    </td>
                    <td className="py-1 px-2 border-r border-primary-border">
                      {item?.debit?.name}-{item?.debit?.description}
                    </td>
                    <td className="py-1 px-2 border-r border-primary-border">
                      
                    </td>
                    <td className="py-1 px-2 border-r border-primary-border text-right">
                      {formatNumberMoney(item?.amount)}
                    </td>
                    <td className="py-1 px-2 border-r border-primary-border">
                      
                    </td>
                    <td className="py-1 px-2 border-r border-primary-border">
                     
                    </td>
                    <td className="py-1 px-2 border-r border-primary-border">
                      {item?.note}
                    </td>
                  </tr>
                )
              }
            })
        }

          {/* {
            (listDataWithPager[pageIndex] ?? []).map((item, index) => (
              <tr key={index} className="border-b border-primary-border h-10">
                <td className="py-1 px-2 border-r border-primary-border">
                  {moment(item?.voucher?.date).format('DD/MM/YYYY')}
                </td>
                <td className="py-1 px-2 border-r border-primary-border">
                  {(item?.voucher?.type && item?.voucher?.type >= 1) ? VOUCHER_TYPES[Number(item?.voucher?.type - 1)].text : ''}
                </td>
                <td className="py-1 px-2 text-primary border-r border-primary-border">
                  {item?.voucher?.name}
                </td>
                <td className="py-1 px-2 border-r border-primary-border">
                  {item?.voucher?.sign}
                </td>
                <td className="py-1 px-2 border-r border-primary-border">
                  Công ty xăng dầu số 2 Vạn Phúc
                </td>
                <td className="py-1 px-2 border-r border-primary-border">
                  4111-Vốn đầu tư của chủ sở hữu
                </td>
                <td className="py-1 px-2 border-r border-primary-border">
                  10.000.000
                </td>
                <td className="py-1 px-2 border-r border-primary-border">{""}</td>
                <td className="py-1 px-2 border-r border-primary-border">
                  30.000.000
                </td>
                <td className="py-1 px-2 border-r border-primary-border">
                  Mua bán xăng xe định kỳ cho hoạt động
                </td>
                <td className="py-1 px-2 border-r border-primary-border">
                  Đã lưu chứng từ gốc tại công ty
                </td>
            </tr>
            ))
        } */}

          <tr
            className={cn(
              "border-b border-primary-border h-10",
              styles.bgFooterYellow
            )}
          >
            <td className="py-1 px-2 border-r border-primary-border">{""}</td>
            <td className="py-1 px-2 border-r border-primary-border">{""}</td>
            <td className="py-1 px-2 font-bold border-r border-primary-border">
              Cuối kỳ
            </td>
            <td className="py-1 px-2 border-r border-primary-border">{""}</td>
            <td className="py-1 px-2 border-r border-primary-border">{""}</td>
            <td className="py-1 px-2 border-r border-primary-border">{""}</td>
            <td className="py-1 px-2 font-bold border-r border-primary-border text-right">
              0
            </td>
            <td className="py-1 px-2 font-bold border-r border-primary-border text-right">
            0
            </td>
            <td className="py-1 px-2 font-bold border-r border-primary-border text-right">
            0
            </td>
            <td className="py-1 px-2 border-r border-primary-border">{""}</td>
            <td className="py-1 px-2 border-r border-primary-border">{""}</td>
          </tr>
        </tbody>
      </table>
    </main>
  )
}