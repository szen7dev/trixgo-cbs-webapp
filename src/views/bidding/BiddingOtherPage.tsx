import { FC, useEffect, useState } from "react";
import SwiperCore, { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Paginate from "../../../components/common/Paginate";
import SearchInput from "components/common/SearchInput";
import TriangleDown from "assets/icons/TriangleDown";
import cn from "classnames";

import styles from "./style.module.css";
import 'swiper/swiper-bundle.min.css';
import image from 'assets/images/image-home-project.png';
import logoPGI from 'assets/images/logo-pgi.png';
import iconAddress from 'assets/images/icons8-address-961.svg';
import iconBill from 'assets/images/icons8-bill-963.svg';
import iconPhone from 'assets/images/icons8-phone-1001.svg';
import iconEmail from 'assets/images/icons8-email-1002.svg';
import ThreeDotsVertical from "assets/images/icon-3dots-vertical.svg";
import SortingIcon from "assets/images/icons8-sorting-100.svg";
import DownloadIcon from "assets/images/icons8-download-96.svg";
import ShareIcon from "assets/images/icons8-share-rounded-96.svg";
import CopyIcon from "assets/images/icons8-copy-96.svg";
import SendEmailIcon from "assets/images/icons8-send-email-96.svg";
import PencilIcon from "assets/images/icons8-pencil-96.svg";
import TrashIcon from "assets/images/icons8-remove-96.svg";
import PrintIcon from "assets/images/icons8-print-96.svg";

SwiperCore.use([Pagination]);

const pages = [
	{ id: 'info', title: 'Thông tin chung' },
	{ id: 'finance', title: 'Năng lực tài chính' },
	{ id: 'contract', title: 'Hợp đồng minh chứng' },
]

const BiddingOtherPage: FC = () => {
	const [pageActive, setPageActive] = useState('info')
	useEffect(() => {
		document.title = "Trixgo | Note"
	}, []);
	let pageRender
	switch(pageActive) {
		case 'info':
			pageRender = 
			<>
				<div className="flex px-16 py-6">
					<img src={logoPGI} alt='Logo' className="w-[90px] h-[90px] mr-[60px]"/>
					<div>
						<p className="text-lg text-black">Công ty Cổ phần PGI Partners</p>
						<div className="flex text-[13px] mt-2">
							<img src={iconAddress} alt="Icon address" className="mr-4" />
							Tầng 3, tòa nhà 789, 147 Hoàng Quốc Việt, phường Nghĩa Đô, quận Cầu Giấy, thành phố Hà Nội
						</div>
						<div className="flex text-[13px] mt-2">
							<img src={iconBill} alt="Icon bill" className="mr-4" />
							0109560264
						</div>
						<div className="flex text-[13px] mt-2">
							<img src={iconPhone} alt="Icon phone" className="mr-4" />
							0123456789
						</div>
						<div className="flex text-[13px] mt-2">
							<img src={iconEmail} alt="Icon email" className="mr-4" />
							contact@pgipartner.com
						</div>
					</div>
				</div>
				<p className="px-4 mt-2">Datahub là dữ liệu minh bạch về năng lực các đơn vị</p>
				<p className="px-4 mt-2">Nhà thầu chỉ khai báo/cập nhật thông tin một lần, thông tin này sẽ được xác thực tại tất cả các gói thầu mà Nhà thầu tham dự trên nền tảng Trixgo tại các Chủ đầu tư khác nhau. Với việc kê khai thông tin này, đồng nghĩa với việc nhà thầu xác nhận sẽ sử dụng năng lực của mình để tham dự thầu trên nền tảng Trixgo.</p> 
				<p className="px-4 text-primary mt-2">Nhà thầu cần đảm bảo và chịu trách nhiệm về tính trung thực của các thông tin kê khai, tránh việc phải làm rõ trong quá trình dự thầu và thương thảo đàm phán.</p> 
			</>
			break;
		case 'finance':
			pageRender = 
			<>
				<div className={"paginate-wrapper relative bg-white mt-4"}>
					<div className={"flex items-center border-b py-2 px-6"}>
						<div className={"flex items-center flex-1"}>
							<div className={"text-lg text-black"}>Năng lực tài chính</div>
							<SearchInput classNameWrapper={"ml-4 mr-6 min-w-[296px]"} onChange={event => console.log(event.target.value)}/>
							<button className="flex items-center mr-5 min-w-max">
								<img className="w-[24px] h-[24px]" alt="icon" src={DownloadIcon}/>
							</button>
							<button className="flex items-center mr-5 min-w-max">
								<img className="w-[24px] h-[24px]" alt="icon" src={ShareIcon}/>
							</button>
							<button className="flex items-center mr-5 min-w-max">
								<img className="w-[24px] h-[24px]" alt="icon" src={CopyIcon}/>
							</button>
							<button className="flex items-center mr-5 min-w-max">
								<img className="w-[24px] h-[24px]" alt="icon" src={SendEmailIcon}/>
							</button>
							<button className="flex items-center mr-5 min-w-max">
								<img className="w-[24px] h-[24px]" alt="icon" src={PencilIcon}/>
							</button>
							<button className="flex items-center mr-5 min-w-max">
								<img className="w-[24px] h-[24px]" alt="icon" src={TrashIcon}/>
							</button>
							<button className="flex items-center mr-5 min-w-max">
								<img className="w-[24px] h-[24px]" alt="icon" src={PrintIcon}/>
							</button>
							<button className={"bg-gray-50 flex items-center justify-center ml-3 px-3 h-[30px] rounded hover:bg-blue-100"}>
								<img src={SortingIcon} alt={"icon sorting icon"}/>
								<span className={"ml-2 text-gray-500"}>Filter</span>
							</button>
						</div>
						<button className={"bg-green-success h-[32px] text-white rounded px-5"}>Tạo mới</button>
						<button className="rounded-full h-10 w-10 flex items-center justify-center bg-gray-100 ml-5">
							<img alt={"Icon"} src={ThreeDotsVertical}/>
						</button>
					</div>
					<div className={"overflow-x-auto"}>
						<div className={"relative table border-collapse w-full"}>
							<div className={"header bg-cbs-table-header flex table-row sticky z-10"}>
								<div className={"px-6 py-1 table-cell box-border border-b align-middle w-3 max-h-[50px]"}>
									<div className={"flex items-center"}>
										<input className="form-check-input mr-2" type="checkbox" value="" id="flexCheckDefault"/>
										<TriangleDown/>
									</div>
								</div>
								<div className={"px-2 pt-3 pb-[6px] table-cell box-border border-b align-top text-gray-500 min-w-[100px] leading-4"}>
									Năm tài chính
								</div>
								<div className={"px-2 pt-3 pb-[6px] table-cell box-border border-b align-top text-gray-500 leading-4"}>
									Tổng tài sản
								</div>
								<div className={"px-2 pt-3 pb-[6px] table-cell box-border border-b align-top text-gray-500 leading-4"}>
									Tổng nợ
								</div>
								<div className={"px-2 pt-3 pb-[6px] table-cell box-border border-b align-top text-gray-500 leading-4"}>
									Giá trị tài sản dòng
								</div>
								<div className={"px-2 pt-3 pb-[6px] table-cell box-border border-b align-top text-gray-500 leading-4"}>
									Tài sản ngắn hạn
								</div>
								<div className={"px-2 pt-3 pb-[6px] table-cell box-border border-b align-top text-gray-500 leading-4"}>
									Nợ ngắn hạn
								</div>
								<div className={"px-2 pt-3 pb-[6px] table-cell box-border border-b align-top text-gray-500 leading-4"}>
									Vốn lưu động
								</div>
								<div className={"px-2 pt-3 pb-[6px] table-cell box-border border-b align-top text-gray-500 leading-4"}>
									Tổng doanh thu
								</div>
								<div className={"px-2 pt-3 pb-[6px] table-cell box-border border-b align-top text-gray-500 min-w-[140px] leading-4"}>
									Doanh thu trong lĩnh vực xây dựng
								</div>
								<div className={"px-2 pt-3 pb-[6px] table-cell box-border border-b align-top text-gray-500 leading-4"}>
									Lợi nhuận trước thuế
								</div>
								<div className={"px-2 pt-3 pb-[6px] table-cell box-border border-b align-top text-gray-500 leading-4"}>
									Lợi nhuận sau thuế
								</div>
								<div className={"px-2 pt-3 pb-[6px] table-cell box-border border-b align-top text-gray-500 leading-4"}>
									Lợi nhuận sau thuế
								</div>
								<div className={"px-2 pt-3 pb-[6px] table-cell box-border border-b align-top text-gray-500 leading-4"}>
									Tài liệu xác nhận
								</div>
							</div>
							<div className={"body-table row flex table-row"}>
								<div className={"px-6 py-4 table-cell box-border border-b align-middle w-3"}>
									<input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
								</div>
								<div className={"px-2 py-4 table-cell box-border border-b align-middle w-2/12"}>
									2020
								</div>
								<div className={"px-2 py-4 table-cell box-border border-b"}>
									10.000.000.000
								</div>
								<div className={"px-2 py-4 table-cell box-border border-b"}>
									10.000.000.000
								</div>
								<div className={"px-2 py-4 table-cell box-border border-b"}>
									10.000.000.000
								</div>
								<div className={"px-2 py-4 table-cell box-border border-b"}>
									10.000.000.000
								</div>
								<div className={"px-2 py-4 table-cell box-border border-b"}>
									10.000.000.000
								</div>
								<div className={"px-2 py-4 table-cell box-border border-b"}>
									10.000.000.000
								</div>
								<div className={"px-2 py-4 table-cell box-border border-b"}>
									10.000.000.000
								</div>
								<div className={"px-2 py-4 table-cell box-border border-b"}>
									10.000.000.000
								</div>
								<div className={"px-2 py-4 table-cell box-border border-b"}>
									10.000.000.000
								</div>
								<div className={"px-2 py-4 table-cell box-border border-b"}>
									10.000.000.000
								</div>
								<div className={"px-2 py-4 table-cell box-border border-b"}>
									10.000.000.000
								</div>
								<div className={"px-2 py-4 table-cell box-border border-b text-primary"}>
									BaoCaoTaiChinh2020.pdf
								</div>
							</div>
							<div className={"body-table row flex table-row"}>
								<div className={"px-6 py-4 table-cell box-border border-b align-middle w-3"}>
									<input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
								</div>
								<div className={"px-2 py-4 table-cell box-border border-b align-middle w-2/12"}>
									2020
								</div>
								<div className={"px-2 py-4 table-cell box-border border-b"}>
									10.000.000.000
								</div>
								<div className={"px-2 py-4 table-cell box-border border-b"}>
									10.000.000.000
								</div>
								<div className={"px-2 py-4 table-cell box-border border-b"}>
									10.000.000.000
								</div>
								<div className={"px-2 py-4 table-cell box-border border-b"}>
									10.000.000.000
								</div>
								<div className={"px-2 py-4 table-cell box-border border-b"}>
									10.000.000.000
								</div>
								<div className={"px-2 py-4 table-cell box-border border-b"}>
									10.000.000.000
								</div>
								<div className={"px-2 py-4 table-cell box-border border-b"}>
									10.000.000.000
								</div>
								<div className={"px-2 py-4 table-cell box-border border-b"}>
									10.000.000.000
								</div>
								<div className={"px-2 py-4 table-cell box-border border-b"}>
									10.000.000.000
								</div>
								<div className={"px-2 py-4 table-cell box-border border-b"}>
									10.000.000.000
								</div>
								<div className={"px-2 py-4 table-cell box-border border-b"}>
									10.000.000.000
								</div>
								<div className={"px-2 py-4 table-cell box-border border-b text-primary"}>
									BaoCaoTaiChinh2020.pdf
								</div>
							</div>
						</div>
					</div>
					{/* <Paginate  hasNextPage={hasNextPage} totalRecord={totalRecord} totalPages={totalPages} isFetching={isLoadingListMedias} nextPageAction={nextPageListMedias} prevPageAction={prevPageListMedias}/> */}
				</div>
			</>
			break;
		case 'contract':
			pageRender = 
			<>
				<div className={"paginate-wrapper relative bg-white mt-4"}>
					<div className={"flex items-center border-b py-2 px-6"}>
						<div className={"flex items-center flex-1"}>
							<div className={"text-lg"}>Hợp đồng minh chứng</div>
							<SearchInput classNameWrapper={"ml-4 mr-6 min-w-[296px]"} onChange={event => console.log(event.target.value)}/>
							{/* <FinancialCashFlowFilterButton/> */}
							<button className="flex items-center mr-5 min-w-max">
								<img className="w-[24px] h-[24px]" alt="icon" src={DownloadIcon}/>
							</button>
							<button className="flex items-center mr-5 min-w-max">
								<img className="w-[24px] h-[24px]" alt="icon" src={ShareIcon}/>
							</button>
							<button className="flex items-center mr-5 min-w-max">
								<img className="w-[24px] h-[24px]" alt="icon" src={CopyIcon}/>
							</button>
							<button className="flex items-center mr-5 min-w-max">
								<img className="w-[24px] h-[24px]" alt="icon" src={SendEmailIcon}/>
							</button>
							<button className="flex items-center mr-5 min-w-max">
								<img className="w-[24px] h-[24px]" alt="icon" src={PencilIcon}/>
							</button>
							<button className="flex items-center mr-5 min-w-max">
								<img className="w-[24px] h-[24px]" alt="icon" src={TrashIcon}/>
							</button>
							<button className="flex items-center mr-5 min-w-max">
								<img className="w-[24px] h-[24px]" alt="icon" src={PrintIcon}/>
							</button>
							<button className={"bg-gray-50 flex items-center justify-center ml-3 px-3 h-[30px] rounded hover:bg-blue-100"}>
								<img src={SortingIcon} alt={"icon sorting icon"}/>
								<span className={"ml-2 text-gray-500"}>Filter</span>
							</button>
						</div>
						<button className={"bg-green-success h-[32px] text-white rounded px-5"}>Tạo mới</button>
						<button className="rounded-full h-10 w-10 flex items-center justify-center bg-gray-100 ml-5">
							<img alt={"Icon"} src={ThreeDotsVertical}/>
						</button>
					</div>
					<div className={"overflow-x-auto"}>
						<div className={"relative table border-collapse w-full"}>
							<div className={"header bg-cbs-table-header flex table-row sticky z-10"}>
								<div className={"px-6 pt-3 pb-[6px] table-cell box-border border-b align-middle w-3"}>
									<div className={"flex items-center"}>
										<input className="form-check-input mr-2" type="checkbox" value="" id="flexCheckDefault"/>
										<TriangleDown/>
									</div>
								</div>
								<div className={"px-2 pt-3 pb-[6px] table-cell box-border border-b align-top text-gray-500 leading-4"}>
									Quy mô và tính chất
								</div>
								<div className={"px-2 pt-3 pb-[6px] table-cell box-border border-b align-top text-gray-500 leading-4"}>
									Tên hợp đồng
								</div>
								<div className={"px-2 pt-3 pb-[6px] table-cell box-border border-b align-top text-gray-500 leading-4"}>
									Mã hiệu
								</div>
								<div className={"px-2 pt-3 pb-[6px] table-cell box-border border-b align-top text-gray-500 leading-4"}>
									Ngày ký
								</div>
								<div className={"px-2 pt-3 pb-[6px] table-cell box-border border-b align-top text-gray-500 leading-4"}>
									Bắt đầu
								</div>
								<div className={"px-2 pt-3 pb-[6px] table-cell box-border border-b align-top text-gray-500 leading-4"}>
									Kết thúc
								</div>
								<div className={"px-2 pt-3 pb-[6px] table-cell box-border border-b align-top text-gray-500 min-w-[155px] leading-4"}>
									Giá trị hợp đồng mà nhà thầu tham gia
								</div>
								<div className={"px-2 pt-3 pb-[6px] table-cell box-border border-b align-top text-gray-500 min-w-[120px] leading-4"}>
									Mô tả khác
								</div>
								<div className={"px-2 pt-3 pb-[6px] table-cell box-border border-b align-top text-gray-500 leading-4"}>
									Tài liệu xác nhận
								</div>
							</div>
							<div className={"body-table row flex table-row"}>
								<div className={"px-6 py-4 table-cell box-border border-b align-middle w-3"}>
									<input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
								</div>
								<div className={"px-2 py-4 table-cell box-border border-b align-middle"}>
									Dự án nhóm A, công trình cấp 1, Dân dụng
								</div>
								<div className={"px-2 py-4 table-cell box-border border-b"}>
									Tư vấn Quản lý dự án và Tư vấn giám sát
								</div>
								<div className={"px-2 py-4 table-cell box-border border-b"}>
									005/HDKT/CCC-HHH
								</div>
								<div className={"px-2 py-4 table-cell box-border border-b"}>
									15/12/2021
								</div>
								<div className={"px-2 py-4 table-cell box-border border-b"}>
									15/12/2021
								</div>
								<div className={"px-2 py-4 table-cell box-border border-b"}>
									15/12/2021
								</div>
								<div className={"px-2 py-4 table-cell box-border border-b"}>
									10.000.000.000
								</div>
								<div className={"px-2 py-4 table-cell box-border border-b"}>
									Đang quyết toán
								</div>
								<div className={"px-2 py-4 table-cell box-border border-b"}>
									BaoCaoTaiChinh2020.pdf
								</div>
							</div>
							<div className={"body-table row flex table-row"}>
								<div className={"px-6 py-4 table-cell box-border border-b align-middle w-3"}>
									<input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
								</div>
								<div className={"px-2 py-4 table-cell box-border border-b align-middle"}>
									Dự án nhóm A, công trình cấp 1, Dân dụng
								</div>
								<div className={"px-2 py-4 table-cell box-border border-b"}>
									Tư vấn Quản lý dự án và Tư vấn giám sát
								</div>
								<div className={"px-2 py-4 table-cell box-border border-b"}>
									005/HDKT/CCC-HHH
								</div>
								<div className={"px-2 py-4 table-cell box-border border-b"}>
									15/12/2021
								</div>
								<div className={"px-2 py-4 table-cell box-border border-b"}>
									15/12/2021
								</div>
								<div className={"px-2 py-4 table-cell box-border border-b"}>
									15/12/2021
								</div>
								<div className={"px-2 py-4 table-cell box-border border-b"}>
									10.000.000.000
								</div>
								<div className={"px-2 py-4 table-cell box-border border-b"}>
									Đang quyết toán
								</div>
								<div className={"px-2 py-4 table-cell box-border border-b"}>
									BaoCaoTaiChinh2020.pdf
								</div>
							</div>
							<div className={"body-table row flex table-row"}>
								<div className={"px-6 py-4 table-cell box-border border-b align-middle w-3"}>
									<input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
								</div>
								<div className={"px-2 py-4 table-cell box-border border-b align-middle"}>
									Dự án nhóm A, công trình cấp 1, Dân dụng
								</div>
								<div className={"px-2 py-4 table-cell box-border border-b"}>
									Tư vấn Quản lý dự án và Tư vấn giám sát
								</div>
								<div className={"px-2 py-4 table-cell box-border border-b"}>
									005/HDKT/CCC-HHH
								</div>
								<div className={"px-2 py-4 table-cell box-border border-b"}>
									15/12/2021
								</div>
								<div className={"px-2 py-4 table-cell box-border border-b"}>
									15/12/2021
								</div>
								<div className={"px-2 py-4 table-cell box-border border-b"}>
									15/12/2021
								</div>
								<div className={"px-2 py-4 table-cell box-border border-b"}>
									10.000.000.000
								</div>
								<div className={"px-2 py-4 table-cell box-border border-b"}>
									Đang quyết toán
								</div>
								<div className={"px-2 py-4 table-cell box-border border-b"}>
									BaoCaoTaiChinh2020.pdf
								</div>
							</div>
						</div>
					</div>
					{/* <Paginate  hasNextPage={hasNextPage} totalRecord={totalRecord} totalPages={totalPages} isFetching={isLoadingListMedias} nextPageAction={nextPageListMedias} prevPageAction={prevPageListMedias}/> */}
				</div>
			</>
			break;
  		default:
	}
	
	return (
		<div className={cn(styles.content, "bg-cbs-gray")}>
			<div className='text-cbs-subtext bg-white w-full'>
				<div className="flex px-7 border border-cbs-border">
					{pages.map(page => <div key={page.id} className={cn(styles.navigator, { [styles.active]: page.id === pageActive }, 'py-3')}>
						<button onClick={() => setPageActive(page.id)}>
							{page.title}
						</button>
					</div>)}
				</div>
				{pageRender}
			</div>
		</div>
	);
};
export default BiddingOtherPage;