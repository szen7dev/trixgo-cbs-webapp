import { FC, useMemo, useState } from 'react'
import { FinancialRowGroup } from './components';

function useForceUpdate() {
	const [value, setValue] = useState(0); // integer state
	return { forceUpdate: () => setValue(value => value + 1), value }; // update the state to force render
}

export const CashBookReportPage: FC = () => {
	const [show, setShow] = useState<boolean>(true);
	const { forceUpdate, value } = useForceUpdate();
	// console.log('rerender');
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

	const handleToggle = (v: boolean) => {
		if (v === show) {
			forceUpdate();
		} else {
			setShow(v)
		}
	}

	return (
		<div className='flex-1 overflow-y-auto'>
			<table className='text-small border-separate border-spacing-0 text-center'>
				<thead className="text-left">
					<tr>
						<th className="sticky top-0 bg-gray-300 px-1.5 z-10">
							<button className="block text-white rounded bg-gray-600 w-5 h-5" onClick={() => handleToggle(true)}>1</button>
							<button className="block mt-0.5 text-white rounded bg-gray-600 w-5 h-5" onClick={() => handleToggle(false)}>2</button>
						</th>
						<th className="sticky top-0 bg-cbs-table-header border-0.5 border-cbs-border border-l-0 font-normal px-2">
							TT
						</th>
						<th className="sticky top-0 bg-cbs-table-header border-0.5 border-cbs-border border-l-0 font-normal px-2" style={{ minWidth: '240px' }}>Công ty/Phân vùng</th>
						<th className="sticky top-0 bg-cbs-table-header border-0.5 border-cbs-border border-l-0 font-normal px-2" style={{ minWidth: '122px' }}>Tiền mặt</th>
						<th className="sticky top-0 bg-cbs-table-header border-0.5 border-cbs-border border-l-0 font-normal px-2" style={{ minWidth: '122px' }}>Tiền gửi ngân hàng</th>
					</tr>
				</thead>
				{
					data.map((_item, index) => <FinancialRowGroup row={_item} key={index} show={show} forceUpdateValue={value} />)
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
					</tr>
				</tfoot>
			</table>
		</div>
	)
}