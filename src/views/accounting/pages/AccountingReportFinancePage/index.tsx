import React, { FC, useCallback, useState } from "react";
import { NavLink, useHistory, useLocation, useParams } from "react-router-dom";
import moment from "moment";
import { useModal } from "services/hooks/useModal";
import { formatNumberMoney } from "utils/cmcs";
import PaginateV2 from "../../../../shareComponents/common/PaginateV2";
import debounce from "lodash/debounce";
import { SearchInput } from "shareComponents/common";
import { toast } from "react-toastify";
import {
  DialogForm, ActionGroupButton
} from "views/accounting/shareComponents/common";
import {
  useReportList, useMutationDocument, useDocumentCustom
} from "services/hooks/accounting/useReport";
import iconRefresh from "assets/images/icons8-refresh.png";
import { ModalConfirm } from "shareComponents/common";
import API from "apis/repository";
import { createLinkAndClick } from "utils";

interface AccountingTicketsPageProps {
  type?: number
}

export const AccountingReportFinancePage: FC<AccountingTicketsPageProps> = () => {
  const { openModal, closeModal } = useModal();
  const [pageIndex, setPageIndex] = useState(0)
  const [recordSelected, toggleRecord] = React.useState<any>({});
  const history = useHistory();
  const { parentID } = useParams<{ parentID: string }>();

  type PaginateHandle = React.ElementRef<typeof PaginateV2>;
  const ref = React.useRef<PaginateHandle>(null);
  const [keyword, setKeyword] = React.useState("")

  const { listDataWithPager, isLoading, totalRecord, totalPage, fetchNextPage, hasNextPage, refetch } = useReportList({
    params: {
        keyword,
        parentID,
        limit: 50,
    },
    isFetchList: true
  })

  const {
    insertDocumentAsync,
    updateDocumentAsync,
  } = useMutationDocument();

  const handleCreateReport = React.useCallback(
    async (values) => {
      try {
        const isCreated = await insertDocumentAsync(values);
        if (!isCreated.error) {
          toast.success('Khởi tạo thành công');
          refetch();
          closeModal();
          return null;
        }
        toast.error(isCreated?.data?.message);
        throw new Error("Can not create!");
      } catch (err) {
        return null;
      }
    },
    [closeModal, insertDocumentAsync, refetch]
  );

  const handleUpdateReport = React.useCallback(
    async (values) => {
      try {
        const isUpdated = await updateDocumentAsync(values);
        if (!isUpdated.error) {
          toast.success('Cập nhật thành công');
          refetch();
          closeModal();
          return null;
        }
        toast.error(isUpdated?.data?.message);
        throw new Error("Can not update!");
      } catch (err) {
        return null;
      }
    },
    [closeModal, updateDocumentAsync, refetch]
  );

  const handleConfirmSync = useCallback(async (param: any) => {
    closeModal();

    const { data, status } = await API.post(
      `/api/accounting/reports/sync-data`, {
        option: param.option,
        reportID: param.reportID,
      }
    )
   
    if (status !== 200 || data.error) {
      return toast.warn(data?.data?.message)
    }

    refetch();
    return toast.success('Đồng bộ thành công')
  }, [])

  const toggleModalOpenSign = (param: any) => {
    openModal(
      <div
        className={
          "inline-block w-[521px] h-[240px] my-8 overflow-hidden text-left align-middle transition-all transform bg-primary-light shadow-xl rounded"
        }
      >
        <ModalConfirm
          title="Bạn có muốn xác nhận Đồng bộ không?"
          description= "Dữ liệu từ các bút toán sẽ được cập nhật về bảng này"
          onConfirm={() => handleConfirmSync({ option: param.option, reportID: param.reportID })}
          defaultText={false}
          onCancel={closeModal}
        />
      </div>
    )
  }

   //_____Import, export excel
   const [, setStateExport] = useState<{ isExporting: boolean }>({
    isExporting: false,
  });

  const { exportExcelAsync } = useDocumentCustom({});

  const handleDownloadExcel = async (param: any) => {
    try {
      setStateExport({ isExporting: true });
      const { error, data } = await exportExcelAsync({
        // option: `${param.option}`,
        parentID: param.parentID,
      });
      
      if (error) {
        return toast.warn(data?.message);
      }

      data && createLinkAndClick(data, "_self");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setStateExport({ isExporting: false });
    }
  };

  return (
    <main className="h-full">
      <header className="h-[50px] w-full border border-primary-border flex items-center px-3">
        
        <div className="filter-bar flex flex-wrap px-2 py-1">
          {
            parentID != undefined ?  <button
              type="button"
              className="p-2 rounded-3xl"
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
          </button>: <></>
          }
          <SearchInput
              classNameWrapper={""}
              onChange={debounce((e) => {
                setKeyword(e.target.value);
              }, 1000)}
            />
          {Object.keys(recordSelected).length > 1 && (
            <>
              <div className={"mr-3 w-4 border-r border-gray-400 h-[16px]"} />
              <ActionGroupButton
                recordSelected={recordSelected}
                onUpdateStore={handleUpdateReport}
              />
            </>
          )}
        </div>

        <button
            className={"bg-green-success h-[32px] text-white rounded px-5"}
            onClick={() =>
              openModal(
                <div className="t-main-search text-left transition-all transform bg-primary-light shadow-xl rounded my-20 align-top inline-block">
                  <DialogForm
                    title="Tạo mới"
                    onSubmit={handleCreateReport}
                  />
                </div>
              )
            }
          >
            Tạo mới
          </button>
          <div className="absolute right-0">
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
      </header>

      <table className="table-fixed border-collapse w-full overflow-auto border-l border-r border-primary-border">
        <thead className="bg-cbs-table-header h-10 border-b border-primary-border">
          <tr className="text-left text-sm text-primary-gray">
            <th className="py-1 px-2 font-normal border-r border-primary-border" style={{width: "5%"}}>
              TT
            </th>
            <th className="py-1 px-2 font-normal border-r border-primary-border" style={{width: "20%"}}>
              Nội dung
            </th>
            <th className="py-1 px-2 font-normal border-r border-primary-border">
              Từ ngày
            </th>
            <th className="py-1 px-2 font-normal border-r border-primary-border">
              Đến ngày
            </th>
            <th className="py-1 px-2 font-normal border-r border-primary-border">
              Doanh thu
            </th>
            <th className="py-1 px-2 font-normal border-r border-primary-border">
              Chi phí
            </th>
            <th className="py-1 px-2 font-normal border-r border-primary-border">
              Lợi nhuận
            </th>
            <th className="py-1 px-2 font-normal border-r border-primary-border">
              Ghi chú
            </th>
          </tr>
        </thead>
        <tbody className="">
          {listDataWithPager[pageIndex] && listDataWithPager[pageIndex].map((item: any, index: any) => {
            if(item?.funda){
              return (
                <tr key={item._id}  className="border-b border-primary-border">
                  <td className="py-1 px-2 border-r border-primary-border">
                    {index + 1}
                  </td>
                  <td className="py-1 px-2 border-r border-primary-border">
                     <NavLink to={`/accounting/financial-report/funda/${item._id}`} className="text-cbs-highlight-color">
                      {item?.funda?.name}
                    </NavLink>
                  </td>
                  <td className="py-1 px-2 border-r border-primary-border">{moment(item.fromDate).format('DD/MM/YYYY HH:mm')}</td>
                  <td className="py-1 px-2 border-r border-primary-border">{moment(item.toDate).format('DD/MM/YYYY HH:mm')}</td>
                  <td className="py-1 px-2 border-r border-primary-border text-right">
                  {formatNumberMoney(item.revenue)}
                  </td>
                  <td className="py-1 px-2 border-r border-primary-border text-right">
                  {formatNumberMoney(item.expense)}
                  </td>
                  <td className="py-1 px-2 border-r border-primary-border text-right">
                    {formatNumberMoney(item.profit)}
                  </td>
                  <td className="py-1 px-2 border-r border-primary-border">
                    {item.note}
                  </td>
                </tr>
              )
            }else{
              return (
                <tr key={item._id}  className="border-b border-primary-border">
                  <td className="py-1 px-2 border-r border-primary-border">
                    <input
                      className="form-check-input mr-2"
                      type="checkbox"
                      id="flexCheckDefault"
                      checked={recordSelected?._id === item._id}
                      onChange={(e) => {
                        if (e.target.checked) {
                          toggleRecord(item);
                          return null;
                        }
                        toggleRecord({});
                        return null;
                      }}
                    />
                    {index + 1}
                  </td>
                  <td className="py-1 px-2 border-r border-primary-border">
                    <NavLink to={`/accounting/financial-report/${item._id}`}>
                      {item?.name} | {item?.childs?.length} cơ sở
                    </NavLink>
                      {/* <p className="text-small"><i>{item._id}</i></p> */}
                  </td>
                  <td className="py-1 px-2 border-r border-primary-border">{moment(item.fromDate).format('DD/MM/YYYY HH:mm')}</td>
                  <td className="py-1 px-2 border-r border-primary-border">{moment(item.toDate).format('DD/MM/YYYY HH:mm')}</td>
                  <td className="py-1 px-2 border-r border-primary-border text-right">
                    {formatNumberMoney(item.revenue)}
                  </td>
                  <td className="py-1 px-2 border-r border-primary-border text-right">
                    {formatNumberMoney(item.expense)}
                  </td>
                  <td className="py-1 px-2 border-r border-primary-border text-right">
                    {formatNumberMoney(item.profit)}
                  </td>
                  <td className="py-1 px-2 border-r border-primary-border">
                    <div>
                      <button className={"flex text-primary-gray items-center rounded hover:bg-cbs-form-input-bg h-[30px]"} onClick={() => toggleModalOpenSign({ option: 1, reportID: item._id })}>
                        <img src={iconRefresh} title={'Đồng bộ dữ liệu'} className={"w-[24px] h-[24px] mr-3"} />
                        <span>Đồng bộ</span>
                      </button>
                    </div>
                    <div>
                      <button
                        className={"mr-2 text-primary"}
                        onClick={() => handleDownloadExcel({ option: 1, parentID: item._id })}
                      >
                        Tải excel Phiếu
                      </button>
                    </div>
                    {item.note}
                  </td>
                </tr>
              )
            }
          })}
        </tbody>
      </table>

    </main>
  )
}