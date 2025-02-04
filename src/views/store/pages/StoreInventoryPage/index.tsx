import React, { FC, useState, useCallback } from "react";
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
import styles from 'views/accounting/styles/styles.module.css';
import cn from "classnames";
import { FilterDateGroup }  from "views/accounting/shareComponents/common";
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

  const today = new Date()
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth()+1, 0)
  const currentMonth = new Date().getMonth()
  const [inputFilter, setInputFilter] = useState({
    fromDate: new Date(new Date().getFullYear(), currentMonth-1, 1),
    toDate: lastDayOfMonth
  })

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
    userCreateID: userID,
    fromDate: inputFilter.fromDate,
    toDate: inputFilter.toDate,
  })

  let tonDauKy = 0, nhapTrongKy = 0, xuatTrongKy = 0, tonCuoiKy = 0
  let klTonDauKy = 0, klNhapTrongKy = 0, klXuatTrongKy = 0, klTonCuoiKy = 0
  if(data && data?.data){
    for(const item of data?.data){
      tonDauKy = tonDauKy + item.kcNoDauKy + item.noDauKy - item.kcCoDauKy - item.coDauKy
      nhapTrongKy = nhapTrongKy + item.noTrongKy
      xuatTrongKy = xuatTrongKy + item.coTrongKy
      tonCuoiKy = tonCuoiKy + item.kcNoDauKy + item.noDauKy + item.noTrongKy - item.kcCoDauKy - item.coDauKy - item.coTrongKy

      klTonDauKy = klTonDauKy + item.klKcNoDauKy + item.klNoDauKy - item.klKcCoDauKy - item.klCoDauKy
      klNhapTrongKy = klNhapTrongKy + item.klNoTrongKy
      klXuatTrongKy = klXuatTrongKy + item.klCoTrongKy
      klTonCuoiKy = klTonCuoiKy + item.klKcNoDauKy + item.klNoDauKy + item.klNoTrongKy - item.klCoTrongKy- item.klKcCoDauKy - item.klCoDauKy
    }
  }

  const handleOnChangeDate = useCallback((date, input) => {
  if (input) {
    setInputFilter((value) => ({ ...value, toDate: date }))
  } else {
    setInputFilter((value) => ({ ...value, fromDate: date }))
  }
  }, [])

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
          filterParams: {
              option: param.option,
              type,
              projectID,
              warehouseID,
              customerID,
              goodsID,
              assetsID,
              userCreateID: userID
          }
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

        <div className="flex items-center">
          <FilterDateGroup fromDate={inputFilter.fromDate} endDate={inputFilter.toDate} onChangeDate={handleOnChangeDate} />
        </div>
        <button className={"flex items-center justify-center mx-1"} onClick={() => handleExportByFilter({option: 1})}>
            Download <img src={downloadIcon} alt={"-----"} className={"ml-2 w-[18px] h-[18px]"}/>
        </button>
      </div>

      <table className="table-fixed border-collapse w-full overflow-auto border-l border-r border-primary-border">
        <thead className="bg-cbs-table-header h-10 border-b border-primary-border">
          <tr className="text-left text-sm text-primary-gray">
            <th className="py-1 px-2 font-normal border-r border-primary-border w-1/6">
              Sản phẩm, nguyên liệu
            </th>
            <th className="py-1 px-2 font-normal border-r border-primary-border">
              Đơn vị
            </th>
            <th colSpan={3} className="px-2 font-normal border-r border-l border-b border-primary-border text-center">
              Tồn đầu kỳ
            </th>
            <th colSpan={3} className="px-2 font-normal border-r border-l border-b border-primary-border text-center">
              Nhập trong kỳ
            </th>
            <th colSpan={3} className="px-2 font-normal border-r border-l border-b border-primary-border text-center">
              Xuất trong kỳ
            </th>
            <th colSpan={3} className="px-2 font-normal border-r border-l border-b border-primary-border text-center">
              Tồn cuối kỳ
            </th>
          </tr>
          <tr className="text-left text-sm text-primary-gray">
            <th className="py-1 px-2 font-normal border-r border-primary-border">
             
            </th>
            <th className="py-1 px-2 font-normal border-r border-primary-border">
              
            </th>
            <th className="px-2 font-normal border-r border-l border-b border-primary-border text-right">
              SL
            </th>
            <th className="px-2 font-normal border-r border-l border-b border-primary-border text-right">
              Đơn giá
            </th>
            <th className="px-2 font-normal border-r border-l border-b border-primary-border text-right">
             Thành tiền
            </th>
            <th className="px-2 font-normal border-r border-l border-b border-primary-border text-right">
              SL
            </th>
            <th className="px-2 font-normal border-r border-l border-b border-primary-border text-right">
              Đơn giá
            </th>
            <th className="px-2 font-normal border-r border-l border-b border-primary-border text-right">
             Thành tiền
            </th>
            <th className="px-2 font-normal border-r border-l border-b border-primary-border text-right">
              SL
            </th>
            <th className="px-2 font-normal border-r border-l border-b border-primary-border text-right">
              Đơn giá
            </th>
            <th className="px-2 font-normal border-r border-l border-b border-primary-border text-right">
             Thành tiền
            </th>
            <th className="px-2 font-normal border-r border-l border-b border-primary-border text-right">
              SL
            </th>
            <th className="px-2 font-normal border-r border-l border-b border-primary-border text-right">
              Đơn giá
            </th>
            <th className="px-2 font-normal border-r border-l border-b border-primary-border text-right">
             Thành tiền
            </th>
          </tr>
        </thead>

        <tbody className="">
          { 
            (data?.data?.map((item: any, index: any) => {
                let donGiaTonDauKy = 0, donGiaNhapTrongKy = 0, donGiaXuatTrongKy = 0, donGiaTonCuoiKy = 0

                if(Number(item.klKcNoDauKy + item.klNoDauKy - item.klKcCoDauKy - item.klCoDauKy) != 0){
                  donGiaTonDauKy = Number(item.kcNoDauKy + item.noDauKy - item.kcCoDauKy - item.coDauKy)/Number(item.klKcNoDauKy + item.klNoDauKy - item.klKcCoDauKy - item.klCoDauKy)
                }
                if(Number(item.klNoTrongKy) != 0){
                  donGiaNhapTrongKy = Number(item.noTrongKy)/Number(item.klNoTrongKy)
                }
                if(Number(item.klCoTrongKy) != 0){
                  donGiaXuatTrongKy = Number(item.coTrongKy)/Number(item.klCoTrongKy)
                }
                if(Number(item.klKcNoDauKy + item.klNoDauKy + item.klNoTrongKy - item.klKcCoDauKy - item.klCoDauKy - item.klCoTrongKy) != 0){
                  donGiaTonCuoiKy = Number(item.kcNoDauKy + item.noDauKy + item.noTrongKy - item.kcCoDauKy - item.coDauKy - item.coTrongKy)/Number(item.klKcNoDauKy + item.klNoDauKy + item.klNoTrongKy - item.klKcCoDauKy - item.klCoDauKy - item.klCoTrongKy)
                }

                return(
                  <tr key={index} className="border-b border-primary-border h-10">
                    <td className="py-1 px-2 border-r border-primary-border text-cbs-highlight-color">
                      {/* <NavLink to={`/accounting/import-export/acc/${params.accountID}/prod/${item?._id}`}>
                        {item.name}
                      </NavLink> */}
                      {item.name}
                    </td>
                    <td className="py-1 px-2 border-r border-primary-border">
                        {item?.unit}
                    </td>
                    <td className="py-1 px-2 border-r border-primary-border text-right">
                      {formatNumberMoney(Number(item.klKcNoDauKy + item.klNoDauKy - item.klKcCoDauKy - item.klCoDauKy))}
                    </td>
                    <td className="py-1 px-2 border-r border-primary-border text-right">
                      {formatNumberMoney(donGiaTonDauKy)}
                    </td>
                    <td className="py-1 px-2 border-r border-primary-border text-right">
                      {formatNumberMoney(Number(item.kcNoDauKy + item.noDauKy - item.kcCoDauKy - item.coDauKy))}
                    </td>
                    <td className="py-1 px-2 border-r border-primary-border text-right">
                      {formatNumberMoney(item.klNoTrongKy)}
                    </td>
                    <td className="py-1 px-2 border-r border-primary-border text-right">
                      {formatNumberMoney(donGiaNhapTrongKy)}
                    </td>
                    <td className="py-1 px-2 border-r border-primary-border text-right">
                      {formatNumberMoney(Number(item.noTrongKy))}
                    </td>
                    <td className="py-1 px-2 border-r border-primary-border text-right">
                      {formatNumberMoney(item.klCoTrongKy)}
                    </td>
                    <td className="py-1 px-2 border-r border-primary-border text-right">
                      {formatNumberMoney(donGiaXuatTrongKy)}
                    </td>
                    <td className="py-1 px-2 border-r border-primary-border text-right">
                      {formatNumberMoney(Number(item.coTrongKy))}
                    </td>
                    <td className="py-1 px-2 border-r border-primary-border text-right">
                      {formatNumberMoney(Number(item.klKcNoDauKy + item.klNoDauKy + item.klNoTrongKy - item.klKcCoDauKy - item.klCoDauKy - item.klCoTrongKy))}
                    </td>
                    <td className="py-1 px-2 border-r border-primary-border text-right">
                      {formatNumberMoney(donGiaTonCuoiKy)}
                    </td>
                    <td className="py-1 px-2 border-r border-primary-border text-right">
                      {formatNumberMoney(Number(item.kcNoDauKy + item.noDauKy + item.noTrongKy - item.kcCoDauKy - item.coDauKy - item.coTrongKy).toFixed(0))}
                    </td>
                  </tr>
                )
              }
            ))
          }
          
            <tr className={cn(
              "border-b border-primary-border h-10 font-bold",
              styles.bgFooterYellow
            )}>
              <td className="py-1 px-2 border-r border-primary-border text-cbs-highlight-color">
                Tổng
              </td>
              <td className="py-1 px-2 border-r border-primary-border text-right">
                  
              </td>
              <td className="py-1 px-2 border-r border-primary-border text-right">
                {formatNumberMoney(klTonDauKy)}
              </td>
              <td className="py-1 px-2 border-r border-primary-border text-right">
                  
              </td>
              <td className="py-1 px-2 border-r border-primary-border text-right">
                {formatNumberMoney(tonDauKy)}
              </td>
              <td className="py-1 px-2 border-r border-primary-border text-right">
                {formatNumberMoney(klNhapTrongKy)}
              </td>
              <td className="py-1 px-2 border-r border-primary-border text-right">
                  
              </td>
              <td className="py-1 px-2 border-r border-primary-border text-right">
                {formatNumberMoney(nhapTrongKy)}
              </td>
              <td className="py-1 px-2 border-r border-primary-border text-right">
                {formatNumberMoney(klXuatTrongKy)}
              </td>
              <td className="py-1 px-2 border-r border-primary-border text-right">
                  
              </td>
              <td className="py-1 px-2 border-r border-primary-border text-right">
                {formatNumberMoney(xuatTrongKy)}
              </td>
              <td className="py-1 px-2 border-r border-primary-border text-right">
                {formatNumberMoney(klTonCuoiKy)}
              </td>
              <td className="py-1 px-2 border-r border-primary-border text-right">
                  
              </td>
              <td className="py-1 px-2 border-r border-primary-border text-right">
                {formatNumberMoney(tonCuoiKy.toFixed(0))}
              </td>
            </tr>
        </tbody>
      </table>
      
    </div>
  )
}