import { FC, useEffect, useState } from "react";
import { useParams, Link } from 'react-router-dom';

// Hook
import classNames from "classnames";
import { Loader } from "shareComponents/common";
import ModalInformation from "./components/ModalInformation";

import { useQueryListCompanyOfAssigneeAndAmountTask } from "services/hooks/pcm/useStatistical";

const categories = [
	{ id: 1, name: "Tất cả" },
	{ id: 2, name: "Theo dự án, phòng ban" },
];
let totalOverdueWorkMain = 0;
let totalNextWeekWorkMain = 0;
let totalMoreThan7DaysMain = 0;
let totalFinishMain = 0;

const PcmUserPage: FC = () => {
	const [visibleDrawer, setVisibleDrawer] = useState<boolean>(false);
	const [data, setData] = useState<{ id: number, [key: string]: any }[]>([])
	const [dataMain, setDataMain] = useState([]);
	const [companyPopup, setCompanyPopup] = useState();
	const [projectPopup, setProjectPopup] = useState();
	const [typeStatusPopup, setTypeStatusPopup] = useState();
	const [assigneePopup, setAssigneePopup] = useState();
	const { id: projectID } = useParams<{ id: string }>();
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
		totalOverdueWorkMain = 0;
		totalNextWeekWorkMain = 0;
		totalMoreThan7DaysMain = 0;
		totalFinishMain = 0;
		if(listUserOfCompany?.length || listProjectOfCompany?.length){
			const dataOption = listUserOfCompany || listProjectOfCompany;
			const data: any = dataOption?.map((item: any)=> {
				const totalOverdueWork: any = listTaskOverdueWork?.find((item1: any) => item1._id == item._id)
				const totalNextWeekWork: any = listTaskNextWeekWork?.find((item1: any) => item1._id == item._id)
				const totalMoreThan7Days: any = listTaskMoreThan7Days?.find((item1: any) => item1._id == item._id)
				const totalFinish: any = listTaskFinish?.find((item1: any) => item1._id == item._id)
				// Tổng
				totalOverdueWorkMain 	+= Number(totalOverdueWork?.count) || 0;
				totalNextWeekWorkMain 	+= Number(totalNextWeekWork?.count) || 0;
				totalMoreThan7DaysMain 	+= Number(totalMoreThan7Days?.count) || 0;
				totalFinishMain 		+= Number(totalFinish?.count) || 0;
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
		}
	}, [tabActive, listUserOfCompany, listProjectOfCompany]);
	
	useEffect(() => {
		document.title = `Tổng hợp theo nhân sự`
	}, []);

	const toggleVisible = ({ company, typeStatus, assigneeID, projectID }: any) => {
		setVisibleDrawer(!visibleDrawer)
		setCompanyPopup(company)
		setAssigneePopup(assigneeID)
		setTypeStatusPopup(typeStatus)
		setProjectPopup(projectID)
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
						Phòng ban
					</th>
					<th className="py-2.5 px-3 font-normal bg-cbs-table-header sticky top-0 border-0.5 border-cbs-border">
						Vị trí
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
										Quá hạn({totalOverdueWorkMain})
									</span>
								</div>
								<div className="flex items-center">
									<div className="w-3 h-3 bg-cbs-schedule-nextweek" />
									<span className="ml-1 text-primary-gray font-normal">
										Tuần tới({totalNextWeekWorkMain})
									</span>
								</div>
								<div className="flex items-center">
									<div className="w-3 h-3 bg-cbs-schedule-after-7days" />
									<span className="ml-1 text-primary-gray font-normal">
										{" "}
										{">7 ngày"}({totalMoreThan7DaysMain})
									</span>
								</div>
							</div>
						</div>
					</th>
					<th className="py-2.5 px-3 font-normal bg-cbs-table-header sticky top-0 border-0.5 border-cbs-border">
						Hoàn thành({totalFinishMain})
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
										<div className="flex items-center">
											<img src={`${process.env.REACT_APP_URL_S3_USER}/${userPcm?.image}`} alt="----" className={"w-[24px] h-[24px] min-w-[24px] min-h-[24px] max-w-[24px] max-h-[24px] rounded-full overflow-hidden"}
											/>
											<div className="ml-2">{userPcm.fullname}</div>
										</div>
									{/* </Link> */}
								</td>
								<td className="pt-2.5 pb-3 px-2 border-0.5 border-cbs-border">{userPcm?.department?.name}</td>
								<td className="pt-2.5 pb-3 px-2 border-0.5 border-cbs-border">{userPcm?.position?.name}</td>
								<td className="pt-2.5 pb-3 px-2 border-0.5 border-cbs-border text-right cursor-auto" style={{ minWidth: "155px", fontSize: '10px' }} onClick={e => e.stopPropagation()}>
									<div className="flex w-full h-3 mt-2">
										<button
											className="flex items-center justify-center bg-red-500"
											style={{ width: `${userPcm?.overdueWorkPercent}%` }}
											onClick={() => toggleVisible({ assigneeID: userPcm._id, typeStatus: "1"}) }>
											<span className="text-white">
												{userPcm?.totalOverdueWork ||""}
											</span>
										</button>
										<button
											className="flex items-center justify-center bg-yellow-500"
											style={{ width: `${userPcm?.nextWeekWorkPercent}%` }}
											onClick={() => toggleVisible({ assigneeID: userPcm._id, typeStatus: "2"}) }>
											<span className="text-white">
												{userPcm?.totalNextWeekWork ||""}
											</span>
										</button>
										<button
											className="flex items-center justify-center bg-green-500"
											style={{ width: `${userPcm?.moreThan7DaysPercent}%` }}
											onClick={() => toggleVisible({ assigneeID: userPcm._id, typeStatus: "3"}) }>

											<span className="text-white">
												{userPcm?.totalMoreThan7Days ||""}
											</span>
										</button>
									</div>
								</td>
								<td className="pt-2.5 pb-3 px-2 border-0.5 border-cbs-border text-right text-white cursor-auto" style={{ fontSize: '10px' }} onClick={e => e.stopPropagation()}>
									{userPcm?.totalFinish ? 
										<button className="h-3 w-full bg-cbs-primary text-center min-w-[164px] mt-2" 
										onClick={() => toggleVisible({ assigneeID: userPcm._id, typeStatus: "4"}) }>{userPcm?.totalFinish}</button> : 
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
										Quá hạn({totalOverdueWorkMain})
									</span>
								</div>
								<div className="flex items-center">
									<div className="w-3 h-3 bg-cbs-schedule-nextweek" />
									<span className="ml-1 text-primary-gray font-normal">
										Tuần tới({totalNextWeekWorkMain})
									</span>
								</div>
								<div className="flex items-center">
									<div className="w-3 h-3 bg-cbs-schedule-after-7days" />
									<span className="ml-1 text-primary-gray font-normal">
										{" "}
										{">7 ngày"}({totalMoreThan7DaysMain})
									</span>
								</div>
							</div>
						</div>
					</th>
					<th className="py-2.5 px-3 font-normal bg-cbs-table-header sticky top-0 border-0.5 border-cbs-border">
						Hoàn thành({totalFinishMain})
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
									<Link to={`/pcm/users/project/${userPcm._id}`}>
										{userPcm.name}
									</Link>
								</td>
								<td className="pt-2.5 pb-3 px-2 border-0.5 border-cbs-border">{userPcm?.sign}</td>
								<td className="pt-2.5 pb-3 px-2 border-0.5 border-cbs-border text-right cursor-auto" style={{ minWidth: "155px", fontSize: '10px' }} onClick={e => e.stopPropagation()}>
									<div className="flex w-full h-3 mt-2">
										<button
											className="flex items-center justify-center bg-red-500"
											style={{ width: `${userPcm?.overdueWorkPercent}%` }}
											onClick={() => toggleVisible({ projectID: userPcm._id, typeStatus: "1"}) }>
											<span className="text-white">
												{userPcm?.totalOverdueWork ||""}
											</span>
										</button>
										<button
											className="flex items-center justify-center bg-yellow-500"
											style={{ width: `${userPcm?.nextWeekWorkPercent}%` }}
											onClick={() => toggleVisible({ projectID: userPcm._id, typeStatus: "2"}) }>
											<span className="text-white">
												{userPcm?.totalNextWeekWork ||""}
											</span>
										</button>
										<button
											className="flex items-center justify-center bg-green-500"
											style={{ width: `${userPcm?.moreThan7DaysPercent}%` }}
											onClick={() => toggleVisible({ projectID: userPcm._id, typeStatus: "3"}) }>
											<span className="text-white">
												{userPcm?.totalMoreThan7Days ||""}
											</span>
										</button>
									</div>
								</td>
								<td className="pt-2.5 pb-3 px-2 border-0.5 border-cbs-border text-right text-white cursor-auto" style={{ fontSize: '10px' }} onClick={e => e.stopPropagation()}>
									{userPcm?.totalFinish ? 
										<button className="h-3 w-full bg-cbs-primary text-center min-w-[164px] mt-2" 
										onClick={() => toggleVisible({ projectID: userPcm._id, typeStatus: "4"}) }>{userPcm?.totalFinish}</button> : 
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
			{(isLoading) && <Loader className="border-primary" />}
			<div className={"sticky top-0 bg-white z-10"}>
				<div className={"header-table flex w-full top-0 bg-white pb-4"}>
				<div className="flex items-center pt-3">
					{categories.map(item => (
						<span
							key={item.id}
							tabIndex={0}
							className={classNames(
							"cursor-pointer px-3.5 py-1 mr-2 transition-colors hover:bg-cbs-primary hover:text-white hover:border-cbs-primary border-0.5 rounded-full select-none",
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
				<ModalInformation open={visibleDrawer} onClose={toggleVisible} dataPopup={{ companyPopup, typeStatusPopup, projectID, assigneePopup, projectPopup }}/>
			</div>
		</div >
	);
};

export default PcmUserPage;