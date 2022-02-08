import React, {FC, ReactNode, useCallback, useContext} from "react";
import {ItemMessage} from "typings/apis/messages/listMessage";
import moment from "moment";
import {useAuth} from "services/hooks/useAuth";
import {UseConversation} from "services/hooks/messages/useConversation";
import {MessageContext} from "../../home/index_v2";
import {updateReminderData} from "redux/reducer/messages/ListMessage";
import {useDispatch} from "react-redux";
type Props = {
    message: ItemMessage;
}
const Reminder:FC<Props> = ({message}) => {
    const {updateReminder} = UseConversation();
    const {socketRef} = useContext(MessageContext);
    const socket = socketRef.current;
    const dispatch = useDispatch();

    const currentUser = localStorage.getItem("currentUser")??"{}";
    const profileId = JSON.parse(currentUser)?._id;

    const getRepeatText = () => {
        switch (message.reminder.repeat) {
            case "once":
                return "Không lặp lại";
            case "daily":
                return "Hàng ngày";
            case "weekly":
                return "Hàng tuần";
            case "monthly":
                return "Hàng tháng";
            case "yearly":
                return "Hàng năm";
        }
    };
    const checkUserAccept = useCallback(() => {
        const userAcceptStatus = [...message.reminder.accepts,...message.reminder.rejects];
        return {
            didTakeAction: userAcceptStatus.includes(profileId),
            didAccept: message.reminder.accepts.includes(profileId)&&!message.reminder.rejects.includes(profileId)
        }
    }, [message]);

    const reminderAction = (isJoin: boolean) => {
        const reminderData = {...message.reminder};
        if (isJoin) {
            reminderData.accepts =  [...reminderData.accepts, profileId];
        } else {
            reminderData.rejects = [...reminderData.rejects, profileId];
        }
        dispatch(updateReminderData({
            conversationId: message.conversation,
            messageId: message._id,
            reminderData: reminderData
        }));
        updateReminder({conversationID: message.conversation, messageID: message._id, isJoin: isJoin}).then((data) => {
            socket.emit('CHATTING_CSS_FIRE_MESSAGE', data.infoMessageNotification);
        });
    }
    return (
        <div className={"reminder-center flex flex-col items-center justify-center mb-2"}>
            <div className={"rounded-full text-xs bg-gray-200 text-gray-500 px-5 py-1 mb-2"}>
                {moment(message.createdAt).format("HH:mm")}
            </div>
            <div className={"rounded-full text-xs  bg-gray-200 text-gray-500 px-5 py-1 mb-2"}>
                {`${message.sender.fullname} đã tạo một lời nhắc`}
            </div>
            <div className={"w-[300px] rounded-md bg-white border border-gray-400"}>
                <div className={"p-3 border-b border-gray-200 flex"}>
                    <div className={"flex flex-col items-center px-2"}>
                        <div className={"text-lg text-negative"}>{moment(message.reminder.remindTime).format("MMM")}</div>
                        <div>{moment(message.reminder.remindTime).format("DD")}</div>
                    </div>
                    <div className={"flex-1"}>
                        <div className={"font-bold text-lg"}>
                            {message.reminder.content.replaceAll(/[@]\[(.*?)\]\((.*?)\)/g, (replacement: string) => {
                                const matchs = (/[@]\[(.*?)\]\((.*?)\)/g).exec(replacement);
                                if (matchs) {
                                    const fullName = matchs[1];
                                    return `@${fullName}`;
                                } else {
                                    return replacement;
                                }
                            })}
                        </div>
                        <div>
                            {moment(message.reminder.remindTime).format("HH:mm dddd, DD MMMM YYYY")}
                        </div>
                        <div>{getRepeatText()}</div>
                        {
                            (checkUserAccept().didTakeAction)?
                                <div className={checkUserAccept().didAccept?"text-primary":"text-negative"}>Bạn đã {checkUserAccept().didAccept?"xác nhận":"từ chối"} tham gia</div>:
                                null
                        }
                    </div>
                </div>
                {
                    (!checkUserAccept().didTakeAction)?
                    <div className={"flex"}>
                        <button
                            onClick={() => reminderAction(false)}
                            className={"flex-1 text-negative py-2"}>
                            Từ chổi
                        </button>
                        <button
                            onClick={() => reminderAction(true)}
                            className={"flex-1 text-primary py-2"}>
                            Xác nhận
                        </button>
                    </div>:
                    null
                }
            </div>
        </div>
    )
}

export default Reminder;
