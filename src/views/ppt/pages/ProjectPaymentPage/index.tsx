import { FC, useEffect, useState } from "react";
import { useParams, Link } from 'react-router-dom';

// Hook
// import useCheckedList from 'services/hooks/ppt/useCheckedList';
import { useQueryListCompanyOfAuthorAndAmountTask } from "services/hooks/pcm/useStatistical";

// import { SearchInput, GroupActions, ButtonMore } from "shareComponents/common";

// import DropdownFilterButton from "views/pages/document/components/DocumentFilterButton";
// import ModalInformation from "./components/ModalInformation";
// import CaretDownIcon from "assets/images/icon-caret-down.png";
// import debounce from "lodash/debounce";
import { useProject } from 'services/hooks/items/useProject';

const ProjectSubjectPage: FC = () => {
	const [visibleDrawer, setVisibleDrawer] = useState<boolean>(false);
	const [dataCompany, setDataCompany] = useState([]);
	// const [data, setData] = useState<{ id: number, [key: string]: any }[]>([])
	const [, setCompanyPopup] = useState();
	const [, setTypeStatusPopup] = useState();
	const [, setTotalTaskOverdueWork] = useState();
	const [, setTotalTaskNextWeekWork] = useState();
	const [, setTotalTaskMoreThan7Days] = useState();
	const [, setRotalTaskFinish] = useState();
	// const { assigned, handleChangeCheckbox, handleCheckAll, checkboxRef } = useCheckedList(data)
	const { id: projectID } = useParams<{ id: string }>();
	const [keyword] = useState("");

	const {
		listCompany,
        listCompanyAndTaskOverdueWork,
        listCompanyAndTaskNextWeekWork,
        listCompanyAndTaskMoreThan7Days,
		listCompanyAndTaskFinish,
	} = useQueryListCompanyOfAuthorAndAmountTask({
		projectID, keyword, subtype: "3"
	});

	useEffect(() => {
		// if(listCompany?.length && listCompanyAndTaskOverdueWork?.length && listCompanyAndTaskNextWeekWork?.length && listCompanyAndTaskMoreThan7Days?.length){
		if(listCompany?.length){
			let totalOverdueWorkAll: any = 0
			let totalNextWeekWorkAll: any = 0
			let totalMoreThan7DaysAll: any = 0
			let totalFinishAll: any = 0

			const data: any = listCompany.map((item: any)=> {
				const totalOverdueWork: any = listCompanyAndTaskOverdueWork?.find((item1: any) => item1._id === item._id)
				const totalNextWeekWork: any = listCompanyAndTaskNextWeekWork?.find((item1: any) => item1._id === item._id)
				const totalMoreThan7Days: any = listCompanyAndTaskMoreThan7Days?.find((item1: any) => item1._id === item._id)
				const totalFinish: any = listCompanyAndTaskFinish?.find((item1: any) => item1._id === item._id)
				// Tính tổng số lượng task
				totalOverdueWorkAll += totalOverdueWork?.count || 0;
				totalNextWeekWorkAll += totalNextWeekWork?.count || 0;
				totalMoreThan7DaysAll += totalMoreThan7Days?.count || 0;
				totalFinishAll += totalFinish?.count || 0;

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
			setTotalTaskOverdueWork(totalOverdueWorkAll)
			setTotalTaskNextWeekWork(totalNextWeekWorkAll)
			setTotalTaskMoreThan7Days(totalMoreThan7DaysAll)
			setRotalTaskFinish(totalFinishAll)
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
		document.title = `${projectInfo.sign} | Hồ sơ thanh toán`
	}, []);

	const toggleVisible = ({ company, typeStatus }: any) => {
		setVisibleDrawer(!visibleDrawer)
		setCompanyPopup(company)
		setTypeStatusPopup(typeStatus)
	};

	return (
		<div className="flex flex-col h-full overflow-hidden">
			<div className="flex-1 overflow-y-auto">
				<table className="text-black text-medium border-collapse space-x-0 space-y-0 w-full" style={{ borderSpacing: 0 }}>
					<thead className="">
						<tr className="text-primary-gray whitespace-nowrap align-middle text-left">
							<th className="px-4 py-2.5 font-normal bg-cbs-active-comment sticky top-0 border-0.5 border-cbs-border w-1">
								{/*<input className="cbs-checkbox" type="checkbox" value="checkAll" id="flexCheckDefault" ref={checkboxRef} onClick={handleCheckAll} />*/}
								{/*<button className="inline-block align-middle" type="button">*/}
								{/*	<img*/}
								{/*		className="w-8 opacity-50"*/}
								{/*		src={CaretDownIcon}*/}
								{/*		alt="Dropdown"*/}
								{/*	/>*/}
								{/*</button>*/}
								TT
							</th>
							<th className="py-2.5 font-normal bg-cbs-active-comment sticky top-0 border-0.5 border-cbs-border">
								Đơn vị thực hiện
							</th>
							<th className="py-2.5 px-3 font-normal bg-cbs-active-comment sticky top-0 border-0.5 border-cbs-border">
								Mã hiệu
							</th>
							<th className="py-2.5 px-3 font-normal bg-cbs-active-comment sticky top-0 border-0.5 border-cbs-border">
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
							<th className="py-2.5 px-3 font-normal bg-cbs-active-comment sticky top-0 border-0.5 border-cbs-border">
								Hoàn thành
							</th>
						</tr>
					</thead>
					<tbody className="">
						{
							dataCompany?.map((company: any, index) => {
								return (
									<tr key={company._id} className="text-left hover:bg-cbs-active-comment cursor-pointer">
										<td className="pt-2.5 pb-3 px-2 border-0.5 border-cbs-border text-center" onClick={e => e.stopPropagation()}>
											{index+1}
											{/*<input className="cbs-checkbox" type="checkbox" value={company._id} checked={Boolean(assigned[company._id])} onChange={e => handleChangeCheckbox(e, { id: company._id })} />*/}
										</td>
										<td className="pt-2.5 pb-3 px-2 border-0.5 border-cbs-border">
											<Link to={`/pm/project/${projectID}/payment/company/${company._id}/subtype/3`}>
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
												<div className="h-3 w-full bg-cbs-primary text-center min-w-[164px] mt-2" >{company?.totalFinish}</div> :
												<></>
											}
										</td>
									</tr>
								)
							})
						}
					</tbody>
				</table>
				{/* <ModalInformation open={visibleDrawer} onClose={toggleVisible} dataPopup={{ companyPopup, typeStatusPopup, projectID }}/> */}
			</div>
		</div >
	);
};

export default ProjectSubjectPage;