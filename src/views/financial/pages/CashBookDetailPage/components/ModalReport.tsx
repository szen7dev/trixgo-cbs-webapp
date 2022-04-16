import { FC, Fragment, useState } from 'react'
import { Dialog, Transition, Listbox } from '@headlessui/react'

import ChartExpenseSumary from './ChartExpenseSumary';

import XIcon from 'assets/icons/X';
import iconCash from 'assets/images/icons8-cash-app-144.png';
import classNames from 'classnames';

interface Props {
	open: boolean,
	onClose: (open: boolean) => unknown,
}
const years = [
	{ id: 1, name: '2019', unavailable: false },
	{ id: 2, name: '2020', unavailable: false },
	{ id: 3, name: '2021', unavailable: false },
	{ id: 4, name: '2022', unavailable: true },
	{ id: 5, name: '2023', unavailable: false },
]

const ModalReport: FC<Props> = ({ open, onClose }) => {
	const [selectedYear, setSelectedYear] = useState(years[0])
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
									<div className="px-6 py-4 inline-flex justify-between items-center">
										<Dialog.Title className="text-2x-large text-gray-900 truncate max-w-lg">Báo cáo tổng hợp</Dialog.Title>
										<button
											type="button"
											className="rounded-md text-cbs-subtext hover:text-black focus:outline-none"
											onClick={() => onClose(false)}
										>
											<span className="sr-only">Close panel</span>
											<XIcon className="h-5 w-5" aria-hidden="true" />
										</button>
									</div>
									<div className="px-6 pt-2 relative flex-1">
										{/* Content */}
										<div className='text-medium flex justify-between'>
											<p>
												<span className='text-cbs-primary text-opacity-75'>
													<i className='w-2 h-2 bg-current rounded-md inline-block mr-1'></i>
													Thu
												</span>
												<span className='ml-3.5' style={{ color: '#1E4DB7' }}>
													<i className='w-2 h-2 bg-current rounded-md inline-block mr-1'></i>
													Chi
												</span>
											</p>
											<div className='relative'>
												<Listbox value={selectedYear} onChange={setSelectedYear}>
													<Listbox.Button className="border-0.5 border-cbs-border py-2 pl-8 pr-2.5 relative rounded-md">
														<span className='absolute inset-y-0 left-2 flex items-center'>
															<svg className='inline-block' width="13" height="7" viewBox="0 0 13 7" fill="none" xmlns="http://www.w3.org/2000/svg">
																<path d="M6.5 7L0.00480938 0.25L12.9952 0.25L6.5 7Z" fill="#C4C4C4" />
															</svg>
														</span>
														<span>
															Năm {selectedYear.name}
														</span>
													</Listbox.Button>
													<Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-center bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
														{years.map((year) => (
															<Listbox.Option
																key={year.id}
																value={year}
																className={({ active }) => classNames({ "bg-cbs-active-comment": active }, "py-2 px-2.5 hover:bg-cbs-active-comment cursor-pointer")}
																disabled={year.unavailable}
															>
																Năm {year.name}
															</Listbox.Option>
														))}
													</Listbox.Options>
												</Listbox>
											</div>
										</div>
										<div>
											<ChartExpenseSumary />
										</div>
										<div className='text-small pb-10'>
											<div className='flex mt-8'>
												<div className='mr-2'>
													<img src={iconCash} alt="" />
												</div>
												<div className="grid grid-cols-odd-2 flex-1 gap-y-4">
													<div className='text-x-large mb-1'>
														Tổng hợp quỹ
													</div>
													<div className='text-cbs-completed text-x-large text-right'>4.500.000.000</div>
													<div>1111-Tiền Việt Nam</div>
													<div className=' text-right'>1.500.000.000</div>
													<div>1111-Tiền Việt Nam</div>
													<div className='text-right'>1.500.000.000</div>
													<div>1111-Tiền Việt Nam</div>
													<div className='text-right'>1.500.000.000</div>
												</div>
											</div>
											<div className='flex mt-8'>
												<div className='mr-2'>
													<img src={iconCash} alt="" />
												</div>
												<div className="grid grid-cols-odd-2 flex-1 gap-y-4">
													<div className='text-x-large mb-1'>
														Chi tiết quỹ
													</div>
													<div className='text-x-large text-right'>4.500.000.000</div>
													<div>11219-Ngân hàng TMCP Ngoại Thương Việt Nam-Chi nhánh Hà Thành</div>
													<div className='text-right'>1.500.000.000</div>
													<div>11219-Ngân hàng TMCP Ngoại Thương Việt Nam-Chi nhánh Hà Thành</div>
													<div className='text-right'>1.500.000.000</div>
													<div>11219-Ngân hàng TMCP Ngoại Thương Việt Nam-Chi nhánh Hà Thành</div>
													<div className='text-right'>1.500.000.000</div>
												</div>
											</div>
										</div>
										{/* /End replace */}
									</div>
								</div>
							</div>
						</Transition.Child>
					</div>
				</div>
			</Dialog >
		</Transition.Root >

	)
}

export default ModalReport
