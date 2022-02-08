import React, { FC, useRef, useState, useContext } from 'react';

import cn from 'classnames';
import { toArray } from 'lodash';

import iconFace from 'assets/images/icons8-grinning-face-64.png';
import iconAttach from 'assets/images/icons8-attach-50.png';
import iconEmailSend from 'assets/images/icon-email-send.png';
import PostImage from './post/PostImage';
import PostFile from './post/PostFile';

import CommentContext from '../context/comment/comment.context';
import { modifyUploadedFilesV2 } from 'services/hooks/ppt/useUploadFile/upload.utils';
import { FileProps, FilePropsUpload, CommentPayload } from 'typings/social';
import { useCommentSocial } from 'services/hooks/useSocial';
import { useUpload } from 'services/hooks/useUpload';
import useUploadFile from 'services/hooks/ppt/useUploadFile';

interface Props {
	onTextChange?: (input: React.FormEvent<HTMLSpanElement>) => unknown;
	onSubmit?: () => unknown;
	attachFile?: boolean;
	inputContainerClassName?: string;
	fileContainerClassName?: string;
	commentID?: string,
	parentID?: string,
	mediaID: string,
	files?: FileProps[],
	images?: FileProps[],
	defaultValue?: string,
}

const ReplyCommentField: FC<Props & React.HTMLAttributes<HTMLDivElement>> = ({
	fileContainerClassName,
	inputContainerClassName,
	onSubmit,
	onTextChange,
	attachFile,
	commentID,
	parentID,
	mediaID,
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

	const [text, setText] = useState<string>(defaultValue || '');
	const { addFileToUpload } = useUpload('MEDIA');
	const { createComment, updateComment } = useCommentSocial({ mediaID, key: `list_comments.${mediaID}` });
	const refInputComment = useRef<HTMLSpanElement | null>(null);
	const refDivFile = useRef<HTMLDivElement | null>(null);

	// const refsImages = useRef<{ [key: string]: NodeJS.Timeout }>({});
	// const refsFiles = useRef<{ [key: string]: NodeJS.Timeout }>({});

	// const handleCancleUploadFile = (file: FileProps | FilePropsUpload) => {
	// 	if ('id' in file && refsFiles.current[file.id]) clearInterval(refsFiles.current[file.id])
	// 	cancelUploadFile(file)
	// }

	// const handleCancleUploadImage = (file: FileProps | FilePropsUpload) => {
	// 	if ('id' in file && refsImages.current[file.id]) clearInterval(refsImages.current[file.id])
	// 	cancelUploadImage(file)
	// }

	const handleAttachFiles = async (event: React.ChangeEvent<HTMLInputElement>) => {
		if (!event.target.files) return;

		const [files, images] = modifyUploadedFilesV2({
			imgLastKey: Object.keys(uploads.images).length || null,
			fileLastKey: Object.keys(uploads.files).length || null,
		}, event.target.files);

		setUploadImage(images);
		setUploadFile(files);

		// Upload images
		for (const [key, { file }] of Object.entries(images)) {
			const { _id } = await addFileToUpload({
				files: file,
				progress: percentCompleted => {
					console.log(`${percentCompleted}%`, key);
					setUploadImageProgress(key, percentCompleted)
				}
			})
			setIDImageUploaded(key, _id);
		}

		// Upload files
		for (const [key, { file }] of Object.entries(files)) {
			const { _id } = await addFileToUpload({
				files: file,
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

		// Get list file uploaded
		for (const [, { _id }] of Object.entries(uploads.images)) {
			_id && (images = [...images, _id]);
		}

		for (const [, { _id }] of Object.entries(uploads.files)) {
			_id && (files = [...files, _id]);
		}

		const dataInsertOrUpdate: CommentPayload = {
			mediaID,
			content: text,
			files,
			images,
			...{ commentID } ?? {},
			...{ parentID } ?? {}
		}
		let infoAfterCreateOrUpdate;

		if (defaultValue) {
			infoAfterCreateOrUpdate = await updateComment(dataInsertOrUpdate);
			dispatch({
				type: 'UPDATE_COMMENT',
				payload: {
					commentID,
					parent: parentID,
					body: infoAfterCreateOrUpdate,
				}
			});
		} else {
			infoAfterCreateOrUpdate = await createComment(dataInsertOrUpdate);
			dispatch({ type: 'ADD_COMMENT', payload: infoAfterCreateOrUpdate });
		}

		// Clear text input
		removeAllFiles();
		onSubmit && onSubmit();
		refInputComment.current && (refInputComment.current.innerText = '');

		// Clear files, images
		if (refDivFile.current) {
			refDivFile.current.innerHTML = '';
			refDivFile.current.classList.add('h-0');
			refDivFile.current.classList.remove('post__files', 'pt-2', 'pb-6');
		}
	}

	const handleKeyPressInput = (event: React.KeyboardEvent<HTMLSpanElement>) => {
		event.key === "Enter" && handleSubmit();
	}

	const handleRemoveUpload = (file: FileProps | FilePropsUpload, type: 'FILE' | 'IMAGE') => {
		if ('id' in file) {
			type === 'IMAGE' ? removeUploadedImage(file.id) : removeUploadedFile(file.id);
		} else {
			type === 'IMAGE' ? removeUploadedImage(file._id) : removeUploadedFile(file._id);
		}
	}

	return (
		<div {...props}>
			<div
				className={
					cn("flex flex-wrap custom-scroll overflow-x-hidden overflow-y-auto pl-3.5",
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
							onKeyPress={handleKeyPressInput}
							// Handle change text
							onInput={e =>
								onTextChange
									? onTextChange(e)
									: setText(e.currentTarget.innerText)
							}
						>{defaultValue}</span>
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
					<button className="flex items-center justify-center h-9 w-9" onClick={handleSubmit}>
						<img src={iconEmailSend} alt="Icon attach" className="h-9 w-9" />
					</button>
				</div>
			</div>
		</div>
	)
}

export default ReplyCommentField;
