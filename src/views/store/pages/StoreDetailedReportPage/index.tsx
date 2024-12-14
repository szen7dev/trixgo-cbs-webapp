import React, { FC, useRef, useState, useCallback } from "react";
import { formatNumberMoney } from "utils/cmcs";
import { NavLink } from "react-router-dom";
import moment from "moment";
import debounce from "lodash/debounce";
import PaginateV2, { RefPaginateHandle } from "shareComponents/common/PaginateV2";
import { useContact } from "services/hooks/items/useContact";
import { useUserSystem } from 'services/hooks/users/useUserSystem';
import { DropdownSearchableV2 } from "shareComponents/common";
import { STORE_OUTIN, CASH_TYPES, LIMIT_DROPDOWN } from "apis/localdb";
import {
	useQueryListWarehouse,
	useQueryListGood
} from "services/hooks/cmcs/useContractIncome";
import { useQueryListDepartments } from "services/hooks/items/useDepartment";
import { STORE_TYPES } from "apis/localdb";
import {
  useProductCustom,
  useQueryListStoreChild,
} from "services/hooks/useStoreProduct";
// import { useDoctype } from "services/hooks/items/useDoctype";
// import { useQueryListBudgetWork } from "services/hooks/cmcs/useContractIncome";
import { useDocumentPackage } from "services/hooks/document/useDocumentPackage";
import downloadIcon from "assets/images/icons8-download-64.svg";
import { toast } from "react-toastify";
import { createLinkAndClick } from "utils";

interface Props {
    outin?: number
    // type?: number
}

