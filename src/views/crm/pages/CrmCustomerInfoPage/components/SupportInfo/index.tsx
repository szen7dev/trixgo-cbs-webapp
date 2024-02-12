import React, { FC, memo, useState } from "react";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { formatNumberMoney } from "utils/cmcs";
import type { Human } from 'typings/human';
import PaginateV2 from "shareComponents/common/PaginateV2";

import { useFnbCustomerBooking } from "services/hooks/fnb/useFnbCustomerBooking";
import { useFnbCustomerCare, useCustomerJourneyByProperty } from "services/hooks/fnb/useFnbCustomerCare";

type Props = {
  info: Human
};

export const SupportInfo: FC<Props> = memo((props) => {
  const { info } = props;
  // console.log(info)

  type PaginateHandle = React.ElementRef<typeof PaginateV2>;
  const ref = React.useRef<PaginateHandle>(null);
  const [pageIndex, setPageIndex] = useState(0);

  const { listDataWithPager, isLoading, totalRecord, totalPage, fetchNextPage, hasNextPage, refetch } = useFnbCustomerCare({
      params: { 
          // option: 1,
          // keyword, 
          // status,
          // type,
          // channel,
          // journeyID,
          customerID: info._id,
          // userCreateID: userID,
          // managerID,
          // fromDate: inputFilter.fromDate,
          // toDate: inputFilter.toDate,
          limit: 20,
          populates: JSON.stringify({
              path: 'userCreate userUpdate customer mistake journey funda order manager images',
              select: '_id image name sign phone taxid address fullname createAt author path',
              populate: {
                path: 'author',
                select: 'fullname bizfullname image'
              }
          }),
      },
      isFetchList: true
  })
console.log(listDataWithPager)

  return (
    <div className="px-4">
      {/* Đặt lịch, lịch hẹn */}
      <div className={"flex-1 flex items-center justify-end"}>
        <p className="text-bold text-primary-gray text-lg mb-2 mt-5">Chăm sóc khách hàng ({totalRecord})</p>
            <PaginateV2
              ref={ref}
              totalRecord={totalRecord}
              totalPages={totalPage}
              limit={10}
              hasNextPage={hasNextPage}
              isFetching={isLoading}
              nextPageAction={() => {
                fetchNextPage();
                setPageIndex(oldState => oldState + 1)
              }}
              prevPageAction={() => {
                setPageIndex(oldState => oldState - 1)
              }}
            />
          </div>
      <div className="">
        {
          (listDataWithPager[pageIndex] ?? []).map((item: any, i: any) => (
            <p className="mb-2" key={item._id}>{item.name}</p>
          ))}
      </div>
    </div>
  );
});

SupportInfo.displayName = "SupportInfo"