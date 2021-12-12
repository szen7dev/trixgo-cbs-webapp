import { FC, useState } from 'react';

import Comment from './Comment'
import EditButton from './EditButton';
import ReplyCommentField from './ReplyCommentField';

interface Props {
	renderNestedComment?: React.ElementType
	onClickReply?: () => unknown;
	comment: {
		id: string | number
		name: string
		image: string
	}
}

const RootComment: FC<Props> = ({ comment, renderNestedComment: NestedComment }) => {
	const [isReply, setIsReply] = useState<boolean>(false);
	return (
		<>
			<Comment comment={comment} onClickReply={() => setIsReply(true)} renderOptions={EditButton} />
			<div>
				<div className="react__comments-header">
					<div className='pl-11 mr-5'>
						<button className=' text-medium pb-2 mb-1.5 font-bold'>View more 6 comment</button>
					</div>
				</div>
				{/* Nested comment */}
				<ul>
					<li><div className="pl-11">{NestedComment ? <NestedComment comment={comment} onClickReply={() => setIsReply(true)} renderOptions={EditButton} /> : null}</div></li>
				</ul>
				{isReply ? <ReplyCommentField className="pl-11" inputContainerClassName="flex w-full p-2" /> : null}
			</div>
		</>
	)
}

export default RootComment
