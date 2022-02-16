import React, { FC } from 'react';
import ModalFullContainer from 'components/common/modals/ModalFullContainer';
import ViewPost from './ViewPost';
import { PostState } from 'components/common/detail-post/contexts/ContextPost/post.state';
import { ContextPost, ContextPostType } from 'components/common/detail-post/contexts/ContextPost';

interface Props {
	initialData: PostState,
	isShow: boolean,
	toggle: () => void
}

export const usePost = (): ContextPostType => React.useContext(ContextPost);

const CommentModal: FC<Props> = ({ isShow, toggle, ...props }) => {
	return (
		<ModalFullContainer isModalOpen={isShow} toggle={toggle}>
			<div className="flex overflow-hidden transition-all transform w-full h-full">
				<ViewPost toggle={toggle} {...props} />
			</div>
		</ModalFullContainer>
	)
}

export default CommentModal;