import React, {FC, useEffect, useRef} from "react";

type Props = {
    message: any;
    className?: string;
}
const TextPinned:FC<Props> = ({message, className}) => {
    const textContentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (textContentRef && textContentRef.current) {
            textContentRef.current.innerHTML =  message.content.replaceAll(/[@]\[(.*?)\]\((.*?)\)/g, (replacement: string) => {
                const matchs = (/[@]\[(.*?)\]\((.*?)\)/g).exec(replacement);
                if (matchs) {
                    const fullName = matchs[1];
                    const userId = matchs[2];
                    return `<a class="text-primary" href="${userId}">@${fullName}</a>`;
                } else {
                    return replacement;
                }
            })
        }
    },[textContentRef, message.content])
    return (
        <div className={"flex-1 max-w-[185px] ml-[5px] flex flex-col justify-start"}>
            <div className={"text-primary text-left"}>Tin đã ghim</div>
            <div className={"truncate text-left"} ref={textContentRef}></div>
        </div>
    )
}

export default TextPinned;
