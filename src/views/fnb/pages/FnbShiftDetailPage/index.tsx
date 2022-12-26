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
import { CreateFnbShiftDetail } from "./modal";

/*=====5.TYPINGS=====*/

/*=====6.HOOKS/APIS=====*/
import { useModal } from "services/hooks/useModal";
import { useCheckPerAccessApp } from "services/hooks/auth/usePermissions";
import { useFnbProduct } from 'services/hooks/fnb/useFnbProduct';
import { useFnbQuota } from 'services/hooks/fnb/useFnbQuota';
import { useFunda } from 'services/hooks/items/useFunda';
import { useFnbShift } from 'services/hooks/fnb/useFnbShift';
import { useAuth } from 'services/hooks/auth/useAuth';

/*=====7.OTHER=====*/
import { APP_ID } from "apis/localdb";

const TYPE_PRODUCT = [
	{ value: 1, text: "Thông thường" },
	{ value: 2, text: "Topping" },
]
export const FnbShiftDetailPage: FC = () => {
	const { user } = useAuth();
	const companyID = user?.company._id;
	useEffect(() => {
		document.title = "Trixgo | FnB";
	}, []);
	const history = useHistory();
	const { fundaID } = useParams<{ fundaID: string }>();
	const { hasPermission, dataUserAccess, isSuccess } = useCheckPerAccessApp({ appID: APP_ID.PCM.id });
	const [idsChecked, setIdsChecked] = useState<Array<string>>([]);
	const [keyword, setKeyword] = useState("");
	
    const { info: infoFunda } = useFunda({ params: { fundaID }, isFetchList: false, isFetchInfo: true  });

    const { isLoading, fetchNextPage, hasNextPage, totalRecord, listWithPager, totalPage, refetch } = useFnbShift({ 
		params: { 
			keyword: keyword, 
			fundaID, 
			populates: JSON.stringify({
				path: 'staffs'
			}) 
		}, isFetchList: true, isFetchInfo: false  });

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

	const [modalCreateShiftDetail, setModalCreateShiftDetail] = useState<boolean>(false);
	const toggleModalCreateShiftDetail = () => setModalCreateShiftDetail(!modalCreateShiftDetail);

	const [initialValues, setInitialValues] = useState(null);
	const onConfirmCreateShiftDetail = () => {
		refetch();
		setIdsChecked([]);
	}

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
					<button
						className="flex items-center justify-center text-primary-light bg-cbs-green w-[85px] h-8 rounded font-bold ml-6"
						onClick={() => {
							setInitialValues(null);
							toggleModalCreateShiftDetail();
						}}
					>
						Tạo mới
					</button>
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
			<thead className="bg-cbs-table-header h-10 border-b">
					<tr className="text-left text-sm text-primary-gray text-[14px]">
						<th className="pb-1 pt-1 w-[50px] font-normal border-0.5 border-primary-border">
							<div className="pl-2">
								#
							</div>
						</th>
						<th className="pb-1 pt-1 font-normal border-0.5 border-primary-border w-[150px]">
							<div className="pl-2">
								Ca làm việc
							</div>
						</th>
						<th className="pb-1 pt-1 font-normal border-0.5 border-primary-border">
							<div className="pl-2">
								Tiền đầu ca (1)
							</div>
						</th>
						<th className="pb-1 pt-1 font-normal border-0.5 border-primary-border">
							<div className="pl-2">
								Tiền khách trả (2)
							</div>
						</th>
						<th className="pb-1 pt-1 font-normal border-0.5 border-primary-border">
							<div className="pl-2">
								Tổng tiền mặt (3=1+2)
							</div>
						</th>
						<th className="pb-1 pt-1 font-normal border-0.5 border-primary-border">
							<div className="pl-2">
								Chi phí trong ca (4)
							</div>
						</th>
						<th className="pb-1 pt-1 font-normal border-0.5 border-primary-border">
							<div className="pl-2">
								Tồn cuối ca (5)
							</div>
						</th>
						<th className="pb-1 pt-1 font-normal border-0.5 border-primary-border">
							<div className="pl-2">
								Dư/Thiếu (4+5-3)
							</div>
						</th>
						<th className="pb-1 pt-1 font-normal border-0.5 border-primary-border">
							<div className="pl-2">
								Tiền chuyển khoản
							</div>
						</th>
						<th className="pb-1 pt-1 font-normal border-0.5 border-primary-border">
							<div className="pl-2">
								Tiền Grab
							</div>
						</th>
						<th className="pb-1 pt-1 font-normal border-0.5 border-primary-border">
							<div className="pl-2">
								Tiền Shopee
							</div>
						</th>
						<th className="pb-1 pt-1 font-normal border-0.5 border-primary-border">
							<div className="pl-2">
								Tiền Gojek
							</div>
						</th>
						<th className="pb-1 pt-1 font-normal border-0.5 border-primary-border">
							<div className="pl-2">
								Tiền Baemin
							</div>
						</th>
						<th className="pb-1 pt-1 font-normal border-0.5 border-primary-border">
							<div className="pl-2">
								Tiền Loship
							</div>
						</th>
						<th className="pb-1 pt-1 font-normal border-0.5 border-primary-border">
							<div className="pl-2">
								Tiền Bee
							</div>
						</th>
						<th className="pb-1 pt-1 font-normal border-0.5 border-primary-border">
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
							<td className={"p-2 border-0.5 border-primary-border text-cbs-primary"} title="Bàn giao nguyên liệu">
								<Link to ={`/fnb/shift/${fundaID}/${item._id}/material`}>
									{item?.name}
								</Link>
							</td>
							{/* <td className={"p-2 border-0.5 border-primary-border"}>
								{moment(item?.createAt).format('DD/MM/YYYY HH:mm')}
							</td> */}
							<td className={"p-2 border-0.5 border-primary-border"}>
								{formatNumberMoney(500000)}
							</td>
							<td className={"p-2 border-0.5 border-primary-border"}>
								{formatNumberMoney(1000000)}
							</td>
							<td className={"p-2 border-0.5 border-primary-border"}>
								{formatNumberMoney(1500000)}
							</td>
							<td className={"p-2 border-0.5 border-primary-border"}>
								{formatNumberMoney(200000)}
							</td>
							<td className={"p-2 border-0.5 border-primary-border"}>
								{formatNumberMoney(1200000)}
							</td>
							<td className={"p-2 border-0.5 border-primary-border"}>
								{formatNumberMoney(-100000)}
							</td>
							<td className={"p-2 border-0.5 border-primary-border"}>
								{formatNumberMoney(300000)}
							</td>
							<td className={"p-2 border-0.5 border-primary-border"}>
								{formatNumberMoney(300000)}
							</td>
							<td className={"p-2 border-0.5 border-primary-border"}>
								{formatNumberMoney(300000)}
							</td>
							<td className={"p-2 border-0.5 border-primary-border"}>
								{formatNumberMoney(300000)}
							</td>
							<td className={"p-2 border-0.5 border-primary-border"}>
								{formatNumberMoney(300000)}
							</td>
							<td className={"p-2 border-0.5 border-primary-border"}>
								{formatNumberMoney(300000)}
							</td>
							<td className={"p-2 border-0.5 border-primary-border"}>
								{formatNumberMoney(300000)}
							</td>
							<td className={"p-2 border-0.5 border-primary-border"}>
								{item?.note}
							</td>
						</tr>
				))}
			</table>

			<ModalContainer isModalOpen={modalCreateShiftDetail} toggle={toggleModalCreateShiftDetail}>
				<div className="inline-flex flex-col text-black w-full max-w-3xl my-8 overflow-hidden text-left align-middle transition-all transform bg-primary-light">
					<CreateFnbShiftDetail
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
	);
};
