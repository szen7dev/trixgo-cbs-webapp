import { FC, HTMLAttributes, useState, useContext, useEffect } from 'react';

import { CommentProps } from 'typings/common';
import MediaRepository from "apis/media";

import { Comment, RootComment } from 'views/media/shareComponents/common';
import CommentContext from 'views/media/contexts/comment/comment.context';
import { ContextModalPost } from 'views/media/contexts/post';
import { Comment as CommentType } from 'typings/ppt/comment';

type Props = {
	comments?: CommentProps[],
	mediaID?: string,
	totalRecord?: number,
	limit?: number,
	smallImage?: boolean,
	onClickImage?: (comment: CommentType, index: number) => void,
}

export const RootCommentsList: FC<Props & HTMLAttributes<HTMLUListElement>> = ({
	onClickImage, smallImage, comments, mediaID, totalRecord = 0, limit = 5, ...props
}) => {
	const { state, dispatch } = useContext(CommentContext);
	const { state: statePost } = useContext(ContextModalPost);
	const [amountComment, setAmountComment] = useState<number>(totalRecord - limit);

	useEffect(() => {
		comments && dispatch({ type: 'SET_COMMENTS', payload: comments });
	}, [comments?.length])

	const handleClickViewMore = async () => {
		const { error, data } = await MediaRepository.listComments({
			lastestID: state.comments[0]._id,
			mediaID: mediaID,
		});
		setAmountComment(amountComment - limit);

		if (!error && data.listRecords.length) {
			dispatch({ type: 'VIEW_MORE_COMMENTS', payload: data.listRecords });
		}
	}

	let _comments: CommentProps[] = [];
	if (!statePost.isShow || statePost.isPost) {
		_comments = (state.comments && state.comments.length) ? state.comments : []
	} else if (statePost.isComment) {
		_comments = (state.commentsReply[statePost.mediaID] || []).filter(Boolean);
	}

	return (
		<>
			{amountComment > 0 ? (
				<div className="react__comments-header mt-3">
					<div className='pl-11 mr-5'>
						<button className='text-medium pb-2 mb-1.5 font-bold' onClick={handleClickViewMore}>
							View more {amountComment} comment
						</button>
					</div>
				</div>
			) : ''}
			<ul {...props}>
				{
					_comments.map((comment: CommentProps) => (
						<li key={comment._id} className='mt-2.5'>
							<RootComment
								comment={comment}
								limit={limit}
								smallImage={smallImage}
								renderNestedComment={Comment}
								disableReply={statePost.isShow && statePost.isReply}
							/>
						</li>
					))}
			</ul>
		</>
	)
}