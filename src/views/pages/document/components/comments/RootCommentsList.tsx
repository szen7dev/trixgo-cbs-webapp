import { FC, HTMLAttributes, useState, useContext, useEffect } from 'react';

import Comment from './Comment';
import RootComment from './RootComment';

import { CommentProps } from 'typings/common';
import SocialRepository from "apis/social";
import { objPopulate } from 'views/pages/media/utils';

import { CommentContext } from '../../contexts/comment';
// import CommentContext from 'views/pages/media/context/comment/comment.context';

type Props = {
	comments?: CommentProps[],
	mediaID?: string,
	totalRecord?: number,
	limit?: number,
	smallImage?: boolean,
}

const RootCommentsList: FC<Props & HTMLAttributes<HTMLUListElement>> = ({
	smallImage, comments, mediaID, totalRecord = 0, limit = 5, ...props
}) => {
	const { state, setComment, viewMoreComments } = useContext(CommentContext);
	const [amountComment, setAmountComment] = useState<number>(totalRecord - limit);

	useEffect(() => {
		comments && setComment(comments);
	}, [comments?.length])

	const handleClickViewMore = async () => {
		const { error, data } = await SocialRepository.listComments({
			lastestID: state.comments[0]._id,
			mediaID: mediaID,
			...objPopulate
		});
		setAmountComment(amountComment - limit);

		if (!error && data.listRecords.length) {
			// viewMoreComments(data.listRecords)
		}
	}

	return (
		<>
			{amountComment > 0 ? (
				<div className="react__comments-header mt-3">
					<div className='pl-11 mr-5'>
						<button className='text-medium pb-2 mb-1.5 font-bold' onClick={handleClickViewMore}>
							View more {amountComment} comment
						</button>
					</div>
				</div>
			) : ''}
			<ul {...props}>
				{(state.comments && state.comments.length) ? state.comments.map((comment: CommentProps) => (
					<li key={comment._id} className='mt-2.5'>
						<RootComment
							comment={comment}
							limit={limit}
							smallImage={smallImage}
							renderNestedComment={Comment}
						/>
					</li>
				)) : ''}
			</ul>
		</>
	)
}

export default RootCommentsList;
