import { FC, useState, useContext } from 'react';

import Comment from './Comment'
import EditButton from './EditButton';
import ReplyCommentField from './ReplyCommentField';
import { CommentProps } from 'typings/common';
import SocialRepository from "apis/social";
import CommentContext from '../context/comment/comment.context';

interface Props {
	renderNestedComment?: React.ElementType
	onClickReply?: () => unknown;
	comment: CommentProps,
	limit: number,
}

const RootComment: FC<Props> = ({ comment, limit, renderNestedComment: NestedComment }) => {
	const { state, dispatch } = useContext(CommentContext);
	const [isReply, setIsReply] = useState<boolean>(false);
	const [amountReply, setAmountReply] = useState<number>(comment.comment.amountCommentReply - 1);
	const commentsReply = state.commentsReply[comment._id] || [];

	const handleClickViewMore = async () => {
		const lastestID = commentsReply.length ? state.commentsReply[comment._id][0]._id : null;

		const { error, data } = await SocialRepository.listComments({ 
			lastestID,
			mediaID: comment.media,
			parentID: comment._id,
			populates: JSON.stringify({
				value: 'comment userCreate lastestReplyID',
				select: '_id fullname image content files images amountCommentReply amountReaction createAt'
			}),
			populates1: JSON.stringify({
				value: 'comment userCreate',
				select: '_id fullname image content files images amountCommentReply amountReaction'
			}),
		});
		setAmountReply(amountReply - limit);

		if(!error && data.listRecords.length){
			dispatch({ type: 'VIEW_MORE_COMMENTS_REPLY', payload: data.listRecords });
		}
	}

	return (
		<>
			<Comment comment={comment} onClickReply={() => setIsReply(true)} renderOptions={EditButton} />
			<div>
				{amountReply > 0 ? (
					<div className="react__comments-header">
						<div className='pl-11 mr-5'>
							<button className='text-medium pb-2 mb-1.5 font-bold' onClick={handleClickViewMore}>
								View more {amountReply} comment
							</button>
						</div>
					</div>
				) : ''}
				{/* Nested comment */}
				<ul>
					{(comment.lastestReplyID && !commentsReply.length) ? (
						<li>
							<div className="pl-11">{NestedComment ? <NestedComment comment={comment.lastestReplyID} onClickReply={() => setIsReply(true)} renderOptions={EditButton} /> : null}</div>
						</li>
					) : ''}
					{commentsReply.length ? commentsReply.map(commentReply => (
						<li key={commentReply._id}>
							<div className="pl-11">{NestedComment ? <NestedComment comment={commentReply} onClickReply={() => setIsReply(true)} renderOptions={EditButton} /> : null}</div>
						</li>
					)) : ''}
				</ul>
				{isReply ? <ReplyCommentField className="pl-11" inputContainerClassName="flex w-full p-2" parentID={comment._id} mediaID={comment.media} /> : null}
			</div>
		</>
	)
}

export default RootComment
