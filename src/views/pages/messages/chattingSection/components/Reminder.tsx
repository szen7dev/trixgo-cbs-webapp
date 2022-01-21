import React, {FC, ReactNode} from "react";
import {ItemMessage} from "typings/apis/messages/listMessage";
import moment from "moment";
import {useAuth} from "services/hooks/useAuth";
type Props = {
    message: ItemMessage;
}
const Reminder:FC<Props> = ({message}) => {
    const {user} = useAuth();
    const getRepeatText = () => {
        switch (message.reminder.repeat) {
            case "once":
                return "Không lặp lại";
        }
    };
    const checkUserAccept = () => {
        const userAcceptStatus = [...message.reminder.accepts,...message.reminder.rejects];
        return {
            didTakeAction: userAcceptStatus.includes(user?._id),
            didAccept: message.reminder.accepts.includes(user?._id)&&!message.reminder.rejects.includes(user?._id)
        }
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
                            {message.reminder.content}
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
                        <button className={"flex-1 text-negative py-2"}>
                            Từ chổi
                        </button>
                        <button className={"flex-1 text-primary py-2"}>
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
