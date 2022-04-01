import { FC, useCallback, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import debounce from "lodash/debounce";
import { SearchInput, ModalContainer } from "shareComponents/common";
import Vertical3Dots from "assets/images/icon-3dots-vertical-gray.svg";
import FolderIcon from "assets/images/icons8-folder.svg";
import DownloadIcon from "assets/images/icons8-download-96.svg";
import styles from 'views/cmcs/styles/styles.module.css';
import cn from "classnames";
import moment from "moment";
import { useCheckPerAccessApp } from "services/hooks/auth/usePermissions";
import { toast } from "react-toastify";
import { APP_ID, CONTRACT_COME_IN_STATUS, DATE_FORMAT } from "apis/localdb";
import { useCmcs } from 'services/hooks/useCmcs';
import { useAuth } from "services/hooks/auth/useAuth";
import { formatNumberMoney } from "utils/cmcs";

const CmcsAdminContractTab: FC = () => {
	const history = useHistory();
	const { hasPermission, dataUserAccess } = useCheckPerAccessApp({ appID: APP_ID.CMCS.id });
	const [idsChecked, setIdsChecked] = useState<Array<string>>([]);
	const [keyword, setKeyword] = useState("");
	const { user } = useAuth();
	const {
		listContracts,
		totalRecord,
		nextPageListContracts,
		hasNextPage,
		refetchListContracts
	} = useCmcs({ companyID: user?.company._id, keyword: keyword });

	const getStateChecked = useCallback((id: string) => {
		return idsChecked.includes(id) ? true : false;
	}, [idsChecked]);

	const onClickCheckButton = (id: string) => {
		setIdsChecked([id]);
	};

	const getStateCheckedAll = useCallback(() => {
		return idsChecked.length == listContracts.length;
	}, [idsChecked]);

	const onClickCheckAll = () => {
		if (idsChecked.length == listContracts.length) {
			setIdsChecked([]);
		} else {
			const idsAll = listContracts.map((e: any) => e._id);
			setIdsChecked(idsAll);
		}
	};

	const getStatusValue = (value: number) => {
		return CONTRACT_COME_IN_STATUS.find(item => item.value === value)?.text;
	}

	useEffect(() => {
		if (!(hasPermission && dataUserAccess?.level == 0)) {
			toast.error("Không có quyền truy cập. Bạn không phải là quản trị viên!");
			history.push("/")
		}
	}, [hasPermission, dataUserAccess]);

	return (
		<main className="h-full overflow-auto">
			<header className="sticky top-0 bg-primary-light z-10 flex items-center justify-between h-[50px] px-6 border border-primary-border">
				<div className="flex items-center">
					<p className="text-lg">Danh sách</p>
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
							<div className="w-9 h-9 flex items-center justify-center rounded-full cursor-pointer hover:bg-cbs-gray">
								<img src={DownloadIcon} alt="Download" />
							</div>
						</div>
					) : <></>}
				</div>
				<div className="flex items-center">
					{/* <button
						className="flex items-center justify-center text-primary-light bg-cbs-green w-[85px] h-8 rounded font-bold mr-6"
						onClick={() => {
							setInitialValues(null);
							toggleModalCreateProject();
						}}
					>
						Tạo mới
					</button> */}
					<button className="w-10 h-10 rounded-full bg-cbs-gray flex items-center justify-center hover:bg-accent-light">
						<img src={Vertical3Dots} alt="3Dots" />
					</button>
				</div>
			</header>

			<table className="table-fixed border-collapse w-full overflow-auto border-l border-r border-primary-border">
				<thead className="bg-cbs-table-header h-10 border-b border-primary-border">
					<tr className="text-left text-sm text-primary-gray">
						<th className="pb-1 pt-1 text-center" style={{ width: "3.5%" }}>
							<div className="border-r-2 border-gray-300 flex items-center justify-center">
								<input
									className="form-check-input"
									type="checkbox"
									checked={getStateCheckedAll()}
									onChange={() => onClickCheckAll()}
								/>
							</div>
						</th>
						<th className="w-1/5 pb-1 pt-1">
							<div className="border-r-2 border-gray-300 font-normal pl-2">
								Hợp đồng
							</div>
						</th>
						<th className={cn("pb-1 pt-1 font-normal", styles.theadSignDate)}>
							<div className="border-r-2 border-gray-300 font-normal pl-2">
								Ngày ký
							</div>
						</th>
						<th className={cn("pb-1 pt-1 font-normal", styles.theadTenPercent)}>
							<div className="border-r-2 border-gray-300 font-normal pl-2">
								Giá trị ký + phát sinh (gồm cả VAT)
							</div>
						</th>
						<th className={cn("pb-1 pt-1 font-normal", styles.theadTenPercent)}>
							<div className="border-r-2 border-gray-300 font-normal pl-2">
								Giá trị nghiệm thu hoàn thành
							</div>
						</th>
						<th className={cn("pb-1 pt-1 font-normal", styles.theadTenPercent)}>
							<div className="border-r-2 border-gray-300 font-normal pl-2">
								Giá trị xuất hóa đơn (VAT)
							</div>
						</th>
						<th className={cn("pb-1 pt-1 font-normal", styles.theadTenPercent)}>
							<div className="border-r-2 border-gray-300 font-normal pl-2">
								Giá trị đề nghị tạm ứng+thanh toán
							</div>
						</th>
						<th className={cn("pb-1 pt-1 font-normal", styles.theadTenPercent)}>
							<div className="border-r-2 border-gray-300 font-normal pl-2">
								Giá trị đã tạm ứng, thanh toán
							</div>
						</th>
						<th className={cn("pb-1 pt-1 font-normal", styles.theadTenPercent)}>
							<div className="border-r-2 border-gray-300 font-normal pl-2">
								Còn lại phải thanh toán
							</div>
						</th>
						<th className={cn("pb-1 pt-1 font-normal", styles.theadTenPercent)}>
							<div className="font-normal pl-2">Tình trạng</div>
						</th>
					</tr>
				</thead>

				{listContracts && listContracts.length ?
					<tbody className="bg-primary-light text-left">
						{listContracts.map((item: any, index: number) => (
							<tr key={index} className="border-b border-primary-border h-10">
								<td className="py-1 px-2 text-center">
									<input
										className="form-check-input"
										type="checkbox"
										checked={getStateChecked(item._id)}
										onChange={() => onClickCheckButton(item._id)}
									/>
								</td>
								<td className="py-1 px-2">
									<Link to={`/cmcs/admin/${item._id}/contract`}>
										{item.name}
										<p className="text-primary-gray">{item?.project?.sign} | {item.sign}</p>
									</Link>
								</td>
								<td className="py-1 px-2"> {moment(item.date).isValid() && moment(item.date).format(DATE_FORMAT)}</td>
								<td className="py-1 px-2 text-right">{formatNumberMoney((item.value || 0) + (item.vatValue || 0) + (item.plus || 0) + (item.vatPlus || 0))} </td>
								<td className="py-1 px-2 text-right">{formatNumberMoney((item.acceptance || 0) + (item.vatAcceptance || 0) + (item.plusAcceptance || 0) + (item.vatPlusAcceptance || 0))}</td>
								<td className="py-1 px-2 text-right">0</td>
								<td className="py-1 px-2 text-right">{formatNumberMoney(item.recommendedPayment || 0)}</td>
								<td className="py-1 px-2 text-right">{formatNumberMoney((item.advancePaymentPaid || 0) + (item.amountPaid || 0))}</td>
								<td className="py-1 px-2 text-right">{formatNumberMoney(item.remainingPayment || 0)}</td>
								<td className="py-1 px-2">{getStatusValue(item.status)}</td>
							</tr>
						))
						}
					</tbody> : <></>
				}

			</table>
			{hasNextPage && (
				<div className="w-full flex justify-center my-5">
					<button onClick={() => nextPageListContracts()}>
						<span className="text-primary">{`Xem thêm (${totalRecord - listContracts.length
							})`}</span>
					</button>
				</div>
			)}
		</main>
	);
};

export default CmcsAdminContractTab;
