import { FC, HTMLAttributes } from 'react'
import Comment from './Comment';
import RootComment from './RootComment';

const comments = Array.from(Array(4).keys()).map((_, i) => ({
	id: _,
	name: "Phan Kiên Giang-TNC",
	image: 'https://gamek.mediacdn.vn/133514250583805952/2021/9/17/photo-1-1631856680040545802895.jpg'
}))

const RootCommentsList: FC<HTMLAttributes<HTMLUListElement>> = ({...props}) => {
	return (
		<ul {...props}>
			{comments.map(comment => (
				<li key={comment.id} className='mt-2.5'>
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

export default RootCommentsList
