import React, { FC, memo, useState } from "react";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { formatNumberMoney } from "utils/cmcs";
import type { Human } from 'typings/human';
import PaginateV2 from "shareComponents/common/PaginateV2";
import { useFnbNetworkCom } from "services/hooks/fnb/useFnbNetworkCom";

type Props = {
  info: Human
};

export const AffiliateInfo: FC<Props> = memo((props) => {
  const { info } = props;

  type PaginateHandle = React.ElementRef<typeof PaginateV2>;
  const ref = React.useRef<PaginateHandle>(null);
  const [pageIndex, setPageIndex] = useState(0);

  const { listDataWithPager, isLoading, totalRecord, totalPage, fetchNextPage, hasNextPage, refetch } = useFnbNetworkCom({
      params: { 
          option: 1,
          saleID: info._id,
          uplineID: info._id,
          limit: 20,
          populates: JSON.stringify({
              path: 'sale order userCreate',
              select: '_id image name sign phone fullname',
          }),
      },
      isFetchList: true
  })

  return (
    <div className="px-4">
      {/* Tiếp thị liên kết */}
      <div className={"flex-1 flex items-center justify-end"}>
        <p className="text-bold text-primary-gray text-lg mb-2 mt-5">A6. Tiếp thị liên kết ({totalRecord})</p>
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
      
      <div className="text-[13px]">
        <p className="text-primary-gray"><i>Các đơn hàng do khách bán hoặc cấp dưới của khách bán | Tuyến dưới của khách hàng xây dựng</i></p>
      </div>
      <div className="">
        {
          (listDataWithPager[pageIndex] ?? []).map((item: any, i: any) => (
            <p className="mb-2 text-cbs-highlight-color text-[14px]" key={item._id}>
              {item?.order?.name} | {moment(item.createAt).format('DD/MM/YYYY HH:mm')} | {formatNumberMoney(item?.amount)} | Tỷ lệ hoa hồng: {item?.rate} - Hoa hồng: {formatNumberMoney(item?.commission)} | {moment(item.createAt).fromNow()} | Cre: {item.userCreate.fullname}
            </p>
          ))}
      </div>
      <div className="border-b-8 border-accent-light px-4 mt-2"></div>
    </div>
  );
});

AffiliateInfo.displayName = "AffiliateInfo"