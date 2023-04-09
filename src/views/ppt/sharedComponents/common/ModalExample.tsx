import React, { FC } from 'react'

import { ModalContainer } from "shareComponents/common";

type Props = {
	isShow: boolean;
	toggle: () => void;
	buttonOnly?: boolean;
}

const ModalExample: FC<Props> = ({ isShow, toggle, buttonOnly }) => {
	return (
		<ModalContainer isModalOpen={isShow} toggle={() => !buttonOnly && toggle()}>
			<div
				className="inline-flex flex-col text-black w-full my-8 overflow-hidden text-left align-middle transition-all transform bg-white"
				style={{ maxWidth: "1569px" }}
			>
				<button onClick={toggle}>
					Butotn
				</button>
			</div>
		</ModalContainer>
	)
}

export default ModalExample;