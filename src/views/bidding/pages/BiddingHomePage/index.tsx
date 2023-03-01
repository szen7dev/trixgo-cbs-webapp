/*=====1.LIBRARY=====*/
import { FC, useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useHistory } from 'react-router-dom';

/*=====2.CSS=====*/
import cn from "classnames";
import styles from "../../styles/style.module.css";

/*=====3.ICONS=====*/
import TriangleDown from "assets/icons/TriangleDown";
import icon from "assets/images/icons8-bid-100.svg"
import ThreeDotsVertical from "assets/images/icon-3dots-vertical.svg";
import DownloadIcon from "assets/images/icons8-download-96.svg";
import ShareIcon from "assets/images/icons8-share-rounded-96.svg";
import CopyIcon from "assets/images/icons8-copy-96.svg";
import SendEmailIcon from "assets/images/icons8-send-email-96.svg";
import PencilIcon from "assets/images/icons8-pencil-96.svg";
import TrashIcon from "assets/images/icons8-remove-96.svg";
import PrintIcon from "assets/images/icons8-print-96.svg";
import SortingIcon from "assets/images/icons8-sorting-100.svg";

/*=====4.PAGES/COMPONENTS=====*/
import { SearchInput, Paginate } from "shareComponents/common";
import useCheckedList from "services/hooks/ppt/useCheckedList";

/*=====5.TYPINGS=====*/

/*=====6.HOOKS/APIS=====*/

/*=====7.OTHER=====*/

function getStatus(status: number) {
	if (status === 1)
		return "Chưa triển khai";
	if (status === 2)
		return "Đang triển khai";

	return "Đã hoàn thành";
}

const pages = [
	{ id: 'bids', title: 'Hồ sơ dự thầu' },
	{ id: 'bidding_documents', title: 'Hồ sơ mời thầu' },
	{ id: 'contractor_consulting', title: 'Tư vấn thầu' },
]

