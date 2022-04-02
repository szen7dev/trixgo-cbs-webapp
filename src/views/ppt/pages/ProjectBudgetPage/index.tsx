import { FC, useEffect, useMemo, useState } from "react";
import { usePcmProjectBudget } from "services/hooks/pcm/usePcmProjectBudget";
import { useParams } from 'react-router-dom';

import BugetRowGroup from "./components/BudgetRowGroup";

const ProjectBudgetPage: FC = () => {
	const { id } = useParams<{ id: string }>();
	const { listPcmProjectBudget, createContractMutateAsync, updateContracttMutateAsync } = usePcmProjectBudget({
		projectID: id
	});

	const [show, setShow] = useState<boolean>(true)

	useEffect(() => {
		document.title = "Dự án-Ngân sách"
	}, []);

	return (
		<div className="flex-1 overflow-y-auto pb-8">
			<table className='text-medium w-full border-separate border-spacing-0 text-center'>
				<thead className="text-left">
					<tr>
						<th className="sticky top-0 bg-gray-300 px-1.5 z-10">
							<button className="inline-block text-white rounded bg-gray-600 w-5 h-5" onClick={() => setShow(!show)}>{show ? '+' : '-'}</button>
						</th>
						<th className="sticky top-0 bg-cbs-table-header border-0.5 border-cbs-border border-l-0 font-normal px-2">
							TT
						</th>
						<th className="sticky top-0 bg-cbs-table-header border-0.5 border-cbs-border border-l-0 font-normal px-2" style={{ maxWidth: '240px' }}>Gói thầu/Hợp đồng</th>
						<th className="sticky top-0 bg-cbs-table-header border-0.5 border-cbs-border border-l-0 font-normal px-2" style={{ maxWidth: '122px' }}>Ký hợp đồng</th>
						<th className="sticky top-0 bg-cbs-table-header border-0.5 border-cbs-border border-l-0 font-normal px-2" style={{ maxWidth: '122px' }}>Tạm ứng</th>
						<th className="sticky top-0 bg-cbs-table-header border-0.5 border-cbs-border border-l-0 font-normal px-2" style={{ maxWidth: '125px' }}>Sản lượng</th>
						<th className="sticky top-0 bg-cbs-table-header border-0.5 border-cbs-border border-l-0 font-normal px-2" style={{ maxWidth: '132px' }}>Nghiệm thu</th>
						<th className="sticky top-0 bg-cbs-table-header border-0.5 border-cbs-border border-l-0 font-normal px-2" style={{ maxWidth: '123px' }}>Thanh toán</th>
						<th className="sticky top-0 bg-cbs-table-header border-0.5 border-cbs-border border-l-0 font-normal px-2" style={{ maxWidth: '124px' }}>Còn lại</th>
						<th className="sticky top-0 bg-cbs-table-header border-0.5 border-cbs-border border-l-0 font-normal px-2" style={{ maxWidth: '246px' }}>Ghi chú</th>
					</tr>
				</thead>
				{
					listPcmProjectBudget.map((_item: any) => <BugetRowGroup row={_item} key={_item._id} show={show} />)
				}
				{/* <tfoot>
					<tr className="text-right">
						<th className="bg-gray-300 px-1.5 z-10">
						</th>
						<th className="bg-cbs-summary border-0.5 border-cbs-border border-l-0 p-2">
						</th>
						<th className="bg-cbs-summary border-0.5 border-cbs-border border-l-0 p-2 text-left">Tổng</th>
						<th className="bg-cbs-summary border-0.5 border-cbs-border border-l-0 p-2">0</th>
						<th className="bg-cbs-summary border-0.5 border-cbs-border border-l-0 p-2">0</th>
						<th className="bg-cbs-summary border-0.5 border-cbs-border border-l-0 p-2">0</th>
						<th className="bg-cbs-summary border-0.5 border-cbs-border border-l-0 p-2">0</th>
						<th className="bg-cbs-summary border-0.5 border-cbs-border border-l-0 p-2">0</th>
						<th className="bg-cbs-summary border-0.5 border-cbs-border border-l-0 p-2">0</th>
						<th className="bg-cbs-summary border-0.5 border-cbs-border border-l-0 p-2"></th>
					</tr>
				</tfoot> */}
			</table>
		</div >
	);
};

/**
 * ? Export rules:
 * ? export default must be capital syntax
 * ? export const must be camel case syntax
 */
export default ProjectBudgetPage;
