import React, {FC, useEffect, useRef} from "react";

type Props = {
    message: any
}
const TextReply:FC<Props> = ({message}) => {
    const textContentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (textContentRef && textContentRef.current) {
            return message.content.replaceAll(/[@]\[(.*?)\]\((.*?)\)/g, (replacement: string) => {
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
    },[textContentRef])
    return (
        <div className={"reply-content border-l-2 border-primary pl-[7px]"}>
            <div className={"reply-user-name text-blue-900"} style={{color: message.themeColor}}>
                {message.sender.fullname}
            </div>
            <div className={"truncate text-gray-400"} ref={textContentRef}>
            </div>
        </div>
    )
}

export default TextReply;
