/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, HTMLAttributes } from 'react';

import cn from "classnames";
import moment from "moment";

import { PostFile } from 'views/media/shareComponents/common';
import { Comment as CommentType } from 'typings/ppt/comment';

type OptionsProps = {
	onUpdate?: () => unknown,
	onDelete?: () => unknown,
}

interface Props {
	onClickLike?: () => unknown;
	onClickReply?: (comment: CommentType) => unknown;
	onClickImage?: (comment: CommentType, index: number) => unknown;
	onClickEdit?: (comment: CommentType) => unknown;
	onClickDelete?: (comment: CommentType) => unknown;
	renderOptions?: React.ComponentType<HTMLAttributes<HTMLElement> & OptionsProps>;
	renderEndComment?: React.ComponentType;
	comment: CommentType,
	small?: boolean,
	disableReply?: boolean,
	showOptions?: boolean,
}

const Comment: FC<Props & HTMLAttributes<HTMLDivElement>> = ({
	disableReply,
	comment,
	small,
	onClickReply,
	onClickDelete,
	onClickEdit,
	onClickImage,
	renderEndComment: EndComment,
	renderOptions: Options,
	showOptions,
	...props
}) => {
	const handleDeleteComment = () => {
		onClickDelete?.(comment);
	}

	const handleEditComment = () => {
		onClickEdit?.(comment)
	}

	const handleClickImage = (index: number) => {
		onClickImage?.(comment, index)
	}

	const images = comment.comment?.images || [];
	const files = comment.comment?.files || [];

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
						{showOptions && Options && <Options className="opacity-0 group-hover:opacity-100" onUpdate={handleEditComment} onDelete={handleDeleteComment} />}
					</div>
					<div>
						<div className="flex flex-wrap gap-x-2">
							{images.slice(0, 3).map((image, i) => {
								const id = image.file ? image.file._id : image._id;
								const name = image.file ? image.file.name : image.name;
								const url = image.file ? `${process.env.REACT_APP_URL_S3}/${image.file.path}` : `${process.env.REACT_APP_URL_S3}/${image.path}`;

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
							})
							}
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
								{!disableReply && <li className="inline-block"><button className="font-bold" onClick={() => onClickReply?.(comment)}>Phản hồi</button></li>}
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
