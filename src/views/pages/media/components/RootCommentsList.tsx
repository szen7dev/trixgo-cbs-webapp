import { FC, HTMLAttributes } from 'react'
import Comment from './Comment';
import RootComment from './RootComment';
import { CommentProps } from 'typings/common';

type Props = {
	comments?: CommentProps[],
} & HTMLAttributes<HTMLUListElement>

const RootCommentsList: FC<Props> = ({ comments, ...props }) => {
	return (
		<ul {...props}>
			{comments && comments.map((comment: CommentProps) => (
				<li key={comment._id} className='mt-2.5'>
					<RootComment
						comment={comment}
						// renderNestedComment={(props) => <RootComment comment={comment} renderNestedComment={Comment} />}
						renderNestedComment={Comment}
					/>
				</li>
			))}
		</ul>
	)
}

export default RootCommentsList;
