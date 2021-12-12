import React, { FC, useState } from 'react'

import iconFace from 'assets/images/icons8-grinning-face-64.png';
import iconAttach from 'assets/images/icons8-attach-50.png';
import iconEmailSend from 'assets/images/icon-email-send.png';

interface Props {
	setUploadFile?: (files: File[]) => unknown;
	setUploadImage?: (files: File[]) => unknown;
	onTextChange?: (input: string) => unknown;
	attachFile?: boolean;
	onSubmit?: (input: string) => unknown;
}

const ReplyCommentField: FC<Props & React.HTMLAttributes<HTMLDivElement>> = ({ onSubmit, attachFile, onTextChange, setUploadFile, setUploadImage, ...props }) => {
	const [text, setText] = useState<string>('');

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
	)
}

export default ReplyCommentField
