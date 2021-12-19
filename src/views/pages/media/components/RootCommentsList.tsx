import { FC, HTMLAttributes, useState, useContext } from 'react';
import Comment from './Comment';
import RootComment from './RootComment';
import { CommentProps } from 'typings/common';
import SocialRepository from "apis/social";
import CommentContext from '../context/comment/comment.context';

type Props = {
	comments?: CommentProps[],
	mediaID?: string,
	totalRecord?: number,
	limit?: number
	nextCursor?: string
} & HTMLAttributes<HTMLUListElement>

const RootCommentsList: FC<Props> = ({ comments, mediaID, totalRecord = 0, limit = 5, nextCursor = '', ...props }) => {
	const { state } = useContext(CommentContext);
	const [amountComment, setAmountComment] = useState<number>(totalRecord - limit);
	const [commentsNext, setCommentsNext] = useState<CommentProps[] | []>(comments || []);
	// console.log({ comments, mediaID, totalRecord, limit, nextCursor });
	console.log({ state });

	const handleClickViewMore = async () => {
		const { error, data } = await SocialRepository.listComments({ 
			lastestID: nextCursor,
			mediaID: mediaID,
			populates: JSON.stringify({
				value: 'comment userCreate lastestReplyID',
				select: '_id fullname image content files images amountReaction'
			}),
			populates1: JSON.stringify({
				value: 'comment userCreate',
				select: '_id fullname image content files images'
			}),
		});
		setAmountComment(amountComment - limit);

		if(!error && data.listRecords.length){
			setCommentsNext(commentNext => [...data.listRecords, ...commentNext]);
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
				{(commentsNext && commentsNext.length) ? commentsNext.map((comment: CommentProps) => (
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
