import React, {FC, useCallback} from "react";
import moment from "moment";
import {ItemMessage} from "typings/apis/messages/listMessage";
import {UseConversation} from "services/hooks/messages/useConversation";
import {setShouldStartListenEvent, clearListMessage} from "redux/reducer/messages/SearchMessage";
import {useDispatch} from "react-redux";

type Props = {
    message: ItemMessage
}
export const ListSearchMessagesItem:FC<Props> = ({message}) => {
    const currentUser = localStorage.getItem("currentUser")??"{}";
    const profileId = JSON.parse(currentUser)?._id;
    const dispatch = useDispatch();

    const getDate = useCallback(() => {
        const date = moment(message.modifyAt);
        if (date.isSame(new Date(), 'date')) {
            return date.format("HH:mm")
        }else if (date.isSame(new Date(), 'week')) {
            return date.format("dddd").split(" ").map((str:string) => str.charAt(0).toUpperCase() + str.slice(1)).join(" ")
        }else if (date.isSame(new Date(), 'year')) {
            return date.format("DD/MM")
        } else {
            return date.format("DD/MM/YYYY")
        }
    },[message.modifyAt]);

    const getMessageContent = useCallback(() => {
        if (message.usersDelete&&message.usersDelete.includes(profileId)) {
            return "Tin nhắn đã xóa";
        }
        switch (message.type) {
            case 0:
                return <p className={"flex items-center max-w-[250px]"}>
                    <span className={"ml-[5px] truncate max-w-full"}>
                        {message.content.replaceAll(/[@]\[(.*?)\]\((.*?)\)/g, (replacement: string) => {
                            const matchs = (/[@]\[(.*?)\]\((.*?)\)/g).exec(replacement);
                            if (matchs) {
                                const fullName = matchs[1];
                                return `@${fullName}`;
                            } else {
                                return replacement;
                            }
                        })}
                    </span>
                </p>
            case 1:
                return <p className={"flex items-center"}>
                    <span className={"ml-[5px]"}>
                    [Hình ảnh]
                    </span>
                </p>;
            case 2:
                return <p className={"flex items-center"}>
                    <span className={"ml-[5px]"}>
                    [Tệp tin]
                    </span>
                </p>;
            default:
                return "[Thông báo]";
        }
    }, [message])
    const {goToMessagePosition} = UseConversation();

    const handleGoToMessage = (_id: string) => {
        dispatch(clearListMessage({conversationId: message.conversation}));
        goToMessagePosition({conversationID: message.conversation, messageID: message._id}).then(data => {
            setTimeout(() => {
                document.getElementById(`message-${message._id}`)?.scrollIntoView({block: "center", behavior: "smooth"});
                document.getElementById(`message-${message._id}`)?.classList.add("found-message");
                dispatch(setShouldStartListenEvent({data: true, conversationId: message.conversation}));
                setTimeout(() => {
                    document.getElementById(`message-${message._id}`)?.classList.remove("found-message");
                }, 2000)
            }, 500)
        })
    }

    return (
        <div
            onClick={() => handleGoToMessage(message._id)}
            className={"group smooth-animation flex p-[10px] cursor-pointer rounded-lg z-1 hover:bg-gray-100"}>
            <img  className={"w-[56px] h-[56px] min-w-[56px] min-h-[56px] rounded-full overflow-hidden"} src={`${process.env.REACT_APP_URL_S3_USER}/${message?.sender?.image}`} alt={message.sender.bizfullname}/>
            <div className={"flex-1 flex flex-col justify-center ml-[10px]"}>
                <div className={"flex"}>
                    <div className={"flex-1 font-bold"}>
                        {message.sender.bizfullname}
                    </div>
                    <div className={"text-xs text-gray-500"}>
                        {getDate()}
                    </div>
                </div>
                <div className={"flex mt-1"}>
                    <div className={"flex-1 text-gray-500"}>{getMessageContent()}</div>
                </div>
            </div>
        </div>
    )
}