export const BiddingHomePage: FC = () => {
	const [pageActive, setPageActive] = useState('bids');
	const [data, setData] = useState<{ id: number, [key: string]: any }[]>([])
	const { assigned, handleChangeCheckbox, handleCheckAll, checkboxRef } = useCheckedList(data)

	const history = useHistory();

	useEffect(() => {
		document.title = "Note"
		setData(Array.from({ length: 30 }).map((_, index) => ({
			id: index,
			project: index % 2 ? "Thi công rà phá bom mìn, vật nổ" : 'Thi công ép cọc thí nghiệm, thí nghiệm cọc thí nghiệm và thi công ép cọc đại trà',
			joined: 8,
			worked: 15,
			created_at: "15:30 22/12/2021",
			updated_at: "15:30 22/12/2021",
			status: index,
		})));
	}, []);

	return (
		<div className={cn(styles.content, "bg-cbs-gray min-h-full")}>
			<div className={cn(styles['content-container'], styles.scroll, "overflow-y-auto px-4 pt-0 flex-1")}>
				<div className="flex flex-wrap">
					<div className="p-8 mt-4 flex bg-white mr-4 flex-1">
						<div className="mr-[100px]">
							<p className="text-lg text-primary-gray font-bold">Dự thầu</p>
							<p className="mt-6 text-2xl">78</p>
							<p className="mt-[18px] px-[18px] py-[10px] bg-cbs-schedule-yestoday text-white rounded">Download</p>
						</div>
						<div className="mr-[65px]">
							<div className="text-cbs-schedule-threeweek w-[56px] h-[56px] bg-cbs-pink rounded-full text-lg flex justify-center items-center mx-auto">12</div>
							<p className="mt-7 text-sm text-primary-gray">Đang triển khai</p>
						</div>
						<div>
							<div className="text-cbs-schedule-today w-[56px] h-[56px] bg-cbs-green-bg rounded-full text-lg flex justify-center items-center mx-auto">66</div>
							<p className="mt-7 text-sm text-primary-gray">Đang triển khai</p>
						</div>
					</div>
					<div className="p-8 mt-4 flex bg-cbs-schedule-twoweek mr-4 min-w-[280px] 2xl:min-w-[411px] justify-between">
						<div className="text-white">
							<p className="text-lg font-bold">Mời thầu</p>
							<p className="mt-[51px] text-4x-large">125</p>
							<p className="mt-2 text-sm">Gói thầu</p>
						</div>
						<div className="bg-cbs-schedule-yestoday w-12 h-12 rounded-full flex justify-center items-center">
							<img src={icon} alt="Icon" />
						</div>
					</div>
					<div className="p-8 mt-4 flex bg-cbs-schedule-yestoday min-w-[280px] 2xl:min-w-[411px] justify-between">
						<div className="text-white">
							<p className="text-lg font-bold">Tư vấn thầu</p>
							<p className="mt-[51px] text-4x-large">2.367</p>
							<p className="mt-2 text-sm">Gói thầu</p>
						</div>
						<div className="bg-cbs-schedule-twoweek w-12 h-12 rounded-full flex justify-center items-center">
							<img src={icon} alt="Icon" />
						</div>
					</div>
				</div>
				<div className={"relative bg-white mt-4"}>
					<div className="px-4 flex justify-between w-full text-primary-gray bg-white border-b border-cbs-border">
						<div className="flex flex-1 text-medium">
							{/* <div className="flex px-7 border border-cbs-border"> */}
							{pages.map(page => <button
								key={page.id}
								className={cn('flex items-center justify-center border-b-2 border-transparent mx-2 leading-4 py-3',
									{ 'border-cbs-primary text-black font-bold': page.id === pageActive })}
								onClick={() => setPageActive(page.id)}
							>
								{page.title}
							</button>)}
						</div>
					</div>
					<div className={"financial-cashflow-listing-heading flex items-center border-b py-2 px-6"}>
						<div className={"flex items-center flex-1"}>
							<div className={"text-lg"}>Quản lý đấu thầu</div>
							<SearchInput classNameWrapper={"ml-4 min-w-[296px]"} onChange={event => console.log(event.target.value)} />
							{/* <FinancialCashFlowFilterButton/> */}
							<button className="flex items-center ml-8 mr-5 min-w-max">
								<img className="w-[24px] h-[24px]" alt="icon" src={DownloadIcon} />
							</button>
							<button className="flex items-center mr-5 min-w-max">
								<img className="w-[24px] h-[24px]" alt="icon" src={ShareIcon} />
							</button>
							<button className="flex items-center mr-5 min-w-max">
								<img className="w-[24px] h-[24px]" alt="icon" src={CopyIcon} />
							</button>
							<button className="flex items-center mr-5 min-w-max">
								<img className="w-[24px] h-[24px]" alt="icon" src={SendEmailIcon} />
							</button>
							<button className="flex items-center mr-5 min-w-max">
								<img className="w-[24px] h-[24px]" alt="icon" src={PencilIcon} />
							</button>
							<button className="flex items-center mr-5 min-w-max">
								<img className="w-[24px] h-[24px]" alt="icon" src={TrashIcon} />
							</button>
							<button className="flex items-center mr-5 min-w-max">
								<img className="w-[24px] h-[24px]" alt="icon" src={PrintIcon} />
							</button>
							<button className={"bg-gray-50 flex items-center justify-center ml-3 px-3 h-[30px] rounded hover:bg-blue-100"}>
								<img src={SortingIcon} alt={"icon sorting icon"} />
								<span className={"ml-2 text-gray-500"}>Filter</span>
							</button>
						</div>
						<button className="rounded-full h-10 w-10 flex items-center justify-center bg-gray-100 ml-5">
							<img alt={"Icon"} src={ThreeDotsVertical} />
						</button>
					</div>
					<table className="text-black text-medium border-separate space-x-0 space-y-0 w-full" style={{ borderSpacing: 0 }}>
						<thead className="">
							<tr className="text-primary-gray whitespace-nowrap align-middle text-left">
								<th className="px-4 py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border w-1">
									<input className="cbs-checkbox" type="checkbox" value="" id="flexCheckDefault" onClick={handleCheckAll} ref={checkboxRef} />
									<button onClick={e => { e.stopPropagation(); }} className="ml-1.5 align-top">
										<TriangleDown className='inline-block' />
									</button>
								</th>
								<th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border">
									<span className="pl-2 border-l border-cbs-border">
										Gói thầu
									</span>
								</th>
								<th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border">
									<span className="pl-2 border-l border-cbs-border">
										Thuộc dự án
									</span>
								</th>
								<th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border">
									<span className="pl-2 border-l border-cbs-border">
										Chủ đầu tư
									</span>
								</th>
								<th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border">
									<span className="pl-2 border-l border-cbs-border">
										Thời điểm mời thầu
									</span>
								</th>
								<th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border" style={{ minWidth: "150px" }}>
									<span className="pl-2 border-l border-cbs-border">
										Thời điểm nộp thầu
									</span>
								</th>
								<th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border" style={{ minWidth: "150px" }}>
									<span className="pl-2 border-l border-cbs-border">
										Trạng thái
									</span>
								</th>
							</tr>
						</thead>
						<tbody className="text-small">
							{
								data.map(({
									id,
									project,
									joined,
									worked,
									created_at,
									updated_at,
									status,
								}) => {
									return (
										<tr key={id} className="text-left hover:bg-cbs-active-comment cursor-pointer" onClick={() => history.push({ pathname: '/bidding/' + id })}>
											<td className="pt-2.5 pb-3 px-4 border-b border-cbs-border text-left">
												<input className="cbs-checkbox" type="checkbox" value="" checked={assigned[id]} onChange={e => handleChangeCheckbox(e, { id })} />
											</td>
											<td className="pt-2.5 pb-3 px-2 border-b border-cbs-border">{project}</td>
											<td className="pt-2.5 pb-3 px-2 border-b border-cbs-border text-right">{joined}</td>
											<td className="pt-2.5 pb-3 px-2 border-b border-cbs-border text-right">{worked}</td>
											<td className="pt-2.5 pb-3 px-2 border-b border-cbs-border text-right">{created_at}</td>
											<td className="pt-2.5 pb-3 px-2 border-b border-cbs-border text-right">{updated_at}</td>
											<td className={cn("pt-2.5 pb-3 px-2 border-b border-cbs-border", { "text-cbs-primary": status === 1, "text-cbs-completed": status >= 2 })}>
												{getStatus(status)}
											</td>
										</tr>
									)
								})
							}
						</tbody>
					</table>
				</div>
			</div>
			<div
				className="sticky bottom-0 min-w-24 min-h-24 w-full z-10 flex items-center justify-center px-4"
			>
				<Paginate
					className="bg-white w-full border-t py-2 "
				/>
			</div>
		</div>
	);
};
export default BiddingHomePage;