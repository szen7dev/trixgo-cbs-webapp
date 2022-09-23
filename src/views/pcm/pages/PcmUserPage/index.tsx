import React, { FC, useEffect, useState } from "react";
import { useParams, Link } from 'react-router-dom';

// Hook
import useCheckedList from 'services/hooks/ppt/useCheckedList';
import { useQueryListCompanyOfAssigneeAndAmountTask } from "services/hooks/pcm/useStatistical";
import classNames from "classnames";

import {SearchInput, GroupActions, ButtonMore, DropdownSearchableV2} from "shareComponents/common";
import TimeRangeDropdown from "shareComponents/common/TimeRangeDropdown";
// import DropdownFilterButton from "views/pages/document/components/DocumentFilterButton";
import ModalInformation from "./components/ModalInformation";
// import CaretDownIcon from "assets/images/icon-caret-down.png";
// import debounce from "lodash/debounce";
// import userIcon from "assets/images/icon-user-avatar.svg";
// import maleUserIcon from "assets/images/icons8-male-user-64.svg";
// import TriangleDown from "assets/icons/TriangleDown";
// import timelineIcon from "assets/images/icons8-timeline-week-48.svg";
// import projectIcon from "assets/images/icons8-project-50.svg";
// import timeTableIcon from "assets/images/icons8-timetable-48.svg";
// import categoryIcon from "assets/images/icons8-category-48.svg";
// import downloadIcon from "assets/images/icons8-download-96.svg";
// import sendMailIcon from "assets/images/icons8-send-email-96.svg";
// import nextIcon from "assets/images/icons-arrow-next.svg";

