import React, { FC, memo, useState } from "react";
import moment from "moment";
import { formatNumberMoney } from "utils/cmcs";
import type { Human } from 'typings/human';
import PaginateV2 from "shareComponents/common/PaginateV2";
import { useFnbCustomerCare } from "services/hooks/fnb/useFnbCustomerCare";

type Props = {
  info: Human
};

export const SupportInfo: FC<Props> = memo((props) => {
  const { info } = props;

  const STATUS = [
      { _id: 1, text: 'Chưa xử lý' },
      { _id: 2, text: 'Hoàn thành'}
  ]

  type PaginateHandle = React.ElementRef<typeof PaginateV2>;
  const ref = React.useRef<PaginateHandle>(null);
  const [pageIndex, setPageIndex] = useState(0);

  const { listDataWithPager, isLoading, totalRecord, totalPage, fetchNextPage, hasNextPage, refetch } = useFnbCustomerCare({
      params: { 
          customerID: info._id,
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
            <p className="mb-2 text-cbs-highlight-color text-[14px]" key={item._id}>
              {item.name} | {moment(item.createAt).format('DD/MM/YYY HH:mm')} - Quản lý: {item?.manager?.fullname} | {item?.description} | {item?.note}
              {
                  item?.status == 1 ?
                  <div className="w-[80px] rounded-md py-1 px-2 bg-cbs-schedule-expired text-white inline ml-4" style={{ fontSize: "12px" }}>
                      {STATUS[Number(item?.status) - 1]?.text}
                  </div>
                  :
                  <div className="w-[80px] rounded-md py-1 px-2 bg-cbs-schedule-after-7days text-white inline ml-4" style={{ fontSize: "12px" }}>
                      {STATUS[Number(item?.status) - 1]?.text}
                  </div>
              }
            </p>
          ))}
      </div>
      <div className="border-b-8 border-accent-light px-4 mt-2"></div>
    </div>
  );
});

SupportInfo.displayName = "SupportInfo"