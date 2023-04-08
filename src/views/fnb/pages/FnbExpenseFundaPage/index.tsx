/*=====1.LIBRARY=====*/
import React, { FC, useCallback, useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import debounce from "lodash/debounce";
import moment from "moment";
import { formatNumberMoney } from "utils/converter";
import { toast } from "react-toastify";

/*=====2.CSS=====*/

/*=====3.ICONS=====*/
import PencilIcon from "assets/images/icons8-pencil-96.svg";

/*=====4.PAGES/COMPONENTS=====*/
import { SearchInput, ModalContainer } from "shareComponents/common";
import PaginateV2 from "shareComponents/common/PaginateV2";
import { CreateFnbExpenseFundaDetail } from "./modal";

/*=====5.TYPINGS=====*/

/*=====6.HOOKS/APIS=====*/
import { useCheckPerAccessApp } from "services/hooks/auth/usePermissions";
import { useFunda } from 'services/hooks/items/useFunda';
import { useFnbGeneralBook } from 'services/hooks/fnb/useFnbGeneralBook';
import { useAuth } from 'services/hooks/auth/useAuth';

/*=====7.OTHER=====*/
import { FNB_CHANNEL, FNB_BOOK_OUTIN, FNB_BOOK_TYPE, APP_ID } from "apis/localdb";

export const FnbExpenseFundaPage: FC = () => {
	const { user } = useAuth();
	const companyID = user?.company._id;
	useEffect(() => {
		document.title = "FnB";
	}, []);
	const history = useHistory();
	const { fundaID } = useParams<{ fundaID: string }>();
	const { hasPermission, dataUserAccess, isSuccess } = useCheckPerAccessApp({ appID: APP_ID.FNB.id });
	const [idsChecked, setIdsChecked] = useState<Array<string>>([]);
	const [keyword, setKeyword] = useState("");
	
    const { info: infoFunda } = useFunda({ params: { fundaID }, isFetchList: false, isFetchInfo: true  });
    const { isLoading, fetchNextPage, hasNextPage, totalRecord, listWithPager, totalPage, refetch } = useFnbGeneralBook({ 
		params: { 
			keyword: keyword, 
			fundasID: [fundaID], 
			populates: JSON.stringify({
				path: 'campaignName userCreate',
				// select: 'fullname name',
			}) 
		}, isFetchList: true, isFetchInfo: false  });
	const getStateChecked = useCallback((id: string) => {
		return idsChecked.includes(id) ? true : false;
	}, [idsChecked]);

	const onClickCheckButton = (id: string) => {
		setIdsChecked([id]);
	};

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
					<button
						className="flex items-center justify-center text-primary-light bg-cbs-green w-[85px] h-8 rounded font-bold ml-6"
						onClick={() => {
							setInitialValues(null);
							toggleModalCreateShiftDetail();
						}}
					>
						Tạo mới
					</button>
				</div>
				<PaginateV2
					ref={ref}
					totalRecord={totalRecord}
					totalPages={totalPage}
					limit={50}
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
								<input
									className="form-check-input"
									type="checkbox"
								/>
							</div>
						</th>
						<th className="pb-1 pt-1 w-[50px] font-normal">
							<div className="pl-2">
								TT
							</div>
						</th>
						<th className="pb-1 pt-1 font-normal">
							<div className="pl-2">
								Ngày tháng
							</div>
						</th>
						<th className="pb-1 pt-1 w-1/6 font-normal">
							<div className="pl-2">
								Phân loại
							</div>
						</th>
						<th className="pb-1 pt-1 font-normal w-2/5">
							<div className="pl-2">
								Nội dung
							</div>
						</th>
						<th className="pb-1 pt-1 font-normal">
							<div className="pl-2">
								Giá trị
							</div>
						</th>
						<th className="pb-1 pt-1 font-normal">
							<div className="pl-2">
								Người tạo
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
								<input
									className="form-check-input"
									type="checkbox"
									checked={getStateChecked(item._id)}
									onChange={() => onClickCheckButton(item._id)}
								/>
							</td>
							<td className={"p-2 border-0.5 border-primary-border"}>
								{i+1}
							</td>
							<td className={"p-2 border-0.5 border-primary-border"}>
								{moment(item?.date).format("DD/MM/YYYY")}
							</td>
							<td className={"p-2 border-0.5 border-primary-border"}>
								{FNB_BOOK_OUTIN[Number(item?.outin)-1].text}/{FNB_CHANNEL[Number(item?.revenueType)-1].text}/{FNB_BOOK_TYPE[Number(item?.expenseType)-1].text}
							</td>
							<td className={"p-2 border-0.5 border-primary-border text-cbs-primary"}>
								<Link to={`/fnb/expense/${fundaID}/${item?._id}`}>
									{item?.name}
								</Link>
							</td>
							<td className={"p-2 border-0.5 border-primary-border text-right"}>
								{formatNumberMoney(item?.amount)}
							</td>
							<td className={"p-2 border-0.5 border-primary-border"}>
								{item?.userCreate?.fullname}
								<p><i>{moment(item?.createAt).format("DD/MM/YYYY HH:mm")}</i></p>
							</td>
							<td className={"p-2 border-0.5 border-primary-border"}>
								{item?.note}
							</td>
						</tr>
					))
				}
			</table>

			<ModalContainer isModalOpen={modalCreateShiftDetail} toggle={toggleModalCreateShiftDetail}>
				<div className="inline-flex flex-col text-black w-full max-w-3xl my-8 overflow-hidden text-left align-middle transition-all transform bg-primary-light">
					<CreateFnbExpenseFundaDetail
						modalType={initialValues ? "update" : "create"}
						show={modalCreateShiftDetail}
						toggle={toggleModalCreateShiftDetail}
						initialValues={initialValues ? initialValues : undefined}
						onConfirm={onConfirmCreateShiftDetail}
						companyID = {companyID}
					/>
				</div>
			</ModalContainer>

		</main>
	)
}
