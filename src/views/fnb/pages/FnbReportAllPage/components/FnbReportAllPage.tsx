/*=====1.LIBRARY=====*/
import React, { FC, useCallback, useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import debounce from "lodash/debounce";
import moment from "moment";
import { formatNumberMoney } from "utils/converter";

/*=====2.CSS=====*/

/*=====3.ICONS=====*/
import PencilIcon from "assets/images/icons8-pencil-96.svg";

/*=====4.PAGES/COMPONENTS=====*/
import { SearchInput, ModalContainer } from "shareComponents/common";
import PaginateV2 from "shareComponents/common/PaginateV2";
// import { CreateFnbProductQoutas } from "./modal";

/*=====5.TYPINGS=====*/

/*=====6.HOOKS/APIS=====*/
import { APP_ID } from "apis/localdb";
import { useModal } from "services/hooks/useModal";
import { useCheckPerAccessApp } from "services/hooks/auth/usePermissions";
import { useFnbProduct } from 'services/hooks/fnb/useFnbProduct';
import { useFnbQuota } from 'services/hooks/fnb/useFnbQuota';
import { useFunda } from 'services/hooks/items/useFunda';

/*=====7.OTHER=====*/
import { FNB_INTERNAL } from "apis/localdb";

const TYPE_PRODUCT = [
	{ value: 1, text: "Thông thường" },
	{ value: 2, text: "Topping" },
]

export const FnbReportAllPage: FC = () => {
	useEffect(() => {
		document.title = "FnB";
	}, []);
	
	const history = useHistory();
	const { productID } = useParams<{ productID: string }>();
	const { hasPermission, dataUserAccess, isSuccess } = useCheckPerAccessApp({ appID: APP_ID.FNB.id });

	const [idsChecked, setIdsChecked] = useState<Array<string>>([]);
	const [keyword, setKeyword] = useState("");
    const { info: infoProduct } = useFnbProduct({ params: { productID }, isFetchList: false, isFetchInfo: true  });
	// console.log({ infoProduct });

	/**
	 * List mẩu tin
	 */
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
	// console.log({listWithPager});

	const getStateChecked = useCallback((id: string) => {
		return idsChecked.includes(id) ? true : false;
	}, [idsChecked]);

	const onClickCheckButton = (id: string) => {
		setIdsChecked([id]);
	};

	const getStateCheckedAll = useCallback(() => {
		return idsChecked.length == listWithPager.length;
	}, [idsChecked]);

	const onClickCheckAll = () => {
		if (idsChecked.length == listWithPager.length) {
			setIdsChecked([]);
		} else {
			const idsAll = listWithPager.map((e: any) => e._id);
			setIdsChecked(idsAll);
		}
	};

	const [modalCreateProject, setModalCreateProject] = useState<boolean>(false);
	const toggleModalCreateProject = () => setModalCreateProject(!modalCreateProject);

	const [initialValues, setInitialValues] = useState(null);
	const onConfirmCreateProject = () => refetch();

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
					{/* <SearchInput
						classNameWrapper="ml-4"
						classNameInput="outline-none w-[296px]"
						onChange={debounce(
							(event: any) => setKeyword(event.target.value),
							500
						)}
					/> */}
				</div>
			</header>

			<table className="table-fixed border-collapse w-full overflow-auto border-l border-r border-primary-border">
				<tr className="text-[14px]">
					<td className={"p-2 border-t-0.5 border-b-0.5 border-primary-border text-center w-10"}>1</td>
					<td className={"p-2 border-0.5 border-primary-border text-cbs-highlight-color w-1/4"}>
						<Link to ={`/fnb/reports/type/1`}>
							Danh sách lỗi nhân viên
						</Link>
					</td>
					<td className={"p-2 border-0.5 border-primary-border w-2/4"}>
						Để quản lý biết là đã mắc lỗi nhiều lần hay chưa và gán phạt, bao gồm người gán lỗi, ngày gán lỗi, người mắc lỗi, giá trị phạt
					</td>
					<td className={"p-2 border-0.5 border-primary-border"}>
						Vào xem chi tiết để tải báo cáo
					</td>
				</tr>
				{/* <tr className="text-[14px]">
					<td className={"p-2 border-t-0.5 border-b-0.5 border-primary-border text-center w-10"}>2</td>
					<td className={"p-2 border-0.5 border-primary-border text-cbs-highlight-color w-1/4"}>
						<Link to ={`/fnb/reports/type/2`}>
							Đơn khách vãng lai
						</Link>
					</td>
					<td className={"p-2 border-0.5 border-primary-border w-2/4"}>
						Để quản lý biết các đơn hàng mà nhân viên chưa gán mã khách
					</td>
					<td className={"p-2 border-0.5 border-primary-border"}>
						Vào xem chi tiết để tải báo cáo
					</td>
				</tr> */}
				<tr className="text-[14px]">
					<td className={"p-2 border-t-0.5 border-b-0.5 border-primary-border text-center w-10"}>3</td>
					<td className={"p-2 border-0.5 border-primary-border text-cbs-highlight-color w-1/4"}>
						<Link to ={`/fnb/reports/type/3`}>
							Khách hàng tiềm năng
						</Link>
					</td>
					<td className={"p-2 border-0.5 border-primary-border w-2/4"}>
						Thống kê khách hàng tiềm năng để đưa ra chính sách Chăm sóc cho phù hợp/NPS
					</td>
					<td className={"p-2 border-0.5 border-primary-border"}>
						Vào xem chi tiết để tải báo cáo
					</td>
				</tr>
				<tr className="text-[14px]">
					<td className={"p-2 border-t-0.5 border-b-0.5 border-primary-border text-center w-10"}>4</td>
					<td className={"p-2 border-0.5 border-primary-border text-cbs-highlight-color w-1/4"}>
						<Link to ={`/fnb/reports/type/4`}>
							Bảng tính lương nhân viên
						</Link>
					</td>
					<td className={"p-2 border-0.5 border-primary-border w-2/4"}>
						Bảng tổng hợp lương nhân viên
					</td>
					<td className={"p-2 border-0.5 border-primary-border"}>
						Vào xem chi tiết để tải báo cáo
					</td>
				</tr>
				<tr className="text-[14px]">
					<td className={"p-2 border-t-0.5 border-b-0.5 border-primary-border text-center w-10"}>5</td>
					<td className={"p-2 border-0.5 border-primary-border text-cbs-highlight-color w-1/4"}>
						<Link to ={`/fnb/reports/type/5`}>
							Báo cáo doanh số
						</Link>
					</td>
					<td className={"p-2 border-0.5 border-primary-border w-2/4"}>
						Báo cáo doanh số theo từng điểm bán
					</td>
					<td className={"p-2 border-0.5 border-primary-border"}>
						Vào xem chi tiết để tải báo cáo
					</td>
				</tr>
			</table>
		</main>
	);
};