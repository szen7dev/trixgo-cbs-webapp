/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useState } from 'react';

import Comment from './Comment';
import EditButton from './EditButton';
import ReplyCommentField, { SubmitComment } from './ReplyCommentField';

import { FileProps } from 'typings/media';
import { Comment as CommentType, CommentWithReply } from 'typings/ppt/comment';

export interface OptionsSubmitReply {
	comment: CommentType,
	commentID?: string,
	type: string,
}

export interface OptionsSubmitReplyNested {
	parent: CommentType,
	comment: CommentType,
	commentID?: string,
	index?: number,
	type: string,
}

interface Props {
	renderNestedComment?: React.ElementType;
	comment: CommentWithReply,

	onClickViewMore?(comment: CommentWithReply): void,
	onClickDelete?(comment: CommentType, index?: number): void,
	onClickImage?(comment: CommentType, index: number): void,

	onSubmitReplyNested?(data: SubmitComment, options: OptionsSubmitReplyNested): Promise<void>,
	onSubmitReply?(data: SubmitComment, options: OptionsSubmitReply): Promise<void>,

	author?: string,
	amountViewMore?: number,
	smallImage?: boolean
	disableReply?: boolean,
	page: number,
	commentIdx: number,
}

const rootState = {
	files: [] as FileProps[],
	images: [] as FileProps[],
	content: '',
	commentID: undefined as string | undefined, // Current comment editing
	show: false,
	index: undefined as number | undefined,
	type: 'create' as 'create' | 'update',
}

type CommentUpdateProps = typeof rootState;

const RootComment: FC<Props> = ({
	onClickDelete,
	onClickViewMore,
	onClickImage,
	onSubmitReplyNested,
	onSubmitReply,

	amountViewMore = 0,
	disableReply,
	smallImage,
	comment,
	author,
	page,
	commentIdx,
	renderNestedComment: NestedComment
}) => {
	const [replyCommentNested, setReplyCommentNested] = useState<CommentUpdateProps>(rootState);
	const [replyComment, setReplyComment] = useState<CommentUpdateProps>(rootState);

	const handleClickViewMore = () => onClickViewMore?.(comment);
	const handleClickImage = (comment: CommentType, index: number) => onClickImage?.(comment, index);
	const handleClickDelete = (comment: CommentType, index?: number) => onClickDelete?.(comment, index);

	// This function callback to parent;
	const onClickUpdateComment = (replyComment: CommentType, index: number | undefined = undefined) => setReplyComment({
		commentID: replyComment._id, // Current comment editing
		content: replyComment.content,
		files: replyComment?.files || [],
		images: replyComment?.images || [],
		type: 'update',
		index,
		show: true,
	})

	// Onclick update button, this function will set selected comment or selected message depend on you
	// Use context instead this way if you don't want use callback to handle Update message :)
	const onClickUpdateReliedComment = (replyComment: CommentType, index = 0) => setReplyCommentNested({
		commentID: replyComment._id, // Current comment editing
		content: replyComment.content,
		files: replyComment.files || [],
		images: replyComment.images || [],
		type: 'update',
		index,
		show: true,
	})

	// Click to reply comment
	const handleClickReplyComment = (comment: CommentType) => {
		setReplyComment({
			...rootState,
			type: 'create',
			show: true
		})
	}

	const handleClickReplyRepliedComment = (comment: CommentType, index?: number) => setReplyCommentNested({
		...rootState,
		type: 'create',
		index,
		show: true
	})

	// Handle on Submit
	const handleSubmitComment = async (props: SubmitComment) => {
		onSubmitReply && await onSubmitReply(props, { comment, commentID: replyComment.commentID, type: replyComment.type });
		setReplyComment(rootState)
	}

	const handleSubmitNestedComment = async (props: SubmitComment) => {
		// console.log(replyCommentNested.index)
		typeof replyCommentNested.index === 'number' && onSubmitReplyNested && await onSubmitReplyNested(props, {
			parent: comment,
			comment: comment.listReply.data[replyCommentNested.index],
			commentID: replyCommentNested.commentID,
			index: replyCommentNested.index,
			type: replyCommentNested.type,
		});

		setReplyCommentNested(rootState)
	}

	return (
		<>
			<Comment
				showOptions={author === comment.author._id}
				small={smallImage}
				comment={comment}
				// Reply comment
				onClickReply={handleClickReplyComment}
				// Edit comment
				onClickEdit={onClickUpdateComment}
				// Delete comment
				onClickDelete={handleClickDelete}
				onClickImage={handleClickImage}
				renderOptions={EditButton}
			/>
			<div>
				{((comment.amountCommentReply || 0) - comment.listReply.data.length) > 0 ? (
					<div className="react__comments-header">
						<div className='pl-11 mr-5'>
							<button className='text-medium pb-2 mb-1.5 font-bold' onClick={handleClickViewMore}>
								Xem thêm {(comment.amountCommentReply || 0) - comment.listReply.data.length} bình luận
							</button>
						</div>
					</div>
				) : ''}
				{/* Nested comment */}
				<ul>
					{comment.listReply && comment.listReply.data.length ? comment.listReply.data.map((commentReply, index) => (
						<li key={commentReply._id}>
							<div className="pl-11">{NestedComment ? <NestedComment
								showOptions={author === commentReply.author._id}
								small={smallImage}
								comment={commentReply}
								// Reply replied comment
								onClickReply={(comment: CommentType) => handleClickReplyRepliedComment(comment, index)}
								// onClickReply={() => console.log('clicked')}
								onClickDelete={(comment: CommentType) => handleClickDelete(comment, index)}
								onClickImage={handleClickImage}
								// Edit replied comment
								onClickEdit={(comment: CommentType) => onClickUpdateReliedComment(comment, index)}
								renderOptions={EditButton}
								disableReply={disableReply}
							/> : null}

							</div>
						</li>
					)) : ''}
				</ul>
				{replyCommentNested.show
					? (
						// Edit-Reply replied comment
						<ReplyCommentField
							className="pl-11"
							inputContainerClassName="flex w-full p-2"

							content={replyCommentNested.content}
							files={replyCommentNested.files}
							images={replyCommentNested.images}

							onSubmitChat={handleSubmitNestedComment}
						/>
					)
					: null}
			</div>
			{replyComment.show
				? (
					// Edit-Reply comment
					<ReplyCommentField
						inputContainerClassName="flex w-full p-2"

						content={replyComment.content} // set reply or comment
						files={replyComment.files}
						images={replyComment.images}

						onSubmitChat={handleSubmitComment}
					/>
				)
				: null}
		</>
	)
}

export default RootComment
