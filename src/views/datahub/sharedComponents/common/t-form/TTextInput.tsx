import React, { FC, HTMLAttributes, useRef, useState } from 'react'

type Props = {
	onSubmit?: (text: string) => unknown;
	defaultValue?: string;
}

const TTextInput: FC<Props & HTMLAttributes<HTMLSpanElement>> = ({ defaultValue, onSubmit, ...props }) => {

	const [text, setText] = useState<string>(defaultValue || '');
	const refInputComment = useRef<HTMLSpanElement | null>(null);

	const handleKeyPressInput = (event: React.KeyboardEvent<HTMLSpanElement>) => {
		if (event.key === "Enter") {
			event.preventDefault();
			handleSubmit();
		}
	}

	const handleSubmit = async () => {
		onSubmit && onSubmit(text);
		refInputComment.current && (refInputComment.current.innerHTML = '');
	}

	return (
		<span
			contentEditable
			onPaste={e => {
				e.preventDefault();
				const text = e.clipboardData.getData('text/plain');
				window.document.execCommand('insertText', false, text);
			}}
			ref={refInputComment}
			suppressContentEditableWarning={true}
			onKeyPress={handleKeyPressInput}
			// Handle change text
			onInput={e =>
				setText(e.currentTarget.innerText)
			}
			{...props}
		>{defaultValue}</span>
	)
}

export default TTextInput