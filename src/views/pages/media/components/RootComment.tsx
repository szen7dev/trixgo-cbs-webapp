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
	onClickEdit?: (comment: CommentProps) => unknown;
	comment: CommentProps,
	limit: number,
	smallImage?: boolean
}

const RootComment: FC<Props> = ({ onClickEdit, smallImage, comment, limit, renderNestedComment: NestedComment }) => {
	const { state, dispatch } = useContext(CommentContext);
	const [isReply, setIsReply] = useState<boolean>(false);
	const [message, setMessage] = useState<string>('');
	const [amountReply, setAmountReply] = useState<number>(comment.comment.amountCommentReply - 1);
	const commentsReply = [comment.lastestReplyID, ...(state.commentsReply[comment._id] || [])].filter(Boolean);

	const handleClickViewMore = async () => {
		const lastestID = commentsReply.length ? commentsReply[0]._id : null;

		const { error, data } = await SocialRepository.listComments({
			lastestID,
			mediaID: comment.media,
			parentID: comment._id,
			populates: JSON.stringify({
				value: 'comment userCreate lastestReplyID',
				select: '_id fullname image content files images amountCommentReply amountReaction createAt'
			}),
			populates1: JSON.stringify({
				value: 'files images',
				select: '_id name url size type'
			}),
		});
		setAmountReply(amountReply - limit);

		if (!error && data.listRecords.length) {
			dispatch({ type: 'VIEW_MORE_COMMENTS_REPLY', payload: data.listRecords });
		}
	}

	// This function callback to parent;
	const handleClickUpdateParent = (comment: any) => {
		onClickEdit?.(comment)
	}

	// Onclick update button, this function will set selected comment or selected message depend on you
	// Use context instead this way if you don't want use callback to handle Update message :)
	const handleClickUpdateChild = (comment: any) => {
		if (!isReply) setIsReply(true);
		setMessage(comment.comment.content)
	}

	return (
		<>
			<Comment small={smallImage} comment={comment} onClickReply={() => setIsReply(true)} onClickEdit={handleClickUpdateParent} renderOptions={EditButton} />
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
					{commentsReply.length ? commentsReply.map(commentReply => (
						<li key={commentReply._id}>
							<div className="pl-11">{NestedComment ? <NestedComment
								small={smallImage}
								comment={commentReply}
								onClickReply={() => setIsReply(true)}
								// Callback onClickupdate
								onClickEdit={handleClickUpdateChild}
								renderOptions={EditButton} /> : null}
							</div>
						</li>
					)) : ''}
				</ul>
				{isReply ? <ReplyCommentField defaultValue={message} className="pl-11" inputContainerClassName="flex w-full p-2" parentID={comment._id} mediaID={comment.media} /> : null}
			</div>
		</>
	)
}

export default RootComment
