import { FC, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'

import { useCommentMedia } from 'services/hooks/useMedia'

import XIcon from 'assets/icons/X'

import { 
	CommentProvider, 
	ReplyCommentField, 
	RootCommentsList
} from 'views/document/sharedComponents/common/Comments/CommentArea';

interface Props {
	open: boolean,
	onClose: (open: boolean) => unknown,
	mediaID: string
}

const CommentArea: FC<Props> = ({ onClose, mediaID }) => {
	const { listComments, totalRecord, limit } = useCommentMedia({
		params: { mediaID },
		key: `list_comments.${mediaID}`
	});

	return (
		<CommentProvider>
			<div className="px-5 py-3 inline-flex justify-between items-center border-b border-cbs-border">
				<Dialog.Title className="text-small text-gray-900 truncate max-w-lg">Bình luận tại dự án <b>MAR.HAR.Court Yard By Marriott Ha Long Bay</b></Dialog.Title>
				<button
					type="button"
					className="rounded-md text-cbs-subtext hover:text-black focus:outline-none"
					onClick={() => onClose(false)}
				>
					<span className="sr-only">Close panel</span>
					<XIcon className="h-5 w-5" aria-hidden="true" />
				</button>
			</div>
			<div className="pt-2 relative flex-1 overflow-y-auto">
				{/* Replace with your content */}
				<RootCommentsList
					className="px-5"
					comments={listComments}
					totalRecord={totalRecord}
					limit={limit}
					mediaID={mediaID}
				/>
				{/* /End replace */}
			</div>
			{/* Footer */}
			<div>
				<ReplyCommentField className='border-t border-cbs-border' inputContainerClassName="flex w-full p-2" mediaID={mediaID} />
			</div>
		</CommentProvider>
	)
}

const SliderOver: FC<Props> = ({ open, onClose, mediaID }) => {
	return (
		<Transition.Root show={open} as={Fragment}>
			<Dialog as="div" className="fixed inset-y-0 right-0 overflow-hidden z-50" onClose={onClose}>
				<div className="absolute inset-0 overflow-hidden">
					<div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
						<Transition.Child
							as={Fragment}
							enter="transform transition ease-in-out duration-300 sm:duration-300"
							enterFrom="translate-x-full"
							enterTo="translate-x-0"
							leave="transform transition ease-in-out duration-300 sm:duration-300"
							leaveFrom="translate-x-0"
							leaveTo="translate-x-full"
						>
							<div className="relative w-screen max-w-[680px]">
								<div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
									<CommentArea onClose={onClose} mediaID={mediaID} open={open} />
								</div>
							</div>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition.Root>

	)
}

export default SliderOver
