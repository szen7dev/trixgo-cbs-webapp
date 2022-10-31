import React, { FC, useEffect, useState } from "react";
import { useParams, Link, useHistory } from 'react-router-dom';
import iconBack from "assets/images/icon-back-gray.svg";
import {formatNumberMoney} from "utils/cmcs";

// Hook
import { useContractIpcCustom } from 'services/hooks/cmcs/useContractIPC';
import { useProject } from 'services/hooks/items/useProject';
import ContractIPCRepository from 'apis/cmcs/contractIPC';
import { useContractDashboard } from 'services/hooks/items/useContract';

const ProjectDashboardTab2Page: FC<any> = () => {
	const { id: projectID, year } = useParams<{ id: string, year: string }>();
    const history = useHistory();
	const { info: projectInfo } = useProject({
		params: {
			departmentID: projectID,
			select: "name sign",
			populates: ""
		},
		isFetchInfo: true
	})

	const { contractAmountByMonth } = useContractDashboard({
		params: { projectID, year }
	});

	useEffect(() => {
		document.title = `${projectInfo.sign} | Giá trị ký`
	}, [projectInfo]);
	let total = 0;
	return (
		<div className="flex flex-col h-full overflow-hidden">
			<div className={"sticky top-0 bg-white z-10"}>
			<div className={"header-table flex w-full top-0 bg-white pb-2"}>
					<button
                        onClick={history.goBack}
                        className={"rounded-full flex items-center justify-center w-[40px] h-[40px] max-w-[30px] max-h-[30px] min-w-[30px] min-h-[40px] hover:bg-cbs-form-input-bg mr-3"}>
                        <img src={iconBack} alt={"----"} className={"w-[18px]"}/>
                    </button>
					<div className="flex-1 flex items-center text-[15px] ml-2">
						<p className="text-lg text-primary-gray">
							Giá trị ký dự án {projectInfo?.name} năm { year }
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
								Thời gian
							</th>
							<th className="py-2.5 px-3 font-normal bg-cbs-table-header sticky top-0 border-0.5 border-cbs-border">
								Giá trị ký
							</th>
						</tr>	
					</thead>
					<tbody className="">
						{
							contractAmountByMonth?.map((item: any, index: any) => {
								total += item?.amount;
								if(index == contractAmountByMonth.length-1){
									return (
										<>
											<tr key={index} className="text-left hover:bg-cbs-table-header cursor-pointer">
												<td className="pt-2.5 pb-3 px-2 border-0.5 border-cbs-border text-center">
													{index+1}
												</td>
												<td className="pt-2.5 pb-3 px-2 border-0.5 border-cbs-border">
													<Link to ={`/pm/project/${projectInfo?._id}/dashboard/tab/2/month/${item?._id?.month}/year/${item?._id?.year}`}>
														Tháng { item?._id?.month } năm { item?._id?.year }
													</Link>
												</td>
												<td className="pt-2.5 pb-3 px-2 border-0.5 border-cbs-border">
													{ formatNumberMoney(item?.amount) }
												</td>
											</tr>
											<tr key={index} className="text-left hover:bg-cbs-table-header cursor-pointer">
												<td className="pt-2.5 pb-3 px-2 border-0.5 border-cbs-border text-center">
													{/* {index+1} */}
												</td>
												<td className="pt-2.5 pb-3 px-2 border-0.5 border-cbs-border">
													<b>Tổng</b>
												</td>
												<td className="pt-2.5 pb-3 px-2 border-0.5 border-cbs-border">
													<b>{ formatNumberMoney(total) }</b>
												</td>
											</tr>
										</>
									)
								}
								return (
									<tr key={index} className="text-left hover:bg-cbs-table-header cursor-pointer">
										<td className="pt-2.5 pb-3 px-2 border-0.5 border-cbs-border text-center">
											{index+1}
										</td>
										<td className="pt-2.5 pb-3 px-2 border-0.5 border-cbs-border">
											<Link to ={`/pm/project/${projectInfo?._id}/dashboard/tab/2/month/${item?._id?.month}/year/${item?._id?.year}`}>
												Tháng { item?._id?.month } năm { item?._id?.year }
											</Link>
										</td>
										<td className="pt-2.5 pb-3 px-2 border-0.5 border-cbs-border">
											{ formatNumberMoney(item?.amount) }
										</td>
									</tr>
								)
							})
						}
					</tbody>
				</table>
			</div>
		</div >
	);
};

export default ProjectDashboardTab2Page;