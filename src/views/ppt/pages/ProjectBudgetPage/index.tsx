import { FC, useEffect, useMemo, useState } from "react";

import BugetRowGroup from "./components/BudgetRowGroup";

const ProjectBudgetPage: FC = () => {
	const [show, setShow] = useState<boolean>(true)
	const data = useMemo(() => Array.from({ length: 3 }).map((_, index) => ({
		_id: index,
		project: { sign: 'test' },
		name: 'San lấp mặt bằng toàn bộ công trình',
		expiredTime: Date.now(),
		description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi, rem?",
		data: Array.from({ length: Math.ceil(Math.random() * 10) }).map((_d, i) => ({
			_id: i,
			budget: 10000000 * Math.ceil(Math.random() * 3),
			predict: 100000000 * Math.ceil(Math.random() * 3),
			signed: 100000000 * Math.ceil(Math.random() * 3),
			advance: 100000000 * Math.ceil(Math.random() * 3),
			volume: 100000000 * Math.ceil(Math.random() * 3),
			finish: 100000000 * Math.ceil(Math.random() * 3),
			pay: 100000000 * Math.ceil(Math.random() * 3),
			rest: 100000000 * Math.ceil(Math.random() * 3),
			note: 'Xây dựng mẫu BoQ cho công tác preliminaries'
		}))
	})), []);

	useEffect(() => {
		document.title = "PPT - Ngân sách"
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
						<th className="sticky top-0 bg-cbs-table-header border-0.5 border-cbs-border border-l-0 font-normal px-2" style={{ minWidth: '240px' }}>Nội dung (không gồm VAT)</th>
						<th className="sticky top-0 bg-cbs-table-header border-0.5 border-cbs-border border-l-0 font-normal px-2" style={{ minWidth: '122px' }}>Ngân sách</th>
						<th className="sticky top-0 bg-cbs-table-header border-0.5 border-cbs-border border-l-0 font-normal px-2" style={{ minWidth: '122px' }}>Dự báo (phát sinh)</th>
						<th className="sticky top-0 bg-cbs-table-header border-0.5 border-cbs-border border-l-0 font-normal px-2" style={{ minWidth: '122px' }}>Ký hợp đồng</th>
						<th className="sticky top-0 bg-cbs-table-header border-0.5 border-cbs-border border-l-0 font-normal px-2" style={{ minWidth: '122px' }}>Tạm ứng</th>
						<th className="sticky top-0 bg-cbs-table-header border-0.5 border-cbs-border border-l-0 font-normal px-2" style={{ minWidth: '125px' }}>Sản lượng</th>
						<th className="sticky top-0 bg-cbs-table-header border-0.5 border-cbs-border border-l-0 font-normal px-2" style={{ minWidth: '132px' }}>Nghiệm thu hoàn thành</th>
						<th className="sticky top-0 bg-cbs-table-header border-0.5 border-cbs-border border-l-0 font-normal px-2" style={{ minWidth: '123px' }}>Thanh toán</th>
						<th className="sticky top-0 bg-cbs-table-header border-0.5 border-cbs-border border-l-0 font-normal px-2" style={{ minWidth: '124px' }}>Còn lại</th>
						<th className="sticky top-0 bg-cbs-table-header border-0.5 border-cbs-border border-l-0 font-normal px-2" style={{ minWidth: '246px' }}>Ghi chú</th>
					</tr>
				</thead>
				{
					data.map((_item, index) => <BugetRowGroup row={_item} key={index} show={show} />)
				}
				<tfoot>
					<tr className="text-right">
						<th className="bg-gray-300 px-1.5 z-10">
						</th>
						<th className="bg-cbs-summary border-0.5 border-cbs-border border-l-0 p-2">
						</th>
						<th className="bg-cbs-summary border-0.5 border-cbs-border border-l-0 p-2 text-left">Tổng</th>
						<th className="bg-cbs-summary border-0.5 border-cbs-border border-l-0 p-2">{data.reduce((prev, grow) => prev + grow.data.reduce((prev, d) => prev + d.budget, 0), 0).toLocaleString()}</th>
						<th className="bg-cbs-summary border-0.5 border-cbs-border border-l-0 p-2">{data.reduce((prev, grow) => prev + grow.data.reduce((prev, d) => prev + d.predict, 0), 0).toLocaleString()}</th>
						<th className="bg-cbs-summary border-0.5 border-cbs-border border-l-0 p-2">{data.reduce((prev, grow) => prev + grow.data.reduce((prev, d) => prev + d.signed, 0), 0).toLocaleString()}</th>
						<th className="bg-cbs-summary border-0.5 border-cbs-border border-l-0 p-2">{data.reduce((prev, grow) => prev + grow.data.reduce((prev, d) => prev + d.advance, 0), 0).toLocaleString()}</th>
						<th className="bg-cbs-summary border-0.5 border-cbs-border border-l-0 p-2">{data.reduce((prev, grow) => prev + grow.data.reduce((prev, d) => prev + d.volume, 0), 0).toLocaleString()}</th>
						<th className="bg-cbs-summary border-0.5 border-cbs-border border-l-0 p-2">{data.reduce((prev, grow) => prev + grow.data.reduce((prev, d) => prev + d.finish, 0), 0).toLocaleString()}</th>
						<th className="bg-cbs-summary border-0.5 border-cbs-border border-l-0 p-2">{data.reduce((prev, grow) => prev + grow.data.reduce((prev, d) => prev + d.pay, 0), 0).toLocaleString()}</th>
						<th className="bg-cbs-summary border-0.5 border-cbs-border border-l-0 p-2">{data.reduce((prev, grow) => prev + grow.data.reduce((prev, d) => prev + d.rest, 0), 0).toLocaleString()}</th>
						<th className="bg-cbs-summary border-0.5 border-cbs-border border-l-0 p-2"></th>
					</tr>
				</tfoot>
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
