import { FC, useState, useContext, useEffect } from 'react';

import { Comment, ReplyCommentField } from '..';
import { EditButton } from 'shareComponents/common';
import { FileProps } from 'typings/common';
import TaskRepository from "apis/task";
import CommentContext from 'views/pcm/contexts/comment/comment.context';
import { ContextModalPost } from 'views/pcm/contexts/post';
import { Comment as CommentType, CommentProps } from 'typings/task';

interface Props {
	renderNestedComment?: React.ElementType
	onClickReply?: () => unknown,
	onClickImage?: (comment: CommentType, index: number) => void,
	userID: string | undefined,
	comment: CommentProps,
	limit: number,
	smallImage?: boolean
	disableReply?: boolean
}

type UpdateCommentProps = {
	commentID: string,
	content: string,
	parentID: string,
	files: FileProps[] | undefined,
	images: FileProps[] | undefined,
}

export const RootComment: FC<Props> = ({ disableReply, smallImage, userID, comment, limit, renderNestedComment: NestedComment }) => {
	const { state, dispatch } = useContext(CommentContext);
	const { openComment } = useContext(ContextModalPost);
	const [isReply, setIsReply] = useState<boolean>(false);
	const [isReplyParent, setIsReplyParent] = useState<boolean>(false);
	const [amountReply, setAmountReply] = useState<number>(comment?.amountCommentReply > 0 ? comment?.amountCommentReply - 1 : 0);

	const [infoCommentParent, setInfoCommentParent] = useState<UpdateCommentProps>({
		files: [], images: [], commentID: '', content: '', parentID: ''
	});
	const [infoComment, setInfoComment] = useState<UpdateCommentProps>({
		files: [], images: [], commentID: '', content: '', parentID: ''
	});

	const commentsReply = (state.commentsReply[comment._id] || []).filter(Boolean);

	useEffect(() => {
		// Add last reply comment in first time render page
		if (commentsReply.length === 0 && comment.lastestReplyID) {
			dispatch({
				type: 'ADD_COMMENT',
				payload: comment.lastestReplyID
			});
		}
	}, [])

	const handleClickViewMore = async () => {
		const lastestID = commentsReply.length ? commentsReply[0]._id : null;

		const { error, data } = await TaskRepository.listComments({
			lastestID,
			taskID: comment.task?._id,
			parentID: comment._id,
		});
		setAmountReply(amountReply - limit);

		if (!error && data?.listRecords?.length) {
			dispatch({
				type: 'VIEW_MORE_COMMENTS_REPLY',
				payload: {
					parent: comment._id,
					comments: data?.listRecords?.reverse()
				}
			});
		}
	}

	// This function callback to parent;
	const handleClickUpdateParent = (infoComment: CommentProps) => {
		setIsReplyParent(!isReplyParent);
		setInfoCommentParent({
			parentID: '',
			commentID: infoComment._id,
			content: infoComment.content,
			files: infoComment.files,
			images: infoComment.images
		})
	}

	// Onclick update button, this function will set selected comment or selected message depend on you
	// Use context instead this way if you don't want use callback to handle Update message :)
	const handleClickUpdateChild = (infoComment: CommentProps) => {
		setIsReply(!isReply);
		setInfoComment({
			parentID: comment._id,
			commentID: infoComment._id,
			content: infoComment.content,
			files: infoComment.files,
			images: infoComment.images
		})
	}

	return (
		<>
			<Comment
				small={smallImage}
				comment={comment}
				userID={userID}
				onClickReply={() => setIsReply(true)}
				onClickEdit={handleClickUpdateParent}
				onClickImage={(index: number, images: any, commentId: string) => {
					console.log({ index, images, commentId })
					// openComment({ taskId: commentId, images, index, author: comment.author, createAt: comment.createAt })
				}}
				renderOptions={EditButton}
			/>
			<div>
				{amountReply > 0 ? (
					<div className="react__comments-header">
						<div className='pl-11 mr-5'>
							<button className='text-medium pb-2 mb-1.5 font-bold' onClick={handleClickViewMore}>
								Xem thêm {amountReply} bình luận
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
								onClickImage={(index: number, images: any, commentId: string) => openComment({ taskId: commentId, images, index, author: commentReply.author, createAt: commentReply.createAt })}
								// Callback onClickupdate
								onClickEdit={handleClickUpdateChild}
								renderOptions={EditButton}
								disableReply={disableReply}
							/> : null}

							</div>
						</li>
					)) : ''}
				</ul>
				{isReply
					? (
						<ReplyCommentField
							className="pl-11"
							inputContainerClassName="flex w-full p-2"
							defaultValue={infoComment.content}
							files={infoComment.files}
							images={infoComment.images}
							commentID={infoComment.commentID}
							parentID={infoComment.parentID || comment._id}
							taskID={comment.task._id}
							onSubmit={() => {
								setIsReply(false);
								setInfoComment({
									parentID: '',
									commentID: '',
									content: '',
									files: [],
									images: []
								})
							}}
						/>
					)
					: null}
			</div>
			{isReplyParent
				? (
					<ReplyCommentField
						inputContainerClassName="flex w-full p-2"
						defaultValue={infoCommentParent.content}
						files={infoCommentParent.files}
						images={infoCommentParent.images}
						commentID={infoCommentParent.commentID}
						parentID={infoCommentParent.parentID}
						taskID={comment.task._id}
						onSubmit={() => {
							setIsReplyParent(false);
							setInfoCommentParent({
								parentID: '',
								commentID: '',
								content: '',
								files: [],
								images: []
							})
						}}
					/>
				)
				: null}
		</>
	)
}