import { useProject } from 'services/hooks/items/useProject';
const categories = [
	{ id: 1, name: "Tất cả" },
	{ id: 2, name: "Theo dự án, phòng ban" },
];
const PcmUserPage: FC = () => {
	const [visibleDrawer, setVisibleDrawer] = useState<boolean>(false);
	const [data, setData] = useState<{ id: number, [key: string]: any }[]>([])
	const [dataMain, setDataMain] = useState([]);
	const [companyPopup, setCompanyPopup] = useState();
	const [typeStatusPopup, setTypeStatusPopup] = useState();
	const [totalTaskOverdueWork, setTotalTaskOverdueWork] = useState();
	const [totalTaskNextWeekWork, setTotalTaskNextWeekWork] = useState();
	const [totalTaskMoreThan7Days, setTotalTaskMoreThan7Days] = useState();
	const [totalTaskFinish, setRotalTaskFinish] = useState();
	const { assigned, handleChangeCheckbox, handleCheckAll, checkboxRef } = useCheckedList(data)
	const { id: projectID } = useParams<{ id: string }>();
	const [keyword, setKeyword] = useState("");
	const [tabActive, settabActive] = useState(categories[0].id);

	const { 
		listUserOfCompany,
		listProjectOfCompany,
        listTaskOverdueWork,
        listTaskNextWeekWork,
        listTaskMoreThan7Days,
		listTaskFinish,
        isLoading,
	} = useQueryListCompanyOfAssigneeAndAmountTask({
		option: tabActive
	});

	useEffect(() => {
		if(listUserOfCompany?.length || listProjectOfCompany?.length){
			let totalOverdueWorkAll: any = 0
			let totalNextWeekWorkAll: any = 0
			let totalMoreThan7DaysAll: any = 0
			let totalFinishAll: any = 0;
			const dataOption = listUserOfCompany || listProjectOfCompany;
			const data: any = dataOption?.map((item: any)=> {
				const totalOverdueWork: any = listTaskOverdueWork?.find((item1: any) => item1._id == item._id)
				const totalNextWeekWork: any = listTaskNextWeekWork?.find((item1: any) => item1._id == item._id)
				const totalMoreThan7Days: any = listTaskMoreThan7Days?.find((item1: any) => item1._id == item._id)
				const totalFinish: any = listTaskFinish?.find((item1: any) => item1._id == item._id)
				// Tính tổng số lượng task
				totalOverdueWorkAll +=totalOverdueWork?.count || 0;
				totalNextWeekWorkAll+=totalNextWeekWork?.count || 0;
				totalMoreThan7DaysAll+=totalMoreThan7Days?.count || 0;
				totalFinishAll+=totalFinish?.count || 0;

				// Tính số phần trăm các việc của công ty
				const percent = totalOverdueWork?.count || 0 + totalNextWeekWork?.count || 0 + totalMoreThan7Days?.count || 0;
				const overdueWorkPercent = (totalOverdueWork?.count || 0/percent)*100 || 0;
				const nextWeekWorkPercent = (totalNextWeekWork?.count || 0/percent)*100 || 0;
				const moreThan7DaysPercent = (totalMoreThan7Days?.count || 0/percent)*100 || 0;
				return {
					...item,
					totalOverdueWork: totalOverdueWork?.count || 0,
					totalNextWeekWork: totalNextWeekWork?.count || 0,
					totalMoreThan7Days: totalMoreThan7Days?.count || 0,
					totalFinish: totalFinish?.count || 0,
					overdueWorkPercent,
					nextWeekWorkPercent,
					moreThan7DaysPercent
				}
			})
			setDataMain(data);
			setTotalTaskOverdueWork(totalOverdueWorkAll)
			setTotalTaskNextWeekWork(totalNextWeekWorkAll)
			setTotalTaskMoreThan7Days(totalMoreThan7DaysAll)
			setRotalTaskFinish(totalFinishAll)
		}
	}, [tabActive, listUserOfCompany, listProjectOfCompany]);
	useEffect(() => {
		document.title = `Tổng hợp theo nhân sự`
	}, []);

	const toggleVisible = ({ company, typeStatus }: any) => {
		setVisibleDrawer(!visibleDrawer)
		setCompanyPopup(company)
		setTypeStatusPopup(typeStatus)
	};

	const handleChangeTab = (tabId: number) => settabActive(tabId);

	let contentTable;
	if(tabActive == 1){
		// User
		contentTable = 
		<table className="text-black text-medium border-collapse space-x-0 space-y-0 w-full" style={{ borderSpacing: 0 }}>
			<thead className="">
				<tr className="text-primary-gray whitespace-nowrap align-middle text-left">
					<th className="px-3 py-2.5 font-normal bg-cbs-table-header sticky top-0 border-0.5 border-cbs-border w-1">
						TT
					</th>
					<th className="py-2.5 px-3 font-normal bg-cbs-table-header sticky top-0 border-0.5 border-cbs-border">
						Nhân sự
					</th>
					<th className="py-2.5 px-3 font-normal bg-cbs-table-header sticky top-0 border-0.5 border-cbs-border">
						Bộ phận
					</th>
					<th className="py-2.5 px-3 font-normal bg-cbs-table-header sticky top-0 border-0.5 border-cbs-border">
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
					<th className="py-2.5 px-3 font-normal bg-cbs-table-header sticky top-0 border-0.5 border-cbs-border">
						Hoàn thành
					</th>
				</tr>
			</thead>
			<tbody className="">
				{
					dataMain?.map((userPcm: any, index) => {
						return (
							<tr key={userPcm._id} className="text-left hover:bg-cbs-table-header cursor-pointer">
								<td className="pt-2.5 pb-3 px-2 border-0.5 border-cbs-border text-center" onClick={e => e.stopPropagation()}>
									{index+1}
								</td>
								<td className="pt-2.5 pb-3 px-2 border-0.5 border-cbs-border">
									{/* <Link to={``}> */}
										{userPcm.fullname}
									{/* </Link> */}
								</td>
								<td className="pt-2.5 pb-3 px-2 border-0.5 border-cbs-border">{userPcm?.position?.name}</td>
								<td className="pt-2.5 pb-3 px-2 border-0.5 border-cbs-border text-right cursor-auto" style={{ minWidth: "155px", fontSize: '10px' }} onClick={e => e.stopPropagation()}>
									<div className="flex w-full h-3 mt-2">
										<button
											className="flex items-center justify-center bg-red-500"
											style={{ width: `${userPcm?.overdueWorkPercent}%` }}
											onClick={() => toggleVisible({ userPcm: userPcm._id, typeStatus: "1"}) }>
											<span className="text-white">
												{userPcm?.totalOverdueWork ||""}
											</span>
										</button>
										<button
											className="flex items-center justify-center bg-yellow-500"
											style={{ width: `${userPcm?.nextWeekWorkPercent}%` }}
											onClick={() => toggleVisible({ userPcm: userPcm._id, typeStatus: "2"}) }>
											<span className="text-white">
												{userPcm?.totalNextWeekWork ||""}
											</span>
										</button>
										<button
											className="flex items-center justify-center bg-green-500"
											style={{ width: `${userPcm?.moreThan7DaysPercent}%` }}
											onClick={() => toggleVisible({ userPcm: userPcm._id, typeStatus: "3"}) }>

											<span className="text-white">
												{userPcm?.totalMoreThan7Days ||""}
											</span>
										</button>
									</div>
								</td>
								<td className="pt-2.5 pb-3 px-2 border-0.5 border-cbs-border text-right text-white cursor-auto" style={{ fontSize: '10px' }} onClick={e => e.stopPropagation()}>
									{userPcm?.totalFinish ? 
										<div className="h-3 w-full bg-cbs-primary text-center min-w-[164px] mt-2" >{userPcm?.totalFinish}</div> : 
										<></>
									}
								</td>
							</tr>
						)
					})
				}
			</tbody>
		</table>
	}else{
		// Project
		contentTable = 
		<table className="text-black text-medium border-collapse space-x-0 space-y-0 w-full" style={{ borderSpacing: 0 }}>
			<thead className="">
				<tr className="text-primary-gray whitespace-nowrap align-middle text-left">
					<th className="px-3 py-2.5 font-normal bg-cbs-table-header sticky top-0 border-0.5 border-cbs-border w-1">
						TT
					</th>
					<th className="py-2.5 px-3 font-normal bg-cbs-table-header sticky top-0 border-0.5 border-cbs-border">
						Dự án
					</th>
					<th className="py-2.5 px-3 font-normal bg-cbs-table-header sticky top-0 border-0.5 border-cbs-border">
						Mã hiệu
					</th>
					<th className="py-2.5 px-3 font-normal bg-cbs-table-header sticky top-0 border-0.5 border-cbs-border">
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
					<th className="py-2.5 px-3 font-normal bg-cbs-table-header sticky top-0 border-0.5 border-cbs-border">
						Hoàn thành
					</th>
				</tr>
			</thead>
			<tbody className="">
				{
					dataMain?.map((userPcm: any, index) => {
						return (
							<tr key={userPcm._id} className="text-left hover:bg-cbs-table-header cursor-pointer">
								<td className="pt-2.5 pb-3 px-2 border-0.5 border-cbs-border text-center" onClick={e => e.stopPropagation()}>
									{index+1}
								</td>
								<td className="pt-2.5 pb-3 px-2 border-0.5 border-cbs-border">
									{/* <Link to={``}> */}
										{userPcm.name}
									{/* </Link> */}
								</td>
								<td className="pt-2.5 pb-3 px-2 border-0.5 border-cbs-border">{userPcm?.sign}</td>
								<td className="pt-2.5 pb-3 px-2 border-0.5 border-cbs-border text-right cursor-auto" style={{ minWidth: "155px", fontSize: '10px' }} onClick={e => e.stopPropagation()}>
									<div className="flex w-full h-3 mt-2">
										<button
											className="flex items-center justify-center bg-red-500"
											style={{ width: `${userPcm?.overdueWorkPercent}%` }}
											onClick={() => toggleVisible({ userPcm: userPcm._id, typeStatus: "1"}) }>
											<span className="text-white">
												{userPcm?.totalOverdueWork ||""}
											</span>
										</button>
										<button
											className="flex items-center justify-center bg-yellow-500"
											style={{ width: `${userPcm?.nextWeekWorkPercent}%` }}
											onClick={() => toggleVisible({ userPcm: userPcm._id, typeStatus: "2"}) }>
											<span className="text-white">
												{userPcm?.totalNextWeekWork ||""}
											</span>
										</button>
										<button
											className="flex items-center justify-center bg-green-500"
											style={{ width: `${userPcm?.moreThan7DaysPercent}%` }}
											onClick={() => toggleVisible({ userPcm: userPcm._id, typeStatus: "3"}) }>
											<span className="text-white">
												{userPcm?.totalMoreThan7Days ||""}
											</span>
										</button>
									</div>
								</td>
								<td className="pt-2.5 pb-3 px-2 border-0.5 border-cbs-border text-right text-white cursor-auto" style={{ fontSize: '10px' }} onClick={e => e.stopPropagation()}>
									{userPcm?.totalFinish ? 
										<div className="h-3 w-full bg-cbs-primary text-center min-w-[164px] mt-2" >{userPcm?.totalFinish}</div> : 
										<></>
									}
								</td>
							</tr>
						)
					})
				}
			</tbody>
		</table>
	}
	return (
		<div className="flex flex-col h-full overflow-hidden">
			<div className={"sticky top-0 bg-white z-10"}>
				<div className={"header-table flex px-4 w-full top-0 bg-white pb-4"}>
				<div className="flex items-center  pt-3">
					{categories.map(item => (
						<span
							key={item.id}
							tabIndex={0}
							className={classNames(
							"cursor-pointer px-3.5 py-2 mr-2 transition-colors hover:bg-cbs-primary hover:text-white hover:border-cbs-primary border-0.5 rounded-full select-none",
							tabActive === item.id
								? "bg-cbs-primary border-cbs-primary text-white"
								: "text-cbs-subtext border-cbs-border"
							)}
							onClick={handleChangeTab.bind(null, item.id)}
						>
							{item.name}
						</span>
						))}
					</div>
				</div>
			</div>
			<div className="flex-1 overflow-y-auto">
				{ contentTable }
				{/* <ModalInformation open={visibleDrawer} onClose={toggleVisible} dataPopup={{ companyPopup, typeStatusPopup, projectID }}/> */}
			</div>
		</div >
	);
};

export default PcmUserPage;