import React, { FC, useEffect, useState } from "react";
import { useParams, Link, useHistory } from 'react-router-dom';
import iconBack from "assets/images/icon-back-gray.svg";
import {formatNumberMoney} from "utils/cmcs";
import PaginateV2 from "shareComponents/common/PaginateV2";

// Hook
import { useContractIpcCustom } from 'services/hooks/cmcs/useContractIPC';
import { useProject } from 'services/hooks/items/useProject';
import ContractIPCRepository from 'apis/cmcs/contractIPC';
import { useContractDashboard, useGetListByMonthContract } from 'services/hooks/items/useContract';
import moment from "moment";
import { CONTRACT_COME_IN_STATUS } from "apis/localdb";
const getStatusValue = (value: number) => {
	return CONTRACT_COME_IN_STATUS.find(item => item.value === value)?.text;
}
const ProjectDashboardTab2DetailPage: FC<any> = () => {
	type PaginateHandle = React.ElementRef<typeof PaginateV2>;
    const ref = React.useRef<PaginateHandle>(null);
    const [pageIndex, setPageIndex] = useState(0);

	const { id: projectID, month, year } = useParams<{ id: string, month: string , year: string }>();
    const history = useHistory();
	const { info: projectInfo } = useProject({
		params: {
			departmentID: projectID,
			select: "name sign",
			populates: ""
		},
		isFetchInfo: true
	})

	const {  listWithPager,
        totalRecord,
        totalPage,
        nextCursor,
        refetch,
        fetchNextPage,
        fetchPreviousPage,
        hasNextPage,
        isLoading } = useGetListByMonthContract({
		params: { 
			projectID, year, month,
			populates: JSON.stringify(
				{
					path: "buyerInfo sellerInfo",
					select: "name"
				}
			)
		}, isFetchList: true
	});

	console.log({  listWithPager,
        totalRecord,
        totalPage,
        nextCursor,
        refetch,
        fetchNextPage,
        fetchPreviousPage,
        hasNextPage,
        isLoading });

	useEffect(() => {
		document.title = `${projectInfo.sign} | Giá trị ký`
	}, [projectInfo]);
	
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
							Giá trị ký dự án {projectInfo?.name} tháng { month } năm { year }
						</p>
					</div>
				</div>
			</div>
			
			<div className="flex-1 overflow-y-auto">
			<PaginateV2
				ref={ref}
				totalRecord={totalRecord}
				totalPages={totalPage}
				limit={20}
				hasNextPage={hasNextPage}
				isFetching={isLoading}
				nextPageAction={() => {
					fetchNextPage();
					setPageIndex(oldState => oldState+1)
				}}
				prevPageAction={() => {
					setPageIndex(oldState => oldState-1)
				}}
			/>	
				<table className="text-black text-medium border-collapse space-x-0 space-y-0 w-full" style={{ borderSpacing: 0 }}>
					<thead className="">
						<tr className="text-primary-gray whitespace-nowrap align-middle text-left">
							
							<th className="px-3 py-2.5 font-normal bg-cbs-table-header sticky top-0 border-0.5 border-cbs-border w-1">
								TT
							</th>
							<th className="py-2.5 px-3 font-normal bg-cbs-table-header sticky top-0 border-0.5 border-cbs-border">
								Hợp đồng
							</th>
							<th className="py-2.5 px-3 font-normal bg-cbs-table-header sticky top-0 border-0.5 border-cbs-border">
								Số hiệu
							</th>
							<th className="py-2.5 px-3 font-normal bg-cbs-table-header sticky top-0 border-0.5 border-cbs-border">
								Ngày ký
							</th>
							<th className="py-2.5 px-3 font-normal bg-cbs-table-header sticky top-0 border-0.5 border-cbs-border">
								Giá trị ký
							</th>
							<th className="py-2.5 px-3 font-normal bg-cbs-table-header sticky top-0 border-0.5 border-cbs-border">
								Bên bán
							</th>
							<th className="py-2.5 px-3 font-normal bg-cbs-table-header sticky top-0 border-0.5 border-cbs-border">
								Bên mua
							</th>
							<th className="py-2.5 px-3 font-normal bg-cbs-table-header sticky top-0 border-0.5 border-cbs-border">
								Trạng thái
							</th>
						</tr>	
					</thead>
					<tbody className="">
						{
							(listWithPager[pageIndex]??[]).map((item: any, i: any) => (
								<tr key={item._id}>
									<td className={"p-2 border-0.5 border-primary-border text-center"}>
										{i+1}
									</td>
									<td className={"p-2 border-0.5 border-primary-border"}>
										{item.name}
									</td>
									<td className={"p-2 border-0.5 border-primary-border"}>
										{item.sign}
									</td>
									<td className={"p-2 border-0.5 border-primary-border"}>
										{ moment(item.date).format("L") }
									</td>
									<td className={"p-2 border-0.5 border-primary-border"}>
										{formatNumberMoney(item.value)}
									</td>
									<td className={"p-2 border-0.5 border-primary-border"}>
										{item?.sellerInfo?.name}
									</td>
									<td className={"p-2 border-0.5 border-primary-border"}>
										{item?.buyerInfo?.name}
									</td>
									<td className={"p-2 border-0.5 border-primary-border"}>
										{ getStatusValue(item?.status)}
									</td>
								</tr>
						))}
					</tbody>
				</table>
			</div>
		</div >
	);
};

export default ProjectDashboardTab2DetailPage;