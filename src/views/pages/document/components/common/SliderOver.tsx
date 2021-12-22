import React, { FC, Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'

import XIcon from 'assets/icons/X'
import ReplyCommentField from 'views/pages/media/components/ReplyCommentField'
import RootCommentsList from 'views/pages/media/components/RootCommentsList'
import { CommentProps } from 'typings/common'
import generateImageLink from 'views/pages/media/utils/images'

interface Props {
	open: boolean,
	onClose: (open: boolean) => unknown,
}

const SliderOver: FC<Props> = ({ open, onClose }) => {

	const listComments: any[] = Array.from({ length: 10 }).map((_, _id) => ({
		_id: _id.toString(),
		media: _id.toString(),
		comment: {
			content: 'hallo', author: {
				_id: _id.toString(),
				image: generateImageLink(),
				fullname: 'asdsad'
			},
			amountCommentReply: 0,
			amountReaction: 0,
			typeReactions: [],
		},
		parent: (_id + 1).toString(),
		userCreate: {
			_id: _id.toString(),
			image: generateImageLink(),
			fullname: 'asdasd'
		},
		createAt: Date.toString(),
		lastestReplyID: 'asd'
	}))

	return (
		<Transition.Root show={open} as={Fragment}>
			<Dialog as="div" className="fixed inset-y-0 right-0 overflow-hidden z-50" onClose={onClose}>
				<div className="absolute inset-0 overflow-hidden">
					<div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
						<Transition.Child
							as={Fragment}
							enter="transform transition ease-in-out duration-500 sm:duration-700"
							enterFrom="translate-x-full"
							enterTo="translate-x-0"
							leave="transform transition ease-in-out duration-500 sm:duration-700"
							leaveFrom="translate-x-0"
							leaveTo="translate-x-full"
						>
							<div className="relative w-screen max-w-[680px]">
								<div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
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
									<div className="mt-6 relative flex-1 overflow-y-auto">
										{/* Replace with your content */}
										{/* <RootCommentsList
											className="px-5"
											comments={listComments}
											totalRecord={10}
											limit={1}
											mediaID={"10"} /> */}
										{/* /End replace */}
									</div>
									{/* Footer */}
									<div>
										<ReplyCommentField inputContainerClassName="flex w-full p-2" mediaID='1' />
									</div>
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
