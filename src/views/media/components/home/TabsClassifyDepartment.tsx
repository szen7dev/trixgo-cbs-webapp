import { FC, useState } from 'react'
import { Dialog, Transition, TransitionEvents } from '@headlessui/react'

interface Props {
	show: boolean
	toggle(): void
	onSelect?(): unknown
	showMore?(): unknown
}

const departments = [
	{ id: 1, name: "CHG.THT.Xây dựng trường trung học" },
	{ id: 2, name: "Xin chào" },
	{ id: 3, name: "Nội dung" },
	{ id: 4, name: "Filter" },
	{ id: 5, name: "Nội dung 2" },
];

const TabsClassifyDepartment: FC<TransitionEvents & Props> = ({ show, toggle, showMore, onSelect, ...props }) => {
	const [text, setText] = useState<string>('');

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
					Chọn dự án, phòng ban
				</Dialog.Title>
			</div>
			<div className="py-2.5 px-6 overflow-y-auto">
				<div className="post__department-filter rounded-full flex my-2.5">
					<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
					</svg>
					<input type="text" className="bg-transparent focus:outline-none flex-1" placeholder="Phòng ban" value={text} onChange={e => setText(e.target.value)} />
				</div>
				<div>
					<ul>
						{
							departments.filter(d => {
								return text === '' || d.name.toLowerCase().indexOf(text) !== -1;
							}).map(d => (
								<li key={d.id} className="post__department-choice">
									<button type="button" className="w-full text-left px-7 py-3 my-1.5" onClick={() => setText(d.name)}>
										{d.name}
									</button>
								</li>
							))
						}
					</ul>
				</div>
			</div>
		</Transition>
	)
}

export default TabsClassifyDepartment
