/*=====1.LIBRARY=====*/
import React, { FC, useCallback, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import moment from "moment";
import { formatNumberMoney } from "utils/converter";
import { FilterDateGroup } from "views/accounting/shareComponents/common";
import { TYPE_MISTAKE, STATUS_MISTAKE, STATUS_CUSTOMERCARE } from "apis/localdb/index";

/*=====2.CSS=====*/

/*=====3.ICONS=====*/

/*=====4.PAGES/COMPONENTS=====*/
import PaginateV2 from "shareComponents/common/PaginateV2";
import { ModalZoomView } from "shareComponents/common";

/*=====5.TYPINGS=====*/
import { ImageProps } from "typings/common";

/*=====6.HOOKS/APIS=====*/
import { APP_ID } from "apis/localdb";
import { useCheckPerAccessApp } from "services/hooks/auth/usePermissions";
import { useFnbMistake } from 'services/hooks/fnb/useFnbMistake';

/*=====7.OTHER=====*/
import { createLinkAndClick } from "utils";

export const FnbReportMistake: FC = () => {
	useEffect(() => {
		document.title = "Seller";
	}, []);
	
	const history = useHistory();
	const { hasPermission, isSuccess } = useCheckPerAccessApp({ appID: APP_ID.FNB.id });

	const [keyword, setKeyword] = useState("");
	const [isShowImageFullScreen, setIsShowImageFullScreen] = useState(false);

	const [defaultState, setDefaultState] = useState({
	    mediaID: '',
	    images: [] as ImageProps[],
	    index: 0,
	    createAt: ""
  	});
	
	const today = new Date();
	const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth()+1, 0);
	const currentMonth = new Date().getMonth()
	const [inputFilter, setInputFilter] = useState({
	  fromDate: new Date(new Date().getFullYear(), currentMonth, 1),
	  toDate: lastDayOfMonth
	})

	const { isLoading, fetchNextPage, hasNextPage, totalRecord, listWithPager, totalPage, refetch } = useFnbMistake({ 
		params: { 
			keyword: keyword, 
			populates: JSON.stringify({
				path: 'userCreate mistake executor funda files'
			}) 
		}, isFetchList: true, isFetchInfo: false  });

	useEffect(() => {
		if (isSuccess && !(hasPermission)) {
			toast.error("Bạn không có quyền truy cập chức năng này. Vui lòng liên hệ ban quản trị.");
			history.push("/")
		}
	}, [hasPermission]);

	type PaginateHandle = React.ElementRef<typeof PaginateV2>;
    const ref = React.useRef<PaginateHandle>(null);
    const [pageIndex, setPageIndex] = useState(0);

	/**
	 * LÀM VIỆC VỚI EXCEL
	 */
	const [stateExport, setStateExport] = useState<{ isExporting: boolean }>({
		isExporting: false,
	});
	const { exportMistakeAsync } = useFnbMistake({});
	
	const handleExportExcel = async () => {
	  try {
		setStateExport({ isExporting: true });
		const { error, data } = await exportMistakeAsync({
			fromDate: inputFilter.fromDate,
			toDate: inputFilter.toDate,
		});
  
		if(error) {
		  return toast.warn(data?.message);
		}
  
		data && createLinkAndClick(data, '_self');
	  } catch (error: any) {
		toast.error(error.message)
	  } finally {
		setStateExport({ isExporting: false });
	  }
	}

	const handleOnChangeDate = useCallback((date, input) => {
	if (input) {
		setInputFilter((value) => ({ ...value, toDate: date }))
	} else {
		setInputFilter((value) => ({ ...value, fromDate: date }))
	}
	}, [])

	return (
		<main className="h-full overflow-auto">
			<header className="sticky top-0 bg-primary-light z-10 flex items-center justify-between h-[50px] px-6 border border-primary-border">
				<div className="flex items-center">
					<button onClick={history.goBack} className="mr-5">
                        <img src="/images/common/button_back.png" alt="Button Back" />
                    </button>
					<p className="text-lg mr-10">Danh sách lỗi nhân viên</p>
				</div>
				<FilterDateGroup fromDate={inputFilter.fromDate} endDate={inputFilter.toDate} onChangeDate={handleOnChangeDate} />
				<button onClick={handleExportExcel} title="Tải dữ liệu Excel">
					Tải dữ liệu Excel
				</button>
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
								TT
							</div>
						</th>
						<th className="pb-1 pt-1 font-normal w-1/4">
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
								Số lần tái phạm
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
								Người phát hiện/gán lỗi
							</div>
						</th>
						<th className="pb-1 pt-1 font-normal">
							<div className="pl-2">
								Giá trị trừ thưởng
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
							<td className={"p-2 border-0.5 border-primary-border text-cente"}>{i+1}</td>
							<td className={"p-2 border-0.5 border-primary-border"}>
								{item?.mistake?.name}
								<p className=" text-[13px] text-gray-500"><i>Tạo: {item?.userCreate?.fullname}</i></p>
								<p className=" text-[13px] text-gray-500"><i>Thời gian: {moment(item.createAt).format('DD/MM/YYYY HH:mm')}</i></p>
							</td>
							<td className={"p-2 border-0.5 border-primary-border "}>
								{item?.executor?.fullname}
							</td>
							<td className={"p-2 border-0.5 border-primary-border "}>
								{item?.number}
							</td>
							<td className={"p-2 border-0.5 border-primary-border "}>
								{item?.funda?.name}
							</td>
							<td className={"p-2 border-0.5 border-primary-border"}>
								{TYPE_MISTAKE[item?.type-1].text}
							</td>
							<td className={"p-2 border-0.5 border-primary-border"}>
								{STATUS_MISTAKE[item?.status-1].text}
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