/* eslint-disable @typescript-eslint/ban-types */
import React, { PropsWithChildren, ReactElement } from 'react'
import { useTable, TableOptions, useRowSelect, Column } from 'react-table'
import { ContextMenuWrapper } from '../ContextMenu'
import { IndeterminateCheckbox } from './IndeterminateCheckbox'

type RowProps =
	| ((...props: any) => (React.HTMLAttributes<HTMLTableRowElement>))
	| React.HTMLAttributes<HTMLTableRowElement>

export interface TableProperties<D extends object> extends Omit<TableOptions<D>, 'columns'>, React.HTMLAttributes<HTMLDivElement> {
	columns: ReadonlyArray<Column<D> & {
		headCellProps?: React.HTMLAttributes<HTMLTableHeaderCellElement>,
		cellProps?: React.HTMLAttributes<HTMLTableDataCellElement>,
	}>,

	tableHeadSelectorProps?: React.HTMLAttributes<HTMLTableHeaderCellElement>
	tableHeadSelectorInputProps?: React.HTMLAttributes<HTMLInputElement>
	tableCellSelectorProps?: React.HTMLAttributes<HTMLTableHeaderCellElement>
	tableCellSelectorInputProps?: React.HTMLAttributes<HTMLInputElement>

	tableProps?: React.HTMLAttributes<HTMLTableElement>
	bodyProps?: React.HTMLAttributes<HTMLBodyElement>
	tableRowProps?: RowProps;

	tableRowHeadProps?: React.HTMLAttributes<HTMLHeadElement>
	wrapperComponent?: (props: PropsWithChildren<{ state: any, selectedFlatRows: any }>) => ReactElement
	enableMenuContext?: boolean
}

const Table = <D extends object = Record<string, unknown>>(props: PropsWithChildren<TableProperties<D>>): ReactElement => {
	const {
		tableProps,
		tableHeadSelectorProps,
		tableHeadSelectorInputProps,
		tableCellSelectorProps,
		tableCellSelectorInputProps,
		bodyProps,
		tableRowHeadProps,
		tableRowProps,
		wrapperComponent,
		enableMenuContext,
		// ...rest
	} = props;
	const instance = useTable(
		{
			...props
		},
		useRowSelect,
		hooks => {
			hooks.visibleColumns.push(columns => [
				// Let's make a column for selection
				{
					id: 'selection',
					// The header can use the table's getToggleAllRowsSelectedProps method
					// to render a checkbox
					headCellProps: tableHeadSelectorProps,
					Header: ({ getToggleAllRowsSelectedProps }: any) => {
						return <IndeterminateCheckbox {...getToggleAllRowsSelectedProps(tableHeadSelectorInputProps)} />
					},
					// The cell can use the individual row's getToggleRowSelectedProps method
					// to the render a checkbox
					cellProps: tableCellSelectorProps,
					Cell: ({ row }: any) => (
						<IndeterminateCheckbox {...row.getToggleRowSelectedProps(tableCellSelectorInputProps)} />
					),
				},
				...columns,
			])
		}
	)

	const { getTableProps, headerGroups, prepareRow, state, rows, getTableBodyProps } = instance;
	const Wrapper = wrapperComponent || ((table: any) => table);

	return (
		<Wrapper state={state} selectedFlatRows={(instance as any).selectedFlatRows}>
			<table {...getTableProps(tableProps)}>
				<thead>
					{
						headerGroups.map((headerGroup, i) => {
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
				<ContextMenuWrapper tag='tbody' disable={!enableMenuContext} {...getTableBodyProps(bodyProps)}>
					{rows.map((row, i) => {
						prepareRow(row)
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
					})}
				</ContextMenuWrapper>
			</table>
		</Wrapper>
	)
}

export default Table
