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

import StatisticalChart from "./components/StatisticalChart";

import CaretDownIcon from "assets/images/icon-caret-down.png";
import { useCheckPerAccessScreen } from "services/hooks/auth/usePermissions";
import { APP_ID } from "apis/localdb";
import { useQueryListProjectWithListAmountTask } from "services/hooks/pcm/useStatistical";
import { Link, generatePath } from 'react-router-dom';

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

export type ItemTaskAmount = {
	_id: string;
	count: number,
}

const ProjectDashboardTaskPage: FC = () => {
	// --------- Check phân quyền
	useCheckPerAccessScreen({
		appID: APP_ID.PCM.id,
		menuID: APP_ID.PCM.menuPcmApp.dashboard_task.id,
		type: "1"
	});
	// ---------

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

	const { listProject,
		listAmountTask,
		listAmountTaskOverdueWork,
		listAmountTaskNextWeekWork,
		listAmountTaskMoreThan7Days,
		listAmountTaskFinish, 
	} = useQueryListProjectWithListAmountTask({
		fromDate: '2021-01-01',
		toDate: '2099-01-01'
	});

	const getPercentTypeTask 		= (_task: number, _totalTask: number) => {
		if (_totalTask == 0) 
			return 0;
		return Math.ceil((_task / _totalTask) * 100);
	}

	return (
		<div className="overflow-auto">
			<div className="flex flex-col text-sm text-black overflow-x-hidden bg-gray-100 px-3.5">
				{/* Statistical  */}
				<div className="flex flex-col bg-white text-cbs-subtext mt-4" style={{ height: "250px" }}>
					<div className="flex justify-between flex-wrap items-center pl-6 pr-2.5">
						<h3 className="text-x-large mt-2.5">Thống kê công việc theo dự án/phòng ban</h3>
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
						<StatisticalChart listProject={listProject} listAmountTask={listAmountTask}/>
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
							{listProject && listProject.map((project: any, index) => {
								const itemTaskFinish			= listAmountTaskFinish.find((itemFinish: ItemTaskAmount) => itemFinish?._id == project?._id);
								const itemTaskOverdueWork 		= listAmountTaskOverdueWork.find((itemFinish: ItemTaskAmount) => itemFinish?._id == project?._id)
								const itemTaskNextWeekWork 	= listAmountTaskNextWeekWork.find((itemFinish: ItemTaskAmount) => itemFinish?._id == project?._id)
								const itemTaskMoreThan7Days 	= listAmountTaskMoreThan7Days.find((itemFinish: ItemTaskAmount) => itemFinish?._id == project?._id)

								const totalTaskFinish = (itemTaskFinish && itemTaskFinish['count']) || 0
								const totalTaskOverdueWork = (itemTaskOverdueWork && itemTaskOverdueWork['count']) || 0
								const totalTaskNextWeekWork = (itemTaskNextWeekWork && itemTaskNextWeekWork['count']) || 0
								const totalTaskMoreThan7Days = (itemTaskMoreThan7Days && itemTaskMoreThan7Days['count']) || 0

								const totalTask 				= 
												totalTaskOverdueWork
												+ totalTaskNextWeekWork
												+ totalTaskMoreThan7Days;

								return (<tr key={index}>
											<td className="p-2 border border-r-0 border-cbs-border">
												<input type="checkbox" className="cbs-checkbox" />
											</td>
											<td className="pb-2 pl-2.5 pr-4 pt-2.5 border border-l-0 border-cbs-border min-w-[360px]">
												{/* { project.sign }{ project.name } */}
												<Link to={generatePath("/pcm/project/:id/home", { id: project._id })}>
													{project.sign}{project.name}
													{/* CHG.THT.Xây dựng cụm trường Tiểu học và THCS Tây Hồ Tây */}
												</Link>
											</td>
											<td className="pb-2 pl-5 pr-4 pt-2.5 border border-cbs-border">
												{ project?.company?.name || 'DEFAULT SIGN' }
											</td>
											<td className="pb-2 px-3 pt-2 border border-r-0 border-cbs-border align-middle" style={{ minWidth: "155px", fontSize: '10px' }}>
												<div className="flex w-full h-3 mt-2">
													<button
														className="flex items-center justify-center bg-red-500"
														style={{ width: `${getPercentTypeTask(totalTaskOverdueWork, totalTask)}%` }}
													// onClick={() => onClickBar("OUT_DATE")}
													>
														{/* Quá Hạn */}
														<span className="text-white">
															{ totalTaskOverdueWork != 0 && totalTaskOverdueWork }
														</span>
													</button>
													<button
														className="flex items-center justify-center bg-yellow-500"
														style={{ width: `${getPercentTypeTask(totalTaskNextWeekWork, totalTask)}%` }}
													// onClick={() => onClickBar("NEXT_WEEK")}
													>
														<span className="text-white">
															{/* Tuần Tới */}
															{ totalTaskNextWeekWork != 0 && totalTaskNextWeekWork }
														</span>
													</button>
													<button
														className="flex items-center justify-center bg-green-500"
														style={{ width: `${getPercentTypeTask(totalTaskMoreThan7Days, totalTask)}%` }}
													// onClick={() => onClickBar("MORE_THAN_SEVEN_DAYS")}
													>
														<span className="text-white">
															{/* > 7 Ngày */}
															{ totalTaskMoreThan7Days != 0 && totalTaskMoreThan7Days }
														</span>
													</button>
												</div>
											</td>
											<td className="pb-2 pl-5 pr-4 pt-2 border border-cbs-border text-white" 
												style={{ 
													fontSize: '10px',
												}}>
												{
													totalTaskFinish != 0 ? 
														<div className="h-3 w-full bg-cbs-primary text-center min-w-[164px] mt-2" >
															{/* Hoàn thành */}
															{
																totalTaskFinish != 0 && totalTaskFinish
															}
														</div> :
														<div className="h-3 w-full text-center min-w-[164px] mt-2" >
															{/* Hoàn thành */}
															{
																totalTaskFinish != 0 && totalTaskFinish
															}
														</div>
												}
												
											</td>
										</tr>)
							}
								
							)}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default ProjectDashboardTaskPage;
