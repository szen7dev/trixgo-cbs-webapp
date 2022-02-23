import { FC, useCallback, useEffect, useState } from "react";

import cn from "classnames";

import { SearchInput, Paginate, Popover } from "shareComponents/common";
import { DropdownFilterButton } from "views/cmcs/shareComponents/common";
import styles from 'views/cmcs/styles/styles.module.css';

import PolygonIcon from "assets/images/icon-polygon.svg";
import moment from "moment";
import { DATE_FORMAT } from "apis/localdb/index";

import { UseContractGuaranteeList } from "services/hooks/useContractIncome";

export const CmcGuaranteePage: FC = () => {
  const [pageParam, setPageParam] = useState('');
  const [prevCursor, setPrevCursor] = useState([null]);
  const contractGuarantee = UseContractGuaranteeList(pageParam);

  const prevPageAction = () => {
    if (!contractGuarantee.nextCursor) {
      setPageParam(prevCursor[prevCursor.length - 2] || '')
    } else {
      const prev = prevCursor.findIndex(item => item === contractGuarantee.nextCursor)
      setPageParam(prevCursor[prev - 2] || '')
    }

  };

  useEffect(() => {
    if (!contractGuarantee.nextCursor) {
      return;
    }
    const isExist = prevCursor.find(item => item === contractGuarantee.nextCursor)
    if (!isExist) {
      setPrevCursor([...prevCursor, contractGuarantee.nextCursor])
    }
  }, [contractGuarantee.nextCursor]);

  const nextPageAction = () => {
    setPageParam(contractGuarantee.nextCursor)
  }

  const handleOnFilter = useCallback((values) => {
    console.log('🚀 ~ handleOnFilter ~ values', values)

    // setPageParam(() => ({ ...values }));
    return true;
  }, []);

  const handleOnCancelFilter = useCallback(() => {
    // setPageParam({});
  }, []);

  return (
    <main className="relative h-full">
      <header className="sticky top-0 bg-primary-light z-10 flex items-center justify-between h-12 px-6 border border-primary-border">
        <div className="flex items-center">
          <p className="text-lg">Theo dõi bảo lãnh</p>
          <SearchInput
            classNameWrapper="ml-4"
            classNameInput="outline-none w-[296px]"
            // eslint-disable-next-line no-console
            onChange={(event) => console.log(event.target.value)}
          />
          <DropdownFilterButton
            onSubmit={handleOnFilter}
            onCancel={handleOnCancelFilter}
            initialValues={{}}
          />
        </div>
        <button className="flex items-center justify-center text-primary-light bg-cbs-green w-[85px] h-8 rounded font-bold">
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
            <th className={cn("pb-1 pt-1", styles.theadContract)}>
              <div className="border-r-2 border-gray-300 font-normal pl-2">
                Hợp đồng
              </div>
            </th>
            <th className={cn("pb-1 pt-1 font-normal", styles.theadTenPercent)}>
              <div className="border-r-2 border-gray-300 font-normal pl-2">
                Loại bảo lãnh
              </div>
            </th>
            <th
              className={cn(
                "pb-1 pt-1 font-normal",
                styles.theadSignDateLonger
              )}
            >
              <div className="border-r-2 border-gray-300 font-normal pl-2">
                Thời hạn bảo lãnh
              </div>
            </th>
            <th className={cn("pb-1 pt-1 font-normal", styles.theadTenPercent)}>
              <div className="border-r-2 border-gray-300 font-normal pl-2">
                Giá trị bảo lãnh
              </div>
            </th>
            <th className={cn("pb-1 pt-1 font-normal w-1/5")}>
              <div className="border-r-2 border-gray-300 font-normal pl-2">
                Người phụ trách
              </div>
            </th>
            <th className={cn("pb-1 pt-1 font-normal w-1/5")}>
              <div className="font-normal pl-2">Ghi chú</div>
            </th>
          </tr>
        </thead>

        <tbody>

          {contractGuarantee?.listContractIncome?.map((item: any) => {
            return (
              <tr key={item._id} className="border-b border-primary-border h-[50px]">
                <td className="py-1 pl-1 text-center">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                    style={{ marginLeft: "-25px" }}
                  />
                </td>
                <td className="py-1 px-2">
                  <Popover onMouseEnterTooltip={false} tooltip={`${item?.project?.sign}.${item.name}`} classTooltip="w-[404px] whitespace-normal" >
                    <p className="text-1-line-clamp">{`${item.project.sign}.${item.name}`}</p>
                  </Popover>

                  <p className="text-primary-gray">{`${item.sign}`} | Ngày ký: {moment(item.date).isValid() && moment(item.date).format(DATE_FORMAT)}</p>
                </td>
                <td className="py-1 px-2">Bảo lãnh tạm ứng</td>
                <td className="py-1 px-2">{moment(item.expiredAg).isValid() && moment(item.expiredAg).format(DATE_FORMAT)}</td>
                <td className="py-1 px-2">{item.agValue}</td>
                <td className="py-1 px-2">{item.personInCharge?.name}</td>
                <td className="py-1 px-2">{item.note}</td>
              </tr>
            )
          })}
        </tbody>
      </table>

      <Paginate totalPages={contractGuarantee.totalPage}
        totalRecord={contractGuarantee.totalRecord}
        hasNextPage
        prevPageAction={() => prevPageAction()}
        nextPageAction={() => nextPageAction()} />

    </main>
  );
};
