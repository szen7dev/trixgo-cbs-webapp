import React, { FC, memo, useState } from "react";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { formatNumberMoney } from "utils/cmcs";
import type { Human } from 'typings/human';
import PaginateV2 from "shareComponents/common/PaginateV2";

import { useCashPayment } from "services/hooks/financial/useCashPayment";

type Props = {
  info: Human
};

export const PaymentInfo: FC<Props> = memo((props) => {
  const { info } = props;

  type PaginateHandle = React.ElementRef<typeof PaginateV2>;
  const ref = React.useRef<PaginateHandle>(null);
  const [pageIndex, setPageIndex] = useState(0);

  const { listDataWithPager, isLoading, totalRecord, totalPage, fetchNextPage, hasNextPage, refetch } = useCashPayment({
      params: { 
          // keyword, 
          customerID: info._id,
          // userCreateID: userID,
      },
      isFetchList: true
  })

  return (
    <div className="px-4">
      {/* Gói mua trả trước */}
      <div className={"flex-1 flex items-center justify-end"}>
        <p className="text-bold text-primary-gray text-lg mb-2 mt-5">A7. Gói mua trả trước ({totalRecord})</p>
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
            <p className="mb-2 text-cbs-highlight-color text-[14px]" key={item._id}>
              {moment(item.createAt).format('DD/MM/YYY HH:mm')} - {item.name} - {formatNumberMoney(item?.amount)}
            </p>
          ))}
      </div>
      <div className="border-b-8 border-accent-light px-4 mt-2"></div>

      {/* Thanh toán và công nợ */}
      <p className="text-bold text-primary-gray text-lg mb-2 mt-5">A8. Thanh toán và công nợ</p>
      <div className="text-[13px]">

      </div>
      <div className="border-b-8 border-accent-light px-4 mt-2"></div>
    </div>
  );
});

PaymentInfo.displayName = "PaymentInfo"