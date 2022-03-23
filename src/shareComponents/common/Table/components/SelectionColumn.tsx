import { IndeterminateCheckbox } from "./IndeterminateCheckbox"

type Props = {
	tableHeadSelectorProps?: React.HTMLAttributes<HTMLTableHeaderCellElement>
	tableHeadSelectorInputProps?: React.HTMLAttributes<HTMLInputElement>
	tableCellSelectorProps?: React.HTMLAttributes<HTMLTableHeaderCellElement>
	tableCellSelectorInputProps?: React.HTMLAttributes<HTMLInputElement>
}

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export const SelectionColumn = ({
	tableHeadSelectorProps,
	tableHeadSelectorInputProps,
	tableCellSelectorProps,
	tableCellSelectorInputProps,
}: Props) => {
	return {
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
	}
}