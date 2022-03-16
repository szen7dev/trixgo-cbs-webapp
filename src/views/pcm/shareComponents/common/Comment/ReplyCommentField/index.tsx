import React, { FC, useEffect, useRef, useState, useContext } from 'react';

import Axios from 'axios';
import classNames from 'classnames';
import { toArray } from 'lodash';
import { toast } from "react-toastify";

import iconFace from 'assets/images/icons8-grinning-face-64.png';
import iconAttach from 'assets/images/icons8-attach-50.png';
import iconEmailSend from 'assets/images/icon-email-send.png';
import { PostImage, PostFile } from 'shareComponents/common';
import { nl2p } from 'utils';
import { APP_KEY } from 'utils/constants';

import CommentContext from 'views/pcm/contexts/comment/comment.context';
import { FileProps, FilePropsUpload } from 'typings/common';
import { CommentPayload } from 'typings/task';
import { useCommentPcm } from "services/hooks/useTask";
import { useSocket } from "services/hooks/useSocket";
import { useAuth } from 'services/hooks/useAuth';
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
		companyID: user?.company?._id,
		projectID,
		groupID
	});
	const { createCommentAsync, updateCommentAsync } = useCommentPcm({
		key: `list_comments.${taskID}`,
		params: { taskID }
	});
	const refInputComment = useRef<HTMLSpanElement | null>(null);
	const refDivFile = useRef<HTMLDivElement | null>(null);

	const listenEventAddComment = (result: any) => {
		if(!user || !taskID) return;

		const { data, error } = result;
		if(error) return;

		const { infoObject, infoComment, parentID, method } = data;

		if(infoObject?._id !== taskID) return;
		if(user._id === infoComment?.author?._id) return;
		console.log({ result });

		// if(method === 'UPDATE') {
		// 	return dispatch({
		// 		type: 'UPDATE_COMMENT',
		// 		payload: {
		// 			commentID: infoComment._id,
		// 			parent: parentID,
		// 			body: infoComment,
		// 		}
		// 	});
		// }

		// dispatch({ type: 'ADD_COMMENT', payload: infoComment });
	}

	useEffect(() => {
		if(!socket) return;

		// socket.off("COMMENT_SSC_ADD_COMMENT", listenEventAddComment);
		socket.on("COMMENT_SSC_ADD_COMMENT", listenEventAddComment);
	}, [socket])

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

	const handleAttachFiles = async (event: React.ChangeEvent<HTMLInputElement>) => {
		if (!event.target.files) return;

		const [files, images] = modifyUploadedFilesV2({
			imgLastKey: Object.keys(uploads.images).length || null,
			fileLastKey: Object.keys(uploads.files).length || null,
		}, event.target.files);

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

		if(!files.length && !images.length && !text || isUploading) return;

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
				const { error, data, message } = await updateCommentAsync(dataInsertOrUpdate);

				if (error) {
					return toast.warning(message);
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
				const { error, data, message } = await createCommentAsync(dataInsertOrUpdate);

				if (error) {
					return toast.warning(message);
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
				infoComment: dataAfterInsertOrUpdate,
				populates: JSON.stringify({
					path: 'project author'
				})
			})

			socket?.emit('NOTIFICATION_CSS_RECEIVE_NEW_NOTIFICATION', {
				receivers: dataAfterInsertOrUpdate.receivers
			});
		} catch (error) {
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
					classNames("flex flex-wrap custom-scroll overflow-x-hidden overflow-y-auto pl-3.5",
						fileContainerClassName,
						(!Object.keys(uploads.images).length && !Object.keys(uploads.files).length) ? "h-0" : "post__files pt-2 pb-6")
				}
				ref={refDivFile}
			>
				<PostImage
					images={toArray(uploads.images)}
					onRemove={handleRemoveUpload}
					className="post__files-row pt-5 text-black gap-5 flex-wrap"
				/>
				<PostFile
					files={toArray(uploads.files)}
					onRemove={handleRemoveUpload}
					className="text-black w-full mr-4"
				/>
			</div>
			<div className={inputContainerClassName}>
				<div className="flex self-end h-9 w-9">
					<button className="flex items-center justify-center h-9 w-9">
						<img src={iconFace} alt="Icon face" className="h-6 w-6" />
					</button>
				</div>
				<div className="react__replay overflow-hidden flex-1 bg-gray-100 border border-gray-300 rounded-2xl mx-2">
					<div className="flex px-5 py-1.5 h-full overflow-y-auto">
						<span
							contentEditable
							placeholder='Trả lời...'
							className="custom-scroll relative block outline-none break-words text-[15px] leading-4 cursor-text flex-grow overflow-x-hidden py-1"
							onPaste={e => {
								e.preventDefault();
								const text = e.clipboardData.getData('text/plain');
								window.document.execCommand('insertText', false, text);
							}}
							ref={refInputComment}
							style={{ color: 'black' }}
							suppressContentEditableWarning={true}
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
								// Validate input file
								accept="*"
								multiple
								className="hidden"
								onChange={handleAttachFiles} />
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
			</div>
		</div>
	)
}