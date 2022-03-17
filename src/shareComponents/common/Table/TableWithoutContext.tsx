/* eslint-disable @typescript-eslint/ban-types */
import React, { PropsWithChildren, ReactElement } from 'react'
import Skeleton from 'react-loading-skeleton'

import { ReturnUseTableData } from './useTableData'

type Props<D extends object = {}> = {
	instance: ReturnUseTableData<D>,

	isLoading?: boolean,
	rowLoading?: number,

	tableProps?: React.HTMLAttributes<HTMLTableElement>,
	tableBodyProps?: React.HTMLAttributes<HTMLBodyElement>,
	tableRowHeadProps?: React.HTMLAttributes<HTMLHeadElement>,
	tableRowProps?:
	| ((...props: any) => (React.HTMLAttributes<HTMLTableRowElement>))
	| React.HTMLAttributes<HTMLTableRowElement>
}

function TableWithoutContext<D extends object>({
	tableRowProps,
	isLoading,
	instance,

	rowLoading = 4,
	tableProps,
	tableBodyProps,
	tableRowHeadProps,
}: PropsWithChildren<Props<D>>): ReactElement {
	return (
		<table {...instance.getTableProps(tableProps)}>
			<thead>
				{
					instance.headerGroups.map((headerGroup, i) => {
						const { key: headerGroupKey, ...restTableHeadrGroup } = headerGroup.getHeaderGroupProps(tableRowHeadProps)
						return <tr key={headerGroupKey} {...restTableHeadrGroup}>
							{headerGroup.headers.map((column, i) => {
								const { key: headerKey, role: headerRole, ...getHeaderProps } = column.getHeaderProps((column as any).headCellProps)
								return <th key={headerKey} role={headerRole} {...getHeaderProps}>
									{column.render('Header')}
								</th>
							})}
						</tr>
					})
				}

			</thead>
			<tbody {...instance.getTableBodyProps(tableBodyProps)}>
				{isLoading ? Array.from({ length: rowLoading }).map((_, idx) => {
					const { onClick, ...rest } = typeof tableRowProps === 'function' ? tableRowProps() : (tableRowProps || {});
					return <tr key={idx} {...rest}>
						{
							instance.visibleColumns.map((col) => {
								return (
									<td key={col.id + idx} {...(col as any).cellProps}>
										<Skeleton className='px-4' />
									</td>
								)
							})
						}
					</tr>
				})
					: instance.rows.map((row, i) => {
						instance.prepareRow(row)
						const { key, ...rest } = row.getRowProps();
						// console.log(rest);
						return (
							<tr {...rest} {...row.getRowProps(tableRowProps)} key={key} >
								{row.cells.map(cell => {
									const { key: cellKey, ...rest } = cell.getCellProps((cell.column as any).cellProps)
									return <td key={cellKey} {...rest}>{cell.render('Cell')}</td>
								})}
							</tr>
						)
					})
				}
			</tbody>
		</table>
	)
}

export default TableWithoutContext