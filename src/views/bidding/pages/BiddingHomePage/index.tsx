/*=====1.LIBRARY=====*/
import { FC, useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from 'react-router-dom';

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
import { SearchInput } from "shareComponents/common";

/*=====5.TYPINGS=====*/

/*=====6.HOOKS/APIS=====*/

/*=====7.OTHER=====*/

const pages = [
	{ id: 'bids', title: 'Hồ sơ dự thầu' },
	{ id: 'bidding_documents', title: 'Hồ sơ mời thầu' },
	{ id: 'contractor_consulting', title: 'Tư vấn thầu' },
]

export const BiddingHomePage: FC = () => {
	const [pageActive, setPageActive] = useState('bids')
	useEffect(() => {
		document.title = "Trixgo | Note"
	}, []);

	return (
		<div className={cn(styles.content, "bg-cbs-gray min-h-full")}>
			<div className={cn(styles['content-container'], styles.scroll, "overflow-y-auto p-4 pt-0 flex-1")}>
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
				<div className={"paginate-wrapper relative bg-white mt-4"}>
					<div className="flex px-7 border border-cbs-border">
						{pages.map(page => <div key={page.id} className={cn(styles.navigator, { [styles.active]: page.id === pageActive }, 'py-3')}>
							<button onClick={() => setPageActive(page.id)}>
								{page.title}
							</button>
						</div>)}
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
					<div className={"financial-cashflow-table"}>
						<div className={"relative table border-collapse w-full"}>
							<div className={"header bg-cbs-table-header flex table-row sticky z-10"}>
								<div className={"px-6 py-4 table-cell box-border border-b align-middle w-3"}>
									<div className={"flex items-center"}>
										<input className="form-check-input mr-2" type="checkbox" value="" id="flexCheckDefault" />
										<TriangleDown />
									</div>
								</div>
								<div className={"px-2 pt-3 pb-[6px] leading-4 table-cell box-border border-b align-top w-2/12 text-gray-500"}>
									Gói thầu
								</div>
								<div className={"px-2 pt-3 pb-[6px] leading-4 table-cell box-border border-b align-top text-gray-500"}>
									Thuộc dự án
								</div>
								<div className={"px-2 pt-3 pb-[6px] leading-4 table-cell box-border border-b align-top text-gray-500"}>
									Chủ đầu tư
								</div>
								<div className={"px-2 pt-3 pb-[6px] leading-4 table-cell box-border border-b align-top text-gray-500"}>
									<span className="inline-block w-max">Thời điểm mời thầu</span>
								</div>
								<div className={"px-2 pt-3 pb-[6px] leading-4 table-cell box-border border-b align-top text-gray-500 min-w-max"}>
									<span className="inline-block w-max">Thời điểm nộp thầu</span>
								</div>
								<div className={"px-2 pt-3 pb-[6px] leading-4 table-cell box-border border-b align-top text-gray-500"}>
									Trạng thái
								</div>
							</div>
							<div className={"body-table row flex table-row"}>
								<div className={"px-6 py-4 table-cell box-border border-b align-middle w-3"}>
									<input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
								</div>
								<Link to={`/bidding/12345`} className="px-2 py-4 table-cell box-border border-b align-middle w-2/12">
									Thi công rà phá bom mìn, vật nổ
								</Link>
								<div className={"px-2 py-4 table-cell box-border border-b"}>
									CHG.THT.Xây dựng cụm trường Tiểu học và THCS Tây Hồ Tây...
								</div>
								<div className={"px-2 py-4 table-cell box-border border-b"}>
									Công ty cổ phần đầu tư ABC
								</div>
								<div className={"px-2 py-4 table-cell box-border border-b"}>
									15:30 22/12/2021
								</div>
								<div className={"px-2 py-4 table-cell box-border border-b"}>
									15:30 22/12/2021
								</div>
								<div className={"px-2 py-4 table-cell box-border border-b"}>
									Chưa triển khai
								</div>
							</div>
							<div className={"body-table row flex table-row"}>
								<div className={"px-6 py-4 table-cell box-border border-b align-middle w-3"}>
									<input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
								</div>
								<Link to={`/bidding/12345`} className="px-2 py-4 table-cell box-border border-b align-middle w-2/12">
									Thi công rà phá bom mìn, vật nổ
								</Link>
								<div className={"px-2 py-4 table-cell box-border border-b"}>
									CHG.THT.Xây dựng cụm trường Tiểu học và THCS Tây Hồ Tây...
								</div>
								<div className={"px-2 py-4 table-cell box-border border-b"}>
									Công ty cổ phần đầu tư ABC
								</div>
								<div className={"px-2 py-4 table-cell box-border border-b"}>
									15:30 22/12/2021
								</div>
								<div className={"px-2 py-4 table-cell box-border border-b"}>
									15:30 22/12/2021
								</div>
								<div className={"px-2 py-4 table-cell box-border border-b"}>
									Đang triển khai
								</div>
							</div>
							<div className={"body-table row flex table-row"}>
								<div className={"px-6 py-4 table-cell box-border border-b align-middle w-3"}>
									<input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
								</div>
								<Link to={`/bidding/12345`} className="px-2 py-4 table-cell box-border border-b align-middle w-2/12">
									Thi công rà phá bom mìn, vật nổ
								</Link>
								<div className={"px-2 py-4 table-cell box-border border-b"}>
									CHG.THT.Xây dựng cụm trường Tiểu học và THCS Tây Hồ Tây...
								</div>
								<div className={"px-2 py-4 table-cell box-border border-b"}>
									Công ty cổ phần đầu tư ABC
								</div>
								<div className={"px-2 py-4 table-cell box-border border-b"}>
									15:30 22/12/2021
								</div>
								<div className={"px-2 py-4 table-cell box-border border-b"}>
									15:30 22/12/2021
								</div>
								<div className={"px-2 py-4 table-cell box-border border-b"}>
									Đã hoàn thành
								</div>
							</div>
						</div>
					</div>
					{/* <Paginate  hasNextPage={hasNextPage} totalRecord={totalRecord} totalPages={totalPages} isFetching={isLoadingListMedias} nextPageAction={nextPageListMedias} prevPageAction={prevPageListMedias}/> */}
				</div>
			</div>
		</div>
	);
};
export default BiddingHomePage;