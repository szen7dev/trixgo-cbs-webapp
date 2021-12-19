/**
 * ? Import orders:
 * ? 1. react importation
 * ? 2. third party libraries importation
 * ? 3. libs, services, data, api importation
 * ? 4. components, assets importation
 * ? 5. helpers, util importation
 * ? 6. typings importation
 */
import { ChangeEvent, FC, FormEventHandler, useState } from "react";

import { Link } from "react-router-dom";
import cn from "classnames";

import iconFilter from 'assets/images/icons8-filter-96.png';
import projectImage from "assets/images/project.jpg";
import styles from '../document.module.css';
import StatisticalChart from "../components/StatisticalChart";

interface IData {
	id: number
	title: string
	company: string
	count: number
}

const tabs = [
	{ id: "projects", title: "Dự án, phòng ban" },
	{ id: "Manage", title: "Quản trị ứng dụng" },
]

const DocumentDashboardPage: FC = () => {
	const [tab, setTab] = useState<string>(tabs[0].id)
	const [page] = useState<number>(1);
	const [type, setType] = useState<string>('all');

	const data: Array<IData> = Array.from(Array(30).keys()).map((_, i) => ({
		id: i,
		title: 'CHG.THT.Xây dựng cụm trường Tiểu học và THCS Tây Hồ Tây',
		company: 'Công ty Cổ phần Đầu tư và Thương mại Thủ Đô',
		count: 288
	}))

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleChange = (e: any) => { setType(e.target.value) };

	return (
		<div className="flex flex-col text-sm text-black overflow-hidden h-full bg-gray-100">
			{/* Statistical  */}
			<div className="flex flex-col bg-white text-cbs-subtext" style={{ height: "250px" }}>
				<div className="flex justify-between flex-wrap items-center pl-6 pr-2.5">
					<h3 className="text-x-large mt-2.5">Thống kê chủ đề (việc/hồ sơ) theo dự án/phòng ban</h3>
					<div className="flex items-center mt-2.5">
						<ul className="flex text-x-small" onChange={handleChange.bind(this)}>
							<li className="pr-3 pl-1">
								<label>
									<input type="radio" name="type" id="" value="all" defaultChecked={type === 'all'} className="mr-2.5" />
									Tất cả
								</label>
							</li>
							<li className="pr-3 pl-1">
								<label>
									<input type="radio" name="type" id="" value="week" defaultChecked={type === 'week'} className="mr-2.5" />
									Tuần này
								</label>
							</li>
							<li className="pr-3 pl-1">
								<label>
									<input type="radio" name="type" id="" value="month" defaultChecked={type === 'month'} className="mr-2.5" />
									Tháng này
								</label>
							</li>
							<li className="pr-3 pl-1">
								<label>
									<input type="radio" name="type" id="" value="quater" defaultChecked={type === 'quater'} className="mr-2.5" />
									Quý này
								</label>
							</li>
						</ul>
						<button className="rounded-md border border-cbs-border p-2">Chọn thời gian</button>
					</div>
				</div>
				<div className="flex-1">
					<StatisticalChart />
				</div>
			</div>

			{/* List */}
			<div className="bg-white text-cbs-subtext overflow-auto">
				<table className="w-full text-small font-normal border-collapse">
					<thead>
						<tr>
							<th className="font-normal">Dự án</th>
							<th className="font-normal">Tổng số/Đã hoàn thành</th>
							<th className="font-normal">Giám đốc dự án/PM/Thư ký</th>
							<th colSpan={2} className="font-normal">
								<div className="flex flex-nowrap justify-between items-center">
									<div>
										Hoạt động gần đây nhất
									</div>
									<div className="rounded-full flex my-2.5 bg-cbs-left-menu">
										<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-4 my-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
										</svg>
										<input className="bg-transparent focus:outline-none py-3 px-2.5 flex-1" placeholder="Tìm kiếm" />
									</div>
								</div>
							</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td className="pb-2 pl-5 pr-4 pt-2.5 border border-cbs-border">
								<div>
									<p className="text-black">MAR.HAR.Court Yard By Marriott Ha Long Bay</p>
									<div className="flex justify-between mt-2.5">
										<span>8/6/2021</span>
										<span>1/12/2024</span>
									</div>
									<div className="border border-cbs-border h-1.5 box-border mt-2">
										<div className="bg-cbs-subtext h-full" style={{ width: Math.random() * 100 + "%" }}></div>
									</div>
								</div>
							</td>
							<td className="pb-2 pl-5 pr-4 pt-2.5 border border-cbs-border">
								<div className="flex justify-between items-end mt-2.5">
									<span className="text-2x-large text-black mr-auto">6.350</span>
									<span>48%</span>
								</div>
								<div className="border border-cbs-border h-1.5 box-border mt-2">
									<div className="bg-cbs-schedule-after-7days h-full" style={{ width: Math.random() * 100 + "%" }}></div>
								</div>
							</td>
							<td className="pb-2 pl-5 pr-4 pt-2.5 border border-cbs-border text-black">
								<div className="whitespace-nowrap">
									<img src="https://gamek.mediacdn.vn/133514250583805952/2021/9/17/photo-1-1631856680040545802895.jpg" alt="Director" className="inline-block w-6 h-6 rounded-3xl mr-2.5" />
									Lê Lưu Phong-CPMI
								</div>
								<div className="whitespace-nowrap pl-9 w-max pt-1.5">
									<img src="https://gamek.mediacdn.vn/133514250583805952/2021/9/17/photo-1-1631856680040545802895.jpg" alt="Secretary" className="inline-block w-6 h-6 rounded-3xl mr-2.5" />
									Phùng Thị Thu-PGI
								</div>
							</td>
							<td className="pb-2 pl-5 pr-4 pt-2.5 border border-cbs-border">
								<div className="flex">
									<p>
										<b>Linh-CPMI</b>
										đã cập nhật hồ sợ
										<Link to="/" >
											hồ sơ
										</Link>
									</p>
									<button>
									Ngày nay
									</button>
								</div>
							</td>
							<td className="pb-2 pl-5 pr-4 pt-2.5 border border-cbs-border">as</td>
						</tr>
						{/* {data.map(d => {
							const colors = [
								"warn",
								"success",
								// "lime",
								// "purple",
								"danger",
								// "rose",
								// "info",
								// "dark-gray",
								"gray",
								// "plum",
								// "black"
							]
							const getRandomColor = (): string => { return colors[Math.floor(Math.random() * colors.length)] }
							return (
								<tr key={d.id}>
									<td>
										<div className="text-black">
											<Link to="/">
												CHG.THT.Xây dựng cụm trường Tiểu học và THCS Tây Hồ Tây
											</Link>
										</div>
										<div className="mt-3 text-x-small">
											<div className="inline-block w-2 h-2 mr-1.5 rounded-lg bg-current" />
											ĐÚNG TIẾN ĐỘ, VƯỢT NGÂN SÁCH
										</div>
										<div className="flex justify-between mt-2.5">
											<div>
												<p className={styles['text-tiny']}>
													Bắt đầu
												</p>
												<p>
													8/6/2020
												</p>
											</div>
											<div>
												<p className={styles['text-tiny']}>
													Kết thúc
												</p>
												<p>
													1/5/2021
												</p>
											</div>
										</div>
										<div className="flex relative mt-1">
											<div className="flex absolute inset-0 items-center">
												<div className={cn(styles.bar, styles['dark-gray'], "h-0.5 w-full")} />
											</div>
											<div className={cn(styles.bar, styles.black, "relative left-3 transform -translate-x-1/2 w-1 h-4")}></div>
										</div>
									</td>
									<td className="px-3 pt-4">
										<p>$150.000.000</p>
										<div className={cn(styles.lime, styles.circle, "h-1.5 mt-1")} />
										<p className="mt-2.5">$165.000.000</p>
										<div className="h-1.5 mt-1" style={{ backgroundColor: '#666666' }} />
										<div className="flex justify-between mt-4 items-center">
											<div>$15.000</div>
											<div className={cn(styles.danger, 'inline-block w-2 h-2 rounded-lg')} />
										</div>
									</td>
									<td className="px-5">
										<div>
											<div className="w-0 relative" style={{ left: `${d.progress}%` }}>
												<div className="w-min transform -translate-x-1/2">{d.progress}%</div>
											</div>
											<div className={cn(styles.progress, "w-full mt-0.5 h-1.5")} style={{ '--width': `${d.progress}%` } as React.CSSProperties} />
										</div>
									</td>
									<td className="px-5">
										<div>
											<div className="w-0 relative" style={{ left: `${d.progress}%` }}>
												<div className="w-min transform -translate-x-1/2">{d.progress}%</div>
											</div>
											<div className={cn(styles.progress, "w-full mt-0.5 h-1.5")} style={{ '--width': `${d.progress}%` } as React.CSSProperties} />
										</div>
									</td>
									<td>
										<p className="font-bold mt-2.5 uppercase">
											Đấu thầu
										</p>
									</td>
									<td className="px-4">
										<div>
											<div className="w-0 relative" style={{ left: `${d.progress}%` }}>
												<div className="w-min transform -translate-x-1/2 font-bold">3/5</div>
											</div>
											<div className={cn(styles.progress, "w-full h-1.5")} style={{ '--width': `${d.progress}%` } as React.CSSProperties} />
										</div>
									</td>
									<td style={{ color: "rgba(0, 96, 225, 1)", letterSpacing: "4%" }}>
										<svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline mr-2">
											<path d="M6.00005 0.998217C4.81078 0.998217 4.49197 0.999266 2.99978 0.998778C2.99978 0.998778 1.38869 1.00212 1.00037 1.00017C1.00032 1.09694 0.999756 0.887155 1.00012 1.50017C1.00031 1.84658 1.00037 2.1761 1.00037 2.50017C1.00037 3.27486 1.00061 4.23766 1.00047 5.00017C1.00007 6.50017 1.00007 7.50017 1.00031 9.00017C1.00007 9.50017 1.00031 10.5002 1.00031 11.0002C0.997731 11.0638 1.5 11 2 11C2.17969 11 2.46452 10.9959 2.5 11H4C4.30806 11.0116 4.19181 11 4.5 11C4.54846 11 4.93661 11.4632 5 11.5C5.02235 11.513 5.1212 11.6036 5.14739 11.6266C5.28066 11.7436 5.38498 11.8567 5.5 12C5.90165 12.5003 6.23297 12.9031 6.5 13.5C6.58223 13.6838 6.82589 13.6911 7 13.5C7.07711 13.3942 7.5 12.5 7.5 12.5L8 12C8.15687 11.7091 8.5 11 9 11H13V10.9989V10.4989V8.99895V5.99895V3.00017V0.999848H12H10C8.53817 0.999848 7.46523 0.998217 6.00005 0.998217Z" fill="currentColor" />
											<path d="M7 13.5C7.07711 13.3942 7.5 12.5 7.5 12.5C7.5 12.5 7.5 12.5 8 12C8.15687 11.7091 8.5 11 9 11C10.5 11 11.4945 11 13 11C13 11 13 11.1924 13 10.9989C13 10.7134 13 10.7845 13 10.4989C13 9.94469 13 9.5 13 8.99895C13 8 13 6.92793 13 5.99895C13 4.98419 13 3.99895 13 3.00017C13 2.7489 13 0.500524 13 0.999848C12.4305 0.999848 12.5 0.999848 12 0.999848C11.5 0.999848 10.4985 0.999848 10 0.999848C8.53817 0.999848 7.46523 0.998217 6.00005 0.998217C4.81078 0.998217 4.49197 0.999266 2.99978 0.998778C2.99978 0.998778 1.38869 1.00212 1.00037 1.00017C1.00032 1.09694 0.999756 0.887155 1.00012 1.50017C1.00031 1.84658 1.00037 2.1761 1.00037 2.50017C1.00037 3.27486 1.00061 4.23766 1.00047 5.00017C1.00007 6.50017 1.00007 7.50017 1.00031 9.00017C1.00007 9.50017 1.00031 10.5002 1.00031 11.0002C0.997731 11.0638 1.5 11 2 11C2.17969 11 2.46452 10.9959 2.5 11C3 11 3.5 11 4 11C4.30806 11.0116 4.19181 11 4.5 11C4.54846 11 4.93661 11.4632 5 11.5C5.02235 11.513 5.1212 11.6036 5.14739 11.6266C5.28066 11.7436 5.38498 11.8567 5.5 12C5.90165 12.5003 6.23297 12.9031 6.5 13.5C6.58223 13.6838 6.82589 13.6911 7 13.5ZM7 13.5C6.87287 13.6744 7.14443 13.3415 7 13.5Z" stroke="currentColor" strokeLinecap="round" />
										</svg>
										ADD COMMENT
									</td>
								</tr>
							)
						})} */}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default DocumentDashboardPage;
