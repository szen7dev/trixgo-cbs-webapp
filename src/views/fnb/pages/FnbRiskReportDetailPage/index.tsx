/*=====1.LIBRARY=====*/
import React, { FC, useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import debounce from "lodash/debounce";
import moment from "moment";
import { formatNumberMoney } from "utils/converter";
import pencilIcon from "assets/images/icons8-pencil-96.svg";
import { SearchInput } from "shareComponents/common";
import PaginateV2 from "shareComponents/common/PaginateV2";
import { ModalZoomView } from "shareComponents/common";
import { ImageProps } from "typings/common";
import { useFunda } from 'services/hooks/items/useFunda';
import { useFnbMistake } from 'services/hooks/fnb/useFnbMistake';
import { useModal } from "services/hooks/useModal";
import { ModalKpiUpdateItem } from "views/fnb/pages/FnbHomePage/components/ModalKpiUpdateItem";
const TYPE_MISTAKE = [
	"Hệ thống phát hiện", "Khách hàng phát hiện"
]
const STATUS_MISTAKE = [
	"Đã xử lý", "Chưa xử lý"
]

export const FnbRiskReportDetailPage: FC = () => {
	const history = useHistory();
	const { fundaID } = useParams<{ fundaID: string }>();
	const [keyword, setKeyword] = useState("");
	const { openModal, closeModal } = useModal();
	const [isShowImageFullScreen, setIsShowImageFullScreen] = useState(false);
	const [defaultState, setDefaultState] = useState({
	    mediaID: '',
	    images: [] as ImageProps[],
	    index: 0,
	    createAt: ""
  	});
	
    const { info: infoFunda } = useFunda({ params: { fundaID }, isFetchList: false, isFetchInfo: true  });

    const { isLoading, fetchNextPage, hasNextPage, totalRecord, listWithPager, totalPage, refetch } = useFnbMistake({ 
		params: { 
			keyword: keyword, 
			fundasID: [fundaID],
			populates: JSON.stringify({
				path: 'userCreate userUpdate mistake executor funda files',
				populate: {
					path: 'author',
					select: 'fullname bizfullname image'
				}
			}) 
		}, isFetchList: true, isFetchInfo: false  });

	useEffect(() => {
		document.title = "Trixgo | Báo cáo KPI";
	}, []);

	type PaginateHandle = React.ElementRef<typeof PaginateV2>;
    const ref = React.useRef<PaginateHandle>(null);
    const [pageIndex, setPageIndex] = useState(0);

	return (
		<main className="h-full overflow-auto">
			<header className="sticky top-0 bg-primary-light z-10 flex items-center justify-between h-[50px] px-6 border border-primary-border">
				<div className="flex items-center">
					<button onClick={history.goBack}>
                        <img src="/images/common/button_back.png" alt="Button Back" />
                    </button>
					<p className="text-lg">{infoFunda?.name}</p>
					<SearchInput
						classNameWrapper="ml-4"
						classNameInput="outline-none w-[296px]"
						onChange={debounce(
							(event: any) => setKeyword(event.target.value),
							500
						)}
					/>
				</div>
				<PaginateV2
					ref={ref}
					totalRecord={totalRecord}
					totalPages={totalPage}
					limit={20}
					hasNextPage={hasNextPage}
					isFetching={isLoading}
					nextPageAction={() => {
						fetchNextPage();
						setPageIndex(oldState => oldState+1)
					}}
					prevPageAction={() => {
						setPageIndex(oldState => oldState-1)
					}}
				/>
			</header>

			<table className="table-fixed border-collapse w-full overflow-auto border-l border-r border-primary-border">
				<thead className="bg-cbs-table-header h-10 border-b border-primary-border">
					<tr className="text-left text-sm text-primary-gray text-[14px]">
						<th className="pb-1 pt-1 w-[50px] font-normal">
							<div className="pl-2">
								
							</div>
						</th>
						<th className="pb-1 pt-1 font-normal">
							<div className="pl-2">
								Lỗi mắc phải
							</div>
						</th>
						<th className="pb-1 pt-1 font-normal">
							<div className="pl-2">
								Nhân sự mắc lỗi
							</div>
						</th>
						<th className="pb-1 pt-1 font-normal">
							<div className="pl-2">
								Cơ sở
							</div>
						</th>
						<th className="pb-1 pt-1 font-normal">
							<div className="pl-2">
								Phân loại
							</div>
						</th>
						<th className="pb-1 pt-1 font-normal">
							<div className="pl-2">
								Tình trạng
							</div>
						</th>
						<th className="pb-1 pt-1 font-normal">
							<div className="pl-2">
								Thưởng
							</div>
						</th>
						<th className="pb-1 pt-1 font-normal">
							<div className="pl-2">
								Trừ thưởng
							</div>
						</th>
						<th className="pb-1 pt-1 font-normal">
							<div className="pl-2">
								Ảnh đính kèm
							</div>
						</th>
						<th className="pb-1 pt-1 font-normal">
							<div className="pl-2">
								Ghi chú
							</div>
						</th>
					</tr>
				</thead>
				{
					(listWithPager[pageIndex]??[]).map((item: any, i: any) => (
						<tr key={item._id} className="text-[14px]">
							<td className={"p-2 border-0.5 border-primary-border text-cente"}>
								<button
									className="text-cbs-schedule-nextweek"
									onClick={() => {
											openModal(
												<div className=" text-left transition-all transform bg-primary-light shadow-xl rounded my-16 align-top inline-block" style={{ width: "640px" }}>
													<ModalKpiUpdateItem 
														defaultValues={{ 
															mistakeID: item._id,
															bonus:  item.bonus,
															amount:  item.amount,
															date: moment(item.date).format('YYYY-MM-DD'),
															status:  item.status,
														}} 
														refetch={refetch}
													/>
												</div>
											)
										}										
									}
								>
									<img className="w-[24px] h-[24px]" alt="icon" src={pencilIcon}/>
								</button>
							</td>
							<td className={"p-2 border-0.5 border-primary-border"}>
								{item?.mistake?.name}ô
								{/* <p className=" text-[13px] text-gray-500"><i>{item?._id}</i></p> */}
								<p className=" text-[13px] text-gray-500"><i>Ghi nhận: {item?.userCreate?.fullname}</i></p>
								<p className=" text-[13px] text-gray-500"><i>Ngày: {item?.date ? moment(item?.date).format('DD/MM/YYYY') : moment(item?.createAt).format('DD/MM/YYYY')}</i></p>
								<hr />
								<p className=" text-[13px] text-gray-500"><i>Cập nhật: {item?.userUpdate?.fullname ? `${item?.userUpdate?.fullname} - ${moment(item?.modifyAt).format('DD/MM/YYYY HH:mm')}` : ''}</i></p>
							</td>
							<td className={"p-2 border-0.5 border-primary-border "}>
								{item?.executor?.fullname}
							</td>
							<td className={"p-2 border-0.5 border-primary-border "}>
								{item?.funda?.name}
							</td>
							<td className={"p-2 border-0.5 border-primary-border"}>
								{TYPE_MISTAKE[item?.type-1]}
							</td>
							<td className={"p-2 border-0.5 border-primary-border"}>
								{STATUS_MISTAKE[item?.status-1]}
							</td>
							<td className={"p-2 border-0.5 border-primary-border"}>
								{formatNumberMoney(item?.bonus||0)}
							</td>
							<td className={"p-2 border-0.5 border-primary-border"}>
								{formatNumberMoney(item?.amount||0)}
							</td>
							<td className={"p-2 border-0.5 border-primary-border"}>
								{item?.files?.map((image: any, i: number) => {
									return (
										<div
											key={image._id}
											className="mt-2 cursor-pointer relative"
											onClick={() => {
			                                    setDefaultState({
				                                    mediaID: image._id,
				                                    images: item?.files,
				                                    index: i,
				                                    createAt: image.createAt
			                                    });
			                                    setIsShowImageFullScreen(true);
			                                }}
										>
											<img src={`${process.env.REACT_APP_URL_S3}${image?.path}`} />
										</div>
									)
								})}
							</td>
							<td className={"p-2 border-0.5 border-primary-border"}>
								{item?.note}
							</td>
						</tr>
					))
				}
			</table>
			<ModalZoomView
		        isShow={isShowImageFullScreen}
		        toggle={() => setIsShowImageFullScreen(!isShowImageFullScreen)}
		        initialData={defaultState}
		    />
		</main>
	)
}