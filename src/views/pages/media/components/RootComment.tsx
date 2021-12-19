import { FC, useState } from 'react';

import Comment from './Comment'
import EditButton from './EditButton';
import ReplyCommentField from './ReplyCommentField';
import { CommentProps } from 'typings/common';
import SocialRepository from "apis/social";

interface Props {
	renderNestedComment?: React.ElementType
	onClickReply?: () => unknown;
	comment: CommentProps,
	limit: number,
}

const RootComment: FC<Props> = ({ comment, limit, renderNestedComment: NestedComment }) => {
	const [isReply, setIsReply] = useState<boolean>(false);
	const [amountReply, setAmountReply] = useState<number>(comment.comment.amountCommentReply - 1);
	const [commentsReply, setCommentsReply] = useState<CommentProps[] | []>([]);

	const handleClickViewMore = async () => {
		const lastestID = (commentsReply.length && commentsReply[0]._id) || comment.lastestReplyID._id;

		const { error, data } = await SocialRepository.listComments({ 
			lastestID,
			mediaID: comment.media,
			parentID: comment._id,
			populates: JSON.stringify({
				value: 'comment userCreate lastestReplyID',
				select: '_id fullname image content files images amountCommentReply amountReaction'
			}),
			populates1: JSON.stringify({
				value: 'comment userCreate',
				select: '_id fullname image content files images'
			}),
		});
		setAmountReply(amountReply - limit);

		if(!error && data.listRecords.length){
			setCommentsReply(commentsReply => [...data.listRecords, ...commentsReply]);
		}
	}

	return (
		<>
			<Comment comment={comment} onClickReply={() => setIsReply(true)} renderOptions={EditButton} />
			<div>
				{amountReply > 0 ? (
					<div className="react__comments-header">
						<div className='pl-11 mr-5'>
							<button className='text-medium pb-2 mb-1.5 font-bold' onClick={() => handleClickViewMore()}>
								View more {amountReply} comment
							</button>
						</div>
					</div>
				) : ''}
				{/* Nested comment */}
				<ul>
					{commentsReply.length ? commentsReply.map(commentReply => (
						<li key={commentReply._id}>
							<div className="pl-11">{NestedComment ? <NestedComment comment={commentReply} onClickReply={() => setIsReply(true)} renderOptions={EditButton} /> : null}</div>
						</li>
					)) : ''}
					{comment.lastestReplyID ? (
						<li>
							<div className="pl-11">{NestedComment ? <NestedComment comment={comment.lastestReplyID} onClickReply={() => setIsReply(true)} renderOptions={EditButton} /> : null}</div>
						</li>
					) : ''}
				</ul>
				{isReply ? <ReplyCommentField className="pl-11" inputContainerClassName="flex w-full p-2" parentID={comment._id} mediaID={comment.media} /> : null}
			</div>
		</>
	)
}

export default RootComment
