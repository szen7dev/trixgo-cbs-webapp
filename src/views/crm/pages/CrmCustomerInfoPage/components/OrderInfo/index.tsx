import React, { FC, memo, useState } from "react";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { formatNumberMoney } from "utils/cmcs";
import type { Human } from 'typings/human';
import PaginateV2 from "shareComponents/common/PaginateV2";

import { useFnbOrder } from 'services/hooks/fnb/useFnbOrder';

type Props = {
  info: Human
};

export const OrderInfo: FC<Props> = memo((props) => {
  const { info } = props;
  // console.log(info)

  type PaginateHandle = React.ElementRef<typeof PaginateV2>;
  const ref = React.useRef<PaginateHandle>(null);
  const [pageIndex, setPageIndex] = useState(0);

  const { isLoading, isFetching, fetchNextPage, hasNextPage, totalRecord, listWithPager, totalPage, refetch } = useFnbOrder({
    params: {
      // type: +type,
      limit: 10,
      // keyword,
      customerID: info._id,
      populates: JSON.stringify({
        path: 'funda shift customer files',
        select: "name path nameOrg author sign address fullname phone numberOfOrders",
      })
    }, isFetchList: true, isFetchInfo: false
  })

  // console.log(listWithPager)

  return (
    <div className="px-4">
      {/* Đơn hàng */}
      <div className={"flex-1 flex items-center justify-end"}>
        <p className="text-bold text-primary-gray text-lg mb-2 mt-5">A4. Đơn hàng khách mua ({totalRecord})</p>
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
          (listWithPager[pageIndex] ?? []).map((item: any, i: any) => (
            <p className="mb-2 text-cbs-highlight-color text-[14px]" key={item._id}>
              {item.name} | {moment(item.createAt).format('DD/MM/YYYY HH:mm')} | {formatNumberMoney(item?.amount)}
            </p>
          ))}
      </div>
      <div className="border-b-8 border-accent-light px-4 mt-2"></div>
    </div>
  );
});

OrderInfo.displayName = "OrderInfo"