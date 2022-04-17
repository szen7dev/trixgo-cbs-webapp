import React, { FC } from 'react';

/**
 * LIBRARIES
 */
import { Dialog } from '@headlessui/react';
import { Form, Formik, ErrorMessage } from 'formik';
import { string, object } from 'yup';

interface ModalProps {
	toggle: () => void
	edit?: boolean
}

export const ModalUpdateCashBook: FC<ModalProps> = ({ toggle, edit = false }) => {
	const financialSchema = object().shape({
		title: string().required("Bạn cần nhập tiêu đề cho bài viết"),
		content: string().required("Bạn cần nhập nội dung cho bài viết"),
		note: string().required("Loại bài viết không hợp lệ"),
	});

	// Xử lý hứng giá trị các biến từ Client truyền lên sau khi Submit
	const handleSubmit = async (values: any) => {
		alert("submited form")
	};

	return (
		<Formik
			initialValues={{
				title: '',
				content: '',
				note: ''
			}}
			validationSchema={financialSchema}
			onSubmit={handleSubmit}
		>
			{
				formik => {
					const { values } = formik;
					return (
						<Form autoComplete="off">
							<div className="flex items-center px-6 py-2.5 justify-between bg-cbs-table-header">
								<Dialog.Title
									as="h3"
									className="text-lg leading-6 font-bold"
								>
									{edit ? 'Cập nhật' : 'Tạo mới'}
								</Dialog.Title>
								<button className="p-2 rounded-3xl" type="button" onClick={() => toggle()}>
									<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
									</svg>
								</button>
							</div>
							<div className="px-6 mt-2 pt-3.5 flex-1 md:h-[500px] text-x-small">
								<label className='block'>
									<div className='mb-1.5'>
										Nội dung (*)
									</div>
									<textarea
										rows={2}
										placeholder="Biên soạn nội dung"
										className="py-1.5 px-3 bg-cbs-gray w-full border-0.5 border-cbs-border focus:bg-white focus:border-cbs-primary focus:outline-none resize-none rounded-md"
										{...formik.getFieldProps('content')}
									/>
									<ErrorMessage
										name="content"
										component="span"
										className="font-normal text-negative italic"
									/>
								</label>
								<label className='mt-4 block'>
									<div className='mb-1.5'>
										Mã hiệu
									</div>
									<input
										type="text"
										placeholder="Mã hiệu"
										className="py-1.5 px-3 bg-cbs-gray w-full border-0.5 border-cbs-border focus:bg-white focus:border-cbs-primary focus:outline-none resize-none rounded-md"
										{...formik.getFieldProps('title')}
									/>
									<ErrorMessage
										name="title"
										component="span"
										className="font-normal text-negative italic"
									/>
								</label>
								<label className='mt-4 block'>
									<div className='mb-1.5'>
										Ghi chú
									</div>
									<textarea
										rows={2}
										placeholder="Ghi chú"
										className="py-1.5 px-3 bg-cbs-gray w-full border-0.5 border-cbs-border focus:bg-white focus:border-cbs-primary focus:outline-none resize-none rounded-md"
										{...formik.getFieldProps('note')}
									/>
									<ErrorMessage
										name="note"
										component="span"
										className="font-normal text-negative italic"
									/>
								</label>
							</div>
							<div className="flex justify-end pt-5 px-6 pb-6 mb-0.5">
								<div>
									<button type="submit" className="px-7 py-3.5 rounded-md bg-primary text-white font-bold text-sm leading-4">Xác nhận</button>
								</div>
							</div>
						</Form>
					)
				}
			}
		</Formik>
	)
}