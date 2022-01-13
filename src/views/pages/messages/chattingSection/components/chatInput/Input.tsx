import React, {FC, useEffect, useRef} from "react";

type Props = {
    onChange: (target: any) => void;
    html: string;
}
const InputForMessage:FC<Props> = ({onChange,html}) => {
    const inputRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (inputRef&&inputRef.current) {
            inputRef.current.innerHTML = html;
            inputRef.current.focus();
        }
    },[html, inputRef])
    return (
        <div
            ref={inputRef}
            contentEditable={"true"}
            className={"flex-1 max-w-full min-h-[50px] max-h-26 focus:outline-none py-[15px] whitespace-pre-wrap transition duration-150"}
            placeholder={"Message"}
            onInput={() => onChange(inputRef?.current)}
        />
    )
}
export default InputForMessage
