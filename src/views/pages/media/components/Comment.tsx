import { FC, HTMLAttributes, useContext } from 'react'

import cn from "classnames";
import moment from "moment";

// import iconFaceSweet from 'assets/images/icons8-grinning-face-with-sweat-48.png';
import PostImage from './post/PostImage';
import PostFile from './post/PostFile';
import { CommentProps } from 'typings/common';
import CommentContext from '../context/comment/comment.context';
import { useCommentSocial } from 'services/hooks/useSocial';

type OptionsProps = {
	onUpdate?: () => unknown,
	onDelete?: () => unknown,
}

interface Props {
	onClickLike?: () => unknown;
	onClickReply?: () => unknown;
	renderOptions?: React.ComponentType<HTMLAttributes<HTMLElement> & OptionsProps>;
	renderEndComment?: React.ComponentType;
	comment: CommentProps
}

const Comment: FC<Props & HTMLAttributes<HTMLDivElement>> = ({ 
	comment, onClickReply, renderEndComment: EndComment, renderOptions: Options, ...props
}) => {
	const { deleteComment } = useCommentSocial();
	const { dispatch } = useContext(CommentContext);
	console.log({ comment });

	const handleDeleteComment = () => {
		deleteComment(comment._id);
		dispatch({
			type: "DELETE_COMMENT",
			payload: { _id: comment._id, parent: comment.parent }
		});
	}

	return (
		<>
			<div {...props} className={cn("flex pb-1.5", props.className)}>
				{/* Avatar */}
				<div className="rounded-full overflow-hidden self-start mr-2 min-w-min">
					<div className="h-9 w-9">
						<img src={`${process.env.REACT_APP_URL_S3_USER}/${comment.userCreate?.image}`} alt="" className='h-9 w-9' />
					</div>
				</div>
				{/* Info and reply */}
				<div className='group w-full'>
					<div className="flex items-center">
						<div className='bg-gray-100 rounded-xl p-2 hover:bg-primary hover:bg-opacity-10 '>
							<p className="font-bold text-medium">{comment.userCreate?.fullname}</p>
							<p className="mt-0.5 text-[15px] leading-4">
								{comment.comment.content}
							</p>
						</div>
						{Options && <Options className="opacity-0 group-hover:opacity-100" onDelete={handleDeleteComment} />}
					</div>
					<div>

					</div>
					{EndComment
						? <EndComment />
						:
						<div className="flex justify-between mt-1">
							<ul className="inline-block">
								<li className="inline-block mr-2">
									<a href="/">{moment(comment.createAt).format('DD/MM/YYYY HH:mm')}</a>
								</li>
								{/* <li className="inline-block mr-2"><button className="font-bold">Thích</button></li> */}
								<li className="inline-block"><button className="font-bold" onClick={onClickReply}>Phản hồi</button></li>
							</ul>
							{/* <div>
								<span className='align-middle text-secondary-gray mr-0.5'>215</span>
								<span className='relative z-10 -mr-3'><img src={iconFaceSweet} alt="" className='inline' /></span>
								<span><img src={iconFaceSweet} alt="" className='inline' /></span>
							</div> */}
						</div>
					}
				</div>
			</div>
			<div
				className='group w-full'
				// className={
				// 	cn("flex flex-wrap custom-scroll overflow-x-hidden overflow-y-auto pl-3.5 post__files pt-2 pb-6")
				// }
			>
				<PostImage
					images={comment.comment.images}
					isRemove={false}
					className="post__files-row pt-5 text-black gap-5 flex-wrap"
				/>
				<PostFile
					files={comment.comment.files}
					isRemove={false}
					className="text-black w-full mr-4"
				/>
			</div>
		</>
	)
}

export default Comment
