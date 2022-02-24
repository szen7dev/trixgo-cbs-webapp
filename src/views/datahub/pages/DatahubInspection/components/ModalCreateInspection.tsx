import React, { FC } from 'react'
import { Dialog } from '@headlessui/react'
import { ModalContainer } from 'shareComponents/common'
import TField from 'views/datahub/sharedComponents/common/TForm/TField'

type Props = {
	show: boolean
	buttonOnly?: boolean
	type: 'create' | 'edit'

	toggle: () => void
}

const ModalCreateInspection: FC<Props> = (props) => {
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
				<div className="px-5 pb-4 overflow-x-auto">
					<div className="whitespace-nowrap space-y-4 py-5">
						<TField name='content' title='Tên' as='input' required />
						<TField name='code' title='Mã hiệu' as='input' required />
						<TField name='description' title='Mô tả' as='input' required />
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

export default ModalCreateInspection