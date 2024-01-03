import React, { FC, useState, useCallback, useEffect } from "react";

// import DatePicker from "react-datepicker";
// import cn from "classnames";
// import { DropdownSearchable, } from "shareComponents/common";
// import ThreeDotsVertical from "assets/images/icon-3dots-vertical-gray.svg";
// import PolygonIcon from "assets/images/icon-polygon.svg";
// import styles from 'views/accounting/styles/styles.module.css';

import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";

import { FilterDateGroup } from "views/accounting/shareComponents/common";
import {debounce} from "lodash";
import { DropdownSearchableV2 } from "shareComponents/common";
import { useFunda } from "services/hooks/items/useFunda";

import {
	useQueryListAccount,
} from "services/hooks/cmcs/useContractIncome";

const CostAnalysis: FC = () => {
  type DropdownHandle = React.ElementRef<typeof DropdownSearchableV2>;
  const accountRef = React.useRef<DropdownHandle>(null);

  const [fundaID, setFundaID,] = useState<string | null>();
  const [fundaKeyword, setFundaKeyword] = useState("");

  const [accountID, setAccountID,] = useState<string | null>();
  const [searchAccount, setSearchAccount] = useState();

  const [inputFilter, setInputFilter] = useState({ keyword: '', fromDate: new Date(new Date().getFullYear(), 0, 1), toDate: new Date(new Date().getFullYear(), 11, 31) });

  const { list: listFunda } = useFunda({
		params: { keyword: fundaKeyword },
    isFetchList: true
	})

	const { listAccount } = useQueryListAccount({
		limit: 10,
		keyword: searchAccount,
		option: 1,
	});

  const handleOnChangeDate = useCallback((date, input) => {
    if (input) {
      setInputFilter((value) => ({ ...value, toDate: date }))
    } else {
      setInputFilter((value) => ({ ...value, fromDate: date }))
    }
   }, [])
  //  console.log({fundaID, accountID, fromDate: inputFilter.fromDate, toDate: inputFilter.toDate})

  return (
    <main className="h-full bg-cbs-gray p-4">
      <section className="px-8 py-6 bg-primary-light flex items-center">
        <p className="text-lg font-bold text-primary-gray mr-5">Phân tích giá vốn</p>
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
                setFundaID("");
              }}
              onchangeValue={item => {
                setFundaID(item._id);
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
              data={listAccount}
              formatItem={{
                  id: "_id",
                  text: "name",
                  description: "description",
              }}
              onSearchInputChange={debounce(
                  (valueSearch) => setSearchAccount(valueSearch),
                  500
              )}
              onClearData={() => {
                setAccountID("");
              }}
              onchangeValue={item => {
                setAccountID(item._id);
              }}
              renderItem={(item) => (
                  <p className={"min-w-[300px]"}>{item.text}-{item.description}</p>
              )}
              selectOneByOne={true}
          />
          <div className="flex items-center">
            <FilterDateGroup fromDate={inputFilter.fromDate} endDate={inputFilter.toDate} onChangeDate={handleOnChangeDate} />
          </div>
          <button className="bg-primary text-[15px] rounded w-[90px] h-[32px] text-primary-light hover:opacity-90">
            Cập nhật
          </button>
      </section>

      <section className="bg-primary-light mt-4 h-screen">
        <div className="flex items-center justify-between px-6 h-[53px]">
          <p className="text-lg">
            Kiểm tra hàng hóa xuất âm kho khi chạy giá vốn
          </p>
          {/* <div className="h-10 w-10 rounded-full bg-cbs-table-header flex items-center justify-center">
            <img src={ThreeDotsVertical} alt="Three Dots" />
          </div> */}
        </div>

        {/* <table className="table-auto w-full text-left">
          <thead className="h-10 bg-cbs-table-header">
            <tr>
              <th className={cn("text-center", styles.theadInput)}>
                <div className="flex items-center justify-center border-r-2 border-primary-border">
                  <input
                    className="form-check-input mr-2"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                    defaultChecked
                  />
                  <img src={PolygonIcon} alt="Polygon" />
                </div>
              </th>
              <th>
                <p className="border-r-2 border-primary-border pl-2 font-normal">
                  Hàng hóa/Nguyên vật liệu số liệu Xuất
                </p>
              </th>
              <th className="w-1/12 pl-2">
                <p className="border-r-2 border-primary-border font-normal">
                  Mã hiệu
                </p>
              </th>
              <th className="w-1/6 pl-2">
                <p className="font-normal">Kho</p>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-primary-border h-11">
              <td className="py-1 px-2 text-center">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                  style={{ marginLeft: "-21px" }}
                />
              </td>
              <td>Demo............</td>
              <td>Demo</td>
              <td>Demo</td>
            </tr>
          </tbody>
        </table> */}

      </section>
    </main>
  );
};

export default CostAnalysis