export const StoreDetailedReportPage: FC<Props> = () => {  
  type PaginateHandle = React.ElementRef<typeof PaginateV2>;
  type DropdownHandle = React.ElementRef<typeof DropdownSearchableV2>;
  const ref = React.useRef<PaginateHandle>(null);
  const accountRef = React.useRef<DropdownHandle>(null);
  const [pageIndex, setPageIndex] = useState(0);

  const [type, setType] = useState<string | null>();
  const [outin, setOutin] = useState<string | null>();
  const [userID, setUserID] = useState<string | null>();
  const [projectID, setProjectID] = useState<string | null>();
  const [warehouseID, setWarehouseID] = useState<string | null>();
  const [goodsID, setGoodsID] = useState<string | null>();
  const [parentGoodsID, setParentGoodsID] = useState<string | null>();
  const [assetsID, setAssetsID] = useState<string | null>();
  const [customerID, setCustomerID] = useState<string | null>();
  const [workID, setWorkID] = useState<string | null>();
  const [subtypeID, setSubtypeID] = useState<string | null>();
  const [packageID, setPackageID] = useState<string | null>();
  const [toPackageID, setToPackageID] = useState<string | null>();

  const [keywordWork, setKeywordWork] = useState("");
  const [keywordDoctype, setKeywordDoctype] = useState('');
  const [packageKeyword, setPackageKeyword] = useState("");

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
    option: 1, // Thẻ kho
    limit: 50,
    type, 
    status: 5, // Hoàn thành
    projectID,
    packageID,
    toPackageID,
    warehouseID,
    customerID,
    goodsID,
    parentGoodsID,
    assetsID,
    outin,
    workID,
    subtypeID,
    userCreateID: userID,
    sortKey: JSON.stringify(['date__1', 'createAt__1']),
  })

  const [userKeyword, setUserKeyword] = useState("");  
  const [projectKeyword, setProjectKeyword] = useState("");
  const [warehouseKeyword, setWarehouseKeyword] = useState("");
  const [goodsKeyword, setGoodsKeyword] = useState("");
  const [contactKeyword, setContactKeyword] = useState("");

  const { list: listCustomer } = useContact({
    params: { keyword: contactKeyword, limit: 10 },
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

  const { listWarehouse } = useQueryListWarehouse({
		limit: LIMIT_DROPDOWN,
		keyword: warehouseKeyword,
	})

  const { listGood } = useQueryListGood({
		limit: LIMIT_DROPDOWN,
		keyword: goodsKeyword,
	})

  // const { listBudgetWork } = useQueryListBudgetWork({
	// 	limit: LIMIT_DROPDOWN,
	// 	keyword: keywordWork,
	// })

  // const { list: listSubType } = useDoctype({
	// 	params: {
	// 		limit: LIMIT_DROPDOWN,
	// 		type: 23,
	// 		keyword: keywordDoctype
	// 	 },
	// 	isFetchList: true
	// })

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
              limit: 50,
              type, 
              status: 5, // Hoàn thành
              projectID,
              packageID,
              toPackageID,
              warehouseID,
              customerID,
              goodsID,
              parentGoodsID,
              assetsID,
              outin,
              workID,
              subtypeID,
              userCreateID: userID,
              sortKey: JSON.stringify(['date__1', 'createAt__1']),
          }
        })

        if(error) {
            return toast.warn(data?.message);
        }

        data && createLinkAndClick(data, '_self');
    } catch (error: any) {
        toast.error(error.message)
    } finally {
        setStateExport({ isExporting: false });
    }
  }

  const {
		data: listDocumentPackage,
		// fetchNextPage: fetchNextPageDocumentPackage,
		// hasNextPage: hasNextPageDocumentPackage,
		// totalRecord,
	} = useDocumentPackage({
		// departmentID: projectID,
		isShowAll: "1",
		keyword: packageKeyword
	}, true, false)

  let inventoryQuantity = 0, inventory = 0
  
  return (
    <div>
      <div className={"filter-bar flex flex-wrap border-b py-2"}>
          <DropdownSearchableV2
              ref={accountRef}
              className={"mr-1 border border-primary-border rounded-lg"}
              placeholder={"Phân loại"}
              isMultiple={false}
              allowClearValueSingleInput={true}
              data={STORE_TYPES.map((item: any) => ({
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
                placeholder={"Nhập xuất"}
                isMultiple={false}
                allowClearValueSingleInput={true}
                data={STORE_OUTIN.map((item: any) => ({
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
            placeholder={"Kho bãi"}
            isMultiple={false}
            allowClearValueSingleInput={true}
            data={listWarehouse}
            formatItem={{
                id: "_id",
                text: "name",
            }}
            onSearchInputChange={debounce(
                (valueSearch) => setWarehouseKeyword(valueSearch),
                500
            )}
            onClearData={() => {
              setWarehouseID("");
            }}
            onchangeValue={item => {
              setWarehouseID(item._id);
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
            placeholder={"Hàng hóa"}
            isMultiple={false}
            allowClearValueSingleInput={true}
            data={listGood}
            formatItem={{
                id: "_id",
                text: "name",
            }}
            onSearchInputChange={debounce(
                (valueSearch) => setGoodsKeyword(valueSearch),
                500
            )}
            onClearData={() => {
              setGoodsID("");
            }}
            onchangeValue={item => {
              setGoodsID(item._id);
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
            placeholder={"Nhóm"}
            isMultiple={false}
            allowClearValueSingleInput={true}
            data={listGood}
            formatItem={{
                id: "_id",
                text: "name",
            }}
            onSearchInputChange={debounce(
                (valueSearch) => setGoodsKeyword(valueSearch),
                500
            )}
            onClearData={() => {
              setParentGoodsID("");
            }}
            onchangeValue={item => {
              setParentGoodsID(item._id);
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
            placeholder={"Thiết bị"}
            isMultiple={false}
            allowClearValueSingleInput={true}
            data={listGood}
            formatItem={{
                id: "_id",
                text: "name",
            }}
            onSearchInputChange={debounce(
                (valueSearch) => setGoodsKeyword(valueSearch),
                500
            )}
            onClearData={() => {
              setAssetsID("");
            }}
            onchangeValue={item => {
              setAssetsID(item._id);
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
            placeholder={"Gói giao"}
            isMultiple={false}
            allowClearValueSingleInput={true}
            data={listDocumentPackage}
            formatItem={{
                id: "_id",
                text: "name",
            }}
            onSearchInputChange={debounce(
                (valueSearch) => setPackageKeyword(valueSearch),
                500
            )}
            onClearData={() => {
              setPackageID("");
            }}
            onchangeValue={item => {
              setPackageID(item._id);
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
            placeholder={"Gói nhận"}
            isMultiple={false}
            allowClearValueSingleInput={true}
            data={listDocumentPackage}
            formatItem={{
                id: "_id",
                text: "name",
            }}
            onSearchInputChange={debounce(
                (valueSearch) => setPackageKeyword(valueSearch),
                500
            )}
            onClearData={() => {
              setToPackageID("");
            }}
            onchangeValue={item => {
              setToPackageID(item._id);
              setPageIndex(0);
              ref.current&&ref.current.resetPaginate();
            }}
            renderItem={(item) => (
                <p className={"min-w-[300px]"}>{item.text}</p>
            )}
            selectOneByOne={true}
        />  
         {/* <DropdownSearchableV2
            ref={accountRef}
            className={"mr-1 border border-primary-border rounded-lg"}
            placeholder={"Khoản mục"}
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
              ref.current&&ref.current.resetPaginate();
            }}
            renderItem={(item) => (
                <p className={"min-w-[300px]"}>{item.text}</p>
            )}
            selectOneByOne={true}
          />   */}
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
              ref.current&&ref.current.resetPaginate();
            }}
            renderItem={(item) => (
                <p className={"min-w-[300px]"}>{item.text}</p>
            )}
            selectOneByOne={true}
        />
        <button className={"flex items-center justify-center mx-1"} onClick={() => handleExportByFilter({option: 2})}>
            Download <img src={downloadIcon} alt={"-----"} className={"ml-2 w-[18px] h-[18px]"}/>
        </button>

       <PaginateV2
          ref={ref}
          totalRecord={totalRecord}
          totalPages={totalPages}
          hasNextPage={hasNextPage}
          limit={limit}
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
              <th className="py-1 px-2 font-normal border-r border-l border-b border-primary-border text-center" style={{width: "80px"}}>Ngày</th>
              <th className="py-1 px-2 font-normal border-r border-l border-b border-primary-border text-center">Hàng hóa, vật tư, công cụ</th>
              <th className="py-1 px-2 font-normal border-r border-l border-b border-primary-border text-center">Đơn vị tính</th>
              <th colSpan={2} className="py-1 px-2 font-normal border-r border-l border-b border-primary-border text-center">NHẬP</th>
              <th colSpan={2} className="py-1 px-2 font-normal border-r border-l border-b border-primary-border text-center">XUẤT</th>
              <th colSpan={2} className="py-1 px-2 font-normal border-r border-l border-b border-primary-border text-center">TỒN</th>
            </tr>
            <tr className="text-left text-sm text-primary-gray">
              <th className="py-1 px-2 font-normal border-r border-primary-border"></th>
              <th className="py-1 px-2 font-normal border-r border-primary-border"></th>
              <th className="py-1 px-2 font-normal border-r border-primary-border"></th>
              <th className="py-1 px-2 font-normal border-r border-primary-border">Khối lượng</th>
              <th className="py-1 px-2 font-normal border-r border-primary-border">Giá trị</th>
              <th className="py-1 px-2 font-normal border-r border-primary-border">Khối lượng</th>
              <th className="py-1 px-2 font-normal border-r border-primary-border">Giá trị</th>
              <th className="py-1 px-2 font-normal border-r border-primary-border">Khối lượng</th>
              <th className="py-1 px-2 font-normal border-r border-primary-border">Giá trị</th>
            </tr>
        </thead>
        <tbody>
            {
              (listDataWithPager[pageIndex] ?? []).map((item: any, index: any) => {
                const jsx = [];

                if(item?.outin == 2){
                  inventoryQuantity = Number(inventoryQuantity) + Number(item?.quantity)
                  inventory = Number(inventory) + Number(item?.amount)

                  jsx.push(
                    <tr key={index} className="border-b border-primary-border h-10">
                      <td className="py-1 px-2 border-r border-primary-border text-right">
                      { moment(item?.date).format('DD/MM/YYYY')}
                      </td>
                      <td className="py-1 px-2 border-r border-primary-border text-cbs-highlight-color">
                        <p className="text-primary-gray"><i>{item?.name}</i></p>
                        <p>{item?.goods?.name}</p>
                        <p className="text-primary-gray"><i>{item?.goods?._id}</i></p>
                        { item?.assets ?  <p><i>{item?.assets?.name}</i></p> : <></>}
                        { item?.parentGoods ?  <p><i>{item?.parentGoods?.name}</i></p> : <></>}
                        { item?.package ?  <p><i>{item?.package?.name}</i></p> : <></>}
                        { item?.toPackage ?  <p><i>{item?.toPackage?.name}</i></p> : <></>}
                        <NavLink className="text-primary" to={`/store/home/${item?.order?._id}`}>
                          <p className="text-primary-gray"><i>{item?.order?.name}</i></p>
                        </NavLink>
                        {/* <p className="text-primary-gray"><i>{item?.order?._id}</i></p> */}
                      </td>
                      <td className="py-1 px-2 border-r border-primary-border">{item?.goods?.unit}</td>
                      <td className="py-1 px-2 border-r border-primary-border text-right">{formatNumberMoney(item?.quantity)}</td>
                      <td className="py-1 px-2 border-r border-primary-border text-right">{formatNumberMoney(item?.amount)}</td>
                      <td className="py-1 px-2 border-r border-primary-border text-right"></td>
                      <td className="py-1 px-2 border-r border-primary-border text-right"></td>
                      <td className="py-1 px-2 border-r border-primary-border text-right">{formatNumberMoney(inventoryQuantity)}</td>
                      <td className="py-1 px-2 border-r border-primary-border text-right">{formatNumberMoney(inventory)}</td>
                    </tr>
                  )
                }

                if(item?.outin == 1){
                  inventoryQuantity = Number(inventoryQuantity) - Number(item?.quantity)
                  inventory = Number(inventory) - Number(item?.amount)

                  jsx.push(
                    <tr key={index} className="border-b border-primary-border h-10">
                      <td className="py-1 px-2 border-r border-primary-border text-right">
                      { moment(item?.date).format('DD/MM/YYYY')}
                      </td>
                      <td className="py-1 px-2 border-r border-primary-border text-cbs-highlight-color">
                        <p className="text-primary-gray"><i>{item?.name}</i></p>
                        <p>{item?.goods?.name}</p>
                        { item?.assets ?  <p><i>{item?.assets?.name}</i></p> : <></>}
                        { item?.parentGoods ?  <p><i>{item?.parentGoods?.name}</i></p> : <></>}
                        { item?.package ?  <p><i>{item?.package?.name}</i></p> : <></>}
                        { item?.toPackage ?  <p><i>{item?.toPackage?.name}</i></p> : <></>}
                        <NavLink className="text-primary" to={`/store/home/${item?.order?._id}`}>
                          <p className="text-primary-gray"><i>{item?.order?.name}</i></p>
                        </NavLink>
                        {/* <p className="text-primary-gray"><i>{item?.order?._id}</i></p> */}
                      </td>
                      <td className="py-1 px-2 border-r border-primary-border">{item?.goods?.unit}</td>
                      <td className="py-1 px-2 border-r border-primary-border text-right"></td>
                      <td className="py-1 px-2 border-r border-primary-border text-right"></td>
                      <td className="py-1 px-2 border-r border-primary-border text-right">{formatNumberMoney(item?.quantity)}</td>
                      <td className="py-1 px-2 border-r border-primary-border text-right">{formatNumberMoney(item?.amount)}</td>
                      <td className="py-1 px-2 border-r border-primary-border text-right">{formatNumberMoney(inventoryQuantity)}</td>
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