import React, {FC} from "react";

type Props = {
    message: any
}
const TextReply:FC<Props> = ({message}) => {
    const renderContent = () => {
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
    return (
        <div className={"reply-content border-l-2 border-primary pl-[7px]"}>
            <div className={"reply-user-name text-blue-900"} style={{color: message.themeColor}}>
                {message.sender.fullname}
            </div>
            <div className={"truncate text-gray-400"}>
                {renderContent()}
            </div>
        </div>
    )
}

export default TextReply;
