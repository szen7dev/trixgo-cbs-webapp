import React, { FC, useRef, useState, useMemo } from "react";
import { formatNumberMoney } from "utils/cmcs";
import { NavLink } from "react-router-dom";
import moment from "moment";
import debounce from "lodash/debounce";
import PaginateV2, { RefPaginateHandle } from "shareComponents/common/PaginateV2";
import { useContact } from "services/hooks/items/useContact";
import { useUserSystem } from 'services/hooks/users/useUserSystem';
import { DropdownSearchableV2 } from "shareComponents/common";
import { LIMIT_DROPDOWN } from "apis/localdb/index";
import downloadIcon from "assets/images/icons8-download-64.svg";
import { toast } from "react-toastify";
import { createLinkAndClick } from "utils";
import {
  useProductCustom,
  useQueryListStoreChild,
} from "services/hooks/useStoreProduct";
import { useQueryListDepartments } from "services/hooks/items/useDepartment";
import { CASH_OUTIN, CASH_TYPES } from "apis/localdb";
import {
  useQueryListContract,
  useQueryListAccount,
} from "services/hooks/cmcs/useContractIncome";
import { useDoctype } from "services/hooks/items/useDoctype";
import { useQueryListBudgetWork } from "services/hooks/cmcs/useContractIncome";

interface Props {
  outin?: number
  // type?: number
}

