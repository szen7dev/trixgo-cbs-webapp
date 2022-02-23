import { FC, useState, useContext, useEffect } from 'react';

import { EditButton, Comment, ReplyCommentField } from 'views/media/shareComponents/common';

import { CommentProps } from 'typings/common';
import { FileProps } from 'typings/social';
import SocialRepository from "apis/social";
import CommentContext from 'views/media/contexts/comment/comment.context';
import { ContextModalPost } from 'views/media/contexts/post';

interface Props {
	renderNestedComment?: React.ElementType
	onClickReply?: () => unknown;
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

export const RootComment: FC<Props> = ({ disableReply, smallImage, comment, limit, renderNestedComment: NestedComment }) => {
	const { state, dispatch } = useContext(CommentContext);
	const { openComment, openReply } = useContext(ContextModalPost);
	const [isReply, setIsReply] = useState<boolean>(false);
	const [isReplyParent, setIsReplyParent] = useState<boolean>(false);
	const [amountReply, setAmountReply] = useState<number>(comment?.comment?.amountCommentReply - 1);

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

		const { error, data } = await SocialRepository.listComments({
			lastestID,
			mediaID: comment.media,
			parentID: comment._id,
		});
		setAmountReply(amountReply - limit);

		if (!error && data.listRecords.length) {
			dispatch({
				type: 'VIEW_MORE_COMMENTS_REPLY',
				payload: {
					parent: comment._id,
					comments: data.listRecords
				}
			});
		}
	}

	// This function callback to parent;
	const handleClickUpdateParent = (infoComment: CommentProps) => {
		setIsReplyParent(!isReplyParent);

		setInfoCommentParent({
			parentID: '',
			commentID: infoComment.comment?._id,
			content: infoComment.comment?.content,
			files: infoComment.comment?.files,
			images: infoComment.comment?.images
		})
	}

	// Onclick update button, this function will set selected comment or selected message depend on you
	// Use context instead this way if you don't want use callback to handle Update message :)
	const handleClickUpdateChild = (infoComment: CommentProps) => {
		setIsReply(!isReply);

		setInfoComment({
			parentID: comment._id,
			commentID: infoComment.comment?._id,
			content: infoComment.comment?.content,
			files: infoComment.comment?.files,
			images: infoComment.comment?.images
		})
	}

	return (
		<>
			<Comment
				small={smallImage}
				comment={comment}
				onClickReply={() => setIsReply(true)}
				onClickEdit={handleClickUpdateParent}
				onClickImage={(index: number, images: any, commentId: string) => openComment({ mediaId: commentId, images, index })}
				renderOptions={EditButton}
			/>
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
								onClickImage={(index: number) => console.log(index)}
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
							mediaID={comment.media}
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
						mediaID={comment.media}
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