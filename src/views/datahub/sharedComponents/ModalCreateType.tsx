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

const ModalCreateType: FC<Props> = (props) => {
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
						{/* Fisrt row */}
						<TField name='content' title='Nội dung' as='textarea' required placeholder='Nội dung' />
						<TField name='description' title='Mô tả' required placeholder='Mô tả' />
						<TSelect name='type' title='Tính chất phổ biến' required>
							<option className='opacity-30' disabled selected>Tính chất phổ biến</option>
							<option>123</option>
							<option>321</option>
							<option>234</option>
						</TSelect>
						{/* <TField name='content' title='Mô tả' as="select" required placeholder='Mô tả' /> */}
						<div className="py-0.5 h-[30px] box-content px-2">

						</div>
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

export default ModalCreateType