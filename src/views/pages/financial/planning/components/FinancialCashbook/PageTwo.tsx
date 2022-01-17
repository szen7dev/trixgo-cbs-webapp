import { FC, useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router';

// Context
import { Context } from 'views/pages/document/contexts/contextModal';

// Hook
import useCheckedList from 'views/pages/ppt/hook/useCheckedList';

import DropdownFilterButton from 'views/pages/document/components/DocumentFilterButton';
import Paginate from 'components/common/Paginate';
import SearchInput from 'views/pages/document/components/SearchInput';
import GroupActions from 'views/pages/document/components/projects/GroupActions';
import ButtonCreate from 'views/pages/document/components/common/ButtonCreate';
import ButtonMore from 'views/pages/document/components/common/ButtonMore';

const PageTwo: FC = () => {
	const { toggleModal } = useContext(Context);
	const [data, setData] = useState<{ id: number, [key: string]: any }[]>([])
	const { assigned, handleChangeCheckbox, handleCheckAll, checkboxRef } = useCheckedList(data)

	useEffect(() => {
		document.title = "CHG.THT-Lựa chọn nhà thầu"
		setData(Array.from({ length: 30 }).map((_, index) => ({
			id: index,
			content: 'Theo dõi sổ quỹ Công ty Cổ phần PGI partners tháng 11 năm 2021',
			opening_balance: 250000000000,
			increased_balance: 1250000000000,
			closing_balance: 1250000000000,
			created_by: 'Nguyễn Thị Ngân-CPMI',
			updated_by: 'Hương-CPMI',
			created_at: "15:30 22/12/2021",
			updated_at: "17:20 14/11/21",
		})));
	}, []);

	return (
		<div className="flex flex-col h-full overflow-hidden">
			<div className="flex flex-wrap items-center w-full px-4 gap-x-2 bg-white text-black border-b border-cbs-gray py-1">
				<span className="text-x-large mr-7">Hồ sơ dự thầu</span>
				<SearchInput className="rounded-sm flex bg-cbs-left-menu" onChange={() => 1} />
				<DropdownFilterButton />
				<GroupActions className="flex items-center flex-1" />

				<ButtonCreate onClick={toggleModal} />
				<ButtonMore />
			</div>
			<div className="flex-1 overflow-y-auto">
				<table className="text-black text-medium border-separate space-x-0 space-y-0 w-full" style={{ borderSpacing: 0 }}>
					<thead className="">
						<tr className="text-primary-gray whitespace-nowrap align-middle text-left">
							<th className="px-4 py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border w-1">
								<input className="cbs-checkbox" type="checkbox" value="" id="flexCheckDefault" onClick={handleCheckAll} ref={checkboxRef} />
							</th>
							<th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border">
								<span className="pl-2 border-l border-cbs-border">
									Nội dung
								</span>
							</th>
							<th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border">
								<span className="pl-2 border-l border-cbs-border">
									Số dư đầu kỳ
								</span>
							</th>
							<th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border">
								<span className="pl-2 border-l border-cbs-border">
									Phát sinh trong kỳ
								</span>
							</th>
							<th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border">
								<span className="pl-2 border-l border-cbs-border">
									Số dư cuối kỳ
								</span>
							</th>
							<th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border" style={{ minWidth: "150px" }}>
								<span className="pl-2 border-l border-cbs-border">
									Khởi tạo
								</span>
							</th>
							<th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border" style={{ minWidth: "150px" }}>
								<span className="pl-2 border-l border-cbs-border">
									Cập nhật lần cuối
								</span>
							</th>
							<th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border" style={{ minWidth: "150px" }}>
								<span className="pl-2 border-l border-cbs-border">
									Người được truy cập
								</span>
							</th>
						</tr>
					</thead>
					<tbody className="text-small">
						{
							data.map(({
								id,
								content,
								opening_balance,
								increased_balance,
								closing_balance,
								created_by,
								updated_by,
								created_at,
								updated_at,
							}) => {
								return (
									<tr key={id} className="text-left hover:bg-cbs-active-comment cursor-pointer" onClick={e => handleChangeCheckbox(undefined, { id })}>
										<td className="pt-2.5 pb-3 px-2 border-b border-cbs-border text-center" onClick={e => e.stopPropagation()}>
											<input className="cbs-checkbox" type="checkbox" value="" checked={assigned[id]} onChange={e => handleChangeCheckbox(e, { id })} />
										</td>
										<td className="pt-2.5 pb-3 px-2 border-b border-cbs-border">{content}</td>
										<td className="pt-2.5 pb-3 px-2 border-b border-cbs-border text-right">{parseInt(opening_balance).toLocaleString('en-US', { maximumFractionDigits: 0 })}</td>
										<td className="pt-2.5 pb-3 px-2 border-b border-cbs-border text-right">{parseInt(increased_balance).toLocaleString('en-US', { maximumFractionDigits: 0 })}</td>
										<td className="pt-2.5 pb-3 px-2 border-b border-cbs-border text-right">{parseInt(closing_balance).toLocaleString('en-US', { maximumFractionDigits: 0 })}</td>
										<td className="pt-2.5 pb-3 px-2 border-b border-cbs-border text-right">{created_by}</td>
										<td className="pt-2.5 pb-3 px-2 border-b border-cbs-border text-right">{updated_at + " " + updated_by}</td>
										<td className="pt-2.5 pb-3 px-2 border-b border-cbs-border">
											<div className="flex">
												<img src="https://gamek.mediacdn.vn/133514250583805952/2021/9/17/photo-1-1631856680040545802895.jpg" alt="" className="w-6 h-6 rounded-full" />
												<img src="https://gamek.mediacdn.vn/133514250583805952/2021/9/17/photo-1-1631856680040545802895.jpg" alt="" className="w-6 h-6 rounded-full -ml-1.5" />
												<img src="https://gamek.mediacdn.vn/133514250583805952/2021/9/17/photo-1-1631856680040545802895.jpg" alt="" className="w-6 h-6 rounded-full -ml-1.5" />
												<div className="h-6 w-6 rounded-full -ml-1.5 bg-cbs-border text-white flex justify-center items-center" style={{ fontSize: "10px" }}>+15</div>
											</div>
										</td>
									</tr>
								)
							})
						}
					</tbody>
				</table>
			</div>
			<Paginate className="min-h-24 w-full border-t z-10 flex items-center justify-center py-2 bg-white" />
		</div >
	);
}

export default PageTwo
