import { FC, HTMLAttributes, useState, useContext, useEffect } from 'react';
import Comment from './Comment';
import RootComment from './RootComment';
import { CommentProps } from 'typings/common';
import SocialRepository from "apis/social";
import CommentContext from '../context/comment/comment.context';

type Props = {
	comments?: CommentProps[],
	mediaID?: string,
	totalRecord?: number,
	limit?: number,
} & HTMLAttributes<HTMLUListElement>

const RootCommentsList: FC<Props> = ({ comments, mediaID, totalRecord = 0, limit = 5, ...props }) => {
	const { state, dispatch } = useContext(CommentContext);
	const [amountComment, setAmountComment] = useState<number>(totalRecord - limit);
	
	useEffect(() => {
		comments && dispatch({ type: 'SET_COMMENTS', payload: comments });
	}, [comments?.length])

	const handleClickViewMore = async () => {
		const { error, data } = await SocialRepository.listComments({ 
			lastestID: state.comments[0]._id,
			mediaID: mediaID,
			populates: JSON.stringify({
				value: 'comment userCreate lastestReplyID',
				select: '_id fullname image content files images amountCommentReply amountReaction createAt'
			}),
			populates1: JSON.stringify({
				value: 'files images',
				select: '_id name url size type'
			}),
		});
		setAmountComment(amountComment - limit);

		if(!error && data.listRecords.length){
			dispatch({ type: 'VIEW_MORE_COMMENTS', payload: data.listRecords });
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
							// renderNestedComment={(props) => <RootComment comment={comment} renderNestedComment={Comment} />}
							renderNestedComment={Comment}
						/>
					</li>
				)) : ''}
			</ul>
		</>
	)
}

export default RootCommentsList;
