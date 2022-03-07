/*=====1.LIBRARY=====*/
import { FC, useState, useEffect } from "react";
import cn from "classnames";
import moment from 'moment'
import debounce from 'lodash/debounce';
/*=====2.CSS=====*/
import styles from "views/human/styles/style.module.css";
import 'swiper/swiper-bundle.min.css';
/*=====3.ICONS=====*/
import PolygonIcon from "assets/images/icon-polygon.svg";
/*=====4.PAGES/COMPONENTS=====*/
import { Paginate } from "shareComponents/common";
import { SearchInput } from "shareComponents/common";
/*=====5.TYPINGS=====*/
/*=====6.HOOKS/APIS=====*/
import { useHistoryTraffics } from 'services/hooks/personal/useHistoryTraffics';
/*=====7.OTHER=====*/
// import FinancialCashFlowFilterButton from "views/pages/financial/planning/components/FinancialCashFlow/FinancialCashFlowFilterButton";
// import ActionGroupFinancial from "views/pages/financial/planning/components/FinancialCashFlow/ActionGroupFinancial";

export const PersonalHistoriesPage: FC = () => {
  const [itemChecked, setItemChecked] = useState(false);
  const [pageParam, setPageParam] = useState('')
  const [prevCursor, setPrevCursor] = useState(['']);
  const [keyword, setKeyword] = useState('');
  const params = {limit: 10, lastestID: pageParam, keyword}
  const { listHistoryTraffics, totalRecord, totalPage, nextCursor, refetchListHistoryTraffics } = useHistoryTraffics(params, pageParam);

  const search = debounce(async (text)  => {
    setKeyword(text)
}, 500);

  useEffect(() => {
    if (!nextCursor) {
      return;
    }
    const isExist = prevCursor.find(item => item === nextCursor)
    if (!isExist) {
      setPrevCursor([...prevCursor, nextCursor])
    }
  }, [nextCursor]);

  const prevPageAction = () => {
    if (!nextCursor) {
      setPageParam(prevCursor[prevCursor.length - 2] || '')
    } else {
      const prev = prevCursor.findIndex(item => item === nextCursor)
      setPageParam(prevCursor[prev - 2] || '')
    }

  };

  const nextPageAction = () => {
    setPageParam(nextCursor)
  }
  useEffect(() => {
    refetchListHistoryTraffics()
  }, [])

  return (
    <main className="h-full">
      <header className="sticky top-0 z-10 flex items-center justify-between h-12 px-6 border border-primary-border">
        <div className="flex items-center">
          <p className="text-lg">Lịch sử truy cập</p>
          <SearchInput
            classNameWrapper="ml-4"
            classNameInput="outline-none w-[296px]"
            placeholder="Nhập từ khóa tìm kiếm"
            // eslint-disable-next-line no-console
            onChange={(event) => search(event.target.value)}
          />
          {/* <FinancialCashFlowFilterButton /> */}
          {itemChecked && (
            <div className="border-l-2 border-primary-border ml-5 pl-5">
              {/* <ActionGroupFinancial /> */}
            </div>
          )}
        </div>
      </header>

      <table className="table-fixed border-collapse w-full overflow-auto border-l border-r border-primary-border">
        <thead className="bg-cbs-table-header h-10 border-b border-primary-border">
          <tr className="text-left text-sm text-primary-gray">
            <th className={cn("pb-1 pt-1 text-center", styles.theadInput)}>
              <div className="border-r-2 border-gray-300 flex items-center justify-center">
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
            <th className="w-1/5 pb-1 pt-1">
              <div className="border-r-2 border-gray-300 font-normal pl-2">
                Họ và tên
              </div>
            </th>
            <th className="w-1/5 pb-1 pt-1 font-normal">
              <div className="border-r-2 border-gray-300 font-normal pl-2">
                Phân vùng
              </div>
            </th>
            <th className="w-1/12 pb-1 pt-1 font-normal">
              <div className="border-r-2 border-gray-300 font-normal pl-2">
                Ứng dụng
              </div>
            </th>
            <th className="w-1/12 pb-1 pt-1 font-normal">
              <div className="border-r-2 border-gray-300 font-normal pl-2">
                Tính năng
              </div>
            </th>
            <th className="w-1/12 pb-1 pt-1 font-normal">
              <div className="border-r-2 border-gray-300 font-normal pl-2">
                Thiết bị
              </div>
            </th>
            <th className="w-1/12 pb-1 pt-1 font-normal">
              <div className="font-normal pl-2">Thời gian truy cập</div>
            </th>
          </tr>
        </thead>

        <tbody className="bg-primary-light">
          {listHistoryTraffics?.length ? listHistoryTraffics.map((history, i) => (
            <tr key={history._id} className="border-b border-primary-border h-10">
              <td className="py-1 px-2 text-center">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="flexCheckDefault"
                  style={{ marginLeft: "-23px" }}
                  checked={itemChecked}
                  onClick={() => setItemChecked(!itemChecked)}
                />
              </td>
              <td className="py-1 px-2">{ history.userCreate?.fullname }</td>
              <td className="py-1 px-2">{ history.companyOfAuthor?.name }</td>
              <td className="py-1 px-2">{ history.app?.name }</td>
              <td className="py-1 px-2">{ history.menu?.name }</td>
              <td className="py-1 px-2">Mobile</td>
              <td className="py-1 px-2 text-primary">{ history.createdAt && moment(history.createdAt).format('DD/MM/YYYY hh:mm') }</td>
            </tr>
          )): null}
        </tbody>
      </table>

      <Paginate
        totalPages={totalPage}
        totalRecord={totalRecord} hasNextPage
        prevPageAction={() => prevPageAction()}
        nextPageAction={() => nextPageAction()} />
    </main>
  );
};
