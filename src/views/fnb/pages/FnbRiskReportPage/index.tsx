/*=====1.LIBRARY=====*/
import React, { FC, useState, useEffect } from "react";
import { Link, useHistory, useParams, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import debounce from "lodash/debounce";
import moment from "moment";
import { formatNumberMoney } from "utils/converter";

/*=====2.CSS=====*/

/*=====3.ICONS=====*/
import PencilIcon from "assets/images/icons8-pencil-96.svg";

/*=====4.PAGES/COMPONENTS=====*/
import { SearchInput } from "shareComponents/common";
import PaginateV2 from "shareComponents/common/PaginateV2";

/*=====5.TYPINGS=====*/

/*=====6.HOOKS/APIS=====*/
import { APP_ID } from "apis/localdb";
import { useCheckPerAccessApp } from "services/hooks/auth/usePermissions";
import { useFnbProduct } from 'services/hooks/fnb/useFnbProduct';
import { useFunda } from 'services/hooks/items/useFunda';
import { useFnbOrder } from 'services/hooks/fnb/useFnbOrder';

/*=====7.OTHER=====*/
import { createLinkAndClick } from "utils";

export const FnbRiskReportPage: FC = () => {
	const location = useLocation()
	useEffect(() => {
		document.title = "eShop";
	}, []);
	
	const history = useHistory();
	const { productID } = useParams<{ productID: string }>();
	const { hasPermission, dataUserAccess, isSuccess } = useCheckPerAccessApp({ appID: APP_ID.FNB.id });

	const [idsChecked, setIdsChecked] = useState<Array<string>>([]);
	const [keyword, setKeyword] = useState("");
    const { info: infoProduct } = useFnbProduct({ params: { productID }, isFetchList: false, isFetchInfo: true  });

    const { isLoading, fetchNextPage, hasNextPage, totalRecord, listWithPager, totalPage, refetch } = useFunda({ 
		params: { 
			keyword: keyword,  
			limit: 30,  
			isMember: 1,
			// productID, 
			// populates: JSON.stringify({
			// 	path: 'goods', select: "name unit"
			// }) 
		}, 
		isFetchList: true, 
		isFetchInfo: false
	});

	useEffect(() => {
		if (isSuccess && !(hasPermission)) {
			toast.error("Bạn không có quyền truy cập chức năng này. Vui lòng liên hệ ban quản trị.");
			history.push("/")
		}
	}, [hasPermission]);

	type PaginateHandle = React.ElementRef<typeof PaginateV2>;
    const ref = React.useRef<PaginateHandle>(null);
    const [pageIndex, setPageIndex] = useState(0);

	let linkRef: any;
	if(location.pathname.includes("/fnb/")){
		linkRef = `/fnb/risk-report/`
	}else{
		linkRef = `/pcm/kpi-report/`
	}

	const [stateExport, setStateExport] = useState<{ isExporting: boolean }>({
		isExporting: false,
	});
	const { exportOrderAsync } = useFnbOrder({});
	const handleExportExcel = async () => {
		try {
		  setStateExport({ isExporting: true });
		  const { error, data } = await exportOrderAsync({
			filterParams: {
			}
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

	return (
		<main className="h-full overflow-auto">
			<header className="sticky top-0 bg-primary-light z-10 flex items-center justify-between h-[50px] px-6 border border-primary-border">
				<div className="flex items-center">
					{/* <button onClick={history.goBack}>
                        <img src="/images/common/button_back.png" alt="Button Back" />
                    </button> */}
					<p className="text-lg">{infoProduct?.name}</p>
					<SearchInput
						classNameWrapper="mr-3"
						classNameInput="outline-none w-[296px]"
						onChange={debounce(
							(event: any) => setKeyword(event.target.value),
							500
						)}
					/>
					<button onClick={handleExportExcel} title="Tải dữ liệu Excel">
						Tải báo cáo KPI
					</button>

					{(idsChecked && idsChecked.length) ? (
						<div className="flex items-center gap-2 border-l-2 border-primary-border px-4 ml-4">
							{idsChecked.length == 1 ?
								<>
								<div
									className="w-9 h-9 flex items-center justify-center rounded-full cursor-pointer hover:bg-cbs-gray"
								>
									<img src={PencilIcon} alt="Pencil" />
								</div>
							</> : <></>
							}
						</div>
					) : <></>}
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
					<tr className="text-left text-sm text-primary-gray">
						<th className="pb-1 pt-1 text-center font-normal" style={{ width: "3.5%" }}>TT</th>
						<th className="pb-1 pt-1 w-1/4">
							<div className="border-gray-300 font-normal pl-2">
								Điểm bán
							</div>
						</th>
						<th className="pb-1 pt-1 font-normal w-[200px]">
							<div className="border-gray-300 font-normal pl-2">
								Tổng số lỗi
							</div>
						</th>
						<th className="pb-1 pt-1 font-normal w-[200px]">
							<div className="border-gray-300 font-normal pl-2">
								Tổng giá trị bị phạt
							</div>
						</th>
						<th className="pb-1 pt-1 font-normal w-[150px]">
							<div className="border-gray-300 font-normal pl-2">
								Ngày bắt đầu
							</div>
						</th>
						<th className="pb-1 pt-1 font-normal">
							<div className="border-gray-300 font-normal pl-2">
								Cán bộ quản lý
							</div>
						</th>
						<th className="pb-1 pt-1 font-normal">
							<div className="border-gray-300 font-normal pl-2">
								Địa chỉ
							</div>
						</th>
						<th className="pb-1 pt-1 font-normal">
							<div className="border-gray-300 font-normal pl-2">
								Ghi chú
							</div>
						</th>
					</tr>
				</thead>
				
				{
					(listWithPager[pageIndex]??[]).map((item: any, i: any) => (
						<tr key={item._id} className="text-[14px]">
							<td className={"p-2 border-t-0.5 border-b-0.5 border-primary-border text-center"}>{Number(i + 1)}</td>
							<td className={"p-2 border-0.5 border-primary-border text-cbs-highlight-color"}>
								<Link to ={`${linkRef}${item._id}`}>
									{item?.name}
								</Link>
							</td>
							<td className={"p-2 border-0.5 border-primary-border"}>
								{formatNumberMoney(item?.numberOfMistakes)}
							</td>
							<td className={"p-2 border-0.5 border-primary-border"}>
								{formatNumberMoney(item?.amountOfMistakes)}
							</td>
							<td className={"p-2 border-0.5 border-primary-border"}>
								{moment(item?.createAt).format('DD/MM/YYYY')}
							</td>
							<td className={"p-2 border-0.5 border-primary-border"}>
								
							</td>
							<td className={"p-2 border-0.5 border-primary-border"}>
								{item?.address}
							</td>
							<td className={"p-2 border-0.5 border-primary-border"}>
								{item?.description}
							</td>
						</tr>
					))
				}
			</table>
		</main>
	)
}