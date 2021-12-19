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
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default DocumentDashboardPage;
