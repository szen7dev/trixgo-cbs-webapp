import React, { FC, memo, useState } from "react";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { formatNumberMoney } from "utils/cmcs";
import type { Human } from 'typings/human';
import { useFnbCustomerCare, useCustomerJourneyByProperty } from "services/hooks/fnb/useFnbCustomerCare";
import { ImageProps } from "typings/common";
import { ModalZoomView } from "shareComponents/common";
import PaginateV2 from "shareComponents/common/PaginateV2";

type Props = {
  info: Human
};

const STATUS = [
  { _id: 1, text: 'Đang triển khai' },
  { _id: 2, text: 'Hoàn thành'}
]

const BACKGROUND = [
	{ value: 1, color: "bg-red-400", color2: "F11F20" },
	{ value: 2, color: "bg-yellow-300", color2: "fa6b07" },
	{ value: 3, color: "bg-green-400", color2: "C55B11" },
	{ value: 4, color: "bg-blue-400", color2: "00AF50" },
	{ value: 5, color: "bg-purple-400", color2: "169150" },
	{ value: 6, color: "bg-pink-600", color2: "1F4E78" },
	{ value: 7, color: "bg-gray-600", color2: "262626" },
	{ value: 8, color: "bg-teal-400", color2: "262626" },
	{ value: 9, color: "bg-teal-400", color2: "262626" },
	{ value: 10, color: "bg-teal-400", color2: "262626" },
	{ value: 11, color: "bg-teal-400", color2: "262626" },
	{ value: 12, color: "bg-teal-400", color2: "262626" },
	{ value: 13, color: "bg-teal-400", color2: "262626" },
	{ value: 14, color: "bg-teal-400", color2: "262626" },
	{ value: 15, color: "bg-teal-400", color2: "262626" },
]

export const JourneyInfo: FC<Props> = memo((props) => {
  const { info } = props;

  type PaginateHandle = React.ElementRef<typeof PaginateV2>;
  const ref = React.useRef<PaginateHandle>(null);
  const [pageIndex, setPageIndex] = useState(0);

  const [defaultState, setDefaultState] = useState({
    mediaID: '',
    images: [] as ImageProps[],
    index: 0,
    createAt: ""
  });

  const [isShowImageFullScreen, setIsShowImageFullScreen] = useState(false);

  const { listCustomerJourneyByProperty, refetchListCustomerJourneyByProperty } = useCustomerJourneyByProperty({
      params: {
          option: 6,
          customerID: info._id
          // fromDate: inputFilter.fromDate,
          // toDate: inputFilter.toDate,
      },
      isFetchList: true
  })

  const { listDataWithPager, isLoading, totalRecord, totalPage, fetchNextPage, hasNextPage, refetch } = useFnbCustomerCare({
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
      {/* Hành trình trải nghiệm */}
      <div className={"flex-1 flex items-center justify-end"}>
        <p className="text-bold text-primary-gray text-lg mb-2 mt-5">A2. Hành trình trải nghiệm ({totalRecord})</p>
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
            listCustomerJourneyByProperty?.listBusiness?.map((item: any, index: any) => {
              const jsx = [];
              jsx.push(
                <div key={index}>
                  <p className="mb-2">{item.name}</p>
                </div>
              )
              
              let i = 0
              listCustomerJourneyByProperty?.listData?.map((subitem: any, subindex: any) => {
                  const color = `inline-block cursor-pointer max-w-sm rounded overflow-hidden shadow-lg mb-2 mr-1`;
                  
                  if(subitem._id.business.toString() === item._id.toString()){
                    const color2 = `#${BACKGROUND[i].color2}`;
                    jsx.push(
                        <div key={subindex} className={color} style={{background: color2}}>
                            <div className="px-2 py-1">
                                <div className="font-bold text-sm mb-1 text-white">{subitem._id.journey.name}</div>
                                <p className="text-white text-x-small">
                                  {subitem._id.journey?.description}
                                </p>
                            </div>
                        </div>
                    ) 

                    i++
                  }
              })

              return jsx
            })
        }

        {
        (listDataWithPager[pageIndex] ?? []).map((item: any, i: any) => (
            <p className="mb-2 text-cbs-highlight-color text-[14px] border-b" key={item._id}>
              {moment(item.createAt).format('DD/MM/YYYY HH:mm')} - {item?.journey?.name} - {item.name} - {item.note} - {formatNumberMoney(item.amount)}
              {
                  item?.status == 1 ?
                  <button className="rounded-md py-1 px-2 bg-cbs-schedule-expired text-white inline ml-4" style={{ fontSize: "12px" }}>
                      {STATUS[Number(item?.status) - 1]?.text}
                  </button>
                  :
                  <button className="rounded-md py-1 px-2 bg-cbs-schedule-after-7days text-white inline ml-4" style={{ fontSize: "12px" }}>
                      {STATUS[Number(item?.status) - 1]?.text}
                  </button>
              }
              <p className="text-[12px] text-primary-gray"><i>{item.userCreate.fullname} | {moment(item.createAt).fromNow()}</i></p>
              {item?.images?.map((image: any, i: number) => {
                return (
                  <div
                    key={image._id}
                    className="mt-2 mb-2 cursor-pointer relative w-[75px] h-[75px]"
                    onClick={() => {
                      setDefaultState({
                        mediaID: image._id,
                        images: item?.images,
                        index: i,
                        createAt: image.createAt
                      });
                      setIsShowImageFullScreen(true);
                    }}
                  >
                    <img className="w-[75px] h-[75px]" src={`${process.env.REACT_APP_URL_S3}${image?.path}`} />
                  </div>
                )
              })}

            </p>
          ))
        }
      </div>
      <ModalZoomView
          isShow={isShowImageFullScreen}
          toggle={() => setIsShowImageFullScreen(!isShowImageFullScreen)}
          initialData={defaultState}
      />
      <div className="border-b-8 border-accent-light px-4 mt-2"></div>
    </div>
  );
});

JourneyInfo.displayName = "JourneyInfo"