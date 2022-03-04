import { FC, HTMLAttributes, Fragment, useContext } from 'react';

import Comment from './Comment';
import RootComment from './RootComment';

import { usePost } from '..';
import { OptionsSubmitReply, OptionsSubmitReplyNested } from './RootComment';
import { SubmitComment } from './ReplyCommentField';
import AuthContext from 'services/contexts/Auth';
import { InfiniteData } from 'react-query';

type Props = {
	limit?: number,
	smallImage?: boolean,
}

const RootCommentsList: FC<Props & HTMLAttributes<HTMLUListElement>> = ({
	smallImage, limit = 5, ...props
}) => {
	const { data, state, fetchReplyComment, openComment, createComment, updateComment, deleteComment } = usePost();
	const { state: { user } } = useContext(AuthContext);

	const handleSumitReply = async (data: SubmitComment, options: OptionsSubmitReply & { page: number, commentIdx: number }) => {
		if (!options.comment) return;
		const dataInsertOrUpdate = {
			mediaID: state.mediaID,
			fileID: String(state.images[state.index]._id),
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
			mediaID: state.mediaID,
			fileID: String(state.images[state.index]._id),
			content: data.text,
			files: data.files,
			images: data.images,
			parentID: options.parent._id
		}
		if (options.type === 'create') {
			// console.log('create', options)
			await createComment({
				...dataInsertOrUpdate,
				parentID: options.comment.parent
			}, { commentIdx: options.commentIdx, page: options.page });
		} else {
			// console.log('update', options)
			await updateComment({
				...dataInsertOrUpdate,
				parentID: options.comment.parent, commentID: options.comment._id
			}, { commentIdx: options.commentIdx, page: options.page, replyIdx: options.index });
		}
	};

	return (
		<ul {...props}>
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
											author={user?._id}

											onClickViewMore={_comment => fetchReplyComment(_comment.listReply.nextCursor, _comment._id, i, idx)}
											onClickDelete={(_comment, index) => {
												if (!_comment) return;
												deleteComment(_comment._id, { page: i, commentIdx: idx, replyIdx: index })
											}}
											onClickImage={openComment}

											onSubmitReply={(data, options) => handleSumitReply(data, { ...options, page: i, commentIdx: idx })}
											onSubmitReplyNested={(data, options) => handleSumitReplyNested(data, { ...options, page: i, commentIdx: idx })}

											smallImage={smallImage}
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
	)
}

export default RootCommentsList;
