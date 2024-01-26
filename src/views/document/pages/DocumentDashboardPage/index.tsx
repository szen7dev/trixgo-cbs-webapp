import { FC, forwardRef, useState, useEffect } from "react";
import moment from "moment";
import StatisticalChart from "./components/StatisticalChart";
import SliderOver from "./components/SliderOver";
import { useQueryListDepartments } from "services/hooks/items/useDepartment";
import { DATE_FORMAT, APP_ID } from "apis/localdb";
import { useCheckPerAccessScreen } from "services/hooks/auth/usePermissions";
import { dateLoadedPercentage } from 'utils/ppt';
import { formatNumberMoney } from "utils/cmcs"
import { useQueryListProjectAndAmountDocument } from "services/hooks/document/useStatistical";
import { Link, generatePath, useLocation } from "react-router-dom";

const ButtonDatePicker = forwardRef<HTMLButtonElement, any>(
	({ value, onClick }, ref) => (
		<button
			className="rounded-md border border-cbs-border p-2"
			ref={ref}
			onClick={onClick}
		>
			Chọn thời gian
			{/* {value} */}
		</button>
	)
);
ButtonDatePicker.displayName = "ButtonDatePicker";

export const DocumentDashboardPage: FC = () => {

	const location = useLocation();
	const { pathname: currentPathname } = location;
	let appID = ""
	let menuID = ""
	if(currentPathname == "/document/dashboard"){
		appID = APP_ID.DOCUMENT.id
		menuID = APP_ID.DOCUMENT.menuDocumentApp.dashboard.id
	}
	
	if(currentPathname == "/pcm/dashboard-document"){
		appID = APP_ID.PCM.id
		menuID = APP_ID.PCM.menuPcmApp.dashboard_document.id
	}

	// --------- Check phân quyền
	useCheckPerAccessScreen({
		appID: APP_ID.PCM.id,
		menuID: APP_ID.PCM.menuPcmApp.dashboard_document.id,
		type: "1"
	});

	// ---------
	const [type, setType] = useState<string>("all");
	const [open, setOpen] = useState<{ show: boolean; mediaId: string }>({
		show: false,
		mediaId: "",
	});

	const { listDepartments } =
		useQueryListDepartments({
			select:
				"lastChange assistant pm numberOfDocs name numberFinishOfDocs actualStartTime actualFinishTime sign startTime expiredTime",
			populates: {
				path: "pm assistant",
				select: "fullname image",
			},
		}, true);

	const { listProject, listAmountDocument } = useQueryListProjectAndAmountDocument({
		fromDate: '2021-01-01',
		toDate: '2099-01-01'
	});

	const handleChange = (e: any) => {
		setType(e.target.value);
	};
	const handleClose = () => setOpen({ ...open, show: false });

	return (
		<>
			<div className="flex flex-col text-sm text-black overflow-x-hidden bg-gray-100 px-3.5">
				{/* Statistical  */}
				<div className="flex flex-col bg-white text-cbs-subtext mt-4" style={{ height: "250px" }}>
					{/* <div className="flex justify-between flex-wrap items-center pl-6 pr-2.5">
						<h3 className="text-x-large mt-2.5">Thống kê hồ sơ theo dự án/phòng ban</h3>
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
					</div> */}
					<div className="flex-1">
						<StatisticalChart listProject={listProject} listAmountDocument={listAmountDocument}/>
					</div>
				</div>

				{/* List */}
				<div className="bg-white text-cbs-subtext mt-4 overflow-x-auto">
					<table className="w-full text-small font-normal border-collapse">
						<thead className="bg-white sticky top-0 z-10">
							<tr className="text-left whitespace-nowrap  border-b border-cbs-border">
								<th className="font-normal pl-4 pr-3">Dự án</th>
								<th className="font-normal pl-4 pr-3">
									<div className="flex flex-nowrap justify-between items-center">
										<div>Tiến trình dự án</div>
										<div className="rounded-full flex my-2.5 bg-cbs-left-menu">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className="h-6 w-6 ml-4 my-auto"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
												/>
											</svg>
											<input
												className="bg-transparent focus:outline-none py-3 px-2.5 flex-1"
												placeholder="Tìm kiếm"
											/>
										</div>
									</div>
								</th>
								<th className="font-normal pl-4 pr-3">Tổng số/Đã hoàn thành</th>
							</tr>
						</thead>
						<tbody>
							{listDepartments.map((department, index) => {
								const dif = Math.floor(dateLoadedPercentage(new Date(department.startTime), new Date(department.expiredTime), new Date()) * 100);
								const limitMinMaxDif = (_dif: number) => {
									if (_dif < 0)
										return 0;
									else if (_dif > 100)
										return 100;
									return _dif;
								}

								let percentNumberFinishOfDocs = 0;
								if (department.numberFinishOfDocs && department.numberOfDocs) {
									percentNumberFinishOfDocs = (department.numberFinishOfDocs / department?.numberOfDocs) * 100;
								}
								return (
									<tr key={index}>
										<td className="pb-2 pl-5 pr-4 pt-2.5 border border-cbs-border">
											<Link 
												className="text-black" 
												to={generatePath("/pm/project/:id/document", { id: department._id })}>	{department.sign}.{department.name}
											</Link>
										</td>
										<td className="pb-2 pl-5 pr-4 pt-2.5 border border-cbs-border">
											<div className="flex justify-between mt-2.5">
												<span>{moment(department.startTime).format("DD/MM/YYYY")}</span>
												<span>{moment(department.expiredTime).format("DD/MM/YYYY")}</span>
											</div>
											<div className="border border-cbs-border h-1.5 box-border mt-2">
												<div
													className="bg-cbs-subtext h-full"
													style={{ width: `${limitMinMaxDif(dif)}%` }}
												></div>
											</div>
										</td>	
										<td className="pb-2 pl-5 pr-4 pt-2.5 border border-cbs-border">
											<div className="flex justify-between items-end mt-2.5">
												<span className="text-2x-large text-black mr-auto">
													{formatNumberMoney(department.numberOfDocs || 0)}
												</span>
												<span>{Math.ceil(percentNumberFinishOfDocs)}%</span>
											</div>
											<div className="border border-cbs-border h-1.5 box-border mt-2">
												<div
													className="bg-cbs-schedule-after-7days h-full"
													style={{
														width: `${percentNumberFinishOfDocs}%`
													}}
												></div>
											</div>
										</td>									
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			</div>
			<SliderOver
				open={open.show ? true : false}
				onClose={handleClose}
				mediaID={open.mediaId}
			/>
		</>
	);
};

export default DocumentDashboardPage;
