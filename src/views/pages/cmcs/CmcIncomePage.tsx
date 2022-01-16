import { FC, useEffect, useState } from "react";

import { Link } from "react-router-dom";
import cn from "classnames";
import moment from "moment";
import { useModal } from "services/hooks/useModal";
import { CONTRACT_COME_IN_STATUS, DATE_FORMAT } from "apis/localdb/index";

import Paginate from "components/common/Paginate";
import SearchInput from "components/common/SearchInput";
import FinancialCashFlowFilterButton from "views/pages/financial/planning/components/FinancialCashFlow/FinancialCashFlowFilterButton";
import ActionGroupFinancial from "views/pages/financial/planning/components/FinancialCashFlow/ActionGroupFinancial";

import IncomeFormModal from "./components/views/income/IncomeFormModal";

import styles from "./styles.module.css";

import PolygonIcon from "assets/images/icon-polygon.svg";

import { UseContractIncomeList } from "services/hooks/useContractIncome";

const CmcIncome: FC = () => {
  const [itemChecked, setItemChecked] = useState(null);
  const [pageParam, setPageParam] = useState('');
  const [prevCursor, setPrevCursor] = useState([null]);

  const { openModal } = useModal();

  const contractIncome = UseContractIncomeList(pageParam);
  // console.log(contractIncome)

  const prevPageAction = () => {
    if (!contractIncome.nextCursor) {
      setPageParam(prevCursor[prevCursor.length-2] || '')
    } else {
      const prev = prevCursor.findIndex(item => item === contractIncome.nextCursor)
      setPageParam(prevCursor[prev-2] || '')
    }
    
  };

  useEffect(() => {
    if (!contractIncome.nextCursor) {
      return;
    }
    const isExist = prevCursor.find(item => item === contractIncome.nextCursor )
    if (!isExist) {
      setPrevCursor([...prevCursor, contractIncome.nextCursor])      
    }
  }, [contractIncome.nextCursor]);

  const nextPageAction = () => {
    setPageParam(contractIncome.nextCursor)    
  }

  const getStatusValue = (value: number) => {
    return CONTRACT_COME_IN_STATUS.find(item => item.value === value)?.text ;
    
  }

  return (
    <main className="relative h-full">
      <header className="sticky top-0 bg-primary-light z-10 flex items-center justify-between h-12 px-6 border border-primary-border">
        <div className="flex items-center">
          <p className="text-lg">Hợp đồng bán ra</p>
          <SearchInput
            classNameWrapper="ml-4"
            classNameInput="outline-none w-[296px]"
            // eslint-disable-next-line no-console
            onChange={(event) => console.log(event.target.value)}
          />
          <FinancialCashFlowFilterButton />
          {itemChecked && (
            <div className="border-l-2 border-primary-border ml-5 pl-5">
              <ActionGroupFinancial />
            </div>
          )}
        </div>
        <button
          className="flex items-center justify-center text-primary-light bg-cbs-green w-[85px] h-8 rounded font-bold"
          onClick={() =>
            openModal(
              <div
                className={
                  "inline-block w-[900px] h-[800px] my-8 overflow-hidden text-left align-middle transition-all transform bg-primary-light shadow-xl"
                }
              >
                <IncomeFormModal />
              </div>
            )
          }
        >
          Tạo mới
        </button>
      </header>

      <table className="table-fixed border-collapse w-full overflow-auto border-l border-r border-primary-border">
        <thead className="bg-cbs-table-header h-[50px] border-b border-primary-border">
          <tr className="text-left text-sm text-primary-gray">
            <th className={cn("pb-1 pt-1 text-center", styles.theadInput)}>
              <div className="border-r-2 border-gray-300 flex items-center justify-center">
                <input
                  className="form-check-input mr-2"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                />
                <img src={PolygonIcon} alt="Polygon" />
              </div>
            </th>
            <th className="w-1/5 pb-1 pt-1">
              <div className="border-r-2 border-gray-300 font-normal pl-2">
                Hợp đồng
              </div>
            </th>
            <th className={cn("pb-1 pt-1 font-normal", styles.theadSignDate)}>
              <div className="border-r-2 border-gray-300 font-normal pl-2">
                Ngày ký
              </div>
            </th>
            <th className={cn("pb-1 pt-1 font-normal", styles.theadTenPercent)}>
              <div className="border-r-2 border-gray-300 font-normal pl-2">
                Giá trị ký + phát sinh (gồm cả VAT)
              </div>
            </th>
            <th className={cn("pb-1 pt-1 font-normal", styles.theadTenPercent)}>
              <div className="border-r-2 border-gray-300 font-normal pl-2">
                Giá trị nghiệm thu hoàn thành
              </div>
            </th>
            <th className={cn("pb-1 pt-1 font-normal", styles.theadTenPercent)}>
              <div className="border-r-2 border-gray-300 font-normal pl-2">
                Giá trị xuất hóa đơn (VAT)
              </div>
            </th>
            <th className={cn("pb-1 pt-1 font-normal", styles.theadTenPercent)}>
              <div className="border-r-2 border-gray-300 font-normal pl-2">
                Giá trị đề nghị tạm ứng+thanh toán
              </div>
            </th>
            <th className={cn("pb-1 pt-1 font-normal", styles.theadTenPercent)}>
              <div className="border-r-2 border-gray-300 font-normal pl-2">
                Giá trị đã tạm ứng, thanh toán
              </div>
            </th>
            <th className={cn("pb-1 pt-1 font-normal", styles.theadTenPercent)}>
              <div className="border-r-2 border-gray-300 font-normal pl-2">
                Còn lại phải thanh toán
              </div>
            </th>
            <th className={cn("pb-1 pt-1 font-normal", styles.theadTenPercent)}>
              <div className="font-normal pl-2">Tình trạng</div>
            </th>
          </tr>
        </thead>

        <tbody>
          {contractIncome?.listContractIncome?.map((item: any) => {
            // console.log(item)
            return (
              <tr  key={item._id} className="border-b border-primary-border h-[50px]">
                <td className="py-1 px-2 text-center">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                    checked={itemChecked === item._id}
                    onChange={() => setItemChecked(item._id)}
                    style={{ marginLeft: "-23px" }}
                  />
                </td>
                <Link to={"/cmcs/contract/"+(item._id)+"/home"}>
                  <td className="py-1 px-2">
                    {item.name}
                    <p className="text-primary-gray">{item.project.sign} | {item.sign}</p>
                  </td>
                </Link>
                <td className="py-1 px-2">              {moment(item.createAt).isValid() &&
                moment(item.createAt).format(DATE_FORMAT)}</td>
                <td className="py-1 px-2">{(item.value || 0) + (item.vatValue || 0) + (item.plus || 0) + (item.vatPlus|| 0)} </td>
                <td className="py-1 px-2">{(item.acceptance || 0) + (item.vatAcceptance || 0) + (item.plusAcceptance || 0) + (item.vatPlusAcceptance|| 0)}</td>
                <td className="py-1 px-2">0</td>
                <td className="py-1 px-2">{item.recommendedPayment || 0}</td>
                <td className="py-1 px-2">{(item.advancePaymentPaid || 0) + (item.amountPaid|| 0)}</td>
                <td className="py-1 px-2">{item.remainingPayment || 0}</td>
                <td className="py-1 px-2">{getStatusValue(item.status)}</td>
              </tr>
            )
          })
          }
        </tbody>
      </table>

      <Paginate totalPages={contractIncome.totalPage} totalRecord={contractIncome.totalRecord} hasNextPage prevPageAction={()=>prevPageAction()} nextPageAction={()=>nextPageAction()}/>
    </main>
  );
};

export default CmcIncome;
