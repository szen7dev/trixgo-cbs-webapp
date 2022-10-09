import React, { FC, useEffect, useState } from "react";
import { useParams, Link, useHistory } from 'react-router-dom';
import iconBack from "assets/images/icon-back-gray.svg";

// Hook
import useCheckedList from 'services/hooks/ppt/useCheckedList';
import { useQueryListCompanyOfAssigneeAndAmountTask } from "services/hooks/pcm/useStatistical";
import { useContractIpcCustom } from 'services/hooks/cmcs/useContractIPC';

import {SearchInput, GroupActions, ButtonMore, DropdownSearchableV2} from "shareComponents/common";
import ModalInformation from "./components/ModalInformation";
import { useProject } from 'services/hooks/items/useProject';
import ContractIPCRepository from 'apis/cmcs/contractIPC';

const ProjectDashboardDebtPage: FC = () => {
	const [visibleDrawer, setVisibleDrawer] = useState<boolean>(false);
	const [data, setData] = useState<{ id: number, [key: string]: any }[]>([])
	const [dataDebt, setDataDebt] = useState([]);
	const [companyPopup, setCompanyPopup] = useState();
	const [typeStatusPopup, setTypeStatusPopup] = useState();
	const { id: projectID } = useParams<{ id: string }>();
	const [keyword, setKeyword] = useState("");
    const history = useHistory();

	const { contractIPCAmountByProperty } = useContractIpcCustom({
        params: {
            outin: 2,
            option: 3,
            debt: 1,
			optionTime: 1,
            projectID
        },
        isFetchAmountByProperty: true
    });
	let listData: any = [];
	if(contractIPCAmountByProperty){
		const contractIPCAmountByPropertyFunction = async () =>{
			for (const item of contractIPCAmountByProperty?.data) {
				const data = await ContractIPCRepository.fetchAmountByProperty({ 
					outin: 2,
					option: 2,
					debt: 2,
					optionTime: 1,
					projectID
				});
				console.log({ Tong_tien: item.amount, qua_han: data.data[0], trong_ky: item.amount-data.data[0].amount });
				listData = [...listData, { 
					key: item?._id?.sellerInfo?.name, 
					trongKy: item.amount-data.data[0].amount.toFixed(2), 
					expires: data.data[0].amount.toFixed(2) }
				]
			}
			if(listData.length && !dataDebt.length){
				setDataDebt(listData);
			}
		}
		contractIPCAmountByPropertyFunction()
	}

	const { info: projectInfo } = useProject({
		params: {
			departmentID: projectID,
			select: "name sign",
			populates: ""
		},
		isFetchInfo: true
	})

	useEffect(() => {
		document.title = `${projectInfo.sign} | Công nợ`
	}, []);

	const toggleVisible = ({ company, typeStatus }: any) => {
		setVisibleDrawer(!visibleDrawer)
		setCompanyPopup(company)
		setTypeStatusPopup(typeStatus)
	};

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
							Công nợ
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
								Mã Khách
							</th>
							<th className="py-2.5 px-3 font-normal bg-cbs-table-header sticky top-0 border-0.5 border-cbs-border">
								<div className="flex justify-between">
									<span>
										Công nợ
									</span>
									<div className="flex space-x-5 px-2">
										<div className="flex items-center">
											<div className="w-3 h-3 bg-cbs-schedule-expired" />
											<span className="ml-1 text-primary-gray font-normal">
												Quá hạn(0)
											</span>
										</div>
										
										<div className="flex items-center">
											<div className="w-3 h-3 bg-cbs-schedule-after-7days" />
											<span className="ml-1 text-primary-gray font-normal">
												{" "}
												{"Trong kỳ"}(0)
											</span>
										</div>
									</div>
								</div>
							</th>
						</tr>	
					</thead>
					<tbody className="">
						{
							dataDebt?.map((company: any, index: any) => {
								return (
									<tr key={company._id} className="text-left hover:bg-cbs-table-header cursor-pointer">
										<td className="pt-2.5 pb-3 px-2 border-0.5 border-cbs-border text-center" onClick={e => e.stopPropagation()}>
											{index+1}
										</td>
										<td className="pt-2.5 pb-3 px-2 border-0.5 border-cbs-border">
											{/* <Link to={`/pm/project/${projectID}/subject/company/${company._id}`}> */}
												{company?.key}
											{/* </Link> */}
										</td>
										<td className="pt-2.5 pb-3 px-2 border-0.5 border-cbs-border text-right cursor-auto" style={{ minWidth: "155px", fontSize: '10px' }} onClick={e => e.stopPropagation()}>
											<div className="flex w-full h-3 mt-2">
												<button
													className="flex items-center justify-center bg-red-500"
													style={{ width: `50%` }}
													// onClick={() => toggleVisible({ company: company._id, typeStatus: "1"}) }
													>
													<span className="text-white">
														{company?.expires || ""}
													</span>
												</button>
												<button
													className="flex items-center justify-center bg-green-500"
													style={{ width: `50%` }}
													// onClick={() => toggleVisible({ company: company._id, typeStatus: "3"}) }
													>
													<span className="text-white">
														{company?.trongKy || ""}
													</span>
												</button>
											</div>
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

export default ProjectDashboardDebtPage;