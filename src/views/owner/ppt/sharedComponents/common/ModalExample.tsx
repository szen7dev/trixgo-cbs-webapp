import React, { FC, useContext } from 'react'

import { ModalContext } from "../../contexts/modal";
import ModalContainer from "../../../../components/common/modals/ModalContainer";

type Props = {

}

const ModalExample: FC<Props> = (props) => {
	const { state, toggleModal, updateModal } = useContext(ModalContext);
	return (
		<ModalContainer isModalOpen={state.isShow} toggle={() => false}>
			<div
				className="inline-flex flex-col text-black w-full my-8 overflow-hidden text-left align-middle transition-all transform bg-white"
				style={{ maxWidth: "1569px" }}
			>
				<button onClick={toggleModal}>
					Butotn
				</button>
			</div>
		</ModalContainer>
	)
}

export default ModalExample;