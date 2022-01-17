import React, {FC, useEffect, useRef, useState} from "react";

type Props = {
    onChange: (target: any) => void;
    html: string;
    onPressEnter?: () => void
}
const InputForMessage:FC<Props> = ({onChange,html, onPressEnter}) => {
    const [keyCode, setKeyCode] = useState(0);
    const [addNewLine, setAddNewLine] = useState(false);
    const inputRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (inputRef&&inputRef.current) {
            inputRef.current.innerHTML = html.replaceAll(/[@]\[(.*?)\]\((.*?)\)/g, (replacement: string) => {
                const matchs = (/[@]\[(.*?)\]\((.*?)\)/g).exec(replacement);
                if (matchs) {
                    const fullName = matchs[1];
                    const userId = matchs[2];
                    return `<a class="text-primary" href="${userId}">@${fullName}</a>`;
                } else {
                    return replacement;
                }
            });

            const target = document.createTextNode('');
            inputRef.current.appendChild(target);
            // do not move caret if element was not focused
            // const isTargetFocused = document.activeElement === inputRef.current;
            if (target !== null && target.nodeValue !== null) {
                const sel = window.getSelection();
                if (sel !== null) {
                    const range = document.createRange();
                    range.setStart(target, target.nodeValue.length);
                    range.collapse(true);
                    sel.removeAllRanges();
                    sel.addRange(range);
                }
                inputRef.current.focus();
                inputRef.current.click();
            }

            inputRef.current.addEventListener('keydown', (event) => {
                if (event.keyCode===13) {
                    setKeyCode(event.keyCode)
                    event.preventDefault();
                }
                else {
                    setKeyCode(0)
                }
            });
        }
    },[html, inputRef])

    useEffect(() => {
        if (keyCode === 13) {
            onPressEnter&&onPressEnter()
        }
    },[keyCode]);

    return (
        <>
        <div
            ref={inputRef}
            contentEditable={"true"}
            className={"flex-1 max-w-full min-h-[50px] max-h-26 focus:outline-none py-[15px] whitespace-pre-wrap transition duration-150"}
            placeholder={"Message"}
            onInput={() => onChange(inputRef?.current)}
        />
        <input type={"hidden"} value={html}/>
        </>
    )
}
export default InputForMessage
