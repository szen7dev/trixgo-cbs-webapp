import React, { FC, useRef, useState, useContext, useEffect } from 'react';

import cn from 'classnames';
import { toArray } from 'lodash';

import iconFace from 'assets/images/icons8-grinning-face-64.png';
import iconAttach from 'assets/images/icons8-attach-50.png';
import iconEmailSend from 'assets/images/icon-email-send.png';
import PostImage from './post/PostImage';
import PostFile from './post/PostFile';

import useCustomReducer from '../context/useCustomReducer';
import { IMethodFiles, IMethodImages } from '../context/upload';
import fileUploadReducer, { INITIAL_STATE } from '../context/upload.reducer';
import CommentContext from '../context/comment/comment.context';
import uploadActions from '../context/upload.actions';
import { modifyUploadedFilesV2 } from '../context/upload.utils';
import { FileProps, FilePropsUpload, CommentPayload } from 'typings/social';
import { useCommentSocial } from 'services/hooks/useSocial';
import { useUpload } from 'services/hooks/useUpload';

interface Props {
	// setUploadFile?: (files: File[]) => unknown;
	// setUploadImage?: (files: File[]) => unknown;
	onTextChange?: (input: React.FormEvent<HTMLSpanElement>) => unknown;
	attachFile?: boolean;
	onSubmit?: (input: string, parentID?: string) => void;
	inputContainerClassName?: string;
	fileContainerClassName?: string;
	parentID?: string,
	mediaID: string,
	defaultValue?: string,
}

const ReplyCommentField: FC<Props & React.HTMLAttributes<HTMLDivElement>> = ({
	fileContainerClassName,
	inputContainerClassName,
	onSubmit,
	onTextChange,
	attachFile,
	parentID,
	mediaID,
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
		cancelUploadFile,
		cancelUploadImage
	}] = useCustomReducer<IMethodFiles & IMethodImages>(fileUploadReducer, uploadActions, INITIAL_STATE);

	const [text, setText] = useState<string>(defaultValue || '');
	const { addFileToUpload } = useUpload('MEDIA');
	const { createComment } = useCommentSocial({ mediaID, key: `${mediaID}-list-comments` });
	const refInputComment = useRef<HTMLSpanElement | null>(null);
	const refsImages = useRef<{ [key: string]: NodeJS.Timeout }>({});
	const refsFiles = useRef<{ [key: string]: NodeJS.Timeout }>({});

	useEffect(() => {
		if (refInputComment.current) refInputComment.current.innerText = defaultValue || '';
	}, [defaultValue])

	const handleCancleUploadFile = (file: FileProps | FilePropsUpload) => {
		if ('id' in file && refsFiles.current[file.id]) clearInterval(refsFiles.current[file.id])
		cancelUploadFile(file)
	}

	const handleCancleUploadImage = (file: FileProps | FilePropsUpload) => {
		if ('id' in file && refsImages.current[file.id]) clearInterval(refsImages.current[file.id])
		cancelUploadImage(file)
	}

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

		// for (let i = 0; i < event.target.files.length; i++) {
		// 	if (event.target.files[i].type.indexOf('image') !== -1) { images.push(event.target.files[i]); continue; }
		// 	// if (event.target.files[i].type.indexOf('image') !== -1) { images.push(event.target.files[i]); continue; }
		// 	files.push(event.target.files[i])
		// }

		// if (files.length) setUploadFile && setUploadFile(files);
		// if (images.length) setUploadImage && setUploadImage(images);
	}

	const handleSubmit = async () => {
		let images: string[] = [];
		let files: string[] = [];

		console.log({ IMAGES: uploads.images, FILES: uploads.files });

		// Get list file uploaded
		for (const [_, { _id }] of Object.entries(uploads.images)) {
			_id && (images = [...images, _id]);
		}

		for (const [_, { _id }] of Object.entries(uploads.files)) {
			_id && (files = [...files, _id]);
		}

		const dataInsert: CommentPayload = {
			mediaID,
			content: text,
			files,
			images,
			...{ parentID } ?? {}
		}
		console.log({ dataInsert });

		const infoAfterCreate = await createComment(dataInsert);
		dispatch({ type: 'ADD_COMMENT', payload: infoAfterCreate });

		// Clear text input comment
		refInputComment.current && (refInputComment.current.innerText = '');
	}

	return (
		<div {...props}>
			<div
				className={
					cn("flex flex-wrap custom-scroll overflow-x-hidden overflow-y-auto pl-3.5",
						fileContainerClassName,
						(!Object.keys(uploads.images).length && !Object.keys(uploads.files).length) ? "h-0" : "post__files pt-2 pb-6")
				}
			>
				<PostImage
					images={toArray(uploads.images)}
					onRemove={handleCancleUploadImage}
					className="post__files-row pt-5 text-black gap-5 flex-wrap"
				/>
				<PostFile
					files={toArray(uploads.files)}
					onRemove={handleCancleUploadFile}
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
							// Handle change text
							onInput={e => {
								onTextChange
									? onTextChange(e)
									: setText(e.currentTarget.innerText)
							}
							}
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
					<button className="flex items-center justify-center h-9 w-9" onClick={handleSubmit}>
						<img src={iconEmailSend} alt="Icon attach" className="h-9 w-9" />
					</button>
				</div>
			</div>
		</div>
	)
}

export default ReplyCommentField
