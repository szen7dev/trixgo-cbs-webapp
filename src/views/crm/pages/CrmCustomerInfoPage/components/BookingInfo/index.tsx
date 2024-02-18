import React, { FC, memo, useState } from "react";
import { useTranslation } from "react-i18next";
import moment, { months } from "moment";
import { formatNumberMoney } from "utils/cmcs";
import type { Human } from 'typings/human';
import PaginateV2 from "shareComponents/common/PaginateV2";

import { useFnbCustomerBooking } from "services/hooks/fnb/useFnbCustomerBooking";

type Props = {
  info: Human
};

export const BookingInfo: FC<Props> = memo((props) => {
  const { info } = props;

  type PaginateHandle = React.ElementRef<typeof PaginateV2>;
  const ref = React.useRef<PaginateHandle>(null);
  const [pageIndex, setPageIndex] = useState(0);

  const { listDataWithPager, isLoading, totalRecord, totalPage, fetchNextPage, hasNextPage, refetch } = useFnbCustomerBooking({
      params: { 
          option: 1,
          customerID: info._id,
          limit: 20,
          populates: JSON.stringify({
              path: 'userCreate userUpdate customer mistake journey funda order manager images assignee',
              select: '_id image name sign phone taxid address fullname createAt author path',
              populate: {
                path: 'author',
                select: 'fullname image'
              }
          }),
      },
      isFetchList: true
  })

  return (
    <div className="px-4">
      {/* Đặt lịch, nhắc hẹn */}
      <div className={"flex-1 flex items-center justify-end"}>
        <p className="text-bold text-primary-gray text-lg mb-2 mt-5">A3. Đặt lịch, nhắc hẹn ({totalRecord})</p>
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
            <p className="mb-2 text-cbs-highlight-color text-[14px] border-b" key={item._id}>
              {item.name} - {moment(item.date).format('DD/MM/YYYY HH:mm')} - Thực hiện: {item?.assignee?.fullname}
            </p>
          ))
        }
      </div>
      <div className="border-b-8 border-accent-light px-4 mt-2"></div>
    </div>
  );
});

BookingInfo.displayName = "BookingInfo"