import React, {FC, useEffect, useRef} from "react";

type Props = {
    onChange: (target: any) => void;
    html: string;
}
const InputForMessage:FC<Props> = ({onChange,html}) => {
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
            const isTargetFocused = document.activeElement === inputRef.current;
            if (target !== null && target.nodeValue !== null && isTargetFocused) {
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
        }
    },[html, inputRef])
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
