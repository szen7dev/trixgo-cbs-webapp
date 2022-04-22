import { FC, HTMLAttributes, useContext, useEffect, useState } from 'react';
import { toast } from "react-toastify";
import { captureException } from "@sentry/react";
import cn from "classnames";
import moment from "moment";

import iconLike from "assets/images/emoji/like.png";
// import iconFaceSweet from 'assets/images/icons8-grinning-face-with-sweat-48.png';
import { nl2p } from 'utils';
import { PostFile, ModalReactions } from 'shareComponents/common';
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
	onClickImage?: (comment: CommentProps, images: any, index: number) => unknown;
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
	const [isOpenModalReactions, setIsOpenModalReactions] = useState(false);
	const [isExpiredInteractComment, setIsExpiredInteractComment] = useState(false);
	const [isReaction, setIsReaction] = useState(!!comment.reaction);
	const [amountReaction, setAmountReaction] = useState(comment.amountReaction);
	const { deleteCommentAsync } = useCommentPcm({
		params: { taskID: comment?.task?._id }
	});
	const { dispatch } = useContext(CommentContext);
	const [paramsReactions, setParamReactions] = useState({
		params: { commentID: comment._id },
		isFetchCommentReaction: false,
	});

	const {
		reactionCommentAsync,
		listReactionsComment,
		hasNextPageReactions,
		nextPageListReactions,
		totalRecordReactions
	} = useCommentPcm(paramsReactions)

	useEffect(() => {
		if(comment.createAt) {
			const expireTime = new Date(comment.createAt).addHours(1);
			const now 		 = new Date(Date.now());

			if(expireTime < now){
				setIsExpiredInteractComment(true);
			}
		}
	}, [comment])

	const toggleModalReaction = () => {
		setParamReactions(previousValue => ({
			...previousValue,
			isFetchCommentReaction: true,
		}))
		setIsOpenModalReactions(!isOpenModalReactions)
	}

	const handleDeleteComment = async () => {
		try {
			const { error, message } = await deleteCommentAsync(comment._id);
            if(error) return toast.warning(message);

			dispatch({
				type: "DELETE_COMMENT",
				payload: { _id: comment?._id, parent: comment?.parent }
			});
		} catch (error: unknown) {
			captureException(error);
			if (typeof error === "string") {
                toast.error(error);
            } else if (error instanceof Error) {
                toast.error(error.message);
            }
		}
	}

	const handleReactionComment = async () => {
		try {
			if(isReaction) {
				setAmountReaction(amountReaction - 1);
			} else{
				setAmountReaction(amountReaction + 1);
			}
			setIsReaction(!isReaction);

			await reactionCommentAsync({
				commentID: comment._id,
				typeReaction: 1
			})
		} catch (error) {
			captureException(error);
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
		onClickImage?.(comment, images, index)
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
						<img src={`${process.env.REACT_APP_URL_S3_USER}/${comment.author?.image}`} alt="" className='h-9 w-9 object-cover' />
					</div>
				</div>
				{/* Info and reply */}
				<div className='group w-full'>
					<div className="flex items-center">
						<div className='bg-gray-100 rounded-xl p-2 hover:bg-primary hover:bg-opacity-10 '>
							<p className="font-bold text-medium">{comment.author?.bizfullname}</p>
							<p
								className="mt-0.5 text-[15px] leading-4"
								dangerouslySetInnerHTML={{
									__html: nl2p(comment.content)
								}}>
							</p>
						</div>
						{(Options && !isExpiredInteractComment) && <Options
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
								<li className="inline-block mr-2">
									<button className={cn("font-bold", {
										"text-blue-600": isReaction
									})} onClick={handleReactionComment}>
										{isReaction ? 'Bỏ thích' : 'Thích'}
									</button>
								</li>
								{!disableReply && (
									<li className="inline-block">
										<button className="font-bold" onClick={onClickReply}>Phản hồi</button>
									</li>
								)}
							</ul>
							{amountReaction ? (
								<div>
									<span className='align-middle text-secondary-gray mr-0.5'>{amountReaction}</span>
									<button className='relative z-10 -mr-3' onClick={toggleModalReaction}>
										<img src={iconLike} alt="Emoji" className="inline w-[20px]" />
									</button>
									{/* <span><img src={iconFaceSweet} alt="" className='inline' /></span> */}
								</div>
							) : ''}
						</div>
					}
				</div>
			</div>
			<ModalReactions
				data={listReactionsComment}
				isOpen={isOpenModalReactions}
				setClose={toggleModalReaction}
				fetchNextPage={nextPageListReactions}
				hasNextPage={hasNextPageReactions}
				totalRecords={totalRecordReactions}
			/>
		</>
	)
}