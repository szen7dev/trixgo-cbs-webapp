import React, {FC, ReactNode, useCallback, useContext} from "react";
import {ItemMessage} from "typings/apis/messages/listMessage";
import moment from "moment";
import {UseConversation} from "services/hooks/messages/useConversation";
import {MessageContext} from "../../home/index_v2";
import {updateReminderData} from "redux/reducer/messages/ListMessage";
import {useDispatch} from "react-redux";
import Clock from "assets/images/icons8-time-48.svg";
import IconCheck from "assets/images/icon-check.svg";
import IconRedClose from "assets/images/icon-red-close.svg";

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
            <div className={"rounded-full text-xs bg-white text-gray-500 px-5 py-1 mb-2 px-[33px] flex items-center"}>
                <img src={Clock} alt={"-----"} className={"w-[18px] h-[18px] mr-2"}/>
                <span>
                {`${message.sender.bizfullname||message.sender.fullname} đã tạo một lời nhắc`}
                </span>
            </div>
            <div className={"w-[365px] rounded-md bg-white mb-5"}>
                <div className={"p-3 flex"}>
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
                    <div className={"flex justify-around py-[11px] border-t border-gray-200"}>
                        <button
                            onClick={() => reminderAction(true)}
                            className={"w-[126px] rounded-full h-[36px] flex items-center py-2 bg-gray-100 text-center justify-center"}>
                            <img alt={"-----"} src={IconCheck} className={"w-[16px] h-[16px] mr-[5px]"}/>
                            <span>Tham gia</span>
                        </button>
                        <button
                            onClick={() => reminderAction(false)}
                            className={"w-[126px] rounded-full h-[36px] flex items-center py-2 bg-gray-100 text-center justify-center"}>
                            <img alt={"-----"} src={IconRedClose} className={"w-[16px] h-[16px] mr-[5px]"}/>
                            <span>Từ chối</span>
                        </button>
                    </div>:
                    null
                }
            </div>
        </div>
    )
}

export default Reminder;
