import React, { FC, useState, useMemo } from "react";
import { formatNumberMoney } from "utils/cmcs";
import { NavLink } from "react-router-dom";
import moment from "moment";
import debounce from "lodash/debounce";
import PaginateV2 from "shareComponents/common/PaginateV2";
import { useContact } from "services/hooks/items/useContact";
import { useUserSystem } from 'services/hooks/users/useUserSystem';
import { DropdownSearchableV2 } from "shareComponents/common";
import { LIMIT_DROPDOWN } from "apis/localdb/index";
import {
  useQueryListWarehouse,
  // useQueryListContact,
  // useQueryListContract,
  // useQueryListBudgetWork,
  // useQueryListAccount,
  useQueryListGood
} from "services/hooks/cmcs/useContractIncome";
import { useQueryListDepartments } from "services/hooks/items/useDepartment";
import {
  useProductCustom,
  useQueryListByPropertyStoreChild
} from "services/hooks/useStoreProduct";
import { STORE_TYPES } from "apis/localdb";
import downloadIcon from "assets/images/icons8-download-64.svg";
import { toast } from "react-toastify";
import { createLinkAndClick } from "utils";
// import {
//   exportByFilterAsync
// } from "services/hooks/useProductCustom";
interface Props {
  outin?: number
  // type?: number
}

export const StoreInventoryPage: FC<Props> = ({ outin }) => {
  type PaginateHandle = React.ElementRef<typeof PaginateV2>;
  type DropdownHandle = React.ElementRef<typeof DropdownSearchableV2>;
  const ref = React.useRef<PaginateHandle>(null);
  const accountRef = React.useRef<DropdownHandle>(null);
  const [pageIndex, setPageIndex] = useState(0);

  // const [outin, setOutin] = useState<string | null>();
  const [type, setType] = useState<string | null>();
  const [userID, setUserID] = useState<string | null>();
  const [projectID, setProjectID] = useState<string | null>();
  const [warehouseID, setWarehouseID] = useState<string | null>();
  const [goodsID, setGoodsID] = useState<string | null>();
  const [assetsID, setAssetsID] = useState<string | null>();
  const [customerID, setCustomerID] = useState<string | null>();

  const {
    data,
  }: any = useQueryListByPropertyStoreChild({
    option: 1,
    type,
    projectID,
    warehouseID,
    customerID,
    goodsID,
    assetsID,
    userCreateID: userID
  })

  const { tongNhap, tongXuat, tongTon } = useMemo(() => {
    let tongNhap = 0, tongXuat = 0, tongTon = 0

    if(data?.data && data.data.length) { 
      for(const item of data?.data){
        tongNhap = Number(tongNhap) + Number(item.income)
        tongXuat = Number(tongXuat) + Number(item.expense)
      }
      tongTon = tongNhap - tongXuat
    }
    
    return { tongNhap, tongXuat, tongTon }
  }, [data?.data])

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
          type,
          projectID,
          warehouseID,
          customerID,
          goodsID,
          assetsID,
          userCreateID: userID
        });

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
          placeholder={"Hàng hóa, vật tư, công cụ"}
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
          placeholder={"Thuộc tài sản/thiết bị"}
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
        <button className={"flex items-center justify-center mx-1"} onClick={() => handleExportByFilter({option: 2})}>
            Download <img src={downloadIcon} alt={"-----"} className={"ml-2 w-[18px] h-[18px]"}/>
        </button>
      </div>

      <table className="table-fixed border-collapse w-full overflow-auto border-l border-r border-primary-border">
        <thead className="bbg-cbs-table-header h-10 border-b border-primary-border">
          <tr className="text-left text-sm text-primary-gray">
            <th className="py-1 px-2 font-normal border-r border-l border-b border-primary-border text-center" style={{ width: "40px" }}>TT</th>
            <th className="py-1 px-2 font-normal border-r border-l border-b border-primary-border text-center">Hàng hóa, vật tư, công cụ</th>
            <th className="py-1 px-2 font-normal border-r border-l border-b border-primary-border text-center">Đơn vị tính</th>
            <th colSpan={2} className="py-1 px-2 font-normal border-r border-l border-b border-primary-border text-center">NHẬP</th>
            <th colSpan={2} className="py-1 px-2 font-normal border-r border-l border-b border-primary-border text-center">XUẤT</th>
            <th colSpan={2} className="py-1 px-2 font-normal border-r border-l border-b border-primary-border text-center">TỒN</th>
          </tr>
          <tr className="text-left text-sm text-primary-gray">
            <th className="py-1 px-2 font-normal border-r border-b border-primary-border"></th>
            <th className="py-1 px-2 font-normal border-r border-b border-primary-border"></th>
            <th className="py-1 px-2 font-normal border-r border-b border-primary-border"></th>
            <th className="py-1 px-2 font-normal border-r border-b border-primary-border">Khối lượng</th>
            <th className="py-1 px-2 font-normal border-r border-b border-primary-border">Giá trị</th>
            <th className="py-1 px-2 font-normal border-r border-b border-primary-border">Khối lượng</th>
            <th className="py-1 px-2 font-normal border-r border-b border-primary-border">Giá trị</th>
            <th className="py-1 px-2 font-normal border-r border-b border-primary-border">Khối lượng</th>
            <th className="py-1 px-2 font-normal border-r border-b border-primary-border">Giá trị</th>
          </tr>
          <tr className="text-left text-sm text-primary-gray font-bold">
            <th className="py-1 px-2 border-r border-primary-border"></th>
            <th className="py-1 px-2 border-r border-primary-border"></th>
            <th className="py-1 px-2 border-r border-primary-border"></th>
            <th className="py-1 px-2 border-r border-primary-border"></th>
            <th className="py-1 px-2 border-r border-primary-border text-right">{formatNumberMoney(tongNhap)}</th>
            <th className="py-1 px-2 border-r border-primary-border text-right"></th>
            <th className="py-1 px-2 border-r border-primary-border text-right">{formatNumberMoney(tongXuat)}</th>
            <th className="py-1 px-2 border-r border-primary-border text-right"></th>
            <th className="py-1 px-2 border-r border-primary-border text-right">{formatNumberMoney(tongTon)}</th>
          </tr>
        </thead>
        <tbody>
          {data?.data?.map((item: any, index: any) => (
            <tr key={index} className="border-b border-primary-border h-10">
              <td className="py-1 px-2 border-r border-primary-border">{(index + 1)}</td>
              <td className="py-1 px-2 border-r border-primary-border text-cbs-highlight-color">
                {item?.name}
                {/* <p><i>{item?._id}</i></p>
                <NavLink className="text-primary" to={`/store/detailed-report/${item?._id}`}>
                  {item?.name}
                </NavLink> */}
              </td>
              <td className="py-1 px-2 border-r border-primary-border">{item?.unit}</td>
              <td className="py-1 px-2 border-r border-primary-border text-right">{formatNumberMoney(item?.quantityIncome)}</td>
              <td className="py-1 px-2 border-r border-primary-border text-right">{formatNumberMoney(item?.income)}</td>
              <td className="py-1 px-2 border-r border-primary-border text-right">{formatNumberMoney(item?.quantityExpense)}</td>
              <td className="py-1 px-2 border-r border-primary-border text-right">{formatNumberMoney(item?.expense)}</td>
              <td className="py-1 px-2 border-r border-primary-border text-right">{formatNumberMoney(item?.quantityIncome - item?.quantityExpense)}</td>
              <td className="py-1 px-2 border-r border-primary-border text-right">{formatNumberMoney(item?.income - item?.expense)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}