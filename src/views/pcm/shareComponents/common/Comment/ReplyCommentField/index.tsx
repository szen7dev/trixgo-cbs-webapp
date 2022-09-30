import React, { FC, ClipboardEvent, useEffect, useRef, useState, useContext } from 'react';

import Axios from 'axios';
import classNames from 'classnames';
import { toArray } from 'lodash';
import { toast } from "react-toastify";
import { captureException } from "@sentry/react";

// import iconFace from 'assets/images/icons8-grinning-face-64.png';
// import iconAttach from 'assets/images/icons8-attach-50.png';
// import iconEmailSend from 'assets/images/icon-email-send.png';
// import { nl2p } from 'utils';
import { PostImage, PostFile } from 'shareComponents/common';
import { APP_KEY } from 'utils/constants';
import { validateFiles } from 'validation/file';

import CommentContext from 'views/pcm/contexts/comment/comment.context';
import { FileProps, FilePropsUpload } from 'typings/common';
import { CommentPayload } from 'typings/task';
import { useCommentPcm } from "services/hooks/useTask";
import { useSocket } from "services/hooks/useSocket";
import { useAuth } from 'services/hooks/auth/useAuth';
import { useUpload } from 'services/hooks/useUpload';
import useUploadFile, { modifyUploadedFilesV2 } from 'services/hooks/useUploadFile';

interface Props {
	onTextChange?: (input: React.FormEvent<HTMLSpanElement>) => unknown;
	onConfirm?: (method?: string) => void;
	attachFile?: boolean;
	inputContainerClassName?: string;
	fileContainerClassName?: string;
	commentID?: string,
	parentID?: string,
	taskID: string,
	companyID?: string,
	projectID?: string,
	groupID?: string,
	files?: FileProps[],
	images?: FileProps[],
	defaultValue?: string,
}