export const CashDetailedReportPage: FC<Props> = () => {
  type PaginateHandle = React.ElementRef<typeof PaginateV2>;
  type DropdownHandle = React.ElementRef<typeof DropdownSearchableV2>;
  const ref = React.useRef<PaginateHandle>(null);
  const accountRef = React.useRef<DropdownHandle>(null);
  const [pageIndex, setPageIndex] = useState(0);

  const [type, setType] = useState<string | null>();
  const [outin, setOutin] = useState<string | null>();
  const [userID, setUserID] = useState<string | null>();
  const [projectID, setProjectID] = useState<string | null>();
  // const [warehouseID, setWarehouseID] = useState<string | null>();
  const [contractID, setContractID] = useState<string | null>();
  const [accountID, setAccountID] = useState<string | null>();
  // const [goodsID, setGoodsID] = useState<string | null>();
  // const [assetsID, setAssetsID] = useState<string | null>();
  const [customerID, setCustomerID] = useState<string | null>();
  const [workID, setWorkID] = useState<string | null>();
  const [subtypeID, setSubtypeID] = useState<string | null>();

  const {
    dataNotFilter: listDataWithPager,
    loading: isFetchStoreChild,
    totalPages,
    totalRecord,
    limit,
    hasNextPage,
    fetchNextPage,
    fetchPrevPage,
    refetch: onRefreshStoreChild,
  } = useQueryListStoreChild({
    option: 2, // Sổ quỹ
    limit: 500,
    type,
    status: 5, // Hoàn thành
    projectID,
    contractID,
    accountID,
    customerID,
    // goodsID,
    // assetsID,
    outin,
    workID,
    subtypeID,
    userCreateID: userID,
    sortKey: JSON.stringify(['date__1', 'createAt__1']),
  })

  const [userKeyword, setUserKeyword] = useState("");
  const [projectKeyword, setProjectKeyword] = useState("");
  // const [warehouseKeyword, setWarehouseKeyword] = useState("");
  // const [goodsKeyword, setGoodsKeyword] = useState("");
  const [contactKeyword, setContactKeyword] = useState("");
  const [contractKeyword, setContractKeyword] = useState("");
  const [accountKeyword, setAccountKeyword] = useState("");
  const [keywordWork, setKeywordWork] = useState("");
  const [keywordDoctype, setKeywordDoctype] = useState('');

  const { list: listCustomer } = useContact({
    params: { keyword: contactKeyword, limit: 20 },
    isFetchList: true
  })

  const { data: listUser } = useUserSystem({
    keyword: userKeyword,
    limit: 10,
    isFetch: true
  }, true)

  const { listDepartments } = useQueryListDepartments({
    keyword: projectKeyword,
  }, true)

  const { list: listSubType } = useDoctype({
    params: {
      limit: LIMIT_DROPDOWN,
      type: 23,
      keyword: keywordDoctype
    },
    isFetchList: true
  })

  // const { listWarehouse } = useQueryListWarehouse({
  // 	limit: LIMIT_DROPDOWN,
  // 	keyword: warehouseKeyword,
  // })

  const { listContract } = useQueryListContract({
    limit: LIMIT_DROPDOWN,
    keyword: contractKeyword,
  })

  const { listAccount } = useQueryListAccount({
    limit: LIMIT_DROPDOWN,
    keyword: accountKeyword,
    type: 2,
  })

  // const { listGood } = useQueryListGood({
  // 	limit: LIMIT_DROPDOWN,
  // 	keyword: goodsKeyword,
  // })

  const { listBudgetWork } = useQueryListBudgetWork({
    limit: LIMIT_DROPDOWN,
    keyword: keywordWork,
  })

  //_____Import, export excel
  const [stateExport, setStateExport] = useState<{ isExporting: boolean }>({
    isExporting: false,
  })
  const { exportByFilterAsync } = useProductCustom();
  const handleExportByFilter = async (param: any) => {
    try {
      setStateExport({ isExporting: true });
      const { error, data } = await exportByFilterAsync({
        option: param.option,
        filterParams: {
          option: param.option,
          limit: 500,
          type,
          status: 5, // Hoàn thành
          projectID,
          contractID,
          accountID,
          customerID,
          // goodsID,
          // assetsID,
          outin,
          workID,
          subtypeID,
          userCreateID: userID,
          sortKey: JSON.stringify(['date__1', 'createAt__1']),
        }
      })

      if (error) {
        return toast.warn(data?.message);
      }

      data && createLinkAndClick(data, '_self');
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setStateExport({ isExporting: false });
    }
  }

  let inventory = 0
  let tongThu = 0, tongChi = 0
  {
    (listDataWithPager[pageIndex] ?? []).map((item: any, index: any) => {
      if (item?.outin == 2) {
        tongThu = Number(tongThu) + Number(item?.amount)
      }

      if (item?.outin == 1) {
        tongChi = Number(tongChi) + Number(item?.amount)
      }
    })
  }

  return (
    <div>
      <div className={"filter-bar flex flex-wrap border-b py-2"}>
        <DropdownSearchableV2
          ref={accountRef}
          className={"mr-1 border border-primary-border rounded-lg"}
          placeholder={"Phân loại"}
          isMultiple={false}
          allowClearValueSingleInput={true}
          data={CASH_TYPES.map((item: any) => ({
            _id: item.value,
            name: item.text,
          }))}
          formatItem={{
            id: "_id",
            text: "name",
          }}
          onClearData={() => {
            setType("");
          }}
          onchangeValue={item => {
            setType(item._id);
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
          placeholder={"Thu chi"}
          isMultiple={false}
          allowClearValueSingleInput={true}
          data={CASH_OUTIN.map((item: any) => ({
            _id: item.value,
            name: item.text,
          }))}
          formatItem={{
            id: "_id",
            text: "name",
          }}
          onClearData={() => {
            setOutin("");
          }}
          onchangeValue={item => {
            setOutin(item._id);
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
          placeholder={"Tài khoản"}
          isMultiple={false}
          allowClearValueSingleInput={true}
          // data={listAccount}
          data={listAccount.map((item: any) => ({
            _id: item._id,
            name: `${item.name}.${item.description}`,
          }))}
          formatItem={{
            id: "_id",
            text: "name",
          }}
          onSearchInputChange={debounce(
            (valueSearch) => setAccountKeyword(valueSearch),
            500
          )}
          onClearData={() => {
            setAccountID("");
          }}
          onchangeValue={item => {
            setAccountID(item._id);
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
          data={listCustomer.map((item: any) => ({
            _id: item._id,
            name: `${item.name}.${item.phone}.${item.taxid}`,
          }))}
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
          placeholder={"Dự án"}
          isMultiple={false}
          allowClearValueSingleInput={true}
          data={listDepartments.map((item: any) => ({
            _id: item._id,
            name: `${item.sign}.${item.name}`,
          }))}
          formatItem={{
            id: "_id",
            text: "name",
          }}
          onSearchInputChange={debounce(
            (valueSearch) => setProjectKeyword(valueSearch),
            500
          )}
          onClearData={() => {
            setProjectID("");
          }}
          onchangeValue={item => {
            setProjectID(item._id);
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
          placeholder={"Khoản mục phí"}
          isMultiple={false}
          allowClearValueSingleInput={true}
          data={listSubType.map((item: any) => ({
            _id: item._id,
            name: `${item.sign}.${item.name}`,
          }))}
          formatItem={{
            id: "_id",
            text: "name",
          }}
          onSearchInputChange={debounce(
            (valueSearch) => setKeywordDoctype(valueSearch),
            500
          )}
          onClearData={() => {
            setSubtypeID("");
          }}
          onchangeValue={item => {
            setSubtypeID(item._id);
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
          placeholder={"Hợp đồng"}
          isMultiple={false}
          allowClearValueSingleInput={true}
          data={listContract.map((item: any) => ({
            _id: item._id,
            name: `${item.sign}.${item.name}`,
          }))}
          formatItem={{
            id: "_id",
            text: "name",
          }}
          onSearchInputChange={debounce(
            (valueSearch) => setContractKeyword(valueSearch),
            500
          )}
          onClearData={() => {
            setContractID("");
          }}
          onchangeValue={item => {
            setContractID(item._id);
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
          placeholder={"Ngân sách"}
          isMultiple={false}
          allowClearValueSingleInput={true}
          data={listBudgetWork.map((item: any) => ({
            _id: item._id,
            name: `${item.sign}.${item.name}`,
          }))}
          formatItem={{
            id: "_id",
            text: "name",
          }}
          onSearchInputChange={debounce(
            (valueSearch) => setKeywordWork(valueSearch),
            500
          )}
          onClearData={() => {
            setWorkID("");
          }}
          onchangeValue={item => {
            setWorkID(item._id);
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
          placeholder={"Người tạo"}
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
            ref.current && ref.current.resetPaginate();
          }}
          renderItem={(item) => (
            <p className={"min-w-[300px]"}>{item.text}</p>
          )}
          selectOneByOne={true}
        />
        <button className={"flex items-center justify-center mx-1"} onClick={() => handleExportByFilter({ option: 3 })}>
          Download <img src={downloadIcon} alt={"-----"} className={"ml-2 w-[18px] h-[18px]"} />
        </button>
        <PaginateV2
          ref={ref}
          totalRecord={totalRecord}
          totalPages={totalPages}
          hasNextPage={hasNextPage}
          limit={500}
          isFetching={isFetchStoreChild}
          nextPageAction={() => {
            setPageIndex((oldState) => oldState + 1);
            fetchNextPage();
          }}
          prevPageAction={() => {
            setPageIndex((oldState) => oldState - 1);
            fetchPrevPage();
          }}
        />
      </div>

      <table className="table-fixed border-collapse w-full overflow-auto border-l border-r border-primary-border">
        <thead className="bbg-cbs-table-header h-10 border-b border-primary-border">
          <tr className="text-left text-sm text-primary-gray">
            <th className="py-1 px-2 font-normal border-r border-l border-b border-primary-border text-center" style={{ width: "80px" }}>Ngày</th>
            <th className="py-1 px-2 font-normal border-r border-l border-b border-primary-border text-center">Tài khoản</th>
            <th className="py-1 px-2 font-normal border-r border-l border-b border-primary-border text-center">Mã khách</th>
            <th className="py-1 px-2 font-normal border-r border-l border-b border-primary-border text-center">Dự án</th>
            <th className="py-1 px-2 font-normal border-r border-l border-b border-primary-border text-center">Khoản mục phí/Ngân sách</th>
            <th className="py-1 px-2 font-normal border-r border-l border-b border-primary-border text-center">Hợp đồng</th>
            <th className="py-1 px-2 font-normal border-r border-l border-b border-primary-border text-center">Thu</th>
            <th className="py-1 px-2 font-normal border-r border-l border-b border-primary-border text-center">Chi</th>
            <th className="py-1 px-2 font-normal border-r border-l border-b border-primary-border text-center">Tồn</th>
          </tr>
          <tr className="text-left text-sm font-bold">
            <th className="py-1 px-2 border-r border-l border-b border-primary-border text-center"></th>
            <th className="py-1 px-2 border-r border-l border-b border-primary-border text-center">Tổng (của trang hiển thị)</th>
            <th className="py-1 px-2 border-r border-l border-b border-primary-border text-center"></th>
            <th className="py-1 px-2 border-r border-l border-b border-primary-border text-center"></th>
            <th className="py-1 px-2 border-r border-l border-b border-primary-border text-center"></th>
            <th className="py-1 px-2 border-r border-l border-b border-primary-border text-center"></th>
            <th className="py-1 px-2 border-r border-l border-b border-primary-border text-center text-right">{formatNumberMoney(tongThu)}</th>
            <th className="py-1 px-2 border-r border-l border-b border-primary-border text-center text-right">{formatNumberMoney(tongChi)}</th>
            <th className="py-1 px-2 border-r border-l border-b border-primary-border text-center text-right">{formatNumberMoney(tongThu - tongChi)}</th>
          </tr>
        </thead>
        <tbody>
          {
            (listDataWithPager[pageIndex] ?? []).map((item: any, index: any) => {
              const jsx = [];

              if (item?.outin == 2) {
                inventory = Number(inventory) + Number(item?.amount)

                jsx.push(
                  <tr key={index} className="border-b border-primary-border h-10">
                    <td className="py-1 px-2 border-r border-primary-border text-right">
                      {moment(item?.date).format('DD/MM/YYYY')}
                    </td>
                    <td className="py-1 px-2 border-r border-primary-border">
                      <p className="text-primary-gray"><i>{item?.name}</i></p>
                      <p className="text-cbs-highlight-color">{item?.account?.name}-{item?.account?.description}</p>
                      <NavLink className="" to={`/cash/home/${item?.order?._id}`}>
                        <p className="">{item?.order?.name}</p>
                      </NavLink>
                      <p className="text-primary-gray"><i>{item?.userCreate?.fullname} | {moment(item.createAt).format("DD/MM/YYYY HH:mm")}</i></p>
                    </td>
                    <td className="py-1 px-2 border-r border-primary-border">{item?.customer?.name}-{item?.customer?.phone}</td>
                    <td className="py-1 px-2 border-r border-primary-border">{item?.project?.sign}-{item?.project?.name}</td>
                    <td className="py-1 px-2 border-r border-primary-border">
                      {item?.subtype?.sign}-{item?.subtype?.name}
                      <p className="text-primary-gray"><i>{item?.budgetWork?.sign}-{item?.budgetWork?.name}</i></p>
                    </td>
                    <td className="py-1 px-2 border-r border-primary-border">{item?.contract?.name}-{item?.contract?.sign}</td>
                    <td className="py-1 px-2 border-r border-primary-border text-right">{formatNumberMoney(item?.amount)}</td>
                    <td className="py-1 px-2 border-r border-primary-border text-right"></td>
                    <td className="py-1 px-2 border-r border-primary-border text-right">{formatNumberMoney(inventory)}</td>
                  </tr>
                )
              }

              if (item?.outin == 1) {
                inventory = Number(inventory) - Number(item?.amount)

                jsx.push(
                  <tr key={index} className="border-b border-primary-border h-10">
                    <td className="py-1 px-2 border-r border-primary-border text-right">
                      {moment(item?.date).format('DD/MM/YYYY')}
                    </td>
                    <td className="py-1 px-2 border-r border-primary-border">
                      <p className="text-primary-gray"><i>{item?.name}</i></p>
                      <p className="text-cbs-highlight-color">{item?.account?.name}-{item?.account?.description}</p>
                      <NavLink className="" to={`/cash/home/${item?.order?._id}`}>
                        <p className="">{item?.order?.name}</p>
                      </NavLink>
                      <p className="text-primary-gray"><i>{item?.userCreate?.fullname} | {moment(item.createAt).format("DD/MM/YYYY HH:mm")}</i></p>
                    </td>
                    <td className="py-1 px-2 border-r border-primary-border">{item?.customer?.name}-{item?.customer?.phone}</td>
                    <td className="py-1 px-2 border-r border-primary-border">{item?.project?.sign}-{item?.project?.name}</td>
                    <td className="py-1 px-2 border-r border-primary-border">
                      {item?.subtype?.sign}-{item?.subtype?.name}
                      <p className="text-primary-gray"><i>{item?.budgetWork?.sign}-{item?.budgetWork?.name}</i></p>
                    </td>
                    <td className="py-1 px-2 border-r border-primary-border">{item?.contract?.name}-{item?.contract?.sign}</td>
                    <td className="py-1 px-2 border-r border-primary-border text-right"></td>
                    <td className="py-1 px-2 border-r border-primary-border text-right">{formatNumberMoney(item?.amount)}</td>
                    <td className="py-1 px-2 border-r border-primary-border text-right">{formatNumberMoney(inventory)}</td>
                  </tr>
                )
              }

              return jsx
            })
          }
        </tbody>
      </table>
    </div>
  )
}