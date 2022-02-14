import React, {FC, useEffect, useRef} from "react";
import DoubleTickIcon from "assets/images/icons8-double-tick-96.svg";
import TextReply from "./replyContent/textReply";
import FileReply from "./replyContent/fileReply";
import ImageReply from "./replyContent/imageReply";
import moment from "moment";
import ReactionList from "../ReactionList";
import ReactionActions from "../ReactionActions";

type Props = {
    message: any;
    className?: string;
    showSenderName?: boolean;
    isMyMessage?: boolean;
}
const TextChatContent:FC<Props> = ({message,className,showSenderName, isMyMessage}) => {
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
                    {message.sender.bizfullname||message.sender.fullname}
                </div>
            }
            {
                message.parent&&
                renderReply()
            }
            <div className={"pr-[20px] pb-[5px]"}>
                <div className={"message-content"}>
                    <div ref={textContentRef} className={"flex-1 py-[4px] break-words"}>
                    </div>
                </div>
                <div className={"date-message absolute bottom-3px right-4px text-xs flex items-center "  + (isMyMessage?"text-primary":"text-gray-500")}>
                    <ReactionList message={message}/>
                    <span className={"ml-[5px]"}>{moment(message.createdAt).format("HH:mm")}</span>
                    <img  className={"ml-1"} src={DoubleTickIcon} alt={"tick"}/>
                </div>
            </div>
            <ReactionActions message={message}/>
        </div>
    )
}

export default TextChatContent
