import { FC, useEffect } from "react";
import StatisticalChart from "./components/StatisticalChart";
import CaretDownIcon from "assets/images/icon-caret-down.png";
import { useCheckPerAccessScreen } from "services/hooks/auth/usePermissions";
import { APP_ID } from "apis/localdb";
import { useQueryListProjectWithListAmountTask } from "services/hooks/pcm/useStatistical";
import { Link, generatePath } from 'react-router-dom';
import { useHistoryTraffics } from "services/hooks/auth/useAuth";

export type ItemTaskAmount = {
	_id: string;
	count: number,
}

const ProjectDashboardTaskPage: FC = () => {

	//_____Start history traffict
	const payloadHistoryTraffic: any = {
		appID: APP_ID.PCM.id,
		menuID: APP_ID.PCM.menuPcmApp.dashboard_task.id,
		type: "1"
	  };
	const { createHistoryTraffics } = useHistoryTraffics();
	useEffect(() => {
		createHistoryTraffics({...payloadHistoryTraffic, type: 1});
	}, []);
	//_____End history traffict

	// --------- Check phân quyền
	useCheckPerAccessScreen({
		appID: APP_ID.PCM.id,
		menuID: APP_ID.PCM.menuPcmApp.dashboard_task.id,
		type: "1"
	});
	// ---------

	useEffect(() => {
		document.title = "Báo cáo công việc";
	}, []);

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

	const getPercentTypeTask = (_task: number, _totalTask: number) => {
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
										Dự án/Phòng ban
									</span>
								</th>
								{/* <th className="font-normal pl-4 pr-3">Chủ đầu tư</th> */}
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
													7 ngày tới
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
								const itemTaskFinish			= listAmountTaskFinish.find((itemFinish: ItemTaskAmount) => itemFinish?._id === project?._id);
								const itemTaskOverdueWork 		= listAmountTaskOverdueWork.find((itemFinish: ItemTaskAmount) => itemFinish?._id === project?._id)
								const itemTaskNextWeekWork 	= listAmountTaskNextWeekWork.find((itemFinish: ItemTaskAmount) => itemFinish?._id === project?._id)
								const itemTaskMoreThan7Days 	= listAmountTaskMoreThan7Days.find((itemFinish: ItemTaskAmount) => itemFinish?._id === project?._id)

								const totalTaskFinish = (itemTaskFinish && itemTaskFinish['count']) || 0
								const totalTaskOverdueWork = (itemTaskOverdueWork && itemTaskOverdueWork['count']) || 0
								const totalTaskNextWeekWork = (itemTaskNextWeekWork && itemTaskNextWeekWork['count']) || 0
								const totalTaskMoreThan7Days = (itemTaskMoreThan7Days && itemTaskMoreThan7Days['count']) || 0

								const totalTask 				=
												totalTaskOverdueWork
												+ totalTaskNextWeekWork
												+ totalTaskMoreThan7Days;

								return (
									<tr key={index}>
										<td className="p-2 border border-r-0 border-cbs-border">
											<input type="checkbox" className="cbs-checkbox" />
										</td>
										<td className="pb-2 pl-2.5 pr-4 pt-2.5 border border-l-0 border-cbs-border min-w-[360px]">
											<Link to={generatePath("/pm/project/:id/folder", { id: project._id })}>
												{project.sign}.{project.name}
											</Link>
										</td>
										<td className="pb-2 px-3 pt-2 border border-r-0 border-cbs-border align-middle" style={{ minWidth: "155px", fontSize: '10px' }}>
											<div className="flex w-full h-3 mt-2">
												<button
													className="flex items-center justify-center bg-red-500"
													style={{ width: `${getPercentTypeTask(totalTaskOverdueWork, totalTask)}%` }}
												>
													{/* Quá Hạn */}
													<span className="text-white">
														{ totalTaskOverdueWork != 0 && totalTaskOverdueWork }
													</span>
												</button>
												<button
													className="flex items-center justify-center bg-yellow-500"
													style={{ width: `${getPercentTypeTask(totalTaskNextWeekWork, totalTask)}%` }}
												>
													<span className="text-white">
														{/* Tuần Tới */}
														{ totalTaskNextWeekWork != 0 && totalTaskNextWeekWork }
													</span>
												</button>
												<button
													className="flex items-center justify-center bg-green-500"
													style={{ width: `${getPercentTypeTask(totalTaskMoreThan7Days, totalTask)}%` }}
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
									</tr>
								)
							})}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default ProjectDashboardTaskPage