import { FC } from 'react';

import { Field } from 'formik';
import { Dialog, Transition, TransitionEvents } from '@headlessui/react';

import iconChecked from 'assets/images/icons8-checked-40.png';

interface Props {
	show: boolean
	toggle(): void
	onSelect?(): unknown
	showMore?(type: string): unknown
}

const TabsClassifyArticle: FC<TransitionEvents & Props> = ({ show, toggle, showMore, onSelect, ...props }) => {
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
			className="flex flex-col absolute z-10 left-0 inset-y-0 w-full bg-primary-light"
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
					Phân loại bài viết
				</Dialog.Title>
			</div>
			<div className="py-2.5 pl-6 pr-4 overflow-y-auto">
				<label className="flex items-center mt-4 pb-3.5 cursor-pointer">
					<Field type="radio" value="company" name="type" className="post__classify-type" />
					<div className="mr-3">
						<img src={iconChecked} alt="icon Checked" />
					</div>
					<div>
						<p className="text-black text-base leading-5">Nội bộ công ty</p>
						<p className="text-secondary-gray text-sm leading-4">Nội bộ công ty</p>
					</div>
				</label>
				<label className="flex items-center mt-4 pb-3.5 cursor-pointer">
					<Field type="radio" value="departments" name="type" className="post__classify-type" onClick={() => showMore && showMore('')} />
					<div className="mr-3">
						<img src={iconChecked} alt="icon Checked" />
					</div>
					<div>
						<p className="text-black text-base leading-5">Dự án, phòng ban</p>
						<p className="text-secondary-gray text-sm leading-4">Dự án, phòng ban mà bạn là thành viên</p>
					</div>
					<div className="ml-auto text-primary-gray">
						<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
						</svg>
					</div>
				</label>
				<label className="flex items-center mt-4 pb-3.5 cursor-pointer">
					<Field type="radio" value="community" name="type" className="post__classify-type" onClick={() => showMore && showMore('community')} />
					<div className="mr-3">
						<img src={iconChecked} alt="icon Checked" />
					</div>
					<div>
						<p className="text-black text-base leading-5">Chuyển đổi số</p>
						<p className="text-secondary-gray text-sm leading-4">Chuyển đổi số</p>
					</div>
					<div className="ml-auto text-primary-gray">
						<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
						</svg>
					</div>
				</label>
				<label className="flex items-center mt-4 pb-3.5 cursor-pointer">
					<Field type="radio" value="systems" name="type" className="post__classify-type" />
					<div className="mr-3">
						<img src={iconChecked} alt="icon Checked" />
					</div>
					<div>
						<p className="text-black text-base leading-5">Tin hệ thống</p>
						<p className="text-secondary-gray text-sm leading-4">Thông báo từ hệ thống</p>
					</div>
				</label>
				<label className="flex items-center mt-4 pb-3.5 cursor-pointer">
					<Field type="radio" value="just-me" name="type" className="post__classify-type" />
					<div className="mr-3">
						<img src={iconChecked} alt="icon Checked" />
					</div>
					<div>
						<p className="text-black text-base leading-5">Lưu trữ cá nhân</p>
						<p className="text-secondary-gray text-sm leading-4">Lưu trữ cá nhân</p>
					</div>
				</label>
			</div>
		</Transition>
	)
}

export default TabsClassifyArticle
