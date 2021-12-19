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
			<div>

			</div>
		</div>
	);
};

export default DocumentDashboardPage;
