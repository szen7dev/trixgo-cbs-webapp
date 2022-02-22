import { FC, Fragment } from 'react';
import { Transition } from '@headlessui/react'

interface Props {
	show: boolean
}

export const TabsOverlay: FC<Props> = ({ show }) => {
	return (
		<Transition
			as={Fragment}
			show={show}
			enter="ease-out duration-300"
			enterFrom="opacity-0"
			enterTo="opacity-100"
			leave="ease-in duration-300"
			leaveFrom="opacity-100"
			leaveTo="opacity-0"
		>
			<div className="absolute inset-0 bg-dark bg-opacity-75 transition-opacity"></div>
		</Transition>
	)
}