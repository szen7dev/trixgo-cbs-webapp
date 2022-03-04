import React, { FC, HTMLAttributes } from 'react'
import { ModalContainer } from 'shareComponents/common'

type Props = {
	show: boolean
	buttonOnly?: boolean

	toggle?(): void;
} & HTMLAttributes<HTMLDivElement>

const ModalLarge: FC<Props> = ({ children, show, toggle, buttonOnly, ...props }) => {
	return (
		<ModalContainer isModalOpen={show} toggle={() => !buttonOnly && toggle?.()} >
			<div
				className="inline-flex flex-col text-black w-full my-8 overflow-hidden text-left align-middle transition-all transform bg-white max-w-[600px]"
				{...props}
			>
				{children}
			</div>
		</ModalContainer>
	)
}

export default ModalLarge