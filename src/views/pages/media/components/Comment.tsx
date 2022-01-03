import { FC, HTMLAttributes, useContext } from 'react';

import cn from "classnames";
import moment from "moment";

// import iconFaceSweet from 'assets/images/icons8-grinning-face-with-sweat-48.png';
import PostFile from './post/PostFile';
import { CommentProps } from 'typings/common';
import CommentContext from '../context/comment/comment.context';
import { useCommentSocial } from 'services/hooks/useSocial';
// import { FileProps } from 'typings/social';
// import generateImageLink from '../utils/images';

type OptionsProps = {
	onUpdate?: () => unknown,
	onDelete?: () => unknown,
}

interface Props {
	onClickLike?: () => unknown;
	onClickReply?: () => unknown;
	onClickImage?: (index: number, images: any, commentId: string) => unknown;
	onClickEdit?: (comment: CommentProps) => unknown;
	renderOptions?: React.ComponentType<HTMLAttributes<HTMLElement> & OptionsProps>;
	renderEndComment?: React.ComponentType;
	comment: CommentProps,
	small?: boolean,
	disableReply?: boolean
}

const Comment: FC<Props & HTMLAttributes<HTMLDivElement>> = ({
	disableReply, comment, small, onClickReply, onClickEdit, onClickImage, renderEndComment: EndComment, renderOptions: Options, ...props
}) => {
	const { deleteComment } = useCommentSocial();
	const { dispatch } = useContext(CommentContext);

	const handleDeleteComment = () => {
		deleteComment(comment._id);
		dispatch({
			type: "DELETE_COMMENT",
			payload: { _id: comment._id, parent: comment?.parent }
		});
	}

	const handleEditComment = () => {
		onClickEdit?.(comment)
	}

	const handleClickImage = (index: number) => {
		console.log(comment)
		onClickImage?.(index, images, comment._id)
	}

	const images = comment?.comment?.images || [];
	const files = comment?.comment?.files || [];

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
								{comment.comment?.content}
							</p>
						</div>
						{Options && <Options className="opacity-0 group-hover:opacity-100" onUpdate={handleEditComment} onDelete={handleDeleteComment} />}
					</div>
					<div>
						<div className="flex flex-wrap gap-x-2">
							{images.length ? images.slice(0, 3).map((image, i) => {
								const id = image.file ? image.file._id : image._id;
								const name = image.file ? image.file.name : image.name;
								const url = image.file ? image.file.url : image.url;

								return (
									<div key={id} className="mt-2 cursor-pointer relative" onClick={() => handleClickImage(i)} >
										<img src={url} alt={name} className={cn("object-cover", small ? "w-24 h-24" : "w-[156px] h-[156px]")} />
										{i === 2 && images.length > 3 && (
											<div className="absolute inset-0 flex items-center justify-center text-white bg-black bg-opacity-60 text-3xl leading-9">
												+{images.length - 2}
											</div>
										)}
									</div>
								)
							}) : ''}
						</div>
						<div >
							<PostFile files={files} className='px-0' />
						</div>
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
								{!disableReply && <li className="inline-block"><button className="font-bold" onClick={onClickReply}>Phản hồi</button></li>}
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
		</>
	)
}

export default Comment
