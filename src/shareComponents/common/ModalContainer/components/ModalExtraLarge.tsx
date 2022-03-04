import React, { FC } from 'react'
import { ModalContainer } from 'shareComponents/common'

type Props = {
	show: boolean
	buttonOnly?: boolean

	toggle?(): void;
}

const ModalExtraLarge: FC<Props> = ({ children, show, toggle, buttonOnly }) => {
	return (
		<ModalContainer isModalOpen={show} toggle={() => !buttonOnly && toggle?.()} >
			<div
				className="inline-flex flex-col text-black w-full my-8 overflow-hidden text-left align-middle transition-all transform bg-white max-w-2xl"
			>
				{children}
			</div>
		</ModalContainer>
	)
}

export default ModalExtraLarge