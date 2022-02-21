/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Dispatch, FC, Fragment, SetStateAction } from 'react';

import { Menu, Transition } from '@headlessui/react';
import cn from "classnames";

import iconDown from 'assets/images/Frame 1745.png';
import styles from '../document.module.css';

interface IData {
	id: number | string
	title: string | number
}
interface DropdownProps {
	data: Array<IData & Record<string, any>>
	value: string | number
	onSelectValue: Dispatch<SetStateAction<IData & Record<string, any>>>
}

const DocumentDropdown: FC<DropdownProps & React.HTMLAttributes<HTMLDivElement>> = ({ data, value, onSelectValue, ...props }) => {
	return (
		<Menu as="div" {...props} className={cn("relative inline-block z-10", props.className)}>
			<Menu.Button className="flex items-center pl-4 pr-1.5 py-0.5 border rounded-md focus:outline-none">
				<span className="mr-3.5">
					{value}
				</span>
				<img src={iconDown} alt="" className="inline-block opacity-40" />
			</Menu.Button>
			<Transition
				as={Fragment}
				enter="transition ease-out duration-100"
				enterFrom="transform opacity-0 scale-95"
				enterTo="transform opacity-100 scale-100"
				leave="transition ease-in duration-75"
				leaveFrom="transform opacity-100 scale-100"
				leaveTo="transform opacity-0 scale-95"
			>
				<div className={cn(styles.dropdown, "absolute right-0 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md")}>
					{data.map(d => (
						<button key={d.id} className="text-right w-full px-4 py-2 " onClick={() => onSelectValue(d)}>
							{d.title}
						</button>
					))}
				</div>
			</Transition>
		</Menu>
	)
}

export default DocumentDropdown
