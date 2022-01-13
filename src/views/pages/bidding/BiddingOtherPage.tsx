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
							<img src={iconBill} alt="Icon address" className="mr-4" />
							0109560264
						</div>
						<div className="flex text-[13px] mt-2">
							<img src={iconPhone} alt="Icon address" className="mr-4" />
							0123456789
						</div>
						<div className="flex text-[13px] mt-2">
							<img src={iconEmail} alt="Icon address" className="mr-4" />
							contact@pgipartner.com
						</div>
					</div>
				</div>
				<p className="px-4">Datahub là dữ liệu minh bạch về năng lực các đơn vị.<br /> Nhà thầu chỉ khai báo/cập nhật thông tin một lần, thông tin này sẽ được xác thực tại tất cả các gói thầu mà Nhà thầu tham dự trên nền tảng Trixgo tại các Chủ đầu tư khác nhau. Với việc kê khai thông tin này, đồng nghĩa với việc nhà thầu xác nhận sẽ sử dụng năng lực của mình để tham dự thầu trên nền tảng Trixgo.<br /> Nhà thầu cần đảm bảo và chịu trách nhiệm về tính trung thực của các thông tin kê khai, tránh việc phải làm rõ trong quá trình dự thầu và thương thảo đàm phán.</p> 
			</>
			break;
		case 'finance':
			pageRender = 
			<>
				<div className={"paginate-wrapper relative bg-white mt-4"}>
					<div className={"financial-cashflow-listing-heading flex items-center border-b py-2 px-6"}>
						<div className={"flex items-center flex-1"}>
							<div className={"text-lg"}>Năng lực tài chính</div>
							<SearchInput classNameWrapper={"ml-4"} onChange={event => console.log(event.target.value)}/>
							{/* <FinancialCashFlowFilterButton/> */}
						</div>
						<button className="rounded-full h-10 w-10 flex items-center justify-center bg-gray-100 ml-5">
							<img alt={"Icon"} src={ThreeDotsVertical}/>
						</button>
					</div>
					<div className={"financial-cashflow-table overflow-x-auto"}>
						<div className={"relative table border-collapse w-full"}>
							<div className={"header flex table-row sticky z-10"}>
								<div className={"px-6 py-4 table-cell box-border border-b align-middle w-3"}>
									<div className={"flex items-center"}>
										<input className="form-check-input mr-2" type="checkbox" value="" id="flexCheckDefault"/>
										<TriangleDown/>
									</div>
								</div>
								<div className={"px-2 py-4 table-cell box-border border-b align-middle w-2/12 text-gray-500"}>
									Năm tài chính
								</div>
								<div className={"px-2 py-4 table-cell box-border border-b align-middle text-gray-500"}>
									Tổng tài sản
								</div>
								<div className={"px-2 py-4 table-cell box-border border-b align-middle text-gray-500"}>
									Tổng nợ
								</div>
								<div className={"px-2 py-4 table-cell box-border border-b align-middle text-gray-500"}>
									Giá trị tài sản dòng
								</div>
								<div className={"px-2 py-4 table-cell box-border border-b align-middle text-gray-500"}>
									Tài sản ngắn hạn
								</div>
								<div className={"px-2 py-4 table-cell box-border border-b align-middle text-gray-500"}>
									Nợ ngắn hạn
								</div>
								<div className={"px-2 py-4 table-cell box-border border-b align-middle text-gray-500"}>
									Vốn lưu động
								</div>
								<div className={"px-2 py-4 table-cell box-border border-b align-middle text-gray-500"}>
									Tổng doanh thu
								</div>
								<div className={"px-2 py-4 table-cell box-border border-b align-middle text-gray-500"}>
									Doanh thu trong lĩnh vực xây dựng
								</div>
								<div className={"px-2 py-4 table-cell box-border border-b align-middle text-gray-500"}>
									Lợi nhuận trước thuế
								</div>
								<div className={"px-2 py-4 table-cell box-border border-b align-middle text-gray-500"}>
									Lợi nhuận sau thuế
								</div>
								<div className={"px-2 py-4 table-cell box-border border-b align-middle text-gray-500"}>
									Lợi nhuận sau thuế
								</div>
								<div className={"px-2 py-4 table-cell box-border border-b align-middle text-gray-500"}>
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
								<div className={"px-2 py-4 table-cell box-border border-b"}>
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
		case 'contract':
			pageRender = 
			<>
				<div className={"paginate-wrapper relative bg-white mt-4"}>
					<div className={"financial-cashflow-listing-heading flex items-center border-b py-2 px-6"}>
						<div className={"flex items-center flex-1"}>
							<div className={"text-lg"}>Hợp đồng minh chứng</div>
							<SearchInput classNameWrapper={"ml-4"} onChange={event => console.log(event.target.value)}/>
							{/* <FinancialCashFlowFilterButton/> */}
						</div>
						<button className="rounded-full h-10 w-10 flex items-center justify-center bg-gray-100 ml-5">
							<img alt={"Icon"} src={ThreeDotsVertical}/>
						</button>
					</div>
					<div className={"financial-cashflow-table overflow-x-auto"}>
						<div className={"relative table border-collapse w-full"}>
							<div className={"header flex table-row sticky z-10"}>
								<div className={"px-6 py-4 table-cell box-border border-b align-middle w-3"}>
									<div className={"flex items-center"}>
										<input className="form-check-input mr-2" type="checkbox" value="" id="flexCheckDefault"/>
										<TriangleDown/>
									</div>
								</div>
								<div className={"px-2 py-4 table-cell box-border border-b align-middle text-gray-500"}>
									Quy mô và tính chất
								</div>
								<div className={"px-2 py-4 table-cell box-border border-b align-middle text-gray-500"}>
									Tên hợp đồng
								</div>
								<div className={"px-2 py-4 table-cell box-border border-b align-middle text-gray-500"}>
									Mã hiệu
								</div>
								<div className={"px-2 py-4 table-cell box-border border-b align-middle text-gray-500"}>
									Ngày ký
								</div>
								<div className={"px-2 py-4 table-cell box-border border-b align-middle text-gray-500"}>
									Bắt đầu
								</div>
								<div className={"px-2 py-4 table-cell box-border border-b align-middle text-gray-500"}>
									Kết thúc
								</div>
								<div className={"px-2 py-4 table-cell box-border border-b align-middle text-gray-500"}>
									Giá trị hợp đồng mà nhà thầu tham gia
								</div>
								<div className={"px-2 py-4 table-cell box-border border-b align-middle text-gray-500 min-w-[120px]"}>
									Mô tả khác
								</div>
								<div className={"px-2 py-4 table-cell box-border border-b align-middle text-gray-500"}>
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