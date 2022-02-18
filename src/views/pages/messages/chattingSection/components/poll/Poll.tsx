import React, {FC, ReactNode, useCallback, useContext, useState} from "react";
import {ItemMessage} from "typings/apis/messages/listMessage";
import PollIcon from "assets/images/icons-poll.svg";
import {map as _map} from "lodash";
import {ItemListConversation} from "typings/apis/messages/listConversation";
import PollActions from "./PollActions";

type Props = {
    message: ItemMessage;
    chat: ItemListConversation;
    isMini?: boolean
}
const Poll:FC<Props> = ({message,chat, isMini}) => {
    const [openVote, setOpenVote] = useState(false);
    const closeVoteModal = () => setOpenVote(false);

    const usersVote = useCallback(() => {
        const userVote : string[] = [];
        message.poll.options.forEach(option => {
            option.usersVote.forEach(user => {
                if (!userVote.includes(user._id)) {
                    userVote.push(user._id)
                }
            })
        })

        return userVote.length;
    }, [message])
    return (
        <div className={"poll-center flex flex-col items-center justify-center mb-2"}>
            <div className={"rounded-full text-xs text-gray-500 px-5 py-1 mb-2 px-[33px] flex items-center " + (isMini?"bg-gray-100":"bg-white")}>
                <img src={PollIcon} alt={"-----"} className={"w-[14px] h-[16px] mr-2"}/>
                <span>
                {message.sender.bizfullname||message.sender.fullname} đã tạo một bình chọn: <span className="text-black">{message.poll.name}</span>
                </span>
            </div>
            <div className={"rounded-md bg-white mb-5 " + (isMini?"w-[300px] bg-gray-100":"w-[365px] bg-white")}>
                <div className={"px-[12px] py-[16px] border-b border-gray-200"}>
                    <div className={"font-bold text-lg"}>
                        {message.poll.name}
                    </div>
                    <div className={"text-xs text-primary"}>
                        {usersVote()} thành viên bình chọn
                    </div>
                    <div
                        className={"mt-[12px]"}
                    >
                        {
                            _map(message.poll.options, option => (
                                <div
                                    className={"rounded-md bg-gray-100 h-[40px] mb-[10px] relative overflow-hidden"}
                                    key={option._id}
                                >
                                    <div className={"bg-accent absolute h-full transition-all"} style={{width: `${(option.usersVote.length/chat.members.length)*100}%`}}>
                                    </div>
                                    <div className={"absolute h-full w-full flex items-center px-[17px]"}>
                                        <div className={"truncate flex-1"}>
                                            {option.title}
                                        </div>
                                        <div className={"flex items-center -space-x-1"}>
                                            {
                                                _map(option.usersVote.slice(0, 3), user => (
                                                    <img key={user._id} alt={"------"} src={`${process.env.REACT_APP_URL_S3_USER}/${user.image}`} className={"w-[16px] h-[16px] min-w-[16px] min-h-[16px] rounded-full overflow-hidden border border-white"}/>
                                                ))
                                            }
                                            {
                                                option.usersVote.length - 3 > 0 &&
                                                <div className={"w-[16px] h-[16px] text-xs rounded-full overflow-hidden bg-gray-300 text-gray-500 border border-white"}>
                                                    {option.usersVote.length - 3}+
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className={"flex items-center justify-center py-[16px]"}>
                    <button
                        onClick={() => setOpenVote(true)}
                        className={"text-primary"}>
                        Bình chọn
                    </button>
                </div>
            </div>
            <PollActions message={message} chat={chat} isOpen={openVote} setCloseVote={closeVoteModal}/>
        </div>
    )
}

export default Poll;
