import { Dialog } from '@headlessui/react';
import React, { Fragment, useContext } from 'react'

import cn from 'classnames'

import { Context } from '../../contexts/contextModal';
import ModalContainer from "views/pages/media/components/ModalContainer";
import iconAttach from "assets/images/icons8-attach-96.png";
import itemTag from "assets/images/icons8-price-tag.svg"

const fakeDataInput = [
	{ title: 'Số lượng', type: 'text', value: '12' },
	{ title: 'Số lượng giao', type: 'text', value: '5' },
	{ title: 'Phản hồi', type: 'checkbox', checked: true },
	{ title: 'Thời hạn', type: 'text', value: '02/05/2021' },

	{ title: 'Mã hiệu', type: 'text', value: 'PMI/CHG.THT/PDA2021-02' },
	{ title: 'Mã hiệu lưu', type: 'text', value: 'PMI/CHG.THT/PDA2021-02' },
	{ title: 'Người ký', type: 'text', value: 'Hoàng Văn San và Tô Hạnh' },
	{ title: 'Giá trị', type: 'text', value: '150.000.000' },

	{ title: 'Nhận dạng', type: 'text', value: 'A4' },
	{ title: 'Tình trạng', type: 'text', value: 'Đã ký' },
	{ title: 'Ngày văn bản', type: 'text', value: '02/05/2021' },
	{ title: 'Ngày nhận', type: 'text', value: '02/05/2021' },
]

const fakeDataTag = [
	{ title: "Gói thầu" },
	{ title: "Hướng" },
	{ title: "Ban hành" },
	{ title: "Nhận" },

	{ title: "Tính chất" },
	{ title: "Phân loại" },
	{ title: "Hợp đồng" },
	{ title: "Lưu trữ" },
]

const ModalCreateDocument: React.FC = () => {
	const { state, toggleModal } = useContext(Context);
	return (
		<ModalContainer isModalOpen={state.isShow} toggle={() => false}>
			<div className="inline-flex flex-col text-black w-full my-8 overflow-hidden text-left align-middle transition-all transform bg-white" style={{ maxWidth: '1569px' }}>
				<div className="flex items-center px-6 py-2.5 justify-between border-b border-secondary-gray border-opacity-30">
					<Dialog.Title
						as="h3"
						className="text-lg leading-6 font-bold"
					>
						Tạo mới/Cập nhật hồ sơ
					</Dialog.Title>
					<button type="button" onClick={() => toggleModal()}>
						<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>
				<div className="px-5 pb-4 overflow-x-auto">
					<div className="document__profile-create whitespace-nowrap">
						{/* Fisrt row */}
						{
							fakeDataTag.map(item => {
								return (<Fragment key={item.title}>
									<div className="py-1.5 h-[30px] box-content">
										<p className="py-1.5">
											{item.title}
										</p>
									</div>
									<div key={item.title + 1} className="py-1.5 h-[30px] box-content px-2">
										<div className="flex border border-cbs-border rounded-full w-[209px] px-2.5 py-0.5">
											<img src={itemTag} alt="" className="h-6 w-6 mr-1.5" />
											<input className="inline-block" type="text" value="Nội dung dữ liệu" />
											<button type="button">
												<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
													<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
												</svg>
											</button>
										</div>
									</div>
								</Fragment>)
							})
						}
						{
							fakeDataInput.map((item) => {
								return (
									<Fragment key={item.title}>
										<div className="py-1.5 h-[30px] box-content">
											<p className="py-1.5">
												{item.title}
											</p>
										</div>
										<div className="text-black py-1.5 h-[30px] box-content px-2">
											<div className="py-1.5">
												{item.type === 'text' ? item.value : <input type={item.type} value={item.value} checked={item.checked} />}
											</div>
										</div>
									</Fragment>
								)
							})
						}
						<label htmlFor="title" className="py-1.5 h-[30px] box-content">
							<p className="py-1.5">
								Tiêu đề
							</p>
						</label>
						<input id="title" type="text" name="title" placeholder="Tiêu đề" className="col-span-7 focus:outline-none py-1.5 h-[30px] box-content" />
						<label htmlFor="description" className="py-1.5 h-[30px] box-content">
							<p className="py-1.5">
								Mô tả
							</p>
						</label>
						<input id="description" type="text" name="description" placeholder="Mô tả" className="col-span-7 focus:outline-none py-1.5 h-[30px] box-content" />
						<div className="border-opacity-50 py-1 col-span-8">
							<p className="py-1.5">Ghi chú</p>
							<textarea
								rows={10}
								placeholder="Biên soạn nội dung"
								className="w-full focus:outline-none resize-none lex-grow py-2"
							// {...formik.getFieldProps('content')}
							></textarea>
						</div>
						{/* File uploaded */}
						{
							Array.from({ length: 3 }).map((_, index) =>
								<div key={index} className="col-span-8 py-1 pl-2 pr-1 max-w-md flex mb-3" style={{ backgroundColor: '#EDEBEB' }}>
									<a className={cn("font-bold whitespace-nowrap flex overflow-hidden", { 'text-cbs-primary': index === 0 })} href='/' target="_blank" rel="noreferrer">
										<div className="document__line-min inline-block mr-1.5 py-1 align-bottom">Screen Shot 2021-12-22 at 10.15.22.png</div>
										<div className="inline-block py-1" style={{ color: '#777' }}>(725K)</div>
									</a>
									{index !== 0 ? <div className="inline-block w-[124px] min-w-[124px] bg-white border border-cbs-primary p-0.5 h-3 ml-3 my-2">
										<div className="bg-cbs-primary h-full" style={{ width: 30 + '%' }}></div>
									</div> : null}
									<button type="button" className="ml-auto p-1">
										<svg aria-label="Xóa tệp đính kèm" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
										</svg>
									</button>
								</div>
							)
						}
					</div>
				</div>
				<div className="flex justify-between pt-3 px-6 pb-3.5 border-t border-cbs-border">
					<div className="flex items-center">
						<label className="w-6 h-6 rounded-md flex justify-center items-center cursor-pointer mr-8">
							<img src={iconAttach} alt="" />
							<input type="file" name="files" id="file" className="hidden" accept="*" multiple onChange={event => false} />
						</label>
						<label>
							<input type="checkbox" value="send-mail" className="h-4 w-4 align-middle mr-5" />
							<span className="select-none align-middle ">Thông báo email</span>
						</label>
					</div>
					<div className="mr-1.5">
						<button type="submit" className="px-3 py-1.5 rounded-md bg-primary text-white text-large leading-5">Xác nhận</button>
					</div>
				</div>
			</div>
		</ModalContainer >
	)
}
export default ModalCreateDocument
