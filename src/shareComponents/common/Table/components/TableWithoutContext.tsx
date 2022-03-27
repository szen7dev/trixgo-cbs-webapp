/* eslint-disable @typescript-eslint/ban-types */
import React, { PropsWithChildren, ReactElement } from 'react'
import Skeleton from 'react-loading-skeleton'
import { Cell, HeaderGroup, Row, TableInstance } from 'react-table'

type Props<D extends object = {}> = {
	instance: TableInstance<D>,

	isLoading?: boolean,
	rowLoading?: number,
	parentRow?: (row: any) => ReactElement,

	getHeaderProps?: (value: HeaderGroup<D>) => React.HTMLAttributes<HTMLTableRowElement>;
	getColumnProps?: (value: HeaderGroup<D>) => {};
	getRowProps?: (value: Row<D>) => React.HTMLAttributes<HTMLTableRowElement>;
	getCellProps?: (value: Cell<D>) => {};
	getCellChildProps?: (value: Cell<D>) => {};

	tableProps?: React.HTMLAttributes<HTMLTableElement>,
	tableHeadProps?: React.HTMLAttributes<HTMLTableSectionElement>,
	tableBodyProps?: React.HTMLAttributes<HTMLTableSectionElement>,

	colSpan?: boolean;
}
type ColSpan = Record<string, number>

// Create a default prop getter
const defaultPropGetter = () => ({})

function TableWithoutContext<D extends object>({
	isLoading,
	instance,

	getHeaderProps = defaultPropGetter,
	getColumnProps = defaultPropGetter,
	getRowProps = defaultPropGetter,
	getCellProps = defaultPropGetter,
	getCellChildProps = defaultPropGetter,

	rowLoading = 4,
	tableProps,
	tableHeadProps,
	tableBodyProps,

	colSpan,
}: PropsWithChildren<Props<D>>): ReactElement {
	const colSpanRef = React.useRef<ColSpan>();
	if (colSpan && colSpanRef.current === undefined) {
		colSpanRef.current = {};
		let col = 0;
		instance.visibleColumns.forEach(column => {
			if (col > instance.visibleColumns.length - 1) return;
			if (!column.cellProps?.colSpan) {
				col++;
				(colSpanRef.current as ColSpan)[column.id] = 1;
			} else if (typeof column.cellProps.colSpan === 'number') {
				col += column.cellProps.colSpan;
				(colSpanRef.current as ColSpan)[column.id] = column.cellProps.colSpan;
			};

		})
	}

	return (
		<table {...instance.getTableProps(tableProps)}>
			<thead {...tableHeadProps}>
				{
					instance.headerGroups.map((headerGroup, i) => {
						const { key: headerGroupKey, ...restTableHeaderGroup } = headerGroup.getHeaderGroupProps(getHeaderProps(headerGroup))
						return <tr key={headerGroupKey} {...restTableHeaderGroup}>
							{headerGroup.headers.map((column, i) => {
								const { key: headerKey, ...getHeaderProps } = column.getHeaderProps([column.headCellProps || {}, getColumnProps(column)])
								return <th key={headerKey} {...getHeaderProps}>
									{column.render('Header')}
								</th>
							})}
						</tr>
					})
				}

			</thead>
			<tbody {...instance.getTableBodyProps(tableBodyProps)}>
				{isLoading ? Array.from({ length: rowLoading }).map((_, idx) => {
					return <tr key={idx} >
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
						const { key, ...rest } = row.getRowProps(getRowProps(row));

						return <tr key={key} {...rest}>
							{
								row.depth === 0
									?
									row.cells.map(cell => {
										const { key, ...rest } = cell.getCellProps([cell.column.cellProps || {}, getCellProps(cell)]);
										if (!colSpan || (colSpanRef.current && colSpanRef.current[cell.column.id]))
											return <td key={key} {...rest}>
												{cell.render('Cell')}
											</td>
										else return null

									})
									: row.cells.map((cell, idx) => {
										const { key, ...rest } = cell.getCellProps([cell.column.subCellProps || {},getCellChildProps(cell)]);
										return <td key={key} {...rest}>
											{cell.render(cell.column.SubCell ? 'SubCell' : 'Cell')}
										</td>
									})
							}
						</tr>

					})
				}
			</tbody>
		</table>
	)
}

export default TableWithoutContext