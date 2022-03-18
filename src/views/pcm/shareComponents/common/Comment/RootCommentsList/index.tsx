import { FC, HTMLAttributes, useState, useContext, useEffect } from 'react';

import TaskRepository from "apis/task";

import { Comment, RootComment } from '..';
import CommentContext from 'views/pcm/contexts/comment/comment.context';
import { ContextModalPost } from 'views/pcm/contexts/post';
import { Comment as CommentType, CommentProps } from 'typings/task';

type Props = {
	comments?: CommentProps[],
	userID: string | undefined,
	taskID?: string,
	totalRecord?: number,
	limit?: number,
	smallImage?: boolean,
	onClickImage?: (comment: CommentType, index: number) => void,
}

export const RootCommentsList: FC<Props & HTMLAttributes<HTMLUListElement>> = ({
	onClickImage, userID, smallImage, comments, taskID, totalRecord = 0, limit = 5, ...props
}) => {
	const { state, dispatch } = useContext(CommentContext);
	const { state: statePost } = useContext(ContextModalPost);
	const [amountComment, setAmountComment] = useState<number>(0);

	useEffect(() => {
		comments && dispatch({ type: 'SET_COMMENTS', payload: comments.reverse() });
	}, [comments?.length])

	useEffect(() => {
		setAmountComment(totalRecord - limit);
	}, [totalRecord])

	const handleClickViewMore = async () => {
		const { error, data } = await TaskRepository.listComments({
			lastestID: state.comments[0]?._id,
			taskID,
		});
		setAmountComment(amountComment - limit);

		if (!error && data?.listRecords?.length) {
			dispatch({ type: 'VIEW_MORE_COMMENTS', payload: data?.listRecords?.reverse() });
		}
	}

	let _comments: CommentProps[] = [];
	if (!statePost.isShow || statePost.isPost) {
		_comments = (state.comments && state.comments?.length) ? state.comments : []
	} else if (statePost.isComment) {
		_comments = (state.commentsReply[statePost.taskID] || []).filter(Boolean);
	}

	if(!totalRecord && !_comments?.length) return null;

	return (
		<>
			{amountComment > 0 ? (
				<div className="react__comments-header mt-3">
					<div className='pl-11 mr-5'>
						<button className='text-medium pb-2 mb-1.5 font-bold' onClick={handleClickViewMore}>
							Xem thêm {amountComment} bình luận
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
								userID={userID}
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