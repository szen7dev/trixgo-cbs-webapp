import { FC } from 'react'
import { Dialog, Transition, TransitionEvents } from '@headlessui/react'

interface Props {
	show: boolean
	toggle(): void
	onSelect?(): unknown
}

export const TabsClassifyArticleCommunity: FC<TransitionEvents & Props> = ({ show, toggle, onSelect, ...props }) => {
	return (
		<Transition
			show={show}
			as="div"
			enter="transition-all duration-300"
			enterFrom="opacity-0 left-full"
			enterTo="opacity-100 left-0"
			leave="transition-all duration-300"
			leaveFrom="opacity-100 left-0"
			leaveTo="opacity-0 left-full"
			className="post__comunity-select absolute z-10 left-0 inset-y-0 w-full bg-primary-light"
			{...props}
		>

			<div className="flex items-center px-6 py-2.5 border-b border-secondary-gray border-opacity-30">
				<button type="button" className="bg-primary-gray bg-opacity-20 p-2 rounded-3xl mr-5" onClick={() => toggle()}>
					<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
					</svg>
				</button>
				<Dialog.Title
					as="h3"
					className="text-lg leading-6 text-black font-bold"
				>
					Phân loại bài viết cộng đồng
				</Dialog.Title>
			</div>
			<div className="px-6">
				<ul className="mt-2.5 text-sm leading-4">
					<li className="active"><button type="button" className="w-full text-left px-7 py-3 my-1.5" onClick={() => toggle()}>Giới thiệu doanh nghiệp</button></li>
					<li className=""><button type="button" className="w-full text-left px-7 py-3 my-1.5" onClick={() => toggle()}>Giới thiệu dịch vụ</button></li>
					<li className=""><button type="button" className="w-full text-left px-7 py-3 my-1.5" onClick={() => toggle()}>Giới thiệu sản phẩm</button></li>
					<li className=""><button type="button" className="w-full text-left px-7 py-3 my-1.5" onClick={() => toggle()}>Tin tức</button></li>
				</ul>
			</div>
		</Transition>
	)
}