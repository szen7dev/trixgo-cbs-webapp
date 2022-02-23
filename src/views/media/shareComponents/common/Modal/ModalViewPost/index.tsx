import { FC, useContext } from 'react';
import { CommentProps } from 'typings/common';
import { ContextModalPost } from 'views/media/contexts/post';
import { ModalFullContainer } from 'shareComponents/common';
// import ViewPost from './components/ViewPost';

interface Props {
	listComments: CommentProps[];
	mediaID: string
}

export const ModalViewPost: FC<Props> = ({ listComments, mediaID }) => {
	const { state, closeModal } = useContext(ContextModalPost)
	return (
		<ModalFullContainer isModalOpen={state.isShow} toggle={closeModal}>
			<div className="flex overflow-hidden transition-all transform w-full h-full">
				{/* <ViewPost show={state.isShow} toggle={closeModal} images={state.images} index={state.index} mediaID={mediaID} /> */}
			</div>
		</ModalFullContainer>
	)
}