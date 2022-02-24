import { Dialog } from '@headlessui/react'
import { ModalContainer } from 'shareComponents/common'
import TField from 'views/datahub/sharedComponents/common/TForm/TField'
import TSelect from 'views/datahub/sharedComponents/common/TForm/TSelect'
import React, { FC } from 'react'

type Props = {
	show: boolean
	buttonOnly?: boolean
	type: 'create' | 'edit'

	toggle: () => void
}

const ModalCreateContract: FC<Props> = (props) => {
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
						<TSelect name='project' title='Dự án' required>
							<option className='opacity-30' disabled>Tổ hợp chung cư cao tầng K2G</option>
							<option>Tổ hợp chung cư cao tầng K2G</option>
							<option>Tổ hợp chung cư cao tầng K2G</option>
							<option>Tổ hợp chung cư cao tầng K2G</option>
						</TSelect>
						<TSelect name='owner' title='Chủ đầu tư'>
							<option className='opacity-30' disabled>Chủ đầu tư</option>
							<option>Công ty Cổ phần PGI Partners</option>
							<option>Công ty Cổ phần PGI Partners</option>
							<option>Công ty Cổ phần PGI Partners</option>
						</TSelect>
						<TSelect name='PROJECT_TYPES' title='Lĩnh vực'>
							<option className='opacity-30' disabled>Lĩnh vực</option>
							<option>Tư vấn quản lý dự án</option>
							<option>Tư vấn quản lý dự án</option>
							<option>Tư vấn quản lý dự án</option>
						</TSelect>
						<TField name='name' title='Tên hợp đồng' as='input' required />
						<TField name='code' title='Mã hiệu' as='input' />
						<TField name='node' title='Ghi chú' as='input' />
						<TField name='value' title='Giá trị hợp đồng trước VAT' as='input' />
						<TField name='vat' title='Giá trị phần VAT' as='input' required/>
						<TField name='time' title='Ngày ký' as='input' />
						<TField name='start' title='Ngày bắt đầu thực hiện' as='input' />
						<TField name='end' title='Ngày kết thúc thực hiện' as='input' required />
						<TSelect name='status' title='Tình trạng'>
							<option className='opacity-30' disabled>Tình trạng</option>
							<option>Đang thực hiện</option>
							<option>Đang thực hiện</option>
							<option>Đang thực hiện</option>
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

export default ModalCreateContract