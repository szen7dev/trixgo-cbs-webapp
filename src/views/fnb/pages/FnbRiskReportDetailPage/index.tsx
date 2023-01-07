/*=====1.LIBRARY=====*/
import React, { FC, useCallback, useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import debounce from "lodash/debounce";
import moment from "moment";
import { formatNumberMoney } from "utils/converter";
import { toast } from "react-toastify";
import cn from "classnames";

/*=====2.CSS=====*/

/*=====3.ICONS=====*/
import PencilIcon from "assets/images/icons8-pencil-96.svg";

/*=====4.PAGES/COMPONENTS=====*/
import { SearchInput, ModalContainer } from "shareComponents/common";
import PaginateV2 from "shareComponents/common/PaginateV2";

/*=====5.TYPINGS=====*/

/*=====6.HOOKS/APIS=====*/
import { useModal } from "services/hooks/useModal";
import { useCheckPerAccessApp } from "services/hooks/auth/usePermissions";
import { useFnbProduct } from 'services/hooks/fnb/useFnbProduct';
import { useFnbQuota } from 'services/hooks/fnb/useFnbQuota';
import { useFunda } from 'services/hooks/items/useFunda';
import { useFnbMistake } from 'services/hooks/fnb/useFnbMistake';
import { useAuth } from 'services/hooks/auth/useAuth';

/*=====7.OTHER=====*/
import { APP_ID } from "apis/localdb";

const TYPE_MISTAKE = [
	"Hệ thống phát hiện", "Khách hàng phát hiện"
]
const STATUS_MISTAKE = [
	"Đã xử lý", "Chưa xử lý"
]
export const FnbRiskReportDetailPage: FC = () => {
	const { user } = useAuth();
	const companyID = user?.company._id;
	useEffect(() => {
		document.title = "Trixgo | FnB";
	}, []);
	const history = useHistory();
	const { fundaID } = useParams<{ fundaID: string }>();
	const { hasPermission, dataUserAccess, isSuccess } = useCheckPerAccessApp({ appID: APP_ID.FNB.id });
	const [idsChecked, setIdsChecked] = useState<Array<string>>([]);
	const [keyword, setKeyword] = useState("");
	
    const { info: infoFunda } = useFunda({ params: { fundaID }, isFetchList: false, isFetchInfo: true  });
	// console.log({infoFunda})
    const { isLoading, fetchNextPage, hasNextPage, totalRecord, listWithPager, totalPage, refetch } = useFnbMistake({ 
		params: { 
			keyword: keyword, 
			fundasID: [fundaID],
			populates: JSON.stringify({
				path: 'mistake executor funda files'
			}) 
		}, isFetchList: true, isFetchInfo: false  });

	// console.log(listWithPager)

	const [modalCreateShiftDetail, setModalCreateShiftDetail] = useState<boolean>(false);
	const toggleModalCreateShiftDetail = () => setModalCreateShiftDetail(!modalCreateShiftDetail);

	const [initialValues, setInitialValues] = useState(null);
	const onConfirmCreateShiftDetail = () => {
		refetch();
		setIdsChecked([]);
	}

	useEffect(() => {
		if (isSuccess && !(hasPermission)) {
			toast.error("Bạn không có quyền truy cập chức năng này. Vui lòng liên hệ ban quản trị.");
			history.push("/")
		}
	}, [hasPermission]);

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
					{/* <FinancialCashFlowFilterButton /> */}
					{(idsChecked && idsChecked.length) ? (
						<div className="flex items-center gap-2 border-l-2 border-primary-border px-4 ml-4">
							{/* <div className="w-9 h-9 flex items-center justify-center rounded-full cursor-pointer hover:bg-cbs-gray">
								<img src={DownloadIcon} alt="Download" />
							</div> */}
							{idsChecked.length == 1 ?
								<>
								<div
									className="w-9 h-9 flex items-center justify-center rounded-full cursor-pointer hover:bg-cbs-gray"
									onClick={() => {
										const item = listWithPager[pageIndex].find((e: any) => e._id == idsChecked[0]);
										setInitialValues({
											...item,
											startTime: item.startTime ? moment(item.startTime).format('MM/DD/YYYY') : '',
											expiredTime: item.expiredTime ? moment(item.expiredTime).format('MM/DD/YYYY') : '',
										});
										toggleModalCreateShiftDetail();
									}}
								>
									<img src={PencilIcon} alt="Pencil" />
								</div>
							</> : <></>
							}
						</div>
					) : <></>}
				</div>
				<div className="flex items-center">
					{/* <button
						className="flex items-center justify-center text-primary-light bg-cbs-green w-[85px] h-8 rounded font-bold ml-6"
						onClick={() => {
							setInitialValues(null);
							toggleModalCreateShiftDetail();
						}}
					>
						Tạo mới
					</button> */}
					{/* <button className="w-10 h-10 rounded-full bg-cbs-gray flex items-center justify-center hover:bg-accent-light">
						<img src={Vertical3Dots} alt="3Dots" />
					</button> */}
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
								TT
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
								Giá trị phạt 
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
								{/* <input
									className="form-check-input"
									type="checkbox"
									checked={getStateChecked(item._id)}
									onChange={() => onClickCheckButton(item._id)}
								/> */}
								{i+1}
							</td>
							<td className={"p-2 border-0.5 border-primary-border"}>
								{item?.mistake?.name}
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
								{formatNumberMoney(item?.amount||0)}
							</td>
							<td className={"p-2 border-0.5 border-primary-border"}>
								{item?.files?.map((image: any, i: number) => {
									return (
										<div key={i} className="mt-2 cursor-pointer relative">
											<img src={`${process.env.REACT_APP_URL_S3}${image?.path}`} />
										</div>
									)
								})}
							</td>
							<td className={"p-2 border-0.5 border-primary-border"}>
								{item?.note}
							</td>
						</tr>
				))}
			</table>
		</main>
	);
};
