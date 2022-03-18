/* eslint-disable @typescript-eslint/ban-types */
import { PropsWithChildren, useMemo } from "react";
import { useTable, TableOptions, useRowSelect, Column, TableInstance, UseRowSelectState, UseRowSelectInstanceProps } from 'react-table'
import { IndeterminateCheckbox } from "../components/IndeterminateCheckbox";

export interface TableProperties<D extends object> extends Omit<TableOptions<D>, 'columns'>, React.HTMLAttributes<HTMLDivElement> {
	columns: ReadonlyArray<Column<D> & {
		headCellProps?: React.HTMLAttributes<HTMLTableHeaderCellElement>,
		cellProps?: React.HTMLAttributes<HTMLTableDataCellElement>,
	}>,

	tableHeadSelectorProps?: React.HTMLAttributes<HTMLTableHeaderCellElement>
	tableHeadSelectorInputProps?: React.HTMLAttributes<HTMLInputElement>
	tableCellSelectorProps?: React.HTMLAttributes<HTMLTableHeaderCellElement>
	tableCellSelectorInputProps?: React.HTMLAttributes<HTMLInputElement>

	enableMenuContext?: boolean
}

export type ReturnUseTableData<D extends object> = TableInstance<D> & UseRowSelectInstanceProps<D> & { state: UseRowSelectState<D> }

const useTableData = <D extends object = Record<string, unknown>>(props: PropsWithChildren<TableProperties<D>>): ReturnUseTableData<D> => {
	const {
		tableHeadSelectorProps,
		tableHeadSelectorInputProps,
		tableCellSelectorProps,
		tableCellSelectorInputProps,
		enableMenuContext,
		...rest
	} = props;
	return useTable(
		rest,
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
	) as any
}

export default useTableData