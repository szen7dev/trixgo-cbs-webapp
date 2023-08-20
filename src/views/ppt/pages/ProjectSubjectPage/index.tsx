import { FC, useEffect, useState } from "react";
import { useParams, Link } from 'react-router-dom';

import { useQueryListCompanyOfAssigneeAndAmountTask } from "services/hooks/pcm/useStatistical";

import ModalInformation from "./components/ModalInformation";
import { useProject } from 'services/hooks/items/useProject';

let totalOverdueWorkMain = 0;
let totalNextWeekWorkMain = 0;
let totalMoreThan7DaysMain = 0;
let totalFinishMain = 0;

const ProjectSubjectPage: FC = () => {
	const { tab } = useParams<{ tab: string}>()

	const [visibleDrawer, setVisibleDrawer] = useState<boolean>(false);
	const [dataCompany, setDataCompany] = useState([]);
	const [companyPopup, setCompanyPopup] = useState();
	const [typeStatusPopup, setTypeStatusPopup] = useState();
	const { id: projectID } = useParams<{ id: string }>();
	const [keyword] = useState("");

	const {
		listCompany,
        listCompanyAndTaskOverdueWork,
        listCompanyAndTaskNextWeekWork,
        listCompanyAndTaskMoreThan7Days,
		listCompanyAndTaskFinish,
	} = useQueryListCompanyOfAssigneeAndAmountTask({
		projectID, keyword
	});

	useEffect(() => {
		totalOverdueWorkMain = 0;
		totalNextWeekWorkMain = 0;
		totalMoreThan7DaysMain = 0;
		totalFinishMain = 0;
		if(listCompany?.length){
			const data: any = listCompany.map((item: any)=> {
				const totalOverdueWork: any = listCompanyAndTaskOverdueWork?.find((item1: any) => item1._id === item._id)
				const totalNextWeekWork: any = listCompanyAndTaskNextWeekWork?.find((item1: any) => item1._id === item._id)
				const totalMoreThan7Days: any = listCompanyAndTaskMoreThan7Days?.find((item1: any) => item1._id === item._id)
				const totalFinish: any = listCompanyAndTaskFinish?.find((item1: any) => item1._id === item._id)
				// Tính tổng số lượng task
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
			setDataCompany(data);
		}
	}, [listCompany, listCompanyAndTaskOverdueWork, listCompanyAndTaskNextWeekWork, listCompanyAndTaskMoreThan7Days]);

	const { info: projectInfo } = useProject({
		params: {
			departmentID: projectID,
			select: "name sign",
			populates: ""
		},
		isFetchInfo: true
	})

	useEffect(() => {
		document.title = `${projectInfo.sign} | Công việc`
	}, [projectInfo.sign]);

	const toggleVisible = ({ company, typeStatus }: any) => {
		setVisibleDrawer(!visibleDrawer)
		setCompanyPopup(company)
		setTypeStatusPopup(typeStatus)
	};

	return (
		<div className="flex flex-col h-full overflow-hidden">
			{/* <div className={"sticky top-0 bg-white z-10"}> */}
			<div className={"px-4 flex items-center w-full text-primary-gray bg-white py-2"}>
				{/* <div className={"header-table flex px-4 w-full top-0 bg-white pb-4"}> */}
				<div className={"inline-flex items-center border-collapse border-0.5 border-primary-border"}>
					{/* <button
						className={"py-1 border-b-2 border-primary text-primary mr-5"}>
						Theo đơn vị thực hiện
					</button>
					<button
						className={"py-1 border-b-2 border-primary text-primary "}>
						Theo đơn vị thực hiện
					</button> */}

					<Link to={`/pm/project/${projectID}/subject`}>
						<button className={"px-4 py-2 border-r-0.5 border-primary-border bg-cbs-soft-blue text-primary"}>
							Theo tiến độ
						</button>
					</Link>
					<Link to={`/pm/project/${projectID}/subject/folder`}>
						<button className={"px-4 py-2 border-r-0.5 border-primary-border bg-white text-primary-gray"}>
							Theo thư mục
						</button>
            		</Link>
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
								Đơn vị thực hiện
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
							dataCompany?.map((company: any, index) => {
								return (
									<tr key={company._id} className="text-left hover:bg-cbs-table-header cursor-pointer">
										<td className="pt-2.5 pb-3 px-2 border-0.5 border-cbs-border text-center" onClick={e => e.stopPropagation()}>
											{index+1}
										</td>
										<td className="pt-2.5 pb-3 px-2 border-0.5 border-cbs-border">
											<Link to={`/pm/project/${projectID}/subject/company/${company._id}`}>
												{company.name}
											</Link>
										</td>
										<td className="pt-2.5 pb-3 px-2 border-0.5 border-cbs-border">{company.sign}</td>
										<td className="pt-2.5 pb-3 px-2 border-0.5 border-cbs-border text-right cursor-auto" style={{ minWidth: "155px", fontSize: '10px' }} onClick={e => e.stopPropagation()}>
											<div className="flex w-full h-3 mt-2">
												<button
													className="flex items-center justify-center bg-red-500"
													style={{ width: `${company?.overdueWorkPercent}%` }}
													onClick={() => toggleVisible({ company: company._id, typeStatus: "1"}) }>
													<span className="text-white">
														{company?.totalOverdueWork ||""}
													</span>
												</button>
												<button
													className="flex items-center justify-center bg-yellow-500"
													style={{ width: `${company?.nextWeekWorkPercent}%` }}
													onClick={() => toggleVisible({ company: company._id, typeStatus: "2"}) }>
													<span className="text-white">
														{company?.totalNextWeekWork ||""}
													</span>
												</button>
												<button
													className="flex items-center justify-center bg-green-500"
													style={{ width: `${company?.moreThan7DaysPercent}%` }}
													onClick={() => toggleVisible({ company: company._id, typeStatus: "3"}) }>

													<span className="text-white">
														{company?.totalMoreThan7Days ||""}
													</span>
												</button>
											</div>
										</td>
										<td className="pt-2.5 pb-3 px-2 border-0.5 border-cbs-border text-right text-white cursor-auto" style={{ fontSize: '10px' }} onClick={e => e.stopPropagation()}>
											{company?.totalFinish ?
												<button className="h-3 w-full bg-cbs-primary text-center min-w-[164px] mt-2"
												onClick={() => toggleVisible({ company: company._id, typeStatus: "4"}) }>{company?.totalFinish}</button> :
												<></>
											}
										</td>
									</tr>
								)
							})
						}
					</tbody>
				</table>
				<ModalInformation open={visibleDrawer} onClose={toggleVisible} dataPopup={{ companyPopup, typeStatusPopup, projectID }}/>
			</div>
		</div >
	);
};

export default ProjectSubjectPage;