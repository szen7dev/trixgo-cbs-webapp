import React, { FC, useEffect, useRef, useState } from 'react'

import cn from 'classnames';

import iconFace from 'assets/images/icons8-grinning-face-64.png';
import iconAttach from 'assets/images/icons8-attach-50.png';
import iconEmailSend from 'assets/images/icon-email-send.png';
import PostImage from './post/PostImage';
import PostFile from './post/PostFile';

import useUpload from '../context/useUpload';
import { IMethodFiles, IMethodImages } from '../context/upload';
import fileUploadReducer, { INITIAL_STATE } from '../context/upload.reducer';
import uploadActions from '../context/upload.actions';
import { toArray } from 'lodash';
import { FileProps, FilePropsUpload } from 'typings/social';

interface Props {
	// setUploadFile?: (files: File[]) => unknown;
	// setUploadImage?: (files: File[]) => unknown;
	onTextChange?: (input: string) => unknown;
	attachFile?: boolean;
	onSubmit?: (input: string) => unknown;
	inputContainerClassName?: string;
	fileContainerClassName?: string;
}

const ReplyCommentField: FC<Props & React.HTMLAttributes<HTMLDivElement>> = ({ fileContainerClassName, inputContainerClassName, onSubmit, attachFile, onTextChange, ...props }) => {
	const [uploads, {
		setUploadFile,
		setUploadImage,
		uploadImage,
		uploadFile,
		cancelUploadImage,
		cancelUploadFile
	}] = useUpload<IMethodFiles & IMethodImages>(fileUploadReducer, uploadActions, INITIAL_STATE);
	const [text, setText] = useState<string>('');
	const refsImages = useRef<{ [key: string]: NodeJS.Timeout }>({});
	const refsFiles = useRef<{ [key: string]: NodeJS.Timeout }>({});

	useEffect(() => {
		let isMounted = false;
		const filetoUpload = toArray(uploads.files).filter(file => file.progress === 0);
		uploadFile(filetoUpload, isMounted, refsFiles.current);
		return () => { isMounted = true };

		// Pass length of files as dependencies to trigger uploadFile only when add or remove file
		// If use uploads.files only, thi effect will run all the time

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [Object.keys(uploads.files).length])

	useEffect(() => {
		let isMounted = false;
		const imageToUpload = toArray(uploads.images).filter(file => file.progress === 0);
		uploadImage(imageToUpload, isMounted, refsImages.current);
		return () => { isMounted = true };
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [Object.keys(uploads.images).length])

	const handleCancleUploadFile = (file: FileProps | FilePropsUpload) => {
		if ('id' in file && refsFiles.current[file.id]) clearInterval(refsFiles.current[file.id])
		cancelUploadFile(file)
	}

	const handleCancleUploadImage = (file: FileProps | FilePropsUpload) => {
		if ('id' in file && refsImages.current[file.id]) clearInterval(refsImages.current[file.id])
		cancelUploadImage(file)
	}

	const handleAttackFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
		// Validate filetype;
		if (!event.target.files) return;
		const images: File[] = [];
		const files: File[] = [];
		for (let i = 0; i < event.target.files.length; i++) {
			if (event.target.files[i].type.indexOf('image') !== -1) { images.push(event.target.files[i]); continue; }
			// if (event.target.files[i].type.indexOf('image') !== -1) { images.push(event.target.files[i]); continue; }
			files.push(event.target.files[i])
		}
		if (files.length) setUploadFile && setUploadFile(files);
		if (images.length) setUploadImage && setUploadImage(images);
	}

	const handleSubmit = () => {
		onSubmit && onSubmit(text);
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
							style={{ color: 'black' }}
							// Handle change text
							onInput={e => {
								onTextChange
									? onTextChange(e.currentTarget.innerText)
									: setText(e.currentTarget.innerText)
							}
							}
						>
						</span>
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
								onChange={handleAttackFiles} />
						</label>
					</div>
				</div>
				<div className="flex self-end">
					<button className="flex items-center justify-center h-9 w-9" onSubmit={handleSubmit}>
						<img src={iconEmailSend} alt="Icon attach" className="h-9 w-9" />
					</button>
				</div>
			</div>
		</div>
	)
}

export default ReplyCommentField
