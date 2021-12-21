/**
 * ? Import orders:
 * ? 1. react importation
 * ? 2. third party libraries importation
 * ? 3. libs, services, data, api importation
 * ? 4. components, assets importation
 * ? 5. helpers, util importation
 * ? 6. typings importation
 */
import { FC, useState } from "react";

import { Link } from "react-router-dom";
import moment from "moment";
import cn from "classnames";

import StatisticalChart from "../components/StatisticalChart";

import iconComment from 'assets/images/icon-chat-project.png';
import SliderOver from "../components/common/SliderOver";

interface IData {
	id: number,
	name: string,
	director: string,
	secretary: string,
	actions: {
		type: string,
		updateAt: number,
		name: string
	},
	comment: {
		user: string
		message: string
	}
}

const getType = (key: number) => {
	switch (key) {
		case 1:
			return 'đã cập nhật'
		default:
			return 'đã tạo mới'
	}
}

const getDate = (time: number): number => {
	return (new Date()).setDate((new Date()).getDate() - 1 * time);
}
const getClass = (date: number) => {
	const time = Date.now() - date;
	let n = 0;
	switch (true) {
		case time < 24 * 60 * 60 * 1000:
			return { class: 'bg-cbs-schedule-today', message: 'Ngày nay' }
		case time < 2 * 24 * 60 * 60 * 1000:
			return { class: 'bg-cbs-schedule-yestoday', message: 'Ngày hôm qua' }
		case time < 7 * 24 * 60 * 60 * 1000:
			n = moment(Date.now()).diff(date, 'day');
			return { class: 'bg-cbs-schedule-oneweek', message: n + ' ngày' }
		case time < 2 * 7 * 24 * 60 * 60 * 1000:
			n = moment(Date.now()).diff(date, 'weeks');
			return { class: 'bg-cbs-schedule-twoweek', message: n + ' tuần' }
		case time < 4 * 7 * 24 * 60 * 60 * 1000:
			n = moment(Date.now()).diff(date, 'weeks');
			return { class: 'bg-cbs-schedule-threeweek', message: n + ' tuần' }
		default:
			n = moment(Date.now()).diff(date, 'month') + 1;
			return { class: 'bg-cbs-schedule-threeweek', message: n + ' tháng' }
	}
}

const DocumentDashboardPage: FC = () => {
	const [type, setType] = useState<string>('all');
	const [open, setOpen] = useState<boolean>(false);

	const data: Array<IData> = Array.from(Array(30).keys()).map((_, i) => ({
		id: i,
		name: 'MAR.HAR.Court Yard By Marriott Ha Long Bay',
		director: 'Lê Lưu Phong-CPMI',
		secretary: 'Cao Thu Linh-CPMI',
		actions: {
			type: getType(i % 2),
			updateAt: getDate(i),
			name: 'Linh-CPMI'
		},
		comment: {
			user: 'Phùng Thị Hà-PGI',
			message: 'Hồ sơ dự án sao lâu không thấy cập nhật vậy chị Ngọc ơi, có vướng gì không?'
		}
	}))

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleChange = (e: any) => { setType(e.target.value) };

	return (
		<>
			<div className="flex flex-col text-sm text-black overflow-x-hidden bg-gray-100 px-3.5 h-max">
				{/* Statistical  */}
				<div className="flex flex-col bg-white text-cbs-subtext mt-4" style={{ height: "250px" }}>
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
				<div className="bg-white text-cbs-subtext mt-4 overflow-x-auto">
					<table className="w-full text-small font-normal border-collapse">
						<thead className="bg-white sticky top-0 z-10">
							<tr className="text-left whitespace-nowrap  border-b border-cbs-border">
								<th className="font-normal pl-4 pr-3">Dự án</th>
								<th className="font-normal pl-4 pr-3">Tổng số/Đã hoàn thành</th>
								<th className="font-normal pl-4 pr-3">Giám đốc dự án/PM/Thư ký</th>
								<th colSpan={3} className="font-normal pl-4 pr-3">
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
							{data.map((d, index) => <tr key={index}>
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
								<td className="pb-2 pl-5 pr-1 pt-2.5 border border-r-0 border-cbs-border align-middle" style={{ minWidth: "155px" }}>
									<p>
										<b>{d.actions.name}</b>
										{d.actions.type} hồ sợ
										<Link to="/" >
											hồ sơ
										</Link>
									</p>
								</td>
								<td className="pb-2 pl-1 pr-4 pt-2.5 border border-l-0 border-cbs-border align-middle text-right">
									<div className="whitespace-nowrap">
										<button className={cn("text-small px-3 py-2 rounded-sm text-white", getClass(d.actions.updateAt).class)}>
											{getClass(d.actions.updateAt).message}
										</button>
									</div>
								</td>
								<td className="pl-5 border border-cbs-border relative" style={{ minWidth: "420px" }}>
									<div className="flex">
										<div className="flex pb-2 pt-3 pr-2.5">
											<div className="w-10 h-10 rounded-full overflow-hidden min-w-max mr-3">
												<img src="https://gamek.mediacdn.vn/133514250583805952/2021/9/17/photo-1-1631856680040545802895.jpg" alt="" width={40} height={40} className="h-full object-cover" />
											</div>
											<div>
												<p className="font-bold">{d.comment.user}</p>
												<p className="text-black mt-2">{d.comment.message}</p>
											</div>
										</div>
										<div className="whitespace-nowrap" style={{ width: "75px" }}>10:22 AM</div>
									</div>
									<button className="absolute bottom-0 right-0 whitespace-nowrap w-max bg-cbs-table-header rounded-tl-md px-3 py-1.5 text-x-small" onClick={() => setOpen(true)}>
										<img src={iconComment} alt="Comment" className="inline-block w-4 h-4 mr-1" />
										<span className="align-middle">
											21.3k
										</span>
									</button>
								</td>
							</tr>
							)}
						</tbody>
					</table>
				</div>
			</div>
			<SliderOver open={open} onClose={setOpen} />
		</>
	);
};

export default DocumentDashboardPage;
