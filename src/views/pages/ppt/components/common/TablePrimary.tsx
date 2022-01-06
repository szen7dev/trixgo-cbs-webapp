import React, { FC, HTMLAttributes } from 'react';
import cn from 'classnames';

interface Config {
	id: string | number,
	key: string | number,
	title?: string,
	// style?: 
	thClassName?: string,
}

interface Props {
	data: any[],
	onClickRow?: (row: any) => any;
	configs: Config[]
}

function getStatus(status: number) {
	if (status === 1)
		return "Chưa triển khai";
	if (status === 2)
		return "Đang triển khai";

	return "Đã hoàn thành";
}

const TablePrimary: FC<HTMLAttributes<HTMLTableElement> & Props> = ({ configs, onClickRow, data, ...props }) => {
	return (
		<table {...props}>
			<thead className="">
				<tr className="text-primary-gray whitespace-nowrap align-middle text-left">
					<th className="px-4 py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border w-1">
						<input className="cbs-checkbox" type="checkbox" value="" id="flexCheckDefault" ref={input => { if (input) input.indeterminate = true }} />
					</th>
					{
						configs.map(config => {
							return <th key={config.id} className={config.thClassName || "py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border"}>
								<span className="pl-2 border-l border-cbs-border">
									{config.title}
								</span>
							</th>
						})
					}
					{/* 
					<th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border">
						<span className="pl-2 border-l border-cbs-border">
							Chủ thể ban hành
						</span>
					</th>
					<th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border">
						<span className="pl-2 border-l border-cbs-border">
							Mã hiệu
						</span>
					</th>
					<th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border">
						<span className="pl-2 border-l border-cbs-border">
							Ngày văn bản
						</span>
					</th>
					<th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border" style={{ minWidth: "150px" }}>
						<span className="pl-2 border-l border-cbs-border">
							Mã hiệu lưu
						</span>
					</th>
					<th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border" style={{ minWidth: "150px" }}>
						<span className="pl-2 border-l border-cbs-border">
							Số lượng
						</span>
					</th>
					<th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border" style={{ minWidth: "150px" }}>
						<span className="pl-2 border-l border-cbs-border">
							Tình trạng
						</span>
					</th>
					<th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border" style={{ minWidth: "150px" }}>
						<span className="pl-2 border-l border-cbs-border">
							Ghi chú
						</span>
					</th>
					<th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border" style={{ minWidth: "150px" }}>
						<span className="pl-2 border-l border-cbs-border">
							Địa chỉ lưu trữ
						</span>
					</th> */}
				</tr>
			</thead>
			<tbody className="text-small">
				{
					data.map((row) => {
						return (
							<tr key={row._id} className="text-left hover:bg-cbs-active-comment cursor-pointer" onClick={() => onClickRow?.(row)}>
								<td className="pt-2.5 pb-3 px-2 border-b border-cbs-border text-center" onClick={e => e.stopPropagation()}>
									<input className="" type="checkbox" value="" id="flexCheckDefault" />
								</td>
								<td className="pt-2.5 pb-3 px-2 border-b border-cbs-border">{row.project}</td>
								<td className="pt-2.5 pb-3 px-2 border-b border-cbs-border text-right">{row.joined}</td>
								<td className="pt-2.5 pb-3 px-2 border-b border-cbs-border text-right">{row.worked}</td>
								<td className="pt-2.5 pb-3 px-2 border-b border-cbs-border text-right">{row.created_at}</td>
								<td className="pt-2.5 pb-3 px-2 border-b border-cbs-border text-right">{row.updated_at}</td>
								<td className={cn("pt-2.5 pb-3 px-2 border-b border-cbs-border", { "text-cbs-primary": row.status === 1, "text-cbs-completed": row.status === 2 })}>{getStatus(row.status)}</td>
							</tr>
						)
					})
				}
			</tbody>
		</table>
	)
}

export default TablePrimary
