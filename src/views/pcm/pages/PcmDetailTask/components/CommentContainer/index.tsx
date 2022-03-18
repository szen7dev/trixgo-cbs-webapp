import { FC, useState, Fragment, HTMLAttributes } from 'react'

import { useParams } from 'react-router-dom';

import useCustomReducer from "services/hooks/useCustomReducer";
import useComments from "shareComponents/common/ZoomView/hooks/useComments";
import ReplyCommentField, { SubmitComment } from "shareComponents/common/ZoomView/components/ReplyCommentField";
import { postActions, postReducer } from "shareComponents/common/ZoomView/contexts/ContextPost";
import { state as postState } from 'shareComponents/common/ZoomView/contexts/ContextPost/post.state';
import Comment from "shareComponents/common/ZoomView/components/Comment";
import RootComment, { OptionsSubmitReply, OptionsSubmitReplyNested } from "shareComponents/common/ZoomView/components/RootComment";
import { ModalZoomView } from 'shareComponents/common';

export const CommentContainer: FC<HTMLAttributes<HTMLDivElement>> = (props) => {
	const { id } = useParams<{ id: string }>()

	const [isShow, setIsShow] = useState(false);
	const [state, { openComment }] = useCustomReducer(postReducer, postActions, { ...postState });
	const { data, currentComment, fetchPreviousPage, createComment, fetchReplyComment, deleteComment, updateComment } = useComments({ mediaID: id });

	// Submit chat hiện đang hoạt động tại root comment (không truyền parentID)
	const handleSubmitChat = async (props: SubmitComment) => {
		const dataInsertOrUpdate = {
			mediaID: id,
			content: props.text,
			files: props.files,
			images: props.images,
		}

		await createComment(dataInsertOrUpdate);
	}

	const handleSumitReply = async (data: SubmitComment, options: OptionsSubmitReply & { page: number, commentIdx: number }) => {
		if (!options.comment) return;
		const dataInsertOrUpdate = {
			mediaID: id,
			content: data.text,
			files: data.files,
			images: data.images,
		}
		if (options.type === 'create') {
			await createComment({
				...dataInsertOrUpdate,
				parentID: options.comment._id,
			}, { commentIdx: options.commentIdx, page: options.page });
		} else {
			await updateComment({
				...dataInsertOrUpdate,
				commentID: options.comment._id,
				parentID: options.comment.parent,
			}, { commentIdx: options.commentIdx, page: options.page });
		}
	};

	const handleSumitReplyNested = async (data: SubmitComment, options: OptionsSubmitReplyNested & { page: number, commentIdx: number }) => {
		if (!options.parent) return;

		const dataInsertOrUpdate = {
			mediaID: id,
			content: data.text,
			files: data.files,
			images: data.images,
			parentID: options.parent._id
		}
		if (options.type === 'create') {
			await createComment({
				...dataInsertOrUpdate,
				parentID: options.comment.parent
			}, { commentIdx: options.commentIdx, page: options.page });
		} else {
			await updateComment({
				...dataInsertOrUpdate,
				parentID: options.comment.parent, commentID: options.comment._id
			}, { commentIdx: options.commentIdx, page: options.page, replyIdx: options.index });
		}
	};

	return (
		<div {...props}>
			<div className="text-x-large">
				Bình luận
			</div>
			<div className="px-6">
				{/* Comment */}
				<div className="lex-1 pt-4 text-black">
					{/* Showmore Comment */}
					{data?.pages && currentComment && data.pages[0].data.totalRecord > currentComment
						? <button className="react__comments-header ml-4 mr-5 text-[15px] leading-4 pb-2 mb-1.5 font-bold" onClick={() => fetchPreviousPage()}>
							<span>Xem {data.pages[0].data.totalRecord - currentComment} bình luận trước</span>
						</button> : null}
					<ul>
						{
							data?.pages.map((page, i) => (
								<Fragment key={i}>
									{
										page.data.listRecords.map((comment, idx) => {
											if (!comment) return null
											return (
												comment && <li key={comment._id} className='mt-2.5'>
													<RootComment
														page={i}
														commentIdx={idx}
														comment={comment}
														// author={user?._id}

														onClickViewMore={_comment => fetchReplyComment(_comment.listReply.nextCursor, _comment._id, i, idx)}
														onClickDelete={(_comment, index) => {
															if (!_comment) return;
															deleteComment(_comment._id, { page: i, commentIdx: idx, replyIdx: index })
														}}
														onClickImage={(...props) => {
															openComment(...props);
															setIsShow(true);
														}}

														onSubmitReply={(data, options) => handleSumitReply(data, { ...options, page: i, commentIdx: idx })}
														onSubmitReplyNested={(data, options) => handleSumitReplyNested(data, { ...options, page: i, commentIdx: idx })}

														smallImage
														renderNestedComment={Comment}
														disableReply={state.type === 'comment'}
													/>
												</li>
											)
										})
									}
								</Fragment>
							))
						}
					</ul>
				</div>
			</div>
			{/* Footer */}
			<div className='flex flex-col w-full max-h-full overflow-y-auto'>
				{/* File upload */}
				<ReplyCommentField
					fileContainerClassName='border-t'
					inputContainerClassName="flex w-full p-2"
					onSubmitChat={handleSubmitChat}
				/>
			</div>
			<ModalZoomView isShow={isShow} toggle={() => setIsShow(false)} initialData={{
				createAt: state.createAt,
				images: state.images,
				index: state.index,
				mediaID: id,
				author: state.author,
			}} />
		</div>
	)
}