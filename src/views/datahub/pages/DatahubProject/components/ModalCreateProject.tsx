import { Dialog } from '@headlessui/react'
import { ModalContainer } from 'shareComponents/common'
import TField from 'views/datahub/sharedComponents/common/t-form/TField'
import TSelect from 'views/datahub/sharedComponents/common/t-form/TSelect'
import React, { FC } from 'react'

type Props = {
	show: boolean
	buttonOnly?: boolean
	type: 'create' | 'edit'

	toggle: () => void
}

const ModalCreateProject: FC<Props> = (props) => {
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
				<div className="px-5 pb-4 overflow-x-auto min-h-[500px]">
					<div className="whitespace-nowrap space-y-4 py-5">
						<TSelect name='owner' title='Tính chất phổ biến' required>
							<option className='opacity-30' disabled>Chủ đầu tư</option>
							<option>Công ty Cổ phần PGI Partners</option>
							<option>Công ty Cổ phần PGI Partners</option>
							<option>Công ty Cổ phần PGI Partners</option>
						</TSelect>
						<TField name='address' title='Địa chỉ dự án' as='input' required placeholder='Địa chỉ dự án' />
						<TSelect name='address_project' title='Khu vực dự án' required>
							<option className='opacity-30' disabled>Khu vực dự án</option>
							<option>Phường Nghĩa Đô, Quận Cầu Giấy, TP Hà Nội</option>
							<option>Phường Nghĩa Đô, Quận Cầu Giấy, TP Hà Nội</option>
							<option>Phường Nghĩa Đô, Quận Cầu Giấy, TP Hà Nội</option>
						</TSelect>
						<TField name='location' title='Địa chỉ theo GG map' as='input' placeholder='Địa chỉ theo GG map' />
						<TField name='name' title='Tên' as='input' required placeholder='Tên' />
						<TField name='code' title='Mã hiệu' as='input' required placeholder='Mã hiệu' />
						<TField name='note' title='Ghi chú' as='input' required placeholder='Ghi chú' />

						<TSelect name='PROJECT_TYPES' title='Nhóm dự án'>
							<option className='opacity-30' disabled>Nhóm dự án</option>
							<option>Nhóm A</option>
							<option>Nhóm A</option>
							<option>Nhóm A</option>
						</TSelect>
						<TSelect name='BUILDING_TYPES' title='Loại công trình' defaultValue='0'>
							<option className='opacity-30' disabled>Loại công trình</option>
							<option>Dân dụng</option>
							<option>Dân dụng</option>
							<option>Dân dụng</option>
						</TSelect>
						<TSelect name='BUILDING_GRADES' title='Cấp công trình'>
							<option className='opacity-30' disabled>Cấp công trình</option>
							<option>Cấp 1</option>
							<option>Cấp 2</option>
							<option>Cấp 3</option>
						</TSelect>
						<TField name='basementNumber' title='Cấp công trình' as='input' placeholder='Cấp công trình' />
						<TField name='basementArea' title='Diện tích tầng hầm' as='input' placeholder='Diện tích tầng hầm' />
						<TField name='floorNumber' title='Số tầng cao' as='input' placeholder='Số tầng cao' />
						<TField name='floorArea' title='Diện tích tầng cao' as='input' placeholder='Diện tích tầng cao' />
						<TSelect name='BUILDING_GRADES' title='Tình trạng dự án'>
							<option className='opacity-30' disabled>Tình trạng dự án</option>
							<option>Đang triển khai</option>
							<option>Đang triển khai</option>
							<option>Đang triển khai</option>
						</TSelect>
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
			</div>
		</ModalContainer>
	)
}

export default ModalCreateProject