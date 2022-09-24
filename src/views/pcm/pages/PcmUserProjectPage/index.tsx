import { FC, useEffect, useState } from "react";
import { useParams, useHistory } from 'react-router-dom';

import iconBack from "assets/images/icon-back-gray.svg";
import ModalInformation from "./components/ModalInformation";
import { Loader } from "shareComponents/common";

// Hook
import { useQueryListCompanyOfAssigneeAndAmountTask } from "services/hooks/pcm/useStatistical";
import { useProject } from 'services/hooks/items/useProject';
let totalOverdueWorkMain = 0;
let totalNextWeekWorkMain = 0;
let totalMoreThan7DaysMain = 0;
let totalFinishMain = 0;

const PcmUserProjectPage: FC = () => {
	document.title = `Báo cáo nhân sự theo dự án`
    const history = useHistory();
	const [visibleDrawer, setVisibleDrawer] = useState<boolean>(false);
	const [dataMain, setDataMain] = useState([]);
	const [companyPopup, setCompanyPopup] = useState();
	const [projectPopup, setProjectPopup] = useState();
	const [typeStatusPopup, setTypeStatusPopup] = useState();
	const [assigneePopup, setAssigneePopup] = useState();
	const { projectID } = useParams<{ projectID: string }>();
	const { info: projectInfo } = useProject({
		params: {
			departmentID: projectID
		},
		isFetchInfo: true
	})

	const { 
		listUserOfCompany,
		listProjectOfCompany,
        listTaskOverdueWork,
        listTaskNextWeekWork,
        listTaskMoreThan7Days,
		listTaskFinish,
        isLoading,
	} = useQueryListCompanyOfAssigneeAndAmountTask({
		option: 1, projectID
	});

	useEffect(() => {
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
	}, [listUserOfCompany, listProjectOfCompany]);

	const toggleVisible = ({ company, typeStatus, assigneeID, projectID }: any) => {
		setVisibleDrawer(!visibleDrawer)
		setCompanyPopup(company)
		setAssigneePopup(assigneeID)
		setTypeStatusPopup(typeStatus)
		setProjectPopup(projectID)
	};

	return (
		<div className="flex flex-col h-full overflow-hidden">
			{(isLoading) && <Loader className="border-primary" />}
			<div className={"sticky top-0 bg-white z-10"}>
				<div className={"header-table flex w-full top-0 bg-white pb-2"}>
					<button
                        onClick={() => history.push(`/pcm/users`)}
                        className={"rounded-full flex items-center justify-center w-[40px] h-[40px] max-w-[30px] max-h-[30px] min-w-[30px] min-h-[40px] hover:bg-cbs-form-input-bg mr-3"}>
                        <img src={iconBack} alt={"----"} className={"w-[18px]"}/>
                    </button>
					<div className="flex-1 flex items-center text-[15px] ml-2">
						<p className="text-lg text-primary-gray">
							{ projectInfo.name }
						</p>
					</div>
				</div>
			</div>
			<div className="flex-1 overflow-y-auto">
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
				<ModalInformation open={visibleDrawer} onClose={toggleVisible} dataPopup={{ companyPopup, typeStatusPopup, projectID, assigneePopup, projectPopup }}/>
			</div>
		</div >
	);
};

export default PcmUserProjectPage;