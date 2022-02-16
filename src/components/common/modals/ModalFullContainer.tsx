import { FC, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

interface Props {
	isModalOpen: boolean
	toggle(): void
}

const ModalFullContainer: FC<Props> = ({ isModalOpen, toggle, children }) => {
	return (
		<Transition.Root appear show={isModalOpen} as={Fragment}
			beforeLeave={() =>
				document.getElementById('root')?.classList.remove('hidden')
			}
			afterEnter={() =>
				document.getElementById('root')?.classList.add('hidden')
			}
		>
			<Dialog
				as="div"
				className="fixed inset-0 z-50 overflow-y-auto"
				onClose={toggle}
			>
				<div className="h-screen w-screen">
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<Dialog.Overlay className="fixed inset-0 bg-black transition-opacity" />
					</Transition.Child>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0 scale-95"
						enterTo="opacity-100 scale-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100 scale-100"
						leaveTo="opacity-0 scale-95"
					>
						{children}
					</Transition.Child>
				</div>
			</Dialog>
		</Transition.Root>
	)
}

export default ModalFullContainer
