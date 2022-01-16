/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ChangeEvent, MouseEventHandler, useRef, useState } from 'react';

interface StateObject {
	[key: string]: any;
}

type State = (({ id: string | number } | { _id: string | number }) & StateObject) | string

function useCheckedList<S extends State>(initialData: Array<S>): {
	assigned: { [key: string]: boolean },
	checked: Array<S>,
	checkboxRef: React.RefObject<HTMLInputElement>,
	handleCheckAll: MouseEventHandler<HTMLInputElement>,
	handleChangeCheckbox: (e: ChangeEvent<HTMLInputElement>, data?: S) => void;
} {
	const [{ assigned, checked }, setChecked] = useState<{
		assigned: { [key: string]: boolean },
		checked: Array<S>
	}>({
		assigned: initialData.reduce((d, c, i) => ({ ...d, [typeof c === 'string' ? c : c._id ?? c.id]: false }), {}),
		checked: []
	})
	const checkboxRef = useRef<HTMLInputElement>(null);

	const handleCheckAll: MouseEventHandler<HTMLInputElement> = e => {
		if (checked.length < initialData.length) {
			e.currentTarget.checked = true;
			setChecked({ assigned: initialData.reduce((d, c, i) => ({ ...d, [typeof c === 'string' ? c : c._id ?? c.id]: true }), {}), checked: initialData })
		} else {
			e.currentTarget.checked = false;
			setChecked({ assigned: initialData.reduce((d, c, i) => ({ ...d, [typeof c === 'string' ? c : c._id ?? c.id]: false }), {}), checked: [] })
		}
	};

	const handleChangeCheckbox = (e: ChangeEvent<HTMLInputElement>, data?: S) => {
		let newChecked: Array<S> = JSON.parse(JSON.stringify(checked));
		const newAssigned: StateObject = JSON.parse(JSON.stringify(assigned));

		if (e.target.checked) {
			newChecked.push(data ? data : e.target.value as S);
			newAssigned[data ? typeof data === 'string' ? data : data._id ?? data.id : e.target.value] = true;
		} else {
			newChecked = newChecked.filter(checked => typeof checked !== "string" && typeof data !== "string" && data
				? typeof checked._id != undefined ? checked._id !== data._id : checked.id !== data.id
				: checked !== e.target.value);
			newAssigned[data ? typeof data === 'string' ? data : data._id ?? data.id : e.target.value] = false;
		}
		setChecked({ assigned: newAssigned, checked: newChecked });
		if (checkboxRef.current) {
			if (newChecked.length && newChecked.length < initialData.length) {
				checkboxRef.current.indeterminate = true;
			} else if (newChecked.length === initialData.length) {
				checkboxRef.current.indeterminate = false;
				checkboxRef.current.checked = true;
			} else {
				checkboxRef.current.indeterminate = false;
				checkboxRef.current.checked = false;
			}
		}
	}

	return { assigned, checked, checkboxRef, handleCheckAll, handleChangeCheckbox }
}

export default useCheckedList
