import { FC, HTMLAttributes, useContext } from 'react';
import { toast } from "react-toastify";
import cn from "classnames";
import moment from "moment";

// import iconFaceSweet from 'assets/images/icons8-grinning-face-with-sweat-48.png';
import { PostFile } from 'shareComponents/common';
import CommentContext from 'views/pcm/contexts/comment/comment.context';
import { CommentProps } from 'typings/task';
import { useCommentPcm } from 'services/hooks/useTask';

type OptionsProps = {
	onUpdate?: () => unknown,
	onDelete?: () => unknown,
	hasPermissionUpdate?: boolean,
	hasPermissionDelete?: boolean,
}

interface Props {
	onClickLike?: () => unknown;
	onClickReply?: () => unknown;
	onClickImage?: (index: number, images: any, commentId: string) => unknown;
	onClickEdit?: (comment: CommentProps) => unknown;
	renderOptions?: React.ComponentType<HTMLAttributes<HTMLElement> & OptionsProps>;
	renderEndComment?: React.ComponentType;
	userID: string | undefined,
	comment: CommentProps,
	small?: boolean,
	disableReply?: boolean
}

export const Comment: FC<Props & HTMLAttributes<HTMLDivElement>> = ({
	disableReply, comment, small, userID, onClickReply, onClickEdit, onClickImage, renderEndComment: EndComment, renderOptions: Options, ...props
}) => {
	const { deleteCommentAsync } = useCommentPcm({
		params: { taskID: comment?.task?._id }
	});
	const { dispatch } = useContext(CommentContext);

	const handleDeleteComment = async () => {
		try {
			const { error, message } = await deleteCommentAsync(comment._id);
            if(error) return toast.warning(message);
			
			dispatch({
				type: "DELETE_COMMENT",
				payload: { _id: comment?._id, parent: comment?.parent }
			});
		} catch (error: unknown) {
			if (typeof error === "string") {
                toast.error(error);
            } else if (error instanceof Error) {
                toast.error(error.message);
            }
		}
	}

	const handleEditComment = () => {
		onClickEdit?.(comment)
	}

	const handleClickImage = (index: number) => {
		onClickImage?.(index, images, comment._id)
	}

	const images = comment.images || [];
	const files = comment.files || [];

	const hasPermissionUpdate = userID === comment.author?._id;
	const hasPermissionDelete = userID === comment.author?._id;

	return (
		<>
			<div {...props} className={cn("flex pb-1.5", props.className)}>
				{/* Avatar */}
				<div className="rounded-full overflow-hidden self-start mr-2 min-w-min">
					<div className="h-9 w-9">
						<img src={`${process.env.REACT_APP_URL_S3_USER}/${comment.author?.image}`} alt="" className='h-9 w-9' />
					</div>
				</div>
				{/* Info and reply */}
				<div className='group w-full'>
					<div className="flex items-center">
						<div className='bg-gray-100 rounded-xl p-2 hover:bg-primary hover:bg-opacity-10 '>
							<p className="font-bold text-medium">{comment.author?.fullname}</p>
							<p className="mt-0.5 text-[15px] leading-4">
								{comment.content}
							</p>
						</div>
						{Options && <Options 
							className="opacity-0 group-hover:opacity-100" 
							onUpdate={handleEditComment} 
							onDelete={handleDeleteComment} 
							hasPermissionUpdate={hasPermissionUpdate}
							hasPermissionDelete={hasPermissionDelete}
						/>}
					</div>
					<div>
						<div className="flex flex-wrap gap-x-2">
							{images.length ? images.slice(0, 3).map((image, i) => {
								const id = image.file ? image.file._id : image._id;
								const name = image.file ? image.file.name : image.name;
								const url = image.file ? `${process.env.REACT_APP_URL_S3}${image.file.path}` : `${process.env.REACT_APP_URL_S3}${image.path}`;

								return (
									<div key={id} className="mt-2 cursor-pointer relative" onClick={() => handleClickImage(i)}>
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
									{moment(comment.createAt).format('DD/MM/YYYY HH:mm')}
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