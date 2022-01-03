import React, { FC, useContext } from 'react'
import { CommentProps } from 'typings/common'
import { ContextModalPost } from '../../context/post'
import ModalFullContainer from '../ModalFullContainer'
import ViewPost from './ViewPost'

interface Props {
	listComments: CommentProps[];
	mediaID: string
}

const ModalViewPost: FC<Props> = ({ listComments, mediaID }) => {
	const { state, closeModal } = useContext(ContextModalPost)
	return (
		<ModalFullContainer isModalOpen={state.isShow} toggle={closeModal}>
			<div className="flex overflow-hidden transition-all transform w-full h-full">
				<ViewPost show={state.isShow} toggle={closeModal} images={state.images} index={state.index} mediaID={mediaID} />
			</div>
		</ModalFullContainer>
	)
}

export default ModalViewPost
