import React, {FC, ReactNode, useEffect, useRef} from "react";
type Props = {
    children: string
}
const TextChatContent:FC<Props> = ({children}) => {
    const textContentRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (textContentRef && textContentRef.current) {
            textContentRef.current.innerHTML = children;
        }
    },[textContentRef])
    return (
        <div className={"message-content"} ref={textContentRef}>
            <div ref={textContentRef} className={"flex-1 py-[4px]"}>
            </div>
        </div>
    )
}

export default TextChatContent
