/* eslint-disable @typescript-eslint/no-explicit-any */
import { identity } from 'lodash';
import React, { ChangeEvent, MouseEventHandler, useRef, useState } from 'react';

interface StateObject {
	[key: string]: any;
}
interface StateOne {
	id: string | number;
	[key: string]: any;
}

interface StateTwo {
	_id: string | number;
	[key: string]: any;
}

type State = StateOne | StateTwo | string

function useCheckedList<S extends State>(initialData: Array<S>): {
	assigned: StateObject,
	checked: Array<S>,
	checkboxRef: React.RefObject<HTMLInputElement>,
	handleCheckAll: MouseEventHandler<HTMLInputElement>,
	handleChangeCheckbox: (e: undefined | null | ChangeEvent<HTMLInputElement>, data?: S) => void;
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

	function handleChangeCheckbox(e: undefined | null | ChangeEvent<HTMLInputElement>, data?: S) {
		let newChecked: Array<S> = JSON.parse(JSON.stringify(checked));
		const newAssigned: StateObject = JSON.parse(JSON.stringify(assigned));

		if (!e && !data) { return; }
		if (!e && data) {
			if (typeof data === 'string') {
				newAssigned[data] = !newAssigned[data];
				newChecked = (newChecked as string[]).filter(s => s !== data) as Array<S>;
			} else if ('id' in data) {
				newAssigned[data.id] = !newAssigned[data.id];
				if (newAssigned[data.id]) {
					newChecked.push(data);
				} else {
					newChecked = (newChecked as Array<Exclude<S, StateTwo | string>>).filter((s) => s.id !== data.id);
				}
			} else {
				newAssigned[data._id] = !newAssigned[data._id];
				newChecked = (newChecked as Array<Exclude<S, StateOne | string>>).filter((s) => s._id !== data._id);
			}
		} else if (e && e.target.checked) {
			newChecked.push(data ? data : e.target.value as S);
			newAssigned[data ? typeof data === 'string' ? data : '_id' in data ? data._id : data.id : e.target.value] = true;
		} else if (e && data) {
			if (typeof data === 'string') {
				newAssigned[data] = !newAssigned[data];
				newChecked = (newChecked as string[]).filter(s => s !== data) as Array<S>;
			} else if ('id' in data) {
				newAssigned[data.id] = !newAssigned[data.id];
				newChecked = (newChecked as Array<Exclude<S, StateTwo | string>>)
					.filter(_checked => _checked.id !== data.id);
			} else {
				newAssigned[data._id] = !newAssigned[data._id];
				newChecked = (newChecked as Array<Exclude<S, StateTwo | string>>)
					.filter(_checked => _checked._id !== data._id);
			}
		} else {
			return;
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
