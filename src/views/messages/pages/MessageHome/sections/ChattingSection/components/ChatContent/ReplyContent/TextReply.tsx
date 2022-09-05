import React, {FC, useEffect, useRef} from "react";

type Props = {
    message: any;
    className?: string;
    isMyMessage?: boolean;
}
export const TextReply:FC<Props> = ({message, className, isMyMessage}) => {
    const textContentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (textContentRef && textContentRef.current) {
            textContentRef.current.innerHTML =  message.content
                //Regex mention
                .replaceAll(/[@]\[(.*?)\]\((.*?)\)/g, (replacement: string) => {
                    const matchs = (/[@]\[(.*?)\]\((.*?)\)/g).exec(replacement);
                    if (matchs) {
                        const fullName = matchs[1];
                        const userId = matchs[2];
                        return `<span class="cursor-pointer user-tag-in-content" data-userId="${userId}">@${fullName}</span>`;
                    } else {
                        return replacement;
                    }
                })
                //Regex new line
                .replaceAll("\n","<br>")
                //Regex link
                // eslint-disable-next-line no-useless-escape
                .replaceAll(/(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/g, (replacement: string) => {
                    // eslint-disable-next-line no-useless-escape
                    const matchs = (/(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/g).exec(replacement);
                    if (matchs) {
                        return `<a class="link-in-content" href="${matchs[0]}" target="_blank">${matchs[0]}</a>`
                    }
                });
        }
    },[textContentRef, message.content])
    return (
        <div className={"reply-content border-l-2 border-primary pl-[7px] " + (className??"")}>
            <div className={"reply-user-name " + (isMyMessage? "text-white font-bold text-opacity-75" : "text-gray-900")} style={{color: message.themeColor}}>
                {message.sender.bizfullname||message.sender.fullname}
            </div>
            <div className={"truncate reply-content-text max-w-[250px] " + (isMyMessage? "text-white text-opacity-75" : "text-gray-400")} ref={textContentRef}>
            </div>
        </div>
    )
}