export const ReplyCommentField: FC<Props & React.HTMLAttributes<HTMLDivElement>> = ({
	fileContainerClassName,
	inputContainerClassName,
	onConfirm,
	onTextChange,
	attachFile,
	commentID,
	parentID,
	taskID,
	companyID,
	projectID,
	groupID,
	files,
	images,
	defaultValue,
	...props
}) => {
	const { dispatch } = useContext(CommentContext);
	const [uploads, {
		setUploadImageProgress,
		setUploadFileProgress,
		setIDImageUploaded,
		setIDFileUploaded,
		setUploadImage,
		setUploadFile,
		removeUploadedImage,
		removeUploadedFile,
		removeAllFiles
	}] = useUploadFile({ files, images });

	const [tokens, setTokens] = useState<any[]>([]);
	const [isUploading, setIsUploading] = useState(false);
	const [text, setText] = useState<string>(defaultValue || '');
	const { user } = useAuth();
	const { current: socket }: any = useSocket();

	const { addFileToUpload } = useUpload({
		appID: APP_KEY.PCM_PLAN_TASK,
		companyID: companyID || user?.company?._id,
		projectID,
		groupID
	});

	const { createCommentAsync, updateCommentAsync } = useCommentPcm({
		key: `list_comments.${taskID}`,
		params: { taskID }
	});
	const refInputComment = useRef<HTMLSpanElement | null>(null);
	const refDivFile = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const dropZone = document.getElementById("input-comment");

		const handleDragOver = (e: any) => {
			e.stopPropagation();
			e.preventDefault();
		}

		const handleDrop = (e: any) => {
			e.stopPropagation();
			e.preventDefault();
			if (e.dataTransfer) {
				handleSetFiles(e.dataTransfer.files);
			}
		}

		if (dropZone) {
			dropZone.addEventListener('dragover', handleDragOver);

			// Get file data on drop
			dropZone.addEventListener('drop', handleDrop);
		}

		return () => {
			if(dropZone) {
				dropZone.removeEventListener('dragover', handleDragOver);
				dropZone.removeEventListener('drop', handleDrop);
			}
		}
	}, [])

	const getCancelTokenRequest = (key: string, file: any) => {
		const CancelToken = Axios.CancelToken;
		const source = CancelToken.source();

		setTokens(previousValue => ([
			...previousValue,
			{
				key,
				file,
				source
			}
		]))

		return source;
	}

	const handleSetFiles = async (filesSelected: FileList | null) => {
		if (!filesSelected) return;

		const { error, message } = await validateFiles(filesSelected);
		if(error) return toast.warn(message);

		const [files, images] = modifyUploadedFilesV2({
			imgLastKey: Object.keys(uploads.images).length || null,
			fileLastKey: Object.keys(uploads.files).length || null,
		}, filesSelected);

		setUploadImage(images);
		setUploadFile(files);
		// setIsUploading(true);

		// Upload images
		for (const [key, { file }] of Object.entries(images)) {
			const source = getCancelTokenRequest(key, file);
			const { _id } = await addFileToUpload({
				files: file,
				fileType: 1,
				source,
				progress: percentCompleted => {
					console.log(`${percentCompleted}%`, key);
					setUploadImageProgress(key, percentCompleted)
				}
			})
			setIDImageUploaded(key, _id);
		}

		// Upload files
		for (const [key, { file }] of Object.entries(files)) {
			const source = getCancelTokenRequest(key, file);
			const { _id } = await addFileToUpload({
				files: file,
				fileType: 2,
				source,
				progress: percentCompleted => {
					console.log(`${percentCompleted}%`, key);
					setUploadFileProgress(key, percentCompleted)
				}
			})
			setIDFileUploaded(key, _id);
		}
	}

	// const handlePasteFile = (event: ClipboardEvent<HTMLTextAreaElement>) => {
	// 	event.preventDefault();

	// 	if(event.clipboardData?.files?.length) {
	// 	  return handleSetFiles(event.clipboardData.files)
	// 	}

	// 	const text = event.clipboardData.getData('text/plain');
	// 	text && window.document.execCommand('insertText', false, text);
	// }

	const handleSubmit = async () => {
		let images: string[] = [];
		let files: string[] = [];

		// Get MessageList file uploaded
		for (const [, { _id }] of Object.entries(uploads.images)) {
			_id && (images = [...images, _id]);
		}

		for (const [, { _id }] of Object.entries(uploads.files)) {
			_id && (files = [...files, _id]);
		}

		if((!files.length && !images.length && !text) || isUploading) return;

		const dataInsertOrUpdate: CommentPayload = {
			taskID,
			type: 1,
			content: text,
			files,
			images,
			...{ commentID } ?? {},
			...{ parentID } ?? {}
		}
		let dataAfterInsertOrUpdate = null;
		let method = '';

		try {
			if (defaultValue) {
				const { error, data } = await updateCommentAsync(dataInsertOrUpdate);

				if(error) {
					return toast.warn(data?.message || 'Cập nhật bình luận thất bại')
				}

				method = 'UPDATE';
				dataAfterInsertOrUpdate = data;
				dispatch({
					type: 'UPDATE_COMMENT',
					payload: {
						commentID,
						parent: parentID,
						body: data,
					}
				});
			} else {
				const { error, data } = await createCommentAsync(dataInsertOrUpdate);

				if(error) {
					return toast.warn(data?.message || 'Thêm bình luận thất bại')
				}

				method = 'INSERT';
				dataAfterInsertOrUpdate = data;
				dispatch({ type: 'ADD_COMMENT', payload: data });
			}

			socket?.emit('COMMENT_CSS_ADD_COMMENT', {
				app: APP_KEY.PCM_PLAN_TASK,
				objectID: taskID,
				method,
				parentID,
				commentType: 'COMMENT',
				infoComment: dataAfterInsertOrUpdate,
				populates: JSON.stringify({
					path: 'project author'
				})
			})

			socket?.emit('NOTIFICATION_CSS_RECEIVE_NEW_NOTIFICATION', {
				receivers: dataAfterInsertOrUpdate.receivers
			});
		} catch (error) {
			captureException(error);
			if (typeof error === "string") {
				toast.error(error);
			} else if (error instanceof Error) {
				toast.error(error.message);
			}
		}

		// Clear text input
		removeAllFiles();
		onConfirm && onConfirm(method);
		refInputComment.current && (refInputComment.current.innerText = '');

		// Clear files, images
		if (refDivFile.current) {
			refDivFile.current.innerHTML = '';
			refDivFile.current.classList.add('h-0');
			refDivFile.current.classList.remove('post__files', 'pt-2', 'pb-6');
		}
	}

	const handleKeyUpInput = (event: React.KeyboardEvent<HTMLSpanElement>) => {
		if (event.key === 'Enter') {
			if(event.shiftKey) {
				return;
			}

			!isUploading && handleSubmit();
		}
	}

	const handleRemoveUpload = (file: FileProps | FilePropsUpload, type: 'FILE' | 'IMAGE') => {
		if ('id' in file) {
			const token = tokens.find(item => (item.key == file.id) && (item?.file?.name === file?.file?.name))
			token && token?.source?.cancel('Operation request canceled by the user.');

			type === 'IMAGE' ? removeUploadedImage(file.id) : removeUploadedFile(file.id);
		} else {
			const token = tokens.find(item => (item.key == file._id) && (item?.file?.name === file?.name))
			token && token?.source?.cancel('Operation request canceled by the user.');

			type === 'IMAGE' ? removeUploadedImage(file._id) : removeUploadedFile(file._id);
		}
	}

	return (
		<div {...props}>
			<div
				className={
					classNames("flex flex-wrap max-h-44 w-full pr-4 pl-3.5 py-2 custom-scroll overflow-x-hidden overflow-y-auto",
						fileContainerClassName,
						(!Object.keys(uploads.images).length && !Object.keys(uploads.files).length) ? "h-0" : "")
				}
				ref={refDivFile}
			>
				<PostFile
					files={toArray(uploads.files)}
					onRemove={handleRemoveUpload}
					className="text-black w-full"
				/>
				<PostImage
					images={toArray(uploads.images)}
					onRemove={handleRemoveUpload}
					className="post__files-row pt-5 text-black gap-5 flex-wrap"
				/>
				{/* <div className={
					classNames('custom-scroll overflow-x-hidden overflow-y-auto',
						Object.keys(uploads.files).length
						? "max-h-44 w-full pr-4 pl-3.5 py-2"
						: "hidden",
				)}>
					<PostFile
						files={toArray(uploads.files)}
						onRemove={handleRemoveUpload}
						className="text-black w-full"
					/>
				</div>
				<div className={
					classNames('custom-scroll overflow-x-hidden overflow-y-auto pb-2.5',
						Object.keys(uploads.images).length
						? 'max-h-44 w-full pl-3.5'
						: 'hidden'
				)}>
					<PostImage
						images={toArray(uploads.images)}
						onRemove={handleRemoveUpload}
						className="post__files-row pt-5 text-black gap-5 flex-wrap"
					/>
				</div> */}
			</div>
			{/* <div className={inputContainerClassName}>
				<div className="flex self-end h-9 w-9">
					<button className="flex items-center justify-center h-9 w-9">
						<img src={iconFace} alt="Icon face" className="h-6 w-6" />
					</button>
				</div>
				<div className="react__replay overflow-hidden flex-1 bg-gray-100 border border-gray-300 rounded-2xl mx-2">
					<div className="flex px-5 py-1.5 h-full overflow-y-auto" id='input-comment'>
						<span
							contentEditable
							placeholder='Trả lời...'
							className="custom-scroll relative block outline-none break-words text-[15px] leading-4 cursor-text flex-grow overflow-x-hidden py-1"
							ref={refInputComment}
							style={{ color: 'black' }}
							suppressContentEditableWarning={true}
							onPaste={handlePasteFile}
							onKeyUp={handleKeyUpInput}
							onInput={e =>
								onTextChange
									? onTextChange(e)
									: setText(e.currentTarget.innerText)
							}
							dangerouslySetInnerHTML={{
								__html: nl2p(defaultValue || '')
							}}
						></span>
						<label className="flex items-center justify-center flex-shrink-0 self-end">
							<img src={iconAttach} alt="Icon attach" className="h-6 w-6" />
							<input
								type="file"
								name="files"
								id="file"
								accept="*"
								multiple
								className="hidden"
								onChange={e => handleSetFiles(e.target.files)}
							/>
						</label>
					</div>
				</div>
				<div className="flex self-end">
					<button
						className={classNames('flex items-center justify-center h-9 w-9', {
							'disabled:opacity-60': isUploading
						})}
						disabled={isUploading}
						onClick={handleSubmit}
					>
						<img src={iconEmailSend} alt="Icon attach" className="h-9 w-9" />
					</button>
				</div>
			</div> */}
		</div>
	)
}