import React, { FC } from 'react';

/**
 * Components
 */
import { ModalFullContainer } from 'shareComponents/common/ModalFullContainer';
import ViewPost from './ViewPost';

/**
 * Contexts
 */
import { PostState } from 'shareComponents/common/ZoomView/contexts/ContextPost/post.state';
import { ContextPost, ContextPostType } from 'shareComponents/common/ZoomView/contexts/ContextPost';

interface Props {
	initialData: PostState,
	isShow: boolean,
	toggle: () => void
}

export const usePost = (): ContextPostType => React.useContext(ContextPost);

export const ModalZoomView: FC<Props> = ({ isShow, toggle, ...props }) => {
	return (
		<ModalFullContainer isModalOpen={isShow} toggle={toggle}>
			<div className="flex overflow-hidden transition-all transform w-full h-full">
				<ViewPost toggle={toggle} {...props} />
			</div>
		</ModalFullContainer>
	)
}