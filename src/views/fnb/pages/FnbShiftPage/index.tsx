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

export const FnbShiftPage: FC = () => {
	useEffect(() => {
		document.title = "Trixgo | FnB";
	}, []);

	const history = useHistory();
	const { productID } = useParams<{ productID: string }>();
	const { hasPermission, dataUserAccess, isSuccess } = useCheckPerAccessApp({ appID: APP_ID.PCM.id });

	const [idsChecked, setIdsChecked] = useState<Array<string>>([]);
	const [keyword, setKeyword] = useState("");
	const { info: infoProduct } = useFnbProduct({ params: { productID }, isFetchList: false, isFetchInfo: true });
	// console.log({ infoProduct });

	/**
	 * List mẩu tin
	 */
	const { isLoading, fetchNextPage, hasNextPage, totalRecord, listWithPager, totalPage, refetch } = useFunda({
		params: {
			keyword: keyword,
			limit: 30,
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
		if (isSuccess && !(hasPermission && dataUserAccess?.level == 0)) {
			toast.error("Không có quyền truy cập. Bạn không phải là quản trị viên!");
			history.push("/")
		}
	}, [hasPermission, dataUserAccess]);

	type PaginateHandle = React.ElementRef<typeof PaginateV2>;
	const ref = React.useRef<PaginateHandle>(null);
	const [pageIndex, setPageIndex] = useState(0);

	return (
		<main className="h-full overflow-auto">
			<header className="sticky top-0 bg-primary-light z-10 flex items-center justify-between h-[50px] px-6 border border-primary-border">
				<div className="flex items-center">
					<p className="text-lg">Danh sách ca làm việc</p>
					{/* <button onClick={history.goBack}>
                        <img src="/images/common/button_back.png" alt="Button Back" />
                    </button> */}
					<p className="text-lg">{infoProduct?.name}</p>
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
									// onClick={() => {
									// 	const item = listWithPager[pageIndex].find((e: any) => e._id == idsChecked[0]);
									// 	setInitialValues({
									// 		...item,
									// 		startTime: item.startTime ? moment(item.startTime).format('MM/DD/YYYY') : '',
									// 		expiredTime: item.expiredTime ? moment(item.expiredTime).format('MM/DD/YYYY') : '',
									// 	});
									// 	toggleModalCreateProject();
									// }}
									>
										<img src={PencilIcon} alt="Pencil" />
									</div>
								</> : <></>
							}
						</div>
					) : <></>}
				</div>
				{/* <div className="flex items-center">
					<button
						className="flex items-center justify-center text-primary-light bg-cbs-green w-[85px] h-8 rounded font-bold ml-6"
						onClick={() => {
							setInitialValues(null);
							toggleModalCreateProject();
						}}
					>
						Tạo mới
					</button>
					<button className="w-10 h-10 rounded-full bg-cbs-gray flex items-center justify-center hover:bg-accent-light">
						<img src={Vertical3Dots} alt="3Dots" />
					</button>
				</div> */}
				<PaginateV2
					ref={ref}
					totalRecord={totalRecord}
					totalPages={totalPage}
					limit={20}
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
			</header>

			<div className={"w-full"}>
				<table className="w-full table-Auto">
					<thead>
						<tr className="text-primary-gray border-b-0.5 border-cbs-border">
							<th className="px-2 py-3">TT</th>
							<th className="text-left px-2 py-3">Tên</th>
							<th className="text-left px-2 py-3">Đia chỉ</th>
							<th className="text-left px-2 py-3">Bắt đầu</th>
							<th className="text-left px-2 py-3">Phân loại</th>
							<th className="text-left px-2 py-3">CP nguyên liệu</th>
							<th className="text-left px-2 py-3">CP thuê mặt bằng</th>
							<th className="text-left px-2 py-3">CP điện nước</th>
							<th className="text-left px-2 py-3">CP nhân sự</th>
							<th className="text-left px-2 py-3">CP khác</th>
							<th className="text-left px-2 py-3">Ghi chú</th>
						</tr>
					</thead>
					<tbody>
						{
							(listWithPager[pageIndex] ?? []).map((item: any, i: any) => (
								<tr key={item._id} className="border-b-0.5 border-cbs-border">
									<td className="text-center px-2 py-3">1</td>
									<td className="text-left px-2 py-3">
										<Link to={`/fnb/shift/${item._id}`}>{item?.name}</Link>
									</td>
									<td className="text-left px-2 py-3">{item?.address}, {item?.area3?.name}, {item?.area2?.name}, {item?.area1?.name}</td>
									<td className="text-left px-2 py-3">{item?.initialDay}</td>
									<td className="text-left px-2 py-3">Hệ thống</td>
									<td className="text-left px-2 py-3">{item?.materialExpenseRate}</td>
									<td className="text-left px-2 py-3">{item?.planExpense}</td>
									<td className="text-left px-2 py-3">{item?.utilityExpense}</td>
									<td className="text-left px-2 py-3">{item?.humanExpense}</td>
									<td className="text-left px-2 py-3">{item?.otherExpense}</td>
									<td className="text-left px-2 py-3">{item?.description}</td>
								</tr>
							))
						}
					</tbody>
				</table>
			</div>

			{/* <ModalContainer isModalOpen={modalCreateProject} toggle={toggleModalCreateProject}>
				<div className="inline-flex flex-col text-black w-full max-w-3xl my-8 overflow-hidden text-left align-middle transition-all transform bg-primary-light">
					<CreateFnbProductQoutas
						modalType={initialValues ? "update" : "create"}
						show={modalCreateProject}
						toggle={toggleModalCreateProject}
						initialValues={initialValues ? initialValues : undefined}
						onConfirm={onConfirmCreateProject}
					/>
				</div>
			</ModalContainer> */}

		</main>
	);
};
