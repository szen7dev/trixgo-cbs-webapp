import React, {FC, ReactNode, useEffect, useRef} from "react";
import moment from "moment";
import {ReactionList, ReactionActions} from "../../Reactions";
import {ContactReply, TextReply, FileReply, ImageReply, DeleteReply} from "../ReplyContent";
import {MessageStatus} from "./MessageStatus";
import {UseMessageHelper} from "services/hooks/messages/useMessageHelper";

type Props = {
    message: any;
    className?: string;
    showSenderName?: boolean;
    isMyMessage?: boolean;
    context: any;
    isMini?: boolean
}
export const TextChatContent:FC<Props> = ({message,className,showSenderName, isMyMessage, context, isMini}) => {
    const textContentRef = useRef<HTMLDivElement>(null);
    const {handleStartPrivateChat} = UseMessageHelper()
    useEffect(() => {
        const listener = (event: Event) => {
            const node = event.target as HTMLSpanElement;
            if(node && node.classList.contains("user-tag-in-content")) {
                node.dataset.userid&&handleStartPrivateChat(node.dataset.userid, isMini)
            }
        };
        document.addEventListener("click", listener);
        return () => {
            document.removeEventListener("click", listener);
        };
    },[]);
    useEffect(() => {
        if (textContentRef && textContentRef.current) {
            textContentRef.current.innerHTML = message.content
                //Regex mention
                .replaceAll(/[@]\[(.*?)\]\((.*?)\)/g, (replacement: string) => {
                    const matchs = (/[@]\[(.*?)\]\((.*?)\)/g).exec(replacement);
                    if (matchs) {
                        const fullName = matchs[1];
                        const userId = matchs[2];
                        return `<span class="text-primary cursor-pointer user-tag-in-content" data-userId="${userId}">@${fullName}</span>`;
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

    const currentUser = localStorage.getItem("currentUser")??"{}";
    const profileId = JSON.parse(currentUser)?._id;
    const renderReply = () => {
        if (message.parent.usersDelete&&message.parent.usersDelete.includes(profileId)) {
            return <DeleteReply message={message} />
        }
        switch (message.parent.type) {
            case 0:
                return <TextReply message={message.parent}/>;
            case 2:
                return <FileReply message={message.parent}/>;
            case 1:
                return <ImageReply message={message.parent}/>;
            case 7:
                return <ContactReply message={message.parent}/>;
        }
    }
    return (
        <div className={"min-w-[70px] rounded-lg p-[7px] relative " + (className??"") + (isMini?" max-w-[250px]":" max-w-[366px]")}>
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
            <div className={"pr-[20px]"}>
                <div className={"message-content"}>
                    <div ref={textContentRef} className={"flex-1 py-[4px] break-words"}>
                    </div>
                </div>
                <div className={"date-message date-text-message text-xs flex items-center w-full justify-end "  + (isMyMessage?"text-primary":"text-gray-500")}>
                    <ReactionList message={message}/>
                    <span className={"ml-[5px]"}>{moment(message.createAt).format("HH:mm")}</span>
                    <MessageStatus message={message}/>
                </div>
            </div>
            <ReactionActions context={context} message={message}/>
        </div>
    )
}
