import { Fragment, FC, HTMLAttributes } from 'react';

import cn from 'classnames';
import { Menu, Transition } from "@headlessui/react";

import iconTrash from 'assets/images/icons8-remove.svg';
import iconPencil from 'assets/images/icons8-pencil.svg';

type Props = {
	onUpdate?: () => unknown,
	onDelete?: () => unknown,
	hasPermissionUpdate?: boolean,
	hasPermissionDelete?: boolean,
} & HTMLAttributes<HTMLDivElement>

export const EditButton: FC<Props> = ({ hasPermissionUpdate, hasPermissionDelete, ...props }) => {
	if(!hasPermissionUpdate && !hasPermissionUpdate) return <></>;

	const onDelete = () => props.onDelete && props.onDelete();
	const onUpdate = () => props.onUpdate && props.onUpdate();

	return (
		<Menu as="div" className={cn("transition-all relative inline-block ml-2", props.className)}>
			<Menu.Button className="w-8 h-8 rounded-full bg-gray-100 flex justify-center items-center">
				<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
				</svg>
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
				<Menu.Items className="z-10 absolute right-1/2 mt-2 text-right origin-top-right border border-gray-300 bg-white divide-y divide-gray-100 rounded-md whitespace-nowrap" style={{ width: "264px" }}>
					{hasPermissionUpdate ? (
						<Menu.Item>
							<button onClick={onUpdate} className="block px-8 py-2 hover:bg-gray-200 w-full text-left">
								<img src={iconPencil} alt="Icon Edit" className="inline-block mr-6" />
								Cập nhật
							</button>
						</Menu.Item>
					) : ''}

					{hasPermissionDelete ? (
						<Menu.Item>
							<button onClick={onDelete} className="block px-8 py-2 hover:bg-gray-200 w-full text-left">
								<img src={iconTrash} alt="Icon trash" className="inline-block mr-6" />
								Xóa
							</button>
						</Menu.Item>
					) : ''}
				</Menu.Items>
			</Transition>
		</Menu>
	)
}