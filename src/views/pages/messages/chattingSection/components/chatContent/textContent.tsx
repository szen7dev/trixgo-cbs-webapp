import React, {FC, useEffect, useRef} from "react";
import DoubleTickIcon from "assets/images/icons8-double-tick-96.svg";
import TextReply from "./replyContent/textReply";
import FileReply from "./replyContent/fileReply";
import ImageReply from "./replyContent/imageReply";
import moment from "moment";

type Props = {
    message: any;
    className?: string;
    showSenderName?: boolean;
}
const TextChatContent:FC<Props> = ({message,className,showSenderName}) => {
    const textContentRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (textContentRef && textContentRef.current) {
            textContentRef.current.innerHTML = message.content
                //Regex mention
                .replaceAll(/[@]\[(.*?)\]\((.*?)\)/g, (replacement: string) => {
                    const matchs = (/[@]\[(.*?)\]\((.*?)\)/g).exec(replacement);
                    if (matchs) {
                        const fullName = matchs[1];
                        const userId = matchs[2];
                        return `<a class="text-primary" href="${userId}">@${fullName}</a>`;
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
                        return `<a class="text-primary" href="${matchs[0]}" target="_blank">${matchs[0]}</a>`
                    }
                });
        }
    },[textContentRef])

    const renderReply = () => {
        switch (message.parent.type) {
            case 0:
                return <TextReply message={message.parent}/>;
            case 2:
                return <FileReply message={message.parent}/>;
            case 1:
                return <ImageReply message={message.parent}/>;
        }
    }
    return (
        <div className={"max-w-[366px] min-w-[70px] rounded-lg p-[7px] pb-[10px] relative " + (className??"")}>
            {
                showSenderName&&
                <div className={"reply-user-name text-primary"}>
                    {message.sender.fullname}
                </div>
            }
            {
                message.parent&&
                renderReply()
            }
            <div className={"pr-[20px] pb-[5px]"}>
                <div className={"message-content"}>
                    <div ref={textContentRef} className={"flex-1 py-[4px] break-all"}>
                    </div>
                </div>
                <div className={"date-message absolute bottom-3px right-4px text-gray-400 text-xs flex items-center"}>
                    {moment(message.createdAt).format("hh:mm")}<img className={"ml-1"} src={DoubleTickIcon} alt={"tick"}/>
                </div>
            </div>
        </div>
    )
}

export default TextChatContent
