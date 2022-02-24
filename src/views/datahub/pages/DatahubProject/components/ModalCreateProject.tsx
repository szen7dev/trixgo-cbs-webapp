import React, { FC } from 'react'
import { Dialog } from '@headlessui/react'
import { ModalContainer } from 'shareComponents/common'

import { Form, Formik } from 'formik'
import { CustomAutoCompleteFormik, CustomFieldFormik } from 'views/datahub/sharedComponents/common'

type Props = {
	show: boolean
	buttonOnly?: boolean
	type: 'create' | 'edit'

	toggle: () => void
}

// Declare type of formValues for Formik
type FormValues = {
	description: string
	content: string
	type: any
}

const ModalCreateProject: FC<Props> = (props) => {
	// Declare initialValues here
	const initialValues = {
		project: null, // Dự án
		client: null, // Chủ dự án
		field: null, // Lĩnh vực

		name: '', // Tên hợp đồng
		sign: '', // Mã hiệu

		description: '',
		content: '',
		type: null
	}
	const handleSubmit = (values: FormValues) => {
		console.log(values)
	}

	return (
		<ModalContainer isModalOpen={props.show} toggle={() => !props.buttonOnly && props.toggle()}>
			<div
				className="inline-flex flex-col text-black w-full my-8 overflow-hidden text-left align-middle transition-all transform bg-white max-w-2xl"
			>
				<div className="flex items-center px-6 py-2.5 justify-between border-b border-secondary-gray border-opacity-30">
					<Dialog.Title as="h3" className="text-lg leading-6 font-bold">
						{
							props.type === 'create' ? "Tạo mới" : "Cập nhật"
						}
					</Dialog.Title>
					<button
						type="button"
						onClick={props.toggle}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
				</div>
				<Formik
					initialValues={initialValues}
					onSubmit={handleSubmit}
				>
					<Form>
						<div className="px-5 pb-4 overflow-x-auto min-h-[500px]">
							<div className="whitespace-nowrap space-y-4 py-5">
								<CustomAutoCompleteFormik title='Chủ đầu tư' name='owner' required data={[
									{ name: 'Công ty Cổ phần PGI Partners' },
									{ name: 'Công ty Cổ phần PGI Partners2' },
									{ name: 'Công ty Cổ phần PGI Partners3' },
								]} />
								<CustomFieldFormik title='Địa chỉ dự án' required name='address' />
								<CustomAutoCompleteFormik title='Khu vực dự án' name='address_project' required data={[
									{ name: 'Phường Nghĩa Đô, Quận Cầu Giấy, TP Hà Nội ' },
									{ name: 'Phường Nghĩa Đô, Quận Cầu Giấy, TP Hà Nội 2' },
									{ name: 'Phường Nghĩa Đô, Quận Cầu Giấy, TP Hà Nội 3' },
								]} />
								<CustomFieldFormik name='location' title='Địa chỉ theo GG map' />
								<CustomFieldFormik name='name' title='Tên' required />
								<CustomFieldFormik name='sign' title='Mã hiệu' required />
								<CustomFieldFormik name='note' title='Ghi chú' required as="textarea" />

								<CustomAutoCompleteFormik title='Nhóm dự án' name='PROJECT_TYPES' required data={[
									{ name: 'Nhóm A' },
									{ name: 'Nhóm B2' },
									{ name: 'Nhóm C3' },
								]} />
								<CustomAutoCompleteFormik title='Loại công trình' name='BUILDING_TYPES' required data={[
									{ name: 'Dân dụng' },
									{ name: 'Dân dụng' },
									{ name: 'Dân dụng' },
								]} />
								<CustomAutoCompleteFormik title='Cấp công trình' name='BUILDING_GRADES' required data={[
									{ name: 'Cấp 1' },
									{ name: 'Cấp 2' },
									{ name: 'Cấp 3' },
								]} />

								<CustomFieldFormik name='basementNumber' title='Cấp công trình' />
								<CustomFieldFormik name='basementArea' title='Diện tích tầng hầm' />
								<CustomFieldFormik name='floorNumber' title='Số tầng cao' />
								<CustomFieldFormik name='floorArea' title='Diện tích tầng cao' />
								<CustomAutoCompleteFormik title='Tình trạng dự án' name='status' required data={[
									{ name: 'Đang triển khai' },
									{ name: 'Đang triển khai' },
									{ name: 'Đang triển khai' },
								]} />
							</div>
						</div>
						<div className="flex justify-end py-2 px-6 border-t border-cbs-border">
							<div className="mr-1.5">
								<button
									type="submit"
									className="px-4 py-2 rounded-md bg-primary text-white text-small leading-5"
								>
									Xác nhận
								</button>
							</div>
						</div>
					</Form>
				</Formik>
			</div>
		</ModalContainer>
	)
}

export default ModalCreateProject