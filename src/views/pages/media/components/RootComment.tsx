import { FC, useState } from 'react';

import Comment from './Comment'
import EditButton from './EditButton';
import ReplyCommentField from './ReplyCommentField';
import { CommentProps } from 'typings/common';

interface Props {
	renderNestedComment?: React.ElementType
	onClickReply?: () => unknown;
	comment: CommentProps
}

const RootComment: FC<Props> = ({ comment, renderNestedComment: NestedComment }) => {
	const [isReply, setIsReply] = useState<boolean>(false);
	console.log({ comment })

	return (
		<>
			<Comment comment={comment} onClickReply={() => setIsReply(true)} renderOptions={EditButton} />
			<div>
				{/* <div className="react__comments-header">
					<div className='pl-11 mr-5'>
						<button className=' text-medium pb-2 mb-1.5 font-bold'>View more 6 comment</button>
					</div>
				</div> */}
				{/* Nested comment */}
				<ul>
					{comment.lastestReplyID ? (
						<li><div className="pl-11">{NestedComment ? <NestedComment comment={comment.lastestReplyID} onClickReply={() => setIsReply(true)} renderOptions={EditButton} /> : null}</div></li>
					) : ''}
				</ul>
				{isReply ? <ReplyCommentField className="pl-11" inputContainerClassName="flex w-full p-2" parentID={comment._id} mediaID={comment.media} /> : null}
			</div>
		</>
	)
}

export default RootComment
