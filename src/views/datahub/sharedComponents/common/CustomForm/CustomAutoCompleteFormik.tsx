/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Fragment, useState, PropsWithChildren, useEffect } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { Field, FieldProps } from 'formik'
import classNames from 'classnames';

type Props<T extends Record<string, any>> = {
	title: string
	name: string
	attribute?: string
	valueAttribute?: string,

	data: Array<T>
	required?: boolean;
	server?: boolean;
	error?: React.ComponentType<any>
	initialData?: string,
	placeholder?: string
	renderValue?: (value: T) => string
	onChange?: (value: string) => void,
	onScroll?: (e: any) => void,
}

function CustomAutoCompleteFormik<T extends Record<string, any>>({ name,
	title,
	required,
	error,
	children,
	renderValue,
	placeholder,
	attribute = 'name',
	valueAttribute,
	data,
	initialData = '',
	onChange,
	onScroll,
	server = false,
	...rest
}: PropsWithChildren<Props<T>>): JSX.Element {
	const [selected, setSelected] = useState<null | any>();
	const [search, setSearch] = useState(initialData);
	const [isOpen, setIsOpen] = useState(false);
	const ref = React.useRef<HTMLDivElement | null>(null);

	const dataFiltered = server ? data : data.filter(d => d[attribute]?.toLowerCase().includes(search.toLowerCase()));
	useEffect(() => {
		const handleClickOutSite = (e: Event) => {
			if (ref.current && !ref.current.contains(e.target as Node)) {
				setIsOpen(false);
			}
		};
		document.addEventListener('click', e => handleClickOutSite(e));
		document.querySelector('#headlessui-portal-root div div')?.addEventListener('click', handleClickOutSite);
		return () => {
			document.removeEventListener('click', handleClickOutSite);
			document.querySelector('#headlessui-portal-root div div')?.removeEventListener('click', handleClickOutSite);
		};
	}, [])

	useEffect(() => {
		setSearch(initialData || '');
	}, [initialData])

	return (
		<Field name={name}>
			{({ field, form, meta }: FieldProps) => {
				const handleSelect = (select: any) => {
					setSelected(select);
					setSearch(renderValue ? renderValue(select) : select[attribute]);
					setIsOpen(false);
					form.setFieldValue(field.name, valueAttribute ? select[valueAttribute] : select);
				}

				return (
					<Listbox value={selected} onChange={handleSelect}>
						<div>
							<div className={classNames('focus-within:text-cbs-primary', (meta.touched && meta.error) ? 'text-red-400' : '')}>
								<div className='mb-1.5'>
									{title} {required && "(*)"}
								</div>
								{/* <div onClick={() => setIsOpen(true)} className=""> */}
								<div className='relative' ref={ref}>
									<input
										type="text"
										className={classNames('focus:bg-white focus:outline-none focus:border-cbs-primary py-1.5 px-3 w-full border-0.5 placeholder-shown:bg-cbs-gray border-cbs-border bg-white resize-none rounded-md', meta.touched && meta.error && 'border-cbs-red')}
										placeholder={placeholder ? placeholder : title}
										value={search}
										onClick={() => setIsOpen(!isOpen)}
										onChange={(e) => {
											if (selected) {
												setSelected(null);
												form.setFieldValue(field.name, null);
											}
											setSearch(e.target.value);
											setIsOpen(true);
											onChange?.(e.target.value);
										}}
									/>
									<span className='absolute right-2 top-1.5'>
										<svg xmlns="http://www.w3.org/2000/svg" className='w-4 h-4' viewBox="0 0 320 512">
											<path d="M310.6 246.6l-127.1 128C176.4 380.9 168.2 384 160 384s-16.38-3.125-22.63-9.375l-127.1-128C.2244 237.5-2.516 223.7 2.438 211.8S19.07 192 32 192h255.1c12.94 0 24.62 7.781 29.58 19.75S319.8 237.5 310.6 246.6z" />
										</svg>
									</span>
								</div>
								{/* </div> */}
							</div>
							<div className='relative z-3'>
								<Transition
									as={Fragment}
									leave="transition ease-in duration-100"
									leaveFrom="opacity-100"
									leaveTo="opacity-0"
									show={isOpen}
								>
									<Listbox.Options
										className="absolute w-full py-1 mt-1 overflow-auto bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none"
										onScroll={onScroll}
									>
										{dataFiltered.map((item, personIdx) => (
											<Listbox.Option
												key={personIdx}
												className={({ active, selected }) =>
													`hover:text-cbs-primary hover:bg-cbs-gray cursor-pointer select-none relative py-2 pl-10 pr-4 ${selected ? 'text-cbs-primary' : 'text-gray-900'
													}`
												}
												value={item}
											>
												{({ selected }) => (
													<>
														<span
															className={`block truncate ${selected ? 'font-medium' : 'font-normal'
																}`}
														>
															{renderValue ? renderValue(item) : item[attribute]}
														</span>
														{selected ? (
															<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
																<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
																	<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
																</svg>
															</span>
														) : null}
													</>
												)}
											</Listbox.Option>
										))}
										{dataFiltered.length === 0 && (
											<li className='text-center italic'>
												<span>Không có dữ liệu phù hợp</span>
											</li>
										)}
									</Listbox.Options>
								</Transition>
							</div>
						</div>
					</Listbox>
				)
			}}
		</Field>
	)
}

export default CustomAutoCompleteFormik