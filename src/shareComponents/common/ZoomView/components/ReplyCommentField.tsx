import React, { FC, useRef, useState } from 'react';

import cn from 'classnames';
import { toArray } from 'lodash';
import { toast } from "react-toastify";

import iconFace from 'assets/images/icons8-grinning-face-64.png';
import iconAttach from 'assets/images/icons8-attach-50.png';
import iconEmailSend from 'assets/images/icon-email-send.png';
import { PostFile, PostImage } from 'shareComponents/common';
import { validateFiles } from 'validation/file';

import { FileProps, FilePropsUpload } from 'typings/common';
import { useUpload } from 'services/hooks/useUpload';
import useUploadFile, { modifyUploadedFilesV2 } from 'services/hooks/useUploadFile';

export interface SubmitComment {
  images: string[];
  files: string[];
  text: string;
  level?: number;
}

interface Props {
	onTextChange?: (input: React.FormEvent<HTMLSpanElement>) => unknown;
	onSubmitChat?(props: SubmitComment): Promise<void>;
	attachFile?: boolean;
	inputContainerClassName?: string;
	fileContainerClassName?: string;
	files?: FileProps[],
	images?: FileProps[],
	content?: string,
	appID?: string,
	level?: number;
}

const ReplyCommentField: FC<Props & React.HTMLAttributes<HTMLDivElement>> = ({
	fileContainerClassName,
	inputContainerClassName,
	onSubmitChat,
	onTextChange,
	attachFile,
	files,
	images,
	content,
	appID,
	level,
	...props
}) => {
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

	const [text, setText] = useState<string>(content || '');
	const { addFileToUpload } = useUpload({ appID });

	const refInputComment = useRef<HTMLSpanElement | null>(null);
	const refDivFile = useRef<HTMLDivElement | null>(null);

	const handleAttachFiles = async (event: React.ChangeEvent<HTMLInputElement>) => {
		if (!event.target.files) return;

    	const { error, message } = await validateFiles(event.target.files);
		if(error) return toast.warn(message);

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
				fileType: 1,
				progress: percentCompleted => {
					// console.log(`${percentCompleted}%`, key);
					setUploadImageProgress(key, percentCompleted)
				}
			})
			setIDImageUploaded(key, _id);
		}

		// Upload files
		for (const [key, { file }] of Object.entries(files)) {
			const { _id } = await addFileToUpload({
				files: file,
				fileType: 2,
				progress: percentCompleted => {
					// console.log(`${percentCompleted}%`, key);
					setUploadFileProgress(key, percentCompleted)
				}
			})
			setIDFileUploaded(key, _id);
		}
	}

	const handleSubmit = async () => {
		toast.info('Tính năng đang phát triển');
		// Clear text input
		removeAllFiles();
		refInputComment.current && (refInputComment.current.innerHTML = '');

		// Clear files, images
		if (refDivFile.current) {
			refDivFile.current.innerHTML = '';
			refDivFile.current.classList.add('h-0');
			refDivFile.current.classList.remove('post__files', 'pt-2', 'pb-6');
		}
		onSubmitChat && await onSubmitChat({
			images: Object.values(uploads.images).map(({ _id }) => _id as string),
			files: Object.values(uploads.files).map(({ _id }) => _id as string),
			text,
			level
		});
	}

	const handleKeyPressInput = (event: React.KeyboardEvent<HTMLSpanElement>) => {
		if (event.key === "Enter") {
			event.preventDefault();
			handleSubmit()
		};
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
						>{content}</span>
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
