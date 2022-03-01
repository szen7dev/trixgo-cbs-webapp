/**
 * ? Import orders:
 * ? 1. react importation
 * ? 2. third party libraries importation
 * ? 3. libs, services, data, api importation
 * ? 4. components, assets importation
 * ? 5. helpers, util importation
 * ? 6. typings importation
 */
import { FC, useState, useEffect } from "react";

import StatisticalChart from "./components/StatisticalChart";

import CaretDownIcon from "assets/images/icon-caret-down.png";
import { useHistory } from "react-router-dom";
import { useCheckPerAccessApp, useCheckPerAccessOneMenu } from "services/hooks/useAuth";
import { APP_ID } from "apis/localdb";
import { toast } from "react-toastify";
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
	},
	mediaId: string
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

const ProjectDashboardTaskPage: FC = () => {
	const history = useHistory();
	const { hasPermission, isSuccess: isSuccessApp } = useCheckPerAccessApp({ appID: APP_ID.PCM.id });
	const { hasPermission: hasPermissionMenu, isSuccess: isSuccessMenu, permission } = useCheckPerAccessOneMenu({
		appID: APP_ID.PCM.id,
		menuID: APP_ID.PCM.menuApp.dashboard_task.id,
		type: "1"
	});
	// Phân quyền theo nhóm chức năng
	useEffect(() => {
		if (isSuccessApp && isSuccessMenu && (!hasPermission || !hasPermissionMenu || permission?.read < 1)) {
			toast.error("Bạn không có quyền truy cập tính năng này!");
			history.push("/");
		};
	}, [isSuccessApp, isSuccessMenu, hasPermission, hasPermissionMenu, permission]);

	const [type, setType] = useState<string>('all');
	const [open, setOpen] = useState<{ show: boolean, mediaId: string }>({ show: false, mediaId: '' });

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
		},
		mediaId: i % 2 ? '61c6caf6f92c4e0d68779554' : '61c1ff7102022f1f1274edfb'
	}));

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleChange = (e: any) => { setType(e.target.value) };
	const handleClose = () => setOpen({ ...open, show: false });

	return (
		<div className="overflow-auto">
			<div className="flex flex-col text-sm text-black overflow-x-hidden bg-gray-100 px-3.5">
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
				<div className="bg-white text-cbs-subtext mt-4 overflow-x-auto mb-14">
					<table className="w-full text-small font-normal border-collapse">
						<thead className="bg-white sticky top-0 z-10">
							<tr className="text-left whitespace-nowrap  border-b border-cbs-border">
								<th className="pl-2 py-2 w-max">
									<div className="flex items-center justify-between">
										<input type="checkbox" className="cbs-checkbox" />
										<img
											className="w-6 opacity-50"
											src={CaretDownIcon}
											alt="Dropdown"
										/>
									</div>
								</th>
								<th className="font-normal pr-3">
									<span className="pl-2 border-l border-cbs-border">
										Dự án
									</span>
								</th>
								<th className="font-normal pl-4 pr-3">Chủ đầu tư</th>
								<th className="font-normal pl-4 pr-3">
									<div className="flex justify-between">
										<span>
											Đang triển khai
										</span>
										<div className="flex space-x-5 px-2">
											<div className="flex items-center">
												<div className="w-3 h-3 bg-cbs-schedule-expired" />
												<span className="ml-1 text-primary-gray font-normal">
													Quá hạn
												</span>
											</div>
											<div className="flex items-center">
												<div className="w-3 h-3 bg-cbs-schedule-nextweek" />
												<span className="ml-1 text-primary-gray font-normal">
													Tuần tới
												</span>
											</div>
											<div className="flex items-center">
												<div className="w-3 h-3 bg-cbs-schedule-after-7days" />
												<span className="ml-1 text-primary-gray font-normal">
													{" "}
													{">7 ngày"}
												</span>
											</div>
										</div>
									</div>
								</th>
								<th className="font-normal pl-4 pr-3">Hoàn thành</th>
							</tr>
						</thead>
						<tbody className="">
							{data.map((d, index) => <tr key={index}>
								<td className="p-2 border border-r-0 border-cbs-border">
									<input type="checkbox" className="cbs-checkbox" />
								</td>
								<td className="pb-2 pl-2.5 pr-4 pt-2.5 border border-l-0 border-cbs-border min-w-[360px]">
									MAR.HAR.Court Yard By Marriott Ha Long Bay
								</td>
								<td className="pb-2 pl-5 pr-4 pt-2.5 border border-cbs-border">
									Công ty TNHH đầu tư xây dựng ABC
								</td>
								<td className="pb-2 px-3 pt-2 border border-r-0 border-cbs-border align-middle" style={{ minWidth: "155px", fontSize: '10px' }}>
									<div className="flex w-full h-3 mt-2">
										<button
											className="flex items-center justify-center bg-red-500"
											style={{ width: `${30}%` }}
										// onClick={() => onClickBar("OUT_DATE")}
										>
											<span className="text-white">
												8
											</span>
										</button>
										<button
											className="flex items-center justify-center bg-yellow-500"
											style={{ width: `${50}%` }}
										// onClick={() => onClickBar("NEXT_WEEK")}
										>
											<span className="text-white">
												12
											</span>
										</button>
										<button
											className="flex items-center justify-center bg-green-500"
											style={{ width: `${20}%` }}
										// onClick={() => onClickBar("MORE_THAN_SEVEN_DAYS")}
										>
											<span className="text-white">
												30
											</span>
										</button>
									</div>
								</td>
								<td className="pb-2 pl-5 pr-4 pt-2 border border-cbs-border text-white" style={{ fontSize: '10px' }}>
									<div className="h-3 w-full bg-cbs-primary text-center min-w-[164px] mt-2" >15</div>
								</td>
							</tr>
							)}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default ProjectDashboardTaskPage;
