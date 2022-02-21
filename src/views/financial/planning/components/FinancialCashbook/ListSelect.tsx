import { ChangeEventHandler, FC, Fragment, HTMLAttributes, ReactElement, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'

// const people = [
// 	{ name: 'Wade Cooper' },
// 	{ name: 'Arlene Mccoy' },
// 	{ name: 'Devon Webb' },
// 	{ name: 'Tom Cook' },
// 	{ name: 'Tanya Fox' },
// 	{ name: 'Hellen Schmidt' },
// ]
type DataProps = {
	[key: string]: string | number | DataProps
}

type Props = {
	data: DataProps[],
	defaultValue?: DataProps
}

function ListSelect<T extends HTMLAttributes<HTMLDivElement> & Props>({ data, defaultValue }: T): ReactElement {
	const [selected, setSelected] = useState(defaultValue ? defaultValue : null);
	const [_data, _setData] = useState(data);

	const handleChangeText: ChangeEventHandler<HTMLInputElement> = (e) => {
		// _setData(e.target.value)
	}

	return (
		<Listbox value={selected} onChange={setSelected}>
			<div className="relative">
				<Listbox.Button className="relative w-full pl-3 pr-10 text-left cursor-default">
					<span className="block truncate">{selected ? selected.name : "Chọn "}</span>
					<span className="w-4 h-4 bg-cbs-gray absolute inset-y-0 right-0 flex justify-center items-center pointer-events-none">
						<svg className='inline-block' width="13" height="7" viewBox="0 0 13 7" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M6.5 7L0.00480938 0.25L12.9952 0.25L6.5 7Z" fill="#C4C4C4" />
						</svg>
					</span>
				</Listbox.Button>
				<Transition
					as={Fragment}
					leave="transition ease-in duration-100"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<Listbox.Options className="min-w-[193px] absolute z-1 right-0 mt-1 overflow-auto text-left bg-white shadow-cbs-md border-0.5 border-cbs-border rounded-md focus:outline-none">
						<div className='px-2 border-cbs-border border-b-0.5 pt-3 pb-2.5'>
							<input type="text" className='w-full focus:outline-none' placeholder='Tìm kiếm' defaultValue={selected ? selected.name as string : ''} onChange={handleChangeText} />
						</div>
						{/* </Listbox.Option> */}
						{_data.map((d, idx) => (
							<Listbox.Option
								key={idx}
								className={({ active }) =>
									`${active ? 'bg-cbs-active-comment' : ''}
                          cursor-default select-none relative py-2 px-3 hover:bg-cbs-active-comment`
								}
								value={d}
							>
								{({ selected, active }) => (
									<>
										<span
											className="block truncate"
										>
											{d.name}
										</span>
									</>
								)}
							</Listbox.Option>
						))}
					</Listbox.Options>
				</Transition>
			</div>
		</Listbox>
	)
}

export default ListSelect
